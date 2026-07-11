import "server-only";

import { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { logActivity } from "@/server/activity";
import { runAutomationsForActivity } from "@/server/services/automation-engine";
import { generateInvoiceNumber } from "@/server/services/invoice-number";

/**
 * Queue-agnostic, pure service — same shape as automation-engine.ts's
 * runAutomationsForActivity. Never called mid-transaction of anything else.
 * Callable from: a manual "Generate Now" action (one subscription), or the
 * cron route (all agencies, all due subscriptions).
 */

function nextBillingDateAfter(current: Date, frequency: string, customIntervalDays: number | null): Date {
  const next = new Date(current);
  switch (frequency) {
    case "WEEKLY":
      next.setDate(next.getDate() + 7);
      return next;
    case "MONTHLY":
      next.setMonth(next.getMonth() + 1);
      return next;
    case "QUARTERLY":
      next.setMonth(next.getMonth() + 3);
      return next;
    case "YEARLY":
      next.setFullYear(next.getFullYear() + 1);
      return next;
    case "CUSTOM":
    default:
      next.setDate(next.getDate() + Math.max(1, customIntervalDays ?? 30));
      return next;
  }
}

function money(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export interface ProcessResult {
  processed: number;
  generated: number;
  failed: number;
}

// Retry/backoff policy for a billing cycle that keeps failing (e.g. a
// transient DB or email error — NOT a declined card, which is Stripe's own
// dunning flow via webhooks). Exponential backoff, capped, then auto-pause so
// a persistently broken subscription stops burning retries silently.
const RETRY_BACKOFF_HOURS = [1, 4, 12, 24, 48];
const AUTO_PAUSE_AFTER_FAILURES = RETRY_BACKOFF_HOURS.length + 1;

function computeNextRetryAt(consecutiveFailureCount: number): Date {
  const hours = RETRY_BACKOFF_HOURS[Math.min(consecutiveFailureCount - 1, RETRY_BACKOFF_HOURS.length - 1)];
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

/** Generate the due invoice for exactly one subscription (used by "Generate Now"). */
export async function generateForSubscription(subscriptionId: string): Promise<{ ok: boolean; message: string }> {
  const subscription = await db.subscription.findUnique({
    where: { id: subscriptionId },
    select: {
      id: true,
      agencyId: true,
      clientId: true,
      name: true,
      description: true,
      amount: true,
      frequency: true,
      customIntervalDays: true,
      nextBillingDate: true,
      status: true,
      autoSend: true,
      createdBy: true,
      consecutiveFailureCount: true,
    },
  });
  if (!subscription) return { ok: false, message: "Subscription not found." };
  if (subscription.status !== "active") return { ok: false, message: "Subscription is not active." };

  // Reserve this billing cycle FIRST, outside the main transaction, via a
  // bare create against the @@unique([subscriptionId, scheduledFor])
  // constraint. Whichever caller (cron tick, overlapping cron run, manual
  // "Generate Now", or a retry) wins this insert owns the cycle; every other
  // concurrent caller gets a P2002 and bails out immediately, so no two
  // invoices can ever be produced for the same cycle regardless of timing.
  //
  // A previous attempt for this same cycle may be reclaimable:
  //  - status "failed": a prior attempt genuinely failed — always retryable.
  //  - status "scheduled" but stale (updatedAt older than STALE_RESERVATION_MS):
  //    the process that reserved it crashed/restarted before finishing the
  //    transaction below, orphaning the row. Without this, a server restart
  //    mid-generation would permanently strand that billing cycle.
  const STALE_RESERVATION_MS = 10 * 60 * 1000;
  let reservation;
  try {
    reservation = await db.recurringInvoice.create({
      data: {
        agencyId: subscription.agencyId,
        subscriptionId: subscription.id,
        scheduledFor: subscription.nextBillingDate,
        status: "scheduled",
      },
    });
  } catch (err) {
    if (!(err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002")) throw err;

    const reclaimed = await db.recurringInvoice.updateMany({
      where: {
        subscriptionId: subscription.id,
        scheduledFor: subscription.nextBillingDate,
        OR: [
          { status: "failed" },
          { status: "scheduled", updatedAt: { lt: new Date(Date.now() - STALE_RESERVATION_MS) } },
        ],
      },
      data: { status: "scheduled", failureReason: null }, // @updatedAt bumps automatically
    });
    if (reclaimed.count === 0) {
      return { ok: false, message: "This billing cycle has already been processed." };
    }
    const found = await db.recurringInvoice.findUnique({
      where: { subscriptionId_scheduledFor: { subscriptionId: subscription.id, scheduledFor: subscription.nextBillingDate } },
    });
    if (!found) return { ok: false, message: "This billing cycle has already been processed." };
    reservation = found;
  }

  try {
    const { invoiceNumber, activityId, dueDate: invoiceDueDate } = await db.$transaction(async (tx) => {
      const number = await generateInvoiceNumber(subscription.agencyId, tx);
      const amount = Number(subscription.amount);
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);
      const invoice = await tx.invoice.create({
        data: {
          agencyId: subscription.agencyId,
          clientId: subscription.clientId,
          number,
          status: "unpaid",
          dueDate,
          total: amount,
          items: {
            create: [
              {
                agencyId: subscription.agencyId,
                description: subscription.description || subscription.name,
                qty: 1,
                unitPrice: amount,
                lineTotal: amount,
              },
            ],
          },
        },
      });
      await tx.recurringInvoice.update({
        where: { id: reservation.id },
        data: { invoiceId: invoice.id, generatedAt: new Date(), status: "generated" },
      });
      const activity = await logActivity(
        {
          agencyId: subscription.agencyId,
          clientId: subscription.clientId,
          invoiceId: invoice.id,
          userId: subscription.createdBy ?? undefined,
          type: "Subscription Renewed",
          title: "Subscription Renewed",
          description: `Invoice ${invoice.number} (${money(amount)}) generated for "${subscription.name}".`,
          metadata: { amount, number: invoice.number },
        },
        tx,
      );
      await tx.subscription.update({
        where: { id: subscription.id },
        data: {
          nextBillingDate: nextBillingDateAfter(subscription.nextBillingDate, subscription.frequency, subscription.customIntervalDays),
          consecutiveFailureCount: 0,
          lastFailureAt: null,
          nextRetryAt: null,
        },
      });
      return { invoiceNumber: invoice.number, activityId: activity.id, dueDate: invoice.dueDate };
    });

    await runAutomationsForActivity({
      agencyId: subscription.agencyId,
      triggerType: "Subscription Renewed",
      activityId,
      clientId: subscription.clientId,
    });

    if (subscription.autoSend) {
      try {
        const [client, agency] = await Promise.all([
          db.client.findUnique({ where: { id: subscription.clientId }, select: { email: true, portalToken: true } }),
          db.agency.findUnique({ where: { id: subscription.agencyId }, select: { name: true } }),
        ]);
        if (client?.email) {
          const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://trysarion.com";
          const { sendEmailSafe } = await import("@/lib/email");
          await sendEmailSafe("invoiceAvailable", client.email, {
            invoiceNumber,
            amount: money(Number(subscription.amount)),
            dueDate: invoiceDueDate ? invoiceDueDate.toLocaleDateString("en-US") : undefined,
            invoiceUrl: `${appUrl}/portal/${client.portalToken}`,
            fromAgency: agency?.name,
          });
        }
      } catch (err) {
        console.error("[recurring-billing] auto-send email failed:", err);
      }
    }

    return { ok: true, message: `Invoice ${invoiceNumber} generated.` };
  } catch (err) {
    const consecutiveFailureCount = subscription.consecutiveFailureCount + 1;
    const willAutoPause = consecutiveFailureCount >= AUTO_PAUSE_AFTER_FAILURES;

    const { activityId, autoPauseActivityId } = await db.$transaction(async (tx) => {
      await tx.recurringInvoice.update({
        where: { id: reservation.id },
        data: {
          status: "failed",
          failureReason: err instanceof Error ? err.message : "Unknown error",
        },
      });
      await tx.subscription.update({
        where: { id: subscription.id },
        data: {
          consecutiveFailureCount,
          lastFailureAt: new Date(),
          nextRetryAt: willAutoPause ? null : computeNextRetryAt(consecutiveFailureCount),
          ...(willAutoPause ? { status: "paused", autoPausedAt: new Date() } : {}),
        },
      });
      const activity = await logActivity(
        {
          agencyId: subscription.agencyId,
          clientId: subscription.clientId,
          userId: subscription.createdBy ?? undefined,
          type: "Subscription Failed",
          title: "Subscription Failed",
          description: `Billing failed for "${subscription.name}" (attempt ${consecutiveFailureCount}).`,
        },
        tx,
      );

      let autoPauseActivityId: string | undefined;
      if (willAutoPause) {
        const pauseActivity = await logActivity(
          {
            agencyId: subscription.agencyId,
            clientId: subscription.clientId,
            userId: subscription.createdBy ?? undefined,
            type: "Subscription Auto-Paused",
            title: "Subscription Auto-Paused",
            description: `"${subscription.name}" was automatically paused after ${consecutiveFailureCount} consecutive billing failures. Review and resume it.`,
          },
          tx,
        );
        autoPauseActivityId = pauseActivity.id;
      }

      return { activityId: activity.id, autoPauseActivityId };
    });

    await runAutomationsForActivity({
      agencyId: subscription.agencyId,
      triggerType: "Subscription Failed",
      activityId,
      clientId: subscription.clientId,
    });
    if (autoPauseActivityId) {
      await runAutomationsForActivity({
        agencyId: subscription.agencyId,
        triggerType: "Subscription Auto-Paused",
        activityId: autoPauseActivityId,
        clientId: subscription.clientId,
      });
    }

    return {
      ok: false,
      message: willAutoPause
        ? `Billing failed — subscription auto-paused after ${consecutiveFailureCount} failures.`
        : "Billing failed — recorded as a failed occurrence.",
    };
  }
}

/** Process every active, due subscription — optionally scoped to one agency. Never throws. */
export async function processDueSubscriptions(agencyId?: string): Promise<ProcessResult> {
  const today = new Date();
  today.setHours(23, 59, 59, 999); // due "today" counts as due

  const due = await db.subscription.findMany({
    where: {
      ...(agencyId ? { agencyId } : {}),
      status: "active",
      nextBillingDate: { lte: today },
      // A subscription with a previously-failed cycle waits out its backoff
      // window before the automatic cron path retries it again. Manual
      // "Generate Now" (generateForSubscription called directly) ignores
      // this and always attempts immediately.
      OR: [{ nextRetryAt: null }, { nextRetryAt: { lte: new Date() } }],
    },
    select: { id: true },
  });

  let generated = 0;
  let failed = 0;
  for (const sub of due) {
    try {
      const result = await generateForSubscription(sub.id);
      if (result.ok) generated++;
      else failed++;
    } catch (err) {
      console.error(`[recurring-billing] subscription ${sub.id} crashed:`, err);
      failed++;
    }
  }

  return { processed: due.length, generated, failed };
}

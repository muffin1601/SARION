"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAgency } from "@/server/auth-context";
import { logActivity } from "@/server/activity";
import { runAutomationsForActivity } from "@/server/services/automation-engine";

export type DashboardActionResult = { ok: true } | { ok: false; error: string };

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

/**
 * Re-sends the invoice-available email for the "Send Reminder" quick action on
 * the dashboard's Recent Invoices card. Reuses the same email + template used
 * on invoice creation (src/server/actions/invoices.ts) — no new template.
 */
export async function sendInvoiceReminder(invoiceId: string): Promise<DashboardActionResult> {
  const { agencyId } = await requireAgency();

  const invoice = await db.invoice.findFirst({
    where: { id: invoiceId, agencyId, deletedAt: null },
    select: {
      number: true,
      total: true,
      dueDate: true,
      client: { select: { email: true, portalToken: true } },
      agency: { select: { name: true } },
    },
  });
  if (!invoice) return { ok: false, error: "Invoice not found." };
  if (!invoice.client.email) {
    return { ok: false, error: "This client has no email on file." };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://trysarion.com";
  const { sendEmailSafe } = await import("@/lib/email");
  await sendEmailSafe("invoiceAvailable", invoice.client.email, {
    invoiceNumber: invoice.number,
    amount: formatMoney(Number(invoice.total)),
    dueDate: invoice.dueDate
      ? invoice.dueDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
      : undefined,
    invoiceUrl: `${appUrl}/portal/${invoice.client.portalToken}`,
    fromAgency: invoice.agency.name,
  });

  return { ok: true };
}

const logMeetingSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(160),
  clientId: z.string().trim().min(1).optional(),
  meetingAt: z.coerce.date({ message: "A valid date/time is required" }),
});

export interface LogMeetingInput {
  title: string;
  clientId?: string;
  meetingAt: string;
}

/**
 * "Create Meeting" quick action — logs a Meeting Scheduled activity via the
 * existing activity system rather than a new Meeting model/UI.
 */
export async function logMeeting(input: LogMeetingInput): Promise<DashboardActionResult> {
  const { agencyId, userId } = await requireAgency();

  const parsed = logMeetingSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid meeting details." };
  }

  if (parsed.data.clientId) {
    const client = await db.client.findFirst({
      where: { id: parsed.data.clientId, agencyId, deletedAt: null },
      select: { id: true },
    });
    if (!client) return { ok: false, error: "Selected client not found." };
  }

  const activity = await logActivity({
    agencyId,
    clientId: parsed.data.clientId,
    userId,
    type: "Meeting Scheduled",
    title: "Meeting Scheduled",
    description: parsed.data.title,
    metadata: { meetingAt: parsed.data.meetingAt.toISOString() },
  });

  revalidatePath("/dashboard");

  await runAutomationsForActivity({
    agencyId,
    triggerType: "Meeting Scheduled",
    activityId: activity.id,
    clientId: parsed.data.clientId,
  });

  return { ok: true };
}

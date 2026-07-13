"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireOwner, requireVerifiedEmailOrError } from "@/server/auth-context";
import { logActivity } from "@/server/activity";
import { generateForSubscription } from "@/server/services/recurring-billing";

const emptyToNull = (v: unknown) => (typeof v === "string" && v.trim() === "" ? null : v);

const subscriptionSchema = z.object({
  clientId: z.string().trim().min(1, "Client is required"),
  name: z.string().trim().min(1, "Name is required").max(160),
  amount: z.coerce.number().positive("Amount must be greater than 0").max(99_999_999),
  frequency: z.enum(["WEEKLY", "MONTHLY", "QUARTERLY", "YEARLY", "CUSTOM"]),
  customIntervalDays: z.coerce.number().int().positive().nullable().optional(),
  nextBillingDate: z.preprocess((v) => {
    if (typeof v !== "string" || v.trim() === "") return undefined;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? v : d;
  }, z.date({ message: "A valid date is required" })),
  autoSend: z.coerce.boolean().default(true),
  autoRemind: z.coerce.boolean().default(true),
  description: z.preprocess(emptyToNull, z.string().trim().max(500).nullable()),
});

export interface SubscriptionInput {
  clientId: string;
  name: string;
  amount: number | string;
  frequency: string;
  customIntervalDays?: number | null;
  nextBillingDate: string;
  autoSend?: boolean;
  autoRemind?: boolean;
  description?: string | null;
}

export type ActionResult =
  | { ok: true; subscriptionId: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

async function assertClientOwned(agencyId: string, clientId: string) {
  const client = await db.client.findFirst({ where: { id: clientId, agencyId, deletedAt: null }, select: { id: true } });
  return Boolean(client);
}

export async function createSubscription(input: SubscriptionInput): Promise<ActionResult> {
  const { agencyId, userId } = await requireOwner();

  const verificationError = await requireVerifiedEmailOrError(userId);
  if (verificationError) return { ok: false, error: verificationError };

  const parsed = subscriptionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors };
  }
  if (!(await assertClientOwned(agencyId, parsed.data.clientId))) {
    return { ok: false, error: "Selected client not found.", fieldErrors: { clientId: ["Select a valid client."] } };
  }

  const subscription = await db.$transaction(async (tx) => {
    const created = await tx.subscription.create({
      data: {
        agencyId,
        clientId: parsed.data.clientId,
        name: parsed.data.name,
        amount: parsed.data.amount,
        frequency: parsed.data.frequency,
        customIntervalDays: parsed.data.customIntervalDays ?? null,
        nextBillingDate: parsed.data.nextBillingDate,
        autoSend: parsed.data.autoSend,
        autoRemind: parsed.data.autoRemind,
        description: parsed.data.description,
        createdBy: userId,
      },
    });
    await logActivity(
      {
        agencyId,
        clientId: parsed.data.clientId,
        userId,
        type: "Subscription Created",
        title: "Subscription Created",
        description: `Subscription "${created.name}" was created.`,
      },
      tx,
    );
    return created;
  });

  revalidatePath("/recurring");
  return { ok: true, subscriptionId: subscription.id };
}

export async function updateSubscription(subscriptionId: string, input: SubscriptionInput): Promise<ActionResult> {
  const { agencyId } = await requireOwner();

  const parsed = subscriptionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors };
  }
  if (!(await assertClientOwned(agencyId, parsed.data.clientId))) {
    return { ok: false, error: "Selected client not found.", fieldErrors: { clientId: ["Select a valid client."] } };
  }

  const { count } = await db.subscription.updateMany({
    where: { id: subscriptionId, agencyId },
    data: {
      clientId: parsed.data.clientId,
      name: parsed.data.name,
      amount: parsed.data.amount,
      frequency: parsed.data.frequency,
      customIntervalDays: parsed.data.customIntervalDays ?? null,
      nextBillingDate: parsed.data.nextBillingDate,
      autoSend: parsed.data.autoSend,
      autoRemind: parsed.data.autoRemind,
      description: parsed.data.description,
    },
  });
  if (count === 0) return { ok: false, error: "Subscription not found." };

  revalidatePath("/recurring");
  revalidatePath(`/recurring/${subscriptionId}`);
  return { ok: true, subscriptionId };
}

export type SimpleResult = { ok: true } | { ok: false; error: string };

async function setStatus(subscriptionId: string, status: "active" | "paused" | "cancelled"): Promise<SimpleResult> {
  const { agencyId } = await requireOwner();
  const { count } = await db.subscription.updateMany({ where: { id: subscriptionId, agencyId }, data: { status } });
  if (count === 0) return { ok: false, error: "Subscription not found." };
  revalidatePath("/recurring");
  revalidatePath(`/recurring/${subscriptionId}`);
  return { ok: true };
}

export async function pauseSubscription(subscriptionId: string): Promise<SimpleResult> {
  return setStatus(subscriptionId, "paused");
}
export async function resumeSubscription(subscriptionId: string): Promise<SimpleResult> {
  return setStatus(subscriptionId, "active");
}
export async function cancelSubscription(subscriptionId: string): Promise<SimpleResult> {
  return setStatus(subscriptionId, "cancelled");
}

export async function generateNow(subscriptionId: string): Promise<SimpleResult> {
  const { agencyId } = await requireOwner();
  const owned = await db.subscription.findFirst({ where: { id: subscriptionId, agencyId }, select: { id: true } });
  if (!owned) return { ok: false, error: "Subscription not found." };

  const result = await generateForSubscription(subscriptionId);
  revalidatePath("/recurring");
  revalidatePath(`/recurring/${subscriptionId}`);
  // The new invoice + activity affects several other read surfaces —
  // revalidate them so the next visit shows fresh data without a manual reload.
  revalidatePath("/dashboard");
  revalidatePath("/finance");
  revalidatePath("/activity");
  revalidatePath("/reports");
  revalidatePath("/invoices");
  return result.ok ? { ok: true } : { ok: false, error: result.message };
}

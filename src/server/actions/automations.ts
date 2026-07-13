"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { requireAgency } from "@/server/auth-context";
import { isKnownTrigger, isBillingTrigger } from "@/lib/automation-triggers";
import { AUTOMATION_ACTION_TYPES, type AutomationActionConfig } from "@/lib/automation-actions";
import type { AutomationCondition } from "@/lib/automation-conditions";
import { runAutomationManuallyById } from "@/server/services/automation-engine";

const conditionSchema = z.object({
  field: z.string().trim().min(1),
  operator: z.enum([">", "<", ">=", "<=", "="]),
  value: z.union([z.string(), z.number()]),
});

const actionSchema = z
  .object({ type: z.enum(AUTOMATION_ACTION_TYPES) })
  .passthrough();

const automationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(140),
  description: z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? null : v),
    z.string().trim().max(2000).nullable(),
  ),
  triggerType: z.string().refine(isKnownTrigger, { message: "Unknown trigger type." }),
  conditions: z.array(conditionSchema).max(20),
  actions: z.array(actionSchema).min(1, "Add at least one action").max(20),
});

export interface AutomationInput {
  name: string;
  description?: string | null;
  triggerType: string;
  conditions: AutomationCondition[];
  actions: AutomationActionConfig[];
}

export type ActionResult =
  | { ok: true; automationId: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

function toJson<T>(value: T): Prisma.InputJsonValue {
  return value as unknown as Prisma.InputJsonValue;
}

// Billing automations move money or contact clients about money — restrict
// their create/edit/delete/duplicate/toggle to the agency owner. Roles are
// currently just owner|member (see prisma schema.prisma `enum Role`); when
// an admin tier is added, extend this check rather than the individual
// action functions below.
const BILLING_AUTOMATION_ERROR = "Only the agency owner can manage billing automations.";

export async function createAutomation(input: AutomationInput): Promise<ActionResult> {
  const { agencyId, userId, role } = await requireAgency();

  const parsed = automationSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (isBillingTrigger(parsed.data.triggerType) && role !== "owner") {
    return { ok: false, error: BILLING_AUTOMATION_ERROR };
  }

  const automation = await db.automation.create({
    data: {
      agencyId,
      name: parsed.data.name,
      description: parsed.data.description,
      triggerType: parsed.data.triggerType,
      conditions: toJson(parsed.data.conditions),
      actions: toJson(parsed.data.actions),
      createdBy: userId,
    },
  });

  revalidatePath("/automations");
  return { ok: true, automationId: automation.id };
}

export async function updateAutomation(
  automationId: string,
  input: AutomationInput,
): Promise<ActionResult> {
  const { agencyId, role } = await requireAgency();

  const parsed = automationSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (role !== "owner") {
    const existing = await db.automation.findFirst({ where: { id: automationId, agencyId }, select: { triggerType: true } });
    if (!existing) return { ok: false, error: "Automation not found." };
    if (isBillingTrigger(existing.triggerType) || isBillingTrigger(parsed.data.triggerType)) {
      return { ok: false, error: BILLING_AUTOMATION_ERROR };
    }
  }

  const { count } = await db.automation.updateMany({
    where: { id: automationId, agencyId },
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      triggerType: parsed.data.triggerType,
      conditions: toJson(parsed.data.conditions),
      actions: toJson(parsed.data.actions),
    },
  });
  if (count === 0) return { ok: false, error: "Automation not found." };

  revalidatePath("/automations");
  revalidatePath(`/automations/${automationId}`);
  return { ok: true, automationId };
}

export type SimpleResult = { ok: true } | { ok: false; error: string };

export async function deleteAutomation(automationId: string): Promise<SimpleResult> {
  const { agencyId, role } = await requireAgency();

  if (role !== "owner") {
    const existing = await db.automation.findFirst({ where: { id: automationId, agencyId }, select: { triggerType: true } });
    if (!existing) return { ok: false, error: "Automation not found." };
    if (isBillingTrigger(existing.triggerType)) return { ok: false, error: BILLING_AUTOMATION_ERROR };
  }

  const { count } = await db.automation.deleteMany({ where: { id: automationId, agencyId } });
  if (count === 0) return { ok: false, error: "Automation not found." };

  revalidatePath("/automations");
  return { ok: true };
}

export async function toggleAutomationEnabled(automationId: string): Promise<SimpleResult> {
  const { agencyId, role } = await requireAgency();

  const existing = await db.automation.findFirst({
    where: { id: automationId, agencyId },
    select: { enabled: true, triggerType: true },
  });
  if (!existing) return { ok: false, error: "Automation not found." };
  if (role !== "owner" && isBillingTrigger(existing.triggerType)) {
    return { ok: false, error: BILLING_AUTOMATION_ERROR };
  }

  await db.automation.update({ where: { id: automationId }, data: { enabled: !existing.enabled } });
  revalidatePath("/automations");
  return { ok: true };
}

export async function duplicateAutomation(automationId: string): Promise<ActionResult> {
  const { agencyId, userId, role } = await requireAgency();

  const existing = await db.automation.findFirst({ where: { id: automationId, agencyId } });
  if (!existing) return { ok: false, error: "Automation not found." };
  if (role !== "owner" && isBillingTrigger(existing.triggerType)) {
    return { ok: false, error: BILLING_AUTOMATION_ERROR };
  }

  const copy = await db.automation.create({
    data: {
      agencyId,
      name: `${existing.name} (copy)`,
      description: existing.description,
      enabled: false,
      triggerType: existing.triggerType,
      conditions: (existing.conditions ?? undefined) as Prisma.InputJsonValue | undefined,
      actions: existing.actions as Prisma.InputJsonValue,
      createdBy: userId,
    },
  });

  revalidatePath("/automations");
  return { ok: true, automationId: copy.id };
}

export async function runAutomationManually(automationId: string): Promise<SimpleResult> {
  const { agencyId, role } = await requireAgency();

  if (role !== "owner") {
    const existing = await db.automation.findFirst({ where: { id: automationId, agencyId }, select: { triggerType: true } });
    if (!existing) return { ok: false, error: "Automation not found." };
    if (isBillingTrigger(existing.triggerType)) return { ok: false, error: BILLING_AUTOMATION_ERROR };
  }

  const status = await runAutomationManuallyById(agencyId, automationId);
  if (status === "not_found") return { ok: false, error: "Automation not found." };

  revalidatePath("/automations");
  revalidatePath(`/automations/${automationId}`);
  // Actions can create activities/invoices/etc. — revalidate the other
  // surfaces that read that data so a manual run shows up without a reload.
  revalidatePath("/dashboard");
  revalidatePath("/activity");
  revalidatePath("/finance");
  revalidatePath("/reports");
  return status === "success" ? { ok: true } : { ok: false, error: "Automation ran but one or more actions failed. Check run history." };
}

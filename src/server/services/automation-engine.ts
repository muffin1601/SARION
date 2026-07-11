import "server-only";

import type { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { logActivity } from "@/server/activity";
import { computeClientHealthScore } from "@/lib/health-score";
import { evaluateConditions, type AutomationCondition, type AutomationContext } from "@/lib/automation-conditions";
import { executeAction, type ExecutionContext } from "@/server/services/automation-action-executors";
import type { AutomationActionConfig } from "@/lib/automation-actions";

/**
 * Queue-agnostic execution engine. Called synchronously right after a
 * triggering mutation's transaction commits (never from inside it, so a
 * failing automation can never roll back or block the user's actual action —
 * see the hook points added to src/server/actions/{clients,projects,invoices}.ts).
 * A real queue can later replace *the caller* of runAutomationsForActivity
 * with an enqueue call; this function's signature and behavior stay the same.
 */

export interface AutomationTriggerEvent {
  agencyId: string;
  triggerType: string;
  activityId?: string;
  clientId?: string;
  projectId?: string;
  invoiceId?: string;
}

export interface AutomationRunLogEntry {
  step: number;
  action: string;
  ok: boolean;
  message: string;
}

/** Resolve the condition-evaluation context from whatever entities the event references. */
async function buildContext(event: AutomationTriggerEvent): Promise<AutomationContext> {
  const context: AutomationContext = {};

  if (event.invoiceId) {
    const invoice = await db.invoice.findUnique({ where: { id: event.invoiceId }, select: { total: true } });
    if (invoice) context.invoiceAmount = Number(invoice.total);
  }

  if (event.projectId) {
    const project = await db.project.findUnique({ where: { id: event.projectId }, select: { status: true } });
    if (project) context.projectStatus = project.status;
  }

  if (event.clientId) {
    const [paidAgg, outstandingAgg, lastActivity] = await Promise.all([
      db.invoice.aggregate({
        where: { agencyId: event.agencyId, clientId: event.clientId, deletedAt: null, status: "paid" },
        _sum: { total: true },
      }),
      db.invoice.aggregate({
        where: { agencyId: event.agencyId, clientId: event.clientId, deletedAt: null, status: { not: "paid" } },
        _sum: { total: true },
      }),
      db.activity.findFirst({
        where: { agencyId: event.agencyId, clientId: event.clientId },
        orderBy: { createdAt: "desc" },
        select: { createdAt: true },
      }),
    ]);
    const revenue = Number(paidAgg._sum.total ?? 0);
    const outstandingBalance = Number(outstandingAgg._sum.total ?? 0);
    context.revenue = revenue;
    context.outstandingBalance = outstandingBalance;
    context.healthScore = computeClientHealthScore({
      totalInvoiced: revenue + outstandingBalance,
      overdueAmount: outstandingBalance,
      lastActivityAt: lastActivity?.createdAt ?? null,
    });
  }

  return context;
}

async function runOneAutomation(
  automation: { id: string; name: string; conditions: Prisma.JsonValue; actions: Prisma.JsonValue; createdBy: string | null },
  event: AutomationTriggerEvent,
  context: AutomationContext,
): Promise<void> {
  const conditions = (automation.conditions as unknown as AutomationCondition[] | null) ?? [];
  if (conditions.length > 0 && !evaluateConditions(conditions, context)) return;

  // Stamped in JS (not left to the DB default) so it can never land after
  // completedAt below — a DB-side now() at insert time could otherwise race
  // ahead of the JS-computed completedAt and produce a negative duration.
  const triggeredAt = new Date();
  const actions = (automation.actions as unknown as AutomationActionConfig[]) ?? [];
  const execCtx: ExecutionContext = {
    agencyId: event.agencyId,
    automationUserId: automation.createdBy ?? undefined,
    clientId: event.clientId,
    projectId: event.projectId,
    invoiceId: event.invoiceId,
  };

  const logs: AutomationRunLogEntry[] = [];
  let allOk = true;
  for (let i = 0; i < actions.length; i++) {
    try {
      const result = await executeAction(event.agencyId, actions[i], execCtx, {
        triggerType: event.triggerType,
        automationId: automation.id,
      });
      logs.push({ step: i + 1, action: actions[i].type, ok: result.ok, message: result.message });
      if (!result.ok) allOk = false;
    } catch (err) {
      allOk = false;
      logs.push({
        step: i + 1,
        action: actions[i]?.type ?? "unknown",
        ok: false,
        message: err instanceof Error ? err.message : "Unexpected error",
      });
    }
  }

  const status = allOk ? "success" : "failed";
  await db.automationRun.create({
    data: {
      automationId: automation.id,
      status,
      triggeredAt,
      completedAt: new Date(),
      logs: logs as unknown as Prisma.InputJsonValue,
      activityId: event.activityId,
    },
  });

  await logActivity({
    agencyId: event.agencyId,
    userId: automation.createdBy ?? undefined,
    type: allOk ? "Automation Succeeded" : "Automation Failed",
    title: allOk ? "Automation Succeeded" : "Automation Failed",
    description: allOk
      ? `"${automation.name}" ran successfully.`
      : `"${automation.name}" failed — check the run history for details.`,
    metadata: { automationId: automation.id },
  });
}

/**
 * Find enabled automations matching this event's trigger type and run each
 * one whose conditions pass. Never throws — a failing automation is recorded
 * as a failed AutomationRun, not propagated to the caller, so it can never
 * break the mutation that fired the event.
 */
export async function runAutomationsForActivity(event: AutomationTriggerEvent): Promise<void> {
  try {
    const automations = await db.automation.findMany({
      where: { agencyId: event.agencyId, triggerType: event.triggerType, enabled: true },
      select: { id: true, name: true, conditions: true, actions: true, createdBy: true },
    });
    if (automations.length === 0) return;

    const context = await buildContext(event);
    for (const automation of automations) {
      try {
        await runOneAutomation(automation, event, context);
      } catch (err) {
        console.error(`[automation-engine] automation ${automation.id} crashed:`, err);
      }
    }
  } catch (err) {
    console.error("[automation-engine] runAutomationsForActivity failed:", err);
  }
}

/** Manual trigger — runs every enabled automation configured for MANUAL, ignoring conditions unless entity ids are supplied. */
export async function runAutomationManuallyById(agencyId: string, automationId: string): Promise<"success" | "failed" | "not_found"> {
  const automation = await db.automation.findFirst({
    where: { id: automationId, agencyId },
    select: { id: true, name: true, conditions: true, actions: true, createdBy: true },
  });
  if (!automation) return "not_found";

  const event: AutomationTriggerEvent = { agencyId, triggerType: "MANUAL" };
  await runOneAutomation(automation, event, {});

  const lastRun = await db.automationRun.findFirst({
    where: { automationId },
    orderBy: { triggeredAt: "desc" },
    select: { status: true },
  });
  return (lastRun?.status as "success" | "failed") ?? "failed";
}

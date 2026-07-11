import "server-only";

import { db } from "@/lib/db";
import type { AutomationCondition } from "@/lib/automation-conditions";
import type { AutomationActionConfig } from "@/lib/automation-actions";
import type { AutomationRunLogEntry } from "@/server/services/automation-engine";

/**
 * All reads REQUIRE an agencyId and filter by it — tenant isolation at the
 * data layer, mirroring src/server/data/clients.ts.
 */

export interface AutomationListItem {
  id: string;
  name: string;
  description: string | null;
  enabled: boolean;
  triggerType: string;
  actionCount: number;
  runCount: number;
  lastRun: { status: string; triggeredAt: Date } | null;
  createdAt: Date;
}

export async function listAutomations(agencyId: string): Promise<AutomationListItem[]> {
  const automations = await db.automation.findMany({
    where: { agencyId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      enabled: true,
      triggerType: true,
      actions: true,
      createdAt: true,
      _count: { select: { runs: true } },
      runs: { orderBy: { triggeredAt: "desc" }, take: 1, select: { status: true, triggeredAt: true } },
    },
  });

  return automations.map((a) => ({
    id: a.id,
    name: a.name,
    description: a.description,
    enabled: a.enabled,
    triggerType: a.triggerType,
    actionCount: Array.isArray(a.actions) ? a.actions.length : 0,
    runCount: a._count.runs,
    lastRun: a.runs[0] ?? null,
    createdAt: a.createdAt,
  }));
}

export interface AutomationDetail {
  id: string;
  name: string;
  description: string | null;
  enabled: boolean;
  triggerType: string;
  conditions: AutomationCondition[];
  actions: AutomationActionConfig[];
  createdAt: Date;
}

export async function getAutomation(agencyId: string, automationId: string): Promise<AutomationDetail | null> {
  const automation = await db.automation.findFirst({
    where: { id: automationId, agencyId },
    select: {
      id: true,
      name: true,
      description: true,
      enabled: true,
      triggerType: true,
      conditions: true,
      actions: true,
      createdAt: true,
    },
  });
  if (!automation) return null;

  return {
    ...automation,
    conditions: (automation.conditions as unknown as AutomationCondition[] | null) ?? [],
    actions: (automation.actions as unknown as AutomationActionConfig[]) ?? [],
  };
}

export interface AutomationRunItem {
  id: string;
  status: string;
  triggeredAt: Date;
  completedAt: Date | null;
  durationMs: number | null;
  logs: AutomationRunLogEntry[];
}

export async function listAutomationRuns(agencyId: string, automationId: string): Promise<AutomationRunItem[]> {
  const owned = await db.automation.findFirst({ where: { id: automationId, agencyId }, select: { id: true } });
  if (!owned) return [];

  const runs = await db.automationRun.findMany({
    where: { automationId },
    orderBy: { triggeredAt: "desc" },
    take: 50,
    select: { id: true, status: true, triggeredAt: true, completedAt: true, logs: true },
  });

  return runs.map((r) => ({
    id: r.id,
    status: r.status,
    triggeredAt: r.triggeredAt,
    completedAt: r.completedAt,
    durationMs: r.completedAt ? r.completedAt.getTime() - r.triggeredAt.getTime() : null,
    logs: (r.logs as unknown as AutomationRunLogEntry[] | null) ?? [],
  }));
}

export interface RecentAutomationRun {
  id: string;
  automationId: string;
  automationName: string;
  status: string;
  triggeredAt: Date;
  durationMs: number | null;
}

/** Latest runs across all of the agency's automations — feeds the Command Center widget. */
export async function getRecentAutomationRuns(agencyId: string, take = 5): Promise<RecentAutomationRun[]> {
  const runs = await db.automationRun.findMany({
    where: { automation: { agencyId } },
    orderBy: { triggeredAt: "desc" },
    take,
    select: {
      id: true,
      automationId: true,
      status: true,
      triggeredAt: true,
      completedAt: true,
      automation: { select: { name: true } },
    },
  });

  return runs.map((r) => ({
    id: r.id,
    automationId: r.automationId,
    automationName: r.automation.name,
    status: r.status,
    triggeredAt: r.triggeredAt,
    durationMs: r.completedAt ? r.completedAt.getTime() - r.triggeredAt.getTime() : null,
  }));
}

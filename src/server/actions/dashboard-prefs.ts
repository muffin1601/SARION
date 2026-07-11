"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { requireAgency } from "@/server/auth-context";
import {
  DASHBOARD_WIDGET_IDS,
  parseDashboardPrefs,
  type DashboardPrefs,
  type DashboardWidgetId,
} from "@/lib/dashboard-prefs";

export type { DashboardWidgetId } from "@/lib/dashboard-prefs";

const prefsPatchSchema = z.object({
  hidden: z.array(z.enum(DASHBOARD_WIDGET_IDS)).optional(),
  collapsed: z.array(z.enum(DASHBOARD_WIDGET_IDS)).optional(),
  order: z.array(z.enum(DASHBOARD_WIDGET_IDS)).optional(),
  dismissedNotificationIds: z.array(z.string()).optional(),
});

export type PrefsResult = { ok: true } | { ok: false; error: string };

/**
 * Read-modify-write dashboardPrefs under a row lock so concurrent calls for
 * the same user (rapid drag-reorder, two tabs) serialize instead of racing —
 * the second transaction blocks on `FOR UPDATE` until the first commits, then
 * reads the already-updated row, so neither write is lost.
 */
async function withLockedPrefs<T>(
  userId: string,
  mutate: (current: DashboardPrefs) => T | null,
): Promise<PrefsResult> {
  await db.$transaction(async (tx) => {
    const rows = await tx.$queryRaw<{ dashboardPrefs: unknown }[]>`
      SELECT "dashboardPrefs" FROM "User" WHERE id = ${userId} FOR UPDATE
    `;
    const current = parseDashboardPrefs(rows[0]?.dashboardPrefs);
    const patch = mutate(current);
    if (patch === null) return;
    const next: DashboardPrefs = { ...current, ...patch };
    await tx.user.update({
      where: { id: userId },
      data: { dashboardPrefs: next as unknown as Prisma.InputJsonValue },
    });
  });
  revalidatePath("/dashboard");
  return { ok: true };
}

/** Merge a partial patch into the caller's stored dashboardPrefs. */
export async function updateDashboardPrefs(
  patch: Partial<DashboardPrefs>,
): Promise<PrefsResult> {
  const { userId } = await requireAgency();

  const parsed = prefsPatchSchema.safeParse(patch);
  if (!parsed.success) {
    return { ok: false, error: "Invalid dashboard preferences." };
  }

  return withLockedPrefs(userId, () => parsed.data);
}

export async function toggleWidgetHidden(widgetId: DashboardWidgetId): Promise<PrefsResult> {
  const { userId } = await requireAgency();
  return withLockedPrefs(userId, (current) => ({
    hidden: current.hidden.includes(widgetId)
      ? current.hidden.filter((id) => id !== widgetId)
      : [...current.hidden, widgetId],
  }));
}

export async function toggleWidgetCollapsed(widgetId: DashboardWidgetId): Promise<PrefsResult> {
  const { userId } = await requireAgency();
  return withLockedPrefs(userId, (current) => ({
    collapsed: current.collapsed.includes(widgetId)
      ? current.collapsed.filter((id) => id !== widgetId)
      : [...current.collapsed, widgetId],
  }));
}

/** Move a widget up (-1) or down (+1) in the saved order. */
export async function moveWidget(widgetId: DashboardWidgetId, direction: -1 | 1): Promise<PrefsResult> {
  const { userId } = await requireAgency();
  return withLockedPrefs(userId, (current) => {
    const order = [...current.order];
    const from = order.indexOf(widgetId);
    const to = from + direction;
    if (from === -1 || to < 0 || to >= order.length) return null;
    [order[from], order[to]] = [order[to], order[from]];
    return { order };
  });
}

export async function dismissNotification(id: string): Promise<PrefsResult> {
  const { userId } = await requireAgency();
  return withLockedPrefs(userId, (current) => {
    if (current.dismissedNotificationIds.includes(id)) return null;
    return { dismissedNotificationIds: [...current.dismissedNotificationIds, id] };
  });
}

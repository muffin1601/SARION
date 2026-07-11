import "server-only";

import { db } from "@/lib/db";
import { typesForCategory, type TimelineCategory } from "@/lib/activity-categories";
import type { TimelineEntry, TimelinePage } from "@/components/timeline/types";

/**
 * All reads REQUIRE an agencyId and filter by it — tenant isolation at the
 * data layer, mirroring src/server/data/clients.ts and invoices.ts. Backs the
 * Unified Client Timeline on /clients/[id] and is reusable by any future
 * module that needs a paginated Activity feed.
 */

const PAGE_SIZE = 20;

export interface GetClientTimelineOptions {
  /** Cursor is the id of the last item from the previous page. */
  cursor?: string;
  take?: number;
  category?: TimelineCategory;
  search?: string;
}

/**
 * Cursor-paginated activity feed, newest first. Shared by the per-client
 * timeline (/clients/[id]) and the agency-wide timeline (/activity) — pass
 * `clientId` to scope to one client, omit it for the full agency feed. Cursor
 * is the Activity.id of the last row from the previous page — combined with a
 * stable `id` tiebreaker via `orderBy: [{ createdAt: 'desc' }, { id: 'desc' }]`,
 * pagination stays stable even when multiple rows share a createdAt timestamp.
 */
async function queryTimeline(
  agencyId: string,
  clientId: string | undefined,
  options: GetClientTimelineOptions = {},
): Promise<TimelinePage> {
  const take = options.take ?? PAGE_SIZE;
  const category = options.category ?? "all";
  const term = options.search?.trim();

  const rows = await db.activity.findMany({
    where: {
      agencyId,
      ...(clientId ? { clientId } : {}),
      ...(category !== "all" ? { type: { in: typesForCategory(category) } } : {}),
      ...(term
        ? {
            OR: [
              { title: { contains: term, mode: "insensitive" } },
              { description: { contains: term, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: take + 1,
    ...(options.cursor ? { cursor: { id: options.cursor }, skip: 1 } : {}),
    select: {
      id: true,
      type: true,
      title: true,
      description: true,
      metadata: true,
      createdAt: true,
      user: { select: { id: true, name: true, image: true } },
    },
  });

  const hasMore = rows.length > take;
  const page = hasMore ? rows.slice(0, take) : rows;

  const items: TimelineEntry[] = page.map((row) => ({
    id: row.id,
    type: row.type,
    title: row.title ?? row.type,
    description: row.description,
    metadata: (row.metadata as Record<string, unknown> | null) ?? null,
    actor: row.user ? { id: row.user.id, name: row.user.name, image: row.user.image } : null,
    createdAt: row.createdAt.toISOString(),
  }));

  return { items, nextCursor: hasMore ? page[page.length - 1].id : null };
}

export async function getClientTimeline(
  agencyId: string,
  clientId: string,
  options: GetClientTimelineOptions = {},
): Promise<TimelinePage> {
  return queryTimeline(agencyId, clientId, options);
}

/** Agency-wide activity feed (all clients) — powers /activity and the dashboard's Recent Activity card. */
export async function getAgencyTimeline(
  agencyId: string,
  options: GetClientTimelineOptions = {},
): Promise<TimelinePage> {
  return queryTimeline(agencyId, undefined, options);
}

export interface ClientTimelineSummary {
  revenue: number;
  outstanding: number;
  projectCount: number;
  completedProjectCount: number;
  pendingTaskCount: number;
  lastActivityAt: Date | null;
  clientSince: Date;
  status: "active" | "archived";
}

/**
 * Aggregated stats for the client-summary sidebar panel — a small batch of
 * indexed aggregate queries (no row fetching), run in parallel.
 */
export async function getClientTimelineSummary(
  agencyId: string,
  clientId: string,
): Promise<ClientTimelineSummary | null> {
  const client = await db.client.findFirst({
    where: { id: clientId, agencyId },
    select: { createdAt: true, deletedAt: true },
  });
  if (!client) return null;

  const [revenueAgg, outstandingAgg, projectCount, completedProjectCount, pendingTaskCount, lastActivity] =
    await Promise.all([
      db.invoice.aggregate({
        where: { agencyId, clientId, deletedAt: null, status: "paid" },
        _sum: { total: true },
      }),
      db.invoice.aggregate({
        where: { agencyId, clientId, deletedAt: null, status: { not: "paid" } },
        _sum: { total: true },
      }),
      db.project.count({ where: { agencyId, clientId, deletedAt: null } }),
      db.project.count({
        where: { agencyId, clientId, deletedAt: null, status: "COMPLETED" },
      }),
      db.task.count({
        where: {
          agencyId,
          isDone: false,
          project: { agencyId, clientId, deletedAt: null },
        },
      }),
      db.activity.findFirst({
        where: { agencyId, clientId },
        orderBy: { createdAt: "desc" },
        select: { createdAt: true },
      }),
    ]);

  return {
    revenue: Number(revenueAgg._sum.total ?? 0),
    outstanding: Number(outstandingAgg._sum.total ?? 0),
    projectCount,
    completedProjectCount,
    pendingTaskCount,
    lastActivityAt: lastActivity?.createdAt ?? null,
    clientSince: client.createdAt,
    status: client.deletedAt ? "archived" : "active",
  };
}

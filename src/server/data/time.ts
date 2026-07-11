import "server-only";

import { db } from "@/lib/db";

/** All reads REQUIRE an agencyId and filter by it — mirrors src/server/data/timeline.ts. */

const PAGE_SIZE = 25;

export interface ActiveTimerSession {
  id: string;
  projectId: string;
  projectName: string;
  taskId: string | null;
  taskTitle: string | null;
  description: string | null;
  startedAt: Date;
  pausedAt: Date | null;
  accumulatedSeconds: number;
  status: "running" | "paused";
}

export async function getActiveTimerSession(agencyId: string, userId: string): Promise<ActiveTimerSession | null> {
  const session = await db.timerSession.findFirst({
    where: { agencyId, userId },
    select: {
      id: true,
      projectId: true,
      taskId: true,
      description: true,
      startedAt: true,
      pausedAt: true,
      accumulatedSeconds: true,
      status: true,
      project: { select: { name: true } },
      task: { select: { title: true } },
    },
  });
  if (!session) return null;
  return {
    id: session.id,
    projectId: session.projectId,
    projectName: session.project.name,
    taskId: session.taskId,
    taskTitle: session.task?.title ?? null,
    description: session.description,
    startedAt: session.startedAt,
    pausedAt: session.pausedAt,
    accumulatedSeconds: session.accumulatedSeconds,
    status: session.status as "running" | "paused",
  };
}

export interface TimeEntryRow {
  id: string;
  userId: string;
  userName: string;
  projectId: string;
  projectName: string;
  clientId: string;
  clientName: string;
  taskId: string | null;
  taskTitle: string | null;
  description: string | null;
  startedAt: Date;
  endedAt: Date | null;
  durationMinutes: number;
  billable: boolean;
  billableRate: number | null;
  costRate: number | null;
}

export interface TimeEntryPage {
  items: TimeEntryRow[];
  nextCursor: string | null;
}

export interface ListTimeEntriesOptions {
  cursor?: string;
  take?: number;
  userId?: string;
  projectId?: string;
  clientId?: string;
  from?: Date;
  to?: Date;
}

function mapEntry(row: {
  id: string;
  userId: string;
  projectId: string;
  clientId: string;
  taskId: string | null;
  description: string | null;
  startedAt: Date;
  endedAt: Date | null;
  durationMinutes: number;
  billable: boolean;
  billableRate: unknown;
  costRate: unknown;
  user: { name: string };
  project: { name: string };
  client: { name: string };
  task: { title: string } | null;
}): TimeEntryRow {
  return {
    id: row.id,
    userId: row.userId,
    userName: row.user.name,
    projectId: row.projectId,
    projectName: row.project.name,
    clientId: row.clientId,
    clientName: row.client.name,
    taskId: row.taskId,
    taskTitle: row.task?.title ?? null,
    description: row.description,
    startedAt: row.startedAt,
    endedAt: row.endedAt,
    durationMinutes: row.durationMinutes,
    billable: row.billable,
    billableRate: row.billableRate !== null ? Number(row.billableRate) : null,
    costRate: row.costRate !== null ? Number(row.costRate) : null,
  };
}

/** Cursor-paginated, newest first — mirrors getClientTimeline's exact pattern. */
export async function listTimeEntries(agencyId: string, options: ListTimeEntriesOptions = {}): Promise<TimeEntryPage> {
  const take = options.take ?? PAGE_SIZE;

  const rows = await db.timeEntry.findMany({
    where: {
      agencyId,
      ...(options.userId ? { userId: options.userId } : {}),
      ...(options.projectId ? { projectId: options.projectId } : {}),
      ...(options.clientId ? { clientId: options.clientId } : {}),
      ...(options.from || options.to
        ? { startedAt: { ...(options.from ? { gte: options.from } : {}), ...(options.to ? { lte: options.to } : {}) } }
        : {}),
    },
    orderBy: [{ startedAt: "desc" }, { id: "desc" }],
    take: take + 1,
    ...(options.cursor ? { cursor: { id: options.cursor }, skip: 1 } : {}),
    select: {
      id: true,
      userId: true,
      projectId: true,
      clientId: true,
      taskId: true,
      description: true,
      startedAt: true,
      endedAt: true,
      durationMinutes: true,
      billable: true,
      billableRate: true,
      costRate: true,
      user: { select: { name: true } },
      project: { select: { name: true } },
      client: { select: { name: true } },
      task: { select: { title: true } },
    },
  });

  const hasMore = rows.length > take;
  const page = hasMore ? rows.slice(0, take) : rows;
  const items = page.map(mapEntry);

  return { items, nextCursor: hasMore ? items[items.length - 1].id : null };
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}
function endOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}
function startOfWeek(date: Date): Date {
  const d = startOfDay(date);
  const day = d.getDay();
  const diff = (day + 6) % 7; // Monday as start of week
  d.setDate(d.getDate() - diff);
  return d;
}

export async function getDailyView(agencyId: string, userId: string, date: Date): Promise<TimeEntryRow[]> {
  const { items } = await listTimeEntries(agencyId, { userId, from: startOfDay(date), to: endOfDay(date), take: 100 });
  return items;
}

export async function getWeeklyView(agencyId: string, userId: string, date: Date): Promise<TimeEntryRow[]> {
  const start = startOfWeek(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const { items } = await listTimeEntries(agencyId, { userId, from: start, to: endOfDay(end), take: 250 });
  return items;
}

export interface WorkloadRow {
  userId: string;
  userName: string;
  capacityHours: number;
  assignedHours: number;
  remainingHours: number;
  utilizationPercent: number;
  overloaded: boolean;
}

/** One groupBy over TimeEntry for the current week — no per-user loop. */
export async function getTeamWorkload(agencyId: string): Promise<WorkloadRow[]> {
  const weekStart = startOfWeek(new Date());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const [users, grouped] = await Promise.all([
    db.user.findMany({ where: { agencyId }, select: { id: true, name: true, weeklyCapacityHours: true } }),
    db.timeEntry.groupBy({
      by: ["userId"],
      where: { agencyId, startedAt: { gte: weekStart, lte: endOfDay(weekEnd) } },
      _sum: { durationMinutes: true },
    }),
  ]);

  const minutesByUser = new Map(grouped.map((g) => [g.userId, g._sum.durationMinutes ?? 0]));

  return users.map((u) => {
    const assignedHours = (minutesByUser.get(u.id) ?? 0) / 60;
    const capacityHours = u.weeklyCapacityHours ?? 40;
    const utilizationPercent = capacityHours > 0 ? Math.round((assignedHours / capacityHours) * 100) : 0;
    return {
      userId: u.id,
      userName: u.name,
      capacityHours,
      assignedHours: Math.round(assignedHours * 100) / 100,
      remainingHours: Math.round((capacityHours - assignedHours) * 100) / 100,
      utilizationPercent,
      overloaded: assignedHours > capacityHours,
    };
  });
}

export interface ProjectCapacityRow {
  projectId: string;
  projectName: string;
  clientName: string;
  estimatedHours: number | null;
  actualHours: number;
  remainingHours: number | null;
  forecastCompletion: Date | null;
}

/** One groupBy over TimeEntry, joined against Project.estimatedHours — no per-project loop. */
export async function getProjectCapacity(agencyId: string): Promise<ProjectCapacityRow[]> {
  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

  const [projects, actualGrouped, recentGrouped] = await Promise.all([
    db.project.findMany({
      where: { agencyId, deletedAt: null, status: { not: "COMPLETED" } },
      select: { id: true, name: true, estimatedHours: true, client: { select: { name: true } } },
    }),
    db.timeEntry.groupBy({ by: ["projectId"], where: { agencyId }, _sum: { durationMinutes: true } }),
    db.timeEntry.groupBy({
      by: ["projectId"],
      where: { agencyId, startedAt: { gte: fourWeeksAgo } },
      _sum: { durationMinutes: true },
    }),
  ]);

  const actualByProject = new Map(actualGrouped.map((g) => [g.projectId, (g._sum.durationMinutes ?? 0) / 60]));
  const recentByProject = new Map(recentGrouped.map((g) => [g.projectId, (g._sum.durationMinutes ?? 0) / 60]));

  return projects.map((p) => {
    const actualHours = Math.round((actualByProject.get(p.id) ?? 0) * 100) / 100;
    const estimatedHours = p.estimatedHours ?? null;
    const remainingHours = estimatedHours !== null ? Math.round((estimatedHours - actualHours) * 100) / 100 : null;
    const weeklyPace = (recentByProject.get(p.id) ?? 0) / 4;

    let forecastCompletion: Date | null = null;
    if (remainingHours !== null && remainingHours > 0 && weeklyPace > 0) {
      const weeksLeft = remainingHours / weeklyPace;
      forecastCompletion = new Date();
      forecastCompletion.setDate(forecastCompletion.getDate() + Math.ceil(weeksLeft * 7));
    }

    return {
      projectId: p.id,
      projectName: p.name,
      clientName: p.client.name,
      estimatedHours,
      actualHours,
      remainingHours,
      forecastCompletion,
    };
  });
}

export interface ClientTimeSummary {
  billableHoursThisMonth: number;
  totalHoursThisMonth: number;
}

/** Read-only rollup for the Client Portal's Time Summary card. */
export async function getClientTimeSummary(agencyId: string, clientId: string): Promise<ClientTimeSummary> {
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const [billable, total] = await Promise.all([
    db.timeEntry.aggregate({
      where: { agencyId, clientId, billable: true, startedAt: { gte: monthStart } },
      _sum: { durationMinutes: true },
    }),
    db.timeEntry.aggregate({
      where: { agencyId, clientId, startedAt: { gte: monthStart } },
      _sum: { durationMinutes: true },
    }),
  ]);

  return {
    billableHoursThisMonth: Math.round(((billable._sum.durationMinutes ?? 0) / 60) * 100) / 100,
    totalHoursThisMonth: Math.round(((total._sum.durationMinutes ?? 0) / 60) * 100) / 100,
  };
}

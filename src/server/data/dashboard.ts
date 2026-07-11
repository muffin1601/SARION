import "server-only";

import { db } from "@/lib/db";
import { computeTrend, type TrendValue } from "@/lib/trend";
import { computeHealthScore, computeClientHealthScore, type HealthScore } from "@/lib/health-score";
import {
  buildDashboardSignals,
  priorityWorthySignals,
  type DashboardSignal,
} from "@/lib/dashboard-priorities";
import type { TimelineEntry } from "@/components/timeline/types";
import { getAgencyTimeline } from "@/server/data/timeline";
import { listTeamMembers, type TeamMember } from "@/server/data/team";
import { getRecentAutomationRuns, type RecentAutomationRun } from "@/server/data/automations";
import { getFinanceSnapshotForDashboard, type FinanceSnapshot } from "@/server/data/finance";
import { getRecurringOverview } from "@/server/data/recurring";
import { getTeamWorkload } from "@/server/data/time";

/**
 * All reads REQUIRE an agencyId and filter by it — tenant isolation at the
 * data layer, mirroring src/server/data/clients.ts. Backs the Business
 * Command Center (/dashboard). Everything here is computed from the existing
 * Client/Project/Task/Invoice/Activity/User tables — no fabricated metrics.
 *
 * Two documented proxies (no better source exists in the schema):
 *  - "Paid at" uses Invoice.updatedAt (the timestamp of the last status
 *    change) since there is no dedicated paidAt column.
 *  - "Meeting today" scans recent "Meeting Scheduled" activities for a
 *    metadata.meetingAt that falls today — meetings are logged Activity rows
 *    with free-form metadata, not a structured calendar model.
 */

function startOfDay(d = new Date()): Date {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date;
}
function addDays(d: Date, days: number): Date {
  const date = new Date(d);
  date.setDate(date.getDate() + days);
  return date;
}
function startOfMonth(d = new Date()): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function monthKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export type { TrendValue };
export { computeTrend };

export interface SnapshotCard {
  key: string;
  label: string;
  value: number;
  formatted: string;
  href: string;
  trend: TrendValue | null;
}

export interface OnboardingStatus {
  hasClient: boolean;
  hasProject: boolean;
  hasLogo: boolean;
  hasPortalView: boolean;
  hasInvoice: boolean;
  hasTeamInvite: boolean;
}

export interface RevenueChartData {
  monthlyRevenue: { month: string; total: number }[];
  invoiceStatus: { status: string; count: number }[];
  outstandingAging: { bucket: string; amount: number }[];
}

export interface ProjectOverview {
  planned: number;
  active: number;
  completed: number;
  onHold: number;
  delayed: number;
}

export interface TopClient {
  id: string;
  name: string;
  company: string | null;
  revenue: number;
  outstanding: number;
  projectCount: number;
  healthScore: number;
}

export interface RecentInvoice {
  id: string;
  number: string;
  status: string;
  total: number;
  dueDate: Date | null;
  clientName: string;
}

export interface TeamActivity {
  roster: TeamMember[];
  recentlyCompleted: TimelineEntry[];
}

export interface OpsSnapshot {
  todaysHours: number;
  billableHoursThisWeek: number;
  teamUtilizationPercent: number;
  upcomingRenewals: { id: string; name: string; clientName: string; amount: number; nextBillingDate: Date }[];
  recurringRevenueFormatted: string;
  proposalPipeline: { status: string; count: number }[];
}

export interface CommandCenterData {
  snapshot: SnapshotCard[];
  health: HealthScore;
  priorities: DashboardSignal[];
  notifications: DashboardSignal[];
  recentActivity: TimelineEntry[];
  revenueCharts: RevenueChartData;
  projectOverview: ProjectOverview;
  topClients: TopClient[];
  recentInvoices: RecentInvoice[];
  teamActivity: TeamActivity;
  onboarding: OnboardingStatus;
  recentAutomationRuns: RecentAutomationRun[];
  financeSnapshot: FinanceSnapshot;
  ops: OpsSnapshot;
}

function money(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export async function getCommandCenterData(agencyId: string): Promise<CommandCenterData> {
  const today = startOfDay();
  const tomorrow = addDays(today, 1);
  const yesterday = addDays(today, -1);
  const weekAgo = addDays(today, -7);
  const twoWeeksAgo = addDays(today, -14);
  const monthStart = startOfMonth(today);
  const lastMonthStart = startOfMonth(addDays(monthStart, -1));
  const thirtyDaysAgo = addDays(today, -30);
  const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);
  const weekStart = addDays(today, -((today.getDay() + 6) % 7));

  const [
    todayRevenueAgg,
    yesterdayRevenueAgg,
    monthlyRevenueAgg,
    lastMonthRevenueAgg,
    outstandingAgg,
    activeProjectCount,
    delayedProjectCount,
    invoicesDueCount,
    totalClients,
    newClientsThisWeek,
    newClientsLastWeek,
    newClientsThisMonth,
    newClientsLastMonth,
    teamMemberCount,
    openTaskCount,
    totalTaskCount,
    overdueInvoices,
    totalInvoicedAgg,
    delayedProjectsList,
    recentMeetingActivities,
    activityLastPerClient,
    activeClientNames,
    revenueLast6Months,
    paidInvoiceCount,
    unpaidInvoiceCount,
    overdueInvoiceCount,
    unpaidInvoicesForAging,
    projectStatusGroups,
    topClientRevenue,
    recentInvoicesRaw,
    roster,
    recentlyCompletedActivity,
    agencyForLogo,
    portalViewCount,
    invoiceCount,
    userCount,
    recentAutomationRuns,
    financeSnapshot,
    todaysHoursAgg,
    billableHoursThisWeekAgg,
    workloadRows,
    recurringOverview,
    proposalStatusGroups,
    autoPausedSubscriptions,
  ] = await Promise.all([
    db.invoice.aggregate({
      where: { agencyId, deletedAt: null, status: "paid", updatedAt: { gte: today, lt: tomorrow } },
      _sum: { total: true },
    }),
    db.invoice.aggregate({
      where: { agencyId, deletedAt: null, status: "paid", updatedAt: { gte: yesterday, lt: today } },
      _sum: { total: true },
    }),
    db.invoice.aggregate({
      where: { agencyId, deletedAt: null, status: "paid", updatedAt: { gte: monthStart } },
      _sum: { total: true },
    }),
    db.invoice.aggregate({
      where: { agencyId, deletedAt: null, status: "paid", updatedAt: { gte: lastMonthStart, lt: monthStart } },
      _sum: { total: true },
    }),
    db.invoice.aggregate({
      where: { agencyId, deletedAt: null, status: { not: "paid" } },
      _sum: { total: true },
    }),
    db.project.count({ where: { agencyId, deletedAt: null, status: "ACTIVE" } }),
    db.project.count({
      where: { agencyId, deletedAt: null, status: { not: "COMPLETED" }, dueDate: { lt: today } },
    }),
    db.invoice.count({
      where: { agencyId, deletedAt: null, status: "unpaid", dueDate: { gte: today, lte: addDays(today, 7) } },
    }),
    db.client.count({ where: { agencyId, deletedAt: null } }),
    db.client.count({ where: { agencyId, deletedAt: null, createdAt: { gte: weekAgo } } }),
    db.client.count({
      where: { agencyId, deletedAt: null, createdAt: { gte: twoWeeksAgo, lt: weekAgo } },
    }),
    db.client.count({ where: { agencyId, deletedAt: null, createdAt: { gte: monthStart } } }),
    db.client.count({
      where: { agencyId, deletedAt: null, createdAt: { gte: lastMonthStart, lt: monthStart } },
    }),
    db.user.count({ where: { agencyId } }),
    db.task.count({ where: { agencyId, isDone: false, project: { deletedAt: null } } }),
    db.task.count({ where: { agencyId, project: { deletedAt: null } } }),
    db.invoice.findMany({
      where: { agencyId, deletedAt: null, status: "unpaid", dueDate: { lt: today } },
      orderBy: { dueDate: "asc" },
      take: 5,
      select: { id: true, number: true, total: true, client: { select: { name: true } } },
    }),
    db.invoice.aggregate({
      where: { agencyId, deletedAt: null },
      _sum: { total: true },
    }),
    db.project.findMany({
      where: { agencyId, deletedAt: null, status: { not: "COMPLETED" }, dueDate: { lt: today } },
      orderBy: { dueDate: "asc" },
      take: 5,
      select: { id: true, name: true, dueDate: true, client: { select: { name: true } } },
    }),
    // Bounded best-effort scan for today's meetings — metadata isn't indexed.
    db.activity.findMany({
      where: { agencyId, type: "Meeting Scheduled" },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: { id: true, description: true, metadata: true, client: { select: { name: true } } },
    }),
    db.activity.groupBy({
      by: ["clientId"],
      where: { agencyId, clientId: { not: null } },
      _max: { createdAt: true },
    }),
    db.client.findMany({
      where: { agencyId, deletedAt: null },
      select: { id: true, name: true },
    }),
    db.invoice.findMany({
      where: { agencyId, deletedAt: null, status: "paid", updatedAt: { gte: sixMonthsAgo } },
      select: { total: true, updatedAt: true },
    }),
    db.invoice.count({ where: { agencyId, deletedAt: null, status: "paid" } }),
    db.invoice.count({ where: { agencyId, deletedAt: null, status: "unpaid", dueDate: { gte: today } } }),
    db.invoice.count({ where: { agencyId, deletedAt: null, status: "unpaid", dueDate: { lt: today } } }),
    db.invoice.findMany({
      where: { agencyId, deletedAt: null, status: "unpaid" },
      select: { total: true, dueDate: true },
    }),
    db.project.groupBy({ by: ["status"], where: { agencyId, deletedAt: null }, _count: { _all: true } }),
    db.invoice.groupBy({
      by: ["clientId"],
      where: { agencyId, deletedAt: null, status: "paid" },
      _sum: { total: true },
      orderBy: { _sum: { total: "desc" } },
      take: 10,
    }),
    db.invoice.findMany({
      where: { agencyId, deletedAt: null },
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        id: true,
        number: true,
        status: true,
        total: true,
        dueDate: true,
        client: { select: { name: true } },
      },
    }),
    listTeamMembers(agencyId),
    db.activity.findMany({
      where: { agencyId, type: { in: ["Project Completed", "Invoice Paid", "Payment Received"] } },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        type: true,
        title: true,
        description: true,
        metadata: true,
        createdAt: true,
        user: { select: { id: true, name: true, image: true } },
      },
    }),
    db.agency.findUnique({ where: { id: agencyId }, select: { logoUrl: true } }),
    db.activity.count({ where: { agencyId, type: "Portal Viewed" } }),
    db.invoice.count({ where: { agencyId, deletedAt: null } }),
    db.user.count({ where: { agencyId } }),
    getRecentAutomationRuns(agencyId, 5),
    getFinanceSnapshotForDashboard(agencyId),
    db.timeEntry.aggregate({ where: { agencyId, startedAt: { gte: today, lt: tomorrow } }, _sum: { durationMinutes: true } }),
    db.timeEntry.aggregate({
      where: { agencyId, billable: true, startedAt: { gte: weekStart } },
      _sum: { durationMinutes: true },
    }),
    getTeamWorkload(agencyId),
    getRecurringOverview(agencyId),
    db.proposal.groupBy({ by: ["status"], where: { agencyId }, _count: { _all: true } }),
    db.subscription.findMany({
      where: { agencyId, status: "paused", autoPausedAt: { not: null } },
      select: { id: true, name: true, consecutiveFailureCount: true },
    }),
  ]);

  const todayRevenue = Number(todayRevenueAgg._sum.total ?? 0);
  const yesterdayRevenue = Number(yesterdayRevenueAgg._sum.total ?? 0);
  const monthlyRevenue = Number(monthlyRevenueAgg._sum.total ?? 0);
  const lastMonthRevenue = Number(lastMonthRevenueAgg._sum.total ?? 0);
  const outstanding = Number(outstandingAgg._sum.total ?? 0);

  const snapshot: SnapshotCard[] = [
    {
      key: "todayRevenue",
      label: "Today's Revenue",
      value: todayRevenue,
      formatted: money(todayRevenue),
      href: "/invoices",
      trend: computeTrend(todayRevenue, yesterdayRevenue),
    },
    {
      key: "monthlyRevenue",
      label: "Monthly Revenue",
      value: monthlyRevenue,
      formatted: money(monthlyRevenue),
      href: "/invoices",
      trend: computeTrend(monthlyRevenue, lastMonthRevenue),
    },
    {
      key: "outstanding",
      label: "Outstanding Payments",
      value: outstanding,
      formatted: money(outstanding),
      href: "/invoices?status=unpaid",
      trend: null,
    },
    {
      key: "projectsActive",
      label: "Projects Active",
      value: activeProjectCount,
      formatted: String(activeProjectCount),
      href: "/projects",
      trend: null,
    },
    {
      key: "projectsDelayed",
      label: "Projects Delayed",
      value: delayedProjectCount,
      formatted: String(delayedProjectCount),
      href: "/projects",
      trend: null,
    },
    {
      key: "invoicesDue",
      label: "Invoices Due",
      value: invoicesDueCount,
      formatted: String(invoicesDueCount),
      href: "/invoices?status=unpaid",
      trend: null,
    },
    {
      key: "clients",
      label: "Clients",
      value: totalClients,
      formatted: String(totalClients),
      href: "/clients",
      trend: null,
    },
    {
      key: "newClients",
      label: "New Clients (7d)",
      value: newClientsThisWeek,
      formatted: String(newClientsThisWeek),
      href: "/clients",
      trend: computeTrend(newClientsThisWeek, newClientsLastWeek),
    },
    {
      key: "teamMembers",
      label: "Team Members",
      value: teamMemberCount,
      formatted: String(teamMemberCount),
      href: "/team",
      trend: null,
    },
    {
      key: "openTasks",
      label: "Open Tasks",
      value: openTaskCount,
      formatted: String(openTaskCount),
      href: "/projects",
      trend: null,
    },
  ];

  const overdueInvoiceAmount = overdueInvoices.reduce((sum, inv) => sum + Number(inv.total), 0);

  const health = computeHealthScore({
    overdueInvoiceCount: overdueInvoices.length,
    overdueInvoiceAmount,
    totalInvoicedAmount: Number(totalInvoicedAgg._sum.total ?? 0),
    totalPaidAmount: monthlyRevenue,
    activeProjectCount,
    delayedProjectCount,
    totalTasks: totalTaskCount,
    doneTasks: totalTaskCount - openTaskCount,
    totalClients,
    clientsActiveLast30d: activityLastPerClient.filter(
      (row) => row._max.createdAt && row._max.createdAt >= thirtyDaysAgo,
    ).length,
    newClientsThisMonth,
    newClientsLastMonth,
  });

  const today8601 = today.toISOString().slice(0, 10);
  const meetingsToday = recentMeetingActivities
    .map((row) => {
      const metadata = row.metadata as Record<string, unknown> | null;
      const meetingAt = typeof metadata?.meetingAt === "string" ? metadata.meetingAt : null;
      return { id: row.id, description: row.description, clientName: row.client?.name ?? null, meetingAt };
    })
    .filter((m) => m.meetingAt && m.meetingAt.slice(0, 10) === today8601);

  const lastActivityByClient = new Map(
    activityLastPerClient.map((row) => [row.clientId as string, row._max.createdAt]),
  );
  const inactiveClients = activeClientNames
    .map((c) => ({ id: c.id, name: c.name, lastActivityAt: lastActivityByClient.get(c.id) ?? null }))
    .filter((c) => !c.lastActivityAt || c.lastActivityAt < thirtyDaysAgo)
    .slice(0, 5);

  const signals = buildDashboardSignals({
    overdueInvoices: overdueInvoices.map((inv) => ({
      id: inv.id,
      number: inv.number,
      amount: Number(inv.total),
      clientName: inv.client.name,
    })),
    delayedProjects: delayedProjectsList.map((p) => ({
      id: p.id,
      name: p.name,
      clientName: p.client.name,
      dueDate: p.dueDate as Date,
    })),
    meetingsToday: meetingsToday.map((m) => ({ id: m.id, description: m.description, clientName: m.clientName })),
    inactiveClients,
    autoPausedSubscriptions,
  });

  const recentActivityPage = await getAgencyTimeline(agencyId, { take: 10 });

  const revenueByMonth = new Map<string, number>();
  for (const inv of revenueLast6Months) {
    const key = monthKey(inv.updatedAt);
    revenueByMonth.set(key, (revenueByMonth.get(key) ?? 0) + Number(inv.total));
  }
  const monthlyRevenueSeries: { month: string; total: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const key = monthKey(d);
    monthlyRevenueSeries.push({
      month: d.toLocaleDateString("en-US", { month: "short" }),
      total: revenueByMonth.get(key) ?? 0,
    });
  }

  const agingBuckets = { current: 0, "1-30": 0, "31-60": 0, "61-90": 0, "90+": 0 };
  for (const inv of unpaidInvoicesForAging) {
    const total = Number(inv.total);
    if (!inv.dueDate || inv.dueDate >= today) {
      agingBuckets.current += total;
      continue;
    }
    const daysPastDue = Math.floor((today.getTime() - inv.dueDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysPastDue <= 30) agingBuckets["1-30"] += total;
    else if (daysPastDue <= 60) agingBuckets["31-60"] += total;
    else if (daysPastDue <= 90) agingBuckets["61-90"] += total;
    else agingBuckets["90+"] += total;
  }

  const revenueCharts: RevenueChartData = {
    monthlyRevenue: monthlyRevenueSeries,
    invoiceStatus: [
      { status: "Paid", count: paidInvoiceCount },
      { status: "Unpaid", count: unpaidInvoiceCount },
      { status: "Overdue", count: overdueInvoiceCount },
    ],
    outstandingAging: Object.entries(agingBuckets).map(([bucket, amount]) => ({ bucket, amount })),
  };

  const statusCountByKey = Object.fromEntries(
    projectStatusGroups.map((g) => [g.status, g._count._all]),
  ) as Record<string, number>;
  const projectOverview: ProjectOverview = {
    planned: statusCountByKey.PLANNED ?? 0,
    active: statusCountByKey.ACTIVE ?? 0,
    completed: statusCountByKey.COMPLETED ?? 0,
    onHold: statusCountByKey.ON_HOLD ?? 0,
    delayed: delayedProjectCount,
  };

  const topClientIds = topClientRevenue.map((g) => g.clientId).filter((id): id is string => Boolean(id));
  const [topClientDetails, topClientOutstanding, topClientProjectCounts] = await Promise.all([
    db.client.findMany({ where: { id: { in: topClientIds } }, select: { id: true, name: true, company: true } }),
    db.invoice.groupBy({
      by: ["clientId"],
      where: { agencyId, deletedAt: null, status: { not: "paid" }, clientId: { in: topClientIds } },
      _sum: { total: true },
    }),
    db.project.groupBy({
      by: ["clientId"],
      where: { agencyId, deletedAt: null, clientId: { in: topClientIds } },
      _count: { _all: true },
    }),
  ]);
  const clientById = new Map(topClientDetails.map((c) => [c.id, c]));
  const outstandingByClient = new Map(
    topClientOutstanding.map((g) => [g.clientId as string, Number(g._sum.total ?? 0)]),
  );
  const projectCountByClient = new Map(topClientProjectCounts.map((g) => [g.clientId as string, g._count._all]));

  const topClients: TopClient[] = topClientRevenue
    .map((g) => {
      const client = clientById.get(g.clientId as string);
      if (!client) return null;
      const revenue = Number(g._sum.total ?? 0);
      const outstandingForClient = outstandingByClient.get(client.id) ?? 0;
      return {
        id: client.id,
        name: client.name,
        company: client.company,
        revenue,
        outstanding: outstandingForClient,
        projectCount: projectCountByClient.get(client.id) ?? 0,
        healthScore: computeClientHealthScore({
          totalInvoiced: revenue + outstandingForClient,
          overdueAmount: outstandingForClient,
          lastActivityAt: lastActivityByClient.get(client.id) ?? null,
        }),
      };
    })
    .filter((c): c is TopClient => c !== null);

  const recentInvoices: RecentInvoice[] = recentInvoicesRaw.map((inv) => ({
    id: inv.id,
    number: inv.number,
    status: inv.status,
    total: Number(inv.total),
    dueDate: inv.dueDate,
    clientName: inv.client.name,
  }));

  const recentlyCompleted: TimelineEntry[] = recentlyCompletedActivity.map((row) => ({
    id: row.id,
    type: row.type,
    title: row.title ?? row.type,
    description: row.description,
    metadata: (row.metadata as Record<string, unknown> | null) ?? null,
    actor: row.user ? { id: row.user.id, name: row.user.name, image: row.user.image } : null,
    createdAt: row.createdAt.toISOString(),
  }));

  const avgUtilization =
    workloadRows.length > 0
      ? Math.round(workloadRows.reduce((sum, w) => sum + w.utilizationPercent, 0) / workloadRows.length)
      : 0;

  const ops: OpsSnapshot = {
    todaysHours: Math.round(((todaysHoursAgg._sum.durationMinutes ?? 0) / 60) * 100) / 100,
    billableHoursThisWeek: Math.round(((billableHoursThisWeekAgg._sum.durationMinutes ?? 0) / 60) * 100) / 100,
    teamUtilizationPercent: avgUtilization,
    upcomingRenewals: recurringOverview.upcomingRenewals.slice(0, 5),
    recurringRevenueFormatted: recurringOverview.mrrFormatted,
    proposalPipeline: proposalStatusGroups.map((g) => ({ status: g.status, count: g._count._all })),
  };

  return {
    snapshot,
    health,
    priorities: priorityWorthySignals(signals),
    notifications: signals,
    recentActivity: recentActivityPage.items,
    revenueCharts,
    projectOverview,
    topClients,
    recentInvoices,
    teamActivity: { roster, recentlyCompleted },
    recentAutomationRuns,
    financeSnapshot,
    ops,
    onboarding: {
      hasClient: totalClients > 0,
      hasProject: activeProjectCount > 0 || projectOverview.completed > 0 || projectOverview.planned > 0 || projectOverview.onHold > 0,
      hasLogo: Boolean(agencyForLogo?.logoUrl),
      hasPortalView: portalViewCount > 0,
      hasInvoice: invoiceCount > 0,
      hasTeamInvite: userCount > 1,
    },
  };
}

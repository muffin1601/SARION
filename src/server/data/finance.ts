import "server-only";

import { db } from "@/lib/db";
import { computeClientHealthScore } from "@/lib/health-score";
import { computeTrend, type TrendValue } from "@/lib/trend";
import { buildDashboardSignals, type DashboardSignal } from "@/lib/dashboard-priorities";
import { buildFinanceAlerts } from "@/lib/finance-alerts";

/**
 * All reads REQUIRE an agencyId and filter by it — tenant isolation at the
 * data layer, mirroring src/server/data/{clients,dashboard}.ts. Backs the
 * Finance Intelligence module (/finance) and the Command Center's finance
 * widget. Revenue/outstanding/"paid at" definitions are kept IDENTICAL to
 * src/server/data/dashboard.ts (paid at = Invoice.updatedAt, same proxy) so
 * the two modules never disagree on a number.
 *
 * Costs come from the new Cost model (src/server/actions/finance.ts) — a flat
 * log, not accounting. Per-project revenue/margin are NOT computed: Invoice
 * has no projectId (invoices belong to Client only), so true per-project
 * revenue attribution isn't derivable without guesswork. Project
 * Profitability is scoped to Estimated/Actual Cost, Estimated Hours, and
 * Budget Variance — real numbers only.
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
function monthsAgo(n: number, d = new Date()): Date {
  return new Date(d.getFullYear(), d.getMonth() - n, 1);
}

function money(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

// --- Overview --------------------------------------------------------------

export interface FinanceMetric {
  key: string;
  label: string;
  value: number;
  formatted: string;
  trend: TrendValue | null;
}

export async function getFinanceOverview(agencyId: string): Promise<FinanceMetric[]> {
  const today = startOfDay();
  const monthStart = startOfMonth(today);
  const lastMonthStart = startOfMonth(monthsAgo(1, today));

  const [
    revenueAgg,
    lastMonthRevenueAgg,
    costsAgg,
    lastMonthCostsAgg,
    outstandingAgg,
    totalClients,
    totalProjects,
    allTimeRevenueAgg,
    clientsInvoicedThisMonth,
    clientsInvoicedLastMonth,
    billableMinutesAgg,
    lastMonthBillableMinutesAgg,
  ] = await Promise.all([
    db.invoice.aggregate({
      where: { agencyId, deletedAt: null, status: "paid", updatedAt: { gte: monthStart } },
      _sum: { total: true },
    }),
    db.invoice.aggregate({
      where: { agencyId, deletedAt: null, status: "paid", updatedAt: { gte: lastMonthStart, lt: monthStart } },
      _sum: { total: true },
    }),
    db.cost.aggregate({
      where: { agencyId, incurredAt: { gte: monthStart } },
      _sum: { amount: true },
    }),
    db.cost.aggregate({
      where: { agencyId, incurredAt: { gte: lastMonthStart, lt: monthStart } },
      _sum: { amount: true },
    }),
    db.invoice.aggregate({
      where: { agencyId, deletedAt: null, status: { not: "paid" } },
      _sum: { total: true },
    }),
    db.client.count({ where: { agencyId, deletedAt: null } }),
    db.project.count({ where: { agencyId, deletedAt: null } }),
    db.invoice.aggregate({
      where: { agencyId, deletedAt: null, status: "paid" },
      _sum: { total: true },
    }),
    db.invoice.findMany({
      where: { agencyId, deletedAt: null, updatedAt: { gte: monthStart } },
      select: { clientId: true },
      distinct: ["clientId"],
    }),
    db.invoice.findMany({
      where: { agencyId, deletedAt: null, updatedAt: { gte: lastMonthStart, lt: monthStart } },
      select: { clientId: true },
      distinct: ["clientId"],
    }),
    db.timeEntry.aggregate({ where: { agencyId, billable: true, startedAt: { gte: monthStart } }, _sum: { durationMinutes: true } }),
    db.timeEntry.aggregate({
      where: { agencyId, billable: true, startedAt: { gte: lastMonthStart, lt: monthStart } },
      _sum: { durationMinutes: true },
    }),
  ]);

  const revenue = Number(revenueAgg._sum.total ?? 0);
  const lastMonthRevenue = Number(lastMonthRevenueAgg._sum.total ?? 0);
  const costs = Number(costsAgg._sum.amount ?? 0);
  const lastMonthCosts = Number(lastMonthCostsAgg._sum.amount ?? 0);
  const outstanding = Number(outstandingAgg._sum.total ?? 0);
  const profit = revenue - costs;
  const lastMonthProfit = lastMonthRevenue - lastMonthCosts;
  const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const lastMonthMargin = lastMonthRevenue > 0 ? (lastMonthProfit / lastMonthRevenue) * 100 : 0;
  const allTimeRevenue = Number(allTimeRevenueAgg._sum.total ?? 0);

  // Recurring revenue heuristic: paid revenue this month from clients also
  // invoiced last month — a real repeat-billing signal, not a stored flag.
  const lastMonthClientIds = new Set(clientsInvoicedLastMonth.map((c) => c.clientId));
  const repeatClientIds = clientsInvoicedThisMonth
    .map((c) => c.clientId)
    .filter((id) => lastMonthClientIds.has(id));
  const recurringRevenueAgg =
    repeatClientIds.length > 0
      ? await db.invoice.aggregate({
          where: { agencyId, deletedAt: null, status: "paid", updatedAt: { gte: monthStart }, clientId: { in: repeatClientIds } },
          _sum: { total: true },
        })
      : null;
  const recurringRevenue = Number(recurringRevenueAgg?._sum.total ?? 0);
  const billableHours = (billableMinutesAgg._sum.durationMinutes ?? 0) / 60;
  const lastMonthBillableHours = (lastMonthBillableMinutesAgg._sum.durationMinutes ?? 0) / 60;

  const metrics: FinanceMetric[] = [
    { key: "revenue", label: "Revenue", value: revenue, formatted: money(revenue), trend: computeTrend(revenue, lastMonthRevenue) },
    { key: "profit", label: "Profit", value: profit, formatted: money(profit), trend: computeTrend(profit, lastMonthProfit) },
    { key: "outstanding", label: "Outstanding", value: outstanding, formatted: money(outstanding), trend: null },
    { key: "expenses", label: "Expenses", value: costs, formatted: money(costs), trend: computeTrend(costs, lastMonthCosts) },
    { key: "cashCollected", label: "Cash Collected", value: revenue, formatted: money(revenue), trend: computeTrend(revenue, lastMonthRevenue) },
    { key: "recurringRevenue", label: "Recurring Revenue", value: recurringRevenue, formatted: money(recurringRevenue), trend: null },
    {
      key: "avgClientValue",
      label: "Avg. Client Value",
      value: totalClients > 0 ? allTimeRevenue / totalClients : 0,
      formatted: money(totalClients > 0 ? allTimeRevenue / totalClients : 0),
      trend: null,
    },
    {
      key: "avgProjectValue",
      label: "Avg. Project Value",
      value: totalProjects > 0 ? allTimeRevenue / totalProjects : 0,
      formatted: money(totalProjects > 0 ? allTimeRevenue / totalProjects : 0),
      trend: null,
    },
    {
      key: "profitMargin",
      label: "Profit Margin",
      value: profitMargin,
      formatted: `${profitMargin.toFixed(1)}%`,
      trend: computeTrend(profitMargin, lastMonthMargin),
    },
    {
      key: "monthlyGrowth",
      label: "Monthly Growth",
      value: lastMonthRevenue > 0 ? ((revenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0,
      formatted: `${(lastMonthRevenue > 0 ? ((revenue - lastMonthRevenue) / lastMonthRevenue) * 100 : 0).toFixed(1)}%`,
      trend: null,
    },
    {
      key: "billableHours",
      label: "Billable Hours",
      value: billableHours,
      formatted: `${billableHours.toFixed(1)}h`,
      trend: computeTrend(billableHours, lastMonthBillableHours),
    },
  ];

  return metrics;
}

/** Lean 3-number subset for the Command Center widget — avoids running the full overview. */
export interface FinanceSnapshot {
  revenue: number;
  profit: number;
  outstanding: number;
}

export async function getFinanceSnapshotForDashboard(agencyId: string): Promise<FinanceSnapshot> {
  const monthStart = startOfMonth();
  const [revenueAgg, costsAgg, outstandingAgg] = await Promise.all([
    db.invoice.aggregate({
      where: { agencyId, deletedAt: null, status: "paid", updatedAt: { gte: monthStart } },
      _sum: { total: true },
    }),
    db.cost.aggregate({ where: { agencyId, incurredAt: { gte: monthStart } }, _sum: { amount: true } }),
    db.invoice.aggregate({ where: { agencyId, deletedAt: null, status: { not: "paid" } }, _sum: { total: true } }),
  ]);
  const revenue = Number(revenueAgg._sum.total ?? 0);
  const costs = Number(costsAgg._sum.amount ?? 0);
  return { revenue, profit: revenue - costs, outstanding: Number(outstandingAgg._sum.total ?? 0) };
}

// --- Client profitability ---------------------------------------------------

export interface ClientProfitability {
  id: string;
  name: string;
  company: string | null;
  revenue: number;
  costs: number;
  profit: number;
  marginPercent: number;
  projectCount: number;
  outstanding: number;
  healthScore: number;
  trend: TrendValue | null;
  /** Billable hours logged × rate — a potential-revenue signal, never conflated with actual invoiced `revenue`. */
  billableHoursValue: number;
}

interface TimeAggregate {
  cost: number;
  billableHoursValue: number;
}

/**
 * TimeEntry cost/value cannot be expressed as a Prisma groupBy (cost is
 * duration × per-row rate, not a summable column), so this reduces the raw
 * rows in JS — same tradeoff already accepted for per-row Cost logs
 * elsewhere in this file. Scoped to one agency, so row counts stay bounded.
 */
async function getTimeAggregatesByKey(
  agencyId: string,
  key: "clientId" | "projectId",
): Promise<Map<string, TimeAggregate>> {
  const entries = await db.timeEntry.findMany({
    where: { agencyId },
    select: { clientId: true, projectId: true, durationMinutes: true, costRate: true, billable: true, billableRate: true },
  });

  const map = new Map<string, TimeAggregate>();
  for (const entry of entries) {
    const k = key === "clientId" ? entry.clientId : entry.projectId;
    const hours = entry.durationMinutes / 60;
    const cost = entry.costRate !== null ? hours * Number(entry.costRate) : 0;
    const billableValue = entry.billable && entry.billableRate !== null ? hours * Number(entry.billableRate) : 0;
    const existing = map.get(k) ?? { cost: 0, billableHoursValue: 0 };
    existing.cost += cost;
    existing.billableHoursValue += billableValue;
    map.set(k, existing);
  }
  return map;
}

export async function getClientProfitability(agencyId: string): Promise<ClientProfitability[]> {
  const today = startOfDay();
  const monthStart = startOfMonth(today);
  const lastMonthStart = startOfMonth(monthsAgo(1, today));

  const clients = await db.client.findMany({
    where: { agencyId, deletedAt: null },
    select: { id: true, name: true, company: true },
  });
  const clientIds = clients.map((c) => c.id);
  if (clientIds.length === 0) return [];

  const [
    revenueGroups,
    outstandingGroups,
    projectCountGroups,
    directCostGroups,
    projectsByClient,
    thisMonthRevenueGroups,
    lastMonthRevenueGroups,
    lastActivityGroups,
    timeAggregatesByClient,
  ] = await Promise.all([
    db.invoice.groupBy({
      by: ["clientId"],
      where: { agencyId, deletedAt: null, status: "paid", clientId: { in: clientIds } },
      _sum: { total: true },
    }),
    db.invoice.groupBy({
      by: ["clientId"],
      where: { agencyId, deletedAt: null, status: { not: "paid" }, clientId: { in: clientIds } },
      _sum: { total: true },
    }),
    db.project.groupBy({
      by: ["clientId"],
      where: { agencyId, deletedAt: null, clientId: { in: clientIds } },
      _count: { _all: true },
    }),
    db.cost.groupBy({
      by: ["clientId"],
      // projectId: null — project-linked costs are rolled up separately via
      // projectCostGroups below; including them here would double-count them.
      where: { agencyId, clientId: { in: clientIds }, projectId: null },
      _sum: { amount: true },
    }),
    db.project.findMany({
      where: { agencyId, deletedAt: null, clientId: { in: clientIds } },
      select: { id: true, clientId: true },
    }),
    db.invoice.groupBy({
      by: ["clientId"],
      where: { agencyId, deletedAt: null, status: "paid", updatedAt: { gte: monthStart }, clientId: { in: clientIds } },
      _sum: { total: true },
    }),
    db.invoice.groupBy({
      by: ["clientId"],
      where: {
        agencyId,
        deletedAt: null,
        status: "paid",
        updatedAt: { gte: lastMonthStart, lt: monthStart },
        clientId: { in: clientIds },
      },
      _sum: { total: true },
    }),
    db.activity.groupBy({
      by: ["clientId"],
      where: { agencyId, clientId: { in: clientIds } },
      _max: { createdAt: true },
    }),
    getTimeAggregatesByKey(agencyId, "clientId"),
  ]);

  const projectIdsByClient = new Map<string, string[]>();
  for (const p of projectsByClient) {
    const list = projectIdsByClient.get(p.clientId) ?? [];
    list.push(p.id);
    projectIdsByClient.set(p.clientId, list);
  }
  const allProjectIds = projectsByClient.map((p) => p.id);
  const projectCostGroups = allProjectIds.length
    ? await db.cost.groupBy({
        by: ["projectId"],
        where: { agencyId, projectId: { in: allProjectIds } },
        _sum: { amount: true },
      })
    : [];
  const costByProjectId = new Map(projectCostGroups.map((g) => [g.projectId as string, Number(g._sum.amount ?? 0)]));

  const revenueByClient = new Map(revenueGroups.map((g) => [g.clientId as string, Number(g._sum.total ?? 0)]));
  const outstandingByClient = new Map(outstandingGroups.map((g) => [g.clientId as string, Number(g._sum.total ?? 0)]));
  const projectCountByClient = new Map(projectCountGroups.map((g) => [g.clientId as string, g._count._all]));
  const directCostByClient = new Map(directCostGroups.map((g) => [g.clientId as string, Number(g._sum.amount ?? 0)]));
  const thisMonthRevenueByClient = new Map(thisMonthRevenueGroups.map((g) => [g.clientId as string, Number(g._sum.total ?? 0)]));
  const lastMonthRevenueByClient = new Map(lastMonthRevenueGroups.map((g) => [g.clientId as string, Number(g._sum.total ?? 0)]));
  const lastActivityByClient = new Map(lastActivityGroups.map((g) => [g.clientId as string, g._max.createdAt]));

  return clients.map((client) => {
    const revenue = revenueByClient.get(client.id) ?? 0;
    const outstanding = outstandingByClient.get(client.id) ?? 0;
    const projectCosts = (projectIdsByClient.get(client.id) ?? []).reduce(
      (sum, pid) => sum + (costByProjectId.get(pid) ?? 0),
      0,
    );
    const timeAggregate = timeAggregatesByClient.get(client.id);
    const costs = (directCostByClient.get(client.id) ?? 0) + projectCosts + (timeAggregate?.cost ?? 0);
    const profit = revenue - costs;
    const marginPercent = revenue > 0 ? (profit / revenue) * 100 : 0;

    return {
      id: client.id,
      name: client.name,
      company: client.company,
      revenue,
      costs,
      profit,
      marginPercent,
      projectCount: projectCountByClient.get(client.id) ?? 0,
      outstanding,
      healthScore: computeClientHealthScore({
        totalInvoiced: revenue + outstanding,
        overdueAmount: outstanding,
        lastActivityAt: lastActivityByClient.get(client.id) ?? null,
      }),
      trend: computeTrend(thisMonthRevenueByClient.get(client.id) ?? 0, lastMonthRevenueByClient.get(client.id) ?? 0),
      billableHoursValue: timeAggregate?.billableHoursValue ?? 0,
    };
  }).filter((c) => c.revenue > 0 || c.costs > 0 || c.outstanding > 0 || c.billableHoursValue > 0)
    .sort((a, b) => b.profit - a.profit);
}

// --- Project profitability --------------------------------------------------

export interface ProjectProfitability {
  id: string;
  name: string;
  clientName: string;
  status: string;
  estimatedCost: number | null;
  estimatedHours: number | null;
  actualCost: number;
  actualHours: number;
  budgetVariancePercent: number | null;
}

export async function getProjectProfitability(agencyId: string): Promise<ProjectProfitability[]> {
  const projects = await db.project.findMany({
    where: { agencyId, deletedAt: null },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      status: true,
      estimatedCost: true,
      estimatedHours: true,
      client: { select: { name: true } },
    },
  });
  if (projects.length === 0) return [];

  const [costGroups, hoursGroups, timeAggregatesByProject] = await Promise.all([
    db.cost.groupBy({
      by: ["projectId"],
      where: { agencyId, projectId: { in: projects.map((p) => p.id) } },
      _sum: { amount: true },
    }),
    db.timeEntry.groupBy({
      by: ["projectId"],
      where: { agencyId, projectId: { in: projects.map((p) => p.id) } },
      _sum: { durationMinutes: true },
    }),
    getTimeAggregatesByKey(agencyId, "projectId"),
  ]);
  const costByProject = new Map(costGroups.map((g) => [g.projectId as string, Number(g._sum.amount ?? 0)]));
  const hoursByProject = new Map(hoursGroups.map((g) => [g.projectId as string, (g._sum.durationMinutes ?? 0) / 60]));

  return projects.map((p) => {
    const estimatedCost = p.estimatedCost !== null ? Number(p.estimatedCost) : null;
    const timeCost = timeAggregatesByProject.get(p.id)?.cost ?? 0;
    const actualCost = (costByProject.get(p.id) ?? 0) + timeCost;
    return {
      id: p.id,
      name: p.name,
      clientName: p.client.name,
      status: p.status,
      estimatedCost,
      estimatedHours: p.estimatedHours,
      actualCost,
      actualHours: Math.round((hoursByProject.get(p.id) ?? 0) * 100) / 100,
      budgetVariancePercent: estimatedCost && estimatedCost > 0 ? ((estimatedCost - actualCost) / estimatedCost) * 100 : null,
    };
  });
}

// --- Revenue forecast --------------------------------------------------------

export interface RevenueForecast {
  days30: number;
  days90: number;
  months12: number;
  basis: string;
}

/**
 * Trend-based projection — NOT machine learning (no forecasting library
 * exists in the repo). Baseline = average of the last 3 months' paid
 * revenue; growth = average month-over-month change over the same window,
 * clamped to ±30%/month so a single spike/drop can't produce an absurd
 * multi-month compound. 30-day figure also folds in currently unpaid
 * invoices due within the window as a known floor.
 */
export async function getRevenueForecast(agencyId: string): Promise<RevenueForecast> {
  const today = startOfDay();

  const monthlyTotals: number[] = [];
  for (let i = 3; i >= 1; i--) {
    const start = startOfMonth(monthsAgo(i, today));
    const end = startOfMonth(monthsAgo(i - 1, today));
    const agg = await db.invoice.aggregate({
      where: { agencyId, deletedAt: null, status: "paid", updatedAt: { gte: start, lt: end } },
      _sum: { total: true },
    });
    monthlyTotals.push(Number(agg._sum.total ?? 0));
  }

  const avgMonthlyRevenue = monthlyTotals.reduce((a, b) => a + b, 0) / monthlyTotals.length;
  const growthRates: number[] = [];
  for (let i = 1; i < monthlyTotals.length; i++) {
    if (monthlyTotals[i - 1] > 0) growthRates.push((monthlyTotals[i] - monthlyTotals[i - 1]) / monthlyTotals[i - 1]);
  }
  const rawGrowth = growthRates.length ? growthRates.reduce((a, b) => a + b, 0) / growthRates.length : 0;
  const growth = Math.max(-0.3, Math.min(0.3, rawGrowth));

  const unpaidDueSoonAgg = await db.invoice.aggregate({
    where: { agencyId, deletedAt: null, status: "unpaid", dueDate: { gte: today, lte: addDays(today, 30) } },
    _sum: { total: true },
  });
  const unpaidDueSoon = Number(unpaidDueSoonAgg._sum.total ?? 0);

  const days30 = avgMonthlyRevenue * (1 + growth) + unpaidDueSoon;

  let compounding = 0;
  for (let i = 1; i <= 3; i++) compounding += avgMonthlyRevenue * Math.pow(1 + growth, i);
  const days90 = compounding;

  let yearCompounding = 0;
  for (let i = 1; i <= 12; i++) yearCompounding += avgMonthlyRevenue * Math.pow(1 + growth, i);
  const months12 = yearCompounding;

  return {
    days30,
    days90,
    months12,
    basis: `Based on the last 3 months' average revenue (${money(avgMonthlyRevenue)}/mo) at a ${(growth * 100).toFixed(1)}% monthly trend, plus ${money(unpaidDueSoon)} in invoices already due within 30 days.`,
  };
}

// --- Cashflow timeline -------------------------------------------------------

export interface CashflowPoint {
  month: string;
  revenue: number;
  collections: number;
  outstanding: number;
}

export async function getCashflowTimeline(agencyId: string): Promise<CashflowPoint[]> {
  const today = startOfDay();
  const twelveMonthsAgo = startOfMonth(monthsAgo(11, today));

  const [paidInvoices, unpaidInvoices] = await Promise.all([
    db.invoice.findMany({
      where: { agencyId, deletedAt: null, status: "paid", updatedAt: { gte: twelveMonthsAgo } },
      select: { total: true, updatedAt: true },
    }),
    // Outstanding is a point-in-time balance; bucketed here by issueDate as a
    // retrospective snapshot (no historical outstanding snapshots exist).
    db.invoice.findMany({
      where: { agencyId, deletedAt: null, status: { not: "paid" }, issueDate: { gte: twelveMonthsAgo } },
      select: { total: true, issueDate: true },
    }),
  ]);

  const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  const revenueByMonth = new Map<string, number>();
  for (const inv of paidInvoices) {
    const key = monthKey(inv.updatedAt);
    revenueByMonth.set(key, (revenueByMonth.get(key) ?? 0) + Number(inv.total));
  }
  const outstandingByMonth = new Map<string, number>();
  for (const inv of unpaidInvoices) {
    const key = monthKey(inv.issueDate);
    outstandingByMonth.set(key, (outstandingByMonth.get(key) ?? 0) + Number(inv.total));
  }

  const points: CashflowPoint[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const key = monthKey(d);
    const revenue = revenueByMonth.get(key) ?? 0;
    points.push({
      month: d.toLocaleDateString("en-US", { month: "short" }),
      revenue,
      collections: revenue,
      outstanding: outstandingByMonth.get(key) ?? 0,
    });
  }
  return points;
}

// --- Finance alerts -----------------------------------------------------------

export async function getFinanceAlerts(agencyId: string): Promise<DashboardSignal[]> {
  const today = startOfDay();
  const monthStart = startOfMonth(today);
  const lastMonthStart = startOfMonth(monthsAgo(1, today));

  const [overdueInvoices, allUnpaid, thisMonthRevenueAgg, lastMonthRevenueAgg, thisMonthCostsAgg, lastMonthCostsAgg, clientProfitability] =
    await Promise.all([
      db.invoice.findMany({
        where: { agencyId, deletedAt: null, status: "unpaid", dueDate: { lt: today } },
        orderBy: { dueDate: "asc" },
        take: 5,
        select: { id: true, number: true, total: true, client: { select: { name: true } } },
      }),
      db.invoice.findMany({
        where: { agencyId, deletedAt: null },
        select: { total: true },
      }),
      db.invoice.aggregate({
        where: { agencyId, deletedAt: null, status: "paid", updatedAt: { gte: monthStart } },
        _sum: { total: true },
      }),
      db.invoice.aggregate({
        where: { agencyId, deletedAt: null, status: "paid", updatedAt: { gte: lastMonthStart, lt: monthStart } },
        _sum: { total: true },
      }),
      db.cost.aggregate({ where: { agencyId, incurredAt: { gte: monthStart } }, _sum: { amount: true } }),
      db.cost.aggregate({ where: { agencyId, incurredAt: { gte: lastMonthStart, lt: monthStart } }, _sum: { amount: true } }),
      getClientProfitability(agencyId),
    ]);

  const avgInvoiceSize = allUnpaid.length > 0 ? allUnpaid.reduce((s, i) => s + Number(i.total), 0) / allUnpaid.length : 0;
  const largeUnpaid = await db.invoice.findMany({
    where: {
      agencyId,
      deletedAt: null,
      status: "unpaid",
      total: { gt: avgInvoiceSize * 2 },
    },
    orderBy: { total: "desc" },
    take: 5,
    select: { id: true, number: true, total: true, client: { select: { name: true } } },
  });

  const currentMonthRevenue = Number(thisMonthRevenueAgg._sum.total ?? 0);
  const lastMonthRevenue = Number(lastMonthRevenueAgg._sum.total ?? 0);
  const currentMonthCosts = Number(thisMonthCostsAgg._sum.amount ?? 0);
  const lastMonthCosts = Number(lastMonthCostsAgg._sum.amount ?? 0);
  const currentMonthMargin = currentMonthRevenue > 0 ? ((currentMonthRevenue - currentMonthCosts) / currentMonthRevenue) * 100 : 0;
  const lastMonthMargin = lastMonthRevenue > 0 ? ((lastMonthRevenue - lastMonthCosts) / lastMonthRevenue) * 100 : 0;

  const overdueSignals = buildDashboardSignals({
    overdueInvoices: overdueInvoices.map((inv) => ({
      id: inv.id,
      number: inv.number,
      amount: Number(inv.total),
      clientName: inv.client.name,
    })),
    delayedProjects: [],
    meetingsToday: [],
    inactiveClients: [],
  });

  const unprofitableClients = clientProfitability.filter((c) => c.revenue > 0 && c.marginPercent < 10);

  const financeSignals = buildFinanceAlerts({
    cashflowDeclining: lastMonthRevenue > 0 && currentMonthRevenue < lastMonthRevenue * 0.9,
    currentMonthRevenue,
    lastMonthRevenue,
    marginDropping: lastMonthRevenue > 0 && currentMonthRevenue > 0 && currentMonthMargin < lastMonthMargin - 5,
    currentMonthMargin,
    lastMonthMargin,
    largeUnpaidInvoices: largeUnpaid.map((inv) => ({
      id: inv.id,
      number: inv.number,
      amount: Number(inv.total),
      clientName: inv.client.name,
    })),
    unprofitableClients: unprofitableClients.map((c) => ({ id: c.id, name: c.name, marginPercent: c.marginPercent })),
  });

  return [...overdueSignals, ...financeSignals];
}

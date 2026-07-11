import "server-only";

import { db } from "@/lib/db";
import { getClientProfitability, getProjectProfitability } from "@/server/data/finance";
import { getRecurringOverview } from "@/server/data/recurring";

/**
 * All reads REQUIRE an agencyId and filter by it — mirrors src/server/data/finance.ts.
 * Reuses existing data functions wherever possible (Revenue Per Client →
 * getClientProfitability, Profit Per Project → finance's getProjectProfitability)
 * rather than duplicating queries.
 */

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export interface ProposalConversionReport {
  totalSent: number;
  accepted: number;
  rejected: number;
  conversionRatePercent: number;
}

export async function getProposalConversionRate(agencyId: string): Promise<ProposalConversionReport> {
  const groups = await db.proposal.groupBy({
    by: ["status"],
    where: { agencyId, status: { in: ["sent", "viewed", "accepted", "rejected", "expired"] } },
    _count: { _all: true },
  });
  const countByStatus = Object.fromEntries(groups.map((g) => [g.status, g._count._all])) as Record<string, number>;
  const totalSent = groups.reduce((sum, g) => sum + g._count._all, 0);
  const accepted = countByStatus.accepted ?? 0;
  const rejected = countByStatus.rejected ?? 0;

  return {
    totalSent,
    accepted,
    rejected,
    conversionRatePercent: totalSent > 0 ? Math.round((accepted / totalSent) * 1000) / 10 : 0,
  };
}

export interface RevenueByProposal {
  id: string;
  name: string;
  clientName: string | null;
  total: number;
  acceptedAt: Date | null;
}

/**
 * Proxy: Invoice has no proposalId (proposals convert into a plain Invoice,
 * see convertProposal), so "revenue by proposal" uses each accepted
 * proposal's own total as the attributed figure — same documented-proxy
 * approach already used elsewhere in Finance Intelligence.
 */
export async function getRevenueByProposal(agencyId: string): Promise<RevenueByProposal[]> {
  const proposals = await db.proposal.findMany({
    where: { agencyId, status: "accepted" },
    orderBy: { acceptedAt: "desc" },
    take: 25,
    select: { id: true, name: true, total: true, acceptedAt: true, client: { select: { name: true } } },
  });
  return proposals.map((p) => ({ id: p.id, name: p.name, clientName: p.client?.name ?? null, total: Number(p.total), acceptedAt: p.acceptedAt }));
}

export interface TimeUtilizationReport {
  userId: string;
  userName: string;
  capacityHours: number;
  loggedHours: number;
  billableHours: number;
  utilizationPercent: number;
}

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const diff = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - diff);
  return d;
}

export async function getTimeUtilization(agencyId: string): Promise<TimeUtilizationReport[]> {
  const weekStart = startOfWeek(new Date());

  const [users, loggedGroups, billableGroups] = await Promise.all([
    db.user.findMany({ where: { agencyId }, select: { id: true, name: true, weeklyCapacityHours: true } }),
    db.timeEntry.groupBy({ by: ["userId"], where: { agencyId, startedAt: { gte: weekStart } }, _sum: { durationMinutes: true } }),
    db.timeEntry.groupBy({
      by: ["userId"],
      where: { agencyId, billable: true, startedAt: { gte: weekStart } },
      _sum: { durationMinutes: true },
    }),
  ]);

  const loggedByUser = new Map(loggedGroups.map((g) => [g.userId, (g._sum.durationMinutes ?? 0) / 60]));
  const billableByUser = new Map(billableGroups.map((g) => [g.userId, (g._sum.durationMinutes ?? 0) / 60]));

  return users.map((u) => {
    const capacityHours = u.weeklyCapacityHours ?? 40;
    const loggedHours = Math.round((loggedByUser.get(u.id) ?? 0) * 100) / 100;
    return {
      userId: u.id,
      userName: u.name,
      capacityHours,
      loggedHours,
      billableHours: Math.round((billableByUser.get(u.id) ?? 0) * 100) / 100,
      utilizationPercent: capacityHours > 0 ? Math.round((loggedHours / capacityHours) * 100) : 0,
    };
  });
}

export interface ProfitPerEmployee {
  userId: string;
  userName: string;
  billableHours: number;
  revenueAttributed: number;
  costAttributed: number;
  profit: number;
}

/**
 * Revenue attribution via billable time × rate minus cost — Invoice has no
 * per-employee split, so this is the only real signal available (documented
 * proxy, consistent with Revenue by Proposal above).
 */
export async function getProfitPerEmployee(agencyId: string): Promise<ProfitPerEmployee[]> {
  const [users, entries] = await Promise.all([
    db.user.findMany({ where: { agencyId }, select: { id: true, name: true } }),
    db.timeEntry.findMany({
      where: { agencyId },
      select: { userId: true, durationMinutes: true, billable: true, billableRate: true, costRate: true },
    }),
  ]);

  const byUser = new Map<string, { billableHours: number; revenue: number; cost: number }>();
  for (const entry of entries) {
    const hours = entry.durationMinutes / 60;
    const existing = byUser.get(entry.userId) ?? { billableHours: 0, revenue: 0, cost: 0 };
    if (entry.billable && entry.billableRate !== null) {
      existing.billableHours += hours;
      existing.revenue += hours * Number(entry.billableRate);
    }
    if (entry.costRate !== null) existing.cost += hours * Number(entry.costRate);
    byUser.set(entry.userId, existing);
  }

  return users
    .map((u) => {
      const agg = byUser.get(u.id) ?? { billableHours: 0, revenue: 0, cost: 0 };
      return {
        userId: u.id,
        userName: u.name,
        billableHours: Math.round(agg.billableHours * 100) / 100,
        revenueAttributed: Math.round(agg.revenue * 100) / 100,
        costAttributed: Math.round(agg.cost * 100) / 100,
        profit: Math.round((agg.revenue - agg.cost) * 100) / 100,
      };
    })
    .sort((a, b) => b.profit - a.profit);
}

export interface ReportsOverview {
  proposalConversion: ProposalConversionReport;
  revenueByProposal: RevenueByProposal[];
  mrr: string;
  arr: string;
  upcomingRenewalsCount: number;
  failedRenewalsCount: number;
  timeUtilization: TimeUtilizationReport[];
  profitPerEmployee: ProfitPerEmployee[];
  profitPerProject: Awaited<ReturnType<typeof getProjectProfitability>>;
  revenuePerClient: { id: string; name: string; revenue: number; formatted: string }[];
}

export async function getReportsOverview(agencyId: string): Promise<ReportsOverview> {
  const [proposalConversion, revenueByProposal, recurringOverview, timeUtilization, profitPerEmployee, profitPerProject, clientProfitability] =
    await Promise.all([
      getProposalConversionRate(agencyId),
      getRevenueByProposal(agencyId),
      getRecurringOverview(agencyId),
      getTimeUtilization(agencyId),
      getProfitPerEmployee(agencyId),
      getProjectProfitability(agencyId),
      getClientProfitability(agencyId),
    ]);

  return {
    proposalConversion,
    revenueByProposal,
    mrr: recurringOverview.mrrFormatted,
    arr: recurringOverview.arrFormatted,
    upcomingRenewalsCount: recurringOverview.upcomingRenewals.length,
    failedRenewalsCount: recurringOverview.failedRenewals.length,
    timeUtilization,
    profitPerEmployee,
    profitPerProject,
    revenuePerClient: clientProfitability
      .map((c) => ({ id: c.id, name: c.name, revenue: c.revenue, formatted: money(c.revenue) }))
      .sort((a, b) => b.revenue - a.revenue),
  };
}

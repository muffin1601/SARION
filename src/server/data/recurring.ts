import "server-only";

import { db } from "@/lib/db";

/** All reads REQUIRE an agencyId and filter by it — mirrors src/server/data/finance.ts. */

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export interface SubscriptionListItem {
  id: string;
  name: string;
  clientName: string;
  amount: number;
  frequency: string;
  nextBillingDate: Date;
  status: string;
  autoSend: boolean;
}

export async function listSubscriptions(agencyId: string, clientId?: string): Promise<SubscriptionListItem[]> {
  const subs = await db.subscription.findMany({
    where: { agencyId, ...(clientId ? { clientId } : {}) },
    orderBy: { nextBillingDate: "asc" },
    select: {
      id: true,
      name: true,
      amount: true,
      frequency: true,
      nextBillingDate: true,
      status: true,
      autoSend: true,
      client: { select: { name: true } },
    },
  });
  return subs.map((s) => ({
    id: s.id,
    name: s.name,
    clientName: s.client.name,
    amount: Number(s.amount),
    frequency: s.frequency,
    nextBillingDate: s.nextBillingDate,
    status: s.status,
    autoSend: s.autoSend,
  }));
}

export interface SubscriptionDetail extends SubscriptionListItem {
  clientId: string;
  currency: string;
  customIntervalDays: number | null;
  autoRemind: boolean;
  description: string | null;
}

export async function getSubscription(agencyId: string, subscriptionId: string): Promise<SubscriptionDetail | null> {
  const sub = await db.subscription.findFirst({
    where: { id: subscriptionId, agencyId },
    select: {
      id: true,
      clientId: true,
      name: true,
      amount: true,
      currency: true,
      frequency: true,
      customIntervalDays: true,
      nextBillingDate: true,
      status: true,
      autoSend: true,
      autoRemind: true,
      description: true,
      client: { select: { name: true } },
    },
  });
  if (!sub) return null;
  return {
    id: sub.id,
    clientId: sub.clientId,
    name: sub.name,
    clientName: sub.client.name,
    amount: Number(sub.amount),
    currency: sub.currency,
    frequency: sub.frequency,
    customIntervalDays: sub.customIntervalDays,
    nextBillingDate: sub.nextBillingDate,
    status: sub.status,
    autoSend: sub.autoSend,
    autoRemind: sub.autoRemind,
    description: sub.description,
  };
}

export interface RecurringOccurrence {
  id: string;
  scheduledFor: Date;
  generatedAt: Date | null;
  status: string;
  failureReason: string | null;
  invoiceId: string | null;
}

export async function listOccurrences(agencyId: string, subscriptionId: string): Promise<RecurringOccurrence[]> {
  const owned = await db.subscription.findFirst({ where: { id: subscriptionId, agencyId }, select: { id: true } });
  if (!owned) return [];
  return db.recurringInvoice.findMany({
    where: { subscriptionId },
    orderBy: { scheduledFor: "desc" },
    take: 24,
    select: { id: true, scheduledFor: true, generatedAt: true, status: true, failureReason: true, invoiceId: true },
  });
}

function monthlyEquivalent(amount: number, frequency: string, customIntervalDays: number | null): number {
  switch (frequency) {
    case "WEEKLY":
      return amount * 4.345;
    case "MONTHLY":
      return amount;
    case "QUARTERLY":
      return amount / 3;
    case "YEARLY":
      return amount / 12;
    case "CUSTOM":
      return amount * (30 / Math.max(1, customIntervalDays ?? 30));
    default:
      return amount;
  }
}

export interface RecurringOverview {
  mrr: number;
  arr: number;
  mrrFormatted: string;
  arrFormatted: string;
  upcomingRenewals: { id: string; name: string; clientName: string; amount: number; nextBillingDate: Date }[];
  failedRenewals: { id: string; name: string; clientName: string; failedAt: Date; reason: string | null }[];
  recurringRevenueThisMonth: number;
}

export async function getRecurringOverview(agencyId: string): Promise<RecurringOverview> {
  const today = new Date();
  const in14Days = new Date();
  in14Days.setDate(in14Days.getDate() + 14);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const [activeSubs, upcoming, failed, generatedThisMonth] = await Promise.all([
    db.subscription.findMany({ where: { agencyId, status: "active" }, select: { amount: true, frequency: true, customIntervalDays: true } }),
    db.subscription.findMany({
      where: { agencyId, status: "active", nextBillingDate: { gte: today, lte: in14Days } },
      orderBy: { nextBillingDate: "asc" },
      take: 8,
      select: { id: true, name: true, amount: true, nextBillingDate: true, client: { select: { name: true } } },
    }),
    db.recurringInvoice.findMany({
      where: { agencyId, status: "failed" },
      orderBy: { createdAt: "desc" },
      take: 8,
      select: { id: true, createdAt: true, failureReason: true, subscription: { select: { name: true, client: { select: { name: true } } } } },
    }),
    db.recurringInvoice.aggregate({
      where: { agencyId, status: "generated", generatedAt: { gte: monthStart } },
      _count: { _all: true },
    }),
  ]);

  const mrr = activeSubs.reduce((sum, s) => sum + monthlyEquivalent(Number(s.amount), s.frequency, s.customIntervalDays), 0);

  let recurringRevenueThisMonth = 0;
  if (generatedThisMonth._count._all > 0) {
    const occurrences = await db.recurringInvoice.findMany({
      where: { agencyId, status: "generated", generatedAt: { gte: monthStart } },
      select: { invoiceId: true },
    });
    const invoiceIds = occurrences.map((o) => o.invoiceId).filter((id): id is string => Boolean(id));
    if (invoiceIds.length > 0) {
      const agg = await db.invoice.aggregate({ where: { id: { in: invoiceIds } }, _sum: { total: true } });
      recurringRevenueThisMonth = Number(agg._sum.total ?? 0);
    }
  }

  return {
    mrr,
    arr: mrr * 12,
    mrrFormatted: money(mrr),
    arrFormatted: money(mrr * 12),
    upcomingRenewals: upcoming.map((s) => ({ id: s.id, name: s.name, clientName: s.client.name, amount: Number(s.amount), nextBillingDate: s.nextBillingDate })),
    failedRenewals: failed.map((f) => ({ id: f.id, name: f.subscription.name, clientName: f.subscription.client.name, failedAt: f.createdAt, reason: f.failureReason })),
    recurringRevenueThisMonth,
  };
}

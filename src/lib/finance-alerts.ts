import type { DashboardSignal } from "@/lib/dashboard-priorities";

/**
 * Finance-specific signals, in the same DashboardSignal shape as
 * src/lib/dashboard-priorities.ts so the Finance Alerts panel can reuse
 * PriorityList (src/components/dashboard/priority-list.tsx) instead of a
 * second renderer. Every signal is derived from real aggregates — nothing
 * fabricated.
 */

function money(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export interface LargeUnpaidInvoiceInput {
  id: string;
  number: string;
  amount: number;
  clientName: string;
}

export interface UnprofitableClientInput {
  id: string;
  name: string;
  marginPercent: number;
}

export interface BuildFinanceAlertsInput {
  cashflowDeclining: boolean;
  currentMonthRevenue: number;
  lastMonthRevenue: number;
  marginDropping: boolean;
  currentMonthMargin: number;
  lastMonthMargin: number;
  largeUnpaidInvoices: LargeUnpaidInvoiceInput[];
  unprofitableClients: UnprofitableClientInput[];
}

/** Most severe first. */
export function buildFinanceAlerts(input: BuildFinanceAlertsInput): DashboardSignal[] {
  const signals: DashboardSignal[] = [];

  for (const inv of input.largeUnpaidInvoices) {
    signals.push({
      id: `large-unpaid-${inv.id}`,
      kind: "large_unpaid_invoice",
      severity: "high",
      title: "Large unpaid invoice",
      description: `${inv.number} for ${inv.clientName} — ${money(inv.amount)}, well above your average invoice size`,
      href: `/invoices/${inv.id}`,
      actionLabel: "View invoice",
    });
  }

  for (const client of input.unprofitableClients) {
    signals.push({
      id: `unprofitable-${client.id}`,
      kind: "client_unprofitable",
      severity: "high",
      title: "Client becoming unprofitable",
      description: `${client.name} is running at ${client.marginPercent.toFixed(0)}% margin`,
      href: `/finance`,
      actionLabel: "View finance",
    });
  }

  if (input.cashflowDeclining) {
    signals.push({
      id: "cashflow-declining",
      kind: "cashflow_declining",
      severity: "medium",
      title: "Cashflow declining",
      description: `Revenue this month (${money(input.currentMonthRevenue)}) is down from last month (${money(input.lastMonthRevenue)})`,
      href: "/finance",
      actionLabel: "View finance",
    });
  }

  if (input.marginDropping) {
    signals.push({
      id: "margin-dropping",
      kind: "margin_dropping",
      severity: "medium",
      title: "Profit margin dropping",
      description: `Margin this month (${input.currentMonthMargin.toFixed(0)}%) is down from last month (${input.lastMonthMargin.toFixed(0)}%)`,
      href: "/finance",
      actionLabel: "View finance",
    });
  }

  const severityRank: Record<DashboardSignal["severity"], number> = { high: 0, medium: 1, low: 2 };
  return signals.sort((a, b) => severityRank[a.severity] - severityRank[b.severity]);
}

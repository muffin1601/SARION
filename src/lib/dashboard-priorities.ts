/**
 * Shared derivation of "things that need attention" — feeds both the Today's
 * Priorities section and the Notifications Center so the logic that decides
 * what's urgent lives in exactly one place. Every signal is derived from real
 * rows (overdue invoices, delayed projects, today's logged meetings, inactive
 * clients) — nothing here is fabricated.
 */

export type SignalKind =
  | "invoice_overdue"
  | "project_delayed"
  | "meeting_today"
  | "client_inactive"
  | "cashflow_declining"
  | "margin_dropping"
  | "large_unpaid_invoice"
  | "client_unprofitable"
  | "subscription_auto_paused";
export type SignalSeverity = "high" | "medium" | "low";

export interface DashboardSignal {
  /** Stable id used both as the React key and the dismissal key in dashboardPrefs. */
  id: string;
  kind: SignalKind;
  severity: SignalSeverity;
  title: string;
  description: string;
  href: string;
  actionLabel: string;
}

export interface OverdueInvoiceInput {
  id: string;
  number: string;
  amount: number;
  clientName: string;
}

export interface DelayedProjectInput {
  id: string;
  name: string;
  clientName: string;
  dueDate: Date;
}

export interface MeetingTodayInput {
  id: string;
  description: string;
  clientName: string | null;
}

export interface InactiveClientInput {
  id: string;
  name: string;
  lastActivityAt: Date | null;
}

export interface AutoPausedSubscriptionInput {
  id: string;
  name: string;
  consecutiveFailureCount: number;
}

export interface BuildSignalsInput {
  overdueInvoices: OverdueInvoiceInput[];
  delayedProjects: DelayedProjectInput[];
  meetingsToday: MeetingTodayInput[];
  inactiveClients: InactiveClientInput[];
  autoPausedSubscriptions?: AutoPausedSubscriptionInput[];
}

function money(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

/** Full list of signals, most severe first. Used by both Priorities and Notifications. */
export function buildDashboardSignals(input: BuildSignalsInput): DashboardSignal[] {
  const signals: DashboardSignal[] = [];

  for (const inv of input.overdueInvoices) {
    signals.push({
      id: `invoice-overdue-${inv.id}`,
      kind: "invoice_overdue",
      severity: "high",
      title: "Invoice overdue",
      description: `${inv.number} for ${inv.clientName} — ${money(inv.amount)} past due`,
      href: `/invoices/${inv.id}`,
      actionLabel: "View invoice",
    });
  }

  for (const project of input.delayedProjects) {
    signals.push({
      id: `project-delayed-${project.id}`,
      kind: "project_delayed",
      severity: "medium",
      title: "Project delayed",
      description: `"${project.name}" for ${project.clientName} was due ${formatDate(project.dueDate)}`,
      href: `/projects/${project.id}`,
      actionLabel: "View project",
    });
  }

  for (const meeting of input.meetingsToday) {
    signals.push({
      id: `meeting-today-${meeting.id}`,
      kind: "meeting_today",
      severity: "medium",
      title: "Meeting today",
      description: meeting.clientName ? `${meeting.description} — ${meeting.clientName}` : meeting.description,
      href: "/dashboard",
      actionLabel: "View details",
    });
  }

  for (const client of input.inactiveClients) {
    signals.push({
      id: `client-inactive-${client.id}`,
      kind: "client_inactive",
      severity: "low",
      title: "Client inactive",
      description: client.lastActivityAt
        ? `No activity from ${client.name} since ${formatDate(client.lastActivityAt)}`
        : `No recorded activity from ${client.name} yet`,
      href: `/clients/${client.id}`,
      actionLabel: "View client",
    });
  }

  for (const sub of input.autoPausedSubscriptions ?? []) {
    signals.push({
      id: `subscription-auto-paused-${sub.id}`,
      kind: "subscription_auto_paused",
      severity: "high",
      title: "Subscription auto-paused",
      description: `"${sub.name}" was paused after ${sub.consecutiveFailureCount} consecutive billing failures`,
      href: "/recurring",
      actionLabel: "Review subscription",
    });
  }

  const severityRank: Record<SignalSeverity, number> = { high: 0, medium: 1, low: 2 };
  return signals.sort((a, b) => severityRank[a.severity] - severityRank[b.severity]);
}

/** Priorities panel excludes the lower-urgency "client inactive" signal to stay focused. */
export function priorityWorthySignals(signals: DashboardSignal[]): DashboardSignal[] {
  return signals.filter((s) => s.kind !== "client_inactive");
}

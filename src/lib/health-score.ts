/**
 * Deterministic business health score, computed entirely from real aggregates
 * (no fabricated data). Each category returns a 0-100 score plus the concrete
 * reasons behind it and one actionable suggestion, so the number is always
 * explainable in the UI.
 */

export interface HealthCategory {
  score: number;
  reasons: string[];
  suggestion: string;
}

export interface HealthScore {
  overall: number;
  categories: {
    sales: HealthCategory;
    projects: HealthCategory;
    finance: HealthCategory;
    operations: HealthCategory;
    customerSuccess: HealthCategory;
  };
}

export interface HealthScoreInput {
  overdueInvoiceCount: number;
  overdueInvoiceAmount: number;
  totalInvoicedAmount: number;
  totalPaidAmount: number;
  activeProjectCount: number;
  delayedProjectCount: number;
  totalTasks: number;
  doneTasks: number;
  totalClients: number;
  clientsActiveLast30d: number;
  newClientsThisMonth: number;
  newClientsLastMonth: number;
}

function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function money(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function computeHealthScore(input: HealthScoreInput): HealthScore {
  const finance = computeFinance(input);
  const projects = computeProjects(input);
  const operations = computeOperations(input);
  const customerSuccess = computeCustomerSuccess(input);
  const sales = computeSales(input);

  const overall = clamp(
    (finance.score + projects.score + operations.score + customerSuccess.score + sales.score) / 5,
  );

  return { overall, categories: { sales, projects, finance, operations, customerSuccess } };
}

function computeFinance({
  overdueInvoiceCount,
  overdueInvoiceAmount,
  totalInvoicedAmount,
  totalPaidAmount,
}: HealthScoreInput): HealthCategory {
  const score = clamp(100 - (overdueInvoiceAmount / Math.max(totalInvoicedAmount, 1)) * 100);
  const reasons: string[] = [];
  reasons.push(
    totalPaidAmount >= overdueInvoiceAmount
      ? "Positive cash flow"
      : "More is outstanding than collected",
  );
  reasons.push(
    overdueInvoiceCount === 0
      ? "No overdue invoices"
      : `${overdueInvoiceCount} overdue invoice${overdueInvoiceCount === 1 ? "" : "s"} (${money(overdueInvoiceAmount)})`,
  );
  return {
    score,
    reasons,
    suggestion:
      overdueInvoiceCount > 0 ? "Send reminders for overdue invoices" : "Keep up the on-time collections",
  };
}

function computeProjects({
  activeProjectCount,
  delayedProjectCount,
}: HealthScoreInput): HealthCategory {
  const denominator = Math.max(activeProjectCount + delayedProjectCount, 1);
  const score = clamp(100 - (delayedProjectCount / denominator) * 100);
  const reasons = [
    `${activeProjectCount} active project${activeProjectCount === 1 ? "" : "s"}`,
    delayedProjectCount === 0
      ? "No delayed projects"
      : `${delayedProjectCount} project${delayedProjectCount === 1 ? "" : "s"} past due date`,
  ];
  return {
    score,
    reasons,
    suggestion:
      delayedProjectCount > 0 ? "Review delayed projects and update timelines" : "Projects are on track",
  };
}

function computeOperations({ totalTasks, doneTasks }: HealthScoreInput): HealthCategory {
  const score = totalTasks === 0 ? 100 : clamp((doneTasks / totalTasks) * 100);
  const openTasks = totalTasks - doneTasks;
  const reasons =
    totalTasks === 0
      ? ["No open tasks tracked"]
      : [`${doneTasks} of ${totalTasks} tasks complete`, `${openTasks} task${openTasks === 1 ? "" : "s"} open`];
  return {
    score,
    reasons,
    suggestion: openTasks > 0 ? "Clear outstanding tasks to stay on schedule" : "Task list is clear",
  };
}

function computeCustomerSuccess({
  totalClients,
  clientsActiveLast30d,
}: HealthScoreInput): HealthCategory {
  const score = totalClients === 0 ? 100 : clamp((clientsActiveLast30d / totalClients) * 100);
  const inactive = totalClients - clientsActiveLast30d;
  const reasons =
    totalClients === 0
      ? ["No clients yet"]
      : [
          `${clientsActiveLast30d} of ${totalClients} clients active in the last 30 days`,
          inactive > 0 ? `${inactive} client${inactive === 1 ? "" : "s"} inactive` : "All clients engaged",
        ];
  return {
    score,
    reasons,
    suggestion: inactive > 0 ? "Reach out to inactive clients" : "Client engagement is healthy",
  };
}

export interface ClientHealthInput {
  totalInvoiced: number;
  overdueAmount: number;
  lastActivityAt: Date | null;
}

/** Lightweight per-client score for the Top Clients card: payment reliability (70%) + engagement recency (30%). */
export function computeClientHealthScore({
  totalInvoiced,
  overdueAmount,
  lastActivityAt,
}: ClientHealthInput): number {
  const paymentScore = clamp(100 - (overdueAmount / Math.max(totalInvoiced, 1)) * 100);
  const daysSinceActivity = lastActivityAt
    ? (Date.now() - lastActivityAt.getTime()) / (1000 * 60 * 60 * 24)
    : Infinity;
  const recencyScore = clamp(100 - daysSinceActivity * 2);
  return clamp(paymentScore * 0.7 + recencyScore * 0.3);
}

function computeSales({
  newClientsThisMonth,
  newClientsLastMonth,
}: HealthScoreInput): HealthCategory {
  const delta = newClientsThisMonth - newClientsLastMonth;
  const score = clamp(50 + delta * 10);
  const reasons = [
    `${newClientsThisMonth} new client${newClientsThisMonth === 1 ? "" : "s"} this month`,
    `${newClientsLastMonth} new client${newClientsLastMonth === 1 ? "" : "s"} last month`,
  ];
  return {
    score,
    reasons,
    suggestion: delta < 0 ? "Ramp up outreach to grow the client base" : "Client growth is trending well",
  };
}

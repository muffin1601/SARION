import type { Metadata } from "next";

import { requireOwner } from "@/server/auth-context";
import {
  getFinanceOverview,
  getClientProfitability,
  getProjectProfitability,
  getRevenueForecast,
  getCashflowTimeline,
  getFinanceAlerts,
} from "@/server/data/finance";
import { listInvoices } from "@/server/data/invoices";
import { getClientOptions } from "@/server/data/projects";
import { listProjects } from "@/server/data/projects";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { FinanceMetricsGrid } from "@/components/finance/finance-metrics-grid";
import { CashflowCharts } from "@/components/finance/cashflow-charts";
import { RevenueForecastCard } from "@/components/finance/revenue-forecast-card";
import { ClientProfitabilityTable } from "@/components/finance/client-profitability-table";
import { ProjectProfitabilityTable } from "@/components/finance/project-profitability-table";
import { FinanceAlertsPanel } from "@/components/finance/finance-alerts-panel";
import { LogCostDialog } from "@/components/finance/log-cost-dialog";
import { RecentInvoicesCard } from "@/components/dashboard/recent-invoices-card";

export const metadata: Metadata = { title: "Finance · Sarion" };

export default async function FinancePage() {
  const { agencyId } = await requireOwner();

  const [overview, clientProfitability, projectProfitability, forecast, cashflow, alerts, outstandingInvoices, clientOptions, projects] =
    await Promise.all([
      getFinanceOverview(agencyId),
      getClientProfitability(agencyId),
      getProjectProfitability(agencyId),
      getRevenueForecast(agencyId),
      getCashflowTimeline(agencyId),
      getFinanceAlerts(agencyId),
      listInvoices(agencyId, { status: "unpaid" }),
      getClientOptions(agencyId),
      listProjects(agencyId),
    ]);

  const outstandingForCard = outstandingInvoices.slice(0, 8).map((inv) => ({
    id: inv.id,
    number: inv.number,
    status: inv.status,
    total: inv.total,
    dueDate: inv.dueDate,
    clientName: inv.clientName,
  }));

  return (
    <PageWrapper
      title="Finance Intelligence"
      description="Profitability analytics across your clients and projects."
      action={<LogCostDialog clientOptions={clientOptions} projectOptions={projects.map((p) => ({ id: p.id, name: p.name }))} />}
    >
      <div className="space-y-6">
        <FinanceMetricsGrid metrics={overview} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CashflowCharts points={cashflow} />
          </div>
          <RevenueForecastCard forecast={forecast} />
        </div>

        <ClientProfitabilityTable clients={clientProfitability} />
        <ProjectProfitabilityTable projects={projectProfitability} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FinanceAlertsPanel alerts={alerts} />
          <RecentInvoicesCard
            invoices={outstandingForCard}
            title="Outstanding Invoices"
            viewAllHref="/invoices?status=unpaid"
            emptyTitle="No outstanding invoices"
            emptyDescription="Everything is paid up."
          />
        </div>
      </div>
    </PageWrapper>
  );
}

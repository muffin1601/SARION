import type { Metadata } from "next";

import { requireOwner } from "@/server/auth-context";
import { getReportsOverview } from "@/server/data/reports";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileSignature, Repeat, TrendingUp, Gauge } from "lucide-react";

export const metadata: Metadata = { title: "Reports · Sarion" };

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

export default async function ReportsPage() {
  const { agencyId } = await requireOwner();
  const report = await getReportsOverview(agencyId);

  return (
    <PageWrapper title="Reports" description="Proposal conversion, recurring revenue, time utilization, and profitability.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard label="Proposal Conversion Rate" value={`${report.proposalConversion.conversionRatePercent}%`} icon={FileSignature} />
          <DashboardCard label="MRR" value={report.mrr} icon={TrendingUp} />
          <DashboardCard label="ARR" value={report.arr} icon={Repeat} />
          <DashboardCard label="Upcoming / Failed Renewals" value={`${report.upcomingRenewalsCount} / ${report.failedRenewalsCount}`} icon={Gauge} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue by Proposal</CardTitle>
          </CardHeader>
          <CardContent>
            {report.revenueByProposal.length === 0 ? (
              <EmptyState title="No accepted proposals yet" description="Accepted proposals appear here with their attributed revenue." />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proposal</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Accepted</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.revenueByProposal.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.clientName ?? "—"}</TableCell>
                      <TableCell>{formatDate(p.acceptedAt)}</TableCell>
                      <TableCell className="font-medium tabular-nums">{money(p.total)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Time Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              {report.timeUtilization.length === 0 ? (
                <EmptyState title="No team members" description="Utilization appears once teammates log time." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Member</TableHead>
                      <TableHead>Logged</TableHead>
                      <TableHead>Billable</TableHead>
                      <TableHead>Utilization</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.timeUtilization.map((row) => (
                      <TableRow key={row.userId}>
                        <TableCell>{row.userName}</TableCell>
                        <TableCell>{row.loggedHours}h</TableCell>
                        <TableCell>{row.billableHours}h</TableCell>
                        <TableCell>{row.utilizationPercent}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profit Per Employee</CardTitle>
            </CardHeader>
            <CardContent>
              {report.profitPerEmployee.length === 0 ? (
                <EmptyState title="No billable time logged" description="Profit per employee appears once billable hours are logged." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Member</TableHead>
                      <TableHead>Billable Hrs</TableHead>
                      <TableHead>Profit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.profitPerEmployee.map((row) => (
                      <TableRow key={row.userId}>
                        <TableCell>{row.userName}</TableCell>
                        <TableCell>{row.billableHours}h</TableCell>
                        <TableCell className="font-medium tabular-nums">{money(row.profit)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profit Per Project</CardTitle>
            </CardHeader>
            <CardContent>
              {report.profitPerProject.length === 0 ? (
                <EmptyState title="No projects yet" description="Project profitability appears once projects have activity." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Estimated Cost</TableHead>
                      <TableHead>Actual Cost</TableHead>
                      <TableHead>Variance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.profitPerProject.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          {row.name}
                          <span className="ml-1 text-xs text-muted-foreground">· {row.clientName}</span>
                        </TableCell>
                        <TableCell>{row.estimatedCost !== null ? money(row.estimatedCost) : "—"}</TableCell>
                        <TableCell>{money(row.actualCost)}</TableCell>
                        <TableCell>{row.budgetVariancePercent !== null ? `${row.budgetVariancePercent.toFixed(1)}%` : "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Revenue Per Client</CardTitle>
            </CardHeader>
            <CardContent>
              {report.revenuePerClient.length === 0 ? (
                <EmptyState title="No revenue yet" description="Revenue per client appears once invoices are paid." />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.revenuePerClient.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell className="font-medium tabular-nums">{row.formatted}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}

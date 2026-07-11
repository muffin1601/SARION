import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PROJECT_STATUS_VARIANT, statusLabel } from "@/lib/project-status";
import type { ProjectProfitability } from "@/server/data/finance";

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function varianceVariant(variance: number) {
  if (variance >= 0) return "success" as const;
  if (variance >= -20) return "warning" as const;
  return "destructive" as const;
}

export function ProjectProfitabilityTable({ projects }: { projects: ProjectProfitability[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Project Profitability</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground">
          Invoices in SARION are billed to clients, not individual projects, so per-project revenue and margin
          aren&apos;t tracked here — this shows budget vs. actual cost instead.
        </p>
        {projects.length === 0 ? (
          <EmptyState title="No projects yet" description="Create a project to start tracking its budget." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Est. Cost</TableHead>
                <TableHead className="text-right">Actual Cost</TableHead>
                <TableHead className="text-right">Est. Hours</TableHead>
                <TableHead className="text-right">Budget Variance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell className="text-muted-foreground">{project.clientName}</TableCell>
                  <TableCell>
                    <Badge variant={PROJECT_STATUS_VARIANT[project.status]}>{statusLabel(project.status)}</Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">
                    {project.estimatedCost !== null ? money(project.estimatedCost) : "—"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{money(project.actualCost)}</TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">
                    {project.estimatedHours !== null ? project.estimatedHours : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    {project.budgetVariancePercent !== null ? (
                      <Badge variant={varianceVariant(project.budgetVariancePercent)}>
                        {project.budgetVariancePercent >= 0 ? "+" : ""}
                        {project.budgetVariancePercent.toFixed(0)}%
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

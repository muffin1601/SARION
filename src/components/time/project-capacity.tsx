import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import type { ProjectCapacityRow } from "@/server/data/time";

function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

export function ProjectCapacity({ rows }: { rows: ProjectCapacityRow[] }) {
  if (rows.length === 0) {
    return <EmptyState title="No active projects" description="Project capacity appears once projects are underway." />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Budget Hours</TableHead>
          <TableHead>Actual Hours</TableHead>
          <TableHead>Remaining</TableHead>
          <TableHead>Forecast Completion</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.projectId}>
            <TableCell>
              <p className="font-medium">{row.projectName}</p>
              <p className="text-xs text-muted-foreground">{row.clientName}</p>
            </TableCell>
            <TableCell>{row.estimatedHours ?? "—"}</TableCell>
            <TableCell>{row.actualHours}</TableCell>
            <TableCell className={cn(row.remainingHours !== null && row.remainingHours < 0 && "font-medium text-destructive")}>
              {row.remainingHours ?? "—"}
            </TableCell>
            <TableCell>{formatDate(row.forecastCompletion)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import type { WorkloadRow } from "@/server/data/time";

function heatColor(utilizationPercent: number): string {
  if (utilizationPercent >= 100) return "bg-destructive/20 text-destructive";
  if (utilizationPercent >= 80) return "bg-amber-500/20 text-amber-700 dark:text-amber-400";
  if (utilizationPercent >= 40) return "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400";
  return "bg-muted text-muted-foreground";
}

export function TeamWorkload({ rows }: { rows: WorkloadRow[] }) {
  if (rows.length === 0) {
    return <EmptyState title="No team members" description="Invite teammates to see workload data." />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((row) => (
        <Card key={row.userId} className={cn(row.overloaded && "border-destructive/40")}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">{row.userName}</p>
              <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums", heatColor(row.utilizationPercent))}>
                {row.utilizationPercent}%
              </span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full rounded-full", row.overloaded ? "bg-destructive" : "bg-primary")}
                style={{ width: `${Math.min(100, row.utilizationPercent)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {row.assignedHours}h / {row.capacityHours}h this week
              {row.overloaded ? " · Overloaded" : row.remainingHours > 0 ? ` · ${row.remainingHours}h available` : ""}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ProjectOverview } from "@/server/data/dashboard";

const ROWS: { key: keyof ProjectOverview; label: string; color: string }[] = [
  { key: "completed", label: "Completed", color: "bg-emerald-500" },
  { key: "active", label: "In Progress", color: "bg-blue-500" },
  { key: "delayed", label: "Delayed", color: "bg-destructive" },
  { key: "onHold", label: "On Hold", color: "bg-amber-500" },
  { key: "planned", label: "Planned", color: "bg-muted-foreground" },
];

export function ProjectOverviewCard({ overview }: { overview: ProjectOverview }) {
  const total = overview.completed + overview.active + overview.onHold + overview.planned || 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Project Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {ROWS.map((row) => (
            <div key={row.key} className="rounded-lg border p-3 text-center">
              <span className="text-xl font-bold tabular-nums">{overview[row.key]}</span>
              <p className="mt-1 text-xs text-muted-foreground">{row.label}</p>
            </div>
          ))}
        </div>
        <div className="flex h-2 overflow-hidden rounded-full bg-muted">
          {ROWS.filter((r) => r.key !== "delayed").map((row) => {
            const value = overview[row.key];
            if (value === 0) return null;
            return (
              <span
                key={row.key}
                className={cn("h-full", row.color)}
                style={{ width: `${(value / total) * 100}%` }}
                title={`${row.label}: ${value}`}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

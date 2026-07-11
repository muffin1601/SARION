import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { RunStatusBadge } from "@/components/automations/run-status-badge";
import type { RecentAutomationRun } from "@/server/data/automations";

function formatDuration(ms: number | null) {
  if (ms === null) return "—";
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

export function RecentAutomationRunsCard({ runs }: { runs: RecentAutomationRun[] }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Recent Automation Runs</CardTitle>
        <Button asChild variant="link" className="h-auto p-0 text-sm">
          <Link href="/automations">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {runs.length === 0 ? (
          <EmptyState title="No automations run yet" description="Build one in Automations to see activity here." />
        ) : (
          <ul className="space-y-2">
            {runs.map((run) => (
              <li key={run.id} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                <div className="min-w-0">
                  <Link href={`/automations/${run.automationId}`} className="truncate text-sm font-medium hover:underline">
                    {run.automationName}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNowStrict(run.triggeredAt, { addSuffix: true })} · {formatDuration(run.durationMs)}
                  </p>
                </div>
                <RunStatusBadge status={run.status} />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import { Fragment, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { RunStatusBadge } from "@/components/automations/run-status-badge";
import type { AutomationRunItem } from "@/server/data/automations";

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatDuration(ms: number | null) {
  if (ms === null) return "—";
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

export function RunHistoryTable({ runs }: { runs: AutomationRunItem[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (runs.length === 0) {
    return <EmptyState title="No runs yet" description="This automation hasn't fired. Trigger it or run it manually." />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-8" />
          <TableHead>Status</TableHead>
          <TableHead>Triggered</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {runs.map((run) => (
          <Fragment key={run.id}>
            <TableRow
              className="cursor-pointer"
              onClick={() => setExpanded((prev) => (prev === run.id ? null : run.id))}
            >
              <TableCell>
                {expanded === run.id ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </TableCell>
              <TableCell>
                <RunStatusBadge status={run.status} />
              </TableCell>
              <TableCell className="text-muted-foreground">{formatDateTime(run.triggeredAt)}</TableCell>
              <TableCell className="text-muted-foreground">{formatDuration(run.durationMs)}</TableCell>
            </TableRow>
            {expanded === run.id ? (
              <TableRow>
                <TableCell colSpan={4} className="bg-muted/30">
                  {run.logs.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No step logs recorded.</p>
                  ) : (
                    <ol className="space-y-1.5">
                      {run.logs.map((log) => (
                        <li key={log.step} className="flex items-start gap-2 text-sm">
                          <span className="mt-0.5 shrink-0 text-xs font-medium text-muted-foreground">
                            {log.step}.
                          </span>
                          <span className={log.ok ? "text-foreground" : "text-destructive"}>
                            {log.action}: {log.message}
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                </TableCell>
              </TableRow>
            ) : null}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
}

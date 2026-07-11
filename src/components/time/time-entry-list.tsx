"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { deleteTimeEntry } from "@/server/actions/time";
import type { TimeEntryRow } from "@/server/data/time";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(date);
}
function formatHours(minutes: number) {
  return (minutes / 60).toFixed(2) + "h";
}

export function TimeEntryList({ entries, showActions = true }: { entries: TimeEntryRow[]; showActions?: boolean }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteTimeEntry(id);
      if (!result.ok) toast.error(result.error);
      else toast.success("Entry deleted.");
    });
  }

  if (entries.length === 0) {
    return <EmptyState title="No time entries" description="Log time via the timer or a manual entry." />;
  }

  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <Card key={entry.id}>
          <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <p className="font-medium">
                {entry.projectName} <span className="text-xs font-normal text-muted-foreground">· {entry.clientName}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {entry.userName} · {formatDate(entry.startedAt)}
                {entry.description ? ` · ${entry.description}` : ""}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-sm font-semibold tabular-nums">{formatHours(entry.durationMinutes)}</span>
              <Badge variant={entry.billable ? "success" : "secondary"}>{entry.billable ? "Billable" : "Non-billable"}</Badge>
              {showActions && (
                <Button variant="ghost" size="icon" onClick={() => handleDelete(entry.id)} disabled={isPending}>
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

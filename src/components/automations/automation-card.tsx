"use client";

import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import { Copy, Loader2, MoreHorizontal, Play, Trash2, Zap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RunStatusBadge } from "@/components/automations/run-status-badge";
import { triggerLabel } from "@/lib/automation-triggers";
import {
  deleteAutomation,
  duplicateAutomation,
  runAutomationManually,
  toggleAutomationEnabled,
} from "@/server/actions/automations";
import type { AutomationListItem } from "@/server/data/automations";

function timeAgo(date: Date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function AutomationCard({ automation }: { automation: AutomationListItem }) {
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleAutomationEnabled(automation.id);
      if (!result.ok) toast.error(result.error);
    });
  }

  function handleDuplicate() {
    startTransition(async () => {
      const result = await duplicateAutomation(automation.id);
      if (!result.ok) toast.error(result.error);
      else toast.success("Automation duplicated");
    });
  }

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteAutomation(automation.id);
      if (!result.ok) toast.error(result.error);
      else toast.success("Automation deleted");
    });
  }

  function handleRun() {
    startTransition(async () => {
      const result = await runAutomationManually(automation.id);
      if (!result.ok) toast.error(result.error);
      else toast.success("Automation ran successfully");
    });
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Zap className="h-4 w-4" />
        </span>

        <div className="min-w-0 flex-1">
          <Link href={`/automations/${automation.id}`} className="font-medium hover:underline">
            {automation.name}
          </Link>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary">{triggerLabel(automation.triggerType)}</Badge>
            <span>{automation.actionCount} action{automation.actionCount === 1 ? "" : "s"}</span>
            {automation.lastRun ? (
              <>
                <RunStatusBadge status={automation.lastRun.status} />
                <span>{timeAgo(automation.lastRun.triggeredAt)}</span>
              </>
            ) : (
              <span>Never run</span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Switch checked={automation.enabled} onCheckedChange={handleToggle} disabled={isPending} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" disabled={isPending}>
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={handleRun}>
                <Play className="h-4 w-4" /> Run now
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/automations/${automation.id}/edit`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleDuplicate}>
                <Copy className="h-4 w-4" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleDelete} className="text-destructive focus:text-destructive">
                <Trash2 className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

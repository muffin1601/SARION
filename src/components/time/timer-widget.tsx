"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Pause, Play, Square } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  startTimerAction,
  pauseTimerAction,
  resumeTimerAction,
  stopTimerAction,
} from "@/server/actions/time";
import type { ActiveTimerSession } from "@/server/data/time";

interface ProjectOption {
  id: string;
  name: string;
  clientName: string;
}

const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

function elapsedSeconds(session: ActiveTimerSession): number {
  if (session.status === "paused") return session.accumulatedSeconds;
  const running = Math.floor((Date.now() - session.startedAt.getTime()) / 1000);
  return session.accumulatedSeconds + running;
}

function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export function TimerWidget({ session, projects }: { session: ActiveTimerSession | null; projects: ProjectOption[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [now, setNow] = useState(() => Date.now());

  const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
  const [description, setDescription] = useState("");
  const [billable, setBillable] = useState(true);
  const [billableRate, setBillableRate] = useState("");

  useEffect(() => {
    if (!session || session.status !== "running") return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [session]);

  function handleStart() {
    if (!projectId) {
      toast.error("Select a project first.");
      return;
    }
    startTransition(async () => {
      const result = await startTimerAction({ projectId, description: description || null });
      if (!result.ok) toast.error(result.error);
      else router.refresh();
    });
  }

  function handlePause() {
    startTransition(async () => {
      const result = await pauseTimerAction();
      if (!result.ok) toast.error(result.error);
      else router.refresh();
    });
  }

  function handleResume() {
    startTransition(async () => {
      const result = await resumeTimerAction();
      if (!result.ok) toast.error(result.error);
      else router.refresh();
    });
  }

  function handleStop() {
    startTransition(async () => {
      const result = await stopTimerAction({
        billable,
        billableRate: billableRate ? Number(billableRate) : null,
      });
      if (!result.ok) toast.error(result.error);
      else {
        toast.success("Time entry logged.");
        router.refresh();
      }
    });
  }

  if (!session) {
    return (
      <Card>
        <CardContent className="space-y-4 p-6">
          <p className="text-sm font-medium text-muted-foreground">Start a timer</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="timer-project">Project</Label>
              <select id="timer-project" className={selectClass} value={projectId} onChange={(e) => setProjectId(e.target.value)} disabled={isPending}>
                {projects.length === 0 && <option value="">No active projects</option>}
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · {p.clientName}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timer-description">What are you working on?</Label>
              <Input id="timer-description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={isPending} />
            </div>
          </div>
          <Button variant="brand" onClick={handleStart} disabled={isPending || projects.length === 0}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            Start timer
          </Button>
        </CardContent>
      </Card>
    );
  }

  const seconds = elapsedSeconds(session);
  // `now` triggers re-render every second while running.
  void now;

  return (
    <Card className="border-primary/30">
      <CardContent className="space-y-4 p-6">
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            {session.projectName}
            {session.description ? ` · ${session.description}` : ""}
          </p>
          <p className="mt-1 font-mono text-4xl font-bold tabular-nums">{formatDuration(seconds)}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch checked={billable} onCheckedChange={setBillable} id="timer-billable" />
            <Label htmlFor="timer-billable" className="font-normal">
              Billable
            </Label>
          </div>
          {billable && (
            <div className="flex items-center gap-2">
              <Label htmlFor="timer-rate" className="font-normal">
                Rate
              </Label>
              <Input
                id="timer-rate"
                type="number"
                min="0"
                step="0.01"
                className="w-28"
                value={billableRate}
                onChange={(e) => setBillableRate(e.target.value)}
                disabled={isPending}
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {session.status === "running" ? (
            <Button variant="outline" onClick={handlePause} disabled={isPending}>
              <Pause className="h-4 w-4" /> Pause
            </Button>
          ) : (
            <Button variant="outline" onClick={handleResume} disabled={isPending}>
              <Play className="h-4 w-4" /> Resume
            </Button>
          )}
          <Button variant="brand" onClick={handleStop} disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Square className="h-4 w-4" />}
            Stop & Log
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

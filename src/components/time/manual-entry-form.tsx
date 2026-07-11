"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { createManualTimeEntry } from "@/server/actions/time";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectOption {
  id: string;
  name: string;
  clientName: string;
}

const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

function toLocalDatetimeInput(date: Date): string {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}

export function ManualEntryForm({ projects }: { projects: ProjectOption[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
  const [description, setDescription] = useState("");
  const [startedAt, setStartedAt] = useState(toLocalDatetimeInput(new Date()));
  const [durationMinutes, setDurationMinutes] = useState("60");
  const [billable, setBillable] = useState(true);
  const [billableRate, setBillableRate] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    startTransition(async () => {
      const result = await createManualTimeEntry({
        projectId,
        description: description || null,
        startedAt: new Date(startedAt).toISOString(),
        durationMinutes,
        billable,
        billableRate: billableRate || null,
      });
      if (!result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        toast.error(result.error);
        return;
      }
      toast.success("Time entry added.");
      setDescription("");
      router.refresh();
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Manual entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="manual-project">Project</Label>
              <select id="manual-project" className={selectClass} value={projectId} onChange={(e) => setProjectId(e.target.value)} disabled={isPending}>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · {p.clientName}
                  </option>
                ))}
              </select>
              {fieldErrors.projectId?.map((e) => (
                <p key={e} className="text-sm text-destructive">
                  {e}
                </p>
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="manual-description">Description</Label>
              <Input id="manual-description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={isPending} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="manual-start">Start</Label>
              <Input id="manual-start" type="datetime-local" value={startedAt} onChange={(e) => setStartedAt(e.target.value)} disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manual-duration">Duration (minutes)</Label>
              <Input
                id="manual-duration"
                type="number"
                min="1"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                disabled={isPending}
              />
              {fieldErrors.durationMinutes?.map((e) => (
                <p key={e} className="text-sm text-destructive">
                  {e}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch checked={billable} onCheckedChange={setBillable} id="manual-billable" />
              <Label htmlFor="manual-billable" className="font-normal">
                Billable
              </Label>
            </div>
            {billable && (
              <div className="flex items-center gap-2">
                <Label htmlFor="manual-rate" className="font-normal">
                  Rate
                </Label>
                <Input
                  id="manual-rate"
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

          <Button type="submit" variant="brand" disabled={isPending || !projectId}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Add entry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

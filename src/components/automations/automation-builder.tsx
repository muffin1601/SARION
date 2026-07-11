"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createAutomation, updateAutomation } from "@/server/actions/automations";
import { TriggerPicker } from "@/components/automations/trigger-picker";
import { ConditionEditor } from "@/components/automations/condition-editor";
import { ActionEditor } from "@/components/automations/action-editor";
import { ActionPicker } from "@/components/automations/action-picker";
import { defaultActionConfig, type AutomationActionConfig, type AutomationActionType } from "@/lib/automation-actions";
import type { AutomationCondition } from "@/lib/automation-conditions";
import type { AutomationDetail } from "@/server/data/automations";

interface AutomationBuilderProps {
  automation?: AutomationDetail;
  teamOptions: { id: string; name: string }[];
}

export function AutomationBuilder({ automation, teamOptions }: AutomationBuilderProps) {
  const router = useRouter();
  const isEditing = Boolean(automation);

  const [name, setName] = useState(automation?.name ?? "");
  const [description, setDescription] = useState(automation?.description ?? "");
  const [triggerType, setTriggerType] = useState(automation?.triggerType ?? "Client Created");
  const [conditions, setConditions] = useState<AutomationCondition[]>(automation?.conditions ?? []);
  const [actions, setActions] = useState<AutomationActionConfig[]>(automation?.actions ?? []);
  const [isPending, startTransition] = useTransition();

  function addAction(type: AutomationActionType) {
    setActions((prev) => [...prev, defaultActionConfig(type)]);
  }

  function updateAction(index: number, config: AutomationActionConfig) {
    setActions((prev) => prev.map((a, i) => (i === index ? config : a)));
  }

  function removeAction(index: number) {
    setActions((prev) => prev.filter((_, i) => i !== index));
  }

  function duplicateAction(index: number) {
    setActions((prev) => {
      const copy = [...prev];
      copy.splice(index + 1, 0, { ...prev[index] });
      return copy;
    });
  }

  function moveAction(index: number, direction: -1 | 1) {
    setActions((prev) => {
      const to = index + direction;
      if (to < 0 || to >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[to]] = [copy[to], copy[index]];
      return copy;
    });
  }

  function handleSave() {
    startTransition(async () => {
      const input = { name, description, triggerType, conditions, actions };
      const result = isEditing
        ? await updateAutomation(automation!.id, input)
        : await createAutomation(input);

      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(isEditing ? "Automation updated" : "Automation created");
      router.push(`/automations/${result.automationId}`);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="automation-name">Name</Label>
            <Input id="automation-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Invoice paid → onboard" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="automation-description">Description (optional)</Label>
            <Input
              id="automation-description"
              value={description ?? ""}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What does this automation do?"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>1. Trigger</CardTitle>
        </CardHeader>
        <CardContent>
          <TriggerPicker value={triggerType} onChange={setTriggerType} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <ConditionEditor triggerType={triggerType} conditions={conditions} onChange={setConditions} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3. Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {actions.length === 0 ? (
            <p className="text-sm text-muted-foreground">Add at least one action to run when this automation fires.</p>
          ) : (
            <div className="space-y-3">
              {actions.map((action, index) => (
                <ActionEditor
                  key={index}
                  index={index}
                  total={actions.length}
                  config={action}
                  teamOptions={teamOptions}
                  onChange={(c) => updateAction(index, c)}
                  onRemove={() => removeAction(index)}
                  onDuplicate={() => duplicateAction(index)}
                  onMove={(direction) => moveAction(index, direction)}
                />
              ))}
            </div>
          )}
          <Separator />
          <ActionPicker onSelect={addAction} />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={() => router.push("/automations")} disabled={isPending}>
          Cancel
        </Button>
        <Button variant="brand" onClick={handleSave} disabled={isPending || !name.trim() || actions.length === 0}>
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEditing ? "Save changes" : "Create automation"}
        </Button>
      </div>
    </div>
  );
}

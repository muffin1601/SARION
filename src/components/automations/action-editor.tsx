"use client";

import { ChevronDown, ChevronUp, Copy, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { actionCatalogEntry, type AutomationActionConfig } from "@/lib/automation-actions";

interface TeamOption {
  id: string;
  name: string;
}

interface ActionEditorProps {
  index: number;
  total: number;
  config: AutomationActionConfig;
  teamOptions: TeamOption[];
  onChange: (config: AutomationActionConfig) => void;
  onRemove: () => void;
  onDuplicate: () => void;
  onMove: (direction: -1 | 1) => void;
}

export function ActionEditor({
  index,
  total,
  config,
  teamOptions,
  onChange,
  onRemove,
  onDuplicate,
  onMove,
}: ActionEditorProps) {
  const entry = actionCatalogEntry(config.type);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {entry ? <entry.icon className="h-4 w-4 text-muted-foreground" /> : null}
          <span className="text-sm font-medium">
            {index + 1}. {entry?.label ?? config.type}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled={index === 0} onClick={() => onMove(-1)}>
            <ChevronUp className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            disabled={index === total - 1}
            onClick={() => onMove(1)}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onDuplicate} aria-label="Duplicate">
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onRemove} aria-label="Remove">
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <ActionConfigFields config={config} teamOptions={teamOptions} onChange={onChange} />
    </div>
  );
}

function ActionConfigFields({
  config,
  teamOptions,
  onChange,
}: {
  config: AutomationActionConfig;
  teamOptions: TeamOption[];
  onChange: (config: AutomationActionConfig) => void;
}) {
  switch (config.type) {
    case "create_client":
      return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Field label="Name">
            <Input value={config.name} onChange={(e) => onChange({ ...config, name: e.target.value })} />
          </Field>
          <Field label="Company">
            <Input value={config.company ?? ""} onChange={(e) => onChange({ ...config, company: e.target.value })} />
          </Field>
          <Field label="Email">
            <Input value={config.email ?? ""} onChange={(e) => onChange({ ...config, email: e.target.value })} />
          </Field>
        </div>
      );

    case "create_project":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Name">
              <Input value={config.name} onChange={(e) => onChange({ ...config, name: e.target.value })} />
            </Field>
            <Field label="Status">
              <Select value={config.status} onValueChange={(v) => onChange({ ...config, status: v as typeof config.status })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLANNED">Planned</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="ON_HOLD">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <SwitchField
            label="Use the client from the triggering event"
            checked={config.useTriggerClient}
            onChange={(v) => onChange({ ...config, useTriggerClient: v })}
          />
        </div>
      );

    case "assign_team_member":
      return (
        <Field label="Team member">
          <Select value={config.userId} onValueChange={(v) => onChange({ ...config, userId: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a team member" />
            </SelectTrigger>
            <SelectContent>
              {teamOptions.map((u) => (
                <SelectItem key={u.id} value={u.id}>
                  {u.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      );

    case "create_task":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Title">
              <Input value={config.title} onChange={(e) => onChange({ ...config, title: e.target.value })} />
            </Field>
            <Field label="Assignee (optional)">
              <Select
                value={config.assigneeId ?? "none"}
                onValueChange={(v) => onChange({ ...config, assigneeId: v === "none" ? undefined : v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Unassigned</SelectItem>
                  {teamOptions.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <SwitchField
            label="Use the project from the triggering event"
            checked={config.useTriggerProject}
            onChange={(v) => onChange({ ...config, useTriggerProject: v })}
          />
        </div>
      );

    case "update_status":
      return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Entity">
            <Select value={config.entity} onValueChange={(v) => onChange({ ...config, entity: v as typeof config.entity })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="invoice">Invoice</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="New status">
            <Input value={config.value} onChange={(e) => onChange({ ...config, value: e.target.value })} />
          </Field>
        </div>
      );

    case "generate_invoice":
      return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Description">
            <Input value={config.description} onChange={(e) => onChange({ ...config, description: e.target.value })} />
          </Field>
          <Field label="Amount">
            <Input
              type="number"
              value={config.amount}
              onChange={(e) => onChange({ ...config, amount: Number(e.target.value) })}
            />
          </Field>
        </div>
      );

    case "record_payment":
      return <p className="text-sm text-muted-foreground">Marks the triggering invoice as paid.</p>;

    case "create_activity":
      return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Title">
            <Input value={config.title} onChange={(e) => onChange({ ...config, title: e.target.value })} />
          </Field>
          <Field label="Description">
            <Input value={config.description} onChange={(e) => onChange({ ...config, description: e.target.value })} />
          </Field>
        </div>
      );

    case "send_notification":
      return (
        <Field label="Message">
          <Textarea rows={3} value={config.message} onChange={(e) => onChange({ ...config, message: e.target.value })} />
        </Field>
      );

    case "send_email":
      return (
        <div className="space-y-3">
          <Field label="Subject">
            <Input value={config.subject} onChange={(e) => onChange({ ...config, subject: e.target.value })} />
          </Field>
          <Field label="Message">
            <Textarea rows={3} value={config.message} onChange={(e) => onChange({ ...config, message: e.target.value })} />
          </Field>
        </div>
      );

    case "webhook":
      return (
        <Field label="Webhook URL">
          <Input
            type="url"
            placeholder="https://"
            value={config.url}
            onChange={(e) => onChange({ ...config, url: e.target.value })}
          />
        </Field>
      );

    default:
      return null;
  }
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function SwitchField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Switch checked={checked} onCheckedChange={onChange} id={label} />
      <Label htmlFor={label} className="text-sm font-normal text-muted-foreground">
        {label}
      </Label>
    </div>
  );
}

"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AUTOMATION_TRIGGERS } from "@/lib/automation-triggers";

export function TriggerPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a trigger" />
      </SelectTrigger>
      <SelectContent>
        {AUTOMATION_TRIGGERS.map((trigger) => (
          <SelectItem key={trigger.value} value={trigger.value}>
            {trigger.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

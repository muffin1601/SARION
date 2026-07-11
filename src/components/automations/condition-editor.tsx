"use client";

import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmptyState } from "@/components/ui/empty-state";
import {
  CONDITION_OPERATORS,
  fieldsForTrigger,
  type AutomationCondition,
} from "@/lib/automation-conditions";

export function ConditionEditor({
  triggerType,
  conditions,
  onChange,
}: {
  triggerType: string;
  conditions: AutomationCondition[];
  onChange: (conditions: AutomationCondition[]) => void;
}) {
  const fields = fieldsForTrigger(triggerType);

  function update(index: number, patch: Partial<AutomationCondition>) {
    onChange(conditions.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  }

  function remove(index: number) {
    onChange(conditions.filter((_, i) => i !== index));
  }

  function add() {
    const first = fields[0];
    if (!first) return;
    onChange([...conditions, { field: first.field, operator: ">", value: first.valueType === "number" ? 0 : "" }]);
  }

  return (
    <div className="space-y-3">
      {conditions.length === 0 ? (
        <EmptyState title="No conditions" description="This automation runs on every trigger event." />
      ) : (
        <ul className="space-y-2">
          {conditions.map((condition, index) => {
            const field = fields.find((f) => f.field === condition.field) ?? fields[0];
            return (
              <li key={index} className="flex flex-wrap items-center gap-2 rounded-lg border p-3">
                <Select value={condition.field} onValueChange={(v) => update(index, { field: v })}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fields.map((f) => (
                      <SelectItem key={f.field} value={f.field}>
                        {f.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={condition.operator}
                  onValueChange={(v) => update(index, { operator: v as AutomationCondition["operator"] })}
                >
                  <SelectTrigger className="w-44">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONDITION_OPERATORS.map((op) => (
                      <SelectItem key={op.value} value={op.value}>
                        {op.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {field?.options ? (
                  <Select value={String(condition.value)} onValueChange={(v) => update(index, { value: v })}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={field?.valueType === "number" ? "number" : "text"}
                    value={condition.value}
                    onChange={(e) =>
                      update(index, {
                        value: field?.valueType === "number" ? Number(e.target.value) : e.target.value,
                      })
                    }
                    className="w-40"
                  />
                )}

                <Button variant="ghost" size="icon" className="ml-auto h-9 w-9" onClick={() => remove(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </li>
            );
          })}
        </ul>
      )}
      <Button type="button" variant="outline" size="sm" onClick={add} disabled={fields.length === 0}>
        <Plus className="h-4 w-4" /> Add Condition
      </Button>
    </div>
  );
}

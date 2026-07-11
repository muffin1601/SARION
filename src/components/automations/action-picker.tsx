"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AUTOMATION_ACTION_CATALOG, type AutomationActionType } from "@/lib/automation-actions";

export function ActionPicker({ onSelect }: { onSelect: (type: AutomationActionType) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          <Plus className="h-4 w-4" /> Add Action
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-80 overflow-y-auto">
        {AUTOMATION_ACTION_CATALOG.map((entry) => (
          <DropdownMenuItem
            key={entry.type}
            disabled={entry.comingSoon}
            onSelect={() => !entry.comingSoon && onSelect(entry.type)}
          >
            <entry.icon className="h-4 w-4" />
            <span className="flex-1">{entry.label}</span>
            {entry.comingSoon ? <span className="text-xs text-muted-foreground">Coming soon</span> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

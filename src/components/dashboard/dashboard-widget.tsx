"use client";

import { useState, useTransition, type ReactNode } from "react";
import { ChevronDown, ChevronUp, EyeOff, GripVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDashboardCustomize } from "@/components/dashboard/dashboard-customize-context";
import {
  moveWidget,
  toggleWidgetCollapsed,
  toggleWidgetHidden,
  type DashboardWidgetId,
} from "@/server/actions/dashboard-prefs";
import { cn } from "@/lib/utils";

interface DashboardWidgetProps {
  id: DashboardWidgetId;
  title: string;
  collapsedInitially: boolean;
  hiddenInitially: boolean;
  isFirst: boolean;
  isLast: boolean;
  children: ReactNode;
}

/**
 * Generic hide/collapse/reorder chrome around a dashboard section. Prefs are
 * persisted server-side (src/server/actions/dashboard-prefs.ts); this
 * component only manages the customize-mode toolbar and optimistic collapse.
 */
export function DashboardWidget({
  id,
  title,
  collapsedInitially,
  hiddenInitially,
  isFirst,
  isLast,
  children,
}: DashboardWidgetProps) {
  const { customizing } = useDashboardCustomize();
  const [collapsed, setCollapsed] = useState(collapsedInitially);
  const [hidden, setHidden] = useState(hiddenInitially);
  const [isPending, startTransition] = useTransition();

  if (!customizing) {
    return hidden || collapsed ? null : <>{children}</>;
  }

  return (
    <div className={cn("relative rounded-xl border-2 border-dashed border-primary/30 p-2", hidden && "opacity-50")}>
      <div className="mb-2 flex items-center justify-between gap-2 rounded-lg bg-muted px-3 py-1.5">
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <GripVertical className="h-3.5 w-3.5" />
          {title}
          {hidden && <span className="italic">(hidden)</span>}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            disabled={isFirst || isPending}
            onClick={() => startTransition(() => { void moveWidget(id, -1); })}
            aria-label="Move up"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            disabled={isLast || isPending}
            onClick={() => startTransition(() => { void moveWidget(id, 1); })}
            aria-label="Move down"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            disabled={isPending}
            onClick={() => {
              setCollapsed((v) => !v);
              startTransition(() => { void toggleWidgetCollapsed(id); });
            }}
            aria-label={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            disabled={isPending}
            onClick={() => {
              setHidden((v) => !v);
              startTransition(() => { void toggleWidgetHidden(id); });
            }}
            aria-label={hidden ? "Show widget" : "Hide widget"}
          >
            <EyeOff className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className={cn(collapsed && "hidden")}>{children}</div>
    </div>
  );
}

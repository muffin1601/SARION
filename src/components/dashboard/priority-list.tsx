import type { ReactNode } from "react";
import Link from "next/link";
import { AlertCircle, CalendarClock, FileWarning, PauseCircle, TrendingDown, UserX } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import type { DashboardSignal, SignalKind } from "@/lib/dashboard-priorities";

const KIND_ICON: Record<SignalKind, typeof AlertCircle> = {
  invoice_overdue: FileWarning,
  project_delayed: AlertCircle,
  meeting_today: CalendarClock,
  client_inactive: UserX,
  cashflow_declining: TrendingDown,
  margin_dropping: TrendingDown,
  large_unpaid_invoice: FileWarning,
  client_unprofitable: TrendingDown,
  subscription_auto_paused: PauseCircle,
};

const SEVERITY_VARIANT: Record<DashboardSignal["severity"], "destructive" | "warning" | "secondary"> = {
  high: "destructive",
  medium: "warning",
  low: "secondary",
};

/**
 * Shared renderer for Today's Priorities and the Notifications Center — both
 * are built from the same DashboardSignal[] (src/lib/dashboard-priorities.ts),
 * so this is the single place that renders a signal.
 */
export function PriorityList({
  signals,
  emptyTitle = "All clear",
  emptyDescription = "Nothing needs your attention right now.",
  renderTrailing,
}: {
  signals: DashboardSignal[];
  emptyTitle?: string;
  emptyDescription?: string;
  renderTrailing?: (signal: DashboardSignal) => ReactNode;
}) {
  if (signals.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <ul className="space-y-3">
      {signals.map((signal) => {
        const Icon = KIND_ICON[signal.kind];
        return (
          <li
            key={signal.id}
            className="flex items-start gap-3 rounded-lg border p-3"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
              <Icon className="h-4 w-4 text-muted-foreground" />
            </span>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">{signal.title}</span>
                <Badge variant={SEVERITY_VARIANT[signal.severity]} className="capitalize">
                  {signal.severity}
                </Badge>
              </div>
              <p className="truncate text-sm text-muted-foreground">{signal.description}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button asChild variant="outline" size="sm">
                <Link href={signal.href}>{signal.actionLabel}</Link>
              </Button>
              {renderTrailing?.(signal)}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

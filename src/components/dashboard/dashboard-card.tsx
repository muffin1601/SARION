import Link from "next/link";
import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import type { TrendValue } from "@/lib/trend";

interface DashboardCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  href?: string;
  trend?: TrendValue | null;
}

/** Generic KPI stat card — reusable across the dashboard and future ERP modules. */
export function DashboardCard({ label, value, icon: Icon, href, trend }: DashboardCardProps) {
  const content = (
    <Card className={cn(href && "transition-colors hover:border-primary/40 hover:bg-accent/40")}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <span className="text-2xl font-bold tracking-tight tabular-nums">{value}</span>
          {trend && trend.direction !== "flat" ? (
            <span
              className={cn(
                "flex items-center gap-0.5 text-xs font-medium",
                trend.direction === "up" ? "text-emerald-600" : "text-destructive",
              )}
            >
              {trend.direction === "up" ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              {trend.percent}%
            </span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );

  return href ? (
    <Link href={href} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}

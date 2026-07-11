import {
  ArrowUpRight,
  BarChart3,
  CircleDollarSign,
  FileClock,
  Percent,
  Receipt,
  Repeat,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import type { FinanceMetric } from "@/server/data/finance";

const METRIC_ICON: Record<string, LucideIcon> = {
  revenue: TrendingUp,
  profit: CircleDollarSign,
  outstanding: FileClock,
  expenses: Receipt,
  cashCollected: Wallet,
  recurringRevenue: Repeat,
  avgClientValue: Users,
  avgProjectValue: BarChart3,
  profitMargin: Percent,
  monthlyGrowth: ArrowUpRight,
};

export function FinanceMetricsGrid({ metrics }: { metrics: FinanceMetric[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {metrics.map((metric) => (
        <DashboardCard
          key={metric.key}
          label={metric.label}
          value={metric.formatted}
          icon={METRIC_ICON[metric.key] ?? CircleDollarSign}
          trend={metric.trend}
        />
      ))}
    </div>
  );
}

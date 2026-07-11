import {
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock,
  ListTodo,
  Receipt,
  Wallet,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ClientTimelineSummary } from "@/server/data/timeline";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatRelative(date: Date | null) {
  if (!date) return "No activity yet";
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.round(diffMs / 60_000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.round(diffHr / 24);
  return `${diffDay}d ago`;
}

export function ClientSummaryPanel({ summary }: { summary: ClientTimelineSummary }) {
  const stats: { icon: typeof Wallet; label: string; value: string }[] = [
    { icon: Wallet, label: "Revenue", value: formatCurrency(summary.revenue) },
    { icon: Receipt, label: "Outstanding", value: formatCurrency(summary.outstanding) },
    { icon: Briefcase, label: "Projects", value: String(summary.projectCount) },
    {
      icon: CheckCircle2,
      label: "Completed Projects",
      value: String(summary.completedProjectCount),
    },
    { icon: ListTodo, label: "Pending Tasks", value: String(summary.pendingTaskCount) },
    { icon: Clock, label: "Last Activity", value: formatRelative(summary.lastActivityAt) },
    { icon: CalendarDays, label: "Client Since", value: formatDate(summary.clientSince) },
  ];

  return (
    <Card className="lg:sticky lg:top-0 lg:self-start">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Client Overview</CardTitle>
        <Badge variant={summary.status === "active" ? "success" : "warning"}>
          {summary.status === "active" ? "Active" : "Archived"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <stat.icon className="h-4 w-4" />
              {stat.label}
            </div>
            <span className="text-sm font-medium">{stat.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

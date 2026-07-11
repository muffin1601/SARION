import Link from "next/link";
import { Clock, Gauge, FileSignature, Repeat, CalendarClock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import type { OpsSnapshot } from "@/server/data/dashboard";

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

export function TodaysHoursWidget({ hours }: { hours: number }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Today&apos;s Hours</CardTitle>
        <Button asChild variant="link" className="h-auto p-0 text-sm">
          <Link href="/time">Open Timer</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Clock className="h-5 w-5" />
          </span>
          <p className="text-3xl font-bold tabular-nums">{hours.toFixed(2)}h</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function BillableHoursWidget({ hours }: { hours: number }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Billable Hours (this week)</CardTitle>
        <Button asChild variant="link" className="h-auto p-0 text-sm">
          <Link href="/finance">View Finance</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Clock className="h-5 w-5" />
          </span>
          <p className="text-3xl font-bold tabular-nums">{hours.toFixed(2)}h</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function TeamUtilizationWidget({ percent }: { percent: number }) {
  const overloaded = percent > 100;
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Team Utilization</CardTitle>
        <Button asChild variant="link" className="h-auto p-0 text-sm">
          <Link href="/time">View Workload</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Gauge className="h-5 w-5" />
          </span>
          <p className="text-3xl font-bold tabular-nums">{percent}%</p>
          {overloaded && <Badge variant="destructive">Overloaded</Badge>}
        </div>
      </CardContent>
    </Card>
  );
}

export function UpcomingRenewalsWidget({ renewals }: { renewals: OpsSnapshot["upcomingRenewals"] }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Upcoming Renewals</CardTitle>
        <Button asChild variant="link" className="h-auto p-0 text-sm">
          <Link href="/recurring">View Recurring</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {renewals.length === 0 ? (
          <EmptyState icon={CalendarClock} title="Nothing due soon" description="No renewals in the next 14 days." />
        ) : (
          <ul className="space-y-2">
            {renewals.map((r) => (
              <li key={r.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.clientName} · {formatDate(r.nextBillingDate)}
                  </p>
                </div>
                <span className="font-semibold tabular-nums">{money(r.amount)}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export function RecurringRevenueWidget({ formatted }: { formatted: string }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Recurring Revenue (MRR)</CardTitle>
        <Button asChild variant="link" className="h-auto p-0 text-sm">
          <Link href="/recurring">View Recurring</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Repeat className="h-5 w-5" />
          </span>
          <p className="text-3xl font-bold tabular-nums">{formatted}</p>
        </div>
      </CardContent>
    </Card>
  );
}

const PROPOSAL_STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  sent: "Sent",
  viewed: "Viewed",
  accepted: "Accepted",
  rejected: "Rejected",
  expired: "Expired",
  cancelled: "Cancelled",
};

export function ProposalPipelineWidget({ pipeline }: { pipeline: OpsSnapshot["proposalPipeline"] }) {
  const total = pipeline.reduce((sum, p) => sum + p.count, 0);
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Proposal Pipeline</CardTitle>
        <Button asChild variant="link" className="h-auto p-0 text-sm">
          <Link href="/proposals">View Proposals</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {total === 0 ? (
          <EmptyState icon={FileSignature} title="No proposals yet" description="Build your first proposal to see pipeline stats." />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {pipeline.map((p) => (
              <div key={p.status} className="rounded-lg border p-3 text-center">
                <p className="text-lg font-bold tabular-nums">{p.count}</p>
                <p className="text-xs text-muted-foreground">{PROPOSAL_STATUS_LABEL[p.status] ?? p.status}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

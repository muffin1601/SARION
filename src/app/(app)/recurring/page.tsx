import type { Metadata } from "next";
import Link from "next/link";

import { requireOwner } from "@/server/auth-context";
import { listSubscriptions, getRecurringOverview } from "@/server/data/recurring";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { SubscriptionList } from "@/components/recurring/subscription-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { TrendingUp, Repeat, CalendarClock, AlertTriangle } from "lucide-react";

export const metadata: Metadata = { title: "Recurring Billing · Sarion" };

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

export default async function RecurringPage() {
  const { agencyId } = await requireOwner();
  const [subscriptions, overview] = await Promise.all([listSubscriptions(agencyId), getRecurringOverview(agencyId)]);

  return (
    <PageWrapper
      title="Recurring Billing"
      description="Subscriptions, MRR, ARR, and renewal tracking."
      action={
        <Button asChild variant="brand">
          <Link href="/recurring/new">+ New Subscription</Link>
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard label="MRR" value={overview.mrrFormatted} icon={TrendingUp} />
          <DashboardCard label="ARR" value={overview.arrFormatted} icon={Repeat} />
          <DashboardCard label="Recurring Revenue (this month)" value={money(overview.recurringRevenueThisMonth)} icon={CalendarClock} />
          <DashboardCard label="Failed Renewals" value={String(overview.failedRenewals.length)} icon={AlertTriangle} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Renewals</CardTitle>
            </CardHeader>
            <CardContent>
              {overview.upcomingRenewals.length === 0 ? (
                <EmptyState title="Nothing due soon" description="No renewals in the next 14 days." />
              ) : (
                <ul className="space-y-2">
                  {overview.upcomingRenewals.map((r) => (
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

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Failed Renewals</CardTitle>
            </CardHeader>
            <CardContent>
              {overview.failedRenewals.length === 0 ? (
                <EmptyState title="No failures" description="All recent billing attempts succeeded." />
              ) : (
                <ul className="space-y-2">
                  {overview.failedRenewals.map((f) => (
                    <li key={f.id} className="rounded-lg border border-destructive/30 p-3 text-sm">
                      <p className="font-medium">{f.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {f.clientName} · {formatDate(f.failedAt)}
                        {f.reason ? ` — ${f.reason}` : ""}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <SubscriptionList subscriptions={subscriptions} />
      </div>
    </PageWrapper>
  );
}

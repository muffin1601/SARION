import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { requireOwner } from "@/server/auth-context";
import { getSubscription, listOccurrences } from "@/server/data/recurring";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { GenerateNowButton } from "@/components/recurring/generate-now-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = { title: "Subscription · Sarion" };

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

const OCCURRENCE_VARIANT: Record<string, "success" | "destructive" | "secondary"> = {
  generated: "success",
  failed: "destructive",
  scheduled: "secondary",
  skipped: "secondary",
};

export default async function SubscriptionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { agencyId } = await requireOwner();
  const { id } = await params;
  const [subscription, occurrences] = await Promise.all([getSubscription(agencyId, id), listOccurrences(agencyId, id)]);
  if (!subscription) notFound();

  // Only offer manual generation for a subscription that's actually due —
  // active, and its next billing date has arrived — matching the same gate
  // the cron path (processDueSubscriptions) uses.
  const isDue = subscription.status === "active" && subscription.nextBillingDate <= new Date();

  return (
    <PageWrapper
      title={subscription.name}
      description={subscription.clientName}
      action={
        <div className="flex items-center gap-2">
          {isDue && <GenerateNowButton subscriptionId={id} subscriptionName={subscription.name} />}
          <Button asChild variant="outline" size="sm">
            <Link href={`/recurring/${id}/edit`}>Edit</Link>
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Info label="Amount" value={money(subscription.amount)} />
            <Info label="Frequency" value={subscription.frequency} />
            <Info label="Next Billing" value={formatDate(subscription.nextBillingDate)} />
            <Info label="Status" value={<Badge variant={subscription.status === "active" ? "success" : "secondary"}>{subscription.status}</Badge>} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            {occurrences.length === 0 ? (
              <EmptyState title="No occurrences yet" description="Use Generate Now or wait for the next billing date." />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scheduled</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Generated</TableHead>
                    <TableHead>Invoice</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {occurrences.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell>{formatDate(o.scheduledFor)}</TableCell>
                      <TableCell>
                        <Badge variant={OCCURRENCE_VARIANT[o.status] ?? "secondary"}>{o.status}</Badge>
                        {o.failureReason ? <span className="ml-2 text-xs text-muted-foreground">{o.failureReason}</span> : null}
                      </TableCell>
                      <TableCell>{formatDate(o.generatedAt)}</TableCell>
                      <TableCell>
                        {o.invoiceId ? (
                          <Link href={`/invoices/${o.invoiceId}`} className="text-primary hover:underline">
                            View invoice
                          </Link>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      {/* div, not p — value can be a Badge (renders a div), which is invalid inside <p> and throws a hydration mismatch. */}
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}

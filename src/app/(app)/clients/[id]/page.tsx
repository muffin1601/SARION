import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil } from "lucide-react";

import { requireAgency } from "@/server/auth-context";
import { getClient } from "@/server/data/clients";
import { getClientInvoices } from "@/server/data/invoices";
import { getClientTimeline, getClientTimelineSummary } from "@/server/data/timeline";
import { listProposals } from "@/server/data/proposals";
import { listSubscriptions } from "@/server/data/recurring";
import { listTimeEntries } from "@/server/data/time";
import { getClientProfitability } from "@/server/data/finance";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotesEditor } from "@/components/clients/notes-editor";
import { ArchiveClientButton } from "@/components/clients/archive-client-button";
import { InvoiceMiniList } from "@/components/invoices/invoice-mini-list";
import { ClientSummaryPanel } from "@/components/clients/client-summary-panel";
import { ClientTimelineSection } from "@/components/clients/client-timeline-section";
import { ProposalList } from "@/components/proposals/proposal-list";
import { SubscriptionList } from "@/components/recurring/subscription-list";
import { TimeEntryList } from "@/components/time/time-entry-list";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Client · Sarion" };

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { agencyId } = await requireAgency();
  const { id } = await params;
  // All reads only need the id from params — fetch them concurrently.
  const [client, invoices, summary, timelineFirstPage, proposals, subscriptions, timeEntriesPage, clientProfitability] = await Promise.all([
    getClient(agencyId, id),
    getClientInvoices(agencyId, id),
    getClientTimelineSummary(agencyId, id),
    getClientTimeline(agencyId, id),
    listProposals(agencyId, id),
    listSubscriptions(agencyId, id),
    listTimeEntries(agencyId, { clientId: id, take: 50 }),
    getClientProfitability(agencyId),
  ]);

  if (!client || !summary) notFound();

  const profitability = clientProfitability.find((c) => c.id === id) ?? {
    revenue: 0,
    costs: 0,
    profit: 0,
    marginPercent: 0,
    outstanding: 0,
    billableHoursValue: 0,
  };

  return (
    <PageWrapper
      title={client.name}
      description={client.company ?? "Client details"}
      action={
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/clients/${client.id}/edit`}>
              <Pencil className="h-4 w-4" />
              Edit
            </Link>
          </Button>
          <ArchiveClientButton clientId={client.id} clientName={client.name} />
        </div>
      }
    >
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="time">Time Entries</TabsTrigger>
          <TabsTrigger value="profitability">Profitability</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {/* SECTION 1 — Client Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Client Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Info label="Name" value={client.name} />
                  <Info label="Company" value={client.company} />
                  <Info label="Email" value={client.email} />
                  <Info label="Phone" value={client.phone} />
                  <Info label="Created" value={formatDate(client.createdAt)} />
                </CardContent>
              </Card>

              {/* SECTION 2 — Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <NotesEditor
                    clientId={client.id}
                    initialNotes={client.notes ?? ""}
                  />
                </CardContent>
              </Card>

              {/* SECTION 3 — Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <Placeholder text="No projects yet" />
                </CardContent>
              </Card>

              {/* SECTION 4 — Invoices */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>Recent Invoices</CardTitle>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/invoices/new?clientId=${client.id}`}>
                      New Invoice
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {invoices.length === 0 ? (
                    <Placeholder text="No invoices yet" />
                  ) : (
                    <InvoiceMiniList invoices={invoices} />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* SECTION 5 — Client Overview */}
            <ClientSummaryPanel summary={summary} />
          </div>

          {/* SECTION 6 — Unified Timeline */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ClientTimelineSection
                clientId={client.id}
                initialItems={timelineFirstPage.items}
                initialCursor={timelineFirstPage.nextCursor}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proposals">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Proposals</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link href={`/proposals/new?clientId=${client.id}`}>New Proposal</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <ProposalList proposals={proposals} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Subscriptions</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link href="/recurring/new">New Subscription</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <SubscriptionList subscriptions={subscriptions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time">
          <Card>
            <CardHeader>
              <CardTitle>Time Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <TimeEntryList entries={timeEntriesPage.items} showActions={false} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profitability">
          <Card>
            <CardHeader>
              <CardTitle>Profitability</CardTitle>
            </CardHeader>
            <CardContent>
              {profitability.revenue === 0 && profitability.costs === 0 && profitability.outstanding === 0 ? (
                <EmptyState title="No financial activity yet" description="Profitability appears once invoices or costs are recorded." />
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <ProfitStat label="Revenue" value={profitability.revenue} />
                  <ProfitStat label="Costs" value={profitability.costs} />
                  <ProfitStat label="Profit" value={profitability.profit} />
                  <ProfitStat label="Margin" value={profitability.marginPercent} suffix="%" />
                  <ProfitStat label="Outstanding" value={profitability.outstanding} />
                  <ProfitStat label="Billable Hours Value" value={profitability.billableHoursValue} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}

function ProfitStat({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  const formatted = suffix === "%" ? `${value.toFixed(1)}%` : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
  return (
    <div className="rounded-lg border p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-bold tabular-nums">{formatted}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm">{value?.trim() ? value : "—"}</p>
    </div>
  );
}

function Placeholder({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed py-8 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}

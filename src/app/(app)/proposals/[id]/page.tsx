import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { requireAgency } from "@/server/auth-context";
import { getProposal } from "@/server/data/proposals";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProposalStatusBadge } from "@/components/proposals/proposal-status-badge";
import { ProposalActions } from "@/components/proposals/proposal-actions";

export const metadata: Metadata = { title: "Proposal · Sarion" };

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(date);
}

export default async function ProposalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { agencyId } = await requireAgency();
  const { id } = await params;
  const proposal = await getProposal(agencyId, id);
  if (!proposal) notFound();

  return (
    <PageWrapper
      title={proposal.name}
      description={proposal.clientName ?? "No client linked yet"}
      action={
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/proposals/${proposal.id}/edit`}>Edit</Link>
          </Button>
          <ProposalActions proposalId={proposal.id} status={proposal.status} shareToken={proposal.shareToken} />
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Services &amp; Pricing</CardTitle>
              <ProposalStatusBadge status={proposal.status} />
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {proposal.items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between py-2 text-sm">
                    <span>
                      {item.description} <span className="text-muted-foreground">× {item.qty}</span>
                    </span>
                    <span className="tabular-nums">{money(item.lineTotal)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-1 border-t pt-4 text-right text-sm text-muted-foreground">
                <p>Subtotal {money(proposal.subtotal)}</p>
                {proposal.discountValue ? (
                  <p>
                    Discount ({proposal.discountType === "percent" ? `${proposal.discountValue}%` : money(proposal.discountValue)})
                  </p>
                ) : null}
                {proposal.taxPercent ? <p>Tax {proposal.taxPercent}%</p> : null}
                <p className="text-lg font-semibold text-foreground">{money(proposal.total)}</p>
              </div>
            </CardContent>
          </Card>

          {proposal.terms ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">{proposal.terms}</p>
              </CardContent>
            </Card>
          ) : null}

          {proposal.notes ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Internal Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">{proposal.notes}</p>
              </CardContent>
            </Card>
          ) : null}
        </div>

        <Card className="lg:sticky lg:top-0 lg:self-start">
          <CardHeader>
            <CardTitle className="text-base">Status Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Row label="Created" value={formatDate(proposal.createdAt)} />
            <Row label="Sent" value={formatDate(proposal.sentAt)} />
            <Row label="Viewed" value={formatDate(proposal.viewedAt)} />
            {proposal.status === "accepted" && (
              <>
                <Row label="Accepted by" value={proposal.acceptedByName ?? "—"} />
                <Row label="Accepted" value={formatDate(proposal.acceptedAt)} />
              </>
            )}
            {proposal.status === "rejected" && (
              <>
                <Row label="Rejected" value={formatDate(proposal.rejectedAt)} />
                {proposal.rejectedReason ? <Row label="Reason" value={proposal.rejectedReason} /> : null}
              </>
            )}
            <Row label="Valid until" value={formatDate(proposal.validUntil)} />
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

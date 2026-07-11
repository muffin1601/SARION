import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPublicProposal, listProposalComments } from "@/server/data/proposals";
import { viewProposal } from "@/server/actions/proposal-public";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProposalStatusBadge } from "@/components/proposals/proposal-status-badge";
import { PublicProposalActions } from "@/components/proposals/public-proposal-actions";
import { PublicProposalCommentForm } from "@/components/proposals/public-proposal-comment-form";

export const metadata: Metadata = {
  title: "Proposal · Sarion",
  robots: { index: false, follow: false },
};

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(date);
}
function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(date);
}

export default async function PublicProposalPage({ params }: { params: Promise<{ shareToken: string }> }) {
  const { shareToken } = await params;
  const proposal = await getPublicProposal(shareToken);
  if (!proposal) notFound();

  await viewProposal(shareToken);
  const comments = await listProposalComments(proposal.id);

  const canRespond = !["accepted", "rejected", "cancelled", "expired"].includes(proposal.status);

  return (
    <div className="min-h-screen bg-muted/30 print:bg-white">
      <header className="border-b bg-card print:hidden">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-5">
          {proposal.agencyLogoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={proposal.agencyLogoUrl} alt={proposal.agencyName} className="h-9 w-auto rounded object-contain" />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient text-sm font-bold text-white">
              {proposal.agencyName.charAt(0).toUpperCase()}
            </span>
          )}
          <span className="text-lg font-semibold">{proposal.agencyName}</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{proposal.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">Valid until {formatDate(proposal.validUntil)}</p>
          </div>
          <ProposalStatusBadge status={proposal.status} />
        </div>

        {canRespond ? <PublicProposalActions shareToken={shareToken} /> : null}
        {proposal.status === "accepted" && (
          <Card>
            <CardContent className="py-4 text-sm text-emerald-700">
              Accepted by {proposal.acceptedByName} on {formatDate(proposal.acceptedAt)}.
            </CardContent>
          </Card>
        )}
        {proposal.status === "rejected" && (
          <Card>
            <CardContent className="py-4 text-sm text-destructive">
              Declined on {formatDate(proposal.rejectedAt)}
              {proposal.rejectedReason ? `: ${proposal.rejectedReason}` : "."}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Services &amp; Pricing</CardTitle>
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

        <Card className="print:hidden">
          <CardHeader>
            <CardTitle className="text-base">Discussion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No comments yet.</p>
            ) : (
              <ul className="space-y-3">
                {comments.map((c) => (
                  <li key={c.id} className="rounded-lg border bg-background p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium">{c.author}</span>
                      <span className="text-xs text-muted-foreground">{formatDateTime(c.createdAt)}</span>
                    </div>
                    <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">{c.message}</p>
                  </li>
                ))}
              </ul>
            )}
            {canRespond ? (
              <div className="border-t pt-4">
                <PublicProposalCommentForm shareToken={shareToken} />
              </div>
            ) : (
              <p className="border-t pt-4 text-sm text-muted-foreground">
                This proposal is closed to new comments.
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

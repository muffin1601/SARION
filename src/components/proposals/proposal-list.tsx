import Link from "next/link";
import { FileSignature } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ProposalStatusBadge } from "@/components/proposals/proposal-status-badge";
import type { ProposalListItem } from "@/server/data/proposals";

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

export function ProposalList({ proposals }: { proposals: ProposalListItem[] }) {
  if (proposals.length === 0) {
    return (
      <EmptyState
        icon={FileSignature}
        title="No proposals yet"
        description="Build your first proposal from a template to send to a client."
      />
    );
  }

  return (
    <div className="space-y-3">
      {proposals.map((p) => (
        <Link key={p.id} href={`/proposals/${p.id}`} className="block">
          <Card className="transition-colors hover:border-primary/40 hover:bg-accent/40">
            <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="truncate font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.clientName ?? "No client"} · Valid until {formatDate(p.validUntil)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold tabular-nums">{money(p.total)}</span>
                <ProposalStatusBadge status={p.status} />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

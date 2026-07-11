import type { Metadata } from "next";
import Link from "next/link";

import { requireAgency } from "@/server/auth-context";
import { listProposals } from "@/server/data/proposals";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import { ProposalList } from "@/components/proposals/proposal-list";

export const metadata: Metadata = { title: "Proposals · Sarion" };

export default async function ProposalsPage() {
  const { agencyId } = await requireAgency();
  const proposals = await listProposals(agencyId);

  return (
    <PageWrapper
      title="Proposals"
      description="Build, send, and track client proposals."
      action={
        <Button asChild variant="brand">
          <Link href="/proposals/new">+ New Proposal</Link>
        </Button>
      }
    >
      <ProposalList proposals={proposals} />
    </PageWrapper>
  );
}

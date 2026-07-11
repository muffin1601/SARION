import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { requireAgency } from "@/server/auth-context";
import { getProposal } from "@/server/data/proposals";
import { getClientOptions } from "@/server/data/projects";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { ProposalForm } from "@/components/proposals/proposal-form";

export const metadata: Metadata = { title: "Edit Proposal · Sarion" };

export default async function EditProposalPage({ params }: { params: Promise<{ id: string }> }) {
  const { agencyId } = await requireAgency();
  const { id } = await params;
  const [proposal, clients] = await Promise.all([getProposal(agencyId, id), getClientOptions(agencyId)]);
  if (!proposal) notFound();

  return (
    <PageWrapper title={`Edit ${proposal.name}`} description="Update this proposal.">
      <div className="max-w-3xl">
        <ProposalForm
          mode="edit"
          proposalId={proposal.id}
          clients={clients}
          defaultValues={{
            name: proposal.name,
            clientId: proposal.clientId ?? undefined,
            templateCategory: proposal.templateCategory ?? undefined,
            items: proposal.items.map((i) => ({ description: i.description, qty: String(i.qty), unitPrice: String(i.unitPrice) })),
            discountType: (proposal.discountType as "percent" | "flat" | null) ?? "",
            discountValue: proposal.discountValue !== null ? String(proposal.discountValue) : "",
            taxPercent: proposal.taxPercent !== null ? String(proposal.taxPercent) : "",
            validUntil: proposal.validUntil ? proposal.validUntil.toISOString().slice(0, 10) : "",
            terms: proposal.terms ?? "",
            notes: proposal.notes ?? "",
          }}
        />
      </div>
    </PageWrapper>
  );
}

import type { Metadata } from "next";

import { requireAgency } from "@/server/auth-context";
import { getClientOptions } from "@/server/data/projects";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { ProposalForm } from "@/components/proposals/proposal-form";

export const metadata: Metadata = { title: "New Proposal · Sarion" };

export default async function NewProposalPage() {
  const { agencyId } = await requireAgency();
  const clients = await getClientOptions(agencyId);

  return (
    <PageWrapper title="New Proposal" description="Pick a template or start from scratch.">
      <div className="max-w-3xl">
        <ProposalForm mode="create" clients={clients} />
      </div>
    </PageWrapper>
  );
}

import type { Metadata } from "next";

import { requireOwner } from "@/server/auth-context";
import { listTeamMembers } from "@/server/data/team";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { AutomationBuilder } from "@/components/automations/automation-builder";

export const metadata: Metadata = { title: "New Automation · Sarion" };

export default async function NewAutomationPage() {
  const { agencyId } = await requireOwner();
  const team = await listTeamMembers(agencyId);

  return (
    <PageWrapper title="New Automation" description="Build a trigger → condition → action workflow.">
      <AutomationBuilder teamOptions={team.map((u) => ({ id: u.id, name: u.name }))} />
    </PageWrapper>
  );
}

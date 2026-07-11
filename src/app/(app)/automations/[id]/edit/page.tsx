import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { requireOwner } from "@/server/auth-context";
import { getAutomation } from "@/server/data/automations";
import { listTeamMembers } from "@/server/data/team";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { AutomationBuilder } from "@/components/automations/automation-builder";

export const metadata: Metadata = { title: "Edit Automation · Sarion" };

export default async function EditAutomationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { agencyId } = await requireOwner();
  const { id } = await params;
  const [automation, team] = await Promise.all([getAutomation(agencyId, id), listTeamMembers(agencyId)]);

  if (!automation) notFound();

  return (
    <PageWrapper title={`Edit ${automation.name}`} description="Update this automation's trigger, conditions, and actions.">
      <AutomationBuilder automation={automation} teamOptions={team.map((u) => ({ id: u.id, name: u.name }))} />
    </PageWrapper>
  );
}

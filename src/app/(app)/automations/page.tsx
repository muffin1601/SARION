import type { Metadata } from "next";
import Link from "next/link";

import { requireOwner } from "@/server/auth-context";
import { listAutomations } from "@/server/data/automations";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import { AutomationList } from "@/components/automations/automation-list";

export const metadata: Metadata = { title: "Automations · Sarion" };

export default async function AutomationsPage() {
  const { agencyId } = await requireOwner();
  const automations = await listAutomations(agencyId);

  return (
    <PageWrapper
      title="Automations"
      description="Automate your business — trigger, condition, action."
      action={
        <Button asChild variant="brand">
          <Link href="/automations/new">+ New Automation</Link>
        </Button>
      }
    >
      <AutomationList automations={automations} />
    </PageWrapper>
  );
}

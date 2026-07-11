import type { Metadata } from "next";

import { requireOwner } from "@/server/auth-context";
import { getClientOptions } from "@/server/data/projects";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { SubscriptionForm } from "@/components/recurring/subscription-form";

export const metadata: Metadata = { title: "New Subscription · Sarion" };

export default async function NewSubscriptionPage() {
  const { agencyId } = await requireOwner();
  const clients = await getClientOptions(agencyId);

  return (
    <PageWrapper title="New Subscription" description="Set up a recurring billing schedule.">
      <SubscriptionForm mode="create" clients={clients} />
    </PageWrapper>
  );
}

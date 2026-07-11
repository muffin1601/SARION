import type { Metadata } from "next";

import { requireAgency } from "@/server/auth-context";
import { getAgencyTimeline } from "@/server/data/timeline";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { TimelineFeed } from "@/components/timeline/timeline-feed";

export const metadata: Metadata = { title: "Activity · Sarion" };

export default async function ActivityPage() {
  const { agencyId } = await requireAgency();
  const firstPage = await getAgencyTimeline(agencyId);

  return (
    <PageWrapper title="Activity" description="Every event across your agency, newest first.">
      <Card>
        <CardContent className="pt-6">
          <TimelineFeed
            endpoint="/api/activity"
            initialItems={firstPage.items}
            initialCursor={firstPage.nextCursor}
          />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}

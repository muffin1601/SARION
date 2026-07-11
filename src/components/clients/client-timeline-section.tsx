"use client";

import { TimelineFeed } from "@/components/timeline/timeline-feed";
import type { TimelineEntry } from "@/components/timeline/types";

interface ClientTimelineSectionProps {
  clientId: string;
  initialItems: TimelineEntry[];
  initialCursor: string | null;
}

export function ClientTimelineSection({ clientId, initialItems, initialCursor }: ClientTimelineSectionProps) {
  return (
    <TimelineFeed
      endpoint={`/api/clients/${clientId}/timeline`}
      initialItems={initialItems}
      initialCursor={initialCursor}
    />
  );
}

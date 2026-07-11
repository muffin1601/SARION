"use client";

import { History } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { TimelineItem } from "@/components/timeline/timeline-item";
import { TimelineSkeleton } from "@/components/timeline/timeline-skeleton";
import type { TimelineEntry } from "@/components/timeline/types";

interface TimelineProps {
  items: TimelineEntry[];
  isLoading?: boolean;
  isLoadingMore?: boolean;
  hasMore?: boolean;
  /** Sentinel ref attached to the load-more trigger for infinite scroll. */
  loadMoreRef?: React.Ref<HTMLDivElement>;
  emptyTitle?: string;
  emptyDescription?: string;
}

/**
 * Generic, presentation-only vertical timeline. Reusable anywhere a
 * chronological event feed is needed (Projects, Invoices, Employees, Support
 * Tickets, ...) — callers map their own data into TimelineEntry[].
 */
export function Timeline({
  items,
  isLoading = false,
  isLoadingMore = false,
  hasMore = false,
  loadMoreRef,
  emptyTitle = "No activity yet",
  emptyDescription = "Events will appear here as they happen.",
}: TimelineProps) {
  if (isLoading) {
    return <TimelineSkeleton />;
  }

  if (items.length === 0) {
    return <EmptyState icon={History} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div>
      <ul className="space-y-0">
        {items.map((entry, i) => (
          <TimelineItem key={entry.id} entry={entry} isLast={i === items.length - 1 && !hasMore} />
        ))}
      </ul>
      {hasMore ? (
        <div ref={loadMoreRef} className="flex justify-center py-2">
          {isLoadingMore ? (
            <p className="text-xs text-muted-foreground">Loading more…</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Timeline } from "@/components/timeline/timeline";
import { TimelineFilters } from "@/components/timeline/timeline-filters";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import type { TimelineEntry, TimelinePage } from "@/components/timeline/types";
import type { TimelineCategory } from "@/lib/activity-categories";

interface TimelineFeedProps {
  /** API route returning a TimelinePage — e.g. /api/clients/[id]/timeline or /api/activity. */
  endpoint: string;
  initialItems: TimelineEntry[];
  initialCursor: string | null;
}

async function fetchTimelinePage(
  endpoint: string,
  params: { cursor?: string; category: TimelineCategory; search: string },
): Promise<TimelinePage> {
  const query = new URLSearchParams();
  if (params.cursor) query.set("cursor", params.cursor);
  if (params.category !== "all") query.set("category", params.category);
  if (params.search.trim()) query.set("search", params.search.trim());

  const res = await fetch(`${endpoint}?${query.toString()}`);
  if (!res.ok) throw new Error("Failed to load timeline");
  return res.json();
}

/**
 * Filterable, searchable, infinite-scrolling activity feed backed by any
 * cursor-paginated timeline API route. Used by the per-client timeline
 * (/clients/[id]) and the agency-wide timeline (/activity) — one client-side
 * implementation for both.
 */
export function TimelineFeed({ endpoint, initialItems, initialCursor }: TimelineFeedProps) {
  const [category, setCategory] = useState<TimelineCategory>("all");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(initialItems);
  const [cursor, setCursor] = useState(initialCursor);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // First render already has server-fetched data for category="all", search="".
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeout = setTimeout(async () => {
      setIsFiltering(true);
      try {
        const page = await fetchTimelinePage(endpoint, { category, search });
        setItems(page.items);
        setCursor(page.nextCursor);
      } finally {
        setIsFiltering(false);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [category, search, endpoint]);

  const loadMore = useCallback(async () => {
    if (!cursor || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const page = await fetchTimelinePage(endpoint, { category, search, cursor });
      setItems((prev) => [...prev, ...page.items]);
      setCursor(page.nextCursor);
    } finally {
      setIsLoadingMore(false);
    }
  }, [endpoint, category, search, cursor, isLoadingMore]);

  const loadMoreRef = useInfiniteScroll(loadMore, Boolean(cursor) && !isFiltering);

  return (
    <div className="space-y-4">
      <TimelineFilters
        category={category}
        onCategoryChange={setCategory}
        search={search}
        onSearchChange={setSearch}
      />
      <Timeline
        items={items}
        isLoading={isFiltering}
        isLoadingMore={isLoadingMore}
        hasMore={Boolean(cursor)}
        loadMoreRef={loadMoreRef}
        emptyTitle="No matching activity"
        emptyDescription="Try a different filter or search term."
      />
    </div>
  );
}

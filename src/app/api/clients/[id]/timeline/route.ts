import { NextResponse, type NextRequest } from "next/server";

import { requireAgency } from "@/server/auth-context";
import { getClientTimeline } from "@/server/data/timeline";
import { TIMELINE_CATEGORIES, type TimelineCategory } from "@/lib/activity-categories";

function isTimelineCategory(value: string | null): value is TimelineCategory {
  return TIMELINE_CATEGORIES.includes(value as TimelineCategory);
}

/** Paginated timeline feed for a client — powers infinite scroll after first paint. */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { agencyId } = await requireAgency();
  const { id: clientId } = await params;

  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get("cursor") ?? undefined;
  const search = searchParams.get("search") ?? undefined;
  const categoryParam = searchParams.get("category");
  const category = isTimelineCategory(categoryParam) ? categoryParam : "all";

  const page = await getClientTimeline(agencyId, clientId, {
    cursor,
    category,
    search,
  });

  return NextResponse.json(page);
}

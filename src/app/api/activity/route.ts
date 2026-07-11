import { NextResponse, type NextRequest } from "next/server";

import { requireAgency } from "@/server/auth-context";
import { getAgencyTimeline } from "@/server/data/timeline";
import { TIMELINE_CATEGORIES, type TimelineCategory } from "@/lib/activity-categories";

function isTimelineCategory(value: string | null): value is TimelineCategory {
  return TIMELINE_CATEGORIES.includes(value as TimelineCategory);
}

/** Paginated agency-wide timeline feed — powers /activity infinite scroll. */
export async function GET(request: NextRequest) {
  const { agencyId } = await requireAgency();

  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get("cursor") ?? undefined;
  const search = searchParams.get("search") ?? undefined;
  const categoryParam = searchParams.get("category");
  const category = isTimelineCategory(categoryParam) ? categoryParam : "all";

  const page = await getAgencyTimeline(agencyId, { cursor, category, search });

  return NextResponse.json(page);
}

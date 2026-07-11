import { NextResponse, type NextRequest } from "next/server";

import { processDueSubscriptions } from "@/server/services/recurring-billing";

/**
 * Cron-callable route for automatic Recurring Billing. NOT auto-enabled —
 * requires CRON_SECRET to be set and this route to actually be scheduled
 * (see vercel.json). Until you set CRON_SECRET and deploy the cron entry,
 * nothing calls this automatically; it can still be hit manually/for testing
 * with the correct Authorization header.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET is not configured." }, { status: 501 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await processDueSubscriptions();
  return NextResponse.json(result);
}

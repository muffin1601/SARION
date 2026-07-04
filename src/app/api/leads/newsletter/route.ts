import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { sendEmailSafe } from "@/lib/email";
import { rateLimit, clientIpFromHeaders } from "@/lib/rate-limit";

// Newsletter signups are not persisted to a subscriber table (no such store
// exists yet); the welcome email is the visible confirmation. Wire this into
// a real mailing list once one is chosen.
const bodySchema = z.object({
  email: z.string().trim().email("A valid email is required").max(200),
});

export async function POST(req: NextRequest) {
  const ip = clientIpFromHeaders(req.headers);
  const limit = await rateLimit(`newsletter:${ip}`, 10, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(limit.retryAfterMs / 1000)) } },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Invalid submission" },
      { status: 400 },
    );
  }

  await sendEmailSafe("newsletterWelcome", parsed.data.email, {});

  return NextResponse.json({ ok: true });
}

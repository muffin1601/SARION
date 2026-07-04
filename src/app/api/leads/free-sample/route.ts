import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { sendEmailSafe } from "@/lib/email";
import { rateLimit, clientIpFromHeaders } from "@/lib/rate-limit";
import { siteConfig } from "@/config/site";
import { FREE_SAMPLE_PDF_PATH } from "@/lib/marketing/products";

// Free-sample requests are not persisted (no purchase/gating needed — the
// sample is a public lead magnet); we just email the download link and
// return it directly so the UI can offer an immediate download too.
const bodySchema = z.object({
  email: z.string().trim().email("A valid email is required").max(200),
});

export async function POST(req: NextRequest) {
  const ip = clientIpFromHeaders(req.headers);
  const limit = await rateLimit(`free-sample:${ip}`, 10, 60 * 60 * 1000);
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

  const downloadUrl = `${siteConfig.url}${FREE_SAMPLE_PDF_PATH}`;
  const productUrl = `${siteConfig.url}/products/claude-code-mastery`;

  await sendEmailSafe("freeSampleDelivery", parsed.data.email, {
    downloadUrl,
    productUrl,
  });

  return NextResponse.json({ ok: true, downloadUrl });
}

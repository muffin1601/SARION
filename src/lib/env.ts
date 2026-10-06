import { z } from "zod";

// ---------------------------------------------------------------------------
// Environment validation — runs at module load time (server startup).
//
// Rules:
//  • DATABASE_URL, BETTER_AUTH_SECRET, and NEXT_PUBLIC_APP_URL are required
//    in ALL environments.
//  • DIRECT_URL is required in production (Prisma migrate deploy).
//  • BETTER_AUTH_SECRET must NOT be the dev placeholder in production.
//  • Stripe and Resend keys are optional — the app degrades gracefully with
//    warning banners / console fallbacks rather than crashing.
// ---------------------------------------------------------------------------

const DEV_AUTH_SECRET = "dev-secret-change-me-0000000000000000000000";
const isProd = process.env.NODE_ENV === "production";

const schema = z.object({
  // ── Database ──────────────────────────────────────────────────────────────
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DIRECT_URL: isProd
    ? z.string().min(1, "DIRECT_URL is required in production (used by prisma migrate deploy)")
    : z.string().optional(),

  // ── App ───────────────────────────────────────────────────────────────────
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url(
      "NEXT_PUBLIC_APP_URL must be a valid URL (e.g. https://app.trysarion.com)",
    ),

  // ── Better Auth ───────────────────────────────────────────────────────────
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, "BETTER_AUTH_SECRET must be at least 32 characters — run: openssl rand -base64 32")
    .refine(
      (v) => !isProd || v !== DEV_AUTH_SECRET,
      "BETTER_AUTH_SECRET is the dev placeholder — generate a real secret for production: openssl rand -base64 32",
    ),
  BETTER_AUTH_URL: z.string().url().optional(),
  BETTER_AUTH_TRUSTED_ORIGINS: z.string().optional(),

  // ── Lemon Squeezy (optional — absent = graceful degradation in billing UI) ─
  LEMONSQUEEZY_API_KEY: z.string().optional(),
  LEMONSQUEEZY_STORE_ID: z.string().optional(),
  LEMONSQUEEZY_WEBHOOK_SECRET: z.string().optional(),

  // Variant IDs — monthly + yearly, one per paid tier. All optional so the app
  // degrades gracefully (billing UI shows a "not configured" banner).
  LEMON_STARTER_MONTHLY_VARIANT_ID: z.string().optional(),
  LEMON_STARTER_YEARLY_VARIANT_ID: z.string().optional(),
  LEMON_GROWTH_MONTHLY_VARIANT_ID: z.string().optional(),
  LEMON_GROWTH_YEARLY_VARIANT_ID: z.string().optional(),
  LEMON_AGENCY_MONTHLY_VARIANT_ID: z.string().optional(),
  LEMON_AGENCY_YEARLY_VARIANT_ID: z.string().optional(),

  // Founding offer toggle — "false" closes founding status to NEW signups
  // (existing founding members are unaffected). Public so the marketing site
  // can hide the badge accordingly.
  NEXT_PUBLIC_FOUNDING_OFFER_OPEN: z.string().optional(),

  // ── Email (optional — absent = ConsoleProvider fallback) ──────────────────
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),

  // ── Contact (optional — falls back to NEXT_PUBLIC_CONTACT_EMAIL) ───────────
  // Inbox that contact-form submissions are delivered to.
  CONTACT_EMAIL: z.string().email().optional(),
  NEXT_PUBLIC_CONTACT_EMAIL: z.string().optional(),

  // ── Monitoring (optional) ─────────────────────────────────────────────────
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_AHREFS_KEY: z.string().optional(),

  // ── PostHog product analytics (optional — absent = analytics disabled) ─────
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
  // Optional server-side override; falls back to the public key if unset.
  POSTHOG_KEY: z.string().optional(),
});

function formatErrors(errors: z.ZodError): string {
  return errors.errors
    .map((e) => `  • ${e.path.join(".") || "env"} — ${e.message}`)
    .join("\n");
}

const result = schema.safeParse(process.env);

if (!result.success) {
  const banner =
    "\n╔══════════════════════════════════════════════════════════╗\n" +
    "║        SARION — ENVIRONMENT VALIDATION FAILED            ║\n" +
    "╚══════════════════════════════════════════════════════════╝\n\n" +
    "The following environment variables are missing or invalid:\n\n" +
    formatErrors(result.error) +
    "\n\nCopy .env.example → .env and fill in the required values.\n";

  if (isProd) {
    // Hard fail in production — a misconfigured server must not start.
    throw new Error(banner);
  } else {
    // Soft warn in development — partial config is common during setup.
    console.warn(banner);
  }
}

// Export the validated env (or raw process.env on dev validation failure so
// the app continues to start with partial config).
export const env = (result.success ? result.data : process.env) as z.infer<
  typeof schema
>;

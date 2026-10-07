# Environment variable configuration

Never copy `.env` into source control. Values below are names and destinations only.

| Variable | Marketing | SaaS | Notes |
|---|---:|---:|---|
| `NEXT_PUBLIC_SITE_URL` | yes | no | `https://trysarion.com` canonical marketing origin |
| `NEXT_PUBLIC_MARKETING_URL` | yes | yes | root marketing URL |
| `NEXT_PUBLIC_APP_URL` | yes | yes | `https://app.trysarion.com` |
| `DATABASE_URL` | scorecard only | yes | same existing DB; runtime pooled URL |
| `DIRECT_URL` | no runtime migration | migration tooling | direct/session DB URL; do not migrate from marketing |
| `BETTER_AUTH_SECRET` | no | yes | reuse current secret; rotating forces reauthentication |
| `BETTER_AUTH_URL` | no | yes | exact app origin |
| `BETTER_AUTH_TRUSTED_ORIGINS` | no | optional | exact comma-separated non-production origins, never wildcard production origins |
| `LEMONSQUEEZY_*`, `LEMON_*_VARIANT_ID` | no | yes | billing and verified webhook only |
| `RESEND_API_KEY`, `EMAIL_FROM` | contact/scorecard | yes | retain verified sender |
| `CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_EMAIL` | yes | optional | marketing contact flow |
| `NEXT_PUBLIC_MASTERY_KIT_CHECKOUT_URL` | yes | no | public product checkout |
| `NEXT_PUBLIC_FOUNDING_OFFER_OPEN` | yes | yes | shared launch state |
| PostHog/Plausible/GA/Ahrefs | yes | app PostHog only | configure property-specific domains |
| Sentry variables | optional | optional | separate projects recommended |

Templates: `apps/marketing/.env.example`, `apps/app/.env.example`, and the updated root `.env.example`.

Security rules:

- Do not prefix secrets with `NEXT_PUBLIC_`.
- Do not generate a new Better Auth secret during this migration.
- Keep app cookies host-only; do not enable Better Auth `crossSubDomainCookies`.
- Only the SaaS deployment needs billing, auth, and cron secrets.


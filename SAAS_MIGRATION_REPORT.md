# SaaS migration report

Status: locally implemented and locally tested; not deployed.

## Implemented

- Added independent `apps/marketing` and `apps/app` Next.js workspaces with their own configs, root layouts, build commands, and generated public assets.
- Kept canonical shared code in `src` to avoid duplicating domain logic and database behavior.
- Marketing includes public SEO routes, lead/contact APIs, sitemap, robots, RSS, scorecard, and 131 sitemap records. It has no auth route, private app route, portal, proposal, or product API route.
- SaaS includes auth, private application routes, token portals/proposals, billing, auth, cron, and application APIs. It has no sitemap and sends noindex headers globally.
- Changed marketing Login/Start Free and all migrated marketing signup CTAs to absolute app URLs.
- Added safe 307 compatibility redirects for known root-domain application and token URLs, preserving path variables and query strings. APIs and POST/webhooks are intentionally not redirected.
- Set Better Auth's explicit app base URL/trusted-origin configuration and documented forced reauthentication across host-only cookies.
- Updated email/billing/invite/proposal/invoice URL fallbacks for the app host, while preserving marketing links and logo assets on the root host.
- Removed Better Auth/Jose from Edge middleware and retained full server authorization checks.
- Updated CI to npm/workspaces, independent typechecks/builds, and SEO regression testing.

## Intentionally preserved

- Prisma schema, migrations, database identifiers, customer data model, permissions, Better Auth secret, user/session rows, Lemon Squeezy IDs, and all application business logic.
- Existing SEO QA changes and the root single-app build remain intact as a rollback-capable legacy deployment source.
- No production environment, DNS, host configuration, webhook, email provider setting, or database was modified.

## Local result summary

| Check | Result |
|---|---|
| Marketing TypeScript | pass |
| SaaS TypeScript | pass |
| Marketing production build | pass; public route table only |
| SaaS production build | pass; app/auth/API/portal route table only |
| Better Auth/Jose Edge build warning | resolved in the SaaS workspace build |
| Source lint | pass |
| Browser automation | blocked by sandbox browser connection; not fabricated |
| Database mutations | not run |
| External callback/provider tests | production smoke test/manual only |


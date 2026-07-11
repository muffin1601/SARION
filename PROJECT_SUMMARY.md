# SARION — Project Summary (for AI agent onboarding)

Sarion is an **Agency CRM + Client Portal** product for small agencies. The repo contains
both the public marketing site and the authenticated SaaS application in one Next.js codebase.

## 1. Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript 5.6
- **Package manager**: pnpm
- **Database/ORM**: Prisma 6 + PostgreSQL (pooled connection via `DATABASE_URL`, direct via `DIRECT_URL` — Supabase/Neon-style setup)
- **Auth**: `better-auth` (email/password only, no OAuth), Prisma adapter, `nextCookies` plugin. Signup auto-provisions an Agency and makes the user its owner. Team invites are token-gated.
- **Payments**: Stripe, plus a Lemon Squeezy integration (`lib/lemonsqueezy.ts`, webhook idempotency table) and a Razorpay module (`lib/payments/razorpay/`) — multi-provider billing.
- **Email**: Resend, templated via `lib/email/` (design, layout, senders, templates per email type).
- **UI**: Radix primitives + `class-variance-authority` + Tailwind (shadcn/ui-style) for the app area; Framer Motion, `next-themes`, `sonner` toasts, Lucide icons.
- **Content**: MDX (`next-mdx-remote`, `gray-matter`, remark/rehype plugins) for blog/resources; `fuse.js` for on-site search.
- **Forms/validation**: `react-hook-form` + `zod`.
- **Observability**: Sentry (`@sentry/nextjs`, conditional on `SENTRY_AUTH_TOKEN`), PostHog analytics, plus GA/Plausible/Ahrefs/Clarity snippet components.
- **Testing**: none configured (no Jest/Vitest/Playwright). CI only runs lint + typecheck + build.
- **Deployment**: Docker/Coolify target (`next.config.ts` sets `output: "standalone"`), not Vercel-specific. Strict CSP + security headers configured in `next.config.ts`.

Scripts: `dev`, `build` (`prisma generate && next build`), `start`, `lint`, `typecheck`, `db:migrate`/`db:deploy`/`db:seed`/`db:studio`.

## 2. Two Design-Token Systems (important — don't mix them up)

- **Marketing site** (`src/app/(marketing)/`): tokens defined in `marketing.css` under `.marketingTheme`, all prefixed `--m-*` (`--m-bg`, `--m-primary`, `--m-radius` = 2px, `--m-space-*`, etc.). No Tailwind utility classes are used here — components use CSS Modules referencing these tokens.
- **Authenticated app** (`src/app/(app)/` + shared `ui/` components): tokens in `src/app/globals.css`, unprefixed shadcn/ui-style HSL variables (`--background`, `--primary`, `--radius`, etc.), styled with Tailwind (`tailwind.config.ts`, `components.json` = shadcn CLI config).

Both share the same underlying HSL values so the two halves of the product feel visually consistent, but they are separate systems — changes to one do not affect the other.

## 3. Folder Structure

- `src/app` — App Router root. Route groups: `(marketing)`, `(auth)`, `(app)`. Standalone routes: `checkout`, `checkout/success`, `checkout/cancel`, `portal/[token]` (token-gated client-facing portal, no login), `scorecard/report/[id]`, `api/*`. Also `globals.css`, `manifest.ts`, `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, `rss.xml`, root `error.tsx`/`not-found.tsx`.
- `src/components` — organized by domain: `marketing`, `blog`, `resources`, `solutions`, `compare`, `tools`, `search`, `trust`, `seo`, `analytics`; app-area: `clients`, `projects`, `invoices`, `portal`, `dashboard`, `billing`, `team`, `settings`, `feedback`, `checkout`; shared `ui/` (shadcn-style primitives) and `layout/`.
- `src/lib` — business logic (see §5 below).
- `src/content` — MDX/data content: `blog`, `authors`, `case-studies`, `changelog`, `compare`, `integrations`, `resources`, `roadmap`, `solutions`, `tools`, `search`, `categories.ts`.
- `src/server` — `actions`, `services`, `data`, `activity.ts` (activity logging).
- `src/config`, `src/types`, `src/middleware.ts` (route protection).
- `prisma/` — `schema.prisma`, `migrations/`, `seed.ts`.
- `docs/` — `ICP.md`, `Customer-Personas.md`, `Competitor-Analysis.md`, `MVP-Recommendation.md`, `MVP-PRD.md`, `POST-LAUNCH.md`, `architecture.md`, `database.md`, `USER-ROLES.md`.
- Root: `Dockerfile`, `docker-compose.yml`, `PRODUCTION-READINESS-REPORT.md`, `scripts/`.

## 4. Marketing Routes (`src/app/(marketing)/`)

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/about` | About page (team, founder note) |
| `/pricing` | CRM pricing plans |
| `/features` | Feature breakdown |
| `/products`, `/products/claude-code-mastery` | Digital product catalog + flagship product's dedicated sales page |
| `/solutions`, `/solutions/[industry]` | Solutions hub + per-industry landing pages |
| `/compare`, `/compare/[competitor]` | Comparison hub + per-competitor pages (ClickUp, Notion, HubSpot, etc.) |
| `/customers` | Customer showcase |
| `/case-studies` | Case studies |
| `/blog`, `/blog/[slug]`, `/blog/category/[category]`, `/blog/author/[author]`, `/blog/tag/[tag]` | Full blog system |
| `/resources`, `/resources/[category]`, `/resources/[category]/[slug]` | Resource library |
| `/tools`, `/tools/[tool]` | Free calculators (hourly rate, agency profit, CLV, etc. — see `lib/tools/calculators`) |
| `/scorecard`, `/scorecard/assessment`, `/scorecard/results/[id]` | Lead-gen "Agency Operations Scorecard" assessment funnel |
| `/changelog`, `/roadmap` | Product changelog / public roadmap |
| `/integrations` | Integrations listing |
| `/enterprise` | Enterprise sales page |
| `/security`, `/trust` | Security / trust center |
| `/contact` | Contact form |
| `/search` | Marketing-site search |
| `/free` | Free sample / lead magnet landing page |
| `/affiliate`, `/partners`, `/startup-program` | Growth/partner programs |
| `/status` | Status page |
| `/why-sarion` | Positioning/differentiation page |
| `/portal-demo` | Interactive demo of the client portal |
| `/privacy`, `/terms` | Legal |

Shared conventions: `SectionHeader` (eyebrow/title/description, `align` prop), `BreadcrumbNav` (`center` prop to align under centered heroes), `RelatedPages` (internal-linking block, pill-style "Related pages" heading), `CTASection`, `FaqGrid`.

## 5. Authenticated App (`src/app/(app)/`)

The actual CRM product, separate from marketing:

- `/dashboard` — main dashboard
- `/clients`, `/clients/new`, `/clients/[id]`, `/clients/[id]/edit` — client CRUD
- `/projects`, `/projects/new`, `/projects/[id]`, `/projects/[id]/edit` — project CRUD
- `/invoices`, `/invoices/new`, `/invoices/[invoiceId]`, `/invoices/[invoiceId]/edit` — invoicing
- `/team` — team management
- `/settings`, `/settings/billing`, `/settings/feedback` — account/billing/feedback
- `/onboarding` — placeholder, not yet built

`(auth)` route group: `login`, `signup`, `forgot-password`, `reset-password`, `verify-email`.

## 6. Key `src/lib` Modules

- `lib/marketing/` — `products.ts`, `team.ts`, `faq.ts`, `features.ts`, `pricing.ts`, `navigation.ts`, `demo-video.ts`: structured content driving marketing pages.
- `lib/tools/` — `calculators/*`, `format.ts`, `types.ts`: powers `/tools/[tool]`.
- `lib/seo/schema.ts` — JSON-LD/schema.org generators (breadcrumb, product, FAQ, item-list schemas).
- `lib/email/` — templating/sending abstraction over Resend.
- `lib/analytics.ts` / `lib/analytics-events.ts` — typed analytics event names + client wrapper (PostHog).
- `lib/blog/` — MDX post loading, parsing, search indexing.
- `lib/payments/razorpay/`, `lib/lemonsqueezy.ts`, `lib/billing.ts` — payment provider integrations.
- `lib/auth.ts` / `lib/auth-client.ts` — Better Auth config.
- `lib/db.ts` — Prisma client singleton.
- `lib/env.ts` — env var validation.
- `lib/invoice-status.ts` / `lib/project-status.ts` / `lib/activity-style.ts` — status/formatting helpers.
- `lib/rate-limit.ts`, `lib/session.ts`, `lib/checkout-schema.ts`, `lib/nav-items.ts`, `lib/utils.ts`.

## 7. Prisma Schema Highlights

Models: `Role` (owner/member), `ProjectStatus`, `InvoiceStatus`, `PlanTier` (free/starter/growth/agency), `BillingInterval`, `FeedbackType`/`FeedbackStatus`, `LemonWebhookEvent` (webhook idempotency ledger). Multi-tenant via Agency → Users/Clients/Projects/Invoices.

## 8. Notes for Future Work

- No test suite exists — verify changes manually (dev server, or `/verify` skill) rather than relying on `pnpm test`.
- CI (`\.github/workflows/ci.yml`) gates on lint + typecheck + build only.
- When touching marketing pages, always use the `--m-*` tokens and existing shared components (`SectionHeader`, `BreadcrumbNav`, `RelatedPages`, `PricingCard`) rather than one-off styles, to stay consistent with the rest of the site.
- When touching the app/CRM area, use the shadcn/Tailwind token system in `globals.css`, not the marketing tokens.

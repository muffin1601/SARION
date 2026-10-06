# TrySarion final technical SEO QA

**Audit date:** 2026-10-06  
**Production origin:** `https://trysarion.com`  
**Verdict:** **PASS WITH MINOR ISSUES**

## Executive verdict

TrySarion is technically SEO-ready for production. The final production-mode build, complete 131-URL crawl, sitemap/inventory comparison, schema parser, internal-link graph, malformed-route checks, and 60-case responsive browser matrix all pass after the targeted fixes recorded below.

No important marketing route is protected, disallowed, redirected, duplicated, accidentally noindexed, or dependent on client-side rendering for its primary content. Private application, authentication, token, result, checkout, and API surfaces remain excluded from search.

The remaining items are non-blocking operational considerations: retain the production build-time origin, monitor third-party analytics impact with field data, migrate away from the deprecated `next lint` command before Next.js 16, and migrate Prisma's deprecated package configuration before Prisma 7.

## Build status — PASS

- `npm run build` passed in an explicit production-origin environment.
- Next.js compiled, type-checked, collected page data, and generated **182/182** static pages.
- `npm run typecheck` passed.
- `npm run lint` passed with no warnings or errors. Next.js emitted only its standard notice that `next lint` is deprecated for Next.js 16.
- `npm run seo:reports` passed and mapped all **886** keywords to **91** planned target URLs.
- `npm run seo:check` passed.
- `npm run seo:qa` passed.
- `npm run seo:viewport` passed **60/60** rendered page/viewport checks.
- No general-purpose test script is configured in `package.json`; all configured validation commands were run.
- Docker itself is not installed in the audit environment, so the image could not be executed here. Its previously broken lockfile selection and build-time origin handling were corrected and the same npm install/build commands were validated directly.

## Crawlability status — PASS

- All 131 intended indexable inventory URLs returned HTTP 200 in the production-mode crawl.
- Public marketing routes are outside the middleware matcher.
- Middleware protects only application and checkout paths: `/dashboard`, `/clients`, `/projects`, `/invoices`, `/team`, `/settings`, and `/checkout`.
- Unauthenticated requests to `/dashboard` and `/clients` returned 307 redirects to `/login` as intended.
- No `X-Robots-Tag` is used on public SEO pages.
- Production public pages emit index/follow metadata.
- Authentication, application, token portals, checkout, result/report, search, and assessment surfaces retain appropriate noindex and/or robots exclusions.

The local `.env` intentionally sets `NEXT_PUBLIC_APP_URL=http://localhost:3000`; this causes local production builds to emit `noindex,nofollow`. That safeguard is correct. The Docker build now explicitly sets `NEXT_PUBLIC_APP_URL=https://trysarion.com`, and `.env` files are excluded from the Docker context, preventing a local origin from being baked into a deployment.

## Indexability status — PASS

Production-mode crawl results:

| Check | Result |
|---|---:|
| Inventory URLs crawled | 131 |
| Expected HTTP 200 | 131 |
| Accidental noindex | 0 |
| Redirected inventory URLs | 0 |
| Missing canonicals | 0 |
| Multiple canonicals | 0 |
| Zero/multiple H1 | 0 |
| Duplicate titles | 0 |
| Duplicate descriptions | 0 |
| Duplicate canonical owners | 0 |

## Canonical status — PASS

- All 131 indexable pages have exactly one self-referencing canonical.
- All canonical URLs use `https://trysarion.com`.
- No localhost, `127.0.0.1`, staging, HTTP, query-string, redirecting, or 404 canonical was found.
- Canonical ownership is unique across all inventory pages.
- `/agency-management-software` and `/all-in-one-agency-software` permanently redirect to the homepage owner rather than creating duplicate canonical pages.

## URL normalization — PASS

Live production checks on 2026-10-06:

- `http://trysarion.com/` → 308 → `https://trysarion.com/`.
- `https://www.trysarion.com/` → 301 → `https://trysarion.com/`.
- `/agency-crm/` → 308 → `/agency-crm`.
- `/agency-management-software` → 308 → `/`.
- `/all-in-one-agency-software` → 308 → `/`.
- `/AGENCY-CRM` returns 404; it does not create an uppercase duplicate.
- No tested redirect loop was found. HTTPS canonical requests resolve in one hop.

## Sitemap status — PASS

| Metric | Result |
|---|---:|
| Sitemap URLs | 131 |
| Indexable inventory URLs | 131 |
| Missing from sitemap | 0 |
| Unexpected in sitemap | 0 |
| Duplicate sitemap URLs | 0 |

Every sitemap URL returned 200, was indexable, and self-canonical. The sitemap excludes application, authentication, API, checkout, token, preview/result, search, assessment, redirect alias, query-string, and nonexistent URLs.

The inventory generator previously wrote nine multiword tag URLs with spaces. It now applies the same slug normalization used by the application, and `SEO_PAGE_INVENTORY.csv` exactly matches the sitemap.

## Robots status — PASS

`robots.txt`:

- Allows `/` and therefore public CSS, JavaScript, images, Next.js assets, and marketing content.
- Does not block `/_next/`, `/public`, or asset extensions.
- Disallows private application, authentication, checkout, token portal, private share, result/report, and API prefixes.
- Declares `Host: https://trysarion.com`.
- Declares `Sitemap: https://trysarion.com/sitemap.xml`.
- No inventory URL matches a disallowed prefix.

## Metadata status — PASS

Across all 131 inventory URLs:

- 131 unique, non-empty titles.
- 131 unique, non-empty descriptions.
- 131 unique, self-referencing canonicals.
- Exactly one H1 per page.
- No accidental public noindex.
- No material generic-title collision was found.

Metadata was not rewritten for stylistic preference.

## Structured-data status — PASS

- Parsed **589 JSON-LD entities/blocks** across the inventory without invalid JSON.
- Observed appropriate types: Organization, WebSite, SoftwareApplication, WebPage, BreadcrumbList, BlogPosting, Article, FAQPage, ItemList, HowTo, WebApplication, Product, and Person.
- No Review or AggregateRating schema exists.
- No schema contains localhost or staging URLs.
- Breadcrumb positions are sequential.
- FAQ questions and answers are present in visible server-rendered page content.
- The SoftwareApplication AggregateOffer now accurately summarizes its nested offers: four offers, `lowPrice: 0`, and the correct paid-plan high price. The Free offer links to `/pricing`.
- No unsupported competitor prices, ratings, or review claims were added.

## Internal-link status — PASS

- **136** distinct internal targets were checked; none were broken or redirected.
- No inventory page is orphaned.
- No inventory page is more than four clicks deep in the rendered graph.
- `/`, `/agency-crm`, `/client-portal`, `/project-management-for-agencies`, `/agency-invoicing`, `/client-management-software`, and `/agency-operations` are all one click from `/` through sitewide navigation/footer links.
- Blog tag archives were the only genuine orphan class found. Blog post headers now link their visible tags to canonical tag archives, making those archives reachable through normal navigation.
- No internal link points to the two redirected agency-management aliases.

## JavaScript rendering status — PASS

The production response HTML contains each page's:

- H1 and introductory copy.
- Main section headings and product explanations.
- FAQ questions and answers.
- Contextual and sitewide internal links.
- Metadata and JSON-LD.

The six commercial hubs are server components and require no client-side hydration to expose their critical SEO content.

## Performance and Core Web Vitals risk — PASS WITH MONITORING

- New commercial hubs have approximately **106 kB** first-load JavaScript and are server-rendered.
- Shared first-load JavaScript is approximately **102 kB**; the homepage is approximately **202 kB** because of its richer interactive/marketing surface.
- Fonts use `next/font` with `display: swap` and are self-hosted by Next.js.
- Important images use Next Image with explicit width/height and responsive `sizes`, reducing CLS risk.
- Comparison tables use contained horizontal scrolling rather than page-level overflow.
- Analytics scripts use `afterInteractive` and do not block first paint. PostHog remains a global client provider and should be monitored with real-user INP/LCP data, but no release-blocking regression was found.
- No new third-party script, client component, or heavy image was introduced by the fixes in this audit.
- Docker standalone packaging copies both `public` and `.next/static`, so production assets are present. A bare `.next/standalone/server.js` without those deployment copy steps is not a valid simulation of the final image.

## Mobile status — PASS

Headless Chrome rendered ten representative routes at widths **320, 375, 390, 768, 1024, and 1440 px**—60 combinations total.

Routes included the homepage, every commercial hub, pricing, a comparison page, and a blog article. Checks found:

- No page-level horizontal overflow.
- One visible, in-bounds H1 on every page.
- Primary content present at every width.
- Mobile navigation control visible through the mobile/tablet breakpoint.
- Comparison tables contained within their scrolling wrapper.
- Cards, FAQs, breadcrumbs, CTA sections, long headings, pricing, and footer content remained within the viewport.

## Edge Runtime warning assessment — NON-BLOCKING

The earlier warning traced to:

`src/middleware.ts` → `better-auth/cookies` → `better-auth@1.6.15` → `jose@6.2.3` → `jose/dist/webapi/lib/deflate.js` (`CompressionStream` / `DecompressionStream`).

Assessment:

- It belongs to the middleware bundle, not public marketing page rendering.
- The middleware matcher covers private application and checkout paths only.
- Next.js configuration redirects do not depend on this middleware.
- The invoked `getSessionCookie` path only checks for the Better Auth session cookie; it does not invoke JWE compression/decompression.
- Clean final builds completed without reproducing the advisory.
- Runtime checks confirmed protected routes redirect correctly and public routes are unaffected.
- No risky authentication rewrite is justified.

## 404 and soft-404 status — PASS

The following returned real HTTP 404 responses:

- Random root-level route.
- Unknown comparison slug.
- Unknown solution slug.
- Unknown blog slug.
- Uppercase duplicate `/AGENCY-CRM`.

No malformed dynamic SEO route returned a generic 200 page.

## Security versus SEO — PASS

- Dashboard, customer records, projects, invoices, team, settings, and checkout remain authenticated.
- Authentication pages remain noindex and disallowed.
- Token portals, private share links, scorecard results/reports, and API routes remain excluded.
- No private product route was added to the sitemap or inventory.
- The new `.dockerignore` prevents local `.env` files and other build artifacts from entering the Docker build context.

## Issues fixed during final QA

1. Corrected multiword blog tag URLs in the generated page inventory.
2. Added contextual tag links to blog post headers, eliminating 14 orphan tag archives.
3. Corrected SoftwareApplication AggregateOffer `lowPrice`, `offerCount`, and Free offer URL.
4. Added a full production crawl/schema/internal-link/404 QA command.
5. Added automated six-width browser QA.
6. Added `.dockerignore` to exclude local environment files, build output, dependencies, and debug logs.
7. Set the Docker build-time public origin to `https://trysarion.com`, preventing accidental production noindex.
8. Updated the Docker dependency/build stages to use the repository's actual `package-lock.json` and npm rather than a nonexistent pnpm lockfile.

## Remaining non-blocking issues

- Docker is unavailable in this audit environment, so the final Docker image was not built end-to-end. The Dockerfile now uses the validated npm commands and correct lockfile.
- Replace `next lint` with the ESLint CLI before upgrading to Next.js 16.
- Move Prisma package configuration to `prisma.config.ts` before upgrading to Prisma 7.
- Monitor real-user LCP, CLS, and INP after deployment; static and headless QA cannot replace Chrome UX Report or Search Console field data.
- Keep the production `NEXT_PUBLIC_APP_URL` unchanged. Any intentional non-production build will correctly remain noindex.

## Exact files changed

- `.dockerignore` — added safe Docker context exclusions.
- `Dockerfile` — npm lockfile/build correction and production public-origin build arg.
- `package.json` — added `seo:qa` and `seo:viewport` commands.
- `scripts/final-seo-qa.mjs` — complete production crawl, metadata, schema, sitemap, link, graph, redirect, and 404 checks.
- `scripts/viewport-qa.mjs` — rendered six-width browser QA.
- `scripts/generate-seo-reports.mjs` — corrected tag slug generation.
- `SEO_PAGE_INVENTORY.csv` — regenerated canonical tag archive URLs.
- `src/components/blog/post-header.tsx` — added contextual tag archive links.
- `src/components/blog/post-header.module.css` — responsive tag-link layout.
- `src/lib/seo/schema.ts` — corrected SoftwareApplication AggregateOffer summary.
- `FINAL_TECHNICAL_SEO_QA.md` — this report.

## Final answer

**Is TrySarion technically SEO-ready for production? YES.**


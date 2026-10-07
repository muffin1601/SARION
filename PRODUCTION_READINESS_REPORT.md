# Production readiness report

Date: 2026-10-07

## Local verification complete

- Marketing and SaaS workspaces build independently with Next.js 15.5.24.
- Source lint and both workspace TypeScript checks pass.
- Marketing SEO regression passes: 886 mapped keywords and 6 commercial hubs.
- Final marketing crawl passes: 131 inventory/sitemap URLs, unique titles,
  descriptions and canonicals, 589 JSON-LD blocks, and no sitemap, orphan,
  deep-link, schema, or 404-routing errors.
- The marketing service has only public/marketing routes; legacy application
  browser routes issue host-preserving 307 redirects to the app domain. Auth
  and billing POST endpoints are intentionally not redirected.
- The SaaS service has noindex headers and a disallow-all robots policy.
- Production container definitions are provided in `Dockerfile.marketing` and
  `Dockerfile.app`. They keep runtime secrets out of Docker build arguments.
- Known critical Next.js and Better Auth advisories were remediated by updating
  to Next.js 15.5.24 and Better Auth 1.6.22. CI now fails on new critical
  production dependency advisories.

## Release constraints

- No deployment, DNS record, external callback, provider setting, or production
  database operation was performed from this repository.
- Docker is unavailable in the local execution environment, so image builds
  require one verification run in the selected hosting/CI environment.
- `npm audit --omit=dev` reports 0 critical, 12 high, and 9 moderate advisories.
  The remaining findings are transitive dependencies in the current Next.js 15,
  Tailwind 3, Prisma 6, and content-processing stacks; npm requires breaking
  upgrades (notably Next 16 and Tailwind 4) for some. Do not use `npm audit fix
  --force` as a cutover step. Track and schedule those framework upgrades.

## Required manual production actions

Follow `SAAS_DEPLOYMENT_CHECKLIST.md` and `SAAS_SUBDOMAIN_SETUP.md`: configure
runtime secrets, deploy the two services, add the hosting-provider supplied
`app` CNAME, verify TLS, then update the Lemon Squeezy webhook and run the
controlled production smoke test with an internal account.

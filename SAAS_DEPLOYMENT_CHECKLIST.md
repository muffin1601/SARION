# SaaS deployment and cutover checklist

## Local work completed

- [x] Workspace routes generated and independently built.
- [x] Typechecks and source lint pass.
- [x] Marketing SEO regression checks run locally.
- [x] Route map, environment templates, rollback, and functional-results documents generated.
- [x] No DNS, deployment, production database, or provider configuration changed.

## Manual production cutover (approval required)

1. Retain the previous deployment and its rollback instructions.
2. Create two production services from `Dockerfile.marketing` and `Dockerfile.app`, or two equivalent monorepo hosting projects.
3. Enter the production values from `SAAS_ENVIRONMENT_VARIABLES.md` into the SaaS service secret manager; set the public marketing/app URLs on both services.
4. Add `app.trysarion.com` to the SaaS hosting project and add the exact provider-supplied GoDaddy `app` CNAME manually.
5. Verify DNS and valid TLS for both hosts.
6. Run a controlled production smoke test using a new internal account and non-customer records: signup, login/logout, reset/verification, invitation, tenant authorization, portal/proposal access, and billing return URLs.
7. Change Lemon Squeezy webhook/callback configuration to the verified app endpoint and confirm one safe delivery with signature/idempotency checks.
8. Deploy marketing root domain with the safe legacy 307 redirects; re-test legacy bookmarks, portal/proposal links, billing callbacks, sitemap, robots, canonicals, and JSON-LD.
9. Monitor errors, failed logins, webhook failures, and redirects; retain the old deployment for rollback.


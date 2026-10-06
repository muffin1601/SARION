# SaaS deployment and cutover checklist

## Local work completed

- [x] Workspace routes generated and independently built.
- [x] Typechecks and source lint pass.
- [x] Marketing SEO regression checks run locally.
- [x] Route map, environment templates, rollback, and functional-results documents generated.
- [x] No DNS, deployment, production database, or provider configuration changed.

## Manual staging sequence

1. Deploy marketing and SaaS previews using their separate workspace roots.
2. Set staging URLs in each project's environment variables.
3. Connect both previews to isolated/staging data; do not use production customer data for mutation tests.
4. Test login, existing-user login, logout, signup, password reset, verification, expired session, protected redirect, multi-tab refresh, invitation acceptance, tenant isolation, and direct URLs.
5. Test client creation/edit/deletion permissions, projects, tasks, invoices, team roles/invites, downloads, portal token access, proposal token access, billing portal/checkout, reports, and workspace switching with disposable test records.
6. Verify the Lemon Squeezy webhook signature and idempotency on the SaaS preview endpoint.
7. Run the marketing sitemap/robots/canonical/JSON-LD regression against the marketing preview.

## Manual production cutover (approval required)

1. Confirm staging evidence and retain the previous deployment.
2. Add `app.trysarion.com` to the SaaS hosting project.
3. Add the provider-supplied GoDaddy `app` CNAME manually.
4. Verify DNS and valid TLS.
5. Confirm app-host Better Auth, cookies, email verification, reset links, and invitations.
6. Change Lemon Squeezy webhook/callback configuration to the verified app endpoint and confirm one safe delivery.
7. Deploy marketing root domain with the safe legacy 307 redirects.
8. Re-test legacy bookmarks, portal/proposal links, billing callbacks, and marketing SEO.
9. Monitor errors, failed logins, webhook failures, and redirects; retain the old deployment for rollback.


# SaaS migration rollback plan

Baseline Git commit: `9a813faf4e667dc2eb67b63aef65950d9f7ed689`.

No destructive database migration is part of this hostname split. Rollback preserves customer rows, IDs, sessions, billing identifiers, and files/URLs.

## Before cutover

- Retain the previous combined deployment and its environment configuration.
- Export/record existing DNS records and hosted project deployment IDs outside the repository.
- Keep the existing Better Auth secret unchanged.
- Record current Lemon Squeezy webhook and redirect configuration and Resend/other provider callback URLs.

## Roll back a failed cutover

1. Stop traffic to the new app deployment through the hosting provider; do not delete it.
2. Restore the previous root-domain combined deployment.
3. Restore the prior `app` CNAME only if it was changed, after confirming the authoritative DNS zone record.
4. Restore Lemon Squeezy webhook/callback URLs to the previous verified endpoint. Do not use HTTP redirect as a webhook rollback mechanism.
5. Restore verified email/callback URL configuration if it was changed.
6. Retain the same database and Better Auth secret. Do not run a down migration and do not purge sessions.
7. Verify login, a client portal token URL, a proposal share URL, and billing webhook delivery.

## Session note

The hostname move requires app-host sign-in because cookies are host-only. A rollback to the previous host may likewise require affected users to sign in once there; no account data is lost.


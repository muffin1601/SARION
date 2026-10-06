# SaaS subdomain setup

## Deploy two projects

| Project | Root directory | Build command | Production domain |
|---|---|---|---|
| Marketing | `apps/marketing` | `npm run build` | `trysarion.com` |
| SaaS | `apps/app` | `npm run build` | `app.trysarion.com` |

Both projects must be deployed from the repository root so the workspace can access the canonical `src`, `prisma`, `public`, and scripts directories. If the hosting provider runs builds from the configured root directory, set its install/build working directory to the monorepo root or configure an equivalent monorepo setting.

## Vercel (if used)

Create two projects connected to the same repository. Set each project root as above, retain the package-lock/npm installation method, and give the SaaS project the cron configuration in `apps/app/vercel.json`. Do not attach the root domain to the marketing project or `app` subdomain to the SaaS project until both preview deployments pass the checklist.

## GoDaddy DNS (manual approval required)

1. Record the current GoDaddy DNS zone before changes.
2. Add exactly one record only after the SaaS hosting project displays its verified domain target:
   - Type: `CNAME`
   - Host: `app`
   - Value: the exact target supplied by the hosting provider
3. Do not change root A/AAAA, `www`, MX, SPF, DKIM, DMARC, email subdomains, or unrelated verification records.
4. Wait for DNS resolution, then validate HTTPS before enabling external callbacks.

No DNS target can be supplied safely from this repository because no hosting provider domain target was found.

## Better Auth setup

Set `BETTER_AUTH_URL=https://app.trysarion.com`, retain the existing `BETTER_AUTH_SECRET`, and leave cross-subdomain cookies disabled. The configuration sets the app as the explicit base URL and trusts only the app plus any explicitly configured staging origins. Cookies remain `Secure`, `HttpOnly`, `SameSite=Lax`, and host-only by default.

The app uses cookie-name presence only in Edge middleware to avoid the installed Better Auth/Jose Edge compatibility warning. This is an optimization only; protected layouts/actions still validate the signed database session and agency authorization server-side.

## External URLs to change after staging passes

- Lemon Squeezy webhook: `https://app.trysarion.com/api/billing/webhook`
- Lemon Squeezy customer/checkout success redirects are generated from `NEXT_PUBLIC_APP_URL`.
- Resend auth email links originate from Better Auth's app base URL.
- Team invitations, invoices, portal URLs, proposals, and billing email links now use the app URL; public email logos and marketing links remain on the marketing host.


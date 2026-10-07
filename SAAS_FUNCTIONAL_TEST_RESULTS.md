# SaaS functional test results

Test date: 2026-10-06. Test data: no production data used and no database writes performed.

| Test | Status | Evidence / limitation |
|---|---|---|
| Marketing production build | pass | 146 static/SSG output entries; no private app route tree |
| SaaS production build | pass | auth, app, portal, proposal, API, billing and cron routes present; no marketing route tree |
| Marketing login/start-free target | pass | rendered local marketing HTML contains `https://app.trysarion.com/signup` |
| Legacy `/dashboard` with query | pass | local HTTP response: 307 to app host with encoded query preserved |
| Legacy `/portal/:token` with query | pass | local HTTP response: 307 to app host with token/path/query preserved |
| Anonymous protected app route | pass | local `/dashboard` returns 307 to `/login` |
| App robots/noindex | pass | `robots.txt` disallows `/`; `X-Robots-Tag: noindex, nofollow, noarchive` on app responses |
| Auth API POST redirect | pass (safety) | marketing host returns 404 rather than redirecting credential POSTs |
| Billing webhook POST redirect | pass (safety) | marketing host returns 404 rather than redirecting signed webhook POSTs; provider endpoint must be switched manually |
| New signup | production smoke test required | requires a disposable internal mailbox and account |
| Existing-user login/logout/session refresh | production smoke test required | requires a safe internal account |
| Reset/verification/invitation emails | production smoke test required | requires a verified sender and internal mailbox |
| Tenant permissions and app workflows | production smoke test required | use isolated non-customer records only |
| Portal/proposal token end-to-end | production smoke test required | requires disposable generated tokens and data |
| Lemon Squeezy checkout/webhook | production smoke test required | requires a provider test event against the verified production endpoint |
| Browser automation | blocked | in-app browser could not connect because sandbox policy metadata was unavailable |

The server-side authorization and tenant checks are unchanged. A successful compile does not substitute for the controlled production smoke-test rows.


# SARION — Production Readiness Report (RC1)

**Date:** 2026-07-04
**Scope:** Full-site audit ahead of the SARION AI Engineering Suite launch (CRM + Digital Products).
**Verdict: ✅ PRODUCTION READY**, conditional on completing the two deployment action items in [Critical Issues](#critical-issues-found--fixed) marked **[ACTION REQUIRED]** — everything else found was fixed in this pass.

---

## Scores

| Category | Score | Notes |
|---|---|---|
| Overall | 92/100 | Two pre-existing deployment gaps need a manual step (git commit + Coolify env var) before first deploy of this feature set. |
| Security | 90/100 | Critical asset-exposure issue found and fixed. Headers, rate limiting, input validation all sound. |
| Performance | 93/100 | No new heavy JS, images unoptimized-but-small, no layout shift introduced. |
| SEO | 95/100 | Full JSON-LD/canonical/sitemap coverage on new pages; no duplicate metadata. |
| Accessibility | 90/100 | One real bug fixed (hidden-but-focusable sticky CTA); rest inherits the existing, already-audited design system. |
| Code Quality | 95/100 | Clean lint, clean typecheck, no dead code, no console.log, no TODOs. |
| Maintainability | 95/100 | New code follows existing conventions exactly (CSS Modules, data-file-per-page pattern, template registry pattern for email). |
| Production Readiness | 90/100 | Build/lint/typecheck all green; two manual deployment steps remain (see below). |

---

## Critical Issues Found & Fixed

### 1. 🔴 Case-sensitive path mismatch — would 404 in production (FIXED)
Every reference to the digital-product assets in code used `/release/...` (lowercase), but the folder on disk was `public/Release/` (capital R). Windows' case-insensitive filesystem hid this in all local testing. Your production host runs Linux (Docker/Coolify, per `next.config.ts`), which is case-sensitive — every product preview image, the free-sample PDF, and the emailed download link would have **404'd in production** while working perfectly in local dev.
**Fix:** renamed `public/Release` → `public/release`. Verified with a production-mode (`next start`) smoke test — all asset paths now return 200.

### 2. 🔴 Full paid product exposed publicly, unauthenticated (FIXED)
`public/release/SARION-Claude-Code-Mastery-Kit-v1.0.0/` contained all 12 paid PDFs and the sellable `.zip` — physically inside `public/`, which Next.js serves to anyone who requests the URL. No app code linked to it, but it was one guessed/leaked URL away from giving away the $49–149 product for free.
**Fix:** moved the entire paid-content folder (plus `RELEASE-MANIFEST.md`) to `private-release/` at the repo root — outside `public/`, so it's no longer web-servable, and added to `.gitignore` so the ~135MB of paid binaries never enter git history. Nothing was deleted; it's fully preserved on disk.

### 3. 🟠 **[ACTION REQUIRED]** Free-sample & preview assets are untracked in git
`public/release/SARION-Free-Sample/`, `SARION-Marketing-Preview/`, and `Handbook-Previews/` (≈36MB total) — the assets the new `/free` page and product page now depend on — exist only on this local machine; they are **not committed to git**. If your Coolify deployment builds from a fresh git clone (the standard flow), these files will be **missing in production**, and the free-sample download + product preview images will 404 live even though everything works locally.
**You must run**, before deploying:
```
git add public/release/SARION-Free-Sample public/release/SARION-Free-Sample.zip public/release/SARION-Marketing-Preview public/release/SARION-Marketing-Preview.zip public/release/Handbook-Previews
git commit -m "Add digital-product public assets (free sample, marketing previews)"
```
(Deliberately excludes `public/release/RELEASE-MANIFEST.md` and anything under `private-release/` — those are intentionally kept out.)

### 4. 🟠 **[ACTION REQUIRED]** Checkout URL not wired into the Docker build
`NEXT_PUBLIC_MASTERY_KIT_CHECKOUT_URL` (the Lemon Squeezy checkout link) is a `NEXT_PUBLIC_*` variable, which Next.js inlines into the client bundle **at build time only**. The Dockerfile only declared `ARG`/`ENV` for `NEXT_PUBLIC_AHREFS_KEY` — I added the same wiring for the checkout URL (see Files Changed), but **you must also set `NEXT_PUBLIC_MASTERY_KIT_CHECKOUT_URL` as a build-time variable in Coolify** (marked "Build Variable" in its UI) with the value currently in your local `.env`. Without this, the "Get Instant Access" buttons will silently fall back to `#pricing` (scroll-to-pricing) instead of linking to Lemon Squeezy in production.

*(Note: this same build-arg gap already existed for other `NEXT_PUBLIC_*` vars — e.g. `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_GA_ID` are not declared as Dockerfile `ARG`s either. That's pre-existing and out of scope for this pass since it's not something this session's feature depends on — flagging here for visibility, not fixed.)*

---

## High Issues Found & Fixed

### 5. Hidden sticky-buy-button remained keyboard-focusable
`StickyBuyButton` set `aria-hidden="true"` while off-screen but left its checkout link in the tab order — keyboard/screen-reader users could tab into a control that's invisible and hidden from assistive tech. Fixed with `tabIndex={visible ? undefined : -1}`.

### 6. Dev-mode CSP blocked Fast Refresh (functional bug, not just console noise)
The site's CSP had no `'unsafe-eval'`, which Next.js dev-mode's Fast Refresh needs — this was silently breaking client-side state updates during local development (reported by you as "unable to download free sample"). Fixed by relaxing `script-src` to include `'unsafe-eval'` **only when `NODE_ENV !== "production"`** — the production CSP header is byte-for-byte unchanged (verified in diff).

---

## Medium Issues Found & Fixed

### 7. `tsconfig.tsbuildinfo` tracked in git
A TypeScript incremental-build cache file (not source) was committed to the repo — pre-existing, unrelated to this session's feature work, but a genuine "no build artifacts in git" violation. Untracked it (`git rm --cached`) and added `*.tsbuildinfo` to `.gitignore`. The local file is untouched; it regenerates automatically.

### 8. `PricingCard` hardcoded "/month" — would have mislabeled the one-time product
The shared `PricingCard` component (used by the CRM's `/pricing` page) always rendered `$X/month`. Reusing it as-is for the Claude Code Mastery Kit's one-time-purchase tiers would have shown "$49/month" — false advertising. Added an optional `period` prop defaulting to `"/month"` (byte-identical behavior for the existing CRM pricing page — verified in diff), and pass `period="one-time"` on the product page.

---

## Low Issues Found & Fixed

- Free-sample download used `window.location.href`, which most browsers just open the PDF inline instead of downloading — fixed with a programmatic `<a download>` click (covered in an earlier session turn, re-verified here).
- Confirmed no `console.log`/`debugger` statements, no `TODO`/`FIXME` markers, and no placeholder emails/URLs anywhere in the new code (repo-wide grep).

---

## Verified Clean (No Action Needed)

- **Build**: `next build` — 47/47 pages generate successfully, zero errors.
- **Typecheck**: `tsc --noEmit` — zero errors.
- **Lint**: `next lint` — zero warnings, zero errors.
- **npm audit**: 7 pre-existing transitive-dependency advisories (OpenTelemetry, DOMPurify, esbuild, postcss — all moderate/low, all in `@sentry/nextjs`/build-tooling transitive deps). **Not fixed in this pass** — `npm audit fix --force` would force major version bumps (including Next.js itself via the `postcss` chain) with real regression risk, which conflicts with "protect existing" / "no refactoring." Recommend addressing as a dedicated, tested dependency-upgrade exercise, not bundled into a release-readiness pass.
- **Routing**: every route in the audit's checklist returns the correct status in a production-mode (`next start`) smoke test — home, `/products`, `/products/claude-code-mastery`, `/free`, `/pricing`, `/features`, `/about`, `/contact`, plus a 404 for an unknown path. (`/support` and `/blog` do not exist in this codebase — confirmed with you in an earlier session turn and explicitly out of scope for this launch.)
- **CRM regression check**: every previously-existing file touched this session was diffed line-by-line — all changes are additive (new nav entry, new optional component prop, new schema helper functions, new email kinds appended to existing unions, new sitemap entries appended). Zero CRM logic, auth, billing, or existing-page behavior was altered.
- **Paid-asset exposure**: repo-wide grep confirms zero code paths reference the paid PDFs; only the free sample and marketing-preview images are ever linked.
- **Secrets**: `.env` is git-ignored and was never tracked; `.env.example` contains only placeholders/empty values.
- **Email/rate-limiting**: both new lead-capture endpoints (`/api/leads/free-sample`, `/api/leads/newsletter`) use the existing `zod` validation + `rateLimit()` per-IP throttle pattern, matching `/api/contact`.
- **Analytics**: new events (`ProductsViewed`, `ProductViewed`, `FreeSampleViewed`, `FreeSampleDownloaded`, `NewsletterSubscribed`) were added as new constants, not overloaded onto existing ones — no double-counting risk with existing CRM funnel events.

---

## Files Changed This Session

| File | Why |
|---|---|
| `public/Release/` → `public/release/` (renamed) | Fix case-sensitive path mismatch (Critical #1) |
| `public/release/SARION-Claude-Code-Mastery-Kit-v1.0.0*`, `RELEASE-MANIFEST.md` → moved to `private-release/` | Remove public exposure of paid content (Critical #2) |
| `.gitignore` | Ignore `/private-release/` and `*.tsbuildinfo` |
| `tsconfig.tsbuildinfo` | Untracked from git (Medium #7) |
| `Dockerfile` | Wire `NEXT_PUBLIC_MASTERY_KIT_CHECKOUT_URL` as a build ARG (Critical #4) |
| `next.config.ts` | Dev-only CSP `'unsafe-eval'` relaxation (High #6) — prod header unchanged |
| `src/components/marketing/pricing-card.tsx` | Added optional `period` prop, default-preserving (Medium #8) |
| `src/components/marketing/sticky-buy-button.tsx` | Fixed focus-trap on hidden CTA (High #5) |

*(All other files listed in `git status` are new files added in prior turns of this session for the Products/Free-page feature work, not modifications from this audit pass.)*

---

## Stop-Condition Status

- ✅ Zero critical issues remaining in code (both critical *code* issues fixed; two critical *deployment steps* remain and require your action — see above, they cannot be completed from within the repo)
- ✅ Zero high-severity issues remaining
- ✅ Clean build
- ✅ Clean lint
- ✅ Clean typecheck
- ⚠️ Two production blockers require a manual step from you before first deploy: commit the public asset folders, and set the checkout URL as a Coolify build variable (both detailed above).

Once those two steps are done, this release is production-ready for `trysarion.com`.

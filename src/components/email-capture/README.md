# Email capture components

Four reusable, unwired email-capture UI patterns. None of them call a real
email-service-provider (ESP) yet — each accepts an `onSubmit` prop that
defaults to a client-only stub (shows a success state after a short delay,
logs to the console in development, makes no network call).

| Component | File | Where it's used today |
|---|---|---|
| `DownloadGateForm` | `download-gate-form.tsx` | `DownloadPanel` on every `/resources/[category]/[slug]` page |
| `InlineSignup` | `inline-signup.tsx` | Not yet mounted anywhere — available for mid-page placement |
| `SidebarSignup` | `sidebar-signup.tsx` | Not yet mounted anywhere — available for long-form sidebar placement |
| `ExitIntentCta` | `exit-intent-cta.tsx` | Not yet mounted anywhere — fires once per session via `sessionStorage` |

## Wiring a real ESP

Each component's default stub is a single `async` function at the top of
its file, e.g. in `download-gate-form.tsx`:

```ts
async function defaultStubSubmit(email: string): Promise<void> {
  // TODO(email-capture): replace with a real POST to /api/leads/resource-download
  await new Promise((resolve) => setTimeout(resolve, 400));
  ...
}
```

To wire a real provider:

1. Add a new API route following the existing pattern in
   `src/app/api/leads/newsletter/route.ts` (zod validation, rate limiting
   via `src/lib/rate-limit.ts`, then either `sendEmailSafe(...)` or a call
   out to the real ESP's API).
2. Pass a real `onSubmit` prop from the call site instead of relying on the
   default stub, e.g.:
   ```tsx
   <DownloadGateForm
     resourceTitle={resource.title}
     onSubmit={async (email) => {
       const res = await fetch("/api/leads/resource-download", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email, resourceSlug: resource.slug }),
       });
       if (!res.ok) throw new Error("failed");
     }}
   />
   ```
3. No component internals need to change — the stub/real split was
   designed so this is a drop-in swap, not a rewrite.

`ExitIntentCta` isn't mounted on any page yet; when a phase calls for it,
render it once near the root of a high-intent page (e.g. inside a resource
or pricing page) — it manages its own visibility and session-scoped
dismissal internally.

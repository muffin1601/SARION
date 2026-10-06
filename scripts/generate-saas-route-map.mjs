import { readFile, writeFile } from "node:fs/promises";

const inventory = await readFile("SEO_PAGE_INVENTORY.csv", "utf8");
const marketingPaths = inventory
  .split(/\r?\n/)
  .slice(1)
  .map((line) => /^"([^"]+)"/.exec(line)?.[1])
  .filter(Boolean);

const rows = [[
  "Old URL",
  "New URL",
  "Route Type",
  "Auth Required",
  "Redirect Required",
  "Redirect Status",
  "Query Preservation",
  "Verification Status",
]];

for (const pathname of marketingPaths) {
  rows.push([
    `https://trysarion.com${pathname}`,
    `https://trysarion.com${pathname}`,
    "Marketing / SEO",
    "No",
    "No",
    "",
    "N/A",
    "Locally built; sitemap regression checked",
  ]);
}

const appRoutes = [
  ["/login", "Authentication", "No"],
  ["/signup", "Authentication", "No"],
  ["/forgot-password", "Authentication", "No"],
  ["/reset-password", "Authentication", "No"],
  ["/verify-email", "Authentication", "No"],
  ["/dashboard/:path*", "Private application", "Yes"],
  ["/activity/:path*", "Private application", "Yes"],
  ["/automations/:path*", "Private application", "Yes"],
  ["/clients/:path*", "Private application", "Yes"],
  ["/finance/:path*", "Private application", "Yes"],
  ["/invoices/:path*", "Private application", "Yes"],
  ["/projects/:path*", "Private application", "Yes"],
  ["/proposals/:path*", "Private application", "Yes"],
  ["/recurring/:path*", "Private application", "Yes"],
  ["/reports/:path*", "Private application", "Yes"],
  ["/settings/:path*", "Private application", "Yes"],
  ["/team/:path*", "Private application", "Yes"],
  ["/time/:path*", "Private application", "Yes"],
  ["/checkout/:path*", "Billing application", "Yes"],
  ["/portal/:token", "Token-gated client portal", "Token"],
  ["/p/:shareToken", "Token-gated public proposal", "Token"],
];

for (const [pathname, type, auth] of appRoutes) {
  rows.push([
    `https://trysarion.com${pathname}`,
    `https://app.trysarion.com${pathname}`,
    type,
    auth,
    "Yes",
    "307",
    "Yes",
    "Locally HTTP-verified for representative private and portal routes; staging required",
  ]);
}

for (const pathname of [
  "/api/auth/:path*",
  "/api/activity",
  "/api/billing/checkout",
  "/api/billing/portal",
  "/api/billing/webhook",
  "/api/clients/:id/timeline",
  "/api/cron/recurring-billing",
  "/api/dev/email-test",
]) {
  rows.push([
    `https://trysarion.com${pathname}`,
    `https://app.trysarion.com${pathname}`,
    "Application API",
    "Endpoint-specific",
    "No",
    "",
    "Protocol-specific",
    "Move callers/callback configuration during cutover; POST is intentionally not redirected",
  ]);
}

const quote = (value) => `"${String(value).replaceAll('"', '""')}"`;
await writeFile("SAAS_ROUTE_MIGRATION_MAP.csv", `${rows.map((row) => row.map(quote).join(",")).join("\n")}\n`);


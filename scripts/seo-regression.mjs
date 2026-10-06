import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function parseCsvCount(input) {
  let rows = 0, quoted = false;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '"' && input[i + 1] === '"' && quoted) i++;
    else if (input[i] === '"') quoted = !quoted;
    else if (input[i] === "\n" && !quoted) rows++;
  }
  return Math.max(0, rows - 1);
}

const inputCount = parseCsvCount(read("TrySarion_Global_SEO_Keyword_Universe.csv"));
const mapCount = parseCsvCount(read("SEO_KEYWORD_URL_MAP.csv"));
assert.equal(inputCount, 886, "The supplied keyword universe should contain 886 rows");
assert.equal(mapCount, inputCount, "Every supplied keyword must appear in the URL map");

for (const report of ["SEO_CONTENT_PLAN.csv", "SEO_PAGE_INVENTORY.csv", "SEO_CANNIBALIZATION_REPORT.csv", "SEO_IMPLEMENTATION_REPORT.md"]) {
  assert.ok(exists(report), `${report} must exist`);
}

const commercial = read("src/content/seo/commercial-pages.ts");
for (const slug of ["agency-crm", "client-portal", "project-management-for-agencies", "agency-invoicing", "client-management-software", "agency-operations"]) {
  assert.ok(commercial.includes(`slug: "${slug}"`), `Missing commercial page data for ${slug}`);
}
assert.equal(new Set([...commercial.matchAll(/metaTitle: "([^"]+)"/g)].map(m => m[1])).size, 6, "Commercial titles must be unique");
assert.equal(new Set([...commercial.matchAll(/title: "([^"]+)"/g)].slice(0, 6).map(m => m[1])).size, 6, "Commercial H1s must be unique");

const commercialPage = read("src/app/(marketing)/[commercial]/page.tsx");
for (const signal of ["alternates: { canonical: url }", "commercial-breadcrumb", "commercial-page", "commercial-faq", 'as="h1"']) {
  assert.ok(commercialPage.includes(signal), `Commercial template is missing SEO signal: ${signal}`);
}

const sitemap = read("src/app/sitemap.ts");
assert.ok(sitemap.includes("COMMERCIAL_PAGES"), "Commercial pages must be driven into the sitemap registry");
const robots = read("src/app/robots.ts");
for (const blocked of ["/api/", "/portal/", "/login", "/signup", "/dashboard"]) assert.ok(robots.includes(`"${blocked}"`), `robots must block ${blocked}`);
assert.ok(!sitemap.includes('{ path: "/dashboard"'), "Private dashboard must not be in sitemap");
assert.ok(!sitemap.includes('{ path: "/api'), "API routes must not be in sitemap");

const nextConfig = read("next.config.ts");
assert.ok(nextConfig.includes('source: "/agency-management-software"'), "Exact-match alias should redirect to the homepage owner");
assert.ok(nextConfig.includes('source: "/all-in-one-agency-software"'), "All-in-one alias should redirect to the homepage owner");

console.log(`SEO regression checks passed (${mapCount} keywords, 6 commercial hubs).`);

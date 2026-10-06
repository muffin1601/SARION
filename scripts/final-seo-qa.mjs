import assert from "node:assert/strict";
import fs from "node:fs";

const base = process.env.SEO_QA_BASE_URL ?? "http://127.0.0.1:3100";
const productionOrigin = "https://trysarion.com";

function parseCsv(input) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (quoted) {
      if (ch === '"' && input[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ""; }
    else if (ch === '\n') { row.push(field.replace(/\r$/, "")); rows.push(row); row = []; field = ""; }
    else field += ch;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const headers = rows.shift().map((h, i) => i === 0 ? h.replace(/^\uFEFF/, "") : h);
  return rows.filter(r => r.some(Boolean)).map(r => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""])));
}

const decode = (s = "") => s.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'").replaceAll("&#39;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");
const matches = (html, re) => [...html.matchAll(re)].map(m => decode(m[1].trim()));
const normalizePath = (value) => {
  try { const u = new URL(value, productionOrigin); return u.origin === productionOrigin ? `${u.pathname}${u.search}` : null; }
  catch { return null; }
};

const inventory = parseCsv(fs.readFileSync("SEO_PAGE_INVENTORY.csv", "utf8"));
const inventoryPaths = new Set(inventory.filter(r => r["Index Status"] === "Index").map(r => r.URL));
const sitemapResponse = await fetch(`${base}/sitemap.xml`, { redirect: "manual" });
assert.equal(sitemapResponse.status, 200, "sitemap.xml must return 200");
const sitemapXml = await sitemapResponse.text();
const sitemapPaths = matches(sitemapXml, /<loc>(.*?)<\/loc>/g).map(value => new URL(value).pathname);
const sitemapSet = new Set(sitemapPaths);

const results = [];
const queue = [...inventoryPaths];
const workers = Array.from({ length: 10 }, async () => {
  while (queue.length) {
    const path = queue.shift();
    const response = await fetch(`${base}${path}`, { redirect: "manual" });
    const html = await response.text();
    const canonicals = matches(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"[^>]*>/gi);
    const titles = matches(html, /<title>(.*?)<\/title>/gis);
    const descriptions = matches(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"[^>]*>/gi);
    const robots = matches(html, /<meta[^>]+name="robots"[^>]+content="([^"]*)"[^>]*>/gi).join(",").toLowerCase();
    const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
    const links = matches(html, /<a[^>]+href="([^"]+)"[^>]*>/gi).map(normalizePath).filter(Boolean);
    const jsonLd = matches(html, /<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gis);
    const visibleText = decode(html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
    const schema = [];
    const schemaErrors = [];
    for (const block of jsonLd) {
      try {
        const data = JSON.parse(block);
        const nodes = Array.isArray(data) ? data : (data["@graph"] ?? [data]);
        for (const node of nodes) {
          if (node?.aggregateRating || node?.review) schemaErrors.push("Review/rating schema is not allowed without verified visible evidence");
          const serialized = JSON.stringify(node);
          if (/https?:\/\/(?:localhost|127\.0\.0\.1|[^"/]*staging[^"/]*)/i.test(serialized)) schemaErrors.push("Schema contains a local or staging URL");
          if (node?.["@type"] === "FAQPage") {
            for (const question of node.mainEntity ?? []) {
              if (!visibleText.includes(question.name) || !visibleText.includes(question.acceptedAnswer?.text ?? "")) schemaErrors.push(`FAQ schema is not visible: ${question.name}`);
            }
          }
          if (node?.["@type"] === "BreadcrumbList") {
            const positions = (node.itemListElement ?? []).map(item => item.position);
            if (positions.some((position, index) => position !== index + 1)) schemaErrors.push("Breadcrumb positions are invalid");
          }
          if (node?.["@type"] === "SoftwareApplication" && node.offers?.["@type"] === "AggregateOffer") {
            const offers = node.offers.offers ?? [];
            const prices = offers.map(offer => Number(offer.price));
            if (node.offers.offerCount !== offers.length || node.offers.lowPrice !== Math.min(...prices) || node.offers.highPrice !== Math.max(...prices)) schemaErrors.push("AggregateOffer summary does not match its nested offers");
          }
          schema.push(node?.["@type"] ?? "Unknown");
        }
      } catch (error) { schemaErrors.push(error.message); }
    }
    results.push({ path, status: response.status, location: response.headers.get("location"), xRobots: response.headers.get("x-robots-tag"), titles, descriptions, canonicals, robots, h1Count, links, schema, schemaErrors, html });
  }
});
await Promise.all(workers);
results.sort((a, b) => a.path.localeCompare(b.path));

const errors = [];
const titleOwners = new Map(), descriptionOwners = new Map(), canonicalOwners = new Map();
for (const result of results) {
  const expectedCanonical = `${productionOrigin}${result.path === "/" ? "" : result.path}`;
  if (result.status !== 200) errors.push(`${result.path}: expected 200, got ${result.status}${result.location ? ` -> ${result.location}` : ""}`);
  if (result.xRobots?.toLowerCase().includes("noindex") || result.robots.includes("noindex")) errors.push(`${result.path}: accidental noindex`);
  if (result.titles.length !== 1 || !result.titles[0]) errors.push(`${result.path}: expected one non-empty title, got ${result.titles.length}`);
  if (result.descriptions.length !== 1 || !result.descriptions[0]) errors.push(`${result.path}: expected one non-empty description, got ${result.descriptions.length}`);
  if (result.canonicals.length !== 1) errors.push(`${result.path}: expected one canonical, got ${result.canonicals.length}`);
  else if (result.canonicals[0] !== expectedCanonical) errors.push(`${result.path}: canonical ${result.canonicals[0]} does not match ${expectedCanonical}`);
  if (result.h1Count !== 1) errors.push(`${result.path}: expected one H1, got ${result.h1Count}`);
  if (result.schemaErrors.length) errors.push(`${result.path}: JSON-LD ${result.schemaErrors.join("; ")}`);
  for (const [map, value] of [[titleOwners, result.titles[0]], [descriptionOwners, result.descriptions[0]], [canonicalOwners, result.canonicals[0]]]) {
    if (!value) continue;
    const owners = map.get(value) ?? []; owners.push(result.path); map.set(value, owners);
  }
}
for (const [kind, map] of [["title", titleOwners], ["description", descriptionOwners], ["canonical", canonicalOwners]]) {
  for (const [value, owners] of map) if (owners.length > 1) errors.push(`Duplicate ${kind} (${owners.join(", ")}): ${value}`);
}

const missingFromSitemap = [...inventoryPaths].filter(path => !sitemapSet.has(path));
const unexpectedInSitemap = [...sitemapSet].filter(path => !inventoryPaths.has(path));
const duplicateSitemap = sitemapPaths.filter((path, i) => sitemapPaths.indexOf(path) !== i);
if (missingFromSitemap.length) errors.push(`Missing from sitemap: ${missingFromSitemap.join(", ")}`);
if (unexpectedInSitemap.length) errors.push(`Unexpected in sitemap: ${unexpectedInSitemap.join(", ")}`);
if (duplicateSitemap.length) errors.push(`Duplicate sitemap URLs: ${duplicateSitemap.join(", ")}`);

const internalPaths = new Set(results.flatMap(r => r.links).filter(p => !p.startsWith("/api/") && !p.startsWith("/portal/") && !p.startsWith("/p/")));
const linkChecks = [];
const linkQueue = [...internalPaths];
const linkWorkers = Array.from({ length: 10 }, async () => {
  while (linkQueue.length) {
    const path = linkQueue.shift();
    const response = await fetch(`${base}${path}`, { redirect: "manual" });
    linkChecks.push({ path, status: response.status, location: response.headers.get("location") });
  }
});
await Promise.all(linkWorkers);
for (const link of linkChecks) {
  if (link.status >= 400) errors.push(`Broken internal link: ${link.path} -> ${link.status}`);
  if (link.status >= 300 && link.status < 400) errors.push(`Redirected internal link: ${link.path} -> ${link.status} ${link.location ?? ""}`);
}

const graph = new Map(results.map(r => [r.path, [...new Set(r.links.map(p => p.split(/[?#]/)[0]).filter(p => inventoryPaths.has(p)))]]));
const depth = new Map([["/", 0]]), bfs = ["/"];
while (bfs.length) {
  const current = bfs.shift();
  for (const next of graph.get(current) ?? []) if (!depth.has(next)) { depth.set(next, depth.get(current) + 1); bfs.push(next); }
}
const orphaned = [...inventoryPaths].filter(path => path !== "/" && !depth.has(path));
const deep = [...depth].filter(([, value]) => value > 4);
if (orphaned.length) errors.push(`Orphaned inventory URLs: ${orphaned.join(", ")}`);

const unknowns = ["/seo-qa-does-not-exist-9f83", "/compare/not-a-real-product", "/solutions/not-a-real-industry", "/blog/not-a-real-post"];
const unknownResults = [];
for (const path of unknowns) {
  const response = await fetch(`${base}${path}`, { redirect: "manual" });
  unknownResults.push({ path, status: response.status });
  if (response.status !== 404) errors.push(`Soft-404 risk: ${path} returned ${response.status}`);
}

const redirects = [];
for (const path of ["/agency-management-software", "/all-in-one-agency-software", "/agency-crm/", "/AGENCY-CRM"]) {
  const response = await fetch(`${base}${path}`, { redirect: "manual" });
  redirects.push({ path, status: response.status, location: response.headers.get("location") });
}

const hubs = ["/", "/agency-crm", "/client-portal", "/project-management-for-agencies", "/agency-invoicing", "/client-management-software", "/agency-operations"];
const hubGraph = hubs.map(path => ({ path, inbound: results.filter(r => r.links.some(href => href.split(/[?#]/)[0] === path)).length, depth: depth.get(path) ?? null, ssrTextBytes: results.find(r => r.path === path)?.html.length ?? 0 }));
for (const hub of hubGraph) if (hub.path !== "/" && (!hub.inbound || hub.depth === null || hub.depth > 4)) errors.push(`${hub.path}: weak internal discovery (inbound=${hub.inbound}, depth=${hub.depth})`);

const report = {
  base, inventoryUrls: inventoryPaths.size, sitemapUrls: sitemapPaths.length,
  missingFromSitemap, unexpectedInSitemap, duplicateSitemap,
  crawled: results.length, uniqueTitles: titleOwners.size, uniqueDescriptions: descriptionOwners.size, uniqueCanonicals: canonicalOwners.size,
  jsonLdBlocks: results.reduce((n, r) => n + r.schema.length, 0), schemaTypes: [...new Set(results.flatMap(r => r.schema))].sort(),
  internalLinksChecked: linkChecks.length, orphaned, deep, hubGraph, unknownResults, redirects, errors,
};
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;

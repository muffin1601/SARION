import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

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
  const headers = rows.shift().map((header, index) => index === 0 ? header.replace(/^\uFEFF/, "") : header);
  return rows.filter(r => r.some(Boolean)).map(r => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""])));
}

function csvCell(value) { return `"${String(value ?? "").replaceAll('"', '""')}"`; }
function writeCsv(file, headers, rows) {
  const text = [headers.map(csvCell).join(","), ...rows.map(row => headers.map(h => csvCell(row[h])).join(","))].join("\n") + "\n";
  fs.writeFileSync(path.join(root, file), text);
}

const keywords = parseCsv(fs.readFileSync(path.join(root, "TrySarion_Global_SEO_Keyword_Universe.csv"), "utf8"));
const existingSolutions = new Set(["marketing-agencies", "design-agencies", "web-development-agencies", "seo-agencies", "branding-agencies", "creative-agencies", "freelancers", "consultants"]);
const existingComparisons = new Set(["clickup", "notion", "monday", "trello", "asana", "hubspot", "zoho-crm", "agency-crm-vs-spreadsheets"]);
const competitorSlug = (keyword) => {
  const pairs = [["clickup","clickup"],["asana","asana"],["monday","monday"],["notion","notion"],["hubspot","hubspot"],["zoho","zoho-crm"],["teamwork","teamwork"],["productive","productive"],["scoro","scoro"],["accelo","accelo"],["suitedash","suitedash"],["manyrequests","manyrequests"],["honeybook","honeybook"],["dubsado","dubsado"],["bonsai","bonsai"],["plutio","plutio"],["clientjoy","clientjoy"]];
  return pairs.find(([name]) => keyword.toLowerCase().includes(name))?.[1];
};
const industrySlug = (cluster) => ({
  "Marketing Agencies":"marketing-agencies", "Digital Agencies":"digital-agencies", "Creative Agencies":"creative-agencies", "Design Agencies":"design-agencies", "Web Development Agencies":"web-development-agencies", "SEO Agencies":"seo-agencies", "Branding Agencies":"branding-agencies", "Advertising Agencies":"advertising-agencies", "Social Media Agencies":"social-media-agencies", "PR Agencies":"pr-agencies", "Content Agencies":"content-agencies", "Video Production":"video-production-agencies", "Freelancers":"freelancers", "Consultants":"consultants", "Small Agencies & Startups":"small-agencies",
}[cluster]);

function targetFor(row) {
  const k = row.Keyword.toLowerCase();
  const c = row.Cluster;
  let url = "/", type = row["Recommended Page Type"], primary = "agency management software", status = "Mapped to existing page", existing = "Existing", notes = "Homepage owns the global agency-management category; no duplicate exact-match page.";
  if (c === "Agency CRM" || c === "Informational - CRM" || (c === "Feature Combinations" && k.includes("crm"))) { url = "/agency-crm"; primary = "agency CRM"; status = "Mapped to new page"; existing = "New"; notes = "Authoritative post-sale agency CRM hub."; }
  else if (c === "Client Portal" || c === "Informational - Client Portal") { url = "/client-portal"; primary = "client portal for agencies"; status = "Mapped to new page"; existing = "New"; notes = "Authoritative client portal hub; /features/client-portal supports product-detail intent."; }
  else if (c === "Project Management" || c === "Informational - Project Management") { url = "/project-management-for-agencies"; primary = "project management software for agencies"; status = "Mapped to new page"; existing = "New"; notes = "Authoritative agency project-management hub."; }
  else if (c === "Invoicing & Billing") { url = "/agency-invoicing"; primary = "agency invoicing software"; status = "Mapped to new page"; existing = "New"; notes = "Operational invoicing hub; avoids claiming full accounting functionality."; }
  else if (c === "Tool Consolidation" || (c === "Problem Aware" && /operations|admin|organize an agency|streamline|scale/.test(k))) { url = "/agency-operations"; primary = "agency operations software"; status = "Mapped to new page"; existing = "New"; notes = "Agency-operations and consolidation owner."; }
  else if (c === "Client Communication") { url = "/blog/client-communication-best-practices"; primary = "client communication best practices"; notes = "Existing educational article; links to the client portal hub."; }
  else if (c === "Client Onboarding") { url = k.includes("checklist") ? "/blog/how-to-onboard-a-new-client-checklist" : "/use-cases/client-onboarding"; primary = "agency client onboarding"; if (!k.includes("checklist")) { existing = "New"; status = "Mapped to future content"; notes = "P2 differentiated use-case hub; checklist intent is already covered by the blog."; } }
  else if (c === "Retainer Management") { url = "/use-cases/retainer-management"; primary = "retainer management software"; existing = "New"; status = "Mapped to future content"; notes = "P2 use-case page pending product-claim review."; }
  else if (c === "Pricing Intent") { url = "/pricing"; primary = "agency management software pricing"; notes = "Live plan source of truth; pricing must not be duplicated in generated copy."; }
  else if (c === "Reporting & Dashboards") { url = "/features/reporting"; primary = "agency reporting software"; notes = "Existing feature page owns reporting/dashboard evaluation intent."; }
  else if (c === "Team & Account Management") { url = k.includes("account") ? "/client-management-software" : "/features/team-collaboration"; primary = k.includes("account") ? "agency account management" : "agency team management"; if (k.includes("account")) { existing = "New"; status = "Mapped to new page"; } notes = "Mapped to the closest factual product workflow."; }
  else if (c.startsWith("Geographic -")) { url = "/"; primary = "agency management software"; status = "Intentionally not targeted"; notes = "No country doorway page: current product, pricing, and evidence do not provide meaningful localization. Global English page remains relevant."; }
  else if (industrySlug(c)) { const slug = industrySlug(c); url = `/solutions/${slug}`; primary = `${c.replace(" & Startups", "").toLowerCase()} software`; if (!existingSolutions.has(slug)) { existing = "New"; status = "Mapped to future content"; notes = "P2 industry page requires genuinely differentiated workflow copy."; } else notes = "Existing differentiated industry solution page."; }
  else if (c.includes("Competitor Alternatives") || c === "Sarion Comparisons") { const slug = competitorSlug(k); if (slug) { url = `/compare/${slug}`; primary = `Sarion vs ${slug.replace("-crm", " CRM")}`; if (!existingComparisons.has(slug)) { existing = "New"; status = "Mapped to future content"; notes = "P2 comparison requires current, sourced competitor verification before publication."; } else notes = "Existing factual comparison page; alternative terms consolidate here to avoid duplicate intent."; } else { url = "/compare"; primary = "agency software comparisons"; notes = "Comparison hub owns broad evaluation intent."; } }
  else if (c === "Competitor vs Competitor") { url = `/blog/${k.replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}`; primary = row.Keyword; existing = "New"; status = "Mapped to future content"; notes = "P3 editorial comparison; requires source refresh immediately before publication."; }
  else if (c === "Best / BOFU") { url = `/blog/${k.replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}`; primary = row.Keyword; existing = "New"; status = "Mapped to future content"; notes = "Balanced best-of article in P2 editorial backlog; evaluation criteria and disclosure required."; }
  else if (c === "Switching / Migration") { url = /spreadsheet/.test(k) ? "/blog/signs-your-agency-has-outgrown-spreadsheets" : `/guides/${k.replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}`; primary = row.Keyword; if (!/spreadsheet/.test(k)) { existing = "New"; status = "Mapped to future content"; notes = "Migration guide requires a verified import workflow and competitor-specific fact check."; } else notes = "Existing spreadsheet migration article supports the operations hub."; }
  else if (c === "Problem Aware") { url = /invoice|unpaid/.test(k) ? "/agency-invoicing" : /communicat|email|status/.test(k) ? "/blog/reduce-client-status-update-emails" : "/agency-operations"; primary = /invoice|unpaid/.test(k) ? "agency invoicing software" : "agency operations software"; status = url.startsWith("/blog") ? "Mapped to existing page" : "Mapped to new page"; existing = url.startsWith("/blog") ? "Existing" : "New"; notes = "Consolidated under the closest authoritative problem/solution owner."; }
  else if (c === "AI / Natural Language Queries") { url = /portal/.test(k) ? "/client-portal" : /invoice|billing/.test(k) ? "/agency-invoicing" : /crm|client/.test(k) ? "/agency-crm" : "/"; primary = url === "/client-portal" ? "client portal for agencies" : url === "/agency-invoicing" ? "agency invoicing software" : url === "/agency-crm" ? "agency CRM" : "agency management software"; existing = url === "/" ? "Existing" : "New"; status = url === "/" ? "Mapped to existing page" : "Mapped to new page"; notes = "Mapped semantically to the page that directly answers the natural-language query."; }
  else if (c === "Feature Combinations") { url = k.includes("invoice") ? "/agency-crm" : k.includes("portal") ? "/client-portal" : "/agency-operations"; primary = url === "/agency-crm" ? "agency CRM" : url === "/client-portal" ? "client portal for agencies" : "agency operations software"; existing = "New"; status = "Mapped to new page"; notes = "Combination variants consolidate under one authoritative workflow page to prevent cannibalization."; }
  return { url, type, primary, status, existing, notes };
}

const mapRows = keywords.map(row => { const t = targetFor(row); return { Keyword: row.Keyword, Cluster: row.Cluster, Intent: row.Intent, Priority: row.Priority, "Target URL": t.url, "Page Type": t.type, "Primary Keyword": t.primary, "Secondary Keyword": row.Keyword === t.primary ? "" : row.Keyword, "Existing/New": t.existing, "Implementation Status": t.status, Notes: t.notes }; });
writeCsv("SEO_KEYWORD_URL_MAP.csv", ["Keyword","Cluster","Intent","Priority","Target URL","Page Type","Primary Keyword","Secondary Keyword","Existing/New","Implementation Status","Notes"], mapRows);

const byUrl = new Map();
for (const row of mapRows) { const v = byUrl.get(row["Target URL"]) ?? []; v.push(row); byUrl.set(row["Target URL"], v); }
const planRows = [...byUrl].map(([url, rows]) => ({ "Target URL": url, "Primary Keyword": rows[0]["Primary Keyword"], "Keyword Count": rows.length, "Highest Priority": rows.some(r=>r.Priority==="P1")?"P1":rows.some(r=>r.Priority==="P2")?"P2":"P3", "Recommended Content Type": rows[0]["Page Type"], Status: rows[0]["Implementation Status"], "Content Brief": rows[0].Notes })).sort((a,b)=>a["Highest Priority"].localeCompare(b["Highest Priority"]) || b["Keyword Count"]-a["Keyword Count"]);
writeCsv("SEO_CONTENT_PLAN.csv", ["Target URL","Primary Keyword","Keyword Count","Highest Priority","Recommended Content Type","Status","Content Brief"], planRows);

const inventory = [
  ["/","Commercial hub","agency management software","all-in-one agency software","Commercial","Index","/","Agency Management Software & CRM for Agencies | Sarion","Agency management software for modern agencies.","Live"],
  ...["agency-crm","client-portal","project-management-for-agencies","agency-invoicing","client-management-software","agency-operations"].map(slug=>{const rows=mapRows.filter(r=>r["Target URL"]===`/${slug}`);return [`/${slug}`,"Commercial landing page",rows[0]?.["Primary Keyword"]??slug,rows.slice(1,6).map(r=>r.Keyword).join("; "),"Commercial","Index",`/${slug}`,"See source metadata","See source H1","Implemented"]; }),
  ["/features","Feature hub","agency client management software","agency workflow features","Evaluation","Index","/features","Agency Management Software Features | Sarion","Everything your agency needs, in one workspace","Live"],
  ["/pricing","Pricing","agency management software pricing","agency CRM pricing; free agency software","Transactional","Index","/pricing","Agency Software Pricing | Sarion","Simple plans that grow with you","Live"],
  ["/blog","Blog hub","agency operations resources","agency guides","Informational","Index","/blog","Agency Operations Blog | Sarion","Agency operations, without the chaos","Live"],
  ["/solutions","Solution hub","agency software by industry","industry agency software","Commercial","Index","/solutions","Agency Software by Industry | Sarion","Built for the way your agency works","Live"],
  ["/compare","Comparison hub","agency software comparisons","Sarion alternatives","Commercial","Index","/compare","Compare Sarion | Agency Software Alternatives","Find the right operating system for your agency","Live"],
  ...[...existingSolutions].map(s=>[`/solutions/${s}`,"Industry solution",`${s.replaceAll("-"," ")} software`,"","Commercial","Index",`/solutions/${s}`,"Unique dynamic metadata","Unique H1","Live"]),
  ...[...existingComparisons].map(s=>[`/compare/${s}`,"Comparison",`Sarion vs ${s.replaceAll("-"," ")}`,"alternative for agencies","Commercial","Index",`/compare/${s}`,"Unique dynamic metadata","Unique H1","Live"]),
];
const knownInventoryUrls = new Set(inventory.map(row => row[0]));
const discovered = new Set();
for (const match of read("src/app/sitemap.ts").matchAll(/path: "([^"{]+)"/g)) discovered.add(match[1]);
for (const file of fs.readdirSync(path.join(root, "src/content/blog"))) {
  if (file.endsWith(".mdx")) {
    discovered.add(`/blog/${file.replace(/\.mdx$/, "")}`);
    const body = read(`src/content/blog/${file}`);
    const tagsLine = body.match(/tags:\s*\[([^\]]+)\]/)?.[1] ?? "";
    for (const tag of tagsLine.matchAll(/["']([^"']+)["']/g)) discovered.add(`/blog/tag/${slugify(tag[1])}`);
  }
}
for (const match of read("src/content/categories.ts").matchAll(/slug: "([^"]+)"/g)) discovered.add(`/blog/category/${match[1]}`);
for (const match of read("src/content/authors/authors.ts").matchAll(/id: "([^"]+)"/g)) discovered.add(`/blog/author/${match[1]}`);
for (const file of fs.readdirSync(path.join(root, "src/content/resources/data"))) {
  if (!file.endsWith(".ts")) continue;
  const body = read(`src/content/resources/data/${file}`);
  const slug = body.match(/slug:\s*"([^"]+)"/)?.[1];
  const category = body.match(/category:\s*"([^"]+)"/)?.[1];
  if (slug && category && !body.includes('status: "planned"')) discovered.add(`/resources/${category}/${slug}`);
}
for (const match of read("src/content/resources/categories.ts").matchAll(/slug: "([^"]+)"/g)) discovered.add(`/resources/${match[1]}`);
for (const file of fs.readdirSync(path.join(root, "src/content/tools/data"))) if (file.endsWith(".ts")) discovered.add(`/tools/${file.replace(/\.ts$/, "")}`);
for (const url of discovered) {
  if (knownInventoryUrls.has(url)) continue;
  let pageType = "Marketing page";
  if (url.startsWith("/blog/")) pageType = url.includes("/category/") ? "Blog category" : url.includes("/tag/") ? "Blog tag" : url.includes("/author/") ? "Author archive" : "Blog article";
  else if (url.startsWith("/resources/")) pageType = url.split("/").length > 3 ? "Resource" : "Resource category";
  else if (url.startsWith("/tools/")) pageType = "Interactive tool";
  inventory.push([url,pageType,"","","Mixed","Index",url,"Route-specific metadata","Single H1","Live"]);
}
const inventoryHeaders = ["URL","Page Type","Primary Keyword","Secondary Keywords","Intent","Index Status","Canonical","Title","H1","Word Count","Internal Links","Status"];
writeCsv("SEO_PAGE_INVENTORY.csv", inventoryHeaders, inventory.sort((a,b)=>a[0].localeCompare(b[0])).map(r=>Object.fromEntries(inventoryHeaders.map((h,i)=>[h, i < 9 ? r[i] : h === "Word Count" ? "Render audit required" : h === "Internal Links" ? "Present; automated link check" : r[9]]))));

const cannibal = [
  ["agency CRM","/agency-crm","/features/crm","Medium","/agency-crm","Commercial hub owns category intent; feature page supports detailed product intent and links upward."],
  ["client portal for agencies","/client-portal","/features/client-portal","Medium","/client-portal","Commercial hub owns category intent; feature page owns feature-detail intent."],
  ["project management for agencies","/project-management-for-agencies","/features/projects","Medium","/project-management-for-agencies","Commercial hub owns evaluation intent; feature page documents the product capability."],
  ["agency invoicing software","/agency-invoicing","/features/invoices","Medium","/agency-invoicing","Commercial hub owns solution intent; feature page documents invoice functionality."],
  ["agency management software","/","/agency-management-software","Low","/","Keep homepage as owner; permanent redirect prevents a duplicate exact-match landing page."],
  ["all-in-one agency software","/","/all-in-one-agency-software","Low","/","Keep homepage as owner; permanent redirect consolidates signals."],
];
writeCsv("SEO_CANNIBALIZATION_REPORT.csv", ["Keyword","Page 1","Page 2","Risk","Recommended Owner","Action"], cannibal.map(r=>Object.fromEntries(["Keyword","Page 1","Page 2","Risk","Recommended Owner","Action"].map((h,i)=>[h,r[i]]))));

console.log(`Mapped ${mapRows.length} keywords to ${byUrl.size} target URLs.`);

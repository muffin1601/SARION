import fs from "node:fs/promises";

const parse = (text) => {
  const rows = []; let row = []; let field = ""; let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    if (c === '"') { if (quoted && text[i + 1] === '"') { field += c; i += 1; } else quoted = !quoted; }
    else if (c === "," && !quoted) { row.push(field); field = ""; }
    else if ((c === "\n" || c === "\r") && !quoted) { if (c === "\r" && text[i + 1] === "\n") i += 1; row.push(field); if (row.some(Boolean)) rows.push(row); row = []; field = ""; }
    else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [headers, ...body] = rows;
  return body.map((values) => Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""])));
};
const csv = (rows, columns) => [columns.join(","), ...rows.map((r) => columns.map((c) => `"${String(r[c] ?? "").replaceAll('"', '""')}"`).join(","))].join("\n") + "\n";
const map = parse(await fs.readFile("SEO_KEYWORD_URL_MAP.csv", "utf8"));
const p1 = map.filter((row) => row.Priority === "P1");
const owners = new Set(["/", "/agency-crm", "/client-portal", "/project-management-for-agencies", "/agency-invoicing", "/client-management-software", "/agency-operations"]);
const priority = (row) => owners.has(row["Target URL"]) ? "P1 — commercial owner" : row["Target URL"].startsWith("/compare/") ? "P1 — BOFU comparison" : "P1 — supporting opportunity";
const action = (row) => row["Implementation Status"] === "Mapped to future content" ? "Keep as documented future-content gap; do not create without distinct intent evidence." : owners.has(row["Target URL"]) ? "Strengthen canonical owner with answer-first copy, related-hub links, FAQ and CTA alignment." : "Strengthen the mapped canonical page; link to its parent commercial hub without competing for the head term.";
const auditColumns = ["Keyword","Current Target URL","Primary/Secondary","Intent","Current Page Type","Priority","Content Strength","Intent Match","Internal Link Strength","CTR Opportunity","Cannibalization Risk","Recommended Action","Expected SEO Impact","Implementation Status"];
const audit = p1.map((r) => ({
  Keyword:r.Keyword, "Current Target URL":r["Target URL"], "Primary/Secondary":r["Primary Keyword"] === r.Keyword ? "Primary" : "Secondary", Intent:r.Intent, "Current Page Type":r["Page Type"], Priority:priority(r), "Content Strength": owners.has(r["Target URL"]) ? "Established commercial hub" : r["Implementation Status"] === "Mapped to future content" ? "Not published" : "Mapped page; validate depth", "Intent Match":r["Implementation Status"] === "Mapped to future content" ? "Requires distinct-intent validation" : "Mapped to stated intent", "Internal Link Strength":owners.has(r["Target URL"]) ? "Supported by primary navigation and commercial cluster" : "Needs parent-hub contextual link review", "CTR Opportunity":"No Search Console export available", "Cannibalization Risk":owners.has(r["Target URL"]) ? "Protected canonical owner" : "Monitor against mapped primary owner", "Recommended Action":action(r), "Expected SEO Impact":owners.has(r["Target URL"]) ? "High" : r.Intent.includes("Commercial") ? "Medium" : "Validate first", "Implementation Status":r["Implementation Status"]
}));
await fs.writeFile("SEO_P1_RANKING_AUDIT.csv", csv(audit, auditColumns));
const strongColumns = ["Keyword","Cluster","Intent","Current Target URL","Primary/Secondary","Current Status","Content Changes","Internal Link Changes","CTR Changes","Schema Changes","Backlink/Authority Need","Priority","Implemented","Notes"];
await fs.writeFile("SEO_STRONG_KEYWORD_RANKING_PLAN.csv", csv(p1.map((r) => ({ Keyword:r.Keyword, Cluster:r.Cluster, Intent:r.Intent, "Current Target URL":r["Target URL"], "Primary/Secondary":r["Primary Keyword"] === r.Keyword ? "Primary" : "Secondary", "Current Status":r["Implementation Status"], "Content Changes":action(r), "Internal Link Changes":owners.has(r["Target URL"]) ? "Maintain contextual links from relevant supporting pages" : "Link naturally to mapped commercial owner", "CTR Changes":"Review only after Search Console evidence is supplied", "Schema Changes":owners.has(r["Target URL"]) ? "Visible FAQPage, WebPage and BreadcrumbList maintained" : "Match visible content only", "Backlink/Authority Need":r.Intent.includes("Commercial") ? "Relevant agency workflow/tool-selection mentions" : "Assess after impressions", Priority:priority(r), Implemented:owners.has(r["Target URL"]) ? "Yes — hub optimization pass" : "Planned", Notes:r.Notes })), strongColumns));
await fs.writeFile("SEO_QUICK_WIN_OPPORTUNITIES.csv", csv([], ["URL","Keyword","Current Position if known","Current Impressions if known","Current CTR if known","Opportunity Type","Recommended Change","Priority"]));
const ctr = [
  ["/","Agency Management Software for Client Delivery | Sarion","Run agency CRM, projects, client portals, invoicing, and team workflows from one connected workspace."],
  ["/agency-crm","Agency CRM for Client Delivery & Projects | Sarion","Manage existing agency clients, projects, invoices, portal activity, and account context in one connected workspace."],
  ["/client-portal","Client Portal Software for Agencies | Sarion","Give clients a branded place for project updates, comments, files, and invoice visibility—without status-update email loops."],
  ["/project-management-for-agencies","Project Management Software for Agencies | Sarion","Keep client context, projects, tasks, portal updates, and invoices connected from delivery to payment."],
  ["/agency-invoicing","Agency Invoicing Software & Invoice Tracking | Sarion","Create invoices and track due dates, payment status, overdue work, and client context beside agency delivery."],
  ["/client-management-software","Client Management Software for Agencies | Sarion","Organize client records, projects, notes, invoices, activity, and portal access in one agency workspace."],
  ["/agency-operations","Agency Operations Software for Small Teams | Sarion","Connect client management, projects, portals, invoicing, team workflows, and reporting in one agency operating system."]
].map(([URL, RecommendedTitle, RecommendedMetaDescription]) => ({ URL, "Existing Title":"See current page metadata", "Recommended Title":RecommendedTitle, "Existing Meta Description":"See current page metadata", "Recommended Meta Description":RecommendedMetaDescription, Reason:"Commercial intent clarity; apply only after CTR/impression evidence confirms need.", Priority:"P1" }));
await fs.writeFile("SEO_CTR_OPTIMIZATION_REPORT.csv", csv(ctr, ["URL","Existing Title","Recommended Title","Existing Meta Description","Recommended Meta Description","Reason","Priority"]));
const links = [
  ["/","/agency-crm","agency CRM for ongoing client delivery","Clarifies the CRM pillar without competing for the homepage category term"],
  ["/","/client-portal","client portal for agency updates","Routes portal intent to its canonical hub"],
  ["/","/project-management-for-agencies","project management for agencies","Routes delivery-workflow intent to its canonical hub"],
  ["/","/agency-invoicing","agency invoicing and tracking","Routes billing intent to its canonical hub"],
  ["/agency-crm","/client-management-software","client management workspace","Distinguishes ongoing account management from CRM"],
  ["/agency-crm","/project-management-for-agencies","client-linked project management","Explains connected delivery context"],
  ["/client-portal","/agency-invoicing","invoice visibility in the portal","Connects a supported feature to billing hub"],
  ["/project-management-for-agencies","/client-portal","client-facing project updates","Connects delivery to client communication"],
  ["/agency-operations","/agency-crm","client operations CRM","Connects operations to relationship context"]
].map(([sourceUrl, destinationUrl, suggestedAnchor, reason]) => ({ "Source URL": sourceUrl, "Destination URL": destinationUrl, "Suggested Anchor": suggestedAnchor, Reason: reason, Priority:"P1", Implemented:"Yes — commercial capability links" }));
await fs.writeFile("SEO_INTERNAL_LINK_PLAN.csv", csv(links, ["Source URL","Destination URL","Suggested Anchor","Reason","Priority","Implemented"]));

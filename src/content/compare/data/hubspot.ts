import type { Comparison } from "../types";

export const hubspot: Comparison = {
  slug: "hubspot",
  competitorName: "HubSpot",
  category: "crm",
  featured: true,
  addedDate: "2026-07-08",
  metaTitle: "Sarion vs. HubSpot",
  metaDescription:
    "HubSpot is a full-featured sales and marketing CRM built for lead-gen pipelines. Sarion is built specifically for delivering agency client work. Here's an honest comparison.",
  heroHeadline: "HubSpot vs. a CRM built for agency clients",
  heroSubhead:
    "HubSpot is genuinely powerful for sales pipelines and marketing automation aimed at winning new business. Sarion is built for what happens after the deal closes — managing and delivering ongoing client work.",
  quickSummary:
    "HubSpot is a major, full-featured platform built around selling to prospects — deal stages, lead scoring, email marketing, and sales pipeline depth across its marketing, sales, and service hubs. Sarion is built around a different moment in the relationship: once someone is a client, not a lead, and the job shifts to delivering and billing their work. If your bottleneck is generating and converting leads, HubSpot's depth is a real asset. If your bottleneck is client-facing delivery — status visibility, project tracking, and invoicing — that's a job HubSpot wasn't built around, and Sarion was.",

  sarionBestFor: [
    "Agencies whose main friction is delivering and billing client work, not generating new leads",
    "Teams that want a client portal and invoicing without configuring a sales-pipeline platform for a job it wasn't built for",
    "Agencies that want project tracking and invoicing tied to the same client record, without adopting a marketing/sales suite to get there",
  ],
  competitorBestFor: [
    "Teams that need serious sales-pipeline depth and marketing automation to generate and convert leads",
    "Organizations already running HubSpot for lead generation who want marketing, sales, and service in one platform",
    "Larger organizations that need a full sales, marketing, and service suite spanning many teams and functions",
  ],

  whenSarionFits: [
    {
      title: "The client relationship has already started",
      description:
        "If someone is already a paying client, not a lead being nurtured, the job is delivery and communication — a purpose-built client portal and project tracking address that more directly than a sales pipeline tool.",
    },
    {
      title: "Invoicing needs to sit with the client record",
      description:
        "If invoices live in a separate tool from client and project data today, tying them to one record removes a reconciliation step HubSpot's deal-and-pipeline model doesn't handle natively.",
    },
    {
      title: "You want less platform to configure, not more",
      description:
        "Sarion's client, project, and invoice structure is fixed on purpose. There's no marketing hub, lead scoring, or sales pipeline to set up first — just client operations.",
    },
  ],
  whenCompetitorFits: [
    {
      title: "You need serious sales-pipeline or marketing-automation depth",
      description:
        "If winning new business through structured deal stages, lead scoring, and marketing campaigns is central to your operation, HubSpot's depth in that area is a genuine strength Sarion doesn't attempt to match.",
    },
    {
      title: "You're already running HubSpot for lead generation",
      description:
        "If your team already uses HubSpot to generate and nurture leads, consolidating onto one platform for both prospecting and client work may outweigh the benefit of a narrower, delivery-focused tool.",
    },
    {
      title: "You need a full sales, marketing, and service suite",
      description:
        "Larger organizations spanning multiple functions — marketing, sales, and support — may need that breadth in one platform more than they need a tool focused specifically on agency client delivery.",
    },
  ],

  featureMatrix: [
    { category: "Client management (CRM)", sarion: "Purpose-built client records for ongoing delivery", competitor: "Deep contact and deal records built around the sales pipeline" },
    { category: "Task & project tracking", sarion: "Included, scoped per client", competitor: "Not a core focus — approximated with tasks tied to deals or tickets" },
    { category: "Client portal", sarion: "Built in, branded, for project and invoice visibility", competitor: "Not a native feature for ongoing client delivery" },
    { category: "Invoicing", sarion: "Built in, tied to the client record", competitor: "Not a core feature — typically handled by separate billing tools" },
    { category: "Sales & marketing depth", sarion: "Not a focus — Sarion starts once someone is a client", competitor: "Deep — lead scoring, email marketing, deal pipelines" },
    { category: "Best suited for", sarion: "Delivering and billing ongoing client work", competitor: "Generating, nurturing, and converting leads at scale" },
  ],

  workflowComparison: {
    agencyWorkflow: [
      {
        category: "Where client work lives",
        sarion: "One client record holding projects, notes, and invoices together",
        competitor: "Contact and deal records oriented around the sales pipeline, not delivery",
      },
    ],
    clientManagement: [
      {
        category: "Client records",
        sarion: "Native — contacts, history, notes per client, focused on delivery",
        competitor: "Deep contact records, but structured around deals and lifecycle stages rather than ongoing work",
      },
    ],
    projectManagement: [
      {
        category: "Task and status tracking",
        sarion: "Straightforward, scoped per client",
        competitor: "Limited native project tracking — tasks exist, but aren't the platform's core strength",
      },
    ],
    portal: [
      {
        category: "Client-facing view",
        sarion: "Branded portal built in for project and invoice status",
        competitor: "No native client delivery portal; customer-facing features center on support tickets, not project visibility",
      },
    ],
    reporting: [
      {
        category: "Client status reporting",
        sarion: "Drawn from the same client/project record",
        competitor: "Strong pipeline and marketing reporting; less oriented toward per-client delivery status",
      },
    ],
    automation: [
      {
        category: "Internal automation",
        sarion: "Basic, focused on client-facing reminders (overdue invoices, stale projects)",
        competitor: "Extensive automation for marketing sequences and sales workflows",
      },
    ],
  },

  pricingPhilosophy:
    "HubSpot prices around a broad suite spanning marketing, sales, and service, aimed at organizations that need that full range of capability — and for teams using all of it, that breadth can be worth the cost. But a full-suite platform built for lead generation and sales pipelines often comes with a steeper cost and setup curve than a small agency actually needs if the real job is delivering client work, not converting leads. Sarion prices around that narrower job specifically — client records, a portal, and invoicing, without paying for or configuring marketing and sales tooling you may not use.",

  migrationSteps: [
    { step: "Identify which HubSpot contacts are active clients", description: "Separate ongoing clients from leads and prospects still in the sales pipeline before migrating." },
    { step: "Export client contact and company records", description: "Pull the relevant contact and company data for active clients out of HubSpot." },
    { step: "Map HubSpot companies to Sarion clients", description: "Each active client company typically becomes one Sarion client record, with projects tracked underneath it." },
    { step: "Invite clients to the portal", description: "Once client records are clean, turn on branded client portal access as the final step." },
  ],

  faqs: [
    {
      question: "Isn't HubSpot much more powerful than Sarion?",
      answer:
        "In its own domain, yes — HubSpot's sales pipeline and marketing automation depth is far beyond what Sarion attempts. Sarion isn't a smaller HubSpot; it's a different, narrower tool focused specifically on delivering and billing client work once someone is already a client, not a lead.",
    },
    {
      question: "Is Sarion trying to replace HubSpot entirely?",
      answer:
        "Not for lead generation or marketing automation. If your team relies on HubSpot to generate and convert new business, Sarion isn't built to replace that. It's built for the client-delivery side that typically starts after a deal closes.",
    },
    {
      question: "Can I use both HubSpot and Sarion together?",
      answer:
        "Yes — some agencies use HubSpot for lead generation and sales, then move a contact into Sarion once they become a paying client for project tracking, the portal, and invoicing. There's no built-in integration between them today, so this means transferring client information manually.",
    },
    {
      question: "Does HubSpot have a client portal for ongoing project work?",
      answer:
        "Not one built specifically for that. HubSpot's customer-facing tools center on support tickets and service cases rather than project status and invoice visibility, which is what Sarion's portal is purpose-built for.",
    },
  ],

  relatedBlogSlugs: [
    "agency-crm-features-that-actually-matter",
    "reduce-client-status-update-emails",
    "how-to-choose-an-agency-crm",
  ],
  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedIndustrySlugs: ["marketing-agencies", "branding-agencies", "freelancers"],
  relatedComparisonSlugs: ["zoho-crm", "agency-crm-vs-spreadsheets"],
};

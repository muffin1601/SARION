import type { Comparison } from "../types";

export const agencyCrmVsSpreadsheets: Comparison = {
  slug: "agency-crm-vs-spreadsheets",
  competitorName: "Spreadsheets",
  category: "spreadsheets",
  featured: true,
  addedDate: "2026-06-15",
  metaTitle: "Sarion vs. Spreadsheets",
  metaDescription:
    "Spreadsheets are free until an agency outgrows them. An honest comparison of running client work in a spreadsheet versus a dedicated agency CRM.",
  heroHeadline: "Spreadsheets vs. a dedicated agency CRM",
  heroSubhead:
    "Spreadsheets are free until an agency outgrows them. Here's exactly where they hold up, and where they start costing more time than they save.",
  quickSummary:
    "A spreadsheet costs nothing and can track anything you can format a column for. That flexibility is also its limit: nothing notifies your team when something's overdue, and clients can't see it at all. Sarion trades some of that raw flexibility for structure — client records, a portal, and invoicing that stay in sync without anyone reconciling by hand.",

  sarionBestFor: [
    "Agencies with 3+ active clients where a shared spreadsheet is starting to conflict or go stale",
    "Teams where more than one person needs to answer client status questions",
    "Agencies that want clients to have their own view of progress and invoices",
  ],
  competitorBestFor: [
    "A single freelancer with one or two clients and a simple, low-volume workflow",
    "Very early-stage agencies still figuring out what they even need to track",
    "Anyone who needs total, unstructured flexibility more than they need automation",
  ],

  whenSarionFits: [
    {
      title: "You've outgrown one shared file",
      description:
        "Once two people are editing the same tracker, or you've split into multiple spreadsheets per client, a structured system removes the coordination overhead.",
    },
    {
      title: "Clients ask for updates you already have",
      description:
        "If clients regularly email for status you've already logged somewhere, a portal answers that question without you writing a reply.",
    },
    {
      title: "Invoicing is starting to slip",
      description:
        "When tracking paid/unpaid/overdue in a spreadsheet means manually reconciling against a bank statement, invoicing tied to the client record removes that step.",
    },
  ],
  whenCompetitorFits: [
    {
      title: "You have one or two clients, full stop",
      description:
        "At that scale, a spreadsheet is genuinely simpler — there's no team to coordinate with and no meaningful invoicing volume to track.",
    },
    {
      title: "You need a format no tool has built yet",
      description:
        "Spreadsheets can model anything you can express in rows and columns. A structured CRM trades that ceiling for less day-to-day friction.",
    },
    {
      title: "You're not ready to commit to a system yet",
      description:
        "If you're still figuring out your own process, a spreadsheet is a reasonable place to experiment before committing to structured software.",
    },
  ],

  featureMatrix: [
    { category: "Client management (CRM)", sarion: "Built in", competitor: "Manual, one row per client" },
    { category: "Project & task tracking", sarion: "Built in, tied to each client", competitor: "Possible, but a separate sheet or tab" },
    { category: "Invoicing", sarion: "Built in, tied to the client record", competitor: "Not built in — needs a separate tool" },
    { category: "Branded client portal", sarion: "Included", competitor: "Not possible" },
    { category: "Team collaboration", sarion: "Scoped access per teammate", competitor: "Shared-edit conflicts are common" },
    { category: "Setup cost", sarion: "A short migration, then structured by default", competitor: "Free and instant, but ad hoc" },
  ],

  workflowComparison: {
    agencyWorkflow: [
      {
        category: "Day-to-day updates",
        sarion: "Logged against the client's project record as work happens",
        competitor: "Typed into a cell, easy to forget or overwrite",
      },
    ],
    clientManagement: [
      {
        category: "Client history",
        sarion: "One record per client holding contacts, notes, and history",
        competitor: "Scattered across tabs, files, and whoever remembers",
      },
    ],
    projectManagement: [
      {
        category: "Status and deadlines",
        sarion: "Structured status per project, visible to the whole team",
        competitor: "Dependent on someone updating a cell consistently",
      },
    ],
    portal: [
      {
        category: "Client visibility",
        sarion: "Clients log into a branded portal to see status and invoices",
        competitor: "Clients have no view unless you share the file directly",
      },
    ],
    reporting: [
      {
        category: "Status reporting",
        sarion: "Pulled from live project and invoice records",
        competitor: "Manually assembled from whatever's in the sheet",
      },
    ],
    automation: [
      {
        category: "Reminders",
        sarion: "Overdue invoices and stale projects are visible without asking",
        competitor: "Nothing flags anything automatically",
      },
    ],
  },

  pricingPhilosophy:
    "A spreadsheet is free, and that's a real advantage worth naming honestly — there's no cost to trying one. Sarion charges for the parts a spreadsheet can't do at any price: a client-facing portal, invoicing tied to the same record, and a system that scales past one person editing one file. The question isn't which is cheaper on day one, it's which one is still working for you at client number ten.",

  migrationSteps: [
    { step: "Export your spreadsheet", description: "Keep the original file as a backup before changing anything." },
    { step: "Clean up client rows", description: "Merge duplicates and standardize naming before importing." },
    { step: "Import active clients first", description: "Get current, paying clients into the new system before archived ones." },
    { step: "Turn on the portal last", description: "Get your team comfortable with client records before inviting clients in." },
  ],

  faqs: [
    {
      question: "Isn't a spreadsheet good enough for a small agency?",
      answer:
        "For a single client, sure. Past 3-4 active clients, the update-and-reconcile overhead of keeping a spreadsheet in sync with reality starts costing more time than it saves.",
    },
    {
      question: "What does a CRM add that a well-built spreadsheet can't?",
      answer:
        "A client portal your clients can log into, invoicing tied to the same client record, and a single source of truth your whole team reads from — without a shared-edit conflict.",
    },
    {
      question: "Can I migrate my existing spreadsheet into Sarion?",
      answer:
        "Yes — see the CRM Migration Checklist for a step-by-step walkthrough that keeps your client history intact.",
    },
    {
      question: "Will I lose the flexibility a spreadsheet gives me?",
      answer:
        "Some, honestly. A spreadsheet can model anything; Sarion is structured around clients, projects, and invoices specifically. Most agencies find that trade worth it once coordination overhead outweighs the flexibility.",
    },
  ],

  relatedBlogSlugs: [
    "what-is-agency-crm",
    "signs-your-agency-has-outgrown-spreadsheets",
    "how-to-choose-an-agency-crm",
  ],
  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedIndustrySlugs: ["freelancers", "consultants"],
  relatedComparisonSlugs: ["hubspot", "zoho-crm"],
};

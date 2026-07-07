import type { Comparison } from "../types";

export const notion: Comparison = {
  slug: "notion",
  competitorName: "Notion",
  category: "all-in-one-workspace",
  featured: true,
  addedDate: "2026-07-08",
  metaTitle: "Sarion vs. Notion",
  metaDescription:
    "Notion is a flexible all-in-one workspace for docs, wikis, and databases. Sarion is a purpose-built agency CRM with a client portal and invoicing. Here's an honest comparison.",
  heroHeadline: "Notion vs. a CRM built for agency clients",
  heroSubhead:
    "Notion is genuinely excellent as a flexible workspace for docs, notes, and custom databases. Sarion doesn't try to be a workspace at all — it's a fixed structure built specifically around client records, projects, a portal, and invoicing.",
  quickSummary:
    "Notion is a general-purpose workspace — teams use it for wikis, notes, roadmaps, and databases they build themselves, and a lightweight client tracker is one of many things it can become. Sarion isn't a blank canvas; it's a fixed structure of clients, projects, a branded portal, and invoicing that exists the moment you sign up. If you want to build your own system and Notion already holds the rest of your company's knowledge, that flexibility is real. If you want client management, a portal, and invoicing without constructing them from database primitives, that's the gap Sarion fills.",

  sarionBestFor: [
    "Agencies that want client records, projects, a portal, and invoicing ready to use, not assembled from scratch",
    "Teams who tried building a client tracker in Notion and found it drifted out of sync as templates changed",
    "Agencies whose clients need a branded, dedicated place to check status — not a shared or guest view into an internal workspace",
  ],
  competitorBestFor: [
    "Teams that want a single tool for docs, wikis, notes, and light databases beyond just client work",
    "Teams that enjoy building and iterating on their own systems from flexible primitives",
    "Organizations whose needs span far beyond client management — internal knowledge base, roadmaps, meeting notes, personal task lists",
  ],

  whenSarionFits: [
    {
      title: "You want client management to just work",
      description:
        "If setting up and maintaining a client-tracking database is itself the friction, a purpose-built structure removes that ongoing maintenance entirely.",
    },
    {
      title: "Clients need their own dedicated view",
      description:
        "Sarion's branded client portal is separate from your internal workspace by design, so clients see only what's meant for them without sharing pages or managing permissions per page.",
    },
    {
      title: "Invoicing needs to live with the client record",
      description:
        "If invoices currently live in a separate tool from your client notes and projects, tying them to one record removes a manual reconciliation step Notion doesn't handle natively.",
    },
  ],
  whenCompetitorFits: [
    {
      title: "You want a single tool for docs, notes, and light databases beyond just client work",
      description:
        "Notion's strength is being one place for company knowledge, not just client data — wikis, meeting notes, and internal docs live alongside anything else you build there.",
    },
    {
      title: "You enjoy building your own systems from primitives",
      description:
        "Notion's databases, relations, and templates let teams design a client tracker shaped exactly to their process. Sarion is intentionally the opposite — a fixed structure with nothing to design.",
    },
    {
      title: "Your team already lives in Notion for everything else",
      description:
        "If Notion already holds your internal docs and processes, keeping client tracking there too avoids adding a second tool, even if it means more setup work.",
    },
  ],

  featureMatrix: [
    { category: "Client management (CRM)", sarion: "Purpose-built client records, ready on day one", competitor: "Not a core feature — built from a generic database template" },
    { category: "Task & project tracking", sarion: "Included, scoped per client", competitor: "Flexible, database- and page-based, general-purpose" },
    { category: "Client portal", sarion: "Built in, branded, separate from internal workspace", competitor: "Not a native feature — approximated with shared pages or guest access" },
    { category: "Invoicing", sarion: "Built in, tied to the client record", competitor: "Not built in" },
    { category: "Structure vs. flexibility", sarion: "Fixed structure, little to configure", competitor: "Blank canvas — structure is entirely up to the team" },
    { category: "Best suited for", sarion: "Client-facing agency operations", competitor: "Company-wide docs, wikis, notes, and custom databases" },
  ],

  workflowComparison: {
    agencyWorkflow: [
      {
        category: "Where client work lives",
        sarion: "One client record holding projects, notes, and invoices together",
        competitor: "Wherever the team designs it — typically a database page linked to other pages",
      },
    ],
    clientManagement: [
      {
        category: "Client records",
        sarion: "Native — contacts, history, notes per client",
        competitor: "Built manually as a database with custom properties and templates",
      },
    ],
    projectManagement: [
      {
        category: "Task and status tracking",
        sarion: "Straightforward, scoped per client",
        competitor: "Flexible databases and views, but structure and upkeep are the team's responsibility",
      },
    ],
    portal: [
      {
        category: "Client-facing view",
        sarion: "Branded portal built in, separate from your internal workspace",
        competitor: "No native client portal; sharing usually means giving clients access to specific internal pages",
      },
    ],
    reporting: [
      {
        category: "Client status reporting",
        sarion: "Drawn from the same client/project record",
        competitor: "Custom dashboards and views built manually from the underlying databases",
      },
    ],
    automation: [
      {
        category: "Internal automation",
        sarion: "Basic, focused on client-facing reminders (overdue invoices, stale projects)",
        competitor: "Limited native automation, often extended with third-party integrations",
      },
    ],
  },

  pricingPhilosophy:
    "Notion prices around being a broad, general-purpose workspace — a single subscription can cover docs, wikis, personal notes, and whatever databases a team builds, which is real value for teams already using it that way. Sarion prices around a narrower job: running agency client work, with a portal and invoicing included rather than built by hand. The right comparison isn't which tool has more capability per dollar — it's whether you need a flexible workspace or a fixed client-operations structure.",

  migrationSteps: [
    { step: "Export your client database from Notion", description: "Pull your client tracker, along with any linked project or notes databases, out of Notion before switching." },
    { step: "Map Notion database rows to Sarion clients", description: "Each row in your client database typically becomes one Sarion client record." },
    { step: "Recreate project statuses in Sarion's fixed structure", description: "Bring over active project statuses without recreating the custom properties and views you built in Notion." },
    { step: "Invite clients to the portal", description: "Once client records are clean, turn on branded client portal access as the final step." },
  ],

  faqs: [
    {
      question: "Is Sarion trying to replace Notion entirely?",
      answer:
        "No. If your team relies on Notion for company-wide docs, wikis, or notes beyond client work, Sarion isn't built to replace that. It's built specifically for client records, the portal, and invoicing.",
    },
    {
      question: "Can I use both Notion and Sarion together?",
      answer:
        "Many teams do — Notion for internal docs and knowledge, Sarion for client records, the portal, and invoicing. There's no built-in integration between them today, so this means keeping the two in sync manually where they overlap.",
    },
    {
      question: "Does Notion have a client portal?",
      answer:
        "Not as a dedicated, branded feature. Teams sometimes share specific pages or databases with clients as a workaround, but it's not a purpose-built portal separate from the internal workspace the way Sarion's is.",
    },
    {
      question: "Why would I choose Sarion over a flexible tool like Notion?",
      answer:
        "If building and maintaining your own client-tracking system isn't something you want to spend time on, a fixed, purpose-built structure means there's nothing to design — client management, a portal, and invoicing are ready from the start.",
    },
  ],

  relatedBlogSlugs: [
    "what-is-a-client-portal",
    "signs-your-agency-has-outgrown-spreadsheets",
    "how-to-choose-an-agency-crm",
  ],
  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedIndustrySlugs: ["marketing-agencies", "design-agencies", "consultants"],
  relatedComparisonSlugs: ["clickup", "monday", "hubspot"],
};

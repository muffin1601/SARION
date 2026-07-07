import type { Resource } from "../types";

export const crmMigrationChecklist: Resource = {
  slug: "crm-migration-checklist",
  title: "CRM Migration Checklist",
  category: "checklists",
  tags: ["crm", "migration", "onboarding"],
  status: "live",
  featured: true,
  popular: true,
  addedDate: "2026-06-15",
  metaTitle: "CRM Migration Checklist for Agencies",
  metaDescription:
    "A step-by-step checklist for moving client data out of spreadsheets or a generic CRM without losing history.",
  heroHeadline: "Migrate to a CRM without losing a single client detail",
  heroSubhead:
    "Every agency that's outgrown a spreadsheet asks the same question: how do we move without breaking something? This checklist is the answer, in order.",

  overview:
    "This is the exact sequence for moving client data — contacts, project history, invoices — out of a spreadsheet or a generic CRM and into a structured system, without losing anything along the way. It's written for the actual failure points of a migration, not a generic 'import your data' step.",
  whyItMatters:
    "Most agencies don't put off migrating because the new tool is bad — they put it off because migrating feels risky. A messy migration means duplicate client records, lost history, and a team that doesn't trust the new system on day one. Following a fixed order (export → clean → map → import active clients first → turn on the portal last) removes almost all of that risk.",
  whoShouldUseIt: [
    "Agencies moving off a shared spreadsheet with more than a handful of active clients",
    "Agencies consolidating multiple trackers (one per client, or one per team member) into one system",
    "Anyone who has tried a migration before and had it go badly",
  ],
  howToUseIt: [
    { step: "Block half a day", description: "Migrations go better uninterrupted — treat it as a single focused session, not something squeezed between calls." },
    { step: "Work through the checklist in order", description: "The order matters — exporting before cleaning, and cleaning before importing, prevents the most common mistakes." },
    { step: "Don't invite clients until the end", description: "Get your own team comfortable with the new client records before anyone outside the agency sees them." },
  ],

  fileType: "PDF checklist",
  estimatedTimeSaved: "3-5 hours of migration rework avoided",
  whatsIncluded: [
    "The 8-step migration sequence",
    "A field-mapping worksheet (spreadsheet column → CRM field)",
    "A pre-migration data cleanup checklist",
    "Guidance on when to turn on client portal access",
  ],
  previewContent: [
    "1. Export everything before you touch anything",
    "2. Normalize your client list",
    "3. Map your fields",
    "4. Migrate active clients first",
    "5. Recreate your pipeline stages",
    "6. Bring over project and invoice history",
    "7. Invite your team before clients",
    "8. Turn on the client portal last",
  ],

  faqs: [
    {
      question: "Isn't a spreadsheet good enough for a small agency?",
      answer:
        "For a single client, sure. Past 3-4 active clients, the update-and-reconcile overhead of keeping a spreadsheet in sync with reality starts costing more time than it saves.",
    },
    {
      question: "How long does a migration actually take?",
      answer:
        "For most agencies under 20 clients, half a day of focused work — most of that is cleaning up the spreadsheet before import, not the import itself.",
    },
    {
      question: "Will I lose my project and invoice history?",
      answer:
        "Not if you follow the order in this checklist — bringing over project and invoice history as notes on each client record, even in summary form, is one of the 8 steps.",
    },
    {
      question: "When should I give clients portal access?",
      answer:
        "Last. Get your team comfortable navigating clean client records for a few days before anyone outside the agency logs in.",
    },
  ],

  relatedResourceSlugs: ["client-onboarding-template", "discovery-call-checklist"],
  relatedBlogSlugs: ["what-is-agency-crm", "signs-your-agency-has-outgrown-spreadsheets", "how-to-choose-an-agency-crm"],
  relatedComparisonSlugs: ["agency-crm-vs-spreadsheets", "hubspot"],
  relatedIndustrySlugs: ["freelancers", "consultants"],
};

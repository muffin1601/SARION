import type { ToolContent } from "../types";

export const agencyCrmRoi: ToolContent = {
  slug: "agency-crm-roi",
  title: "Agency CRM ROI Calculator",
  featured: true,
  addedDate: "2026-07-08",
  metaTitle: "Agency CRM ROI Calculator",
  metaDescription:
    "Estimate how many hours and dollars a week your agency loses to manual status updates and invoice admin — and what a client portal could save.",
  heroHeadline: "What is manual client admin actually costing you?",
  heroSubhead:
    "Status-update emails and manual invoicing feel free because there's no bill for them. This calculator puts a real number on the time.",

  whatItMeans:
    "\"CRM ROI\" here means the annual cost of the manual admin work a CRM/portal removes — time spent writing status updates and chasing invoices by hand — compared against what a structured system could save.",
  whyItMatters:
    "Agencies rarely track this cost because it's spread across many small interruptions rather than one big line item. Adding it up over a year usually reveals it's bigger than the cost of the tool that would remove it.",
  benchmarks: [
    { label: "Typical status-update time (small agency)", value: "3-6 hrs/week" },
    { label: "Typical invoice admin time", value: "1-3 hrs/week" },
    { label: "Realistic time saved with a portal + tied invoicing", value: "50-70% of that time" },
  ],
  howToImprove: [
    "Move status updates to a place clients check themselves instead of writing them fresh each time.",
    "Tie invoicing to the same client/project record so nothing needs manual reconciliation.",
    "Track actual hours spent on admin for two weeks before estimating — most agencies underestimate it.",
  ],
  commonMistakes: [
    "Only counting the time spent writing the update, not the interruption cost of context-switching back to it.",
    "Assuming a portal saves 100% of admin time — some manual communication is still worth keeping.",
    "Not re-measuring after a change, so the estimate never gets corrected against reality.",
  ],

  faqs: [
    {
      question: "Is this estimate exact?",
      answer:
        "No — it's a directional estimate built on stated, conservative assumptions (shown next to each result). Use your own numbers and re-run it after making a change.",
    },
    {
      question: "What if my agency doesn't do manual status updates?",
      answer:
        "Then this specific cost may be small for you — set those fields low or to zero. The calculator is only useful if the inputs reflect your actual agency.",
    },
    {
      question: "Does this calculator require me to sign up?",
      answer:
        "No — the calculator runs entirely in your browser. Signing up is optional if you want the results emailed to you.",
    },
  ],

  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedBlogSlugs: ["what-is-agency-crm", "reduce-client-status-update-emails", "invoicing-best-practices-for-agencies"],
  relatedIndustrySlugs: ["freelancers", "consultants"],
  relatedComparisonSlugs: ["agency-crm-vs-spreadsheets", "hubspot"],
  relatedToolSlugs: ["team-cost-calculator", "client-lifetime-value-calculator"],
};

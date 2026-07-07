import type { ToolContent } from "../types";

export const projectProfitabilityCalculatorContent: ToolContent = {
  slug: "project-profitability-calculator",
  title: "Project Profitability Calculator",
  featured: false,
  addedDate: "2026-07-08",
  metaTitle: "Project Profitability Calculator",
  metaDescription:
    "Find out how much profit a fixed-fee project actually leaves once labor, overhead, and expenses are counted — and what your effective hourly rate really is.",
  heroHeadline: "Is this project actually profitable?",
  heroSubhead:
    "A big project fee can hide a thin margin once real hours and costs are counted. This calculator shows the profit, margin, and effective hourly rate behind the number.",

  whatItMeans:
    "Project profitability is what's left of the fee after labor cost and direct expenses are subtracted, expressed both as a dollar profit and a margin percentage — plus the effective hourly rate the fee actually works out to.",
  whyItMatters:
    "Agencies often quote a fee based on gut feel or the client's budget rather than the hours it will really take. Without checking the math, a project that looks like a win on paper can quietly cost the agency money once labor is counted.",
  benchmarks: [
    { label: "Target project margin", value: "20-35% after direct costs" },
    { label: "Healthy effective hourly rate", value: "At or above standard billing rate" },
    { label: "Buffer for scope creep", value: "10-15% of estimated hours" },
  ],
  howToImprove: [
    "Compare the effective hourly rate against your agency's standard billing rate before signing the scope.",
    "Add a scope-creep buffer to hour estimates rather than quoting the bare minimum.",
    "Track actual hours against the estimate once the project closes to sharpen future quotes.",
  ],
  commonMistakes: [
    "Underestimating hours because the estimate only covers the visible deliverable work.",
    "Forgetting non-billable project management, meetings, and revisions when estimating hours.",
    "Never comparing the effective hourly rate back to the agency's standard hourly rate.",
  ],

  faqs: [
    {
      question: "What counts as 'other expenses' in this calculator?",
      answer:
        "Anything billed directly to the project outside of team time — software licenses, stock assets, contractor fees, or ad spend passed through to the client.",
    },
    {
      question: "Should I use my billing rate or my actual cost for team hourly cost?",
      answer:
        "Use actual loaded cost (salary plus overhead divided into hours), not the rate you bill clients. That's what shows true profit rather than revenue.",
    },
    {
      question: "What if the margin comes out negative?",
      answer:
        "That means the project is projected to lose money at the current fee and hour estimate — worth renegotiating scope, fee, or both before starting.",
    },
  ],

  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedBlogSlugs: ["how-to-price-agency-services", "agency-crm-features-that-actually-matter", "invoicing-best-practices-for-agencies"],
  relatedIndustrySlugs: ["marketing-agencies", "design-agencies"],
  relatedComparisonSlugs: ["asana", "agency-crm-vs-spreadsheets"],
  relatedToolSlugs: ["retainer-pricing-calculator", "hourly-rate-calculator"],
};

import type { ToolContent } from "../types";

export const retainerPricingCalculatorContent: ToolContent = {
  slug: "retainer-pricing-calculator",
  title: "Retainer Pricing Calculator",
  featured: false,
  addedDate: "2026-07-08",
  metaTitle: "Retainer Pricing Calculator",
  metaDescription:
    "Work out what to charge for a monthly retainer based on included hours, team cost, and your target margin — plus the profit and effective rate it produces.",
  heroHeadline: "What should this retainer actually cost?",
  heroSubhead:
    "Retainers get underpriced when they're quoted off gut feel instead of hours and margin. This calculator turns included hours and a target margin into a defensible monthly price.",

  whatItMeans:
    "Retainer pricing here means working backward from the cost of the included hours and a target profit margin to a recommended monthly price, then showing the profit and effective hourly rate that price produces.",
  whyItMatters:
    "Retainers are easy to underprice because the monthly number feels abstract compared to a project fee. Pricing off cost and margin instead of a round number protects profitability as scope or team cost changes.",
  benchmarks: [
    { label: "Typical agency retainer margin", value: "25-40%" },
    { label: "Healthy overage buffer", value: "10-15% of included hours" },
    { label: "Retainer scope review cadence", value: "Quarterly" },
  ],
  howToImprove: [
    "Build in a buffer for overage hours so a heavier month doesn't erase the margin.",
    "Review retainer scope every quarter to keep included hours aligned with actual client demand.",
    "Compare the effective hourly rate against project work rates to keep pricing consistent across both.",
  ],
  commonMistakes: [
    "Pricing retainers the same as one-off project work without adjusting for ongoing commitment and risk.",
    "Not clearly defining what falls outside the retainer scope, leading to scope creep at no extra cost.",
    "Letting included hours creep upward over time without renegotiating the price.",
  ],

  faqs: [
    {
      question: "Why cap the desired margin at 95%?",
      answer:
        "As margin approaches 100%, the pricing formula divides by a number approaching zero, producing an unrealistic price. Capping it keeps the recommendation sane.",
    },
    {
      question: "Does this include overage hours?",
      answer:
        "No — this prices only the included hours. Add a separate overage rate or buffer for months that exceed the included hours.",
    },
    {
      question: "How often should I re-run this?",
      answer:
        "Whenever team hourly cost changes materially, or at your quarterly scope review, so the retainer price keeps pace with real costs.",
    },
  ],

  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedBlogSlugs: ["how-to-price-agency-services", "invoicing-best-practices-for-agencies", "client-communication-best-practices"],
  relatedIndustrySlugs: ["marketing-agencies", "consultants"],
  relatedComparisonSlugs: ["hubspot", "agency-crm-vs-spreadsheets"],
  relatedToolSlugs: ["project-profitability-calculator", "hourly-rate-calculator"],
};

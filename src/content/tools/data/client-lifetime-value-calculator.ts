import type { ToolContent } from "../types";

export const clientLifetimeValueCalculatorContent: ToolContent = {
  slug: "client-lifetime-value-calculator",
  title: "Client Lifetime Value Calculator",
  addedDate: "2026-07-08",
  metaTitle: "Client Lifetime Value Calculator",
  metaDescription:
    "Estimate the true lifetime profit an average client generates for your agency, based on monthly revenue, retention, and margin.",
  heroHeadline: "What is an average client really worth over time?",
  heroSubhead:
    "First-project value alone understates a client's real worth. This calculator projects lifetime revenue and profit based on how long clients typically stay.",

  whatItMeans:
    "\"Client lifetime value\" here means the total profit an average client generates over their full relationship with your agency, after accounting for gross margin — not just the value of their first project.",
  whyItMatters:
    "Decisions about acquisition spend, retention investment, and pricing all depend on knowing what a client is worth over their full lifespan, not just their first invoice.",
  benchmarks: [
    { label: "Typical small-agency client retention", value: "12-24 months" },
    { label: "Typical agency gross margin", value: "30-50% after direct delivery costs" },
    { label: "Retention as a lever", value: "A few extra months of retention often outweighs a rate increase" },
  ],
  howToImprove: [
    "Use this number to set a sane ceiling on customer-acquisition cost — spending more than a client's lifetime value to win them is a losing trade.",
    "Invest in retention efforts (onboarding, communication, portals) since they directly extend the retention months in this formula.",
    "Recalculate periodically as your margin and retention numbers shift with team and pricing changes.",
  ],
  commonMistakes: [
    "Only looking at first-project value and ignoring how long clients typically stay.",
    "Ignoring margin entirely and using raw revenue as if it were profit.",
    "Not accounting for churn risk when estimating average retention.",
  ],

  faqs: [
    {
      question: "How should I estimate my gross margin?",
      answer:
        "Take total client revenue over a period, subtract direct delivery costs (team time on that work, contractor costs, tools tied directly to delivery), and divide by revenue. Overhead like rent isn't included.",
    },
    {
      question: "What if retention varies a lot by client type?",
      answer:
        "Run this calculator separately for each client segment (e.g. retainer vs. project clients) for a more accurate picture than one blended average.",
    },
    {
      question: "How does this relate to lead value?",
      answer:
        "Lead value estimates what a new lead is worth from its first project. This calculator shows the fuller picture once that lead becomes a client — use both together.",
    },
  ],

  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedBlogSlugs: ["how-to-price-agency-services", "client-communication-best-practices", "signs-your-agency-has-outgrown-spreadsheets"],
  relatedIndustrySlugs: ["marketing-agencies", "consultants"],
  relatedComparisonSlugs: ["hubspot", "zoho-crm"],
  relatedToolSlugs: ["lead-value-calculator", "agency-profit-calculator"],
};

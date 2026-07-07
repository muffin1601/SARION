import type { ToolContent } from "../types";

export const teamCostCalculatorContent: ToolContent = {
  slug: "team-cost-calculator",
  title: "Team Cost Calculator",
  featured: false,
  addedDate: "2026-07-08",
  metaTitle: "Team Cost Calculator",
  metaDescription:
    "Calculate your agency's true fully-loaded team cost — including overhead — so pricing and hiring decisions are based on real numbers, not base salary.",
  heroHeadline: "What does your team really cost?",
  heroSubhead:
    "Base salary is only part of the story. This calculator adds overhead to show the fully-loaded annual, monthly, and per-person cost of your team.",

  whatItMeans:
    "Fully-loaded team cost is total compensation plus overhead — benefits, taxes, tools, and other costs of employing someone — rolled up across the whole team and expressed annually, monthly, and per member.",
  whyItMatters:
    "Pricing and hiring decisions based on base salary alone consistently understate what a team actually costs. Knowing the fully-loaded number is the floor every rate and retainer should be measured against.",
  benchmarks: [
    { label: "Typical fully-loaded overhead", value: "20-35% above base salary" },
    { label: "Overhead includes", value: "Benefits, payroll tax, software, equipment" },
    { label: "Review cadence for overhead assumptions", value: "Annually" },
  ],
  howToImprove: [
    "Use the fully-loaded cost as the floor for pricing decisions, not base salary alone.",
    "Revisit overhead assumptions at least once a year as benefits and tool costs change.",
    "Compare cost per member against revenue per member to catch a team that's grown out of balance with revenue.",
  ],
  commonMistakes: [
    "Pricing services based on salary alone, ignoring the real cost of benefits, taxes, and tools.",
    "Not accounting for non-billable roles (ops, sales, management) when estimating overall team cost.",
    "Using a single overhead percentage for a team with wildly different benefits packages across roles.",
  ],

  faqs: [
    {
      question: "What should I include in 'overhead percent'?",
      answer:
        "Payroll taxes, benefits, software licenses, equipment, office costs, and any other cost of employing someone beyond their base pay.",
    },
    {
      question: "Should contractors be included in team size?",
      answer:
        "Yes, if you want a full picture of delivery capacity cost — just use their effective annual cost in place of a salary.",
    },
    {
      question: "How is this different from an hourly rate calculator?",
      answer:
        "This calculates total team cost at the org level; an hourly rate calculator works out what to bill for an individual's time. Use both together when setting prices.",
    },
  ],

  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedBlogSlugs: ["how-to-price-agency-services", "signs-your-agency-has-outgrown-spreadsheets", "agency-crm-features-that-actually-matter"],
  relatedIndustrySlugs: ["marketing-agencies", "web-development-agencies"],
  relatedComparisonSlugs: ["monday", "agency-crm-vs-spreadsheets"],
  relatedToolSlugs: ["project-profitability-calculator", "retainer-pricing-calculator"],
};

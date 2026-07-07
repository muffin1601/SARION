import type { ToolContent } from "../types";

export const hourlyRateCalculatorContent: ToolContent = {
  slug: "hourly-rate-calculator",
  title: "Hourly Rate Calculator",
  addedDate: "2026-07-08",
  metaTitle: "Hourly Rate Calculator",
  metaDescription:
    "Calculate the minimum hourly rate you need to charge to hit your income goal after overhead costs and realistic billable hours.",
  heroHeadline: "What should you actually be charging per hour?",
  heroSubhead:
    "Picking a rate off a gut feeling usually leaves money on the table. This calculator works backward from your income goal.",

  whatItMeans:
    "This is the minimum hourly rate needed to cover your desired annual income plus business overhead, divided across the hours you can realistically bill in a year — not your total working hours.",
  whyItMatters:
    "Rates based on competitor pricing or guesswork often don't account for overhead or non-billable time, which quietly erodes income even when the calendar looks full.",
  benchmarks: [
    { label: "Typical billable ratio (solo operators)", value: "50-65% of a 40-hour week" },
    { label: "Typical annual overhead (solo/small team)", value: "10-20% of revenue" },
    { label: "Recommended buffer above bare minimum rate", value: "10-20%" },
  ],
  howToImprove: [
    "Add a buffer above the bare minimum rate to absorb slow months and negotiation.",
    "Track your actual billable hours for a month before assuming your current estimate is accurate.",
    "Revisit this rate whenever overhead costs rise or your income goal changes.",
  ],
  commonMistakes: [
    "Billing as if 100% of working hours are billable, which is almost never true.",
    "Forgetting overhead entirely and pricing only against desired take-home income.",
    "Undercharging to \"stay competitive\" without checking whether the rate actually covers costs.",
  ],

  faqs: [
    {
      question: "What counts as billable hours per week?",
      answer:
        "Only the hours spent on client-chargeable work. Sales calls, admin, and internal projects don't count, even though they take real time.",
    },
    {
      question: "Should I include savings or taxes in desired annual income?",
      answer:
        "Yes — treat desired annual income as everything you want this work to fund, including taxes and savings, not just spending money.",
    },
    {
      question: "Is this rate what I should quote clients?",
      answer:
        "Treat it as a floor. Add a buffer for slow periods and negotiation room before quoting a final rate.",
    },
  ],

  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedBlogSlugs: ["how-to-price-agency-services", "what-is-agency-crm", "invoicing-best-practices-for-agencies"],
  relatedIndustrySlugs: ["freelancers", "consultants", "creative-agencies"],
  relatedComparisonSlugs: ["agency-crm-vs-spreadsheets"],
  relatedToolSlugs: ["agency-profit-calculator", "retainer-pricing-calculator", "project-profitability-calculator"],
};

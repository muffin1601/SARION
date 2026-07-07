import type { ToolContent } from "../types";

export const clientCapacityCalculatorContent: ToolContent = {
  slug: "client-capacity-calculator",
  title: "Client Capacity Calculator",
  addedDate: "2026-07-08",
  metaTitle: "Client Capacity Calculator",
  metaDescription:
    "Find out how many clients your team can realistically support based on headcount, working hours, and a realistic utilization target.",
  heroHeadline: "How many clients can your team actually handle?",
  heroSubhead:
    "Taking on one more client feels easy until the team is quietly overloaded. This calculator estimates a realistic capacity ceiling.",

  whatItMeans:
    "Capacity is your team's total weekly working hours multiplied by a realistic utilization target — the share of time that goes to billable client work after meetings, admin, and internal projects.",
  whyItMatters:
    "Agencies that size capacity off total working hours instead of realistic utilization consistently over-promise, leading to missed deadlines, burnout, and client churn.",
  benchmarks: [
    { label: "Typical utilization target", value: "65-80%" },
    { label: "High-performing team utilization", value: "up to 85%" },
    { label: "Danger zone (unsustainable)", value: "above 90%" },
  ],
  howToImprove: [
    "Raise utilization gradually by trimming unnecessary internal meetings before assuming you need to hire.",
    "Redistribute hours away from low-value clients before adding new ones to your roster.",
    "Build in ramp-up time for new hires — they don't add full capacity from day one.",
  ],
  commonMistakes: [
    "Assuming 100% utilization is achievable — no team bills every working hour.",
    "Ignoring ramp-up time when a new hire joins, which overstates near-term capacity.",
    "Sizing capacity off total headcount rather than actual average hours worked per person.",
  ],

  faqs: [
    {
      question: "What utilization target should I use?",
      answer:
        "Most agencies realistically sustain 65-80%. Start there and adjust based on how much non-billable admin and internal work your team actually does.",
    },
    {
      question: "Does this account for vacation and sick time?",
      answer:
        "Not directly — lower your average hours per week per member slightly to account for typical time off across the year.",
    },
    {
      question: "What if different clients need very different amounts of time?",
      answer:
        "This calculator uses an average. For a more precise picture, run it separately for groups of similar-sized clients.",
    },
  ],

  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedBlogSlugs: [
    "signs-your-agency-has-outgrown-spreadsheets",
    "agency-crm-features-that-actually-matter",
    "how-to-onboard-a-new-client-checklist",
  ],
  relatedIndustrySlugs: ["marketing-agencies", "web-development-agencies", "seo-agencies"],
  relatedComparisonSlugs: ["clickup", "asana"],
  relatedToolSlugs: ["team-cost-calculator", "project-timeline-estimator", "agency-profit-calculator"],
};

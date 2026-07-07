import type { ToolContent } from "../types";

export const leadValueCalculatorContent: ToolContent = {
  slug: "lead-value-calculator",
  title: "Lead Value Calculator",
  addedDate: "2026-07-08",
  metaTitle: "Lead Value Calculator",
  metaDescription:
    "Find out what an average inbound or outbound lead is actually worth to your agency's pipeline, based on your real conversion rate and first project value.",
  heroHeadline: "What is one more lead actually worth?",
  heroSubhead:
    "Marketing and sales spend only makes sense against a real number. This calculator turns your lead volume and conversion rate into a dollar figure per lead.",

  whatItMeans:
    "\"Lead value\" here means the average dollar value your agency's pipeline gets from a single lead, once you account for the share that convert to paying clients and what a new client is typically worth.",
  whyItMatters:
    "Agencies often spend on lead generation without a clear number for what a lead is worth in return, which makes it impossible to judge whether ad spend, referral incentives, or outreach hours are paying off.",
  benchmarks: [
    { label: "Typical lead-to-client conversion range", value: "10-25% depending on lead source and follow-up speed" },
    { label: "Faster follow-up impact", value: "Responding within an hour can meaningfully lift conversion vs. next-day" },
    { label: "First project value spread", value: "Varies widely by service line and client size" },
  ],
  howToImprove: [
    "Use the value-per-lead number as a ceiling for what you're willing to spend to acquire one more lead.",
    "Track conversion rate separately by lead source — referrals, ads, and cold outreach rarely convert the same.",
    "Follow up with new leads faster; speed-to-first-response is one of the most controllable levers on this number.",
  ],
  commonMistakes: [
    "Treating all leads as equally valuable regardless of source or fit.",
    "Not tracking conversion rate at all, and guessing at it instead.",
    "Valuing a lead only by its first project instead of its lifetime potential as a client.",
  ],

  faqs: [
    {
      question: "Does this account for lead quality differences?",
      answer:
        "Not directly — it uses a single blended conversion rate. For a more accurate picture, run this calculator separately for each lead source using that source's own conversion rate.",
    },
    {
      question: "Should I use first project value or lifetime value?",
      answer:
        "This calculator uses first project value to keep the estimate conservative and easy to source. Use the Client Lifetime Value Calculator to see the fuller picture once a lead converts.",
    },
    {
      question: "What if my conversion rate is 0%?",
      answer:
        "Then this tool will correctly show $0 value per lead — that's a signal to look at your qualification or follow-up process before spending more on lead generation.",
    },
  ],

  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedBlogSlugs: ["how-to-price-agency-services", "client-communication-best-practices", "what-is-agency-crm"],
  relatedIndustrySlugs: ["marketing-agencies", "freelancers"],
  relatedComparisonSlugs: ["hubspot", "agency-crm-vs-spreadsheets"],
  relatedToolSlugs: ["client-lifetime-value-calculator", "agency-crm-roi"],
};

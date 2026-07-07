import type { Resource } from "../types";

export const weeklyAgencyOperationsChecklist: Resource = {
  slug: "weekly-agency-operations-checklist",
  title: "Weekly Agency Operations Checklist",
  category: "checklists",
  tags: ["operations", "productivity"],
  status: "live",
  featured: true,
  popular: false,
  addedDate: "2026-07-08",
  metaTitle: "Weekly Agency Operations Checklist",
  metaDescription:
    "A recurring weekly checklist for agency owners and ops leads: overdue invoices, project status across clients, stalled proposals, and team capacity.",
  heroHeadline: "The 30-minute weekly check that catches problems while they're small",
  heroSubhead:
    "Overdue invoices, stalled proposals, and quietly overloaded team members rarely announce themselves. This is the recurring check that surfaces them early.",

  overview:
    "This is a recurring weekly checklist for agency owners and operations leads — not a one-time setup task, but a fixed 30-minute review meant to happen every week. It covers four areas that tend to drift silently if no one checks them on a schedule: overdue invoices, project status across every active client (not just the ones making noise), proposals that have gone quiet, and whether any team member is quietly overloaded.",
  whyItMatters:
    "The problems that hurt agencies most rarely show up as emergencies — they show up as small drifts nobody was watching. An invoice fifteen days overdue, a client project that's gone quiet for two weeks, a proposal sent three weeks ago with no follow-up, a team member who's been over capacity for a month. None of these trigger an alarm on their own. A fixed weekly review is the cheapest way to catch them while they're still small and easy to fix.",
  whoShouldUseIt: [
    "Agency owners running operations without a dedicated ops or finance hire",
    "Operations leads responsible for keeping projects, invoicing, and pipeline healthy across the whole client roster",
    "Small agencies where nothing gets checked unless someone deliberately schedules the check",
  ],
  howToUseIt: [
    { step: "Put it on the calendar as a recurring event", description: "Same day, same time, every week — a review that depends on remembering to do it eventually stops happening." },
    { step: "Go client by client, not just by exception", description: "Quiet clients drift the most, precisely because they're not generating alerts or complaints." },
    { step: "Flag issues immediately, don't just note them", description: "An overdue invoice or a stalled proposal found during the review should get a follow-up action the same day, not next week." },
  ],

  fileType: "PDF checklist",
  estimatedTimeSaved: "1-2 hours per week of reactive firefighting avoided",
  whatsIncluded: [
    "The four-part weekly review structure (invoices, projects, proposals, capacity)",
    "A quiet-client scan method for catching accounts that have gone silent",
    "A team capacity check to spot overload before it causes missed deadlines",
    "A follow-up action template for anything the review turns up",
  ],
  previewContent: [
    "1. Review all overdue and soon-to-be-due invoices",
    "2. Check project status for every active client, not just squeaky ones",
    "3. Scan for clients who've gone quiet longer than usual",
    "4. Follow up on proposals sent more than a week ago with no response",
    "5. Check team capacity — who's overloaded, who has room",
    "6. Confirm this week's deliverable dates are still realistic",
    "7. Note anything that needs owner attention before next week's review",
  ],

  faqs: [
    {
      question: "Why weekly instead of daily or monthly?",
      answer:
        "Daily is too frequent to sustain and mostly re-checks the same things. Monthly is too slow — a stalled proposal or overdue invoice can sit for weeks before anyone notices. Weekly is the interval where problems are still small but visible.",
    },
    {
      question: "How long should this actually take each week?",
      answer:
        "For most agencies with 10-20 active clients, 20-30 minutes once you have a consistent place to look at invoices, projects, and proposals together.",
    },
    {
      question: "What counts as a client who's 'gone quiet'?",
      answer:
        "Any active client with no meaningful update, deliverable, or communication in the last week or two, especially compared to their usual pace. Quiet doesn't always mean fine — it sometimes means unhappy.",
    },
    {
      question: "Isn't team capacity a people-management issue, not an ops one?",
      answer:
        "It's both. A weekly glance at who's carrying too much work catches burnout risk and missed-deadline risk at the same time, before either turns into a client-facing problem.",
    },
  ],

  relatedResourceSlugs: ["agency-dashboard-template", "agency-kpi-tracker", "agency-sop-template"],
  relatedBlogSlugs: ["automating-agency-admin-work", "invoicing-best-practices-for-agencies", "reduce-client-status-update-emails"],
  relatedComparisonSlugs: ["clickup", "asana"],
  relatedIndustrySlugs: ["marketing-agencies", "consultants"],
};

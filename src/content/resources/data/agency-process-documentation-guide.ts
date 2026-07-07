import type { Resource } from "../types";

export const agencyProcessDocumentationGuide: Resource = {
  slug: "agency-process-documentation-guide",
  title: "Agency Process Documentation Guide",
  category: "guides",
  tags: ["operations", "sops", "guide"],
  status: "live",
  featured: false,
  popular: false,
  addedDate: "2026-07-08",
  metaTitle: "Agency Process Documentation Guide",
  metaDescription:
    "How to decide which agency processes are worth documenting, how much detail is actually useful, and how to get your team to use the SOPs you write.",
  heroHeadline: "The thinking behind good SOPs, not just the template",
  heroSubhead:
    "Documenting everything is as useless as documenting nothing. This guide covers what's actually worth writing down, how much detail to include, and how to keep it from rotting in a folder no one opens.",

  overview:
    "This is the strategic companion to a blank SOP template, not another fill-in-the-blank document. It covers the judgment calls that determine whether documentation actually helps: which processes are worth the time to write down, how much detail is useful versus wasted, how to stop SOPs from going stale as your agency's tools and team change, and how to get people to actually open the doc instead of just asking a teammate.",
  whyItMatters:
    "Agencies tend to swing between two failure modes: no documentation at all, so every process lives in one person's head, or documentation overload, where every micro-task gets a five-page doc nobody reads. Both waste time — the first through repeated re-explaining and inconsistent work, the second through the effort of maintaining docs nobody uses. The agencies that get real value from SOPs are deliberate about which processes earn a written doc and how much detail that doc actually needs.",
  whoShouldUseIt: [
    "Agency leads deciding where to spend limited time on documentation first",
    "Teams with a folder of old SOPs that no longer match how the agency actually works",
    "Anyone who's written SOPs before that nobody on the team actually follows",
  ],
  howToUseIt: [
    { step: "Audit before you write", description: "List the processes that currently only exist in someone's head or get re-explained often — that list is your documentation priority order, not an alphabetical or arbitrary one." },
    { step: "Match detail to risk and frequency", description: "A process run weekly by five people needs more precision than one run once a quarter by the same senior person — use the guide's detail framework to decide, section by section." },
    { step: "Build a review habit, not a one-time project", description: "Set a recurring check-in tied to real triggers (a tool change, a new hire, a process breaking) rather than a fixed calendar date that's easy to skip." },
  ],

  fileType: "PDF guide",
  estimatedTimeSaved: "Avoids the operational drag of undocumented tribal knowledge and unused, stale SOPs",
  whatsIncluded: [
    "A framework for scoring which processes are worth documenting first",
    "Guidance on right-sizing detail so SOPs stay useful instead of ignored",
    "A staleness-prevention system tied to real triggers, not calendar reminders",
    "Adoption tactics for getting a team to actually reference SOPs day to day",
  ],
  previewContent: [
    "Which processes are actually worth documenting",
    "How much detail is enough (and when more detail hurts)",
    "Keeping SOPs from going stale",
    "Getting your team to actually use them",
    "Signs a process needs to be rewritten, not just reviewed",
    "Where documentation fits versus where it doesn't",
  ],

  faqs: [
    {
      question: "How is this different from the Agency SOP Template?",
      answer:
        "The template is the blank structure you fill in for a specific process. This guide is what to think about before and after you fill it in — which processes deserve a doc, how much detail to add, and how to keep it alive.",
    },
    {
      question: "Do we need to document every process we run?",
      answer:
        "No — documenting a process nobody repeats, or one only one senior person will ever run, usually isn't worth the time. This guide includes a scoring approach for prioritizing based on frequency, risk, and how many people touch the process.",
    },
    {
      question: "How do we know if an SOP is too detailed?",
      answer:
        "If people start skipping steps or paraphrasing instead of following it exactly, it's often over-specified for how the process actually gets used. The guide covers matching detail level to how often and by whom a process runs.",
    },
    {
      question: "What's the biggest reason SOPs go unused?",
      answer:
        "Usually that they went stale — the tool, the team, or the process itself changed and the doc didn't. The guide's review triggers are built around real changes instead of a maintenance calendar most teams don't keep up with.",
    },
  ],

  relatedResourceSlugs: ["agency-sop-template", "weekly-agency-operations-checklist", "agency-kpi-tracker"],
  relatedBlogSlugs: ["automating-agency-admin-work", "signs-your-agency-has-outgrown-spreadsheets"],
  relatedComparisonSlugs: ["notion", "agency-crm-vs-spreadsheets"],
  relatedIndustrySlugs: ["marketing-agencies", "creative-agencies"],
};

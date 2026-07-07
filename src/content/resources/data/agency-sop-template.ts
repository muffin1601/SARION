import type { Resource } from "../types";

export const agencySopTemplate: Resource = {
  slug: "agency-sop-template",
  title: "Agency SOP Template",
  category: "sops",
  tags: ["operations", "sops"],
  status: "live",
  featured: true,
  popular: false,
  addedDate: "2026-07-08",
  metaTitle: "Agency SOP Template",
  metaDescription:
    "A blank, fillable template for documenting any repeatable agency process — purpose, trigger, steps, owner, and exceptions.",
  heroHeadline: "Turn what's in your head into a process anyone can run",
  heroSubhead:
    "One structure for every SOP you'll ever write — client onboarding, project close-out, invoicing, offboarding. Fill in the blanks once, stop re-explaining the same process forever.",

  overview:
    "This is a blank SOP structure, not a filled-in example. Use the same five sections — purpose, trigger, steps, owner, exceptions — for every repeatable process in your agency, from 'how we onboard a client' to 'how we close out a project.' The value isn't in the specific wording, it's in having one consistent shape that makes any SOP fast to write and fast for someone else to follow without asking you questions.",
  whyItMatters:
    "Most agencies have their real processes living in one person's head, scattered across old Slack messages, or half-written in a doc nobody opens. That's fine until that person is on vacation, or the agency hires someone new, or a process changes and nobody remembers who to tell. A consistent SOP structure means new hires can run a process correctly on day one, and a process change only has to be written down once instead of re-explained to every new team member.",
  whoShouldUseIt: [
    "Agencies where one or two people are the only ones who know how a process actually works",
    "Teams that have tried writing SOPs before and ended up with inconsistent, half-finished docs",
    "Anyone onboarding a new hire and realizing there's nothing to hand them",
  ],
  howToUseIt: [
    { step: "Pick one process", description: "Start with whatever causes the most 'wait, how do we do this again?' Slack messages — usually onboarding, project close-out, or invoicing." },
    { step: "Fill in all five sections", description: "Purpose and trigger first — they force you to define when the process starts and why it exists — then steps, owner, and exceptions." },
    { step: "Have someone else run it cold", description: "The real test of an SOP is whether a teammate who's never done the task can follow it without asking you anything. If they get stuck, the SOP is missing a step, not the person." },
  ],

  fileType: "Google Doc template",
  estimatedTimeSaved: "2-3 hours per SOP versus writing one from a blank page",
  whatsIncluded: [
    "The 5-section fillable SOP structure (purpose, trigger, steps, owner, exceptions)",
    "Guidance notes under each section explaining what belongs there and what doesn't",
    "A worked example filled in for a sample process, for reference alongside the blank template",
    "A short 'is this documented well enough?' checklist to review a finished SOP against",
  ],
  previewContent: [
    "Purpose — why this process exists",
    "Trigger — when this process starts",
    "Steps — the sequence, numbered",
    "Who owns this — the role responsible, not a name",
    "Tools or records involved",
    "Common exceptions — what breaks the normal sequence",
    "Last reviewed — date and reviewer",
  ],

  faqs: [
    {
      question: "Isn't this just a fancy checklist?",
      answer:
        "A checklist tells you what to do. This template also tells you why the process exists, when it starts, who owns it, and what to do when something doesn't fit the normal case — the parts that usually only live in someone's head.",
    },
    {
      question: "How detailed should each step be?",
      answer:
        "Detailed enough that someone who has never done the task before can follow it without asking a question. If you find yourself explaining an unwritten 'obviously you'd also...' step out loud, add it to the template.",
    },
    {
      question: "What goes in 'owner' if the task rotates between people?",
      answer:
        "Name the role, not the person — 'the account lead' or 'whoever's running the project' — so the SOP doesn't go stale the moment someone changes teams or leaves.",
    },
    {
      question: "What counts as an 'exception' worth documenting?",
      answer:
        "Anything that comes up often enough that you'd otherwise get asked about it repeatedly — a client who skips a step, a project type that needs an extra approval, a retainer versus project-based variation.",
    },
  ],

  relatedResourceSlugs: ["agency-process-documentation-guide", "weekly-agency-operations-checklist", "client-onboarding-template"],
  relatedBlogSlugs: ["automating-agency-admin-work", "how-to-onboard-a-new-client-checklist"],
  relatedComparisonSlugs: ["notion", "clickup"],
  relatedIndustrySlugs: ["marketing-agencies", "consultants"],
};

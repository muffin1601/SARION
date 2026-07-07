import type { Resource } from "../types";

export const clientOnboardingTemplate: Resource = {
  slug: "client-onboarding-template",
  title: "Client Onboarding Template",
  category: "templates",
  tags: ["onboarding", "client management"],
  status: "live",
  featured: true,
  popular: true,
  addedDate: "2026-07-08",
  metaTitle: "Client Onboarding Template for Agencies",
  metaDescription:
    "A copy-paste template for onboarding a new client — what to capture on day one, a kickoff-call agenda, and a two-week expectation-setting plan.",
  heroHeadline: "Onboard a new client without missing the details that come back to bite you",
  heroSubhead:
    "The gaps in a bad onboarding never show up on day one — they show up three weeks in, as a missed deadline or a stakeholder nobody looped in. This template closes those gaps up front.",

  overview:
    "This is a working template for the first two weeks of a client relationship — what to capture before the kickoff call, an agenda for the call itself, and a structure for setting expectations through the first two weeks. It's built around the details that actually get missed: who the real decision-maker is versus who's on the call, where the assets live, and what 'done' means to the client versus what it means to you.",
  whyItMatters:
    "Most onboarding problems aren't caused by a bad kickoff call — they're caused by information that never got captured at all. A billing contact who isn't the person you've been emailing. A brand asset that lives in someone's personal Dropbox. A deadline the client considers fixed that your team is treating as a target. Capturing this on day one, in one place tied to the client record, means it doesn't depend on someone's memory three months later.",
  whoShouldUseIt: [
    "Agencies onboarding a new client and want a repeatable process instead of starting from scratch each time",
    "Account managers who've been burned by a detail that surfaced too late — a missed stakeholder, a hard deadline nobody flagged",
    "Teams standardizing onboarding across multiple account managers so quality doesn't depend on who's running it",
  ],
  howToUseIt: [
    { step: "Fill in the intake section before the kickoff call", description: "Get stakeholders, billing contact, and asset locations from your main point of contact before the call — it makes the call itself shorter and more useful." },
    { step: "Run the kickoff call off the agenda", description: "Use the agenda to confirm what you already captured and surface anything that changed, rather than gathering everything live." },
    { step: "Attach the finished template to the client record", description: "Once it's filled in, it becomes the reference for anyone on the team who works with that client later — not a one-time form you fill out and forget." },
  ],

  fileType: "Google Doc template",
  estimatedTimeSaved: "1-2 hours per new client, and fewer dropped details in the first month",
  whatsIncluded: [
    "A pre-call intake section (stakeholders, billing contact, assets and access, goals, hard deadlines)",
    "A structured kickoff-call agenda with suggested timing",
    "A first-two-weeks expectation-setting plan (what happens when, and who owns it)",
    "A short list of questions that surface hidden stakeholders and deadlines",
  ],
  previewContent: [
    "Stakeholders & decision-makers",
    "Billing contact & invoicing details",
    "Assets & access needed",
    "Goals & success criteria",
    "Hard deadlines & fixed dates",
    "Kickoff call agenda",
    "First two weeks: what happens when",
  ],

  faqs: [
    {
      question: "Who should fill this out — the account manager or the client?",
      answer:
        "The account manager fills it in, using information gathered from the client's main point of contact before the kickoff call. The client shouldn't be handed a form — the call is where you confirm what you've already captured.",
    },
    {
      question: "What if the client doesn't know their own hard deadlines yet?",
      answer:
        "That's common, and worth flagging explicitly on the call rather than assuming there aren't any. Note it as 'not yet defined' and put a follow-up date on getting it confirmed, rather than leaving the field blank.",
    },
    {
      question: "Does this replace a project kickoff checklist?",
      answer:
        "No — this template is about the client relationship (stakeholders, expectations, access). A project kickoff checklist covers the work itself. Most agencies use both, in sequence.",
    },
    {
      question: "How is this different from just taking notes on the first call?",
      answer:
        "Notes are unstructured and easy to lose. This template forces you to capture specific fields — like the actual decision-maker versus who's on the call — that get skipped when you're just typing what's said.",
    },
  ],

  relatedResourceSlugs: ["discovery-call-checklist", "project-kickoff-checklist", "crm-migration-checklist"],
  relatedBlogSlugs: ["how-to-onboard-a-new-client-checklist", "client-communication-best-practices", "what-is-a-client-portal"],
  relatedComparisonSlugs: ["agency-crm-vs-spreadsheets"],
  relatedIndustrySlugs: ["marketing-agencies", "consultants", "freelancers"],
};

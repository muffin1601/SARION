import type { Resource } from "../types";

export const discoveryCallChecklist: Resource = {
  slug: "discovery-call-checklist",
  title: "Discovery Call Checklist",
  category: "checklists",
  tags: ["sales", "client management"],
  status: "live",
  featured: false,
  popular: true,
  addedDate: "2026-07-08",
  metaTitle: "Discovery Call Checklist for Agencies",
  metaDescription:
    "The questions to ask on a first call with a prospective client so your proposal is built on facts, not guesses.",
  heroHeadline: "Ask the questions that make your proposal write itself",
  heroSubhead:
    "A bad discovery call produces a proposal full of assumptions. This is the list of questions that gets budget, authority, and success criteria on the table in one conversation.",

  overview:
    "This is a question list for the first call with a prospective client, before any proposal gets drafted. It's built around the details that are easy to skip in a friendly first conversation but expensive to guess wrong on later: real budget range, who actually signs off, the real timeline, what \"success\" looks like to them, and what happened with their last agency.",
  whyItMatters:
    "Most scoping mistakes aren't technical — they're informational. An agency prices a project without knowing the real budget ceiling, or builds a timeline without knowing the client already has a hard external deadline. A structured discovery call surfaces this information while it's still free to ask for, instead of discovering it mid-project when it's expensive to fix.",
  whoShouldUseIt: [
    "Anyone taking first calls with prospective clients, whether that's a founder, an account manager, or a salesperson",
    "Agencies that have been burned by a proposal built on assumptions that turned out wrong",
    "Teams standardizing discovery so every prospect gets asked the same core questions regardless of who takes the call",
  ],
  howToUseIt: [
    { step: "Send an agenda before the call", description: "Let the prospect know you'll be asking about budget and timeline up front — it sets expectations and gets better answers." },
    { step: "Ask the harder questions in the first half", description: "Budget, authority, and past agency experience get more honest answers before rapport turns into politeness." },
    { step: "Write up notes within an hour", description: "Details fade fast — capture answers while the call is still fresh, not at the end of the day." },
  ],

  fileType: "PDF checklist",
  estimatedTimeSaved: "2-3 hours of re-scoping avoided per proposal",
  whatsIncluded: [
    "The full discovery question list, grouped by budget, authority, timeline, and success criteria",
    "Follow-up prompts for when a prospect gives a vague answer",
    "A note-taking template to fill in live on the call",
    "Guidance on which questions to ask even when they feel awkward",
  ],
  previewContent: [
    "1. What's the budget range you're working with?",
    "2. Who else is involved in this decision?",
    "3. What's driving the timeline — is there a hard deadline?",
    "4. What does success look like six months from now?",
    "5. What's happened with your last agency or in-house effort?",
    "6. What have you already tried that didn't work?",
    "7. What would make this an easy yes for you?",
  ],

  faqs: [
    {
      question: "Isn't asking about budget too direct for a first call?",
      answer:
        "It feels that way at first, but a range (not an exact figure) is normal to ask for early — it saves both sides from a proposal that's wildly off target.",
    },
    {
      question: "What if the prospect won't name a decision-maker?",
      answer:
        "Treat it as information, not an obstacle. If you can't get clarity on who approves the deal, build extra follow-up time into your sales timeline expectations.",
    },
    {
      question: "How do I ask about a past agency without sounding like I'm fishing for gossip?",
      answer:
        "Frame it around what to avoid repeating: \"what didn't work well last time\" gets a more useful answer than \"why did you leave your last agency.\"",
    },
    {
      question: "Should I send a proposal right after the call?",
      answer:
        "Only if you got clear answers on budget, timeline, and success criteria. If any of those are still vague, a short follow-up call beats a proposal built on guesses.",
    },
  ],

  relatedResourceSlugs: ["proposal-template", "client-onboarding-template", "project-kickoff-checklist"],
  relatedBlogSlugs: ["how-to-price-agency-services", "client-communication-best-practices"],
  relatedComparisonSlugs: ["hubspot", "zoho-crm"],
  relatedIndustrySlugs: ["consultants", "freelancers"],
};

import type { Resource } from "../types";

export const clientHandoffChecklist: Resource = {
  slug: "client-handoff-checklist",
  title: "Client Handoff Checklist",
  category: "checklists",
  tags: ["operations", "client management"],
  status: "live",
  featured: false,
  popular: false,
  addedDate: "2026-07-08",
  metaTitle: "Client Handoff Checklist for Agencies",
  metaDescription:
    "A checklist for handing a client relationship from one team member to another without the client noticing a drop in service.",
  heroHeadline: "Hand off a client without the client feeling handed off",
  heroSubhead:
    "When an account manager leaves or changes, the client's experience is the test. This is the checklist for a handoff that reads as continuity, not disruption.",

  overview:
    "This is a checklist for transferring a client relationship from one team member to another — because someone left, changed roles, or the account was reassigned. It covers what context needs to move (not just tasks, but the unwritten stuff: how the client likes to communicate, what's sensitive, what's already been promised), how to introduce the new point of contact, and what not to say to the client during the transition.",
  whyItMatters:
    "Clients don't judge a handoff by whether the work continues — they judge it by whether they feel like they have to re-explain themselves. A handoff that only transfers task lists loses the informal context that made the relationship work: the client's actual preferences, the small commitments made in passing, the history of what's already been tried. Losing that context is what makes clients feel like they've been dropped, even when deliverables are still on time.",
  whoShouldUseIt: [
    "Agencies where an account manager or project lead is leaving, changing roles, or going on leave",
    "Team leads reassigning accounts as the team grows or client load rebalances",
    "Anyone managing a handoff where the outgoing person has more context than exists in written notes",
  ],
  howToUseIt: [
    { step: "Have the outgoing owner do a context dump first", description: "Capture the unwritten details — communication style, sensitivities, informal promises — before anything else happens." },
    { step: "Introduce the new contact while the old one is still involved", description: "A joint call or a warm email introduction reads as continuity; a cold handoff reads as disruption." },
    { step: "Watch the first two client interactions closely", description: "The first response time and first deliverable under the new owner are what set the client's impression of the transition." },
  ],

  fileType: "PDF checklist",
  estimatedTimeSaved: "2-4 hours of re-onboarding avoided per handoff",
  whatsIncluded: [
    "A context-transfer worksheet covering both formal history and informal preferences",
    "An introduction email template for the new point of contact",
    "A list of phrases to avoid saying to the client during the transition",
    "A first-two-weeks checklist for the incoming owner",
  ],
  previewContent: [
    "1. Document the client's communication preferences and quirks",
    "2. List any informal commitments not captured in the project record",
    "3. Flag anything sensitive: past complaints, near-misses, pricing history",
    "4. Introduce the new contact before the old one disappears",
    "5. Confirm the client knows who to reach and how",
    "6. Avoid phrases that suggest instability or apology",
    "7. Check in after the first deliverable under the new owner",
  ],

  faqs: [
    {
      question: "Should the client be told why the handoff is happening?",
      answer:
        "A brief, neutral reason is enough — \"[Name] is moving into a new role and [Name] will be your main contact going forward.\" Avoid over-explaining or apologizing, which reads as instability.",
    },
    {
      question: "What context matters most beyond the project file?",
      answer:
        "The things that never get written down: how the client likes to be communicated with, what's been promised informally, and what topics are sensitive. This is usually the difference between a smooth and a rocky handoff.",
    },
    {
      question: "Should the outgoing team member still be reachable for a while?",
      answer:
        "A short overlap window, even just for questions, reduces client anxiety. But keep it time-boxed — an indefinite overlap undermines the new owner's authority with the client.",
    },
    {
      question: "What's the biggest mistake agencies make in a handoff?",
      answer:
        "Treating it as an internal admin task instead of a client-facing moment. The handoff itself is part of the client's experience of the agency, not background logistics.",
    },
  ],

  relatedResourceSlugs: ["client-onboarding-template", "agency-sop-template", "meeting-notes-template"],
  relatedBlogSlugs: ["client-communication-best-practices", "reduce-client-status-update-emails"],
  relatedComparisonSlugs: ["agency-crm-vs-spreadsheets"],
  relatedIndustrySlugs: ["marketing-agencies", "design-agencies"],
};

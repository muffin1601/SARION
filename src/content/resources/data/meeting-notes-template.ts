import type { Resource } from "../types";

export const meetingNotesTemplate: Resource = {
  slug: "meeting-notes-template",
  title: "Client Meeting Notes Template",
  category: "templates",
  tags: ["client management", "productivity"],
  status: "live",
  featured: false,
  popular: false,
  addedDate: "2026-07-08",
  metaTitle: "Client Meeting Notes Template for Agencies",
  metaDescription:
    "A meeting notes format built around decisions and action items, not a transcript — so nothing gets lost between calls.",
  heroHeadline: "Stop losing decisions in someone's personal notebook",
  heroSubhead:
    "Most meeting notes are a wall of text nobody rereads. This template forces the three things that actually matter to survive the call: who decided what, who owns what next, and by when.",

  overview:
    "This is a single-page format for taking notes during client calls — kickoffs, status updates, reviews, whatever. It's not a transcript template. It's built around four sections: attendees, decisions made, action items with named owners, and next steps. The goal is that anyone on the team, including someone who missed the call, can read it in two minutes and know exactly what happened and what to do next.",
  whyItMatters:
    "The real cost of bad meeting notes isn't the note-taking — it's the rework three weeks later when a client says 'we agreed on X' and nobody on your team has a record of it. Or when an action item was mentioned in a call but never written down as a task, so it just quietly doesn't happen. Separating 'decisions' from 'action items' from general discussion means decisions are easy to find later, and action items don't get buried in paragraphs of context.",
  whoShouldUseIt: [
    "Anyone who runs client calls and currently takes notes in a doc that just grows downward forever",
    "Agencies where more than one person might join a client call, and notes need to be readable by people who weren't there",
    "Teams that have been burned by a client disputing what was agreed in a call",
  ],
  howToUseIt: [
    { step: "Open the template before the call starts", description: "Fill in the client name, date, and attendees before you dial in — it takes ten seconds and means you're not scrambling for it mid-call." },
    { step: "Take notes live in the four sections, not as a stream", description: "Put discussion points under discussion, but the moment something is agreed, move it to Decisions Made — and the moment an owner is assigned, move it to Action Items." },
    { step: "Convert action items into tasks within the hour", description: "Notes that stay in a doc get forgotten. Copy each action item into the relevant client's project as a task with the same owner and due date before you move on to anything else." },
  ],

  fileType: "Google Doc template",
  estimatedTimeSaved: "20-30 minutes per client call in follow-up emails and status confusion avoided",
  whatsIncluded: [
    "The four-section note format (attendees, decisions, action items, next steps)",
    "A header block for client name, date, call type, and attendees",
    "An action-item table with columns for owner and due date",
    "A short prompt list for the 'next steps' section so calls end with a clear close",
  ],
  previewContent: [
    "Client & Date",
    "Attendees (agency + client)",
    "Discussion Notes",
    "Decisions Made",
    "Action Items (owner, due date)",
    "Open Questions",
    "Next Steps / Next Call Date",
  ],

  faqs: [
    {
      question: "Should I send these notes to the client after every call?",
      answer:
        "For anything with decisions or action items, yes — a short recap email covering just those two sections closes the loop and gives the client a chance to correct anything before it becomes a misunderstanding.",
    },
    {
      question: "What's the difference between this and just recording the call?",
      answer:
        "A recording captures everything and nobody rewatches it. This template captures only what's actionable, in a format built to be skimmed later — they solve different problems.",
    },
    {
      question: "Who should own the action items list — the agency or the client?",
      answer:
        "Both should appear on it. List client-owned action items too, so when a project stalls waiting on client input, you have a written record of what you're waiting on and since when.",
    },
    {
      question: "Do I need a different template for internal team meetings?",
      answer:
        "This one is built for client calls specifically. Internal syncs usually don't need the same attendee formality, though the decisions/action-items split still works well.",
    },
  ],

  relatedResourceSlugs: ["client-onboarding-template", "discovery-call-checklist", "project-kickoff-checklist"],
  relatedBlogSlugs: ["client-communication-best-practices", "reduce-client-status-update-emails", "what-is-a-client-portal"],
  relatedComparisonSlugs: ["notion", "asana"],
  relatedIndustrySlugs: ["marketing-agencies", "consultants"],
};

import type { Resource } from "../types";

export const projectKickoffChecklist: Resource = {
  slug: "project-kickoff-checklist",
  title: "Project Kickoff Checklist",
  category: "checklists",
  tags: ["project management", "client management"],
  status: "live",
  featured: false,
  popular: false,
  addedDate: "2026-07-08",
  metaTitle: "Project Kickoff Checklist for Agencies",
  metaDescription:
    "A checklist for kicking off a new project with an existing client so scope, ownership, and cadence are set before work starts, not discovered mid-project.",
  heroHeadline: "Start every project with the scope actually agreed, not assumed",
  heroSubhead:
    "Most scope disputes trace back to a kickoff that skipped a step. This is the checklist for the conversation that happens before the work does.",

  overview:
    "This is a kickoff checklist for a project with a client you already have a relationship with — the proposal is signed, the contract is in place, and now the work needs to start. It covers the five things that, if skipped, cause the most friction three weeks in: restating scope out loud, agreeing on how and when you'll communicate, naming who on your side owns what, locking a first deliverable date, and writing down what's explicitly not included.",
  whyItMatters:
    "A signed proposal and a shared understanding of scope are not the same thing. Clients read proposals selectively, and internal teams forget what was and wasn't quoted. Restating scope out loud on a kickoff call, and following up with the out-of-scope list in writing, is the cheapest insurance an agency has against \"I thought this was included\" conversations later.",
  whoShouldUseIt: [
    "Account managers or project leads starting a new engagement with an existing client",
    "Agencies that have had scope-creep disputes trace back to an unclear kickoff",
    "Teams handing a signed deal from sales to delivery and needing a clean handoff point",
  ],
  howToUseIt: [
    { step: "Use it to build the kickoff call agenda", description: "Every item on the checklist becomes a talking point on the call — don't skip to deliverables before scope is confirmed." },
    { step: "Send a written recap within 24 hours", description: "The call sets shared understanding; the recap email is what you can point back to if scope is disputed later." },
    { step: "Log the first deliverable date immediately", description: "Set it in the project record the same day, before it gets buried under other kickoffs." },
  ],

  fileType: "PDF checklist",
  estimatedTimeSaved: "1-2 hours of scope clarification avoided per project",
  whatsIncluded: [
    "A kickoff call agenda in order (scope, cadence, ownership, first deliverable, exclusions)",
    "A written recap email template to send after the call",
    "A sample out-of-scope list wording that doesn't sound adversarial",
    "A first-deliverable-date worksheet for setting a realistic near-term date",
  ],
  previewContent: [
    "1. Restate scope out loud, line by line",
    "2. Confirm the communication cadence and channel",
    "3. Name the internal owner and backup contact",
    "4. Set and confirm the first deliverable date",
    "5. Write down what's explicitly out of scope",
    "6. Confirm who on the client side approves work",
    "7. Send the written recap within 24 hours",
  ],

  faqs: [
    {
      question: "Isn't scope already covered in the signed proposal?",
      answer:
        "On paper, yes. In practice, clients skim proposals and remember the parts they're most excited about. Restating scope out loud on the kickoff call surfaces mismatches while they're still cheap to fix.",
    },
    {
      question: "How specific should the out-of-scope list be?",
      answer:
        "Specific enough that a client reading it six weeks later understands why a request is a change order, not an oversight. Vague exclusions like \"extra revisions\" cause more disputes than they prevent.",
    },
    {
      question: "Who should own the kickoff call internally?",
      answer:
        "Whoever will be the client's day-to-day point of contact during the project, not just the person who closed the deal — continuity from kickoff through delivery is the point.",
    },
    {
      question: "What if the client wants to start before kickoff is done?",
      answer:
        "Push back gently. A 30-minute kickoff that confirms scope and cadence is far cheaper than the hours lost to a misalignment discovered mid-project.",
    },
  ],

  relatedResourceSlugs: ["client-onboarding-template", "discovery-call-checklist", "meeting-notes-template"],
  relatedBlogSlugs: ["how-to-onboard-a-new-client-checklist", "client-communication-best-practices"],
  relatedComparisonSlugs: ["agency-crm-vs-spreadsheets"],
  relatedIndustrySlugs: ["marketing-agencies", "web-development-agencies"],
};

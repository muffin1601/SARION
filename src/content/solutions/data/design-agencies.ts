import type { Industry } from "../types";

export const designAgencies: Industry = {
  slug: "design-agencies",
  name: "Design Agencies",
  metaTitle: "CRM for Design Agencies",
  metaDescription:
    "A CRM built for design agencies managing feedback rounds, revision scope, and final asset handoff across multiple client projects at once.",
  heroHeadline: "Keep feedback, revisions, and handoff in one place",
  heroSubhead:
    "Design work lives and dies on feedback loops. Sarion gives clients one place to see project status and leave notes, so revisions stay on scope and the final handoff isn't a scramble through old email threads.",

  painPoints: [
    {
      title: "Feedback is scattered across three tools",
      description:
        "One client marks up a PDF, another leaves comments in Slack, a third replies to an email with \"looks good but can we change the color\" — and nobody's collecting it in one place before the next round starts.",
    },
    {
      title: "Revision rounds quietly balloon",
      description:
        "The contract says two rounds of revisions. By the time the client is happy, it's been five — and there's no record showing where round two ended and the free extra work began.",
    },
    {
      title: "Final handoff is messy",
      description:
        "The client asks \"is this the final logo file?\" and the honest answer is nobody's sure, because approved versions and working drafts have been emailed back and forth with no clear line between them.",
    },
    {
      title: "Clients can't see where a project actually stands",
      description:
        "Between kickoff and delivery, the client has no view into progress — so they email to check in, and the designer has to stop and write a status update instead of designing.",
    },
  ],

  whyToolsFail: [
    {
      tool: "Spreadsheets",
      shortcoming:
        "A spreadsheet can track which round a project is on, but it can't hold a client's feedback, show them anything, or tell you when a project has quietly slipped past its scoped revisions.",
    },
    {
      tool: "Generic project tools",
      shortcoming:
        "Built for internal task tracking, not client-facing review — most have no simple client view, so the client is still stuck emailing to ask what round you're on.",
    },
    {
      tool: "File-sharing tools alone",
      shortcoming:
        "A shared drive or link stores files, but it doesn't track project status, log client feedback, or make clear which version is the final approved one — that context still lives in someone's inbox.",
    },
  ],

  howSarionSolves: [
    {
      problem: "Feedback is scattered across three tools",
      solution:
        "Clients leave notes and comments directly on their project inside their branded portal, so feedback lands in one place tied to the project instead of spread across email, chat, and marked-up PDFs.",
    },
    {
      problem: "Revision rounds quietly balloon",
      solution:
        "Each round of work is tracked as project activity against the client record, so you can see exactly how many rounds have happened and when a client's asking for round six on a two-round contract.",
    },
    {
      problem: "Final handoff is messy",
      solution:
        "Project status moves to a clear final stage when work is delivered and approved, and the client's portal shows that status plainly — so there's no ambiguity about what's done versus still in progress.",
    },
    {
      problem: "Clients can't see where a project actually stands",
      solution:
        "Clients check their own portal for real-time project status instead of emailing to ask — cutting the check-in emails that pull designers out of focused work.",
    },
  ],

  relevantFeatureEyebrows: ["Client Portal", "Project Management", "Client Management", "Team Collaboration"],

  workflow: [
    {
      step: "Kickoff: set up the project record",
      description:
        "A new client project is created with the agreed scope and number of revision rounds noted, so everyone — including the client — starts from the same expectations.",
    },
    {
      step: "Draft review: client leaves feedback",
      description:
        "The client reviews work in progress and leaves comments directly against the project in their portal, instead of emailing a marked-up file back.",
    },
    {
      step: "Revision tracking",
      description:
        "Each round gets logged against the project, so the team can see at a glance whether the client is still within scoped revisions or requesting extra rounds.",
    },
    {
      step: "Delivery and handoff",
      description:
        "Once final assets are approved, the project status updates to delivered, the client's portal reflects it clearly, and the closing invoice goes out referencing the same project.",
    },
  ],

  faqs: [
    {
      question: "Does Sarion handle design file versioning, like Figma?",
      answer:
        "No — Sarion isn't a design tool and doesn't version design files. It's where you track project status, client feedback, and revision rounds around the design work you're doing in your existing tools.",
    },
    {
      question: "How does this help us stay on top of revision rounds?",
      answer:
        "Each round of feedback and rework is logged against the client's project, so you have a clear record of how many rounds have happened — useful the moment a client asks for \"just one more small tweak\" past what's scoped.",
    },
    {
      question: "Can clients leave feedback directly instead of emailing us?",
      answer:
        "Yes — clients comment on their project inside their branded portal, so feedback is tied to the actual project record instead of scattered across email threads and chat messages.",
    },
    {
      question: "How do clients know when their final assets are ready?",
      answer:
        "Project status updates to reflect delivery, and clients see that status directly in their portal — so there's no confusion over whether a file they have is the approved final version.",
    },
    {
      question: "We run a lot of small projects at once. Does this help us keep them straight?",
      answer:
        "Yes — every project has its own record and status, so your team can see at a glance where each one stands instead of relying on memory or digging through old email threads.",
    },
  ],

  outcomes: [
    "Client feedback lands in one place instead of across email, chat, and marked-up files.",
    "Revision rounds are tracked, so scope conversations are backed by a record, not a guess.",
    "Final handoff is unambiguous — clients know exactly which version is approved and delivered.",
    "Fewer check-in emails, because clients can see project status themselves.",
  ],

  relatedBlogSlugs: [
    "reduce-client-status-update-emails",
    "client-communication-best-practices",
    "how-to-onboard-a-new-client-checklist",
  ],
  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedIndustrySlugs: ["branding-agencies", "creative-agencies", "marketing-agencies"],
};

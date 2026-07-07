import type { Industry } from "../types";

export const creativeAgencies: Industry = {
  slug: "creative-agencies",
  name: "Creative Agencies",
  metaTitle: "CRM for Creative Agencies",
  metaDescription:
    "A CRM for creative agencies producing video, campaigns, and content across many clients at once — one place to track every deliverable and client.",
  heroHeadline: "One place for every client, every deliverable type",
  heroSubhead:
    "A creative agency rarely does one kind of work — this week it's a video for one client, a campaign concept for another, social content for a third. Sarion keeps every client's projects, feedback, and invoices in one system instead of a different tool per deliverable.",

  painPoints: [
    {
      title: "Every deliverable type lives in a different tool",
      description:
        "The video project is tracked in one app, the campaign concept in a deck someone emailed around, and the social content calendar in a spreadsheet — so nobody has one view of what's actually owed to which client.",
    },
    {
      title: "Feedback on creative work is scattered and unstructured",
      description:
        "A client's notes on a rough cut come in as a voice memo, their notes on a campaign deck come in as email comments, and reconciling both into an actionable revision list falls on whoever remembers to check.",
    },
    {
      title: "Freelance creatives need access without the full picture",
      description:
        "A contract editor or copywriter working on one client's project doesn't need to see every other client the agency has — but most tools force an all-or-nothing choice between full access and none.",
    },
    {
      title: "Deadlines across many small projects blur together",
      description:
        "No single project is huge, but there are a dozen of them running at once across different clients and disciplines, and it's easy to lose track of which one is quietly slipping.",
    },
  ],

  whyToolsFail: [
    {
      tool: "Video/creative production tools",
      shortcoming:
        "Good at managing footage and file review for one project, but they don't track the client relationship, invoicing, or the other kinds of work — a campaign brief, a content calendar — happening in parallel.",
    },
    {
      tool: "Spreadsheets",
      shortcoming:
        "A master tracker with a row per project looks fine until it has forty rows across ten clients — at that point it's a status board nobody trusts is current, and clients still email to ask what's happening.",
    },
    {
      tool: "Generic project management tools",
      shortcoming:
        "Handle tasks and due dates well, but most have no client-facing view and no simple way to give a freelancer scoped access to only their assigned client's work.",
    },
  ],

  howSarionSolves: [
    {
      problem: "Every deliverable type lives in a different tool",
      solution:
        "Every client gets a project record regardless of what's being made — video, campaign, or content — so status across all deliverable types is visible from one dashboard instead of one tool per format.",
    },
    {
      problem: "Feedback on creative work is scattered and unstructured",
      solution:
        "Notes on any client's project — including client feedback — get logged directly on that client's record, so the revision history is in one place instead of split across whatever channel the client used that day.",
    },
    {
      problem: "Freelance creatives need access without the full picture",
      solution:
        "Team members can be given scoped access tied to specific clients, so a contract editor sees the project they're assigned to without visibility into the agency's other accounts.",
    },
    {
      problem: "Deadlines across many small projects blur together",
      solution:
        "Project status for every client rolls up into one dashboard, so a project quietly falling behind is visible at a glance instead of discovered when the client asks.",
    },
  ],

  relevantFeatureEyebrows: ["Client Management", "Project Management", "Team Collaboration", "Invoices"],

  workflow: [
    {
      step: "New brief comes in",
      description:
        "Whether it's a video, a campaign, or a content package, the work gets set up as a project against that client's record — same process regardless of format.",
    },
    {
      step: "Work and feedback get logged as they happen",
      description:
        "Progress notes and client feedback get recorded on the project as the work moves, so nothing depends on memory when it's time for a status update.",
    },
    {
      step: "Team checks the dashboard, not their inbox",
      description:
        "Instead of asking around, anyone on the team can open the dashboard to see what's due across every client this week, including work assigned to contractors.",
    },
    {
      step: "Deliverable ships, invoice goes out",
      description:
        "Once a project's phase or deliverable is complete, the invoice goes out from the same client record — no separate tool to re-enter the details into.",
    },
  ],

  faqs: [
    {
      question: "We work across video, campaigns, and content — does this handle all of it the same way?",
      answer:
        "Yes — a project in Sarion isn't tied to a specific deliverable format. Whether it's a video edit, a campaign concept, or a content calendar, it's tracked the same way against the client, so you're not managing three separate systems.",
    },
    {
      question: "Can we give freelance editors or writers access to just their assigned client?",
      answer:
        "Yes — team members can be scoped to specific clients, so a contractor sees the project they're working on without visibility into your other accounts.",
    },
    {
      question: "How does this help with scattered client feedback?",
      answer:
        "Feedback gets logged as a note on the client's project as it comes in, so revision history lives in one place instead of being split across email, text, and voice memos.",
    },
    {
      question: "We run a dozen small projects at once across different clients — will we lose track of any of them?",
      answer:
        "Every client's project status feeds into one dashboard, so a project that's quietly slipping is visible at a glance instead of surfacing only when the client follows up.",
    },
    {
      question: "Does Sarion do video review or creative annotation?",
      answer:
        "No — Sarion isn't a media review tool. It's where you track client projects, log feedback and status, manage team access, and invoice, alongside whatever creative tools you already use for the actual production work.",
    },
  ],

  outcomes: [
    "One dashboard shows status across every client and deliverable type, not one tool per format.",
    "Client feedback lands in one place instead of across email, text, and voice memos.",
    "Freelance creatives get scoped access without seeing the agency's other clients.",
    "Small projects stop quietly slipping because status is visible across all of them at once.",
  ],

  relatedBlogSlugs: [
    "reduce-client-status-update-emails",
    "how-to-onboard-a-new-client-checklist",
    "client-communication-best-practices",
  ],
  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedIndustrySlugs: ["marketing-agencies", "branding-agencies", "design-agencies"],
};

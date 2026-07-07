import type { Resource } from "../types";

export const aiPromptLibraryForAgencies: Resource = {
  slug: "ai-prompt-library-for-agencies",
  title: "AI Prompt Library for Agencies",
  category: "prompts",
  tags: ["ai", "productivity", "prompts"],
  status: "live",
  featured: true,
  popular: true,
  addedDate: "2026-07-08",
  metaTitle: "AI Prompt Library for Agencies",
  metaDescription:
    "Ready-to-use AI prompts for the admin and writing work that eats an agency's week — status updates, meeting notes, proposals, and follow-ups.",
  heroHeadline: "Stop staring at a blank message box",
  heroSubhead:
    "The same five writing tasks eat up an agency's week — status updates, meeting recaps, proposals, awkward follow-ups. This is a set of prompts that turn each one into a five-minute edit instead of a thirty-minute draft.",

  overview:
    "This is a library of ready-to-use prompts for the admin and client-facing writing that fills an agency's week — not a Sarion feature, and not tied to any one AI tool. Copy a prompt into ChatGPT, Claude, or whatever assistant your team already uses, fill in the brackets with your own details, and edit the output. Sarion doesn't have a built-in AI assistant; this is a companion resource for pairing your client records with whatever general-purpose AI chat tool you already have a login for.",
  whyItMatters:
    "The tasks that make agency work feel heavier than it should aren't the billable work — they're the twenty small writing tasks around it. A status update client X is waiting on. A meeting that needs to become a task list before anyone forgets what was agreed. A follow-up email about an invoice that's two weeks late and needs to sound firm but not cold. None of these are hard to write. They're just tedious to write from scratch every single time, and that tedium is where a good starting prompt pays for itself.",
  whoShouldUseIt: [
    "Account managers who write the same three types of client email every week and want a faster starting draft",
    "Agency owners who take meeting notes by hand and never turn them into a clean action list",
    "Anyone chasing a late invoice who wants the tone right on the first draft, not the third",
  ],
  howToUseIt: [
    { step: "Pick the prompt that matches your task", description: "Each entry in the library is written for one specific job — don't reach for the proposal prompt when you need a status update, the specificity is what makes the output usable." },
    { step: "Fill in the bracketed details", description: "Every prompt has placeholders for client name, project context, and key facts. The more specific you are here, the less editing you'll do after." },
    { step: "Paste into your AI tool, then edit for voice", description: "Treat the output as a first draft, not a final one — read it back in your agency's actual voice and adjust before it goes to a client." },
  ],

  fileType: "PDF prompt library",
  estimatedTimeSaved: "20-30 minutes of drafting time saved per use",
  whatsIncluded: [
    "12 ready-to-use prompts across status updates, meeting notes, proposals, and follow-ups",
    "Placeholder guidance for what to fill in for the best results",
    "Before/after examples showing a raw prompt output versus an edited final version",
    "A short guide on editing AI drafts so they sound like your agency, not like a chatbot",
  ],
  previewContent: [
    "Client status update drafts",
    "Meeting notes → action items",
    "Proposal first drafts",
    "Late-payment follow-up emails",
    "Rough notes → clean SOP draft",
    "Project kickoff recap emails",
    "Scope clarification messages",
  ],

  faqs: [
    {
      question: "Is this a Sarion AI feature?",
      answer:
        "No. Sarion doesn't have a built-in AI assistant. This is a standalone prompt library you use with whatever general-purpose AI chat tool your team already has — ChatGPT, Claude, or anything else — alongside the client details you keep in Sarion.",
    },
    {
      question: "Do I need a paid AI subscription to use these prompts?",
      answer:
        "No. Every prompt in this library works on the free tier of any major AI chat assistant. You're not paying for anything beyond whatever access you already have.",
    },
    {
      question: "Will the output sound like it was written by AI?",
      answer:
        "The first draft might. That's why every prompt is paired with editing guidance — a quick pass to add your agency's actual voice and specific details is part of the process, not an optional extra step.",
    },
    {
      question: "Is client information safe to paste into these prompts?",
      answer:
        "Use judgment — paste project context and public-facing details, but check your AI tool's data policy before pasting anything sensitive, and never paste financial account numbers or credentials.",
    },
  ],

  relatedResourceSlugs: ["claude-prompt-collection", "client-onboarding-template", "meeting-notes-template"],
  relatedBlogSlugs: ["automating-agency-admin-work", "client-communication-best-practices", "reduce-client-status-update-emails"],
  relatedComparisonSlugs: ["agency-crm-vs-spreadsheets", "notion"],
  relatedIndustrySlugs: ["marketing-agencies", "freelancers"],
};

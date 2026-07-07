import type { Resource } from "../types";

export const claudePromptCollection: Resource = {
  slug: "claude-prompt-collection",
  title: "Claude Prompt Collection",
  category: "prompts",
  tags: ["ai", "claude", "prompts"],
  status: "live",
  featured: false,
  popular: false,
  addedDate: "2026-07-08",
  metaTitle: "Claude Prompt Collection for Agencies",
  metaDescription:
    "A focused set of prompts built for Claude's strengths — reviewing long documents, restructuring messy notes, and careful client-facing writing.",
  heroHeadline: "Prompts built for what Claude is actually good at",
  heroSubhead:
    "Claude handles long documents and careful, structured writing differently than a quick-answer chatbot. These prompts are written to use that — reviewing a full contract, restructuring a page of scrawled notes, drafting an update in a specific tone.",

  overview:
    "This is a smaller, more focused set of prompts than a general AI prompt library — built specifically around the kinds of tasks Claude tends to handle well: reading a long document in full and reasoning about it carefully, turning disorganized input into a clean structured output, and matching a specific requested tone rather than defaulting to generic AI phrasing. This isn't a Sarion feature — Sarion has no built-in AI. These are prompts to paste into Claude.ai (or the Claude app of your choice) alongside the client and project details you already track in Sarion.",
  whyItMatters:
    "A lot of agency work involves reading something long and messy and turning it into something short and clear — a ten-page contract with three ambiguous scope clauses buried in it, a page of half-legible meeting notes, a client's rambling email that actually contains four action items. That's a different skill than drafting a quick reply, and it's worth having prompts written specifically for it, tuned to a tool that's built for reading long context carefully rather than skimming it.",
  whoShouldUseIt: [
    "Account leads who need a second pair of eyes on a proposal or contract before it goes to a client",
    "Anyone who takes messy handwritten or voice-transcribed meeting notes and needs them turned into a clean SOP or task list",
    "Agencies that send frequent client-facing updates and want a consistent, specific tone every time rather than generic AI phrasing",
  ],
  howToUseIt: [
    { step: "Paste the full document, not a summary", description: "These prompts are built around Claude reading the whole thing — a contract, a transcript, a page of notes — so give it the complete text, not your own summary of it." },
    { step: "Specify the exact output you want", description: "Each prompt includes a spot to specify tone, format, or level of detail — a one-line status update reads very differently from a full recap, and being explicit up front saves a rewrite." },
    { step: "Ask a follow-up instead of restarting", description: "If the first output isn't quite right, ask Claude to adjust it in the same conversation rather than re-running the whole prompt — it keeps the document in context and refines faster than starting over." },
  ],

  fileType: "PDF prompt collection",
  estimatedTimeSaved: "30-45 minutes of review or rewrite time saved per use",
  whatsIncluded: [
    "8 prompts tuned for long-document review and structured rewriting",
    "A contract/proposal scope-ambiguity review prompt with example flagged clauses",
    "A messy-notes-to-SOP restructuring prompt with a before/after sample",
    "Tone-matching guidance for client-facing updates (formal, friendly, urgent)",
  ],
  previewContent: [
    "Contract/proposal scope-ambiguity review",
    "Messy meeting notes → structured SOP",
    "Client-facing update in a specified tone",
    "Long transcript → decision log",
    "Scope-creep flag review before a client call",
    "Multi-page brief → one-page summary",
  ],

  faqs: [
    {
      question: "Is this a built-in Sarion AI feature?",
      answer:
        "No. Sarion has no built-in AI functionality. This is a standalone collection of prompts to use in Claude.ai or another Claude-based app, separate from Sarion, alongside the client and project records you already manage there.",
    },
    {
      question: "Why is this different from the general AI Prompt Library resource?",
      answer:
        "The general library covers everyday writing tasks for any AI tool. This collection is narrower and leans specifically into long-document reading and careful structured rewriting — the kind of task where Claude's ability to hold a whole document in context matters.",
    },
    {
      question: "Do I need a paid Claude subscription to use these prompts?",
      answer:
        "No, though very long documents (a lengthy contract or a full call transcript) may run into free-tier length limits depending on your plan — in that case, splitting the document into sections works fine.",
    },
    {
      question: "Can I use these prompts with a different AI tool instead of Claude?",
      answer:
        "Most will work reasonably well elsewhere, but they're specifically written and tested around Claude's handling of long context and structured output — for general-purpose prompts built to work with any AI tool, see the AI Prompt Library for Agencies instead.",
    },
  ],

  relatedResourceSlugs: ["ai-prompt-library-for-agencies", "proposal-template", "agency-sop-template"],
  relatedBlogSlugs: ["automating-agency-admin-work", "client-communication-best-practices"],
  relatedComparisonSlugs: ["agency-crm-vs-spreadsheets", "notion"],
  relatedIndustrySlugs: ["consultants", "marketing-agencies"],
};

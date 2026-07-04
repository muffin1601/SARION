/**
 * SARION Digital Products — a second business line alongside the CRM.
 * Copy sourced from public/release/SARION-Claude-Code-Mastery-Kit-v1.0.0/Marketing/*
 * and SARION-Ecosystem.md. Pages import from here so copy changes never
 * require touching a component.
 */

export interface ProductSummary {
  slug: string;
  collection: string;
  volume: string;
  name: string;
  description: string;
  status: "available" | "coming-soon";
  price?: number;
  href?: string;
}

export const PRODUCTS: ProductSummary[] = [
  {
    slug: "claude-code-mastery",
    collection: "SARION AI Engineering Suite",
    volume: "Volume 1",
    name: "Claude Code Mastery",
    description:
      "300+ pages of engineered prompts, playbooks, and processes that turn Claude Code into a senior engineering partner.",
    status: "available",
    price: 49,
    href: "/products/claude-code-mastery",
  },
  {
    slug: "cursor-mastery",
    collection: "SARION AI Engineering Suite",
    volume: "Volume 2",
    name: "Cursor Mastery",
    description:
      "The same battle-tested playbook system, rebuilt for Cursor power users.",
    status: "coming-soon",
  },
  {
    slug: "agency-playbook",
    collection: "SARION AI Engineering Suite",
    volume: "Volume 3",
    name: "Agency Playbook",
    description:
      "Client-ready templates and SOPs for agencies delivering AI-powered engineering work.",
    status: "coming-soon",
  },
  {
    slug: "ai-engineering-library",
    collection: "SARION AI Engineering Suite",
    volume: "Volume 4",
    name: "AI Engineering Library",
    description:
      "A structured reference for building production-grade AI agents and pipelines.",
    status: "coming-soon",
  },
  {
    slug: "ai-saas-blueprint",
    collection: "SARION AI Engineering Suite",
    volume: "Volume 5",
    name: "AI SaaS Blueprint",
    description:
      "An end-to-end blueprint for shipping a SaaS product from idea to launch.",
    status: "coming-soon",
  },
];

export const PRODUCT_BY_SLUG: Record<string, ProductSummary> = Object.fromEntries(
  PRODUCTS.map((p) => [p.slug, p]),
);

// ---------------------------------------------------------------------------
// Claude Code Mastery — full product page content
// ---------------------------------------------------------------------------

export const CCM_STATS = [
  { value: "250+", label: "Engineered prompts" },
  { value: "60+", label: "Playbooks" },
  { value: "30+", label: "Templates" },
  { value: "300+", label: "Pages" },
];

export const CCM_INCLUDED = [
  {
    title: "250+ Engineered Prompts",
    description:
      "Structured for context, constraints, and output format. Organized by task: feature building, testing, code review, debugging, migrations, and documentation.",
  },
  {
    title: "60+ Playbooks",
    description:
      "Step-by-step workflows for debugging, architecture, refactoring, and performance — the four hardest jobs in software.",
  },
  {
    title: "30+ Templates",
    description:
      "Fill-in-the-blank PRDs, READMEs, and documentation templates. Skip the blank page; ship the document.",
  },
  {
    title: "10 Deployment Guides",
    description:
      "Environment-by-environment guides that take code from local to production without the 2 a.m. surprises.",
  },
  {
    title: "13 SOPs + 10 Checklists",
    description:
      "Standard operating procedures and pre-flight checklists so quality is a process, not a personality trait.",
  },
  {
    title: "VS Code Snippets",
    description:
      "Your best prompts and patterns, one keystroke away, right inside your editor.",
  },
  {
    title: "150 Bonus Prompts & Frameworks",
    description:
      "A whole second library of advanced prompts and mental models, plus quick-reference cheat sheets.",
  },
];

export const CCM_TOC = [
  { section: "01 · Prompts", detail: "250+ production prompts — setup, SaaS, auth, APIs, Stripe, Supabase, Next.js, testing, security" },
  { section: "02 · Debugging", detail: "12 playbooks — symptoms, root cause analysis, investigation steps, Claude prompt, checklist" },
  { section: "03 · Architecture", detail: "17 guides — monolith vs microservices, serverless, caching, queues, database design" },
  { section: "04 · Refactoring", detail: "9 playbooks — turn legacy spaghetti into clean, testable code" },
  { section: "05 · Documentation", detail: "10 templates — specs, API docs, onboarding, release notes" },
  { section: "06 · PRDs", detail: "10 templates — SaaS, marketplaces, CRMs, mobile apps" },
  { section: "07 · README Templates", detail: "10 templates — open source, SaaS, CLI, APIs, packages, monorepos" },
  { section: "08 · Deployment", detail: "10 guides — Vercel, Railway, AWS, Docker, Cloudflare" },
  { section: "09 · SOPs", detail: "13 procedures for every phase of development" },
  { section: "10 · Checklists", detail: "10 checklists — launch, security, performance, SEO, accessibility" },
  { section: "11 · VS Code", detail: "Snippet packs for React, Next.js, TypeScript, Node, FastAPI, Tailwind" },
  { section: "12 · Bonus", detail: "150 prompts + cheat sheets — Git, Docker, Regex, Markdown, terminal" },
];

export const CCM_WHO_FOR = [
  "You use Claude Code (or want to)",
  "You're a solo builder shipping fast",
  "You lead a team standardizing AI workflows",
  "You're tired of mediocre AI output",
];

export const CCM_NOT_FOR = [
  "You never touch AI tools",
  "You want a done-for-you app",
  "You refuse to copy-paste a prompt",
  "You're happy re-typing requests all day",
];

export const CCM_OUTCOMES = [
  "Ship features in a fraction of the time",
  "Fix bugs with a repeatable process instead of luck",
  "Make architecture decisions with confidence",
  "Refactor legacy code without fear",
  "Find and kill performance problems",
  "Produce docs and PRDs your team actually reads",
];

export interface ProductTier {
  name: string;
  price: number;
  description: string;
  features: string[];
  featured?: boolean;
}

export const CCM_TIERS: ProductTier[] = [
  {
    name: "Starter",
    price: 49,
    description: "Solo devs getting started",
    features: ["250+ prompts", "60+ playbooks", "10 checklists"],
  },
  {
    name: "Pro",
    price: 99,
    description: "Daily drivers & indie hackers",
    features: [
      "Everything in Starter",
      "30+ templates",
      "13 SOPs",
      "10 deployment guides",
      "VS Code snippets",
    ],
    featured: true,
  },
  {
    name: "Team",
    price: 149,
    description: "Leads standardizing workflows",
    features: [
      "Everything in Pro",
      "150 bonus prompts & frameworks",
      "Cheat sheets",
      "Multi-seat use",
    ],
  },
];

export const CCM_FAQ = [
  {
    question: "Is this beginner-friendly?",
    answer: "Yes. If you can open a terminal, you can use it. Seniors get value too.",
  },
  {
    question: "What format is it?",
    answer: "Markdown + PDF-friendly. Works in any editor.",
  },
  {
    question: "Do I need a subscription?",
    answer: "No. One-time payment, lifetime access.",
  },
  {
    question: "Will it stay current?",
    answer: "You get all Version 1.x updates free.",
  },
  {
    question: "What's the difference between the tiers?",
    answer:
      "Starter covers core prompts, playbooks, and checklists. Pro adds templates, SOPs, deployment guides, and snippets. Team adds the 150 bonus prompts, cheat sheets, and multi-seat usage.",
  },
  {
    question: "Do you offer team or volume licenses?",
    answer:
      "Yes — the Team tier includes multi-seat use. For larger teams, contact us for custom pricing.",
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes — a 14-day, no-questions-asked full refund. Email us and it's done.",
  },
  {
    question: "How do I receive it?",
    answer: "Instant digital download right after checkout.",
  },
  {
    question: "Does this work with tools other than Claude Code?",
    answer:
      "It's optimized for Claude Code, but the playbooks, templates, and processes carry over to most AI coding assistants.",
  },
  {
    question: "Is this AI-generated filler?",
    answer:
      "No. It's a curated, structured, human-organized system built for real developer workflows — no padding.",
  },
];

export const CCM_BOX_MOCKUP_BASE =
  "/release/SARION-Marketing-Preview/Product-Box-Mockups";

export const FREE_SAMPLE_PDF_PATH = "/release/SARION-Free-Sample/SARION-Free-Sample.pdf";
export const FREE_SAMPLE_PAGE_COUNT = 36;

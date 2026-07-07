/**
 * SARION Digital Products — a second business line alongside the CRM.
 * Copy sourced from public/release/SARION-Claude-Code-Mastery-Kit-v1.0.0/Marketing/*
 * and SARION-Ecosystem.md. Pages import from here so copy changes never
 * require touching a component.
 */

export type ProductStatus = "available" | "coming-soon";
export type ProductCollection = "developer" | "agency" | "automation";

export interface ProductSummary {
  slug: string;
  collection: ProductCollection;
  category: string;
  name: string;
  /** Outcome-focused, one sentence. */
  description: string;
  status: ProductStatus;
  price?: number;
  /** 3-5 bullets — what's inside, not marketing fluff. */
  features: string[];
  href?: string;
}

export interface CollectionMeta {
  key: ProductCollection;
  title: string;
  description: string;
}

export const COLLECTIONS: CollectionMeta[] = [
  {
    key: "developer",
    title: "Developer Collection",
    description:
      "For engineers and solo builders working in Claude Code or Cursor — battle-tested prompts, playbooks, and boilerplate that replace hours of trial-and-error with a repeatable process.",
  },
  {
    key: "agency",
    title: "Agency Collection",
    description:
      "For agency owners tired of running the business from scattered docs and tribal knowledge — proven operating systems for client work, onboarding, and finance, ready to plug in.",
  },
  {
    key: "automation",
    title: "Automation Collection",
    description:
      "For teams who'd rather build the workflow once than repeat it forever — ready-to-import automations that handle client work, sales follow-up, and reporting without a developer on call.",
  },
];

export const PRODUCTS: ProductSummary[] = [
  {
    slug: "claude-code-mastery",
    collection: "developer",
    category: "Developer Tools",
    name: "Claude Code Mastery Kit",
    description:
      "Ship production-ready software faster with 250+ Claude Code workflows, debugging systems, architecture playbooks, refactoring prompts, deployment checklists and engineering templates.",
    status: "available",
    price: 49,
    features: [
      "250+ engineered prompts",
      "Debugging workflows",
      "Architecture playbooks",
      "Refactoring systems",
      "Deployment checklists",
    ],
    href: "/products/claude-code-mastery",
  },
  {
    slug: "nextjs-saas-boilerplate",
    collection: "developer",
    category: "Developer Tools",
    name: "Next.js SaaS Boilerplate",
    description:
      "Skip months of setup — launch a production SaaS on a foundation with auth, billing, and an admin panel already built.",
    status: "coming-soon",
    features: ["Authentication", "Dashboard", "Payments", "Admin panel", "Landing page & emails"],
  },
  {
    slug: "cursor-mastery",
    collection: "developer",
    category: "Developer Tools",
    name: "Cursor Mastery Kit",
    description: "The same battle-tested workflow system, rebuilt for Cursor power users.",
    status: "coming-soon",
    features: ["Engineered prompts", "Debugging playbooks", "Architecture guides"],
  },
  {
    slug: "ai-engineering-library",
    collection: "developer",
    category: "Developer Tools",
    name: "AI Engineering Library",
    description: "A structured reference for building production-grade AI agents and pipelines.",
    status: "coming-soon",
    features: ["Agent design patterns", "Pipeline architecture", "Evaluation frameworks"],
  },
  {
    slug: "ai-saas-launch-blueprint",
    collection: "developer",
    category: "Developer Tools",
    name: "AI SaaS Launch Blueprint",
    description: "An end-to-end blueprint for shipping an AI SaaS product from idea to launch.",
    status: "coming-soon",
    features: ["Idea validation", "Pricing & positioning", "Launch checklist"],
  },
  {
    slug: "agency-operating-system",
    collection: "agency",
    category: "Agency Systems",
    name: "Agency Operating System",
    description:
      "Run your agency on one proven system — from first client call to the finance close.",
    status: "coming-soon",
    features: [
      "CRM templates",
      "SOPs & client onboarding",
      "Proposal templates",
      "Finance & hiring",
      "KPI dashboards",
    ],
  },
  {
    slug: "n8n-starter-pack",
    collection: "automation",
    category: "Automation",
    name: "n8n Starter Pack",
    description: "20 production-ready n8n workflows so you automate client work in an afternoon, not a month.",
    status: "coming-soon",
    features: ["20 production workflows", "Full documentation", "Ready-to-import files", "Video walkthroughs"],
  },
  {
    slug: "ai-automation-library",
    collection: "automation",
    category: "Automation",
    name: "AI Automation Library",
    description: "Automate lead qualification, CRM updates, and client follow-up with AI agents that run while you sleep.",
    status: "coming-soon",
    features: [
      "Lead qualification",
      "CRM & Gmail automation",
      "Slack automation",
      "AI agents & reporting",
      "Client follow-up",
    ],
  },
];

export const PRODUCT_BY_SLUG: Record<string, ProductSummary> = Object.fromEntries(
  PRODUCTS.map((p) => [p.slug, p]),
);

export function productsByCollection(collection: ProductCollection): ProductSummary[] {
  return PRODUCTS.filter((p) => p.collection === collection);
}

/** SARION CRM — the flagship subscription product. Not a one-time purchase,
 * so it's modeled separately from the digital-products catalog above. */
export const FLAGSHIP_CRM = {
  name: "SARION CRM",
  eyebrow: "Flagship SaaS · Subscription",
  description:
    "Built for agencies and client-based businesses replacing a patchwork of spreadsheets, generic CRMs, and manual follow-up. SARION combines pipeline, client management, and AI-powered automation in one system, so nothing falls through the cracks between the first call and the invoice.",
  primaryLabel: "Start Free",
  primaryHref: "/signup",
  secondaryLabel: "Learn More",
  secondaryHref: "/features",
};

export const PRODUCT_STATS = [
  { value: "4", label: "Premium Products" },
  { value: "250+", label: "Engineering Workflows" },
  { value: "Built For", label: "Developers & Agencies" },
];

/** "People also buy" cross-sell chains, shown on individual product pages. */
export interface CrossSellChain {
  category: string;
  slugs: string[];
}

export const CROSS_SELL: CrossSellChain[] = [
  { category: "Developer", slugs: ["claude-code-mastery", "nextjs-saas-boilerplate"] },
  { category: "Agency", slugs: ["agency-operating-system", "n8n-starter-pack"] },
  { category: "Automation", slugs: ["ai-automation-library"] },
];

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
  "You're tired of rewriting Claude's first draft every time",
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

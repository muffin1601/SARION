import type { Industry } from "../types";

export const freelancers: Industry = {
  slug: "freelancers",
  name: "Freelancers",
  metaTitle: "CRM for Freelancers",
  metaDescription:
    "A lightweight CRM for freelancers who need to look professional to clients without the overhead built for a team they don't have.",
  heroHeadline: "Look like an agency, work like a freelancer",
  heroSubhead:
    "You don't need team permissions or a sales pipeline — you need a clean way to manage clients, send professional invoices, and give clients a place to check in that isn't your personal inbox.",

  painPoints: [
    {
      title: "Every tool assumes you have a team",
      description:
        "Most CRM and agency software is priced and designed around teams of five or more, with permission systems and roles you'll never use as a solo operator.",
    },
    {
      title: "Client conversations live in three different apps",
      description:
        "One client texts, another emails, a third messages on a project tool — and remembering who said what to whom becomes its own part-time job.",
    },
    {
      title: "Invoicing looks amateur",
      description:
        "A plain-text invoice attached to an email doesn't inspire the same confidence as a clean, branded invoice a client can view and pay from a real link.",
    },
    {
      title: "You are the entire operation",
      description:
        "If you get sick or take a week off, there's no one to hand things to — so anything that reduces the mental load of tracking every client detail matters more, not less.",
    },
  ],

  whyToolsFail: [
    {
      tool: "Spreadsheets",
      shortcoming:
        "Workable at first, but a spreadsheet gives a client zero visibility and no way to see their own invoice or project status without asking you directly.",
    },
    {
      tool: "Team-oriented agency software",
      shortcoming:
        "Built around multi-seat pricing and permission structures for teams — overkill and often needlessly expensive for one person.",
    },
    {
      tool: "Generic invoicing apps",
      shortcoming:
        "Handle the invoice but not the client relationship around it — notes, project status, and history live somewhere else entirely.",
    },
  ],

  howSarionSolves: [
    {
      problem: "Every tool assumes you have a team",
      solution:
        "Works cleanly as a single-person workspace — nothing about the client, project, or invoicing experience requires a team to make sense.",
    },
    {
      problem: "Client conversations live in three different apps",
      solution:
        "Every client's notes, project status, and history live on one record, so context isn't scattered across whatever app a given client happened to reach you on.",
    },
    {
      problem: "Invoicing looks amateur",
      solution:
        "Clients get a clean, branded invoice tied to their own project record — a small detail that reads as more professional than an emailed PDF.",
    },
    {
      problem: "You are the entire operation",
      solution:
        "A client portal answers routine status questions without you writing a reply, freeing up time for the work that actually pays.",
    },
  ],

  relevantFeatureEyebrows: ["Client Portal", "Invoices", "Client Management"],

  workflow: [
    {
      step: "New client signs on",
      description:
        "Add the client once, with contact details and project scope — no separate spreadsheet, no separate invoicing tool to duplicate the same information into.",
    },
    {
      step: "Work happens",
      description:
        "Log project status as you go, so a client who checks in can see real progress instead of getting a reply days later.",
    },
    {
      step: "Client checks in",
      description:
        "Instead of a text asking \"how's it going?\", the client opens their portal link and sees status themselves.",
    },
    {
      step: "Invoice and get paid",
      description:
        "Send a branded invoice from the same client record — no copying project details into a separate invoicing app.",
    },
  ],

  faqs: [
    {
      question: "Isn't this overkill for a single freelancer?",
      answer:
        "No — it's built to work cleanly for one person. You're not paying for or navigating team permissions and roles you'll never touch; it's client records, a portal, and invoicing, nothing more than that.",
    },
    {
      question: "Will my clients need to create an account?",
      answer:
        "Clients access their portal through a link tied to their project — a lightweight way to give them visibility without friction on their end.",
    },
    {
      question: "Can I use this for just a handful of clients?",
      answer:
        "Yes — it's genuinely useful even at 2-3 active clients, mainly for looking professional and not losing track of details between them.",
    },
    {
      question: "Does it replace my accounting software?",
      answer:
        "No — it handles client-facing invoicing (sending, tracking paid/unpaid/overdue), not full bookkeeping or tax prep. Most freelancers use both.",
    },
    {
      question: "What if I bring on a subcontractor later?",
      answer:
        "You can add a team member with scoped access when that happens — nothing about starting solo locks you out of growing later.",
    },
  ],

  outcomes: [
    "Client details stop being scattered across texts, emails, and memory.",
    "Invoices read as professional, not improvised.",
    "Fewer \"how's it going?\" messages to answer personally.",
    "One system that still makes sense if you ever bring on help.",
  ],

  relatedBlogSlugs: [
    "how-to-price-agency-services",
    "invoicing-best-practices-for-agencies",
    "signs-your-agency-has-outgrown-spreadsheets",
  ],
  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedIndustrySlugs: ["consultants", "creative-agencies", "web-development-agencies"],
};

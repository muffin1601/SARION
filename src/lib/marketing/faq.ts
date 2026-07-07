/**
 * Homepage FAQ — written for humans first, but each answer targets a real
 * long-tail query ("agency management software", "client portal", "free CRM
 * for freelancers") so the page can win FAQ rich results and informational
 * search intent. `href`/`hrefLabel` add a contextual internal link where it
 * genuinely helps the reader.
 */
export interface HomeFaqItem {
  question: string;
  answer: string;
  href?: string;
  hrefLabel?: string;
}

export const HOME_FAQ: HomeFaqItem[] = [
  {
    question: "What is Sarion?",
    answer:
      "Sarion is agency management software that brings client management (CRM), projects, tasks, invoicing, and a branded client portal into one workspace. It's built specifically for small agencies, studios, and freelancers who are tired of stitching together spreadsheets, inboxes, and half a dozen disconnected apps.",
    href: "/features",
    hrefLabel: "Explore all features",
  },
  {
    question: "Who is Sarion for?",
    answer:
      "Sarion is designed for design studios, marketing and web agencies, consultancies, and solo freelancers managing multiple clients. If you run client work and need one place for projects, invoices, and client communication, Sarion fits.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The Free plan lets you manage one client and one project with the full client portal — no time limit and no credit card. Every paid plan also starts with a 14-day free trial of the complete workspace.",
    href: "/pricing",
    hrefLabel: "Compare plans",
  },
  {
    question: "What is a client portal and why does it matter?",
    answer:
      "A client portal is a private, branded page where your clients can see project status, due dates, and updates without endless email threads. It cuts down status-update churn and makes your agency look organized and professional from the first interaction.",
    href: "/portal-demo",
    hrefLabel: "See a live portal demo",
  },
  {
    question: "How is Sarion different from a generic CRM?",
    answer:
      "Generic CRMs are built for sales pipelines, not delivery. Sarion is built for the work after the deal closes — running projects, invoicing clients, and keeping everyone aligned through the client portal. No bloated sales features you'll never use.",
  },
  {
    question: "Do I need a credit card to start?",
    answer:
      "No. You can start on the Free plan or trial the full premium workspace for 14 days without entering any payment details. Founding members who join during launch also lock in their pricing for life.",
    href: "/pricing",
    hrefLabel: "View founding pricing",
  },
];

// /features — questions specific to product capabilities, not repeated from HOME_FAQ.
export const FEATURES_FAQ: HomeFaqItem[] = [
  {
    question: "Can I customize the client portal with my agency's branding?",
    answer:
      "Yes. Add your logo and agency name so the portal your clients see looks like your product, not Sarion's. Growth and Agency plans also unlock a custom subdomain.",
  },
  {
    question: "Does invoicing support multiple currencies?",
    answer:
      "Yes — set the currency per invoice, so you can bill clients in their local currency without maintaining separate spreadsheets or tools.",
  },
  {
    question: "Can I import my existing clients and projects?",
    answer:
      "Yes. Free migration assistance is included on every paid plan — send us your data from spreadsheets or another tool and we'll get it into Sarion for you.",
  },
  {
    question: "Do clients need to create an account to use the portal?",
    answer:
      "No. Clients access their portal through a secure link — no signup, no password to remember. It works the same way whether they check it once a month or every day.",
  },
  {
    question: "Can I control what each team member can see or edit?",
    answer:
      "Yes. Team members you invite get access to your agency's workspace with role-based permissions, so junior staff and contractors only see what they need.",
  },
  {
    question: "Can I track tasks within a project, not just overall status?",
    answer:
      "Yes. Each project supports its own task checklist, so you can break work into steps and see exactly what's done versus outstanding — not just a single status label.",
  },
  {
    question: "Does Sarion send reminders for overdue invoices?",
    answer:
      "Overdue invoices are flagged automatically in your invoices list, so billing stays visible without you having to manually track due dates in a separate spreadsheet.",
  },
  {
    question: "Can clients comment directly on a project in the portal?",
    answer:
      "Yes. Clients can leave comments on their project inside the portal, so feedback happens in context instead of scattered across email and chat.",
    href: "/portal-demo",
    hrefLabel: "See portal comments in action",
  },
  {
    question: "What happens to my data if I switch plans?",
    answer:
      "Nothing is lost. Clients, projects, invoices, and portal history all stay intact when you upgrade or downgrade — you only gain or lose access to plan-specific features like custom subdomains.",
    href: "/pricing",
    hrefLabel: "Compare plan features",
  },
];

// /about — trust-building questions specific to the company itself.
export const ABOUT_FAQ: HomeFaqItem[] = [
  {
    question: "Is Sarion a real, funded company or a side project?",
    answer:
      "Sarion is a real, independent software company — not a side project. It's self-funded by the founding team, which means decisions are made for the long-term health of the product, not to satisfy investors.",
  },
  {
    question: "Where is the Sarion team based?",
    answer:
      "The founding team is based in India and works on Sarion full-time. Being a small, hands-on team means changes and fixes ship fast, and you're talking to the people who actually build the product.",
  },
  {
    question: "Can I talk to a founder directly?",
    answer:
      "Yes. Support and sales questions go straight to the founding team — there's no ticket queue or outsourced support layer between you and the people building Sarion.",
    href: "/contact",
    hrefLabel: "Contact the team",
  },
  {
    question: "Is Sarion going to disappear or get shut down?",
    answer:
      "Sarion is self-funded and profitable-first by design, not burning investor cash toward a shutdown or acquisition. Founding members also lock in pricing for life, which only makes sense for a product built to last.",
  },
];

// /contact — practical questions people have right before they message us.
export const CONTACT_FAQ: HomeFaqItem[] = [
  {
    question: "How fast do you respond?",
    answer:
      "We reply within one business day, and most messages get a response same-day. There's no ticket queue — your message goes straight to the founding team.",
  },
  {
    question: "Do you offer a demo call?",
    answer:
      "Yes. Mention it's for a demo in the form and we'll set up a time to walk through Sarion live and answer questions specific to your agency.",
  },
  {
    question: "Should I email sales or support?",
    answer:
      "If you're evaluating Sarion, have questions about plans, or want a demo, use the sales & general address. If you're already a customer with an account issue or a bug, use the support address — it gets prioritized differently.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes — reach out within 14 days of a paid charge and we'll refund it, no questions asked. Message either email above and we'll take care of it quickly.",
    href: "/pricing",
    hrefLabel: "See plans & pricing",
  },
  {
    question: "I'm not ready to talk to sales yet — can I just try it?",
    answer:
      "Of course. You can start on the Free plan or a 14-day trial without contacting anyone. The form here is for when you have a specific question or want a guided demo.",
    href: "/pricing",
    hrefLabel: "Start free",
  },
];

// /free — questions specific to the digital-product sample funnel.
export const FREE_FAQ: HomeFaqItem[] = [
  {
    question: "What's the difference between the free sample and the full kit?",
    answer:
      "The free sample is a genuine, complete slice of the Claude Code Mastery Kit — real pages, not a teaser. The full kit has the complete set of prompts, playbooks, and workflows across every chapter.",
    href: "/products/claude-code-mastery",
    hrefLabel: "See the full kit",
  },
  {
    question: "What format is the sample delivered in?",
    answer:
      "A downloadable PDF, delivered instantly to your inbox and available to download immediately after you submit your email — no waiting.",
  },
  {
    question: "Will I be charged anything after downloading the sample?",
    answer:
      "No. The sample requires only your email — no card, no trial that converts to a charge. You choose separately if and when you want to buy the full kit.",
  },
  {
    question: "Will you keep emailing me after I download it?",
    answer:
      "You'll get the download link and occasional updates about the full kit — every email has a one-click unsubscribe, and we don't sell or share your address.",
  },
];

// /portal-demo — questions specific to the client portal itself.
export const PORTAL_DEMO_FAQ: HomeFaqItem[] = [
  {
    question: "Do clients need to create an account to use the portal?",
    answer:
      "No. Clients open a secure link and land straight in their portal — no signup, no password to remember, no app to install.",
  },
  {
    question: "Can I control what clients see in their portal?",
    answer:
      "Yes. You choose which projects, files, and invoices are visible to each client — nothing shows up that you haven't shared, and nothing from other clients ever crosses over.",
  },
  {
    question: "Is the portal mobile-friendly?",
    answer:
      "Yes — the portal is fully responsive, so clients can check status, invoices, and files from their phone just as easily as their desktop.",
  },
  {
    question: "Does the client portal cost extra?",
    answer:
      "No. The branded client portal is included on every paid plan — it's not a separate add-on.",
    href: "/pricing",
    hrefLabel: "See what's included",
  },
  {
    question: "Is this exactly what my clients will see, or just a mockup?",
    answer:
      "This demo mirrors the real portal layout and interactions your clients get — projects, timeline, invoices, and files — using sample data so you can click through it freely before connecting your own.",
    href: "/features",
    hrefLabel: "See everything else Sarion includes",
  },
];

// /products — questions specific to the digital-product catalog (not the CRM).
export const PRODUCTS_FAQ: HomeFaqItem[] = [
  {
    question: "Are these one-time purchases or subscriptions?",
    answer:
      "The digital products (Claude Code Mastery Kit, templates, automation systems) are one-time purchases — pay once, keep them forever, including future updates to that product.",
  },
  {
    question: "Is SARION CRM part of this catalog?",
    answer:
      "No — SARION CRM is the flagship subscription product for running your agency, and is priced and sold separately from the digital-product catalog on this page.",
    href: "/pricing",
    hrefLabel: "View CRM pricing",
  },
  {
    question: "Who are these products built for?",
    answer:
      "Developers, agencies, and startups looking for practical engineering resources — AI/Claude Code workflows, automation templates, and boilerplates you can put to use immediately, not generic theory.",
  },
  {
    question: "What are the license terms?",
    answer:
      "Each product is licensed for use by the purchasing individual or team across their own projects and client work. Redistribution or resale of the materials themselves isn't permitted.",
  },
];

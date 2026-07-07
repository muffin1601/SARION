import type { Industry } from "../types";

export const webDevelopmentAgencies: Industry = {
  slug: "web-development-agencies",
  name: "Web Development Agencies",
  metaTitle: "CRM for Web Development Agencies",
  metaDescription:
    "A CRM built for web development agencies managing build phases, scope changes, launch handoffs, and the maintenance retainers that follow.",
  heroHeadline: "Ship the build without losing the paper trail",
  heroSubhead:
    "A build moves through discovery, design, dev, and launch — then into a maintenance retainer that can run for years. Sarion keeps scope, status, and billing attached to the project the whole way through.",

  painPoints: [
    {
      title: "\"Just one more page\" turns into a second project",
      description:
        "A client keeps adding pages, forms, and integrations mid-build with a verbal \"that's fine, right?\" — and by launch the site is twice the scope of the signed proposal, for the original price.",
    },
    {
      title: "Clients can't tell what's actually built",
      description:
        "You told them the checkout flow is done on a call two weeks ago. They don't know if that's still true, what's left, or whether the thing they're looking at in a browser is current — so they just ask again.",
    },
    {
      title: "Maintenance retainers get forgotten after launch",
      description:
        "The excitement of launch day passes, the hosting and maintenance retainer quietly starts, and three months later nobody can say for sure what work has been done against it or whether it's been invoiced correctly.",
    },
    {
      title: "Bug reports arrive from everywhere except one place",
      description:
        "A client texts a developer directly, emails the account manager, and mentions a third issue on a call — and none of the three people involved know about the other two reports.",
    },
  ],

  whyToolsFail: [
    {
      tool: "Generic project trackers",
      shortcoming:
        "Built for internal engineering sprints, not for a client who needs to see build progress in plain language without logging into a tool full of ticket statuses that mean nothing to them.",
    },
    {
      tool: "Spreadsheets",
      shortcoming:
        "A build tracker in a spreadsheet has no client-facing view and no connection to invoicing, so scope additions and maintenance hours get noted but rarely billed.",
    },
    {
      tool: "Ticketing tools built for internal IT",
      shortcoming:
        "Designed for employees filing their own tickets, not for external clients who need one simple place to report an issue and see it acknowledged — without learning a new interface.",
    },
  ],

  howSarionSolves: [
    {
      problem: "\"Just one more page\" turns into a second project",
      solution:
        "Every added request gets logged as a note or task against the client's project as it's asked for, so scope additions are on the record the moment they happen instead of being reconstructed from memory at invoicing time.",
    },
    {
      problem: "Clients can't tell what's actually built",
      solution:
        "Project status lives on the client record itself, visible to the client through their portal, so \"where are we\" has a current answer without a status call — what's done is done, in writing.",
    },
    {
      problem: "Maintenance retainers get forgotten after launch",
      solution:
        "The retainer becomes its own ongoing project in Sarion with recurring invoicing attached, so it doesn't quietly fade into an untracked line item after the launch-day project closes out.",
    },
    {
      problem: "Bug reports arrive from everywhere except one place",
      solution:
        "Clients log issues and requests through their branded portal against the live project, giving the team one record of what's been reported instead of three partial ones scattered across channels.",
    },
  ],

  relevantFeatureEyebrows: ["Client Portal", "Project Management", "Client Management", "Invoices"],

  workflow: [
    {
      step: "Kickoff: scope goes on the record",
      description:
        "The signed scope becomes the client's project baseline in Sarion, so anything added later is visibly an addition rather than an assumed part of the original build.",
    },
    {
      step: "Build phase: status stays current",
      description:
        "As design, dev, and QA move forward, status updates get logged against the project so the client's portal view reflects where the build actually stands, not where it stood on the last call.",
    },
    {
      step: "Review and launch",
      description:
        "The client reviews progress and approvals inside their portal in the run-up to launch, so sign-off is a recorded step in the project rather than a scattered email thread.",
    },
    {
      step: "Post-launch: maintenance retainer begins",
      description:
        "The project transitions into an ongoing maintenance retainer with its own recurring invoice, so hosting and support work keeps getting logged and billed on schedule after the excitement of launch day fades.",
    },
  ],

  faqs: [
    {
      question: "Does Sarion track our code or connect to a staging environment?",
      answer:
        "No — Sarion isn't a code repository or staging tool. It's where you track project status, client communication, scope, and invoicing around the technical build you're doing in your own dev tools.",
    },
    {
      question: "How does this help with scope creep during a build?",
      answer:
        "Every added request gets logged as a note or task against the client's project as it comes in, so by the end of the build you have a real record of what was added beyond the original signed scope.",
    },
    {
      question: "Can clients see how far along their build is without calling us?",
      answer:
        "Yes — project status lives on the client record and is visible through their portal, so a client can check where things stand instead of emailing the account manager to ask.",
    },
    {
      question: "What happens to a project in Sarion after launch?",
      answer:
        "It can carry forward into an ongoing maintenance retainer with its own recurring invoice, so post-launch hosting and support work stays tracked and billed instead of fading into an informal arrangement.",
    },
    {
      question: "How do clients report bugs or requests after launch?",
      answer:
        "Through their branded portal against the live project, so the team has one record of what's been reported instead of piecing it together from texts, emails, and calls after the fact.",
    },
  ],

  outcomes: [
    "Scope additions are on the record the moment a client asks for them, not reconstructed at invoicing time.",
    "Clients can check real build status themselves instead of calling for a verbal update.",
    "Maintenance retainers keep getting logged and invoiced instead of quietly lapsing after launch.",
    "Bug reports and requests land in one place instead of scattered across email, text, and calls.",
  ],

  relatedBlogSlugs: [
    "reduce-client-status-update-emails",
    "invoicing-best-practices-for-agencies",
    "automating-agency-admin-work",
  ],
  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedIndustrySlugs: ["design-agencies", "seo-agencies", "consultants"],
};

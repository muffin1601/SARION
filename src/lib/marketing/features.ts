/**
 * Marketing content data: problem cards, feature cards, screenshots, the
 * Features-page sections, and the Portal Demo content.
 * Pages import from here so copy changes never require editing components.
 *
 * The Portal Demo data below drives the interactive `/portal-demo` mock —
 * see docs/portal-demo-notes.md for the plan to eventually swap this for the
 * real Client Portal UI once F6 ships.
 */
import {
  Users,
  FolderKanban,
  Globe,
  FileText,
  UsersRound,
  Palette,
  SearchX,
  BellRing,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

import type { ShotName } from "@/components/marketing/product-shot";

export interface IconCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Home — B. Problem section
export const PROBLEM_CARDS: IconCard[] = [
  {
    icon: SearchX,
    title: "Client info everywhere",
    description: "Notes, files, and threads scattered across five tools.",
  },
  {
    icon: BellRing,
    title: '"Any update?" — again',
    description: "Every status question is an interruption you didn't need.",
  },
  {
    icon: CreditCard,
    title: "Invoices fall through the cracks",
    description: "Manual tracking means late payments you never see coming.",
  },
];

// Home — C. Features preview
export const FEATURE_CARDS: IconCard[] = [
  {
    icon: Users,
    title: "Client Management",
    description: "Every client's details, notes, and history — one place.",
  },
  {
    icon: FolderKanban,
    title: "Project Tracking",
    description: "Status, due dates, and progress across every engagement.",
  },
  {
    icon: Globe,
    title: "Client Portal",
    description: "A branded space where clients see progress, no back-and-forth.",
  },
  {
    icon: FileText,
    title: "Invoices",
    description: "Paid, unpaid, overdue — always visible, never missed.",
  },
  {
    icon: UsersRound,
    title: "Team Collaboration",
    description:
      "Invite teammates with the right access and work from one shared space.",
  },
  {
    icon: Palette,
    title: "Agency Branding",
    description:
      "Add your logo and name so your client portal looks like yours.",
  },
];

// Features page — alternating sections
export interface FeatureSection {
  eyebrow: string;
  title: string;
  /** Who this section is for and how they use it day-to-day, in one sentence. */
  workflow: string;
  /** The concrete outcome/benefit this section delivers. */
  benefit: string;
  features: string[];
  /** Real screenshot shown alongside the section. */
  shot: ShotName;
  shotAlt: string;
  /** Optional contextual link shown under the feature list (e.g. pricing, demo). */
  ctaHref?: string;
  ctaLabel?: string;
}

export const FEATURE_SECTIONS: FeatureSection[] = [
  {
    eyebrow: "Client Management",
    title: "Every client, fully organized",
    workflow:
      "Built for account managers who juggle a dozen clients at once — log a call note right after you hang up, then search it back up months later instead of digging through old email threads.",
    benefit:
      "Nobody on the team has to ask \"does anyone know where that came from?\" again.",
    features: ["Client records", "Notes", "Activity history", "Search"],
    shot: "clients",
    shotAlt: "The Sarion clients list with company, email, and project counts",
  },
  {
    eyebrow: "Project Management",
    title: "Keep work moving forward",
    workflow:
      "Project leads set a status and due date the moment a project kicks off, then check the board each morning to see what's slipping before a client has to ask.",
    benefit: "Deadlines stay visible instead of living in someone's memory.",
    features: ["Status tracking", "Due dates", "Task checklists"],
    shot: "projects",
    shotAlt: "The Sarion projects view showing status and due dates per client",
  },
  {
    eyebrow: "Client Portal",
    title: "A branded space for your clients",
    workflow:
      "Instead of writing a status-update email every Friday, account managers post progress once and clients check their own branded portal to comment and follow along.",
    benefit: "Status-update emails go away almost entirely.",
    features: [
      "Branded portal",
      "Comments",
      "Progress visibility",
      "Shareable access",
    ],
    shot: "portal",
    shotAlt: "The branded Sarion client portal with project updates and comments",
    ctaHref: "/portal-demo",
    ctaLabel: "See it live",
  },
  {
    eyebrow: "Invoices",
    title: "Never lose track of a payment",
    workflow:
      "Whoever handles billing marks an invoice sent, then glances at the paid/unpaid/overdue split each week instead of reconciling a spreadsheet against a bank statement.",
    benefit: "Overdue invoices get chased before they turn into bad debt.",
    features: ["Paid", "Unpaid", "Overdue"],
    shot: "invoices",
    shotAlt: "The Sarion invoices list showing paid, unpaid, and overdue status",
    ctaHref: "/pricing",
    ctaLabel: "See plans",
  },
  {
    eyebrow: "Team Collaboration",
    title: "Work together, cleanly",
    workflow:
      "Founders invite contractors and junior staff with the exact access they need, so a freelancer working one project never sees client data outside their lane.",
    benefit: "Everyone works from the same source of truth, with no oversharing.",
    features: ["Owner access", "Team member access", "Shared workflows"],
    shot: "team",
    shotAlt: "The Sarion team settings with members, invites, and permissions",
    ctaHref: "/pricing",
    ctaLabel: "See plans",
  },
];

// ---------------------------------------------------------------------------
// Portal Demo content — drives the interactive /portal-demo mock.
// See docs/portal-demo-notes.md for the plan to swap this for the real
// Client Portal (F6) data/UI once it ships.
// ---------------------------------------------------------------------------
export type BadgeVariant = "mBadgeInfo" | "mBadgeSuccess" | "mBadgeWarning";

export interface PortalProject {
  name: string;
  status: string;
  badge: BadgeVariant;
  due: string;
  /** Index into PORTAL_TIMELINE_STAGES marking the project's current stage. */
  stage: number;
}

export interface PortalInvoice {
  number: string;
  status: string;
  badge: BadgeVariant;
}

export interface PortalActivity {
  text: string;
  time: string;
}

export interface PortalComment {
  author: string;
  text: string;
  time: string;
}

export interface PortalFile {
  name: string;
  size: string;
}

export interface PortalNotification {
  text: string;
}

export interface PortalInvoiceLineItem {
  label: string;
  amount: string;
}

export const PORTAL_COMPANY = "Acme Marketing";

export const PORTAL_TIMELINE_STAGES = ["Kickoff", "In Progress", "Review", "Delivered"];

export const PORTAL_PROJECTS: PortalProject[] = [
  { name: "Website Redesign", status: "In Progress", badge: "mBadgeInfo", due: "June 30", stage: 1 },
  { name: "SEO Campaign", status: "Active", badge: "mBadgeSuccess", due: "July 15", stage: 2 },
];

// Sample comment threads shown when a project row is expanded — keyed by
// PortalProject.name.
export const PORTAL_COMMENTS: Record<string, PortalComment[]> = {
  "Website Redesign": [
    { author: "Sara (Sarion)", text: "Homepage draft is up for review — check the portal link above.", time: "2 days ago" },
    { author: "Acme Marketing", text: "Looks great! Can we tweak the hero copy slightly?", time: "1 day ago" },
    { author: "Sara (Sarion)", text: "Done — pushed a new version just now.", time: "5 hours ago" },
  ],
  "SEO Campaign": [
    { author: "Sara (Sarion)", text: "Uploaded this month's audit and keyword report.", time: "4 days ago" },
    { author: "Acme Marketing", text: "Thanks, reviewing now.", time: "3 days ago" },
  ],
};

export const PORTAL_INVOICES: PortalInvoice[] = [
  { number: "INV-001", status: "Paid", badge: "mBadgeSuccess" },
  { number: "INV-002", status: "Pending", badge: "mBadgeWarning" },
];

// Line-item breakdown shown when an invoice row is expanded — keyed by
// PortalInvoice.number.
export const PORTAL_INVOICE_LINE_ITEMS: Record<string, PortalInvoiceLineItem[]> = {
  "INV-001": [
    { label: "Website redesign — Phase 1", amount: "$2,400" },
    { label: "Stock imagery licensing", amount: "$150" },
  ],
  "INV-002": [
    { label: "SEO Campaign — June retainer", amount: "$1,800" },
    { label: "Keyword research add-on", amount: "$300" },
  ],
};

export const PORTAL_ACTIVITY: PortalActivity[] = [
  { text: "Website homepage approved", time: "2 days ago" },
  { text: "SEO audit uploaded", time: "4 days ago" },
];

export const PORTAL_FILES: PortalFile[] = [
  { name: "homepage-draft-v3.pdf", size: "2.1 MB" },
  { name: "seo-audit-june.pdf", size: "860 KB" },
  { name: "brand-assets.zip", size: "14.4 MB" },
];

export const PORTAL_NOTIFICATIONS: PortalNotification[] = [
  { text: "Invoice INV-002 is due in 3 days" },
  { text: "Acme Marketing commented on Website Redesign" },
];

// Benefits shown side-by-side on /portal-demo.
export const PORTAL_BENEFITS_AGENCY: IconCard[] = [
  {
    icon: BellRing,
    title: "Fewer status-update emails",
    description: "Clients check the portal instead of messaging you for updates.",
  },
  {
    icon: FileText,
    title: "Invoices clients can't lose",
    description: "Payment status is always visible — no more \"did you get my invoice?\"",
  },
  {
    icon: Globe,
    title: "Looks like your product",
    description: "Your logo and branding, not Sarion's — clients see your agency, not ours.",
  },
];

export const PORTAL_BENEFITS_CLIENT: IconCard[] = [
  {
    icon: FolderKanban,
    title: "Always know where things stand",
    description: "See real project status without waiting on a reply.",
  },
  {
    icon: SearchX,
    title: "One place for everything",
    description: "Files, invoices, and updates in one link — nothing buried in email.",
  },
  {
    icon: CreditCard,
    title: "Clear on what's owed",
    description: "See paid, pending, and overdue invoices at a glance.",
  },
];

export interface BeforeAfterItem {
  before: string;
  after: string;
}

export const PORTAL_BEFORE_AFTER: BeforeAfterItem[] = [
  { before: "Clients email asking for a status update.", after: "Clients check their portal — no email needed." },
  { before: "Invoices get lost in someone's inbox.", after: "Payment status is always visible in the portal." },
  { before: "Files get shared across five different tools.", after: "Every file lives in one place, per project." },
];

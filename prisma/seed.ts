/**
 * Launch demo seed — a single, hand-curated agency ("Northbeam Studio") that
 * looks like a real, actively-used workspace. Built for marketing screenshots,
 * Product Hunt, investor demos, and outreach — NOT throwaway test data.
 *
 * Everything here uses ONLY real Prisma schema fields (see prisma/schema.prisma):
 *   • Client    → name, company, email, phone, notes (industry/status live in notes)
 *   • Project   → name, description, status, startDate, dueDate (+ Task rows)
 *   • Invoice   → number, status (paid|unpaid; overdue is computed), issue/due, total, items
 *   • User      → name, email, role (owner|member), image
 *   • Portal    → PortalComment (client-facing) + Comment (internal)
 *   • Activity  → append-only feed powering the dashboard + detail pages
 *
 * Login: every user signs in at /login with the shared DEMO_PASSWORD below.
 * Passwords are hashed with Better Auth's own hasher and stored as a
 * `credential` Account, exactly like real signups.
 *
 * Idempotent: re-running wipes the demo agency (matched by owner email) and
 * recreates it. Run with: npm run db:seed
 */
import { PrismaClient } from "@prisma/client";

import { auth } from "../src/lib/auth";

const prisma = new PrismaClient();

// Shared demo password (meets the 8-char minimum).
const DEMO_PASSWORD = "Sarion!Demo123";

const AGENCY_DOMAIN = "northbeam.studio";
const OWNER_EMAIL = `owner@${AGENCY_DOMAIN}`;

// ---------------------------------------------------------------------------
// Deterministic date helpers (no Math.random/Date.now drift in content) so the
// seed is reproducible run-to-run.
// ---------------------------------------------------------------------------
const at = (offsetDays: number, hour = 11, minute = 0) => {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  d.setDate(d.getDate() + offsetDays);
  return d;
};
const hoursAgo = (h: number) => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - h * 60);
  return d;
};

// A self-contained "NS" monogram logo (data URI) so the agency looks branded
// in the client portal + settings without any external asset dependency.
const LOGO_DATA_URI =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">` +
      `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
      `<stop offset="0" stop-color="#2563eb"/><stop offset="1" stop-color="#7c3aed"/>` +
      `</linearGradient></defs>` +
      `<rect width="64" height="64" rx="14" fill="url(#g)"/>` +
      `<text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" ` +
      `font-family="Georgia, serif" font-size="28" font-weight="700" fill="#fff">NS</text>` +
      `</svg>`,
  );

const avatar = (name: string) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;

// ---------------------------------------------------------------------------
// Curated content
// ---------------------------------------------------------------------------

// Team — schema only stores owner|member, so job titles live in this table for
// our use and are reflected in pending-invite labels; the User.role is the real
// permission level.
const TEAM = [
  { name: "Sara Whitfield", email: OWNER_EMAIL, role: "owner" as const, title: "Founder & Creative Director", joined: -210 },
  { name: "Daniel Reyes", email: `daniel@${AGENCY_DOMAIN}`, role: "member" as const, title: "Project Manager", joined: -180 },
  { name: "Amara Okafor", email: `amara@${AGENCY_DOMAIN}`, role: "member" as const, title: "Lead Designer", joined: -150 },
  { name: "Liam Bennett", email: `liam@${AGENCY_DOMAIN}`, role: "member" as const, title: "Senior Developer", joined: -120 },
];

// One pending invite so the Team page's "Pending Invites" section is populated.
const PENDING_INVITE = {
  name: "Priya Patel",
  email: `priya@${AGENCY_DOMAIN}`,
};

const CLIENTS = [
  {
    key: "acme",
    name: "Acme Marketing",
    company: "Acme Marketing Inc.",
    email: "hello@acmemarketing.com",
    phone: "+1 (415) 555-0142",
    notes:
      "Industry: Marketing Agency · Status: Active\n\n" +
      "Long-standing retainer client. Refers new business regularly. Primary " +
      "contact is Jordan Mills (CMO). Prefers weekly Friday check-ins and " +
      "quarterly strategy reviews.",
    created: -190,
  },
  {
    key: "orbit",
    name: "Orbit Labs",
    company: "Orbit Labs, Inc.",
    email: "founders@orbitlabs.io",
    phone: "+1 (628) 555-0119",
    notes:
      "Industry: SaaS · Status: Active\n\n" +
      "Series A startup. Fast-moving team — expects async updates in Slack. " +
      "Currently mid-way through a full marketing-site redesign across two " +
      "milestones. Decision maker: Naomi Chen (Head of Growth).",
    created: -140,
  },
  {
    key: "brightside",
    name: "Brightside Co",
    company: "Brightside Co.",
    email: "team@brightside.co",
    phone: "+1 (312) 555-0188",
    notes:
      "Industry: E-commerce · Status: Active\n\n" +
      "DTC home-goods brand on Shopify. Seasonal campaigns drive most revenue. " +
      "Photography-heavy work. Watch invoice timing — AP runs net-30 and the " +
      "last invoice ran a week late.",
    created: -95,
  },
  {
    key: "meridian",
    name: "Meridian Health",
    company: "Meridian Health Group",
    email: "ops@meridianhealth.com",
    phone: "+1 (206) 555-0173",
    notes:
      "Industry: Healthcare · Status: Active\n\n" +
      "Multi-location clinic group on a quarterly retainer. Compliance-sensitive " +
      "— all copy is reviewed by their legal team before publishing. Reliable, " +
      "on-time payer.",
    created: -70,
  },
];

// Projects spanning every status + completion stage. due is offset in days.
const PROJECTS = [
  { client: "orbit", name: "Website Redesign", status: "ACTIVE" as const, start: -45, due: 4, doneTasks: 4, totalTasks: 7,
    desc: "Full marketing-site redesign for Orbit Labs — new IA, design system, and CMS build. Delivered across two milestones." },
  { client: "acme", name: "SEO Campaign", status: "ACTIVE" as const, start: -30, due: 6, doneTasks: 3, totalTasks: 6,
    desc: "Ongoing technical + content SEO program for Acme Marketing. Targeting 12 priority keywords this quarter." },
  { client: "brightside", name: "Brand Refresh", status: "ACTIVE" as const, start: -20, due: 16, doneTasks: 2, totalTasks: 6,
    desc: "Visual identity refresh for Brightside Co ahead of the holiday season — logo, palette, packaging, and storefront." },
  { client: "meridian", name: "Q3 Retainer", status: "ACTIVE" as const, start: -25, due: 22, doneTasks: 3, totalTasks: 5,
    desc: "Quarterly marketing retainer for Meridian Health — landing pages, email, and monthly reporting." },
  { client: "acme", name: "Launch Landing Page", status: "COMPLETED" as const, start: -60, due: -8, doneTasks: 6, totalTasks: 6,
    desc: "High-converting product launch landing page for Acme Marketing. Shipped and handed off." },
  { client: "orbit", name: "Client Portal Setup", status: "PLANNED" as const, start: 7, due: 55, doneTasks: 0, totalTasks: 5,
    desc: "Stand up a branded client portal for Orbit Labs' own customers. Scoping complete; kickoff scheduled." },
  { client: "brightside", name: "Holiday Email Campaign", status: "ON_HOLD" as const, start: -10, due: 38, doneTasks: 1, totalTasks: 5,
    desc: "Multi-send holiday email campaign for Brightside Co. Paused pending final product list from the client." },
];

const TASK_POOL = [
  "Kickoff call with client",
  "Discovery & research",
  "Wireframes / concepts",
  "Design review",
  "Copywriting pass",
  "Build & implementation",
  "QA + accessibility check",
];

// Invoices INV-1001..1006 — realistic line items; statuses give a healthy,
// varied dashboard (paid revenue > outstanding, one overdue).
// NOTE: the schema has no tax field and no "draft" status — see the report.
type Inv = {
  number: string;
  client: string;
  status: "paid" | "unpaid";
  issue: number;
  due: number;
  items: { description: string; qty: number; unitPrice: number }[];
};
const INVOICES: Inv[] = [
  { number: "INV-1001", client: "acme", status: "paid", issue: -42, due: -28, items: [
    { description: "Brand strategy workshop", qty: 1, unitPrice: 3500 },
    { description: "Messaging & positioning doc", qty: 1, unitPrice: 2000 },
  ] },
  { number: "INV-1002", client: "meridian", status: "paid", issue: -34, due: -20, items: [
    { description: "Q3 retainer — July", qty: 1, unitPrice: 4000 },
  ] },
  { number: "INV-1003", client: "orbit", status: "paid", issue: -26, due: -12, items: [
    { description: "Website redesign — Milestone 1 (design)", qty: 1, unitPrice: 6000 },
  ] },
  // Overdue: unpaid + due date in the past → app renders "Overdue".
  { number: "INV-1004", client: "brightside", status: "unpaid", issue: -30, due: -7, items: [
    { description: "Shopify theme development", qty: 1, unitPrice: 2400 },
    { description: "Product photography (half-day)", qty: 1, unitPrice: 800 },
  ] },
  // Pending: unpaid + future due → app renders "Unpaid".
  { number: "INV-1005", client: "acme", status: "unpaid", issue: -6, due: 18, items: [
    { description: "SEO campaign — setup & audit", qty: 1, unitPrice: 2800 },
    { description: "SEO content articles", qty: 4, unitPrice: 400 },
  ] },
  { number: "INV-1006", client: "orbit", status: "unpaid", issue: -2, due: 26, items: [
    { description: "Website redesign — Milestone 2 (build)", qty: 1, unitPrice: 6000 },
  ] },
];

// --- Bulk filler: brings client/project/invoice/proposal/subscription/
// automation counts up to a realistic "actively used for months" scale on
// top of the 4 hand-curated clients above. Generated from small pools rather
// than hand-written one-by-one, but every row still uses only real schema
// fields and reads naturally (real-sounding company names, plausible amounts).
const FILLER_INDUSTRIES = [
  "Fintech", "Legal Services", "Hospitality", "Real Estate", "Nonprofit",
  "Higher Education", "Consumer Electronics", "Fitness & Wellness", "Food & Beverage",
  "Renewable Energy", "Logistics", "Insurance", "Media & Publishing", "Travel",
  "Home Services", "Professional Services",
];
const FILLER_COMPANIES = [
  { key: "cedarline", name: "Cedarline Partners", company: "Cedarline Partners LLC", domain: "cedarlinepartners.com" },
  { key: "haloforge", name: "Haloforge", company: "Haloforge Inc.", domain: "haloforge.io" },
  { key: "westmark", name: "Westmark Realty", company: "Westmark Realty Group", domain: "westmarkrealty.com" },
  { key: "brightpath", name: "Brightpath Foundation", company: "Brightpath Foundation", domain: "brightpathfdn.org" },
  { key: "solandra", name: "Solandra Energy", company: "Solandra Energy Co.", domain: "solandraenergy.com" },
  { key: "keystoneins", name: "Keystone Mutual", company: "Keystone Mutual Insurance", domain: "keystonemutual.com" },
  { key: "faircrest", name: "Faircrest Hotels", company: "Faircrest Hospitality Group", domain: "faircresthotels.com" },
  { key: "novareach", name: "NovaReach Media", company: "NovaReach Media Group", domain: "novareach.media" },
  { key: "pinehollow", name: "Pine Hollow Fitness", company: "Pine Hollow Fitness Studios", domain: "pinehollowfit.com" },
  { key: "urbanroot", name: "Urban Root Kitchen", company: "Urban Root Kitchen Co.", domain: "urbanrootkitchen.com" },
  { key: "cascadelaw", name: "Cascade Legal Group", company: "Cascade Legal Group LLP", domain: "cascadelegalgroup.com" },
  { key: "swiftcargo", name: "Swiftcargo Logistics", company: "Swiftcargo Logistics Inc.", domain: "swiftcargo.com" },
  { key: "brightloop", name: "Brightloop University Prep", company: "Brightloop Education Trust", domain: "brightloopedu.org" },
  { key: "voyagewell", name: "Voyagewell Travel", company: "Voyagewell Travel Co.", domain: "voyagewelltravel.com" },
  { key: "homestead", name: "Homestead Services Co", company: "Homestead Services Co.", domain: "homesteadservices.com" },
  { key: "gridpoint", name: "Gridpoint Consulting", company: "Gridpoint Consulting Group", domain: "gridpointconsulting.com" },
];
const EXTRA_CLIENTS = FILLER_COMPANIES.map((c, i) => ({
  key: c.key,
  name: c.name,
  company: c.company,
  email: `hello@${c.domain}`,
  phone: `+1 (${400 + i}) 555-0${100 + i}`,
  notes: `Industry: ${FILLER_INDUSTRIES[i % FILLER_INDUSTRIES.length]} · Status: Active\n\nOnboarded client, standard monthly engagement.`,
  created: -(30 + i * 9),
}));

const PROJECT_NAME_POOL = [
  "Website Redesign", "SEO Program", "Brand Identity Refresh", "Email Marketing Setup",
  "Social Media Management", "Landing Page Sprint", "CRM Migration", "Content Strategy",
];
const PROJECT_STATUS_POOL = ["ACTIVE", "ACTIVE", "ACTIVE", "COMPLETED", "PLANNED", "ON_HOLD", "ACTIVE", "COMPLETED"] as const;
const EXTRA_PROJECTS = EXTRA_CLIENTS.slice(0, 8).map((c, i) => ({
  client: c.key,
  name: PROJECT_NAME_POOL[i % PROJECT_NAME_POOL.length],
  status: PROJECT_STATUS_POOL[i % PROJECT_STATUS_POOL.length],
  start: -(20 + i * 6),
  due: PROJECT_STATUS_POOL[i % PROJECT_STATUS_POOL.length] === "COMPLETED" ? -(5 + i) : 10 + i * 4,
  doneTasks: (i % 5) + 1,
  totalTasks: 6,
  desc: `${PROJECT_NAME_POOL[i % PROJECT_NAME_POOL.length]} engagement for ${c.name}.`,
}));

const EXTRA_INVOICES: Inv[] = Array.from({ length: 24 }, (_, i) => {
  const client = [...CLIENTS, ...EXTRA_CLIENTS][i % (CLIENTS.length + EXTRA_CLIENTS.length)];
  const paid = i % 3 !== 0;
  const amount = 900 + (i % 7) * 350;
  return {
    number: `INV-${2000 + i}`,
    client: client.key,
    status: paid ? "paid" : "unpaid",
    issue: -(60 - i * 2),
    due: paid ? -(45 - i * 2) : 15 + i,
    items: [{ description: "Monthly services", qty: 1, unitPrice: amount }],
  };
});

// --- Proposals ---------------------------------------------------------
const PROPOSAL_STATUSES = ["draft", "sent", "viewed", "accepted", "accepted", "rejected", "expired", "sent", "viewed", "accepted"] as const;
const PROPOSALS = Array.from({ length: 10 }, (_, i) => {
  const pool = [...CLIENTS, ...EXTRA_CLIENTS];
  const client = pool[(i * 3) % pool.length];
  const amount = 2000 + i * 450;
  return {
    client: client.key,
    name: `${PROJECT_NAME_POOL[i % PROJECT_NAME_POOL.length]} Proposal`,
    status: PROPOSAL_STATUSES[i],
    amount,
    created: -(40 - i * 3),
  };
});

// --- Subscriptions (recurring billing) ----------------------------------
const SUBSCRIPTIONS = [
  { client: "acme", name: "SEO Retainer", amount: 1500, frequency: "MONTHLY" as const, created: -150 },
  { client: "meridian", name: "Q3 Retainer", amount: 4000, frequency: "MONTHLY" as const, created: -95 },
  { client: "cedarline", name: "Ongoing Consulting Retainer", amount: 2200, frequency: "MONTHLY" as const, created: -60 },
  { client: "faircrest", name: "Marketing Retainer", amount: 1800, frequency: "MONTHLY" as const, created: -45 },
  { client: "cascadelaw", name: "Content & SEO Retainer", amount: 1200, frequency: "MONTHLY" as const, created: -30 },
];

// --- Automations ---------------------------------------------------------
const AUTOMATIONS = [
  { name: "Welcome new clients", triggerType: "Client Created", enabled: true,
    actions: [{ type: "create_activity", title: "New client onboarded", description: "A new client was added — kick off onboarding." }] },
  { name: "Celebrate paid invoices", triggerType: "Invoice Paid", enabled: true,
    actions: [{ type: "create_activity", title: "Invoice paid", description: "Payment received — nice work." }] },
  { name: "Notify on proposal acceptance", triggerType: "Proposal Accepted", enabled: true,
    actions: [{ type: "create_activity", title: "Proposal accepted", description: "A client accepted a proposal." }] },
  { name: "Flag failed billing", triggerType: "Subscription Failed", enabled: true,
    actions: [{ type: "create_activity", title: "Billing failed", description: "A recurring billing attempt failed — follow up with the client." }] },
  { name: "Log completed projects", triggerType: "Project Completed", enabled: false,
    actions: [{ type: "create_activity", title: "Project completed", description: "A project was marked complete." }] },
];

// Portal threads (client-facing) — make the portal look active.
const PORTAL_THREADS: { project: string; messages: { author: string; message: string; at: number }[] }[] = [
  {
    project: "Website Redesign",
    messages: [
      { author: "Naomi Chen", message: "The new homepage direction looks fantastic — the hero really lands. 🙌", at: 2 },
      { author: "Amara Okafor", message: "Thanks Naomi! We'll have the interior pages ready for review by Thursday.", at: 1.5 },
      { author: "Naomi Chen", message: "Perfect. One small thing — can we try a slightly bolder CTA color?", at: 1 },
    ],
  },
  {
    project: "Brand Refresh",
    messages: [
      { author: "Brightside Co", message: "Loving the palette options. Option B feels the most 'us'.", at: 20 },
      { author: "Sara Whitfield", message: "Great choice — we'll build the packaging mockups around Option B.", at: 19 },
    ],
  },
];

// ---------------------------------------------------------------------------
async function createUser(opts: {
  agencyId: string;
  name: string;
  email: string;
  role: "owner" | "member";
  image: string;
  passwordHash: string;
  createdAt: Date;
}) {
  const user = await prisma.user.create({
    data: {
      agencyId: opts.agencyId,
      name: opts.name,
      email: opts.email,
      emailVerified: true,
      role: opts.role,
      image: opts.image,
      createdAt: opts.createdAt,
    },
  });
  await prisma.account.create({
    data: {
      userId: user.id,
      accountId: user.id,
      providerId: "credential",
      password: opts.passwordHash,
    },
  });
  return user;
}

async function main() {
  const ctx = await auth.$context;
  const passwordHash = await ctx.password.hash(DEMO_PASSWORD);

  // --- Clean any previous demo agency (cascade removes everything) -----------
  const existing = await prisma.user.findFirst({
    where: { email: OWNER_EMAIL },
    select: { agencyId: true },
  });
  if (existing) {
    await prisma.agency.delete({ where: { id: existing.agencyId } });
    console.log("Removed existing Northbeam Studio demo agency.");
  }

  // --- Agency ----------------------------------------------------------------
  const agency = await prisma.agency.create({
    data: {
      name: "Northbeam Studio",
      logoUrl: LOGO_DATA_URI,
      planTier: "growth",
      billingInterval: "monthly",
      foundingMember: true,
      subscriptionStatus: "active",
      seeded: true, // prevents the auto-seed (ensureWorkspaceSeeded) from running
      createdAt: at(-210),
    },
  });

  // --- Team ------------------------------------------------------------------
  const userIds: Record<string, string> = {};
  for (const m of TEAM) {
    const user = await createUser({
      agencyId: agency.id,
      name: m.name,
      email: m.email,
      role: m.role,
      image: avatar(m.name),
      passwordHash,
      createdAt: at(m.joined),
    });
    userIds[m.email] = user.id;
  }
  const ownerId = userIds[OWNER_EMAIL];
  const teamMemberIds = TEAM.filter((m) => m.role === "member").map((m) => userIds[m.email]);

  // Pending invite (Team page → Pending Invites).
  await prisma.teamInvite.create({
    data: {
      agencyId: agency.id,
      name: PENDING_INVITE.name,
      email: PENDING_INVITE.email,
      role: "member",
      expiresAt: at(6),
      createdAt: hoursAgo(30),
    },
  });

  // --- Clients ---------------------------------------------------------------
  const clientIds: Record<string, string> = {};
  for (const c of [...CLIENTS, ...EXTRA_CLIENTS]) {
    const client = await prisma.client.create({
      data: {
        agencyId: agency.id,
        name: c.name,
        company: c.company,
        email: c.email,
        phone: c.phone,
        notes: c.notes,
        createdAt: at(c.created),
      },
    });
    clientIds[c.key] = client.id;
    await prisma.activity.create({
      data: {
        agencyId: agency.id,
        clientId: client.id,
        type: "Client Created",
        description: `Client "${client.name}" was added.`,
        createdAt: at(c.created),
      },
    });
  }

  // --- Projects + tasks ------------------------------------------------------
  const projectIds: Record<string, string> = {};
  for (const p of [...PROJECTS, ...EXTRA_PROJECTS]) {
    const clientId = clientIds[p.client];
    // A couple of filler projects reuse a name already used by another
    // client — key project lookups by a unique combo, not name alone.
    const projectKey = `${p.client}:${p.name}`;
    const project = await prisma.project.create({
      data: {
        agencyId: agency.id,
        clientId,
        name: p.name,
        description: p.desc,
        status: p.status,
        startDate: at(p.start),
        dueDate: at(p.due),
        createdAt: at(p.start),
      },
    });
    projectIds[projectKey] = project.id;
    if (!projectIds[p.name]) projectIds[p.name] = project.id;

    await prisma.task.createMany({
      data: TASK_POOL.slice(0, p.totalTasks).map((title, i) => ({
        agencyId: agency.id,
        projectId: project.id,
        title,
        isDone: i < p.doneTasks,
        sortOrder: i,
      })),
    });

    await prisma.activity.create({
      data: {
        agencyId: agency.id,
        clientId,
        projectId: project.id,
        type: "Project Created",
        description: `Project "${project.name}" was created.`,
        createdAt: at(p.start),
      },
    });
  }

  // --- Invoices --------------------------------------------------------------
  let maxSeq = 1000;
  for (const inv of [...INVOICES, ...EXTRA_INVOICES]) {
    const clientId = clientIds[inv.client];
    const total = inv.items.reduce((s, it) => s + it.qty * it.unitPrice, 0);
    const seqNum = Number(inv.number.replace(/\D/g, ""));
    maxSeq = Math.max(maxSeq, seqNum);

    await prisma.invoice.create({
      data: {
        agencyId: agency.id,
        clientId,
        number: inv.number,
        status: inv.status,
        total,
        issueDate: at(inv.issue),
        dueDate: at(inv.due),
        createdAt: at(inv.issue),
        items: {
          create: inv.items.map((it) => ({
            agencyId: agency.id,
            description: it.description,
            qty: it.qty,
            unitPrice: it.unitPrice,
            lineTotal: it.qty * it.unitPrice,
          })),
        },
      },
    });

    await prisma.activity.create({
      data: {
        agencyId: agency.id,
        clientId,
        type: inv.status === "paid" ? "Invoice Paid" : "Invoice Created",
        description: `Invoice ${inv.number} ($${total.toLocaleString()}) — ${
          inv.status === "paid" ? "paid" : "sent"
        }.`,
        createdAt: at(inv.issue),
      },
    });
  }

  // Continue the app's invoice numbering after the seeded run.
  await prisma.agency.update({
    where: { id: agency.id },
    data: { invoiceSequence: maxSeq + 1 },
  });

  // --- Proposals ---------------------------------------------------------
  for (const p of PROPOSALS) {
    const clientId = clientIds[p.client];
    const isAccepted = p.status === "accepted";
    const isSent = p.status !== "draft";
    const proposal = await prisma.proposal.create({
      data: {
        agencyId: agency.id,
        clientId,
        name: p.name,
        status: p.status,
        subtotal: p.amount,
        total: p.amount,
        createdBy: ownerId,
        createdAt: at(p.created),
        sentAt: isSent ? at(p.created + 1) : null,
        viewedAt: p.status === "viewed" || isAccepted ? at(p.created + 2) : null,
        acceptedByName: isAccepted ? "Client Contact" : null,
        acceptedAt: isAccepted ? at(p.created + 3) : null,
        rejectedAt: p.status === "rejected" ? at(p.created + 3) : null,
        rejectedReason: p.status === "rejected" ? "Went with another vendor." : null,
        items: {
          create: [{ agencyId: agency.id, description: `${p.name} — scope of work`, qty: 1, unitPrice: p.amount, lineTotal: p.amount }],
        },
      },
    });
    await prisma.activity.create({
      data: {
        agencyId: agency.id,
        clientId,
        type: isAccepted ? "Proposal Accepted" : "Proposal Created",
        description: isAccepted
          ? `Proposal "${proposal.name}" was accepted.`
          : `Proposal "${proposal.name}" was created.`,
        createdAt: at(p.created),
      },
    });
  }

  // --- Subscriptions (recurring billing) ----------------------------------
  for (const s of SUBSCRIPTIONS) {
    const clientId = clientIds[s.client];
    const subscription = await prisma.subscription.create({
      data: {
        agencyId: agency.id,
        clientId,
        name: s.name,
        amount: s.amount,
        frequency: s.frequency,
        nextBillingDate: at(20), // next cycle due in 20 days — realistic "active" state
        status: "active",
        createdBy: ownerId,
        createdAt: at(s.created),
      },
    });
    // One already-billed occurrence in the past, wired to a real invoice, so
    // Billing History and Finance both show real activity for this subscription.
    maxSeq += 1;
    const occurrenceAmount = s.amount;
    const occurrenceInvoice = await prisma.invoice.create({
      data: {
        agencyId: agency.id,
        clientId,
        number: `INV-${maxSeq}`,
        status: "paid",
        total: occurrenceAmount,
        issueDate: at(s.created + 30),
        dueDate: at(s.created + 44),
        createdAt: at(s.created + 30),
        items: { create: [{ agencyId: agency.id, description: `${s.name} — recurring invoice`, qty: 1, unitPrice: occurrenceAmount, lineTotal: occurrenceAmount }] },
      },
    });
    await prisma.recurringInvoice.create({
      data: {
        agencyId: agency.id,
        subscriptionId: subscription.id,
        invoiceId: occurrenceInvoice.id,
        scheduledFor: at(s.created + 30),
        generatedAt: at(s.created + 30),
        status: "generated",
      },
    });
    await prisma.activity.create({
      data: {
        agencyId: agency.id,
        clientId,
        invoiceId: occurrenceInvoice.id,
        type: "Subscription Renewed",
        description: `Invoice ${occurrenceInvoice.number} generated for "${s.name}".`,
        createdAt: at(s.created + 30),
      },
    });
  }
  await prisma.agency.update({ where: { id: agency.id }, data: { invoiceSequence: maxSeq + 1 } });

  // --- Automations ---------------------------------------------------------
  for (const a of AUTOMATIONS) {
    const automation = await prisma.automation.create({
      data: {
        agencyId: agency.id,
        name: a.name,
        enabled: a.enabled,
        triggerType: a.triggerType,
        actions: a.actions,
        createdBy: ownerId,
      },
    });
    if (a.enabled) {
      await prisma.automationRun.create({
        data: {
          automationId: automation.id,
          status: "success",
          triggeredAt: hoursAgo(30),
          completedAt: hoursAgo(30),
          logs: [{ step: 1, action: a.actions[0].type, ok: true, message: "Completed." }],
        },
      });
    }
  }

  // --- Time entries ---------------------------------------------------------
  const timeEntryProjectIds = Object.values(projectIds).slice(0, 8);
  for (let i = 0; i < 18; i++) {
    const projectId = timeEntryProjectIds[i % timeEntryProjectIds.length];
    const project = await prisma.project.findUnique({ where: { id: projectId }, select: { clientId: true } });
    if (!project) continue;
    const userId = teamMemberIds[i % teamMemberIds.length] ?? ownerId;
    const durationMinutes = 30 + (i % 6) * 30;
    const startedAt = hoursAgo(i * 9 + 2);
    await prisma.timeEntry.create({
      data: {
        agencyId: agency.id,
        userId,
        projectId,
        clientId: project.clientId,
        description: "Client work",
        startedAt,
        endedAt: new Date(startedAt.getTime() + durationMinutes * 60 * 1000),
        durationMinutes,
        billable: i % 4 !== 0,
        billableRate: 125,
        costRate: 60,
      },
    });
  }

  // --- Costs (for finance/profitability realism) ----------------------------
  const costProjectIds = Object.values(projectIds).slice(0, 10);
  for (let i = 0; i < 10; i++) {
    const projectId = costProjectIds[i % costProjectIds.length];
    const project = await prisma.project.findUnique({ where: { id: projectId }, select: { clientId: true } });
    if (!project) continue;
    await prisma.cost.create({
      data: {
        agencyId: agency.id,
        clientId: project.clientId,
        projectId,
        amount: 80 + i * 45,
        category: ["Software", "Contractor", "Ads", "Stock Assets"][i % 4],
        description: "Project-related expense",
        incurredAt: at(-(10 + i * 4)),
        createdBy: ownerId,
      },
    });
  }

  // --- Portal threads + internal comment + portal-view activity --------------
  for (const thread of PORTAL_THREADS) {
    const projectId = projectIds[thread.project];
    if (!projectId) continue;
    for (const msg of thread.messages) {
      await prisma.portalComment.create({
        data: {
          agencyId: agency.id,
          projectId,
          author: msg.author,
          message: msg.message,
          createdAt: hoursAgo(msg.at),
        },
      });
    }
  }

  // One internal team comment on a client (Comment model).
  await prisma.comment.create({
    data: {
      agencyId: agency.id,
      clientId: clientIds.orbit,
      projectId: projectIds["Website Redesign"],
      authorName: "Daniel Reyes",
      body: "Heads up: Orbit wants Milestone 2 ready for their board demo on the 28th. Let's keep build on track.",
      createdAt: hoursAgo(8),
    },
  });

  // Activity feed — recent, varied, fresh timestamps so the dashboard reads
  // "just now / 2h ago / 1d ago". Also satisfies the "Portal Viewed" onboarding
  // step so the checklist is complete and the card hides.
  await prisma.activity.createMany({
    data: [
      { agencyId: agency.id, clientId: clientIds.orbit, projectId: projectIds["Website Redesign"], type: "Portal Viewed", description: "Naomi Chen viewed the Orbit Labs client portal.", createdAt: hoursAgo(2) },
      { agencyId: agency.id, clientId: clientIds.acme, type: "Invoice Paid", description: "Invoice INV-1001 ($5,500) was marked paid.", createdAt: hoursAgo(5) },
      { agencyId: agency.id, clientId: clientIds.orbit, projectId: projectIds["Website Redesign"], type: "Comment Added", description: "New portal message from Naomi Chen on Website Redesign.", createdAt: hoursAgo(1) },
      { agencyId: agency.id, clientId: clientIds.brightside, projectId: projectIds["Brand Refresh"], type: "Project Updated", description: "Brand Refresh moved to design review.", createdAt: hoursAgo(26) },
      { agencyId: agency.id, type: "Team Member Joined", description: "Liam Bennett joined Northbeam Studio.", createdAt: at(-120) },
    ],
  });

  // --- Summary ---------------------------------------------------------------
  const allInvoices = [...INVOICES, ...EXTRA_INVOICES];
  const paid = allInvoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.items.reduce((x, it) => x + it.qty * it.unitPrice, 0), 0);
  const outstanding = allInvoices.filter((i) => i.status !== "paid").reduce((s, i) => s + i.items.reduce((x, it) => x + it.qty * it.unitPrice, 0), 0);
  const totalClients = CLIENTS.length + EXTRA_CLIENTS.length;
  const totalProjects = PROJECTS.length + EXTRA_PROJECTS.length;
  const totalInvoices = allInvoices.length + SUBSCRIPTIONS.length; // + one occurrence invoice per subscription

  console.log("\n✓ Seeded Northbeam Studio");
  console.log(`  Team:          ${TEAM.length} members (+1 pending invite)`);
  console.log(`  Clients:       ${totalClients}`);
  console.log(`  Projects:      ${totalProjects}`);
  console.log(`  Invoices:      ${totalInvoices}  ·  paid $${paid.toLocaleString()}+ · outstanding $${outstanding.toLocaleString()}+`);
  console.log(`  Proposals:     ${PROPOSALS.length}`);
  console.log(`  Subscriptions: ${SUBSCRIPTIONS.length}`);
  console.log(`  Automations:   ${AUTOMATIONS.length}`);
  console.log(`\n  Log in:   ${OWNER_EMAIL}`);
  console.log(`  Password: ${DEMO_PASSWORD}\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

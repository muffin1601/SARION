import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeader } from "@/components/marketing/section-header";
import { CTASection } from "@/components/marketing/cta-section";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo/schema";
import styles from "./enterprise.module.css";

export const metadata: Metadata = {
  title: "Enterprise",
  description:
    "What Sarion offers larger, growing agency teams: scoped permissions, migration help, and dedicated support as you scale beyond a small team.",
  alternates: { canonical: "/enterprise" },
  openGraph: {
    title: "Enterprise · Sarion",
    description:
      "What Sarion offers larger, growing agency teams: scoped permissions, migration help, and dedicated support as you scale beyond a small team.",
    url: "/enterprise",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Enterprise", path: "/enterprise" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);
const WEBPAGE_SCHEMA = webPageSchema({
  name: "Enterprise · Sarion",
  description:
    "What Sarion offers larger, growing agency teams: scoped permissions, migration help, and dedicated support as you scale beyond a small team.",
  url: "/enterprise",
});

const ENTERPRISE_FEATURES = [
  {
    title: "Client management at scale",
    body: "As your client list grows, every record stays organized and searchable — no spreadsheet sprawl, no duplicate contacts across tools.",
  },
  {
    title: "Project tracking per client",
    body: "Projects and tasks stay scoped to the right client, so growing teams can see exactly what's in flight without cross-referencing multiple boards.",
  },
  {
    title: "Invoicing tied to real records",
    body: "Invoices are generated from the same client and project data your team already works in, cutting down on manual re-entry as volume increases.",
  },
  {
    title: "Branded client portals",
    body: "Give every client — however many you have — their own branded portal view into project status, without building it yourself.",
  },
  {
    title: "Team collaboration and access",
    body: "Add team members with scoped access and permissions, so larger teams can divide client work without everyone seeing everything.",
  },
];

const ENTERPRISE_FAQ = [
  {
    question: "Does Sarion have a dedicated enterprise tier?",
    answer:
      "Not as a separate product today. Sarion is built for small-to-mid agencies, and this page describes how our existing features — permissions, portals, invoicing — scale as your team and client list grow.",
  },
  {
    question: "Can I control what different team members can access?",
    answer:
      "Yes. Sarion supports team member access and permission scoping today, so you can control who sees and edits which clients, projects, and invoices.",
  },
  {
    question: "Do you help migrate our existing client data?",
    answer:
      "Yes. We offer help migrating client and project data from a spreadsheet or another tool — see our CRM migration checklist for what to prepare.",
  },
  {
    question: "What support do growing teams get?",
    answer:
      "Support comes directly from the team building Sarion via email — no outsourced ticket queue. Reach out through our Contact page.",
  },
];
const FAQ_SCHEMA = faqSchema(ENTERPRISE_FAQ);

const RELATED_LINKS = [
  {
    label: "Pricing",
    description: "See plans and what's included at each tier.",
    href: "/pricing",
  },
  {
    label: "Security",
    description: "How we protect your agency's data.",
    href: "/security",
  },
  {
    label: "Solutions",
    description: "See how Sarion fits different kinds of agency teams.",
    href: "/solutions",
  },
  {
    label: "Contact",
    description: "Talk to the founding team about your team's needs.",
    href: "/contact",
  },
];

export default function EnterprisePage() {
  return (
    <>
      <JsonLd id="enterprise-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="enterprise-webpage-schema" data={WEBPAGE_SCHEMA} />
      <JsonLd id="enterprise-faq-schema" data={FAQ_SCHEMA} />

      {/* Hero */}
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <SectionHeader
            as="h1"
            eyebrow="Enterprise"
            title="Sarion for larger teams"
            description="Sarion is built for small-to-mid agencies — including the ones scaling past a handful of people. Here's what we offer teams that need more structure, more permissions, and more support as they grow."
          />
        </div>
      </section>

      {/* Features */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader
            eyebrow="What Scales With You"
            title="The same core workspace, built to grow"
          />
          <div className={styles.grid2}>
            {ENTERPRISE_FEATURES.map((f) => (
              <div key={f.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{f.title}</h3>
                <p className={styles.cardBody}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader align="left" eyebrow="Security" title="Data isolated per account" />
            <div className={styles.proseBody}>
              <p>
                Every agency&apos;s data is scoped to its own account, traffic is encrypted in
                transit, and we run regular backups as part of normal operations. See our{" "}
                <Link href="/security">Security page</Link> for the full detail on how we protect
                your data today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Permissions */}
      <section className="mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader
              align="left"
              eyebrow="Permissions"
              title="Control who sees what"
            />
            <div className={styles.proseBody}>
              <p>
                As you add team members, Sarion lets you scope access and permissions per person —
                so a growing team can divide client work without every team member having
                visibility into every client, project, or invoice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scalability */}
      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader
              align="left"
              eyebrow="Scalability"
              title="Built to handle more clients and projects"
            />
            <div className={styles.proseBody}>
              <p>
                Sarion is designed so that adding more clients, more projects, and more team
                members doesn&apos;t mean rebuilding your workflow. The same client records,
                project tracking, and invoicing that work for a five-person agency keep working as
                your roster grows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader
              align="left"
              eyebrow="Support"
              title="Dedicated support for growing teams"
            />
            <div className={styles.proseBody}>
              <p>
                Support requests go directly to the team building Sarion — email us and a real
                person responds. We aim to keep response times fast as our team and customer base
                both grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding */}
      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader
              align="left"
              eyebrow="Onboarding"
              title="Guided setup, not a manual"
            />
            <div className={styles.proseBody}>
              <p>
                When you bring your team onto Sarion, we help with data migration from your
                existing spreadsheet or tool, and walk you through setting up your first clients,
                projects, and team member access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Migration */}
      <section className="mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader align="left" eyebrow="Migration" title="Bring your existing data over" />
            <div className={styles.proseBody}>
              <p>
                Moving off a spreadsheet or another CRM? Use our{" "}
                <Link href="/resources/checklists/crm-migration-checklist">
                  CRM migration checklist
                </Link>{" "}
                to prepare your client and project data before you switch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap teaser */}
      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader
              align="left"
              eyebrow="Roadmap"
              title="More is on the way"
            />
            <div className={styles.proseBody}>
              <p>
                We&apos;re actively building toward more of what larger teams need. See our{" "}
                <Link href="/roadmap">public roadmap</Link> for what&apos;s coming next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions from growing teams" />
          <FaqGrid items={ENTERPRISE_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection
        headline="Ready to talk about your team's needs?"
        subtext="Tell us about your agency and we'll help you figure out the right fit."
        primaryLabel="Talk to Sales"
        primaryHref="/contact"
      />
    </>
  );
}

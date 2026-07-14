import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { SectionHeader } from "@/components/marketing/section-header";
import { ProductShot } from "@/components/marketing/product-shot";
import { CTASection } from "@/components/marketing/cta-section";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import styles from "../features.module.css";

export const metadata: Metadata = {
  title: "Client CRM",
  description:
    "Not a sales CRM — a client management system built for ongoing agency-client delivery relationships, where every contact, note, project, and invoice lives on one client record.",
  alternates: { canonical: "/features/crm" },
  keywords: [
    "agency CRM",
    "client management software",
    "CRM for agencies",
  ],
  openGraph: {
    title: "Client CRM · Sarion",
    description:
      "The CRM built for client delivery, not just the sale — contact info, notes, activity history, projects, and invoices on one client record.",
    url: "/features/crm",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "CRM", path: "/features/crm" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);

const CRM_FAQ = [
  {
    question: "Is this a sales CRM?",
    answer:
      "No. Sarion isn't built for pipeline stages, deal forecasting, or lead scoring — there are good tools for that already. Sarion's client record picks up once someone becomes a client: it's built for the ongoing delivery relationship that follows, where the important things are what work is happening, what's been said, and what's been paid.",
  },
  {
    question: "Can I track notes and call history?",
    answer:
      "Yes. Every client record has a notes field and an activity history, so you can log a call note right after you hang up and search it back up months later instead of digging through old email threads or a teammate's memory.",
  },
  {
    question: "How is this different from a spreadsheet?",
    answer:
      "A spreadsheet holds contact info. It doesn't know which projects or invoices belong to a client, and it can't power a client portal. Sarion's client record links directly to that client's projects and invoices, so updating one place keeps everything connected — no copying data between tabs or tools.",
  },
  {
    question: "Does every client automatically get a portal?",
    answer:
      "Yes. Each client record includes a unique portal link, so the moment you add a client they have a place to see their projects and invoices — you don't set up anything separately per client.",
  },
];
const FAQ_SCHEMA = faqSchema(CRM_FAQ);

const RELATED_LINKS = [
  {
    label: "All Features",
    description: "See everything Sarion does in one workspace.",
    href: "/features",
  },
  {
    label: "Project Management",
    description: "Track status, due dates, and progress across every client.",
    href: "/features/projects",
  },
  {
    label: "Client Portal",
    description: "The branded space each client sees, generated from their record.",
    href: "/features/client-portal",
  },
  {
    label: "Invoices",
    description: "Paid, unpaid, and overdue invoices tied to every client.",
    href: "/features/invoices",
  },
  {
    label: "Pricing",
    description: "See plans, founding pricing, and what's included at each tier.",
    href: "/pricing",
  },
];

export default function CrmPage() {
  return (
    <>
      <JsonLd id="crm-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="crm-faq-schema" data={FAQ_SCHEMA} />
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <SectionHeader
            as="h1"
            eyebrow="Client CRM"
            title="The CRM built for client delivery, not just the sale"
            description="Every client record holds contact info, notes, activity history, linked projects, and linked invoices in one place — so nothing about a client relationship lives in a separate tool."
          />
          <p className={styles.intro}>
            Most CRMs are built to win the deal, then leave you to manage the relationship
            somewhere else. Sarion&apos;s client record is built for what happens after the deal
            closes: the projects you deliver, the invoices you send, and the notes and history
            that build up over months of working together.
          </p>
          <div className={styles.heroActions}>
            <Link href="/signup" className="mBtn mBtnPrimary mBtnLg">
              Start Free
            </Link>
            <Link href="/#demo" className="mBtn mBtnSecondary mBtnLg">
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      <section className={`mSectionTight ${styles.rowSection}`} data-first={true}>
        <div className="mContainer">
          <div className={styles.row}>
            <div className={styles.copy}>
              <span className="mEyebrow">Client Records</span>
              <h2 className={styles.title}>One record per client, not five</h2>
              <p className={styles.workflow}>
                Add a client once — name, company, email, phone — and every note and interaction
                from then on gets logged against that same record. Account managers can log a
                call note right after hanging up, then search it back up months later instead of
                digging through old email threads.
              </p>
              <ul className={styles.list}>
                {["Contact details", "Notes", "Activity history", "Search across all clients"].map(
                  (feature) => (
                    <li key={feature} className={styles.item}>
                      <Check className={styles.check} aria-hidden />
                      {feature}
                    </li>
                  ),
                )}
              </ul>
              <p className={styles.benefit}>
                Nobody on the team has to ask &quot;does anyone know where that came from?&quot; again.
              </p>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="clients"
                alt="The Sarion clients list with company, email, and project counts"
                url="trysarion.com/clients"
                sizes="(max-width: 880px) 100vw, 540px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`mSectionTight ${styles.rowSection}`}>
        <div className="mContainer">
          <div className={styles.row} data-reverse={true}>
            <div className={styles.copy}>
              <span className="mEyebrow">One Record, Everything Connected</span>
              <h2 className={styles.title}>Projects and invoices, tied to the client automatically</h2>
              <p className={styles.workflow}>
                Open a client and you see their projects and invoices right there — no separate
                lookup, no re-typing which client a project belongs to. Create a project or
                invoice for a client and it&apos;s linked to that record from the start, so their
                whole history stays in one place as the relationship grows.
              </p>
              <ul className={styles.list}>
                {["Linked projects", "Linked invoices", "Client-specific portal link"].map(
                  (feature) => (
                    <li key={feature} className={styles.item}>
                      <Check className={styles.check} aria-hidden />
                      {feature}
                    </li>
                  ),
                )}
              </ul>
              <p className={styles.benefit}>
                Everything about a client relationship stays connected — no copying data between
                separate tools.
              </p>
              <Link href="/features/client-portal" className={styles.inlineLink}>
                See the client portal →
              </Link>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="dashboard"
                alt="The Sarion dashboard showing a client's linked projects and invoices"
                url="trysarion.com/dashboard"
                sizes="(max-width: 880px) 100vw, 540px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`mSectionTight ${styles.rowSection}`}>
        <div className="mContainer">
          <div className={styles.row}>
            <div className={styles.copy}>
              <span className="mEyebrow">Search & Organization</span>
              <h2 className={styles.title}>Find any client in seconds</h2>
              <p className={styles.workflow}>
                As your client list grows past a handful of names, scrolling through a
                spreadsheet stops working. Search by name, company, or email and jump straight
                to the record — with its notes, projects, and invoices already there — instead of
                hunting through tabs or folders.
              </p>
              <ul className={styles.list}>
                {["Instant search", "Company and contact fields", "Project counts at a glance"].map(
                  (feature) => (
                    <li key={feature} className={styles.item}>
                      <Check className={styles.check} aria-hidden />
                      {feature}
                    </li>
                  ),
                )}
              </ul>
              <p className={styles.benefit}>
                Your client list stays usable whether you have five clients or fifty.
              </p>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="clients"
                alt="Searching the Sarion clients list by name and company"
                url="trysarion.com/clients"
                sizes="(max-width: 880px) 100vw, 540px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about Sarion's CRM" />
          <FaqGrid items={CRM_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection headline="See it in action with a free trial." />
    </>
  );
}

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
  title: "Invoicing",
  description:
    "Create, send, and track invoices — paid, unpaid, overdue — tied directly to the client and project they're for.",
  alternates: { canonical: "/features/invoices" },
  keywords: [
    "agency invoicing software",
    "invoice tracking for agencies",
    "client invoicing tool",
  ],
  openGraph: {
    title: "Invoicing · Sarion",
    description:
      "Create, send, and track invoices — paid, unpaid, overdue — tied directly to the client and project they're for.",
    url: "/features/invoices",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Invoices", path: "/features/invoices" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);

const INVOICES_FAQ = [
  {
    question: "Can clients pay their invoice online?",
    answer:
      "Sarion tracks invoice status — unpaid, paid, and overdue — so you and your client always know exactly what's owed. It's not a payment processor, so you'll still collect payment the way you already do (bank transfer, card link, whatever your agency uses) and mark the invoice paid once it lands.",
  },
  {
    question: "How do I track overdue invoices?",
    answer:
      "Every unpaid invoice past its due date is automatically flagged as overdue and rolled up into aging buckets — current, 1-30, 31-60, 61-90, and 90+ days — right on your dashboard, so you can see what's aging before it becomes bad debt instead of reconciling a spreadsheet by hand.",
  },
  {
    question: "Does this replace QuickBooks or FreshBooks?",
    answer:
      "Not for accounting — Sarion isn't a bookkeeping or tax tool. What it replaces is tracking invoices in a spreadsheet disconnected from the client work itself. Every invoice lives on the same client record as their projects and files, so billing status is never a separate lookup.",
  },
  {
    question: "Can I set a due date and line items on each invoice?",
    answer:
      "Yes. Each invoice has its own line items, total, and due date, and is tied to the client (and project, where relevant) it belongs to — so the amount and the work it covers are always in the same place.",
  },
];
const FAQ_SCHEMA = faqSchema(INVOICES_FAQ);

const RELATED_LINKS = [
  {
    label: "All Features",
    description: "See everything Sarion brings together for agency delivery.",
    href: "/features",
  },
  {
    label: "Client Management",
    description: "Every client's details, notes, and history in one record.",
    href: "/features/crm",
  },
  {
    label: "Client Portal",
    description: "Where clients see their invoices without asking you.",
    href: "/features/client-portal",
  },
  {
    label: "Pricing",
    description: "See plans, founding pricing, and what's included at each tier.",
    href: "/pricing",
  },
];

const INVOICE_SECTIONS = [
  {
    eyebrow: "Create",
    title: "Invoices tied to the client, not floating in a folder",
    workflow:
      "Whoever handles billing builds an invoice straight from the client record — add line items, a total, and a due date — instead of starting a new document in a separate invoicing app and hoping it gets linked back correctly later.",
    benefit: "Every invoice you send is already attached to the right client and project.",
    features: ["Line items", "Due dates", "Linked to client & project", "Multiple currencies"],
    shot: "invoices" as const,
    shotAlt: "Creating an invoice in Sarion with line items and a due date",
  },
  {
    eyebrow: "Track",
    title: "Paid, unpaid, overdue — always visible",
    workflow:
      "Instead of reconciling a spreadsheet against a bank statement every week, whoever handles billing glances at the invoices list to see what's paid, what's still open, and what's slipped past its due date.",
    benefit: "Overdue invoices get flagged and chased before they turn into bad debt.",
    features: ["Paid / unpaid / overdue status", "Aging buckets: current, 1-30, 31-60+", "Outstanding totals at a glance"],
    shot: "dashboard" as const,
    shotAlt: "The Sarion dashboard showing outstanding payments and overdue invoice aging",
  },
  {
    eyebrow: "Client Portal",
    title: "Clients see what they owe, without asking",
    workflow:
      "A client wondering whether an invoice went through checks their own portal instead of emailing to ask — the invoice and its status are already sitting there next to their project.",
    benefit: "\"Did you get my invoice?\" stops being a question you have to answer.",
    features: ["Invoices visible in the client portal", "Status shown per invoice", "No separate login or app for clients"],
    shot: "portal" as const,
    shotAlt: "An invoice with its status shown inside the branded client portal",
    ctaHref: "/features/client-portal",
    ctaLabel: "See the client portal",
  },
];

export default function InvoicesFeaturePage() {
  return (
    <>
      <JsonLd id="invoices-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="invoices-faq-schema" data={FAQ_SCHEMA} />
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <SectionHeader
            as="h1"
            eyebrow="Invoices"
            title="Invoices that never get lost in a separate tool"
            description="Create and send invoices from the same record as the client's projects and files, then see paid, unpaid, and overdue status — with aging — without opening a spreadsheet."
          />
          <p className={styles.intro}>
            Every invoice in Sarion is tied directly to the client it&apos;s for. No more hunting
            through a separate invoicing tool to figure out who owes what — status, due dates,
            and aging are all visible from the same place you manage the work itself.
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

      {INVOICE_SECTIONS.map((section, index) => (
        <section
          key={section.eyebrow}
          className={`mSectionTight ${styles.rowSection}`}
          data-first={index === 0}
        >
          <div className="mContainer">
            <div className={styles.row} data-reverse={index % 2 === 1}>
              <div className={styles.copy}>
                <span className="mEyebrow">{section.eyebrow}</span>
                <h2 className={styles.title}>{section.title}</h2>
                <p className={styles.workflow}>{section.workflow}</p>
                <ul className={styles.list}>
                  {section.features.map((feature) => (
                    <li key={feature} className={styles.item}>
                      <Check className={styles.check} aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className={styles.benefit}>{section.benefit}</p>
                {section.ctaHref && section.ctaLabel ? (
                  <Link href={section.ctaHref} className={styles.inlineLink}>
                    {section.ctaLabel} →
                  </Link>
                ) : null}
              </div>
              <div className={styles.visual}>
                <ProductShot
                  name={section.shot}
                  alt={section.shotAlt}
                  url={`trysarion.com/${section.shot}`}
                  sizes="(max-width: 880px) 100vw, 540px"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about invoicing in Sarion" />
          <FaqGrid items={INVOICES_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection headline="Stop losing invoices in a separate tool." />
    </>
  );
}

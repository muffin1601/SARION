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
  title: "Reporting",
  description:
    "Revenue trends, invoice aging, project status, and top clients — real numbers from your actual client work, not manual spreadsheet exports.",
  alternates: { canonical: "/features/reporting" },
  keywords: [
    "agency reporting software",
    "agency revenue reports",
    "client management software",
  ],
  openGraph: {
    title: "Reporting · Sarion",
    description:
      "Revenue trends, invoice aging, project status, and top clients — real numbers from your actual client work.",
    url: "/features/reporting",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Reporting", path: "/features/reporting" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);

const REPORTING_FAQ = [
  {
    question: "Can I export reports?",
    answer:
      "Reporting in Sarion is built for viewing and tracking — revenue, invoice status, and project data update live as your team works, so you're always looking at the current numbers instead of a snapshot that goes stale the moment you export it.",
  },
  {
    question: "How is the business health score calculated?",
    answer:
      "It rolls up the signals that actually predict trouble: overdue invoices, delayed projects, and how recently your clients have had activity on their account. One number instead of five dashboards to cross-reference before you know if the agency is in good shape.",
  },
  {
    question: "Do I need a separate BI tool for this?",
    answer:
      "No. Revenue trends, invoice aging, project status, and your top clients by revenue are already built from the same client, project, and invoice records you work in every day — there's no data warehouse or spreadsheet export step to maintain.",
  },
  {
    question: "Where do the top clients and revenue numbers come from?",
    answer:
      "Directly from your invoices and projects — paid invoice totals per client, outstanding balances, and project counts. Nothing is estimated or modeled; it's the same data underlying your /clients and /finance views, just summarized.",
  },
];
const FAQ_SCHEMA = faqSchema(REPORTING_FAQ);

interface ReportingSection {
  eyebrow: string;
  title: string;
  workflow: string;
  benefit: string;
  features: string[];
  ctaHref?: string;
  ctaLabel?: string;
}

const REPORTING_SECTIONS: ReportingSection[] = [
  {
    eyebrow: "Revenue & Invoices",
    title: "See the money, not just the workload",
    workflow:
      "Owners open the dashboard on a Monday morning and see six months of revenue trend alongside the paid, unpaid, and overdue split — no reconciling a bank statement against a spreadsheet to know where the agency stands.",
    benefit: "Cash flow problems show up on the dashboard, not as a surprise at month-end.",
    features: [
      "6-month revenue trend",
      "Paid / unpaid / overdue breakdown",
      "Outstanding aging buckets (current, 1-30, 31-60, 61-90, 90+ days)",
    ],
  },
  {
    eyebrow: "Projects & Clients",
    title: "Know what's moving and who's paying",
    workflow:
      "Project leads check status counts — planned, active, completed, on hold, delayed — before standup, while account leads glance at top clients ranked by actual paid revenue to see who the agency's work really depends on.",
    benefit: "Delivery and revenue priorities line up instead of living in separate spreadsheets.",
    features: [
      "Project status breakdown",
      "Delayed project count",
      "Top clients by revenue, with outstanding balance and project count",
    ],
    ctaHref: "/features/dashboard",
    ctaLabel: "See the dashboard",
  },
  {
    eyebrow: "Business Health",
    title: "One number for how the agency is doing",
    workflow:
      "Instead of checking overdue invoices, delayed projects, and client activity separately, founders glance at a single health score that already rolled all three together — then drill in only when the number moves.",
    benefit: "You know something's off before it turns into a client escalation.",
    features: [
      "Business health score",
      "Finance snapshot",
      "Team utilization",
    ],
    ctaHref: "/pricing",
    ctaLabel: "See plans",
  },
];

const RELATED_LINKS = [
  {
    label: "All Features",
    description: "See everything Sarion includes beyond reporting.",
    href: "/features",
  },
  {
    label: "Dashboard",
    description: "The command center reporting lives on — snapshot cards, priorities, and activity in one view.",
    href: "/features/dashboard",
  },
  {
    label: "Invoices",
    description: "Where the paid, unpaid, and overdue numbers behind every report come from.",
    href: "/features/invoices",
  },
  {
    label: "Pricing",
    description: "See plans, founding pricing, and what's included at each tier.",
    href: "/pricing",
  },
];

export default function ReportingPage() {
  return (
    <>
      <JsonLd id="reporting-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="reporting-faq-schema" data={FAQ_SCHEMA} />
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <SectionHeader
            as="h1"
            eyebrow="Reporting"
            title="Know where the agency stands, without building a spreadsheet"
            description="Revenue trends, invoice aging, project status, and top clients — computed from the same client, project, and invoice records your team already works in."
          />
          <p className={styles.intro}>
            No exports to babysit, no separate BI tool to maintain. Sarion turns the client data
            already in your workspace into revenue trends, invoice aging, project status, and a
            single business health score you can check in seconds.
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

      {REPORTING_SECTIONS.map((section, index) => (
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
                  name="dashboard"
                  alt="The Sarion dashboard showing revenue trends, invoice status, and project overview"
                  url="trysarion.com/dashboard"
                  sizes="(max-width: 880px) 100vw, 540px"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about Sarion's reporting" />
          <FaqGrid items={REPORTING_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection headline="See your agency's real numbers with a free trial." />
    </>
  );
}

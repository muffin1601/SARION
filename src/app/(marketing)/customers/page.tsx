import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeader } from "@/components/marketing/section-header";
import { CTASection } from "@/components/marketing/cta-section";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { IndustryCard } from "@/components/solutions/industry-card";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  faqSchema,
  itemListSchema,
  webPageSchema,
} from "@/lib/seo/schema";
import { INDUSTRIES } from "@/content/solutions/industries";
import styles from "./customers.module.css";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "Sarion is early-stage software built for marketing, design, web development, SEO, branding, and creative agencies, plus freelancers and consultants — see who it's built for.",
  alternates: { canonical: "/customers" },
  openGraph: {
    title: "Customers · Sarion",
    description:
      "Sarion is early-stage software built for agencies and independents running client work — see who it's built for.",
    url: "/customers",
  },
};

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Customers", path: "/customers" },
];

const USE_CASES = [
  {
    title: "Keeping every client organized",
    body: "One record per client with notes, history, and every project and invoice tied to it — no more digging through old email threads to remember the context of an account.",
  },
  {
    title: "Tracking project status without a status meeting",
    body: "Set a status and due date when a project kicks off, then check the board each morning to see what's moving and what's slipping.",
  },
  {
    title: "Invoicing without a separate spreadsheet",
    body: "Track paid, unpaid, and overdue invoices next to the project they bill for, so nothing falls through the cracks between two disconnected tools.",
  },
  {
    title: "Giving clients a place to check status themselves",
    body: "A branded client portal shows clients real project progress and invoice status, cutting down the number of \"any update?\" emails an agency has to answer.",
  },
];

const CUSTOMERS_FAQ = [
  {
    question: "Does Sarion have real customers yet?",
    answer:
      "Sarion is early-stage. We're not going to invent customer logos or quotes to make the page look more established than it is — this page is honest about where we are.",
  },
  {
    question: "Do you have case studies?",
    answer:
      "Not yet — case studies will be published once real agencies have used Sarion long enough to have a genuine story to tell. See our case studies page for what that will look like.",
    href: "/case-studies",
    hrefLabel: "See the case studies page",
  },
  {
    question: "How can I see what Sarion actually does before committing?",
    answer:
      "Try the interactive portal demo, or read the full features breakdown — both show the real product, not a sales pitch.",
    href: "/portal-demo",
    hrefLabel: "Try the portal demo",
  },
];

const RELATED_LINKS = [
  {
    label: "Solutions by Industry",
    description: "See how Sarion fits your specific kind of agency.",
    href: "/solutions",
  },
  {
    label: "Case Studies",
    description: "Where real customer stories will live as they come in.",
    href: "/case-studies",
  },
  {
    label: "Portal Demo",
    description: "Try the branded client portal your clients would see.",
    href: "/portal-demo",
  },
];

const BREADCRUMB_SCHEMA = breadcrumbSchema(TRAIL);
const FAQ_SCHEMA = faqSchema(CUSTOMERS_FAQ);
const WEBPAGE_SCHEMA = webPageSchema({
  name: "Customers",
  description:
    "Sarion is early-stage software built for marketing, design, web development, SEO, branding, and creative agencies, plus freelancers and consultants — see who it's built for.",
  url: "/customers",
});
const INDUSTRY_LIST_SCHEMA = itemListSchema(
  INDUSTRIES.map((industry) => ({
    name: industry.name,
    url: `/solutions/${industry.slug}`,
  })),
);

export default function CustomersPage() {
  return (
    <>
      <JsonLd
        id="customers-schema"
        data={{
          "@context": "https://schema.org",
          "@graph": [
            BREADCRUMB_SCHEMA,
            WEBPAGE_SCHEMA,
            FAQ_SCHEMA,
            INDUSTRY_LIST_SCHEMA,
          ],
        }}
      />

      {/* Hero */}
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={TRAIL} center />
          <div className={styles.hero}>
            <span className="mEyebrow">Customers</span>
            <h1 className={styles.headline}>Built for agencies like yours</h1>
            <p className={styles.subheadline}>
              Sarion is early-stage software, built directly from what agency
              founders and account managers told us was missing from the
              tools they already had. Here&apos;s who it&apos;s built for and what it
              actually does.
            </p>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader
            eyebrow="Who It's For"
            title="Built for eight kinds of client-facing work"
          />
          <div className={styles.grid} style={{ marginTop: "var(--m-space-6)" }}>
            {INDUSTRIES.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader
            eyebrow="What Agencies Use Sarion For"
            title="Real capabilities, not hypotheticals"
          />
          <div className={styles.useCases}>
            {USE_CASES.map((u) => (
              <div key={u.title} className={styles.useCaseCard}>
                <h3 className={styles.useCaseTitle}>{u.title}</h3>
                <p className={styles.useCaseBody}>{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Honest placeholder */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <div className={styles.panel}>
            <p className={styles.panelTitle}>
              We&apos;re early — customer stories aren&apos;t here yet
            </p>
            <p className={styles.panelBody}>
              We&apos;re an early-stage company, so we&apos;re not going to fill this
              page with invented testimonials or logos. Customer stories will
              live here as agencies start sharing their experience with
              Sarion. In the meantime, see what the product actually does:
            </p>
            <div className={styles.panelActions}>
              <Link href="/portal-demo" className="mBtn mBtnPrimary mBtnLg">
                Try the Portal Demo
              </Link>
              <Link href="/features" className="mBtn mBtnSecondary mBtnLg">
                See All Features
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about Sarion's customers" />
          <FaqGrid items={CUSTOMERS_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection
        headline="Be among the first agencies on Sarion"
        subtext="Start your 14-day free trial. No credit card required."
      />
    </>
  );
}

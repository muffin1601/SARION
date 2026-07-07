import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeader } from "@/components/marketing/section-header";
import { CTASection } from "@/components/marketing/cta-section";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo/schema";
import styles from "./case-studies.module.css";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Sarion doesn't have case studies yet — we're an early-stage company. Here's the honest structure real case studies will follow once agencies have results to share.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies · Sarion",
    description:
      "Sarion doesn't have case studies yet. Here's what real case studies will look like once agencies have results to share.",
    url: "/case-studies",
  },
};

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Case Studies", path: "/case-studies" },
];

const STRUCTURE_STEPS = [
  {
    label: "1",
    title: "Problem",
    body: "The specific operational problem the agency was dealing with before Sarion — in their own words, not ours.",
  },
  {
    label: "2",
    title: "Solution",
    body: "Which parts of Sarion they actually adopted, and why those parts fit their workflow.",
  },
  {
    label: "3",
    title: "Implementation",
    body: "How the switch actually happened — migrating clients and data, and how long it took to get the team using it day to day.",
  },
  {
    label: "4",
    title: "Results",
    body: "What genuinely changed, described with real numbers from the agency, not projected or estimated figures.",
  },
];

const MEANTIME_LINKS = [
  {
    title: "See the product",
    body: "Try the interactive client portal demo to see exactly what a client would experience.",
    href: "/portal-demo",
  },
  {
    title: "Read practical articles",
    body: "Blog posts on agency operations, client management, and running client work more clearly.",
    href: "/blog",
  },
  {
    title: "Grab free templates",
    body: "Practical resources you can use right now, independent of whether you ever use Sarion.",
    href: "/resources",
  },
];

const CASE_STUDIES_FAQ = [
  {
    question: "Why doesn't this page have any case studies on it?",
    answer:
      "Because we don't have any yet, and we'd rather tell you that plainly than invent a customer story to fill the page. Real case studies take real agencies using the product long enough to have results worth sharing.",
  },
  {
    question: "When will the first case study be published?",
    answer:
      "As soon as an agency using Sarion has a genuine story to tell and agrees to share it. There's no target date — publishing something fabricated in the meantime isn't worth the trust it would cost.",
  },
  {
    question: "Can I see how Sarion works without a case study?",
    answer:
      "Yes — the portal demo shows the real product interactively, and the features page documents everything it does today.",
    href: "/portal-demo",
    hrefLabel: "Try the portal demo",
  },
];

const RELATED_LINKS = [
  {
    label: "Customers",
    description: "Who Sarion is built for, described honestly.",
    href: "/customers",
  },
  {
    label: "Portal Demo",
    description: "Try the branded client portal your clients would see.",
    href: "/portal-demo",
  },
  {
    label: "Blog",
    description: "Practical articles on agency CRM and operations.",
    href: "/blog",
  },
];

const BREADCRUMB_SCHEMA = breadcrumbSchema(TRAIL);
const FAQ_SCHEMA = faqSchema(CASE_STUDIES_FAQ);
const WEBPAGE_SCHEMA = webPageSchema({
  name: "Case Studies",
  description:
    "Sarion doesn't have case studies yet — we're an early-stage company. Here's the honest structure real case studies will follow once agencies have results to share.",
  url: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        id="case-studies-schema"
        data={{
          "@context": "https://schema.org",
          "@graph": [BREADCRUMB_SCHEMA, WEBPAGE_SCHEMA, FAQ_SCHEMA],
        }}
      />

      {/* Hero */}
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={TRAIL} />
          <div className={styles.hero}>
            <span className="mEyebrow">Case Studies</span>
            <h1 className={styles.headline}>
              Case studies — coming as agencies grow with us
            </h1>
            <p className={styles.subheadline}>
              Sarion is early-stage, so there are no case studies to show yet.
              Rather than fill this page with something fabricated, here&apos;s
              exactly what a real case study will look like once one exists.
            </p>
          </div>
        </div>
      </section>

      {/* Honest empty state + future structure */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <div className={styles.panel}>
            <p className={styles.panelTitle}>None published yet — here&apos;s the format</p>
            <p className={styles.panelBody}>
              When an agency using Sarion has a genuine story worth telling,
              we&apos;ll publish it following the same four-part structure every
              time, so case studies stay comparable and honest rather than
              turning into marketing copy:
            </p>
            <div className={styles.structure}>
              {STRUCTURE_STEPS.map((s) => (
                <div key={s.label} className={styles.structureStep}>
                  <span className={styles.structureLabel}>Step {s.label}</span>
                  <p className={styles.structureTitle}>{s.title}</p>
                  <p className={styles.structureBody}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* In the meantime */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader
            eyebrow="In The Meantime"
            title="See what the product actually does today"
          />
          <div className={styles.meantimeGrid}>
            {MEANTIME_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={styles.meantimeCard}>
                <p className={styles.meantimeTitle}>{link.title}</p>
                <p className={styles.meantimeBody}>{link.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about case studies" />
          <FaqGrid items={CASE_STUDIES_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection
        headline="Be one of the agencies we write about next"
        subtext="Start your 14-day free trial. No credit card required."
      />
    </>
  );
}

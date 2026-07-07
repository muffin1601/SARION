import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeader } from "@/components/marketing/section-header";
import { CTASection } from "@/components/marketing/cta-section";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo/schema";
import styles from "./trust.module.css";

export const metadata: Metadata = {
  title: "Trust Center",
  description:
    "Everything about how Sarion operates: security practices, our roadmap, changelog, status, and policies — all in one place.",
  alternates: { canonical: "/trust" },
  openGraph: {
    title: "Trust Center · Sarion",
    description:
      "Everything about how Sarion operates: security practices, our roadmap, changelog, status, and policies — all in one place.",
    url: "/trust",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Trust Center", path: "/trust" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);
const WEBPAGE_SCHEMA = webPageSchema({
  name: "Trust Center · Sarion",
  description:
    "Everything about how Sarion operates: security practices, our roadmap, changelog, status, and policies — all in one place.",
  url: "/trust",
});

const TRUST_FAQ = [
  {
    question: "Where can I see what Sarion is building next?",
    answer:
      "Our public roadmap shows what we're currently working on and considering next. Our changelog lists what's already shipped.",
  },
  {
    question: "Is Sarion transparent about outages or incidents?",
    answer:
      "Our status page is where we'll post updates on uptime and any incidents affecting the product.",
  },
  {
    question: "Does Sarion have a dedicated security page?",
    answer:
      "Yes — our Security page covers data isolation, authentication, encryption in transit, backups, and how to report a security issue.",
  },
  {
    question: "Who do I talk to about enterprise or team needs?",
    answer:
      "Reach out through our Contact page or visit the Enterprise page to see what we offer larger, growing teams.",
  },
];
const FAQ_SCHEMA = faqSchema(TRUST_FAQ);

const TRUST_CARDS = [
  {
    title: "Security",
    description: "How we protect your agency's data today, and where we're headed.",
    href: "/security",
  },
  {
    title: "Roadmap",
    description: "See what we're building next, in the open.",
    href: "/roadmap",
  },
  {
    title: "Changelog",
    description: "A running log of what's shipped in Sarion.",
    href: "/changelog",
  },
  {
    title: "Status",
    description: "Current uptime and incident history for Sarion.",
    href: "/status",
  },
  {
    title: "Privacy Policy",
    description: "What data we collect, why, and how it's used.",
    href: "/privacy",
  },
  {
    title: "Terms",
    description: "The terms that govern using Sarion.",
    href: "/terms",
  },
  {
    title: "Enterprise",
    description: "What Sarion offers larger, growing agency teams.",
    href: "/enterprise",
  },
  {
    title: "Why Sarion",
    description: "Why we built Sarion, and how it's different.",
    href: "/why-sarion",
  },
];

const RELATED_LINKS = [
  {
    label: "Security",
    description: "The detail behind how we protect your data.",
    href: "/security",
  },
  {
    label: "Enterprise",
    description: "What Sarion offers larger, growing agency teams.",
    href: "/enterprise",
  },
  {
    label: "Contact",
    description: "Reach the founding team with any questions.",
    href: "/contact",
  },
];

export default function TrustPage() {
  return (
    <>
      <JsonLd id="trust-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="trust-webpage-schema" data={WEBPAGE_SCHEMA} />
      <JsonLd id="trust-faq-schema" data={FAQ_SCHEMA} />

      {/* Hero */}
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <SectionHeader
            as="h1"
            eyebrow="Trust Center"
            title="How Sarion operates, in the open"
            description="We believe agencies deserve to know how the tools they run their business on actually work. This page collects everything about our security, roadmap, and policies in one place."
          />
        </div>
      </section>

      {/* Grid of cards */}
      <section className="mSection">
        <div className="mContainer">
          <div className={styles.grid}>
            {TRUST_CARDS.map((card) => (
              <Link key={card.href} href={card.href} className={styles.card}>
                <p className={styles.cardTitle}>{card.title}</p>
                <p className={styles.cardDescription}>{card.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our commitments */}
      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader align="left" eyebrow="Our Commitments" title="What we stand for" />
            <div className={styles.proseBody}>
              <p>
                We build Sarion privacy-first: the data you put in belongs to your agency, and we
                use it only to run the product for you.
              </p>
              <p>
                We keep our roadmap and changelog public, so you always know what we&apos;re
                building and what&apos;s already shipped — no surprises, no black box.
              </p>
              <p>
                We&apos;re a small team, which means support comes from people who actually build
                the product, not a rotating outsourced queue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about trust and transparency" />
          <FaqGrid items={TRUST_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection
        headline="See it for yourself"
        subtext="Start free and explore Sarion at your own pace."
      />
    </>
  );
}

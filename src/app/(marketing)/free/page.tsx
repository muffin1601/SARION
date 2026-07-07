import type { Metadata } from "next";
import { FileText, ShieldCheck, Mail } from "lucide-react";

import { SectionHeader } from "@/components/marketing/section-header";
import { FreeSampleForm } from "@/components/marketing/free-sample-form";
import { CTASection } from "@/components/marketing/cta-section";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { TrackPageView } from "@/components/analytics/track-page-view";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import { FREE_SAMPLE_PAGE_COUNT } from "@/lib/marketing/products";
import { FREE_FAQ } from "@/lib/marketing/faq";
import styles from "./free.module.css";

export const metadata: Metadata = {
  title: "Free Sample — Claude Code Mastery Kit",
  description:
    "Download a free 36-page sample from the SARION Claude Code Mastery Kit. No credit card required — just your email.",
  alternates: { canonical: "/free" },
  keywords: [
    "free claude code prompts",
    "claude code sample",
    "free ai engineering resources",
  ],
  openGraph: {
    title: "Free Sample — SARION Claude Code Mastery Kit",
    description:
      "Download a free 36-page sample from the SARION Claude Code Mastery Kit. No credit card required.",
    url: "/free",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Free Sample", path: "/free" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);
const FAQ_SCHEMA = faqSchema(FREE_FAQ);

const RELATED_LINKS = [
  {
    label: "Claude Code Mastery Kit",
    description: "See the full kit this sample comes from.",
    href: "/products/claude-code-mastery",
  },
  {
    label: "All Products",
    description: "Browse every digital product in the SARION catalog.",
    href: "/products",
  },
  {
    label: "Pricing",
    description: "Compare tiers if you decide to upgrade from the sample.",
    href: "/pricing",
  },
];

const PERKS = [
  {
    icon: FileText,
    title: `${FREE_SAMPLE_PAGE_COUNT} real pages`,
    body: "Judge the quality before you buy anything — these are the same prompts and playbooks that ship in the paid kit, word for word.",
  },
  {
    icon: ShieldCheck,
    title: "No credit card",
    body: "Zero risk to try it. Just your email — no card on file, no trial quietly converting into a charge later.",
  },
  {
    icon: Mail,
    title: "Instant delivery",
    body: "No waiting on a sales team or a drip sequence — your download starts right away, and a copy of the link lands in your inbox as backup.",
  },
];

export default function FreePage() {
  return (
    <>
      <TrackPageView event={ANALYTICS_EVENTS.FreeSampleViewed} />
      <JsonLd id="free-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="free-faq-schema" data={FAQ_SCHEMA} />

      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <SectionHeader
            as="h1"
            eyebrow="Free Sample"
            title="Download Free Sample"
            description={`Get a real ${FREE_SAMPLE_PAGE_COUNT}-page slice of the SARION Claude Code Mastery Kit — actual prompts, playbooks, and checklists, not a preview. It's free because we'd rather you try the work before you pay for it: no credit card, no trial. Enter your email and check your inbox for the download link — it lands instantly.`}
          />

          <div className={styles.formWrap}>
            <FreeSampleForm />
          </div>

          <div className={styles.perks}>
            {PERKS.map((perk) => (
              <div key={perk.title} className={styles.perkItem}>
                <perk.icon size={28} className={styles.perkIcon} aria-hidden />
                <p className={styles.perkTitle}>{perk.title}</p>
                <p className={styles.perkBody}>{perk.body}</p>
              </div>
            ))}
          </div>

          <SectionHeader eyebrow="FAQ" title="Questions about the free sample" />
          <FaqGrid items={FREE_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection
        headline="Like the sample? Get the full kit."
        subtext="300+ pages, 250+ prompts, 60+ playbooks — starting from $49, one-time payment."
        primaryLabel="See the Full Kit"
        primaryHref="/products/claude-code-mastery"
        secondaryLabel="Browse All Products"
        secondaryHref="/products"
      />
    </>
  );
}

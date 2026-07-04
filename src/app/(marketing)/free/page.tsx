import type { Metadata } from "next";
import { FileText, ShieldCheck, Mail } from "lucide-react";

import { SectionHeader } from "@/components/marketing/section-header";
import { FreeSampleForm } from "@/components/marketing/free-sample-form";
import { CTASection } from "@/components/marketing/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { TrackPageView } from "@/components/analytics/track-page-view";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { FREE_SAMPLE_PAGE_COUNT } from "@/lib/marketing/products";
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

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Free Sample", path: "/free" },
]);

const PERKS = [
  {
    icon: FileText,
    title: `${FREE_SAMPLE_PAGE_COUNT} real pages`,
    body: "A genuine slice of the full kit — not a teaser, the actual prompts and playbooks.",
  },
  {
    icon: ShieldCheck,
    title: "No credit card",
    body: "Just your email. No trial that silently converts to a charge.",
  },
  {
    icon: Mail,
    title: "Instant delivery",
    body: "Your download starts immediately, and we email you a copy of the link too.",
  },
];

export default function FreePage() {
  return (
    <>
      <TrackPageView event={ANALYTICS_EVENTS.FreeSampleViewed} />
      <JsonLd id="free-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />

      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader
            as="h1"
            eyebrow="Free Sample"
            title="Download Free Sample"
            description={`Get a real ${FREE_SAMPLE_PAGE_COUNT}-page sample from the SARION Claude Code Mastery Kit — no credit card, no trial, just your email.`}
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

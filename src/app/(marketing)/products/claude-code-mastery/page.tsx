import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, X, ArrowRight, Plus } from "lucide-react";

import { SectionHeader } from "@/components/marketing/section-header";
import { PricingCard } from "@/components/marketing/pricing-card";
import { ProductCard } from "@/components/marketing/product-card";
import { CTASection } from "@/components/marketing/cta-section";
import { NewsletterForm } from "@/components/marketing/newsletter-form";
import { StickyBuyButton } from "@/components/marketing/sticky-buy-button";
import { JsonLd } from "@/components/seo/json-ld";
import { TrackPageView } from "@/components/analytics/track-page-view";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/seo/schema";
import {
  PRODUCTS,
  CCM_STATS,
  CCM_INCLUDED,
  CCM_TOC,
  CCM_WHO_FOR,
  CCM_NOT_FOR,
  CCM_OUTCOMES,
  CCM_TIERS,
  CCM_FAQ,
  CCM_BOX_MOCKUP_BASE,
} from "@/lib/marketing/products";
import styles from "./claude-code-mastery.module.css";

export const metadata: Metadata = {
  title: "Claude Code Mastery Kit",
  description:
    "300+ pages. 250+ engineered prompts. 60+ playbooks. The complete operating system for developers who build with Claude Code — from $49, one-time payment, lifetime access.",
  alternates: { canonical: "/products/claude-code-mastery" },
  keywords: [
    "claude code prompts",
    "claude code playbooks",
    "ai coding prompts",
    "claude code mastery kit",
    "ai engineering templates",
  ],
  openGraph: {
    title: "SARION Claude Code Mastery Kit",
    description:
      "300+ pages, 250+ prompts, 60+ playbooks — the complete operating system for developers who build with Claude Code.",
    url: "/products/claude-code-mastery",
  },
};

const CHECKOUT_URL =
  process.env.NEXT_PUBLIC_MASTERY_KIT_CHECKOUT_URL || "#pricing";

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Claude Code Mastery", path: "/products/claude-code-mastery" },
]);
const FAQ_SCHEMA = faqSchema(CCM_FAQ);
const PRODUCT_SCHEMA = productSchema({
  name: "SARION Claude Code Mastery Kit",
  description:
    "300+ pages, 250+ engineered prompts, and 60+ playbooks for developers who build with Claude Code.",
  url: "/products/claude-code-mastery",
  image: `${CCM_BOX_MOCKUP_BASE}/main-box-light.png`,
  price: 49,
});

const RELATED_PRODUCTS = PRODUCTS.filter((p) => p.slug !== "claude-code-mastery");

export default function ClaudeCodeMasteryPage() {
  return (
    <>
      <TrackPageView event={ANALYTICS_EVENTS.ProductViewed} />
      <JsonLd id="ccm-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="ccm-faq-schema" data={FAQ_SCHEMA} />
      <JsonLd id="ccm-product-schema" data={PRODUCT_SCHEMA} />

      {/* Hero */}
      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader
            as="h1"
            eyebrow="SARION AI Engineering Suite · Volume 1"
            title="Claude Code Mastery Kit"
            description="The complete operating system for developers who build with Claude Code. 300+ pages, 250+ engineered prompts, zero fluff."
          />
          <div className={styles.heroActions}>
            <a href={CHECKOUT_URL} className="mBtn mBtnPrimary mBtnLg">
              Get Instant Access — from $49
            </a>
            <Link href="/free" className="mBtn mBtnSecondary mBtnLg">
              Try the Free Sample
            </Link>
          </div>
          <div className={styles.statsGrid}>
            {CCM_STATS.map((s) => (
              <div key={s.label}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product overview */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader
            eyebrow="The problem"
            title="Great AI, mediocre results"
            description="Claude Code can architect systems, hunt down race conditions, and refactor legacy modules — but only if you know how to drive it. This kit is the missing manual."
          />
        </div>
      </section>

      {/* Preview images */}
      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader eyebrow="A look inside" title="What's in the box" />
          <div className={styles.previewGrid}>
            <div className={styles.previewShot}>
              <Image
                src={`${CCM_BOX_MOCKUP_BASE}/main-box-light.png`}
                alt="SARION Claude Code Mastery Kit box mockup"
                width={600}
                height={600}
              />
            </div>
            <div className={styles.previewShot}>
              <Image
                src={`${CCM_BOX_MOCKUP_BASE}/pdf-bundle-light.png`}
                alt="SARION Claude Code Mastery Kit PDF bundle preview"
                width={600}
                height={600}
              />
            </div>
            <div className={styles.previewShot}>
              <Image
                src={`${CCM_BOX_MOCKUP_BASE}/developer-bundle-light.png`}
                alt="SARION Claude Code Mastery Kit developer bundle preview"
                width={600}
                height={600}
              />
            </div>
            <div className={styles.previewShot}>
              <Image
                src={`${CCM_BOX_MOCKUP_BASE}/complete-bundle-light.png`}
                alt="SARION Claude Code Mastery Kit complete bundle preview"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader
            eyebrow="What's included"
            title="Everything you need, nothing you don't"
          />
          <div className={styles.grid3}>
            {CCM_INCLUDED.map((item) => (
              <div key={item.title} className={styles.tocItem}>
                <p className={styles.tocSection}>{item.title}</p>
                <p className={styles.tocDetail}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table of contents */}
      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader eyebrow="Table of contents" title="12 sections, fully mapped" />
          <div className={styles.tocList}>
            {CCM_TOC.map((item) => (
              <div key={item.section} className={styles.tocItem}>
                <p className={styles.tocSection}>{item.section}</p>
                <p className={styles.tocDetail}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader eyebrow="Who it's for" title="Built for people who ship" />
          <div className={styles.forGrid}>
            <div className={styles.forCol}>
              <p className={styles.forColTitle}>This is for you if…</p>
              <ul className={styles.forList}>
                {CCM_WHO_FOR.map((item) => (
                  <li key={item} className={styles.forItem}>
                    <Check size={16} className={styles.checkIcon} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.forCol}>
              <p className={styles.forColTitle}>This is NOT for you if…</p>
              <ul className={styles.forList}>
                {CCM_NOT_FOR.map((item) => (
                  <li key={item} className={styles.forItem}>
                    <X size={16} className={styles.xIcon} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why it exists / outcomes */}
      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader
            eyebrow="Why it exists"
            title="What you'll be able to do"
            description="The gap between a 2x and a 10x AI-assisted developer isn't the tool — it's the workflow. This kit encodes those workflows."
          />
          <ul className={styles.outcomesList}>
            {CCM_OUTCOMES.map((item) => (
              <li key={item} className={styles.outcomeItem}>
                <Check size={18} className={styles.checkIcon} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Free sample CTA */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader
            eyebrow="Free sample"
            title="Try before you buy"
            description="Get a real 36-page sample from the kit — no credit card required."
          />
          <div className={styles.heroActions}>
            <Link href="/free" className="mBtn mBtnPrimary mBtnLg">
              Download Free Sample
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mSectionTight">
        <div className="mContainer">
          <SectionHeader
            eyebrow="Pricing"
            title="One payment. Yours forever."
            description="Every tier includes lifetime access and free Version 1.x updates. 14-day, no-questions-asked refund."
          />
          <div className={styles.tiersGrid}>
            {CCM_TIERS.map((tier) => (
              <PricingCard
                key={tier.name}
                name={tier.name}
                price={tier.price}
                description={tier.description}
                features={tier.features}
                featured={tier.featured}
                ctaLabel="Get Instant Access"
                ctaHref={CHECKOUT_URL}
                period="one-time"
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions buyers ask before clicking" />
          <div className={styles.faqList}>
            {CCM_FAQ.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary>
                  {item.question}
                  <Plus size={18} className={styles.faqIcon} aria-hidden />
                </summary>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        headline="Start driving Claude Code like a pro."
        subtext="One payment. Yours forever. 14-day money-back guarantee."
        primaryLabel="Get Instant Access"
        primaryHref={CHECKOUT_URL}
        secondaryLabel="Download Free Sample"
        secondaryHref="/free"
      />

      {/* Newsletter */}
      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader
            eyebrow="Stay in the loop"
            title="Get notified about new SARION products"
          />
          <div className={styles.newsletterPanel}>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader eyebrow="More from SARION" title="Related products" />
          <div className={styles.relatedGrid}>
            {RELATED_PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "var(--m-space-6)" }}>
            <Link href="/products" className="mBtn mBtnSecondary">
              View all products <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <StickyBuyButton
        name="Claude Code Mastery Kit"
        price={49}
        checkoutUrl={CHECKOUT_URL}
      />
    </>
  );
}

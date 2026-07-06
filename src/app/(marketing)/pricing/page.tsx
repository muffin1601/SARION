import type { Metadata } from "next";
import Link from "next/link";
import { Check, ShieldCheck, Sparkles, Heart } from "lucide-react";

import { SectionHeader } from "@/components/marketing/section-header";
import { PricingPlans } from "@/components/marketing/pricing-plans";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { TrackPageView } from "@/components/analytics/track-page-view";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { faqSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { TRIAL_POINTS, PRICING_FAQ } from "@/lib/marketing/pricing";
import { isFoundingOfferOpen } from "@/config/plans";
import styles from "./pricing.module.css";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for agencies. Start free, or take a 14-day trial of every premium feature — no credit card. Lock in founding pricing for life during launch.",
  alternates: { canonical: "/pricing" },
  keywords: [
    "agency software pricing",
    "client portal software pricing",
    "agency CRM cost",
    "free agency management software",
    "annual billing agency software",
  ],
  openGraph: {
    title: "Pricing · Sarion",
    description:
      "Start free or take a 14-day trial — no credit card. Founding pricing locked forever during launch.",
    url: "/pricing",
  },
};

const FAQ_SCHEMA = faqSchema(PRICING_FAQ);
const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);

const RELATED_LINKS = [
  {
    label: "Features",
    description: "See everything included in every plan.",
    href: "/features",
  },
  {
    label: "Portal Demo",
    description: "Try the branded client portal before you sign up.",
    href: "/portal-demo",
  },
  {
    label: "Agency Scorecard",
    description: "Score your agency's operations and see what switching could save you.",
    href: "/scorecard",
  },
  {
    label: "Book a Demo",
    description: "Have questions first? Talk to the founding team.",
    href: "/contact",
  },
];

const REASSURANCE = [
  {
    icon: Sparkles,
    title: "Founding pricing, locked forever",
    body: "Join during launch and your rate never goes up — even as we add features and raise prices.",
  },
  {
    icon: ShieldCheck,
    title: "Free migration included",
    body: "Coming from another tool? We'll help you move your clients and projects over at no cost.",
  },
  {
    icon: Heart,
    title: "Founder support",
    body: "You're talking to the people who build Sarion. Real answers, fast — not a ticket queue.",
  },
];

export default function PricingPage() {
  const foundingOpen = isFoundingOfferOpen();

  return (
    <>
      <TrackPageView event={ANALYTICS_EVENTS.PricingViewed} />
      <JsonLd id="pricing-faq-schema" data={FAQ_SCHEMA} />
      <JsonLd id="pricing-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} />
          <SectionHeader
            as="h1"
            eyebrow="Pricing"
            title="Start free. Upgrade when you're ready."
            description="Every paid plan includes a 14-day trial of the full workspace — no credit card. Founding members lock in today's prices for life."
          />
          <PricingPlans foundingOpen={foundingOpen} />
        </div>
      </section>

      {/* Reassurance / trust */}
      <section className="mSectionTight">
        <div className="mContainer">
          <div className={styles.grid}>
            {REASSURANCE.map((r) => (
              <div key={r.title} className={styles.faqItem}>
                <r.icon className={styles.check} aria-hidden />
                <p className={styles.faqQuestion}>{r.title}</p>
                <p className={styles.faqAnswer}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trial reassurance */}
      <section className="mSectionTight">
        <div className="mContainer">
          <div className={styles.trial}>
            <h2 className={styles.trialTitle}>Try everything, risk-free</h2>
            <ul className={styles.trialList}>
              {TRIAL_POINTS.map((point) => (
                <li key={point} className={styles.trialItem}>
                  <Check className={styles.check} aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="mBtn mBtnPrimary mBtnLg">
              Start Free
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
          <div className={styles.faqGrid}>
            {PRICING_FAQ.map((item) => (
              <div key={item.question} className={styles.faqItem}>
                <p className={styles.faqQuestion}>{item.question}</p>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </div>
            ))}
          </div>
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>
    </>
  );
}

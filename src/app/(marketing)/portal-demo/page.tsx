/**
 * Marketing Portal Demo — an interactive walkthrough of the Sarion client
 * portal, driven by the mock data in src/lib/marketing/features.ts
 * (PORTAL_* exports). See docs/portal-demo-notes.md for the plan to swap
 * this for the real Client Portal UI once F6 ships.
 */
import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeader } from "@/components/marketing/section-header";
import { FeatureCard } from "@/components/marketing/feature-card";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import {
  PORTAL_BENEFITS_AGENCY,
  PORTAL_BENEFITS_CLIENT,
  PORTAL_BEFORE_AFTER,
} from "@/lib/marketing/features";
import { PORTAL_DEMO_FAQ } from "@/lib/marketing/faq";
import { PortalDemoClient } from "./portal-demo-client";
import styles from "./portal-demo.module.css";

export const metadata: Metadata = {
  title: "Portal Demo",
  description:
    "See the Sarion client portal in action — a branded space where your clients track project progress, review work, and stay in the loop.",
  alternates: { canonical: "/portal-demo" },
  keywords: [
    "client portal demo",
    "agency client portal example",
    "branded client portal software",
    "client project tracking portal",
  ],
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Portal Demo", path: "/portal-demo" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);
const FAQ_SCHEMA = faqSchema(PORTAL_DEMO_FAQ);

const HOW_IT_WORKS = [
  {
    title: "Create a project",
    text: "Add a client and a project in Sarion. One form, under a minute — no setup wizard to fight through.",
  },
  {
    title: "Send one link",
    text: "Share a secure portal link. Your client opens it and is straight in — no account, no password, no download.",
  },
  {
    title: "The updates happen themselves",
    text: "You keep working in Sarion; the portal reflects it instantly. No status email ever has to be written.",
  },
];

const RELATED_LINKS = [
  {
    label: "Features",
    description: "See everything else Sarion does beyond the client portal.",
    href: "/features",
  },
  {
    label: "Pricing",
    description: "The branded client portal is included on every paid plan.",
    href: "/pricing",
  },
  {
    label: "Agency Scorecard",
    description: "Score your agency's operations in 3 minutes, free.",
    href: "/scorecard",
  },
];

export default function PortalDemoPage() {
  return (
    <>
      <JsonLd id="portal-demo-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="portal-demo-faq-schema" data={FAQ_SCHEMA} />

      {/* Intro */}
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <SectionHeader
            as="h1"
            eyebrow="Portal Demo"
            title="What your clients see when they log in"
            description="This is the exact experience: a private, branded page where clients check project status, files, and invoices — without ever emailing you for an update. Click through the live demo below, then see how easy it is to set up for your own clients."
          />
        </div>
      </section>

      {/* Benefits for agencies vs. clients */}
      <section className="mSectionTight">
        <div className="mContainer">
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitsCol}>
              <h3>Benefits for your agency</h3>
              <div className={styles.benefitsList}>
                {PORTAL_BENEFITS_AGENCY.map((b) => (
                  <FeatureCard key={b.title} {...b} />
                ))}
              </div>
            </div>
            <div className={styles.benefitsCol}>
              <h3>Benefits for your clients</h3>
              <div className={styles.benefitsList}>
                {PORTAL_BENEFITS_CLIENT.map((b) => (
                  <FeatureCard key={b.title} {...b} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive portal mock */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <div className={styles.demoNote}>
            <span className="mBadge mBadgeInfo">Live demo</span>
            <span>Click a project or invoice to expand it — this is pixel-for-pixel what your clients see when they log in.</span>
          </div>

          <PortalDemoClient />

          <div className={styles.inlineCta}>
            <Link href="/signup" className="mBtn mBtnPrimary mBtnLg">
              Give your clients this experience
            </Link>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader
            eyebrow="Before vs. after"
            title="The status-update tax disappears"
          />
          <div className={styles.beforeAfterGrid}>
            {PORTAL_BEFORE_AFTER.map((item) => (
              <div key={item.before} className={styles.beforeAfterRow}>
                <div className={styles.beforeCard}>
                  <span className={styles.beforeAfterLabel}>Before</span>
                  {item.before}
                </div>
                <div className={styles.afterCard}>
                  <span className={styles.beforeAfterLabel}>After</span>
                  {item.after}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader eyebrow="How it works" title="Live in three steps" />
          <div className={styles.stepsGrid}>
            {HOW_IT_WORKS.map((s, i) => (
              <div key={s.title} className={styles.step}>
                <div className={styles.stepNum}>{i + 1}</div>
                <p className={styles.stepTitle}>{s.title}</p>
                <p className={styles.stepText}>{s.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.inlineCta}>
            <Link href="/signup" className="mBtn mBtnPrimary mBtnLg">
              Start Free
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about the client portal" />
          <FaqGrid items={PORTAL_DEMO_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="mSectionTight">
        <div className="mContainer">
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>
              Give your clients this experience today
            </h2>
            <p className={styles.ctaSub}>
              The branded client portal is included free on every plan — see{" "}
              <Link href="/pricing">pricing</Link> or browse{" "}
              <Link href="/features">everything Sarion includes</Link>.
            </p>
            <Link href="/signup" className="mBtn mBtnPrimary mBtnLg">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

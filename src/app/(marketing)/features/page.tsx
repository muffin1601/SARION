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
import { FEATURE_SECTIONS } from "@/lib/marketing/features";
import { FEATURES_FAQ } from "@/lib/marketing/faq";
import styles from "./features.module.css";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Client management, projects, invoicing, and branded client portals — everything an agency needs to run client work in one workspace. See what Sarion does.",
  alternates: { canonical: "/features" },
  keywords: [
    "agency client management software",
    "agency project management",
    "agency invoicing software",
    "branded client portal",
    "agency workspace tool",
  ],
  openGraph: {
    title: "Features · Sarion",
    description:
      "Client management, projects, invoicing, and branded client portals in one agency workspace.",
    url: "/features",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);
const FAQ_SCHEMA = faqSchema(FEATURES_FAQ);

const RELATED_LINKS = [
  {
    label: "Pricing",
    description: "See plans, founding pricing, and what's included at each tier.",
    href: "/pricing",
  },
  {
    label: "Portal Demo",
    description: "Try the branded client portal your clients would actually see.",
    href: "/portal-demo",
  },
  {
    label: "Agency Scorecard",
    description: "Score your agency's operations and see what's costing you time and revenue.",
    href: "/scorecard",
  },
  {
    label: "Products",
    description: "Browse templates, automation systems, and other digital products.",
    href: "/products",
  },
  {
    label: "Contact",
    description: "Have a question first? Talk to the team building Sarion.",
    href: "/contact",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <JsonLd id="features-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="features-faq-schema" data={FAQ_SCHEMA} />
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <SectionHeader
            as="h1"
            eyebrow="Features"
            title="Everything agencies need to run client work"
            description="Sarion replaces the patchwork of tools agencies rely on with one focused workspace."
          />
          <p className={styles.intro}>
            Built specifically for agency delivery, not sales pipelines — Sarion combines the CRM,
            project tracking, invoicing, and client communication most agencies stitch together
            from separate tools into one workspace your team actually wants to use.
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

      {FEATURE_SECTIONS.map((section, index) => (
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
          <SectionHeader eyebrow="FAQ" title="Questions about Sarion's features" />
          <FaqGrid items={FEATURES_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection headline="See it in action with a free trial." />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { StatsStrip } from "@/components/marketing/stats-strip";
import { FlagshipCard } from "@/components/marketing/flagship-card";
import { CollectionSection } from "@/components/marketing/collection-section";
import { SectionHeader } from "@/components/marketing/section-header";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { TrackPageView } from "@/components/analytics/track-page-view";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { breadcrumbSchema, itemListSchema, faqSchema } from "@/lib/seo/schema";
import { PRODUCTS, COLLECTIONS, productsByCollection } from "@/lib/marketing/products";
import { PRODUCTS_FAQ } from "@/lib/marketing/faq";
import styles from "./products.module.css";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Premium software, templates, automation systems and engineering resources built for developers, agencies and startups.",
  alternates: { canonical: "/products" },
  keywords: [
    "claude code prompts",
    "ai engineering resources",
    "agency operating system",
    "n8n automation templates",
    "nextjs saas boilerplate",
    "sarion products",
  ],
  openGraph: {
    title: "SARION Products",
    description:
      "Premium software, templates, automation systems and engineering resources built for developers, agencies and startups.",
    url: "/products",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);
const LIST_SCHEMA = itemListSchema(
  PRODUCTS.map((p) => ({
    name: p.name,
    url: p.href ?? "/products",
  })),
);
const FAQ_SCHEMA = faqSchema(PRODUCTS_FAQ);

const RELATED_LINKS = [
  {
    label: "Home",
    description: "Back to the SARION homepage.",
    href: "/",
  },
  {
    label: "Free Sample",
    description: "Download a free sample from the Claude Code Mastery Kit.",
    href: "/free",
  },
  {
    label: "SARION Features",
    description: "See what the flagship CRM does for running your agency.",
    href: "/features",
  },
  {
    label: "CRM Pricing",
    description: "Plans and founding pricing for SARION CRM.",
    href: "/pricing",
  },
];

export default function ProductsPage() {
  return (
    <>
      <TrackPageView event={ANALYTICS_EVENTS.ProductsViewed} />
      <JsonLd id="products-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="products-list-schema" data={LIST_SCHEMA} />
      <JsonLd id="products-faq-schema" data={FAQ_SCHEMA} />

      {/* Hero */}
      <section className="mSectionTight">
        <div className={`mContainer ${styles.hero}`}>
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} />
          <h1 className={styles.headline}>
            <span>Build Faster.</span>
            <span>Run Better.</span>
            <span className={styles.headlineAccent}>Automate Everything.</span>
          </h1>
          <p className={styles.subheading}>
            Premium software, templates, automation systems and engineering resources built for
            developers, agencies and startups.
          </p>
          <div className={styles.heroActions}>
            <Link href="#developer-collection" className="mBtn mBtnPrimary mBtnLg">
              Explore Products
            </Link>
            <Link href="/signup" className="mBtn mBtnSecondary mBtnLg">
              Start CRM Free
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mSectionTight">
        <div className="mContainer">
          <StatsStrip />
        </div>
      </section>

      {/* Flagship — SARION CRM, visually distinct from the digital-product catalog */}
      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader eyebrow="Flagship Product" title="The system agencies run on" />
          <FlagshipCard />
        </div>
      </section>

      {/* Collections */}
      <div id="developer-collection">
        <CollectionSection collection={COLLECTIONS[0]} products={productsByCollection("developer")} />
      </div>
      <CollectionSection collection={COLLECTIONS[1]} products={productsByCollection("agency")} />
      <CollectionSection collection={COLLECTIONS[2]} products={productsByCollection("automation")} />

      {/* FAQ */}
      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about the SARION product catalog" />
          <FaqGrid items={PRODUCTS_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>
    </>
  );
}

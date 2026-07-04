import type { Metadata } from "next";

import { SectionHeader } from "@/components/marketing/section-header";
import { ProductCard } from "@/components/marketing/product-card";
import { CTASection } from "@/components/marketing/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { TrackPageView } from "@/components/analytics/track-page-view";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { breadcrumbSchema, itemListSchema } from "@/lib/seo/schema";
import { PRODUCTS } from "@/lib/marketing/products";
import styles from "./products.module.css";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Premium AI engineering resources for developers, agencies, startups and technical teams — starting with the SARION Claude Code Mastery Kit.",
  alternates: { canonical: "/products" },
  keywords: [
    "claude code prompts",
    "ai engineering resources",
    "claude code playbooks",
    "ai coding templates",
    "sarion products",
  ],
  openGraph: {
    title: "SARION Products",
    description:
      "Premium AI engineering resources for developers, agencies, startups and technical teams.",
    url: "/products",
  },
};

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
]);
const LIST_SCHEMA = itemListSchema(
  PRODUCTS.map((p) => ({
    name: p.name,
    url: p.href ?? "/products",
  })),
);

export default function ProductsPage() {
  return (
    <>
      <TrackPageView event={ANALYTICS_EVENTS.ProductsViewed} />
      <JsonLd id="products-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="products-list-schema" data={LIST_SCHEMA} />
      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader
            as="h1"
            eyebrow="SARION Products"
            title="SARION Products"
            description="Premium AI engineering resources for developers, agencies, startups and technical teams."
          />
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <div className={styles.grid}>
            {PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Not sure where to start?"
        subtext="Grab the free 36-page sample from the Claude Code Mastery Kit — no credit card required."
        primaryLabel="Get the Free Sample"
        primaryHref="/free"
        secondaryLabel="See the CRM"
        secondaryHref="/features"
      />
    </>
  );
}

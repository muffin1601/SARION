import type { Metadata } from "next";

import { SectionHeader } from "@/components/marketing/section-header";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { RelatedPages } from "@/components/marketing/related-pages";
import { CTASection } from "@/components/marketing/cta-section";
import { RoadmapColumn } from "@/components/trust/roadmap-column";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { ROADMAP_ITEMS } from "@/content/roadmap/roadmap";
import styles from "./roadmap.module.css";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Sarion's public roadmap — what's shipped, what's in progress, and what's planned across CRM, portal, automation, mobile, and AI.",
  alternates: { canonical: "/roadmap" },
  openGraph: {
    title: "Roadmap · Sarion",
    description: "Sarion's public roadmap — shipped, now, next, and later.",
    url: "/roadmap",
  },
};

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Roadmap", path: "/roadmap" },
];

const RELATED_LINKS = [
  { label: "Changelog", description: "What's already shipped, in detail.", href: "/changelog" },
  { label: "Trust Center", description: "Everything about how we operate.", href: "/trust" },
  { label: "Enterprise", description: "Security, scale, and support for larger teams.", href: "/enterprise" },
];

export default function RoadmapPage() {
  const shipped = ROADMAP_ITEMS.filter((i) => i.status === "shipped");
  const now = ROADMAP_ITEMS.filter((i) => i.status === "now");
  const next = ROADMAP_ITEMS.filter((i) => i.status === "next");
  const later = ROADMAP_ITEMS.filter((i) => i.status === "later");

  return (
    <>
      <JsonLd id="roadmap-breadcrumb" data={breadcrumbSchema(TRAIL)} />

      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={TRAIL} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow="Roadmap"
            title="Where Sarion is headed, in the open"
            description="What's shipped, what we're building now, what's next, and what we're still exploring — across CRM, client portal, automation, mobile, and AI. Nothing here is promised on a date."
          />
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <div className={styles.grid}>
            <RoadmapColumn
              title="Recently Shipped"
              description="Live in the product today"
              items={shipped}
            />
            <RoadmapColumn title="Now" description="In active development" items={now} />
            <RoadmapColumn title="Next" description="Planned, not yet started" items={next} />
            <RoadmapColumn title="Later" description="Exploring, not committed" items={later} />
          </div>
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection
        headline="Try what's already live"
        subtext="Start a free trial and see the CRM, portal, and invoicing features shipping today."
        primaryLabel="Start Free Trial"
        primaryHref="/signup"
        secondaryLabel="See Portal Demo"
        secondaryHref="/portal-demo"
      />
    </>
  );
}

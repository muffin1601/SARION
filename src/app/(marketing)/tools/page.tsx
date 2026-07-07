import type { Metadata } from "next";

import { SectionHeader } from "@/components/marketing/section-header";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { RelatedPages } from "@/components/marketing/related-pages";
import { ToolCard } from "@/components/tools/tool-card";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, itemListSchema } from "@/lib/seo/schema";
import { getToolEntries } from "@/content/tools/tools";
import styles from "./tools.module.css";

export const metadata: Metadata = {
  title: "Free Agency Calculators & Tools",
  description:
    "Free interactive calculators for agency owners — pricing, profitability, capacity, and growth, with live results and no signup required.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free Agency Calculators & Tools · Sarion",
    description:
      "Free interactive calculators for agency owners — pricing, profitability, capacity, and growth.",
    url: "/tools",
  },
};

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
];

const RELATED_LINKS = [
  { label: "Blog", description: "Practical articles on agency CRM and operations.", href: "/blog" },
  { label: "Resources", description: "Free templates, checklists, and guides.", href: "/resources" },
  { label: "Compare Sarion", description: "Honest comparisons against popular tools.", href: "/compare" },
  { label: "Solutions by Industry", description: "See how Sarion fits your kind of agency.", href: "/solutions" },
];

export default function ToolsPage() {
  const entries = getToolEntries();
  const contents = entries.map((e) => e.content);
  const featured = contents.filter((c) => c.featured);
  const newest = [...contents].sort((a, b) => (a.addedDate < b.addedDate ? 1 : -1)).slice(0, 4);

  return (
    <>
      <JsonLd id="tools-breadcrumb" data={breadcrumbSchema(TRAIL)} />
      <JsonLd
        id="tools-list"
        data={itemListSchema(contents.map((c) => ({ name: c.title, url: `/tools/${c.slug}` })))}
      />

      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={TRAIL} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow="Free Tools"
            title="Interactive calculators for running an agency"
            description="Real math, live results, no signup required. Built to help you make a pricing or capacity decision in the next five minutes."
          />
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mSection">
          <div className="mContainer">
            <SectionHeader align="left" eyebrow="Featured" title="Start here" />
            <div className={styles.grid} style={{ marginTop: "var(--m-space-6)" }}>
              {featured.map((c) => (
                <ToolCard key={c.slug} tool={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="Newest" title="Recently added" />
          <div className={styles.grid} style={{ marginTop: "var(--m-space-6)" }}>
            {newest.map((c) => (
              <ToolCard key={c.slug} tool={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="All tools" title="Every calculator" />
          <div className={styles.grid} style={{ marginTop: "var(--m-space-6)" }}>
            {contents.map((c) => (
              <ToolCard key={c.slug} tool={c} />
            ))}
          </div>
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>
    </>
  );
}

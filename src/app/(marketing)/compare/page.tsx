import type { Metadata } from "next";

import { SectionHeader } from "@/components/marketing/section-header";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { RelatedPages } from "@/components/marketing/related-pages";
import { ComparisonCard } from "@/components/compare/comparison-card";
import { ComparisonSearch, type ComparisonSearchEntry } from "@/components/compare/comparison-search";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, itemListSchema } from "@/lib/seo/schema";
import { COMPARISONS } from "@/content/compare/comparisons";
import styles from "./compare.module.css";

export const metadata: Metadata = {
  title: "Compare Sarion",
  description:
    "Honest, side-by-side comparisons of Sarion against ClickUp, Notion, Monday, Trello, Asana, HubSpot, Zoho CRM, and spreadsheets — for agencies choosing the right tool.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Compare Sarion · Sarion",
    description:
      "Honest, side-by-side comparisons of Sarion against popular project management and CRM tools.",
    url: "/compare",
  },
};

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Compare", path: "/compare" },
];

const RELATED_LINKS = [
  { label: "Features", description: "The full breakdown of every tool in the workspace.", href: "/features" },
  { label: "Pricing", description: "Simple plans that grow with your agency.", href: "/pricing" },
  { label: "Solutions by Industry", description: "See how Sarion fits your specific kind of agency.", href: "/solutions" },
  { label: "Blog", description: "Practical articles on agency CRM and operations.", href: "/blog" },
];

const CATEGORY_LABELS: Record<string, string> = {
  "project-management": "Project Management",
  "all-in-one-workspace": "All-in-One Workspace",
  crm: "CRM",
  spreadsheets: "Spreadsheets",
};

export default function ComparePage() {
  const searchIndex: ComparisonSearchEntry[] = COMPARISONS.map((c) => ({
    slug: c.slug,
    name: c.competitorName,
    category: CATEGORY_LABELS[c.category] ?? c.category,
    summary: c.quickSummary,
  }));

  const featured = COMPARISONS.filter((c) => c.featured);
  const recentlyAdded = [...COMPARISONS].sort((a, b) => (a.addedDate < b.addedDate ? 1 : -1)).slice(0, 4);
  const categories = Array.from(new Set(COMPARISONS.map((c) => c.category)));

  return (
    <>
      <JsonLd id="compare-breadcrumb" data={breadcrumbSchema(TRAIL)} />
      <JsonLd
        id="compare-list"
        data={itemListSchema(
          COMPARISONS.map((c) => ({
            name: `Sarion vs. ${c.competitorName}`,
            url: `/compare/${c.slug}`,
          })),
        )}
      />

      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={TRAIL} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow="Compare"
            title="Honest comparisons, so you pick the right tool"
            description="Sarion isn't the best fit for everyone. These comparisons are built to help you decide objectively — including when a competitor is genuinely the better choice."
          />
          <div style={{ marginTop: "var(--m-space-6)" }}>
            <ComparisonSearch index={searchIndex} />
          </div>
          <div className={styles.categories}>
            {categories.map((cat) => (
              <span key={cat} className="mBadge mBadgeInfo">
                {CATEGORY_LABELS[cat] ?? cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="Featured" title="Most-asked-about comparisons" />
          <div className={styles.grid} style={{ marginTop: "var(--m-space-6)" }}>
            {featured.map((c) => (
              <ComparisonCard key={c.slug} comparison={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="Recently added" title="Newest comparisons" />
          <div className={styles.grid} style={{ marginTop: "var(--m-space-6)" }}>
            {recentlyAdded.map((c) => (
              <ComparisonCard key={c.slug} comparison={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="All comparisons" title="Every comparison" />
          <div className={styles.grid} style={{ marginTop: "var(--m-space-6)" }}>
            {COMPARISONS.map((c) => (
              <ComparisonCard key={c.slug} comparison={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <SectionHeader
            align="left"
            eyebrow="Most viewed"
            title="Popular with visitors like you"
            description="Placeholder ranking based on our featured picks — live view-count ranking is planned for a future update."
          />
          <div className={styles.grid} style={{ marginTop: "var(--m-space-6)" }}>
            {featured.map((c) => (
              <ComparisonCard key={c.slug} comparison={c} />
            ))}
          </div>
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeader } from "@/components/marketing/section-header";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { RelatedPages } from "@/components/marketing/related-pages";
import { ResourceCard } from "@/components/resources/resource-card";
import { ResourceSearch, type ResourceSearchEntry } from "@/components/resources/resource-search";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, itemListSchema } from "@/lib/seo/schema";
import { RESOURCES } from "@/content/resources/resources";
import { RESOURCE_CATEGORIES } from "@/content/resources/categories";
import styles from "./resources.module.css";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free templates, checklists, SOPs, and guides for running an agency — proposals, onboarding, invoicing, CRM migration, and more.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources · Sarion",
    description:
      "Free templates, checklists, SOPs, and guides for running an agency.",
    url: "/resources",
  },
};

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
];

const RELATED_LINKS = [
  { label: "Blog", description: "Practical articles on agency CRM and operations.", href: "/blog" },
  { label: "Features", description: "See what Sarion includes out of the box.", href: "/features" },
  { label: "Compare Sarion", description: "Honest comparisons against popular tools.", href: "/compare" },
  { label: "Solutions by Industry", description: "See how Sarion fits your kind of agency.", href: "/solutions" },
];

export default function ResourcesPage() {
  const live = RESOURCES.filter((r) => r.status === "live");
  const searchIndex: ResourceSearchEntry[] = live.map((r) => ({
    slug: r.slug,
    category: r.category,
    title: r.title,
    summary: r.metaDescription,
    tags: r.tags,
  }));

  const featured = live.filter((r) => r.featured);
  const newest = [...live].sort((a, b) => (a.addedDate < b.addedDate ? 1 : -1)).slice(0, 4);
  const popular = live.filter((r) => r.popular);

  return (
    <>
      <JsonLd id="resources-breadcrumb" data={breadcrumbSchema(TRAIL)} />
      <JsonLd
        id="resources-list"
        data={itemListSchema(live.map((r) => ({ name: r.title, url: `/resources/${r.category}/${r.slug}` })))}
      />

      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={TRAIL} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow="Resources"
            title="Free templates, checklists, and guides for running an agency"
            description="Practical resources, not gated ebooks. Genuinely useful enough to bookmark — and to link to."
          />
          <div style={{ marginTop: "var(--m-space-6)" }}>
            <ResourceSearch index={searchIndex} />
          </div>
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="Categories" title="Browse by type" />
          <div className={styles.categoryGrid}>
            {RESOURCE_CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={`/resources/${cat.slug}`} className={styles.categoryTile}>
                <p className={styles.categoryName}>{cat.name}</p>
                <p className={styles.categoryDescription}>{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mSectionAlt mSection">
          <div className="mContainer">
            <SectionHeader align="left" eyebrow="Featured" title="Start here" />
            <div className={styles.grid} style={{ marginTop: "var(--m-space-6)" }}>
              {featured.map((r) => (
                <ResourceCard key={r.slug} resource={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="Newest" title="Recently added" />
          <div className={styles.grid} style={{ marginTop: "var(--m-space-6)" }}>
            {newest.map((r) => (
              <ResourceCard key={r.slug} resource={r} />
            ))}
          </div>
        </div>
      </section>

      {popular.length > 0 && (
        <section className="mSectionAlt mSection">
          <div className="mContainer">
            <SectionHeader
              align="left"
              eyebrow="Popular"
              title="Most downloaded"
              description="Placeholder ranking based on our featured picks — live download-count ranking is planned for a future update."
            />
            <div className={styles.grid} style={{ marginTop: "var(--m-space-6)" }}>
              {popular.map((r) => (
                <ResourceCard key={r.slug} resource={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="All resources" title="Everything" />
          <div className={styles.grid} style={{ marginTop: "var(--m-space-6)" }}>
            {live.map((r) => (
              <ResourceCard key={r.slug} resource={r} />
            ))}
          </div>
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>
    </>
  );
}

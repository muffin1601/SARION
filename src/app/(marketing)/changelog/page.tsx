import type { Metadata } from "next";

import { SectionHeader } from "@/components/marketing/section-header";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { RelatedPages } from "@/components/marketing/related-pages";
import { CTASection } from "@/components/marketing/cta-section";
import { ChangelogFilter } from "@/components/trust/changelog-filter";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, articleSchema } from "@/lib/seo/schema";
import { CHANGELOG_ENTRIES } from "@/content/changelog/entries";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What's new at Sarion — feature releases, fixes, and announcements, in one place.",
  alternates: {
    canonical: "/changelog",
    types: { "application/rss+xml": "/changelog/rss.xml" },
  },
  openGraph: {
    title: "Changelog · Sarion",
    description: "What's new at Sarion — feature releases, fixes, and announcements.",
    url: "/changelog",
  },
};

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Changelog", path: "/changelog" },
];

const RELATED_LINKS = [
  { label: "Roadmap", description: "See what's planned next.", href: "/roadmap" },
  { label: "Trust Center", description: "Everything about how we operate.", href: "/trust" },
  { label: "Blog", description: "Practical articles on agency CRM and operations.", href: "/blog" },
];

export default function ChangelogPage() {
  const sorted = [...CHANGELOG_ENTRIES].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <JsonLd id="changelog-breadcrumb" data={breadcrumbSchema(TRAIL)} />
      <JsonLd
        id="changelog-articles"
        data={sorted.map((entry) =>
          articleSchema({
            headline: entry.title,
            description: entry.description,
            url: "/changelog",
            datePublished: entry.date,
          }),
        )}
      />

      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={TRAIL} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow="Changelog"
            title="What's new at Sarion"
            description="Feature releases, fixes, and announcements — filterable and searchable. Subscribe via RSS to stay current."
          />
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <ChangelogFilter entries={sorted} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection
        headline="See where we're headed next"
        subtext="The public roadmap shows what's planned, in progress, and recently shipped."
        primaryLabel="View Roadmap"
        primaryHref="/roadmap"
        secondaryLabel="Start Free Trial"
        secondaryHref="/signup"
      />
    </>
  );
}

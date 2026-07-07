import type { Metadata } from "next";
import { Suspense } from "react";

import { SectionHeader } from "@/components/marketing/section-header";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { SearchPageClient } from "@/components/search/search-page-client";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { buildCombinedSearchIndex } from "@/content/search";

export const metadata: Metadata = {
  title: "Search",
  description: "Search articles, tools, comparisons, resources, and solutions across the Sarion site.",
  alternates: { canonical: "/search" },
  openGraph: {
    title: "Search · Sarion",
    description: "Search articles, tools, comparisons, resources, and solutions across the Sarion site.",
    url: "/search",
  },
};

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Search", path: "/search" },
];

export default function SearchPage() {
  const index = buildCombinedSearchIndex();

  return (
    <>
      <JsonLd id="search-breadcrumb" data={breadcrumbSchema(TRAIL)} />

      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={TRAIL} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow="Search"
            title="Search Sarion"
            description="Find articles, calculators, comparisons, resources, and solutions in one place."
          />
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <Suspense fallback={null}>
            <SearchPageClient index={index} />
          </Suspense>
        </div>
      </section>
    </>
  );
}

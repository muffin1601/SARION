import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SectionHeader } from "@/components/marketing/section-header";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { RelatedPages } from "@/components/marketing/related-pages";
import { CategoryHubGrid } from "@/components/resources/category-hub-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, itemListSchema } from "@/lib/seo/schema";
import { RESOURCE_CATEGORIES, getResourceCategoryBySlug } from "@/content/resources/categories";
import { getResourcesByCategory } from "@/content/resources/resources";

export function generateStaticParams() {
  return RESOURCE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getResourceCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/resources/${category.slug}` },
    openGraph: {
      title: `${category.name} · Sarion Resources`,
      description: category.description,
      url: `/resources/${category.slug}`,
    },
  };
}

export default async function ResourceCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getResourceCategoryBySlug(slug);
  if (!category) notFound();

  const resources = getResourcesByCategory(slug).filter((r) => r.status === "live");
  const trail = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: category.name, path: `/resources/${category.slug}` },
  ];

  return (
    <>
      <JsonLd id="resource-category-breadcrumb" data={breadcrumbSchema(trail)} />
      <JsonLd
        id="resource-category-list"
        data={itemListSchema(
          resources.map((r) => ({ name: r.title, url: `/resources/${r.category}/${r.slug}` })),
        )}
      />

      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={trail} />
          <SectionHeader as="h1" align="left" eyebrow="Resources" title={category.name} description={category.description} />
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <CategoryHubGrid resources={resources} />
          <RelatedPages
            links={[
              { label: "All Resources", description: "Browse every category.", href: "/resources" },
              { label: "Blog", description: "Practical articles on agency CRM and operations.", href: "/blog" },
              { label: "Features", description: "See what Sarion includes out of the box.", href: "/features" },
            ]}
          />
        </div>
      </section>
    </>
  );
}

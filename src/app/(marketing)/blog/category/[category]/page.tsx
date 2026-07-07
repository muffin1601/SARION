import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SectionHeader } from "@/components/marketing/section-header";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { PostGrid } from "@/components/blog/post-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { getPostsByCategory } from "@/lib/blog/posts";
import { CATEGORIES, getCategoryBySlug } from "@/content/categories";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} articles`,
    description: category.description,
    alternates: { canonical: `/blog/category/${category.slug}` },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category: slug } = await params;
  const { page } = await searchParams;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(slug);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: category.name, path: `/blog/category/${category.slug}` },
  ];

  return (
    <>
      <JsonLd id="category-breadcrumb" data={breadcrumbSchema(trail)} />
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={trail} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow="Category"
            title={category.name}
            description={category.description}
          />
        </div>
      </section>
      <section className="mSection">
        <div className="mContainer">
          <PostGrid posts={posts} page={Number(page ?? 1)} basePath={`/blog/category/${category.slug}`} />
        </div>
      </section>
    </>
  );
}

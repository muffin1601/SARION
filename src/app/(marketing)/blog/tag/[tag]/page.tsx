import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SectionHeader } from "@/components/marketing/section-header";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { PostGrid } from "@/components/blog/post-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { getAllTags, getPostsByTag } from "@/lib/blog/posts";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const label = getAllTags().find((t) => t.slug === tagSlug)?.label ?? tagSlug;
  return {
    title: `#${label}`,
    description: `Articles tagged "${label}" on the Sarion blog.`,
    alternates: { canonical: `/blog/tag/${tagSlug}` },
  };
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { tag: tagSlug } = await params;
  const { page } = await searchParams;
  const label = getAllTags().find((t) => t.slug === tagSlug)?.label ?? tagSlug;
  const posts = getPostsByTag(tagSlug);
  if (!posts.length) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: `#${label}`, path: `/blog/tag/${tagSlug}` },
  ];

  return (
    <>
      <JsonLd id="tag-breadcrumb" data={breadcrumbSchema(trail)} />
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={trail} />
          <SectionHeader as="h1" align="left" eyebrow="Tag" title={`#${label}`} />
        </div>
      </section>
      <section className="mSection">
        <div className="mContainer">
          <PostGrid posts={posts} page={Number(page ?? 1)} basePath={`/blog/tag/${tagSlug}`} />
        </div>
      </section>
    </>
  );
}

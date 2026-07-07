import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SectionHeader } from "@/components/marketing/section-header";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { PostGrid } from "@/components/blog/post-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { getPostsByAuthor } from "@/lib/blog/posts";
import { AUTHORS, getAuthorById } from "@/content/authors/authors";

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ author: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ author: string }>;
}): Promise<Metadata> {
  const { author: id } = await params;
  const author = getAuthorById(id);
  if (!author) return {};

  return {
    title: author.name,
    description: `Articles written by ${author.name}, ${author.role}.`,
    alternates: { canonical: `/blog/author/${author.id}` },
  };
}

export default async function AuthorPage({
  params,
  searchParams,
}: {
  params: Promise<{ author: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { author: id } = await params;
  const { page } = await searchParams;
  const author = getAuthorById(id);
  if (!author) notFound();

  const posts = getPostsByAuthor(id);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: author.name, path: `/blog/author/${author.id}` },
  ];

  return (
    <>
      <JsonLd id="author-breadcrumb" data={breadcrumbSchema(trail)} />
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={trail} />
          <SectionHeader as="h1" align="left" eyebrow="Author" title={author.name} description={author.bio} />
        </div>
      </section>
      <section className="mSection">
        <div className="mContainer">
          <PostGrid posts={posts} page={Number(page ?? 1)} basePath={`/blog/author/${author.id}`} />
        </div>
      </section>
    </>
  );
}

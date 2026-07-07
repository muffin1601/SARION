import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeader } from "@/components/marketing/section-header";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { PostGrid } from "@/components/blog/post-grid";
import { BlogSearch } from "@/components/blog/blog-search";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { getAllPosts } from "@/lib/blog/posts";
import { buildSearchIndex } from "@/lib/blog/search-index";
import { CATEGORIES } from "@/content/categories";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical, agency-focused articles on CRM, client management, and running an agency without the busywork.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    title: "Blog · Sarion",
    description:
      "Practical, agency-focused articles on CRM, client management, and running an agency without the busywork.",
    url: "/blog",
  },
};

const BREADCRUMB_SCHEMA = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
]);

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const posts = getAllPosts();
  const searchIndex = buildSearchIndex();

  return (
    <>
      <JsonLd id="blog-breadcrumb" data={BREADCRUMB_SCHEMA} />
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow="Blog"
            title="Practical thinking for agency operators"
            description="No fluff. Articles on CRM, client management, and running an agency, written from real agency work."
          />
          <div className={styles.toolbar}>
            <BlogSearch index={searchIndex} />
            <div className={styles.categories}>
              {CATEGORIES.map((cat) => (
                <Link key={cat.slug} href={`/blog/category/${cat.slug}`} className="mBadge mBadgeInfo">
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <PostGrid posts={posts} page={Number(page ?? 1)} basePath="/blog" />
        </div>
      </section>
    </>
  );
}

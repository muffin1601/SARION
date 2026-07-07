import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { PostHeader } from "@/components/blog/post-header";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { PostNav } from "@/components/blog/post-nav";
import { RelatedArticles } from "@/components/blog/related-articles";
import { ShareButtons } from "@/components/blog/share-buttons";
import { NewsletterCta } from "@/components/blog/newsletter-cta";
import { mdxComponents } from "@/components/blog/mdx-components";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, blogPostingSchema } from "@/lib/seo/schema";
import { getAllPosts, getPostBySlug, getAdjacentPosts, getRelatedPosts } from "@/lib/blog/posts";
import { extractToc, MDX_OPTIONS } from "@/lib/blog/mdx";
import { getAuthorById } from "@/content/authors/authors";
import styles from "./post.module.css";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const author = getAuthorById(post.authorId);
  const toc = extractToc(post.content);
  const { prev, next } = getAdjacentPosts(slug);
  const related = getRelatedPosts(slug);

  const breadcrumbTrail = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd id="post-breadcrumb" data={breadcrumbSchema(breadcrumbTrail)} />
      <JsonLd
        id="post-schema"
        data={blogPostingSchema({
          title: post.title,
          description: post.description,
          url: `/blog/${post.slug}`,
          datePublished: post.date,
          dateModified: post.updated,
          authorName: author?.name ?? "Sarion",
          authorId: author ? `/about#person-${author.id}` : undefined,
          image: post.coverImage,
        })}
      />

      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={breadcrumbTrail} />
          <PostHeader post={post} />
        </div>
      </section>

      <section className="mSectionTight">
        <div className={`mContainer ${styles.layout}`}>
          <div className={styles.toc}>
            <TableOfContents items={toc} />
          </div>
          <div>
            <div className="mProse">
              <MDXRemote source={post.content} components={mdxComponents} options={MDX_OPTIONS} />
            </div>
            <div className={styles.share}>
              <ShareButtons title={post.title} path={`/blog/${post.slug}`} />
            </div>
            <div className={styles.nav}>
              <PostNav prev={prev} next={next} />
            </div>
            <div className={styles.related}>
              <RelatedArticles post={post} related={related} />
            </div>
          </div>
        </div>
      </section>

      <NewsletterCta />
    </>
  );
}

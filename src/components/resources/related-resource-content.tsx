import { RelatedPages } from "@/components/marketing/related-pages";
import { getPostBySlug } from "@/lib/blog/posts";
import { getComparisonBySlug } from "@/content/compare/comparisons";
import { getIndustryBySlug } from "@/content/solutions/industries";
import { getResourceBySlug } from "@/content/resources/resources";
import type { Resource } from "@/content/resources/types";

/** Surfaces related resources, blog posts, comparisons, and industry pages —
 *  same 4-source pattern as blog/solutions/compare's related-*-content components. */
export function RelatedResourceContent({ resource }: { resource: Resource }) {
  const links = [
    ...resource.relatedResourceSlugs
      .map((slug) => getResourceBySlug(slug))
      .filter((r): r is NonNullable<typeof r> => Boolean(r) && r?.status === "live")
      .map((r) => ({
        label: r.title,
        description: r.metaDescription,
        href: `/resources/${r.category}/${r.slug}`,
      })),
    ...resource.relatedBlogSlugs
      .map((slug) => getPostBySlug(slug))
      .filter((post): post is NonNullable<typeof post> => Boolean(post))
      .map((post) => ({
        label: post.title,
        description: post.description,
        href: `/blog/${post.slug}`,
      })),
    ...resource.relatedComparisonSlugs
      .map((slug) => getComparisonBySlug(slug))
      .filter((c): c is NonNullable<typeof c> => Boolean(c))
      .map((c) => ({
        label: `Sarion vs. ${c.competitorName}`,
        description: c.quickSummary,
        href: `/compare/${c.slug}`,
      })),
    ...resource.relatedIndustrySlugs
      .map((slug) => getIndustryBySlug(slug))
      .filter((i): i is NonNullable<typeof i> => Boolean(i))
      .map((industry) => ({
        label: industry.name,
        description: industry.heroSubhead,
        href: `/solutions/${industry.slug}`,
      })),
  ];

  return <RelatedPages links={links} />;
}

import { RelatedPages } from "@/components/marketing/related-pages";
import { getPostBySlug } from "@/lib/blog/posts";
import { getResourceBySlug } from "@/content/resources/resources";
import { getIndustryBySlug } from "@/content/solutions/industries";
import { getComparisonBySlug } from "@/content/compare/comparisons";
import type { Comparison } from "@/content/compare/types";

/** Surfaces related articles, resources, industry pages, and sibling
 *  comparisons — same pattern as src/components/solutions/related-industry-content.tsx. */
export function RelatedComparisonContent({ comparison }: { comparison: Comparison }) {
  const links = [
    ...comparison.relatedBlogSlugs
      .map((slug) => getPostBySlug(slug))
      .filter((post): post is NonNullable<typeof post> => Boolean(post))
      .map((post) => ({
        label: post.title,
        description: post.description,
        href: `/blog/${post.slug}`,
      })),
    ...comparison.relatedResourceSlugs
      .map((slug) => getResourceBySlug(slug))
      .filter((r): r is NonNullable<typeof r> => Boolean(r) && r?.status === "live")
      .map((resource) => ({
        label: resource.title,
        description: resource.metaDescription,
        href: `/resources/${resource.category}/${resource.slug}`,
      })),
    ...comparison.relatedIndustrySlugs
      .map((slug) => getIndustryBySlug(slug))
      .filter((i): i is NonNullable<typeof i> => Boolean(i))
      .map((industry) => ({
        label: industry.name,
        description: industry.heroSubhead,
        href: `/solutions/${industry.slug}`,
      })),
    ...comparison.relatedComparisonSlugs
      .map((slug) => getComparisonBySlug(slug))
      .filter((c): c is NonNullable<typeof c> => Boolean(c))
      .map((sibling) => ({
        label: `Sarion vs. ${sibling.competitorName}`,
        description: sibling.quickSummary,
        href: `/compare/${sibling.slug}`,
      })),
  ];

  return <RelatedPages links={links} />;
}

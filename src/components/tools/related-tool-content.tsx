import { RelatedPages } from "@/components/marketing/related-pages";
import { getPostBySlug } from "@/lib/blog/posts";
import { getResourceBySlug } from "@/content/resources/resources";
import { getIndustryBySlug } from "@/content/solutions/industries";
import { getComparisonBySlug } from "@/content/compare/comparisons";
import { getToolBySlug } from "@/content/tools/tools";
import type { ToolContent } from "@/content/tools/types";

/** Surfaces related resources, blog posts, industries, comparisons, and
 *  other tools — same 5-source pattern as the other platforms' related-*-content. */
export function RelatedToolContent({ tool }: { tool: ToolContent }) {
  const links = [
    ...tool.relatedToolSlugs
      .map((slug) => getToolBySlug(slug))
      .filter((t): t is NonNullable<typeof t> => Boolean(t))
      .map((t) => ({
        label: t.title,
        description: t.metaDescription,
        href: `/tools/${t.slug}`,
      })),
    ...tool.relatedResourceSlugs
      .map((slug) => getResourceBySlug(slug))
      .filter((r): r is NonNullable<typeof r> => Boolean(r) && r?.status === "live")
      .map((r) => ({
        label: r.title,
        description: r.metaDescription,
        href: `/resources/${r.category}/${r.slug}`,
      })),
    ...tool.relatedBlogSlugs
      .map((slug) => getPostBySlug(slug))
      .filter((post): post is NonNullable<typeof post> => Boolean(post))
      .map((post) => ({
        label: post.title,
        description: post.description,
        href: `/blog/${post.slug}`,
      })),
    ...tool.relatedIndustrySlugs
      .map((slug) => getIndustryBySlug(slug))
      .filter((i): i is NonNullable<typeof i> => Boolean(i))
      .map((industry) => ({
        label: industry.name,
        description: industry.heroSubhead,
        href: `/solutions/${industry.slug}`,
      })),
    ...tool.relatedComparisonSlugs
      .map((slug) => getComparisonBySlug(slug))
      .filter((c): c is NonNullable<typeof c> => Boolean(c))
      .map((c) => ({
        label: `Sarion vs. ${c.competitorName}`,
        description: c.quickSummary,
        href: `/compare/${c.slug}`,
      })),
  ];

  return <RelatedPages links={links} />;
}

import { RelatedPages } from "@/components/marketing/related-pages";
import { getPostBySlug } from "@/lib/blog/posts";
import { getResourceBySlug } from "@/content/resources/resources";
import { getIndustryBySlug } from "@/content/solutions/industries";
import type { Industry } from "@/content/solutions/types";

/**
 * Surfaces related articles, resources, sibling industry pages, and the
 * agency-vs-spreadsheets comparison — all driven by the industry's own data,
 * on the existing RelatedPages component (same pattern as
 * src/components/blog/related-articles.tsx).
 */
export function RelatedIndustryContent({ industry }: { industry: Industry }) {
  const links = [
    ...industry.relatedBlogSlugs
      .map((slug) => getPostBySlug(slug))
      .filter((post): post is NonNullable<typeof post> => Boolean(post))
      .map((post) => ({
        label: post.title,
        description: post.description,
        href: `/blog/${post.slug}`,
      })),
    ...industry.relatedResourceSlugs
      .map((slug) => getResourceBySlug(slug))
      .filter((r): r is NonNullable<typeof r> => Boolean(r) && r?.status === "live")
      .map((resource) => ({
        label: resource.title,
        description: resource.metaDescription,
        href: `/resources/${resource.category}/${resource.slug}`,
      })),
    ...industry.relatedIndustrySlugs
      .map((slug) => getIndustryBySlug(slug))
      .filter((i): i is NonNullable<typeof i> => Boolean(i))
      .map((sibling) => ({
        label: sibling.name,
        description: sibling.heroSubhead,
        href: `/solutions/${sibling.slug}`,
      })),
    {
      label: "Agency CRM vs. Spreadsheets",
      description: "See where a dedicated CRM earns its keep over a spreadsheet.",
      href: "/compare/agency-crm-vs-spreadsheets",
    },
  ];

  return <RelatedPages links={links} />;
}

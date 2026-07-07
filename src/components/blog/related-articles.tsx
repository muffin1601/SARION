import { RelatedPages } from "@/components/marketing/related-pages";
import { getResourceBySlug } from "@/content/resources/resources";
import type { Post } from "@/lib/blog/types";

/**
 * Related-articles block, built on the existing RelatedPages component so
 * blog posts share the same internal-linking visual pattern as every other
 * page. Adds the post's comparison/resource links when present.
 */
export function RelatedArticles({ post, related }: { post: Post; related: Post[] }) {
  const links = [
    ...related.map((r) => ({
      label: r.title,
      description: r.description,
      href: `/blog/${r.slug}`,
    })),
  ];

  if (post.comparisonSlug) {
    links.push({
      label: "Compare your options",
      description: "See how Sarion stacks up against spreadsheets and generic CRMs.",
      href: `/compare/${post.comparisonSlug}`,
    });
  }

  const resource = post.resourceSlug ? getResourceBySlug(post.resourceSlug) : undefined;
  if (resource) {
    links.push({
      label: resource.title,
      description: resource.metaDescription,
      href: `/resources/${resource.category}/${resource.slug}`,
    });
  }

  if (!links.length) return null;

  return <RelatedPages links={links} />;
}

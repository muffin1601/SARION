import { getAllPosts } from "@/lib/blog/posts";
import { COMPARISONS } from "@/content/compare/comparisons";
import { RESOURCES } from "@/content/resources/resources";
import { getToolEntries } from "@/content/tools/tools";
import { INDUSTRIES } from "@/content/solutions/industries";

export interface SearchIndexEntry {
  title: string;
  description: string;
  href: string;
  section: string;
}

/** Merges every existing per-platform search index into one, so the
 *  sitewide SearchAction schema points at a real, working endpoint. */
export function buildCombinedSearchIndex(): SearchIndexEntry[] {
  const posts: SearchIndexEntry[] = getAllPosts().map((p) => ({
    title: p.title,
    description: p.description,
    href: `/blog/${p.slug}`,
    section: "Blog",
  }));

  const comparisons: SearchIndexEntry[] = COMPARISONS.map((c) => ({
    title: `Sarion vs. ${c.competitorName}`,
    description: c.quickSummary,
    href: `/compare/${c.slug}`,
    section: "Compare",
  }));

  const resources: SearchIndexEntry[] = RESOURCES.filter((r) => r.status === "live").map((r) => ({
    title: r.title,
    description: r.metaDescription,
    href: `/resources/${r.category}/${r.slug}`,
    section: "Resources",
  }));

  const tools: SearchIndexEntry[] = getToolEntries().map(({ content }) => ({
    title: content.title,
    description: content.metaDescription,
    href: `/tools/${content.slug}`,
    section: "Tools",
  }));

  const industries: SearchIndexEntry[] = INDUSTRIES.map((i) => ({
    title: i.name,
    description: i.heroSubhead,
    href: `/solutions/${i.slug}`,
    section: "Solutions",
  }));

  return [...posts, ...comparisons, ...resources, ...tools, ...industries];
}

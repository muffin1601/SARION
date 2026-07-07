/**
 * Shared content types for the blog/resources topic-cluster system. Kept
 * separate from src/lib/marketing types since this content model (frontmatter,
 * clusters, categories) is a different domain from the static page data there.
 */

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

/** A category belongs to exactly one topic cluster (its pillar's slug). */
export interface Category {
  slug: string;
  name: string;
  description: string;
  /** Slug of the pillar post this category rolls up to, once one exists. */
  cluster?: string;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  authorId: string;
  category: string;
  tags: string[];
  coverImage?: string;
  /** Marks a post as a cluster's pillar (hub) article. */
  pillar?: boolean;
  /** Slug of this post's pillar, when it is a supporting article. */
  pillarSlug?: string;
  /** Explicit same-cluster related post slugs, in editorial priority order. */
  relatedSlugs?: string[];
  /** Slug of a dedicated comparison page relevant to this post, if any. */
  comparisonSlug?: string;
  /** Slug of a resource relevant to this post, if any. */
  resourceSlug?: string;
  /** Defaults to true; set false to keep a post out of listings/sitemap/RSS. */
  published?: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}

export interface SearchIndexEntry {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
}

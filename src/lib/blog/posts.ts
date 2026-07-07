import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

import type { Post, PostFrontmatter } from "./types";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

let cache: Post[] | null = null;

function readPosts(): Post[] {
  if (cache) return cache;

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = data as PostFrontmatter;

    return {
      ...frontmatter,
      published: frontmatter.published ?? true,
      slug,
      content,
      readingTime: readingTime(content).text,
    } satisfies Post;
  });

  cache = posts
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return cache;
}

/** All published posts, newest first. */
export function getAllPosts(): Post[] {
  return readPosts();
}

export function getPostBySlug(slug: string): Post | undefined {
  return readPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return readPosts().filter((p) => p.category === categorySlug);
}

/** URL-safe tag slug — tags in frontmatter are freeform ("agency crm"), but
 *  route segments can't contain spaces. */
export function slugifyTag(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, "-");
}

export function getPostsByTag(tagSlug: string): Post[] {
  return readPosts().filter((p) => p.tags.some((t) => slugifyTag(t) === tagSlug));
}

export function getPostsByAuthor(authorId: string): Post[] {
  return readPosts().filter((p) => p.authorId === authorId);
}

/** All distinct tag slugs, paired with a display label for the original casing/spacing. */
export function getAllTags(): { slug: string; label: string }[] {
  const map = new Map<string, string>();
  for (const post of readPosts()) {
    for (const tag of post.tags) map.set(slugifyTag(tag), tag);
  }
  return Array.from(map, ([slug, label]) => ({ slug, label })).sort((a, b) =>
    a.slug.localeCompare(b.slug),
  );
}

export function getPillarPost(pillarSlug: string): Post | undefined {
  return getPostBySlug(pillarSlug);
}

/** Supporting articles that belong to a given pillar's cluster. */
export function getClusterPosts(pillarSlug: string): Post[] {
  return readPosts().filter((p) => p.pillarSlug === pillarSlug);
}

/**
 * Prev/next navigation within a post's cluster. Walks the pillar's
 * `relatedSlugs` order when available so the sequence reads as a narrative,
 * not just file/date order.
 */
export function getAdjacentPosts(slug: string): { prev: Post | null; next: Post | null } {
  const post = getPostBySlug(slug);
  if (!post) return { prev: null, next: null };

  const pillarSlug = post.pillar ? post.slug : post.pillarSlug;
  const pillar = pillarSlug ? getPostBySlug(pillarSlug) : undefined;
  const order = pillar?.relatedSlugs?.length
    ? [pillar.slug, ...pillar.relatedSlugs]
    : readPosts().map((p) => p.slug);

  const index = order.indexOf(slug);
  if (index === -1) return { prev: null, next: null };

  const prevSlug = index > 0 ? order[index - 1] : null;
  const nextSlug = index < order.length - 1 ? order[index + 1] : null;

  return {
    prev: prevSlug ? getPostBySlug(prevSlug) ?? null : null,
    next: nextSlug ? getPostBySlug(nextSlug) ?? null : null,
  };
}

/** Same-cluster related posts, falling back to same-category if unset. */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const post = getPostBySlug(slug);
  if (!post) return [];

  const explicit = post.relatedSlugs
    ?.map((s) => getPostBySlug(s))
    .filter((p): p is Post => Boolean(p));

  if (explicit?.length) return explicit.slice(0, limit);

  return readPosts()
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, limit);
}

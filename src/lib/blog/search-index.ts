import { getAllPosts } from "./posts";
import type { SearchIndexEntry } from "./types";

/** Flat, serializable index for the client-side Fuse.js search component. */
export function buildSearchIndex(): SearchIndexEntry[] {
  return getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.description,
    category: post.category,
    tags: post.tags,
  }));
}

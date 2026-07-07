import Link from "next/link";

import type { Post } from "@/lib/blog/types";
import { PostCard } from "./post-card";
import styles from "./post-grid.module.css";

const PAGE_SIZE = 9;

/** Paginated post grid, shared by the blog index, category, tag, and author archives. */
export function PostGrid({
  posts,
  page,
  basePath,
}: {
  posts: Post[];
  page: number;
  /** Path this archive lives at, e.g. "/blog" or "/blog/category/crm". */
  basePath: string;
}) {
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const current = Math.min(Math.max(1, page), totalPages);
  const pageItems = posts.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  if (!pageItems.length) {
    return <p className={styles.empty}>No articles here yet — check back soon.</p>;
  }

  return (
    <>
      <div className={styles.grid}>
        {pageItems.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={p === 1 ? basePath : `${basePath}?page=${p}`}
              className={styles.pageLink}
              data-active={p === current}
              aria-current={p === current ? "page" : undefined}
            >
              {p}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}

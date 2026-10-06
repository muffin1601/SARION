import Link from "next/link";

import type { Post } from "@/lib/blog/types";
import { slugifyTag } from "@/lib/blog/posts";
import { CategoryBadge } from "./category-badge";
import { AuthorByline } from "./author-byline";
import styles from "./post-header.module.css";

export function PostHeader({ post }: { post: Post }) {
  return (
    <header className={styles.wrap}>
      <CategoryBadge slug={post.category} />
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.description}>{post.description}</p>
      <AuthorByline authorId={post.authorId} date={post.date} readingTime={post.readingTime} />
      {post.tags.length > 0 && (
        <nav className={styles.tags} aria-label="Article tags">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/blog/tag/${slugifyTag(tag)}`} className="mBadge mBadgeInfo">
              #{tag}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

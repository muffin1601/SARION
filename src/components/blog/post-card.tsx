import Link from "next/link";

import type { Post } from "@/lib/blog/types";
import { getCategoryBySlug } from "@/content/categories";
import styles from "./post-card.module.css";

export function PostCard({ post }: { post: Post }) {
  const category = getCategoryBySlug(post.category);
  const formatted = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      {category && <span className="mBadge mBadgeInfo">{category.name}</span>}
      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.excerpt}>{post.description}</p>
      <p className={styles.meta}>
        <time dateTime={post.date}>{formatted}</time>
        <span aria-hidden> · </span>
        {post.readingTime}
      </p>
    </Link>
  );
}

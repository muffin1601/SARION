import type { Post } from "@/lib/blog/types";
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
    </header>
  );
}

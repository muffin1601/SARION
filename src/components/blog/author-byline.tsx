import Link from "next/link";

import { getAuthorById } from "@/content/authors/authors";
import styles from "./author-byline.module.css";

export function AuthorByline({
  authorId,
  date,
  readingTime,
}: {
  authorId: string;
  date: string;
  readingTime: string;
}) {
  const author = getAuthorById(authorId);
  if (!author) return null;

  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.wrap}>
      <span className={styles.avatar} aria-hidden>
        {author.avatar}
      </span>
      <div className={styles.meta}>
        <Link href={`/blog/author/${author.id}`} className={styles.name}>
          {author.name}
        </Link>
        <p className={styles.sub}>
          <time dateTime={date}>{formatted}</time>
          <span aria-hidden> · </span>
          {readingTime}
        </p>
      </div>
    </div>
  );
}

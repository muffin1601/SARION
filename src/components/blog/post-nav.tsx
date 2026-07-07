import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { Post } from "@/lib/blog/types";
import styles from "./post-nav.module.css";

export function PostNav({ prev, next }: { prev: Post | null; next: Post | null }) {
  if (!prev && !next) return null;

  return (
    <nav className={styles.wrap} aria-label="More articles">
      {prev ? (
        <Link href={`/blog/${prev.slug}`} className={styles.link} data-dir="prev">
          <ArrowLeft size={16} aria-hidden />
          <span>
            <span className={styles.label}>Previous</span>
            <span className={styles.title}>{prev.title}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/blog/${next.slug}`} className={styles.link} data-dir="next">
          <span>
            <span className={styles.label}>Next</span>
            <span className={styles.title}>{next.title}</span>
          </span>
          <ArrowRight size={16} aria-hidden />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

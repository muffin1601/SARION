"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import type { SearchIndexEntry } from "@/lib/blog/types";
import styles from "./blog-search.module.css";

/** Client-side fuzzy search over a build-time index. Fuse.js loads lazily
 *  on first keystroke, keeping it out of the initial bundle. */
export function BlogSearch({ index }: { index: SearchIndexEntry[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchIndexEntry[]>([]);

  async function handleChange(value: string) {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }

    const { default: Fuse } = await import("fuse.js");
    const fuse = new Fuse(index, {
      keys: ["title", "excerpt", "tags"],
      threshold: 0.35,
    });
    setResults(fuse.search(value).map((r) => r.item).slice(0, 6));
  }

  return (
    <div className={styles.wrap}>
      <label htmlFor="blog-search" className="sr-only">
        Search articles
      </label>
      <div className={styles.inputWrap}>
        <Search size={16} aria-hidden className={styles.icon} />
        <input
          id="blog-search"
          type="search"
          placeholder="Search articles…"
          className={styles.input}
          value={query}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {results.length > 0 && (
        <ul className={styles.results}>
          {results.map((r) => (
            <li key={r.slug}>
              <Link href={`/blog/${r.slug}`} className={styles.result}>
                <span className={styles.resultTitle}>{r.title}</span>
                <span className={styles.resultExcerpt}>{r.excerpt}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {query.trim() && results.length === 0 && (
        <p className={styles.empty}>No articles match &ldquo;{query}&rdquo;.</p>
      )}
    </div>
  );
}

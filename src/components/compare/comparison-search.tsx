"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import styles from "./comparison-search.module.css";

export interface ComparisonSearchEntry {
  slug: string;
  name: string;
  category: string;
  summary: string;
}

/** Client-side fuzzy search over the comparison index. Fuse.js loads lazily
 *  on first keystroke — same pattern as src/components/blog/blog-search.tsx. */
export function ComparisonSearch({ index }: { index: ComparisonSearchEntry[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ComparisonSearchEntry[]>([]);

  async function handleChange(value: string) {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }

    const { default: Fuse } = await import("fuse.js");
    const fuse = new Fuse(index, {
      keys: ["name", "category", "summary"],
      threshold: 0.35,
    });
    setResults(fuse.search(value).map((r) => r.item).slice(0, 6));
  }

  return (
    <div className={styles.wrap}>
      <label htmlFor="compare-search" className="sr-only">
        Search comparisons
      </label>
      <div className={styles.inputWrap}>
        <Search size={16} aria-hidden className={styles.icon} />
        <input
          id="compare-search"
          type="search"
          placeholder="Search: ClickUp, Notion, HubSpot…"
          className={styles.input}
          value={query}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {results.length > 0 && (
        <ul className={styles.results}>
          {results.map((r) => (
            <li key={r.slug}>
              <Link href={`/compare/${r.slug}`} className={styles.result}>
                <span className={styles.resultTitle}>Sarion vs. {r.name}</span>
                <span className={styles.resultSummary}>{r.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {query.trim() && results.length === 0 && (
        <p className={styles.empty}>No comparisons match &ldquo;{query}&rdquo;.</p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import styles from "./resource-search.module.css";

export interface ResourceSearchEntry {
  slug: string;
  category: string;
  title: string;
  summary: string;
  tags: string[];
}

/** Client-side fuzzy search over the resources index. Fuse.js loads lazily
 *  on first keystroke — same pattern as blog/compare search. */
export function ResourceSearch({ index }: { index: ResourceSearchEntry[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResourceSearchEntry[]>([]);

  async function handleChange(value: string) {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }

    const { default: Fuse } = await import("fuse.js");
    const fuse = new Fuse(index, {
      keys: ["title", "summary", "tags"],
      threshold: 0.35,
    });
    setResults(fuse.search(value).map((r) => r.item).slice(0, 6));
  }

  return (
    <div className={styles.wrap}>
      <label htmlFor="resource-search" className="sr-only">
        Search resources
      </label>
      <div className={styles.inputWrap}>
        <Search size={16} aria-hidden className={styles.icon} />
        <input
          id="resource-search"
          type="search"
          placeholder="Search: proposal, invoice, onboarding…"
          className={styles.input}
          value={query}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {results.length > 0 && (
        <ul className={styles.results}>
          {results.map((r) => (
            <li key={r.slug}>
              <Link href={`/resources/${r.category}/${r.slug}`} className={styles.result}>
                <span className={styles.resultTitle}>{r.title}</span>
                <span className={styles.resultSummary}>{r.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {query.trim() && results.length === 0 && (
        <p className={styles.empty}>No resources match &ldquo;{query}&rdquo;.</p>
      )}
    </div>
  );
}

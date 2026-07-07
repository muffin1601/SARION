"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import type { SearchIndexEntry } from "@/content/search";
import styles from "./search-page-client.module.css";

/** Sitewide search — combines every platform's index client-side. Fuse.js
 *  loads lazily on first keystroke, same pattern as blog/compare/resources search. */
export function SearchPageClient({ index }: { index: SearchIndexEntry[] }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [results, setResults] = useState<SearchIndexEntry[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      const { default: Fuse } = await import("fuse.js");
      const fuse = new Fuse(index, { keys: ["title", "description", "section"], threshold: 0.35 });
      if (!cancelled) setResults(fuse.search(query).map((r) => r.item).slice(0, 20));
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [query, index]);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchIndexEntry[]>();
    for (const item of results) {
      const list = map.get(item.section) ?? [];
      list.push(item);
      map.set(item.section, list);
    }
    return map;
  }, [results]);

  return (
    <div>
      <div className={styles.inputWrap}>
        <label htmlFor="sitewide-search" className="sr-only">
          Search the site
        </label>
        <Search size={18} aria-hidden className={styles.icon} />
        <input
          id="sitewide-search"
          type="search"
          placeholder="Search articles, tools, comparisons, resources…"
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {query.trim() && results.length === 0 && (
        <p className={styles.empty}>No results for &ldquo;{query}&rdquo;.</p>
      )}

      {[...grouped.entries()].map(([section, items]) => (
        <div key={section} className={styles.group}>
          <p className={styles.groupLabel}>{section}</p>
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.result}>
                  <span className={styles.resultTitle}>{item.title}</span>
                  <span className={styles.resultDescription}>{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

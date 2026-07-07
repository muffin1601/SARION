"use client";

import { useMemo, useState } from "react";

import type { ChangelogEntry, ChangelogType } from "@/content/changelog/types";
import { ChangelogEntryCard } from "./changelog-entry";
import styles from "./changelog-filter.module.css";

const TYPE_FILTERS: { value: ChangelogType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "feature", label: "Features" },
  { value: "fix", label: "Fixes" },
  { value: "announcement", label: "Announcements" },
];

/** Type filter + text search over the changelog — client-side only, no
 *  network call, same lazy-search discipline as blog/compare/resources search. */
export function ChangelogFilter({ entries }: { entries: ChangelogEntry[] }) {
  const [type, setType] = useState<ChangelogType | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return entries.filter((entry) => {
      const matchesType = type === "all" || entry.type === type;
      const matchesQuery =
        !query.trim() ||
        entry.title.toLowerCase().includes(query.toLowerCase()) ||
        entry.description.toLowerCase().includes(query.toLowerCase()) ||
        entry.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesType && matchesQuery;
    });
  }, [entries, type, query]);

  return (
    <div>
      <div className={styles.controls}>
        <label htmlFor="changelog-search" className="sr-only">
          Search changelog
        </label>
        <input
          id="changelog-search"
          type="search"
          placeholder="Search the changelog…"
          className={styles.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={styles.filters}>
          {TYPE_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              className={styles.filterBtn}
              data-active={type === f.value}
              onClick={() => setType(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.list}>
        {filtered.length > 0 ? (
          filtered.map((entry) => <ChangelogEntryCard key={entry.slug} entry={entry} />)
        ) : (
          <p className={styles.empty}>No entries match your filter.</p>
        )}
      </div>
    </div>
  );
}

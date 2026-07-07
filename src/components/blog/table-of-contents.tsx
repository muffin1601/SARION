"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

/** Scroll-spy table of contents over a post's h2/h3 headings (ids from rehype-slug). */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!items.length) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-100px 0px -70% 0px" },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="mEyebrow">On this page</p>
      <ul style={{ marginTop: "var(--m-space-3)", listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: item.depth === 3 ? "var(--m-space-3)" : 0 }}>
            <a href={`#${item.id}`} className="mTocLink" data-active={activeId === item.id}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

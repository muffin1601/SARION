"use client";

import { useEffect, useRef } from "react";

/**
 * Fires `onIntersect` when the returned sentinel ref scrolls into view.
 * Native IntersectionObserver — no extra dependency. Pass `enabled: false`
 * to pause observing (e.g. while a page is already loading or exhausted).
 */
export function useInfiniteScroll(onIntersect: () => void, enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(onIntersect);
  callbackRef.current = onIntersect;

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) callbackRef.current();
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled]);

  return ref;
}

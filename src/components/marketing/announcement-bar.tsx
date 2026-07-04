"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

import styles from "./announcement-bar.module.css";

const DISMISS_KEY = "sarion_announce_ccm_dismissed";

export function AnnouncementBar({ href, label }: { href: string; label: string }) {
  // Session-only dismissal — reappears next visit. No layout-shift risk since
  // this reads from state, not a flash-of-hidden-then-shown effect.
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  });

  if (dismissed) return null;

  return (
    <div className={styles.bar} role="region" aria-label="Announcement">
      <Link href={href} className={styles.link}>
        {label} <ArrowRight size={14} aria-hidden />
      </Link>
      <button
        type="button"
        className={styles.close}
        aria-label="Dismiss announcement"
        onClick={() => {
          sessionStorage.setItem(DISMISS_KEY, "1");
          setDismissed(true);
        }}
      >
        <X size={14} aria-hidden />
      </button>
    </div>
  );
}

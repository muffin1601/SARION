"use client";

import { useState } from "react";
import { Info } from "lucide-react";

import styles from "./field-tooltip.module.css";

export function FieldTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <span className={styles.wrap}>
      <button
        type="button"
        className={styles.trigger}
        aria-label="More information"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
      >
        <Info size={14} aria-hidden />
      </button>
      {open && <span className={styles.bubble}>{text}</span>}
    </span>
  );
}

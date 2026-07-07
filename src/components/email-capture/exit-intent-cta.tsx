"use client";

import { useEffect, useState } from "react";
import { X, MailCheck } from "lucide-react";

import styles from "./exit-intent-cta.module.css";

export interface ExitIntentCtaProps {
  title: string;
  description?: string;
  onSubmit?: (email: string) => Promise<void>;
  /** Unique key so different pages don't share one dismissal flag. */
  storageKey?: string;
}

async function defaultStubSubmit(email: string): Promise<void> {
  // TODO(email-capture): wire to a real ESP endpoint — see README.md.
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (process.env.NODE_ENV !== "production") {
    console.log("[email-capture stub] exit-intent signup:", email);
  }
}

/**
 * Exit-intent trigger — fires once per session (sessionStorage-scoped) when
 * the cursor leaves the top of the viewport, so it never nags on every page
 * view. Not mounted anywhere by default this phase; available for future
 * placement on high-intent pages.
 */
export function ExitIntentCta({
  title,
  description,
  onSubmit = defaultStubSubmit,
  storageKey = "sarion-exit-intent-dismissed",
}: ExitIntentCtaProps) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(storageKey)) return;

    function handleMouseLeave(event: MouseEvent) {
      if (event.clientY <= 0) {
        setVisible(true);
        sessionStorage.setItem(storageKey, "1");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [storageKey]);

  if (!visible) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    await onSubmit(email.trim());
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={title}>
      <div className={styles.panel}>
        <button
          type="button"
          className={styles.close}
          onClick={() => setVisible(false)}
          aria-label="Dismiss"
        >
          <X size={18} aria-hidden />
        </button>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
        {submitted ? (
          <div className={styles.success}>
            <MailCheck size={16} aria-hidden />
            You&apos;re on the list.
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label htmlFor="exit-intent-email" className="sr-only">
              Email address
            </label>
            <input
              id="exit-intent-email"
              type="email"
              className={styles.input}
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <button type="submit" className="mBtn mBtnPrimary mBtnLg" disabled={submitting}>
              {submitting ? "Sending…" : "Get it"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

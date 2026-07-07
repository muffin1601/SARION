"use client";

import { useState } from "react";
import { MailCheck } from "lucide-react";

import styles from "./inline-signup.module.css";

export interface InlineSignupProps {
  title: string;
  description?: string;
  onSubmit?: (email: string) => Promise<void>;
}

async function defaultStubSubmit(email: string): Promise<void> {
  // TODO(email-capture): wire to a real ESP endpoint — see README.md.
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (process.env.NODE_ENV !== "production") {
    console.log("[email-capture stub] inline signup:", email);
  }
}

/** Inline, within-page signup block — for placement mid-article or mid-page. */
export function InlineSignup({ title, description, onSubmit = defaultStubSubmit }: InlineSignupProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(email.trim());
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={`${styles.wrap} mSectionAlt`}>
      <div>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {submitted ? (
        <div className={styles.success}>
          <MailCheck size={16} aria-hidden />
          You&apos;re on the list.
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label htmlFor="inline-signup-email" className="sr-only">
            Email address
          </label>
          <input
            id="inline-signup-email"
            type="email"
            className={styles.input}
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <button type="submit" className="mBtn mBtnPrimary" disabled={submitting}>
            {submitting ? "Sending…" : "Subscribe"}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      )}
    </div>
  );
}

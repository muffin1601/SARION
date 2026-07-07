"use client";

import { useState } from "react";
import { MailCheck } from "lucide-react";

import styles from "./download-gate-form.module.css";

export interface DownloadGateFormProps {
  resourceTitle: string;
  /**
   * Called with the submitted email. Defaults to a client-only stub (no
   * network call) that just shows a success state — swap in a real
   * `/api/leads/...` POST (see README.md) when an ESP is wired up.
   */
  onSubmit?: (email: string) => Promise<void>;
}

async function defaultStubSubmit(email: string): Promise<void> {
  // TODO(email-capture): replace with a real POST to /api/leads/resource-download
  // once an ESP is chosen — see src/components/email-capture/README.md.
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (process.env.NODE_ENV !== "production") {
    console.log("[email-capture stub] would send download link to", email);
  }
}

export function DownloadGateForm({ resourceTitle, onSubmit = defaultStubSubmit }: DownloadGateFormProps) {
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

  if (submitted) {
    return (
      <div className={styles.success}>
        <MailCheck size={18} aria-hidden />
        Check your inbox for the {resourceTitle} download link.
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor="download-gate-email" className="sr-only">
        Email address
      </label>
      <input
        id="download-gate-email"
        type="email"
        className={styles.input}
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <button type="submit" className="mBtn mBtnPrimary mBtnLg" disabled={submitting}>
        {submitting ? "Sending…" : `Get the ${resourceTitle}`}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

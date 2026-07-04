"use client";

import { useState } from "react";
import { Download } from "lucide-react";

import { trackEvent } from "@/lib/analytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import styles from "./newsletter-form.module.css";

export function FreeSampleForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
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
      const res = await fetch("/api/leads/free-sample", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; downloadUrl?: string; error?: string }
        | null;

      if (!res.ok || !data?.downloadUrl) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      trackEvent(ANALYTICS_EVENTS.FreeSampleDownloaded);
      setDownloadUrl(data.downloadUrl);
      // Force an actual file download (not an in-tab PDF viewer navigation)
      // — the email arrives as a backup.
      const link = document.createElement("a");
      link.href = data.downloadUrl;
      link.download = "SARION-Free-Sample.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      setError("We couldn't reach the server. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (downloadUrl) {
    return (
      <div className={styles.success}>
        <Download size={18} aria-hidden />
        Your download is starting.{" "}
        <a href={downloadUrl} download="SARION-Free-Sample.pdf">
          Click here if it doesn&apos;t start automatically
        </a>
        .
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor="free-sample-email" className="sr-only">
        Email address
      </label>
      <input
        id="free-sample-email"
        type="email"
        className={styles.input}
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <button type="submit" className="mBtn mBtnPrimary mBtnLg" disabled={submitting}>
        {submitting ? "Sending…" : "Download Free Sample"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

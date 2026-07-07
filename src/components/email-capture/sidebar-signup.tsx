"use client";

import { useState } from "react";
import { MailCheck } from "lucide-react";

import styles from "./sidebar-signup.module.css";

export interface SidebarSignupProps {
  title: string;
  description?: string;
  onSubmit?: (email: string) => Promise<void>;
}

async function defaultStubSubmit(email: string): Promise<void> {
  // TODO(email-capture): wire to a real ESP endpoint — see README.md.
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (process.env.NODE_ENV !== "production") {
    console.log("[email-capture stub] sidebar signup:", email);
  }
}

/** Sticky sidebar variant — intended for desktop-width layouts alongside long-form content. */
export function SidebarSignup({ title, description, onSubmit = defaultStubSubmit }: SidebarSignupProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    await onSubmit(email.trim());
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      {submitted ? (
        <div className={styles.success}>
          <MailCheck size={16} aria-hidden />
          You&apos;re on the list.
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label htmlFor="sidebar-signup-email" className="sr-only">
            Email address
          </label>
          <input
            id="sidebar-signup-email"
            type="email"
            className={styles.input}
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <button type="submit" className="mBtn mBtnPrimary" disabled={submitting} style={{ width: "100%" }}>
            {submitting ? "Sending…" : "Subscribe"}
          </button>
        </form>
      )}
    </div>
  );
}

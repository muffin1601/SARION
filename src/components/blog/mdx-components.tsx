import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Fixed-destination CTA block. Every post ends with <NextSteps /> so the
 * brief's "every article links to Homepage/Features/Pricing/Portal Demo"
 * requirement holds without relying on authors remembering to add links.
 */
function NextSteps() {
  return (
    <div
      style={{
        marginTop: "var(--m-space-7)",
        padding: "var(--m-space-5)",
        border: "1px solid var(--m-border)",
        borderRadius: "var(--m-radius)",
        background: "var(--m-bg-elev)",
      }}
    >
      <p style={{ fontWeight: 600, color: "var(--m-fg)" }}>Next steps</p>
      <p style={{ marginTop: "var(--m-space-2)", fontSize: "var(--m-text-sm)" }}>
        See how Sarion brings this into practice:{" "}
        <Link href="/features">explore features</Link>,{" "}
        <Link href="/portal-demo">see the client portal</Link>, or{" "}
        <Link href="/pricing">check plans</Link>. Or just{" "}
        <Link href="/">start from the homepage</Link>.
      </p>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  NextSteps,
};

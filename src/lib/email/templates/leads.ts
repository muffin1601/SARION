import { brand, escapeHtml, type EmailContent } from "../design";
import { emailLayout, heading, eyebrow, paragraph, button, textSignature } from "../layout";

/**
 * Free-sample delivery — sent when a visitor requests the free 36-page
 * Claude Code Mastery sample from /free. Best-effort (never blocks the
 * download), sent from hello@ (relationship, see senders.ts).
 */
export function freeSampleDelivery(data: {
  downloadUrl: string;
  productUrl: string;
}): EmailContent {
  const body =
    eyebrow("Your free sample") +
    heading("Here's your SARION Claude Code Mastery sample") +
    paragraph(
      "Thanks for grabbing the free 36-page sample. It's a real slice of the full kit — prompts, playbooks, and process, no fluff.",
    ) +
    button({ href: data.downloadUrl, label: "Download the free sample (PDF)" }) +
    paragraph(
      "Like what you see? The full SARION Claude Code Mastery Kit has 300+ pages, 250+ prompts, and 60+ playbooks — starting from $49, one-time payment, lifetime access.",
    ) +
    button({ href: data.productUrl, label: "See the full kit", variant: "secondary" });

  return {
    subject: "Your free SARION Claude Code Mastery sample",
    html: emailLayout({
      preheader: "Your free 36-page sample is ready to download.",
      body,
      footerNote: "You're receiving this because you requested the free SARION sample.",
    }),
    text: `Here's your SARION Claude Code Mastery sample

Thanks for grabbing the free 36-page sample.

Download it here: ${data.downloadUrl}

Like what you see? The full kit has 300+ pages, 250+ prompts, and 60+ playbooks — starting from $49.
See the full kit: ${data.productUrl}

${textSignature()}`,
  };
}

/** Newsletter signup confirmation — sent from hello@ (relationship). */
export function newsletterWelcome(data: { unsubscribeUrl?: string }): EmailContent {
  const body =
    eyebrow("You're in") +
    heading("Welcome to the SARION list") +
    paragraph(
      "You'll hear from us when we ship new AI engineering resources, playbooks, and product updates — no spam, unsubscribe anytime.",
    ) +
    button({ href: `${brand.url}/products`, label: "Browse SARION products" });

  return {
    subject: "Welcome to the SARION list",
    html: emailLayout({
      preheader: "You're subscribed — we'll only email when it's worth it.",
      body,
      footerNote: data.unsubscribeUrl
        ? `You're receiving this because you subscribed at ${brand.url}. Unsubscribe: ${escapeHtml(data.unsubscribeUrl)}`
        : "You're receiving this because you subscribed to SARION updates.",
    }),
    text: `Welcome to the SARION list

You'll hear from us when we ship new AI engineering resources, playbooks, and product updates.

Browse SARION products: ${brand.url}/products

${textSignature()}`,
  };
}

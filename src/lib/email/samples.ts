import type { EmailKind } from "./senders";
import type { EmailPayloads } from "./templates";
import { APP_URL, MARKETING_URL } from "@/config/urls";

/**
 * Representative sample payloads for every template — used by the email preview
 * script and the guarded test route so each template can be rendered/sent with
 * realistic data. Kept exhaustive via the mapped type (a missing kind won't
 * compile).
 */
export const SAMPLE_PAYLOADS: { [K in EmailKind]: EmailPayloads[K] } = {
  welcome: { name: "Alex Rivera" },
  verifyEmail: { verifyUrl: `${APP_URL}/verify?token=sample`, name: "Alex Rivera" },
  passwordReset: { resetUrl: `${APP_URL}/reset-password?token=sample` },
  magicLink: { loginUrl: `${APP_URL}/magic?token=sample` },
  emailChanged: { newEmail: "alex.new@example.com", name: "Alex Rivera" },
  passwordChanged: { name: "Alex Rivera" },
  teamInvite: {
    toName: "Jordan Lee",
    agencyName: "Northbeam Studio",
    inviteUrl: `${APP_URL}/signup?invite=sample`,
    expiryDays: 14,
  },

  paymentSuccessful: { planName: "Growth", amount: "$49.00", interval: "month", invoiceUrl: `${APP_URL}/settings/billing` },
  paymentFailed: { planName: "Growth", amount: "$49.00", retryUrl: `${APP_URL}/settings/billing` },
  subscriptionActivated: { planName: "Growth", amount: "$49.00", interval: "month" },
  subscriptionRenewed: { planName: "Growth", amount: "$49.00", nextBillingDate: "Jul 15, 2026" },
  subscriptionCancelled: { planName: "Growth", accessUntil: "Jul 15, 2026" },
  invoiceAvailable: {
    invoiceNumber: "INV-0001",
    amount: "$1,200.00",
    dueDate: "Jul 1, 2026",
    invoiceUrl: `${APP_URL}/portal/sample-token`,
    fromAgency: "Northbeam Studio",
  },

  demoBookingConfirmation: { name: "Alex Rivera", dateTime: "Tue, Jul 1 · 2:00 PM GMT", meetingUrl: "https://meet.example.com/sarion-demo", host: "Sara from Sarion" },
  quoteRequestReceived: { name: "Alex Rivera" },
  proposalSent: { name: "Alex Rivera", proposalUrl: `${APP_URL}/proposals/sample`, summary: "Agency plan with white-label portal and migration support." },
  leadFollowUp: { name: "Alex Rivera" },

  contactConfirmation: { name: "Alex Rivera", message: "Hi, I'd love a demo for my 6-person studio.", contactEmail: "contact@trysarion.com" },
  contactInternal: { name: "Alex Rivera", email: "alex@example.com", agency: "Rivera Creative", message: "Hi, I'd love a demo for my 6-person studio." },

  newFeature: { featureName: "Automations", description: "Trigger invoices and portal updates automatically when a project status changes.", ctaUrl: `${APP_URL}/dashboard`, unsubscribeUrl: `${MARKETING_URL}/unsubscribe?token=sample` },
  productAnnouncement: { title: "Sarion is now out of beta", body: "We're officially live. Thanks for being part of the journey.", ctaLabel: "See what's new", ctaUrl: `${MARKETING_URL}/changelog`, unsubscribeUrl: `${MARKETING_URL}/unsubscribe?token=sample` },
  newsletter: {
    headline: "The Sarion Brief — June",
    intro: "Product news, agency tips, and what we shipped this month.",
    items: [
      { title: "Annual billing is here", body: "Save two months when you switch to yearly.", url: "https://trysarion.com/pricing" },
      { title: "Branded client portals", body: "Make every client touchpoint feel like you.", url: "https://trysarion.com/portal-demo" },
    ],
    unsubscribeUrl: `${MARKETING_URL}/unsubscribe?token=sample`,
  },

  scorecardReport: {
    scoreLabel: "47 / 100",
    maturityLabel: "Firefighting",
    maturityHeadline:
      "You're running the agency from your inbox and chat. Every week leaks hours and money.",
    revenueLeak: "$12,300 / year",
    timeLost: "8.5 hrs / week",
    reportUrl: `${MARKETING_URL}/scorecard/results/sample`,
    trialUrl: `${APP_URL}/signup?source=scorecard&session=sample`,
    topFixes: [
      { feature: "Invoicing", fix: "Generate invoices straight from project data and chase late payers automatically." },
      { feature: "Client Portal", fix: "Give clients a portal so they stop asking 'what's the status?'." },
    ],
  },

  freeSampleDelivery: {
    downloadUrl: "https://trysarion.com/release/SARION-Free-Sample/SARION-Free-Sample.pdf",
    productUrl: "https://trysarion.com/products/claude-code-mastery",
  },
  newsletterWelcome: {
    unsubscribeUrl: `${MARKETING_URL}/unsubscribe?token=sample`,
  },
  automationNotification: {
    subject: "Invoice paid — great news!",
    message: "Your invoice INV-0001 was just marked paid. Thanks for your business!",
    fromAgency: "Northbeam Studio",
  },
  proposalShared: {
    proposalName: "Website Redesign Proposal",
    proposalUrl: `${APP_URL}/p/sample-token`,
    fromAgency: "Northbeam Studio",
  },
};

export const ALL_EMAIL_KINDS = Object.keys(SAMPLE_PAYLOADS) as EmailKind[];

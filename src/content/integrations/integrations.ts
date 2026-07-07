import type { Integration } from "./types";

/**
 * Honesty rule: nothing here is marked "live" — Sarion has no customer-
 * facing integration marketplace yet. Every entry is "coming-soon" (on the
 * near-term build list) or "requested" (asked for, not yet scheduled).
 */
export const INTEGRATIONS: Integration[] = [
  {
    slug: "api",
    name: "Public API",
    status: "coming-soon",
    description: "A REST API for reading and writing client, project, and invoice data programmatically.",
    benefits: ["Build custom internal tools on top of your Sarion data", "Sync client records with other systems you run"],
    relatedFeatureEyebrows: ["Client Management"],
  },
  {
    slug: "webhooks",
    name: "Webhooks",
    status: "coming-soon",
    description: "Get notified in real time when something changes in Sarion — a new invoice, a status update, a new client.",
    benefits: ["React to events without polling", "Trigger workflows in other tools automatically"],
    relatedFeatureEyebrows: ["Project Management"],
  },
  {
    slug: "zapier",
    name: "Zapier",
    status: "coming-soon",
    description: "Connect Sarion to thousands of other apps without writing code.",
    benefits: ["Automate repetitive cross-tool tasks", "No-code setup for non-technical team members"],
    relatedFeatureEyebrows: ["Client Management", "Invoices"],
  },
  {
    slug: "slack",
    name: "Slack",
    status: "coming-soon",
    description: "Surface client and project updates directly in your team's Slack workspace.",
    benefits: ["Fewer tab-switches to check status", "Faster team awareness of client activity"],
    relatedFeatureEyebrows: ["Team Collaboration"],
  },
  {
    slug: "google-workspace",
    name: "Google Workspace",
    status: "requested",
    description: "Sync contacts and calendar events between Sarion and Google Workspace.",
    benefits: ["One place for client contact details", "Fewer duplicate calendar entries"],
    relatedFeatureEyebrows: ["Client Management"],
  },
  {
    slug: "outlook",
    name: "Outlook",
    status: "requested",
    description: "Sync contacts and calendar events between Sarion and Outlook/Microsoft 365.",
    benefits: ["Works alongside existing Microsoft-based workflows", "Fewer duplicate calendar entries"],
    relatedFeatureEyebrows: ["Client Management"],
  },
  {
    slug: "calendly",
    name: "Calendly",
    status: "requested",
    description: "Attach scheduled discovery calls and check-ins directly to the right client record.",
    benefits: ["Meeting history tied to the client, not scattered across inboxes"],
    relatedFeatureEyebrows: ["Client Management"],
  },
  {
    slug: "stripe-lemon-squeezy",
    name: "Stripe / Lemon Squeezy",
    status: "requested",
    description: "Let agencies bill their own clients through their preferred payment processor, tied to Sarion invoices.",
    benefits: ["Use the payment processor you already have set up", "Payment status synced back to the invoice record"],
    relatedFeatureEyebrows: ["Invoices"],
  },
  {
    slug: "whatsapp",
    name: "WhatsApp",
    status: "requested",
    description: "Send portal and invoice notifications to clients over WhatsApp, for agencies whose clients prefer it.",
    benefits: ["Reach clients on the channel they actually check"],
    relatedFeatureEyebrows: ["Client Portal"],
  },
  {
    slug: "email",
    name: "Email notifications",
    status: "coming-soon",
    description: "Configurable email notifications for invoice status, project updates, and client portal activity.",
    benefits: ["Stay informed without logging in", "Clients get notified when there's something new to see"],
    relatedFeatureEyebrows: ["Client Portal", "Invoices"],
  },
];

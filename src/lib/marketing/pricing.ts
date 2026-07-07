/**
 * Marketing pricing data — DERIVED from the single source of truth in
 * src/config/plans.ts so the website can never advertise a price or feature set
 * that billing doesn't honour.
 */
import {
  PLAN_LIST,
  yearlySavingMonths,
  type BillingInterval,
  type PlanTier,
} from "@/config/plans";

export interface MarketingPlan {
  tier: PlanTier;
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  /** Months free when paying annually (0 for Free). */
  yearlySavingMonths: number;
  features: string[];
  featured: boolean;
  /** Free plan uses a softer CTA; paid plans start the trial. */
  ctaLabel: string;
}

export const MARKETING_PLANS: MarketingPlan[] = PLAN_LIST.map((p) => ({
  tier: p.tier,
  name: p.name,
  tagline: p.tagline,
  monthly: p.pricing.monthly,
  yearly: p.pricing.yearly,
  yearlySavingMonths: yearlySavingMonths(p.tier),
  features: p.features,
  featured: Boolean(p.featured),
  ctaLabel: p.tier === "free" ? "Start Free" : "Start Free Trial",
}));

export function priceFor(plan: MarketingPlan, interval: BillingInterval): number {
  return interval === "yearly" ? plan.yearly : plan.monthly;
}

export const TRIAL_POINTS: string[] = [
  "14-day free trial of every premium feature",
  "No credit card required",
  "Free migration included",
  "Cancel anytime",
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const PRICING_FAQ: FAQItem[] = [
  {
    question: "What is founding pricing?",
    answer:
      "Sign up during launch and your price is locked in for life. Even as we raise prices later, founding members keep their rate forever — across upgrades, downgrades, and renewals.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The Free plan lets you manage one client and one project with the full client portal — no time limit, no card. Upgrade whenever you outgrow it.",
  },
  {
    question: "Do I need a credit card to start?",
    answer:
      "No. Start a 14-day trial of the full premium workspace without entering any payment details. When it ends, pick a plan or stay on Free.",
  },
  {
    question: "How does annual billing work?",
    answer:
      "Switch to yearly billing and get two months free — you pay for ten months and get twelve. You can change between monthly and yearly anytime.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes, anytime from your billing settings — no need to email support. Upgrades apply immediately; downgrades take effect at the start of your next billing cycle, and your founding price stays locked in through every change.",
  },
  {
    question: "How do I cancel, and what happens to my data?",
    answer:
      "Cancel from your billing settings in one click — no phone call, no retention flow. Your workspace and data aren't deleted; you're moved to the Free plan's limits and everything else is preserved, so upgrading again picks up right where you left off.",
  },
  {
    question: "How am I billed, and can I see invoices?",
    answer:
      "Card payments are processed securely through Lemon Squeezy, our billing partner. You'll get an emailed receipt for every charge, and full invoice history is available from your billing settings at any time.",
  },
  {
    question: "Do you help me migrate from another tool?",
    answer:
      "Yes — free migration assistance is included on every paid plan. Send us an export from your current tool or spreadsheet and we'll get your clients and projects into Sarion before your trial ends. Agency customers also get concierge onboarding with direct founder support.",
  },
  {
    question: "What counts as a team member?",
    answer:
      "Anyone you invite into your agency workspace as staff or a contractor. Your clients use the separate client portal and are never counted toward your plan's team member limit.",
  },
];

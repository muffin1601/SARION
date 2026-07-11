import "server-only";

import { db } from "@/lib/db";
import { logActivity } from "@/server/activity";
import { effectivePlanTier, getPlanLimits } from "@/config/plans";
import { runAutomationsForActivity } from "@/server/services/automation-engine";
import { getClientTimeSummary } from "@/server/data/time";

/**
 * Portal reads are authenticated by the client's unguessable portalToken (not a
 * session). Everything is resolved FROM the token, so a client can only ever
 * see their own agency's data for their own record.
 */

export interface PortalProject {
  id: string;
  name: string;
  status: string;
  dueDate: Date | null;
  comments: {
    id: string;
    author: string;
    message: string;
    createdAt: Date;
  }[];
}

export interface PortalInvoice {
  id: string;
  number: string;
  status: string;
  total: number;
  dueDate: Date | null;
  createdAt: Date;
}

export interface PortalProposal {
  id: string;
  name: string;
  status: string;
  total: number;
  shareToken: string;
}

export interface PortalSubscription {
  id: string;
  name: string;
  amount: number;
  frequency: string;
  nextBillingDate: Date;
  status: string;
}

export interface PortalData {
  client: { id: string; agencyId: string; name: string };
  agency: { name: string; logoUrl: string | null };
  projects: PortalProject[];
  /** This client's invoices (read-only) — newest first. */
  invoices: PortalInvoice[];
  /** Whether to show the "Powered by Sarion" footer (Free plan only). */
  showPoweredBy: boolean;
  proposals: PortalProposal[];
  subscription: PortalSubscription | null;
  upcomingInvoiceTotal: number | null;
  timeSummary: { billableHoursThisMonth: number; totalHoursThisMonth: number };
}

export async function getPortalData(token: string): Promise<PortalData | null> {
  const client = await db.client.findFirst({
    where: { portalToken: token, deletedAt: null },
    select: {
      id: true,
      agencyId: true,
      name: true,
      agency: {
        select: {
          name: true,
          logoUrl: true,
          planTier: true,
          subscriptionStatus: true,
          trialEndsAt: true,
        },
      },
      projects: {
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          status: true,
          dueDate: true,
          portalComments: {
            orderBy: { createdAt: "asc" },
            select: { id: true, author: true, message: true, createdAt: true },
          },
        },
      },
      invoices: {
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          number: true,
          status: true,
          total: true,
          dueDate: true,
          createdAt: true,
        },
      },
    },
  });

  if (!client) return null;

  const { planTier, subscriptionStatus, trialEndsAt, ...agencyDisplay } =
    client.agency;
  const effectiveTier = effectivePlanTier(
    { planTier, subscriptionStatus, trialEndsAt },
    Date.now(),
  );

  const [proposals, subscription, timeSummary] = await Promise.all([
    db.proposal.findMany({
      where: { clientId: client.id, status: { in: ["sent", "viewed", "accepted", "rejected"] } },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, status: true, total: true, shareToken: true },
    }),
    db.subscription.findFirst({
      where: { clientId: client.id, status: "active" },
      orderBy: { nextBillingDate: "asc" },
      select: { id: true, name: true, amount: true, frequency: true, nextBillingDate: true, status: true },
    }),
    getClientTimeSummary(client.agencyId, client.id),
  ]);

  return {
    client: { id: client.id, agencyId: client.agencyId, name: client.name },
    agency: agencyDisplay,
    projects: client.projects.map(({ portalComments, ...p }) => ({
      ...p,
      comments: portalComments,
    })),
    invoices: client.invoices.map(({ total, ...inv }) => ({
      ...inv,
      total: Number(total),
    })),
    showPoweredBy: getPlanLimits(effectiveTier).poweredByBranding,
    proposals: proposals.map((p) => ({ ...p, total: Number(p.total) })),
    subscription: subscription ? { ...subscription, amount: Number(subscription.amount) } : null,
    upcomingInvoiceTotal: subscription ? Number(subscription.amount) : null,
    timeSummary,
  };
}

const PORTAL_VIEW_THROTTLE_MS = 60 * 60 * 1000; // 1 hour

/**
 * Record a "Portal Viewed" activity, throttled to at most once per hour per
 * client so refreshes don't flood the feed (T7 PORTAL_VIEWED).
 */
export async function logPortalView(
  agencyId: string,
  clientId: string,
): Promise<void> {
  const since = new Date(Date.now() - PORTAL_VIEW_THROTTLE_MS);
  const recent = await db.activity.findFirst({
    where: { agencyId, clientId, type: "Portal Viewed", createdAt: { gt: since } },
    select: { id: true },
  });
  if (recent) return;

  const activity = await logActivity({
    agencyId,
    clientId,
    type: "Portal Viewed",
    title: "Portal Viewed",
    description: "Client opened the portal.",
  });

  await runAutomationsForActivity({ agencyId, triggerType: "Portal Viewed", activityId: activity.id, clientId });
}

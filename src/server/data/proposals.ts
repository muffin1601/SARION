import "server-only";

import { db } from "@/lib/db";

/**
 * All reads REQUIRE an agencyId and filter by it — tenant isolation at the
 * data layer, mirroring src/server/data/invoices.ts. Decimal columns are
 * converted to plain numbers at this boundary.
 */

export interface ProposalListItem {
  id: string;
  name: string;
  status: string;
  total: number;
  clientName: string | null;
  validUntil: Date | null;
  sentAt: Date | null;
  createdAt: Date;
}

export async function listProposals(agencyId: string, clientId?: string): Promise<ProposalListItem[]> {
  const proposals = await db.proposal.findMany({
    where: { agencyId, ...(clientId ? { clientId } : {}) },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      status: true,
      total: true,
      validUntil: true,
      sentAt: true,
      createdAt: true,
      client: { select: { name: true } },
    },
  });
  return proposals.map((p) => ({
    id: p.id,
    name: p.name,
    status: p.status,
    total: Number(p.total),
    clientName: p.client?.name ?? null,
    validUntil: p.validUntil,
    sentAt: p.sentAt,
    createdAt: p.createdAt,
  }));
}

export interface ProposalItemDetail {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
}

export interface ProposalDetail {
  id: string;
  agencyId: string;
  name: string;
  status: string;
  clientId: string | null;
  clientName: string | null;
  templateCategory: string | null;
  subtotal: number;
  discountType: string | null;
  discountValue: number | null;
  taxPercent: number | null;
  total: number;
  currency: string;
  validUntil: Date | null;
  terms: string | null;
  notes: string | null;
  shareToken: string;
  sentAt: Date | null;
  viewedAt: Date | null;
  acceptedByName: string | null;
  acceptedAt: Date | null;
  rejectedReason: string | null;
  rejectedAt: Date | null;
  items: ProposalItemDetail[];
  createdAt: Date;
}

function mapProposal(p: {
  id: string;
  agencyId: string;
  name: string;
  status: string;
  clientId: string | null;
  client: { name: string } | null;
  templateCategory: string | null;
  subtotal: unknown;
  discountType: string | null;
  discountValue: unknown;
  taxPercent: unknown;
  total: unknown;
  currency: string;
  validUntil: Date | null;
  terms: string | null;
  notes: string | null;
  shareToken: string;
  sentAt: Date | null;
  viewedAt: Date | null;
  acceptedByName: string | null;
  acceptedAt: Date | null;
  rejectedReason: string | null;
  rejectedAt: Date | null;
  items: { id: string; description: string; qty: number; unitPrice: unknown; lineTotal: unknown }[];
  createdAt: Date;
}): ProposalDetail {
  return {
    id: p.id,
    agencyId: p.agencyId,
    name: p.name,
    status: p.status,
    clientId: p.clientId,
    clientName: p.client?.name ?? null,
    templateCategory: p.templateCategory,
    subtotal: Number(p.subtotal),
    discountType: p.discountType,
    discountValue: p.discountValue !== null ? Number(p.discountValue) : null,
    taxPercent: p.taxPercent !== null ? Number(p.taxPercent) : null,
    total: Number(p.total),
    currency: p.currency,
    validUntil: p.validUntil,
    terms: p.terms,
    notes: p.notes,
    shareToken: p.shareToken,
    sentAt: p.sentAt,
    viewedAt: p.viewedAt,
    acceptedByName: p.acceptedByName,
    acceptedAt: p.acceptedAt,
    rejectedReason: p.rejectedReason,
    rejectedAt: p.rejectedAt,
    items: p.items.map((i) => ({
      id: i.id,
      description: i.description,
      qty: i.qty,
      unitPrice: Number(i.unitPrice),
      lineTotal: Number(i.lineTotal),
    })),
    createdAt: p.createdAt,
  };
}

const PROPOSAL_SELECT = {
  id: true,
  agencyId: true,
  name: true,
  status: true,
  clientId: true,
  client: { select: { name: true } },
  templateCategory: true,
  subtotal: true,
  discountType: true,
  discountValue: true,
  taxPercent: true,
  total: true,
  currency: true,
  validUntil: true,
  terms: true,
  notes: true,
  shareToken: true,
  sentAt: true,
  viewedAt: true,
  acceptedByName: true,
  acceptedAt: true,
  rejectedReason: true,
  rejectedAt: true,
  createdAt: true,
  items: { orderBy: { sortOrder: "asc" as const }, select: { id: true, description: true, qty: true, unitPrice: true, lineTotal: true } },
};

export async function getProposal(agencyId: string, proposalId: string): Promise<ProposalDetail | null> {
  const proposal = await db.proposal.findFirst({
    where: { id: proposalId, agencyId },
    select: PROPOSAL_SELECT,
  });
  return proposal ? mapProposal(proposal) : null;
}

/** Unauthenticated, token-only — mirrors src/server/data/portal.ts's pattern. */
export async function getPublicProposal(shareToken: string): Promise<
  (ProposalDetail & { agencyName: string; agencyLogoUrl: string | null }) | null
> {
  const proposal = await db.proposal.findFirst({
    where: { shareToken },
    select: { ...PROPOSAL_SELECT, agency: { select: { name: true, logoUrl: true } } },
  });
  if (!proposal) return null;
  return { ...mapProposal(proposal), agencyName: proposal.agency.name, agencyLogoUrl: proposal.agency.logoUrl };
}

export interface PublicProposalComment {
  id: string;
  author: string;
  message: string;
  createdAt: Date;
}

export async function listProposalComments(proposalId: string): Promise<PublicProposalComment[]> {
  const rows = await db.proposalActivity.findMany({
    where: { proposalId, type: "commented" },
    orderBy: { createdAt: "asc" },
    select: { id: true, metadata: true, createdAt: true },
  });
  return rows.map((r) => {
    const meta = (r.metadata as Record<string, unknown> | null) ?? {};
    return {
      id: r.id,
      author: typeof meta.author === "string" ? meta.author : "Client",
      message: typeof meta.message === "string" ? meta.message : "",
      createdAt: r.createdAt,
    };
  });
}

export interface ProposalTemplateItem {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
}

export async function listProposalTemplates(agencyId: string): Promise<ProposalTemplateItem[]> {
  return db.proposalTemplate.findMany({
    where: { agencyId },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, category: true, description: true },
  });
}

export interface ProposalTemplateDetail extends ProposalTemplateItem {
  defaultItems: { description: string; qty: number; unitPrice: number }[];
  defaultTerms: string | null;
}

export async function getProposalTemplate(agencyId: string, templateId: string): Promise<ProposalTemplateDetail | null> {
  const template = await db.proposalTemplate.findFirst({
    where: { id: templateId, agencyId },
    select: { id: true, name: true, category: true, description: true, defaultItems: true, defaultTerms: true },
  });
  if (!template) return null;
  return {
    id: template.id,
    name: template.name,
    category: template.category,
    description: template.description,
    defaultItems: (template.defaultItems as { description: string; qty: number; unitPrice: number }[] | null) ?? [],
    defaultTerms: template.defaultTerms,
  };
}

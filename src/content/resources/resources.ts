import type { Resource } from "./types";
import { crmMigrationChecklist } from "./data/crm-migration-checklist";
import { clientOnboardingTemplate } from "./data/client-onboarding-template";
import { proposalTemplate } from "./data/proposal-template";
import { invoiceTemplate } from "./data/invoice-template";
import { meetingNotesTemplate } from "./data/meeting-notes-template";
import { projectKickoffChecklist } from "./data/project-kickoff-checklist";
import { discoveryCallChecklist } from "./data/discovery-call-checklist";
import { clientHandoffChecklist } from "./data/client-handoff-checklist";
import { weeklyAgencyOperationsChecklist } from "./data/weekly-agency-operations-checklist";
import { agencyDashboardTemplate } from "./data/agency-dashboard-template";
import { agencyKpiTracker } from "./data/agency-kpi-tracker";
import { agencySopTemplate } from "./data/agency-sop-template";
import { agencyProcessDocumentationGuide } from "./data/agency-process-documentation-guide";
import { aiPromptLibraryForAgencies } from "./data/ai-prompt-library-for-agencies";
import { claudePromptCollection } from "./data/claude-prompt-collection";

/**
 * Single registry driving /resources and every /resources/[category]/[slug]
 * page. Adding resource #16+ is one new file plus one array entry — no
 * route, hub, sitemap, or cross-linking code needs to change.
 */
export const RESOURCES: Resource[] = [
  crmMigrationChecklist,
  clientOnboardingTemplate,
  proposalTemplate,
  invoiceTemplate,
  meetingNotesTemplate,
  projectKickoffChecklist,
  discoveryCallChecklist,
  clientHandoffChecklist,
  weeklyAgencyOperationsChecklist,
  agencyDashboardTemplate,
  agencyKpiTracker,
  agencySopTemplate,
  agencyProcessDocumentationGuide,
  aiPromptLibraryForAgencies,
  claudePromptCollection,
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}

export function getResourcesByCategory(category: string): Resource[] {
  return RESOURCES.filter((r) => r.category === category);
}

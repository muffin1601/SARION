/** Widget ids for the hideable/collapsible/reorderable dashboard sections. */
export const DASHBOARD_WIDGET_IDS = [
  "priorities",
  "recentActivity",
  "revenueCharts",
  "projectOverview",
  "topClients",
  "recentInvoices",
  "teamActivity",
  "quickActions",
  "notifications",
  "recentAutomationRuns",
  "financeSnapshot",
  "todaysHours",
  "billableHours",
  "teamUtilization",
  "upcomingRenewals",
  "recurringRevenue",
  "proposalPipeline",
] as const;

export type DashboardWidgetId = (typeof DASHBOARD_WIDGET_IDS)[number];

export interface DashboardPrefs {
  hidden: DashboardWidgetId[];
  collapsed: DashboardWidgetId[];
  order: DashboardWidgetId[];
  dismissedNotificationIds: string[];
}

export const DEFAULT_DASHBOARD_PREFS: DashboardPrefs = {
  hidden: [],
  collapsed: [],
  order: [...DASHBOARD_WIDGET_IDS],
  dismissedNotificationIds: [],
};

function isWidgetId(v: unknown): v is DashboardWidgetId {
  return typeof v === "string" && (DASHBOARD_WIDGET_IDS as readonly string[]).includes(v);
}

/** Any widget introduced after a user saved prefs is appended, never dropped. */
function mergeOrder(saved: DashboardWidgetId[]): DashboardWidgetId[] {
  const missing = DASHBOARD_WIDGET_IDS.filter((id) => !saved.includes(id));
  return [...saved, ...missing];
}

/** Parse the stored JSON, falling back to defaults for missing/invalid shapes. */
export function parseDashboardPrefs(raw: unknown): DashboardPrefs {
  if (!raw || typeof raw !== "object") return DEFAULT_DASHBOARD_PREFS;
  const value = raw as Partial<DashboardPrefs>;
  return {
    hidden: Array.isArray(value.hidden) ? value.hidden.filter(isWidgetId) : [],
    collapsed: Array.isArray(value.collapsed) ? value.collapsed.filter(isWidgetId) : [],
    order:
      Array.isArray(value.order) && value.order.length > 0
        ? mergeOrder(value.order.filter(isWidgetId))
        : DEFAULT_DASHBOARD_PREFS.order,
    dismissedNotificationIds: Array.isArray(value.dismissedNotificationIds)
      ? value.dismissedNotificationIds.filter((v) => typeof v === "string")
      : [],
  };
}

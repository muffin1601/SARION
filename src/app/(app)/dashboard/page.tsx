import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarClock,
  DollarSign,
  FileClock,
  FolderKanban,
  ListTodo,
  TrendingUp,
  TriangleAlert,
  UserPlus,
  Users,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { requireAgency } from "@/server/auth-context";
import { db } from "@/lib/db";
import { getCommandCenterData, type SnapshotCard } from "@/server/data/dashboard";
import { ensureWorkspaceSeeded } from "@/server/services/seed-workspace";
import { getClientOptions } from "@/server/data/projects";
import { parseDashboardPrefs, DASHBOARD_WIDGET_IDS, type DashboardWidgetId } from "@/lib/dashboard-prefs";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OnboardingCard } from "@/components/dashboard/onboarding-card";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { HealthScoreCard } from "@/components/dashboard/health-score-card";
import { PriorityList } from "@/components/dashboard/priority-list";
import { NotificationPanel } from "@/components/dashboard/notification-panel";
import { RevenueCharts } from "@/components/dashboard/revenue-charts";
import { ProjectOverviewCard } from "@/components/dashboard/project-overview-card";
import { TopClientsCard } from "@/components/dashboard/top-clients-card";
import { RecentInvoicesCard } from "@/components/dashboard/recent-invoices-card";
import { TeamActivityCard } from "@/components/dashboard/team-activity-card";
import { QuickActionGrid } from "@/components/dashboard/quick-action-grid";
import { RecentAutomationRunsCard } from "@/components/dashboard/recent-automation-runs-card";
import { FinanceWidget } from "@/components/dashboard/finance-widget";
import {
  TodaysHoursWidget,
  BillableHoursWidget,
  TeamUtilizationWidget,
  UpcomingRenewalsWidget,
  RecurringRevenueWidget,
  ProposalPipelineWidget,
} from "@/components/dashboard/ops-widgets";
import { Timeline } from "@/components/timeline/timeline";
import { DashboardCustomizeProvider } from "@/components/dashboard/dashboard-customize-context";
import { DashboardCustomizeToggle } from "@/components/dashboard/dashboard-customize-toggle";
import { DashboardWidget } from "@/components/dashboard/dashboard-widget";

export const metadata: Metadata = { title: "Dashboard · Sarion" };

const SNAPSHOT_ICON: Record<string, LucideIcon> = {
  todayRevenue: DollarSign,
  monthlyRevenue: TrendingUp,
  outstanding: Wallet,
  projectsActive: FolderKanban,
  projectsDelayed: TriangleAlert,
  invoicesDue: FileClock,
  clients: Users,
  newClients: UserPlus,
  teamMembers: UsersRound,
  openTasks: ListTodo,
};

const WIDGET_TITLE: Record<DashboardWidgetId, string> = {
  priorities: "Today's Priorities",
  recentActivity: "Recent Activity",
  revenueCharts: "Revenue Overview",
  projectOverview: "Project Overview",
  topClients: "Top Clients",
  recentInvoices: "Recent Invoices",
  teamActivity: "Team Activity",
  quickActions: "Quick Actions",
  notifications: "Notifications Center",
  recentAutomationRuns: "Recent Automation Runs",
  financeSnapshot: "Finance",
  todaysHours: "Today's Hours",
  billableHours: "Billable Hours",
  teamUtilization: "Team Utilization",
  upcomingRenewals: "Upcoming Renewals",
  recurringRevenue: "Recurring Revenue",
  proposalPipeline: "Proposal Pipeline",
};

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function weekday() {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date());
}

export default async function DashboardPage() {
  const { agencyId, userId, name } = await requireAgency();

  // First visit on a fresh agency seeds a starter workspace (idempotent).
  await ensureWorkspaceSeeded(agencyId);

  const [data, user, clientOptions] = await Promise.all([
    getCommandCenterData(agencyId),
    db.user.findUnique({ where: { id: userId }, select: { dashboardPrefs: true } }),
    getClientOptions(agencyId),
  ]);

  const prefs = parseDashboardPrefs(user?.dashboardPrefs);
  const firstName = name.split(" ")[0] ?? "there";

  const widgetContent: Record<DashboardWidgetId, React.ReactNode> = {
    priorities: (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Today&apos;s Priorities</CardTitle>
        </CardHeader>
        <CardContent>
          <PriorityList signals={data.priorities} />
        </CardContent>
      </Card>
    ),
    recentActivity: (
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Recent Activity</CardTitle>
          <Button asChild variant="link" className="h-auto p-0 text-sm">
            <Link href="/activity">View Full Timeline</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Timeline items={data.recentActivity} hasMore={false} />
        </CardContent>
      </Card>
    ),
    revenueCharts: <RevenueCharts data={data.revenueCharts} />,
    projectOverview: <ProjectOverviewCard overview={data.projectOverview} />,
    topClients: <TopClientsCard clients={data.topClients} />,
    recentInvoices: <RecentInvoicesCard invoices={data.recentInvoices} />,
    teamActivity: <TeamActivityCard team={data.teamActivity} />,
    quickActions: <QuickActionGrid clientOptions={clientOptions} />,
    recentAutomationRuns: <RecentAutomationRunsCard runs={data.recentAutomationRuns} />,
    financeSnapshot: <FinanceWidget snapshot={data.financeSnapshot} />,
    todaysHours: <TodaysHoursWidget hours={data.ops.todaysHours} />,
    billableHours: <BillableHoursWidget hours={data.ops.billableHoursThisWeek} />,
    teamUtilization: <TeamUtilizationWidget percent={data.ops.teamUtilizationPercent} />,
    upcomingRenewals: <UpcomingRenewalsWidget renewals={data.ops.upcomingRenewals} />,
    recurringRevenue: <RecurringRevenueWidget formatted={data.ops.recurringRevenueFormatted} />,
    proposalPipeline: <ProposalPipelineWidget pipeline={data.ops.proposalPipeline} />,
    notifications: (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notifications Center</CardTitle>
        </CardHeader>
        <CardContent>
          <NotificationPanel signals={data.notifications} dismissedIds={prefs.dismissedNotificationIds} />
        </CardContent>
      </Card>
    ),
  };

  const orderedWidgets = prefs.order.filter((id): id is DashboardWidgetId =>
    (DASHBOARD_WIDGET_IDS as readonly string[]).includes(id),
  );

  return (
    <DashboardCustomizeProvider>
      <PageWrapper
        title={`${greeting()}, ${firstName} 👋`}
        description={`Today is ${weekday()}. Here's what's happening in your business today.`}
        action={
          <div className="flex items-center gap-2">
            <DashboardCustomizeToggle />
            <Button asChild variant="brand">
              <Link href="/projects/new">+ New Project</Link>
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <OnboardingCard status={data.onboarding} />

          {/* Snapshot cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {data.snapshot.map((card: SnapshotCard) => (
              <DashboardCard
                key={card.key}
                label={card.label}
                value={card.formatted}
                icon={SNAPSHOT_ICON[card.key] ?? CalendarClock}
                href={card.href}
                trend={card.trend}
              />
            ))}
          </div>

          {/* Health score */}
          <HealthScoreCard health={data.health} />

          {/* Reorderable / hideable widget sections */}
          {orderedWidgets.map((id, index) => (
            <DashboardWidget
              key={id}
              id={id}
              title={WIDGET_TITLE[id]}
              collapsedInitially={prefs.collapsed.includes(id)}
              hiddenInitially={prefs.hidden.includes(id)}
              isFirst={index === 0}
              isLast={index === orderedWidgets.length - 1}
            >
              {widgetContent[id]}
            </DashboardWidget>
          ))}
        </div>
      </PageWrapper>
    </DashboardCustomizeProvider>
  );
}

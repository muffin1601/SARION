import type { Metadata } from "next";

import { requireAgency } from "@/server/auth-context";
import { getProjectOptions } from "@/server/data/projects";
import { getActiveTimerSession, getWeeklyView, getTeamWorkload, getProjectCapacity } from "@/server/data/time";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimerWidget } from "@/components/time/timer-widget";
import { ManualEntryForm } from "@/components/time/manual-entry-form";
import { TimeEntryList } from "@/components/time/time-entry-list";
import { TeamWorkload } from "@/components/time/team-workload";
import { ProjectCapacity } from "@/components/time/project-capacity";

export const metadata: Metadata = { title: "Time Tracking · Sarion" };

export default async function TimePage() {
  const { agencyId, userId, role } = await requireAgency();
  const isOwner = role === "owner";

  const [projects, session, weeklyEntries, workload, capacity] = await Promise.all([
    getProjectOptions(agencyId),
    getActiveTimerSession(agencyId, userId),
    getWeeklyView(agencyId, userId, new Date()),
    isOwner ? getTeamWorkload(agencyId) : Promise.resolve([]),
    isOwner ? getProjectCapacity(agencyId) : Promise.resolve([]),
  ]);

  const totalWeekMinutes = weeklyEntries.reduce((sum, e) => sum + e.durationMinutes, 0);

  return (
    <PageWrapper title="Time Tracking" description="Track billable hours, manage workload, and monitor project capacity.">
      <Tabs defaultValue="timer">
        <TabsList>
          <TabsTrigger value="timer">Timer</TabsTrigger>
          {isOwner && <TabsTrigger value="workload">Team Workload</TabsTrigger>}
          {isOwner && <TabsTrigger value="capacity">Project Capacity</TabsTrigger>}
        </TabsList>

        <TabsContent value="timer" className="space-y-6">
          <TimerWidget session={session} projects={projects} />
          <ManualEntryForm projects={projects} />
          <Card>
            <CardHeader>
              <CardTitle className="text-base">This week · {(totalWeekMinutes / 60).toFixed(2)}h logged</CardTitle>
            </CardHeader>
            <CardContent>
              <TimeEntryList entries={weeklyEntries} />
            </CardContent>
          </Card>
        </TabsContent>

        {isOwner && (
          <TabsContent value="workload">
            <TeamWorkload rows={workload} />
          </TabsContent>
        )}

        {isOwner && (
          <TabsContent value="capacity">
            <Card>
              <CardContent className="p-0">
                <ProjectCapacity rows={capacity} />
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </PageWrapper>
  );
}

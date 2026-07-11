import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PriorityList } from "@/components/dashboard/priority-list";
import type { DashboardSignal } from "@/lib/dashboard-priorities";

export function FinanceAlertsPanel({ alerts }: { alerts: DashboardSignal[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Finance Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <PriorityList
          signals={alerts}
          emptyTitle="No finance alerts"
          emptyDescription="Revenue, margin, and collections look healthy."
        />
      </CardContent>
    </Card>
  );
}

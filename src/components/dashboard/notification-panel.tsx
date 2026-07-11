import { PriorityList } from "@/components/dashboard/priority-list";
import { NotificationDismissButton } from "@/components/dashboard/notification-dismiss-button";
import type { DashboardSignal } from "@/lib/dashboard-priorities";

export function NotificationPanel({
  signals,
  dismissedIds,
}: {
  signals: DashboardSignal[];
  dismissedIds: string[];
}) {
  const visible = signals.filter((s) => !dismissedIds.includes(s.id));

  return (
    <PriorityList
      signals={visible}
      emptyTitle="No notifications"
      emptyDescription="You're all caught up."
      renderTrailing={(signal) => <NotificationDismissButton id={signal.id} />}
    />
  );
}

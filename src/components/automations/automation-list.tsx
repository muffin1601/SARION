import { Zap } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { AutomationCard } from "@/components/automations/automation-card";
import type { AutomationListItem } from "@/server/data/automations";

export function AutomationList({ automations }: { automations: AutomationListItem[] }) {
  if (automations.length === 0) {
    return (
      <EmptyState
        icon={Zap}
        title="No automations yet"
        description="Build your first trigger → condition → action workflow to automate your business."
      />
    );
  }

  return (
    <div className="space-y-3">
      {automations.map((automation) => (
        <AutomationCard key={automation.id} automation={automation} />
      ))}
    </div>
  );
}

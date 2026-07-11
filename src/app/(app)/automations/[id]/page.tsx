import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { requireOwner } from "@/server/auth-context";
import { getAutomation, listAutomationRuns } from "@/server/data/automations";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { actionCatalogEntry } from "@/lib/automation-actions";
import { triggerLabel } from "@/lib/automation-triggers";
import { RunHistoryTable } from "@/components/automations/run-history-table";

export const metadata: Metadata = { title: "Automation · Sarion" };

export default async function AutomationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { agencyId } = await requireOwner();
  const { id } = await params;
  const automation = await getAutomation(agencyId, id);
  if (!automation) notFound();

  const runs = await listAutomationRuns(agencyId, id);

  return (
    <PageWrapper
      title={automation.name}
      description={automation.description ?? "Automation details and run history."}
      action={
        <div className="flex items-center gap-2">
          <Badge variant={automation.enabled ? "success" : "secondary"}>
            {automation.enabled ? "Enabled" : "Disabled"}
          </Badge>
          <Button asChild variant="outline" size="sm">
            <Link href={`/automations/${id}/edit`}>Edit</Link>
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Workflow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="info">Trigger</Badge>
              <span className="text-sm">{triggerLabel(automation.triggerType)}</span>
            </div>
            {automation.conditions.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="warning">Conditions</Badge>
                <span className="text-sm text-muted-foreground">
                  {automation.conditions.length} condition{automation.conditions.length === 1 ? "" : "s"} must match
                </span>
              </div>
            ) : null}
            <div className="flex flex-wrap items-start gap-2">
              <Badge variant="success" className="mt-0.5">
                Actions
              </Badge>
              <ol className="space-y-1 text-sm text-muted-foreground">
                {automation.actions.map((action, i) => (
                  <li key={i}>
                    {i + 1}. {actionCatalogEntry(action.type)?.label ?? action.type}
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Run History</CardTitle>
          </CardHeader>
          <CardContent>
            <RunHistoryTable runs={runs} />
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}

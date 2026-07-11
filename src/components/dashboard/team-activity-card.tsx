import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ACTIVITY_ICON, DEFAULT_ACTIVITY_ICON } from "@/lib/activity-style";
import type { TeamActivity } from "@/server/data/dashboard";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "");
}

export function TeamActivityCard({ team }: { team: TeamActivity }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Team Activity</CardTitle>
        <Button asChild variant="link" className="h-auto p-0 text-sm">
          <Link href="/team">View team</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Roster</p>
          <ul className="flex flex-wrap gap-2">
            {team.roster.map((member) => (
              <li
                key={member.id}
                className="flex items-center gap-2 rounded-full border py-1 pl-1 pr-3"
              >
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[10px]">{initials(member.name)}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium">{member.name}</span>
                {member.role === "owner" ? (
                  <Badge variant="secondary" className="text-[10px]">
                    Owner
                  </Badge>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Recently Completed
          </p>
          {team.recentlyCompleted.length === 0 ? (
            <EmptyState title="Nothing completed yet" description="Completed work will show up here." />
          ) : (
            <ul className="space-y-2">
              {team.recentlyCompleted.map((entry) => {
                const Icon = ACTIVITY_ICON[entry.type] ?? DEFAULT_ACTIVITY_ICON;
                return (
                  <li key={entry.id} className="flex items-start gap-2 text-sm">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="truncate">{entry.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNowStrict(new Date(entry.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

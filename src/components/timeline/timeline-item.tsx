import { formatDistanceToNowStrict } from "date-fns";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ACTIVITY_ICON, ACTIVITY_VARIANT, DEFAULT_ACTIVITY_ICON } from "@/lib/activity-style";
import type { TimelineEntry } from "@/components/timeline/types";

function formatExact(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "");
}

export function TimelineItem({
  entry,
  isLast,
}: {
  entry: TimelineEntry;
  isLast: boolean;
}) {
  const Icon = ACTIVITY_ICON[entry.type] ?? DEFAULT_ACTIVITY_ICON;
  const variant = ACTIVITY_VARIANT[entry.type] ?? "secondary";
  const createdAt = new Date(entry.createdAt);

  return (
    <li className="relative flex gap-4 pb-8">
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-[15px] top-9 h-[calc(100%-2rem)] w-px bg-border"
        />
      )}
      <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </span>

      <div className="flex-1 space-y-1.5 pt-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium leading-none">{entry.title}</p>
          <Badge variant={variant} className="shrink-0">
            {entry.type}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{entry.description}</p>
        <div className="flex items-center gap-2 pt-0.5">
          {entry.actor ? (
            <Avatar className="h-5 w-5">
              <AvatarImage src={entry.actor.image ?? undefined} alt={entry.actor.name} />
              <AvatarFallback className="text-[10px]">
                {initials(entry.actor.name)}
              </AvatarFallback>
            </Avatar>
          ) : null}
          <span
            className={cn("text-xs text-muted-foreground", entry.actor && "font-medium")}
          >
            {entry.actor?.name}
          </span>
          <span
            className="text-xs text-muted-foreground"
            title={formatExact(createdAt)}
          >
            {entry.actor ? "· " : ""}
            {formatDistanceToNowStrict(createdAt, { addSuffix: true })}
          </span>
        </div>
      </div>
    </li>
  );
}

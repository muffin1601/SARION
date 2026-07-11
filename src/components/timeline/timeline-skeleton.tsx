import { Skeleton } from "@/components/ui/skeleton";

export function TimelineSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <ul className="space-y-8">
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} className="flex gap-4">
          <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2 pt-0.5">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3.5 w-2/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </li>
      ))}
    </ul>
  );
}

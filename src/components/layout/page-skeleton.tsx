import { Skeleton } from "@/components/ui/skeleton";

/** Header skeleton matching PageWrapper's title/description/action row. */
export function PageHeaderSkeleton({ withAction = true }: { withAction?: boolean }) {
  return (
    <div className="flex flex-col gap-1 border-b px-4 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <div className="space-y-2">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>
      {withAction && <Skeleton className="mt-3 h-9 w-32 sm:mt-0" />}
    </div>
  );
}

/** A row of stat/metric cards, as used across Dashboard, Finance, Reports. */
export function StatCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-2 rounded-lg border p-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-7 w-16" />
        </div>
      ))}
    </div>
  );
}

/** A generic table skeleton — header row + N body rows. */
export function TableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="flex gap-4 border-b bg-muted/40 px-4 py-3">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 border-b px-4 py-4 last:border-b-0">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Full-page skeleton: header + optional stat cards + a table. Fits most list pages. */
export function PageSkeleton({
  statCards = 0,
  tableRows = 6,
  tableCols = 5,
}: {
  statCards?: number;
  tableRows?: number;
  tableCols?: number;
}) {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <PageHeaderSkeleton />
      <div className="flex-1 space-y-6 p-4 lg:p-8">
        {statCards > 0 && <StatCardsSkeleton count={statCards} />}
        <TableSkeleton rows={tableRows} cols={tableCols} />
      </div>
    </div>
  );
}

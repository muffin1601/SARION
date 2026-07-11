import { PageSkeleton } from "@/components/layout/page-skeleton";

export default function RecurringLoading() {
  return <PageSkeleton statCards={3} tableRows={6} tableCols={5} />;
}

import { PageSkeleton } from "@/components/layout/page-skeleton";

export default function ReportsLoading() {
  return <PageSkeleton statCards={4} tableRows={5} tableCols={5} />;
}

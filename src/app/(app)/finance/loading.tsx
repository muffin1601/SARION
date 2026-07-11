import { PageSkeleton } from "@/components/layout/page-skeleton";

export default function FinanceLoading() {
  return <PageSkeleton statCards={4} tableRows={6} tableCols={6} />;
}

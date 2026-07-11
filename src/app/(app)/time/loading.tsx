import { PageSkeleton } from "@/components/layout/page-skeleton";

export default function TimeLoading() {
  return <PageSkeleton statCards={3} tableRows={8} tableCols={5} />;
}

import { PageSkeleton } from "@/components/layout/page-skeleton";

export default function ProjectsLoading() {
  return <PageSkeleton statCards={4} tableRows={8} tableCols={5} />;
}

import { PageSkeleton } from "@/components/layout/page-skeleton";

export default function ClientsLoading() {
  return <PageSkeleton tableRows={8} tableCols={5} />;
}

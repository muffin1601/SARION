import { PageSkeleton } from "@/components/layout/page-skeleton";

export default function ProposalsLoading() {
  return <PageSkeleton tableRows={6} tableCols={5} />;
}

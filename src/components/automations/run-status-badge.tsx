import { Badge } from "@/components/ui/badge";

export function RunStatusBadge({ status }: { status: string }) {
  if (status === "success") return <Badge variant="success">Success</Badge>;
  if (status === "failed") return <Badge variant="destructive">Failed</Badge>;
  return <Badge variant="secondary">{status}</Badge>;
}

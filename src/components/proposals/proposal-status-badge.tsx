import { Badge } from "@/components/ui/badge";

const VARIANT: Record<string, "secondary" | "info" | "success" | "destructive" | "warning" | "outline"> = {
  draft: "secondary",
  sent: "info",
  viewed: "info",
  accepted: "success",
  rejected: "destructive",
  expired: "warning",
  cancelled: "outline",
};

const LABEL: Record<string, string> = {
  draft: "Draft",
  sent: "Sent",
  viewed: "Viewed",
  accepted: "Accepted",
  rejected: "Rejected",
  expired: "Expired",
  cancelled: "Cancelled",
};

export function ProposalStatusBadge({ status }: { status: string }) {
  return <Badge variant={VARIANT[status] ?? "secondary"}>{LABEL[status] ?? status}</Badge>;
}

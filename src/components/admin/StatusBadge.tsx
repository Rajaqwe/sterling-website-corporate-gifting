import { Badge } from "@/components/ui/badge";

export type StatusType = "NEW" | "REVIEWING" | "CONTACTED" | "PROPOSAL_SENT" | "NEGOTIATION" | "APPROVED" | "REJECTED" | "COMPLETED" | "CANCELLED" | "PENDING" | "CONFIRMED" | "PROCESSING" | "BRANDING" | "PACKED" | "SHIPPED" | "DELIVERED" | "REFUNDED";

export function getStatusStyles(status: string): string {
  const normalized = status.toUpperCase() as StatusType;

  switch (normalized) {
    case "NEW":
    case "PENDING":
    case "REVIEWING":
    case "PROCESSING":
      return "bg-[hsl(var(--status-pending-bg))] text-[hsl(var(--status-pending))] border-[hsl(var(--status-pending))] hover:bg-[hsl(var(--status-pending-bg))]";

    case "CONTACTED":
    case "PROPOSAL_SENT":
    case "NEGOTIATION":
    case "CONFIRMED":
    case "BRANDING":
    case "PACKED":
    case "SHIPPED":
      return "bg-[hsl(var(--status-info-bg))] text-[hsl(var(--status-info))] border-[hsl(var(--status-info))] hover:bg-[hsl(var(--status-info-bg))]";

    case "APPROVED":
    case "COMPLETED":
    case "DELIVERED":
      return "bg-[hsl(var(--status-success-bg))] text-[hsl(var(--status-success))] border-[hsl(var(--status-success))] hover:bg-[hsl(var(--status-success-bg))]";

    case "REJECTED":
    case "CANCELLED":
    case "REFUNDED":
      return "bg-[hsl(var(--status-danger-bg))] text-[hsl(var(--status-danger))] border-[hsl(var(--status-danger))] hover:bg-[hsl(var(--status-danger-bg))]";

    default:
      return "bg-secondary text-secondary-foreground border-border";
  }
}

export function StatusBadge({ status }: { status: string }) {
  const customClass = getStatusStyles(status);

  return (
    <Badge variant="outline" className={customClass}>
      {status.replace(/_/g, " ")}
    </Badge>
  );
}

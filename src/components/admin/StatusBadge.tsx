import { Badge } from "@/components/ui/badge";

type StatusType = "NEW" | "REVIEWING" | "CONTACTED" | "PROPOSAL_SENT" | "NEGOTIATION" | "APPROVED" | "REJECTED" | "COMPLETED" | "CANCELLED" | "PENDING" | "CONFIRMED" | "PROCESSING" | "BRANDING" | "PACKED" | "SHIPPED" | "DELIVERED" | "REFUNDED";

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toUpperCase() as StatusType;
  
  let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";
  let customClass = "";

  switch (normalized) {
    // Amber / Pending States
    case "NEW":
    case "PENDING":
    case "REVIEWING":
    case "PROCESSING":
      customClass = "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200";
      variant = "outline";
      break;
    
    // Blue / In Progress States
    case "CONTACTED":
    case "PROPOSAL_SENT":
    case "NEGOTIATION":
    case "CONFIRMED":
    case "BRANDING":
    case "PACKED":
    case "SHIPPED":
      customClass = "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200";
      variant = "outline";
      break;
      
    // Green / Success States
    case "APPROVED":
    case "COMPLETED":
    case "DELIVERED":
      customClass = "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200";
      variant = "outline";
      break;
      
    // Red / Failed States
    case "REJECTED":
    case "CANCELLED":
    case "REFUNDED":
      variant = "destructive";
      break;
      
    default:
      variant = "secondary";
  }

  return (
    <Badge variant={variant} className={customClass}>
      {status.replace(/_/g, " ")}
    </Badge>
  );
}

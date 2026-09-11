'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { QuoteStatus } from "@/generated/prisma";
import { ALLOWED_QUOTE_TRANSITIONS } from "@/lib/quotes/constants";
import { updateQuoteStatus } from "@/app/actions/quotes";
import { 
 CheckCircle, XCircle, Send, PhoneCall, MessageSquare, FileCheck, Ban, ArrowRight
} from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
 NEW: "New",
 REVIEWING: "Under Review",
 CONTACTED: "Client Contacted",
 PROPOSAL_SENT: "Proposal Sent",
 NEGOTIATION: "In Negotiation",
 APPROVED: "Approved",
 COMPLETED: "Completed",
 REJECTED: "Rejected",
 CANCELLED: "Cancelled",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
 REVIEWING: <MessageSquare className="h-4 w-4" />,
 CONTACTED: <PhoneCall className="h-4 w-4" />,
 PROPOSAL_SENT: <Send className="h-4 w-4" />,
 NEGOTIATION: <ArrowRight className="h-4 w-4" />,
 APPROVED: <CheckCircle className="h-4 w-4" />,
 COMPLETED: <FileCheck className="h-4 w-4" />,
 REJECTED: <XCircle className="h-4 w-4" />,
 CANCELLED: <Ban className="h-4 w-4" />,
};

const STATUS_VARIANTS: Record<string, "default" | "outline" | "destructive" | "secondary"> = {
 REVIEWING: "default",
 CONTACTED: "default",
 PROPOSAL_SENT: "default",
 NEGOTIATION: "default",
 APPROVED: "default",
 COMPLETED: "default",
 REJECTED: "destructive",
 CANCELLED: "destructive",
};

export function QuoteStateActions({ quoteId, currentStatus }: { quoteId: string; currentStatus: QuoteStatus }) {
 const allowedTransitions = ALLOWED_QUOTE_TRANSITIONS[currentStatus] || [];
 const [selectedStatus, setSelectedStatus] = useState<QuoteStatus | "">("");
 const [notes, setNotes] = useState("");
 const [isLoading, setIsLoading] = useState(false);

 if (allowedTransitions.length === 0) {
 return (
 <div className="text-sm text-muted-foreground italic">
 No further transitions available for this quote.
 </div>
 );
 }

 const handleUpdate = async () => {
 if (!selectedStatus) return;
 setIsLoading(true);
 const res = await updateQuoteStatus(quoteId, selectedStatus as QuoteStatus, notes);
 if (!res.success) {
 toast.error(res.error || "Failed to update quote status.");
 } else {
 toast.success(`Quote moved to: ${STATUS_LABELS[selectedStatus] || selectedStatus}`);
 setSelectedStatus("");
 setNotes("");
 }
 setIsLoading(false);
 };

 return (
 <div className="space-y-4">
 <div>
 <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Current Status</p>
 <div className="text-sm font-semibold text-foreground">
 {STATUS_LABELS[currentStatus] || currentStatus}
 </div>
 </div>

 <div className="border-t pt-4">
 <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Move To</p>
 <div className="space-y-3">
 {allowedTransitions.map(status => (
 <button
 key={status}
 onClick={() => setSelectedStatus(status === selectedStatus ? "" : status)}
 className={`w-full flex items-center gap-3 p-3 rounded-md border text-sm font-medium transition-colors text-left ${
 selectedStatus === status
 ? status === 'REJECTED' || status === 'CANCELLED'
 ? 'bg-red-50 border-red-300 text-red-700'
 : 'bg-blue-50 border-blue-300 text-blue-700'
 : 'hover:bg-secondary/20 border-border text-muted-foreground'
 }`}
 >
 {STATUS_ICONS[status]}
 {STATUS_LABELS[status] || status}
 </button>
 ))}
 </div>
 </div>

 {selectedStatus && (
 <div className="border-t pt-4 space-y-3">
 <Input
 placeholder="Optional notes for this transition..."
 value={notes}
 onChange={e => setNotes(e.target.value)}
 className="text-sm"
 />
 <Button
 onClick={handleUpdate}
 disabled={isLoading}
 variant={selectedStatus === 'REJECTED' || selectedStatus === 'CANCELLED' ? 'destructive' : 'default'}
 className="w-full"
 >
 {isLoading ? "Updating..." : `Confirm: ${STATUS_LABELS[selectedStatus] || selectedStatus}`}
 </Button>
 </div>
 )}
 </div>
 );
}

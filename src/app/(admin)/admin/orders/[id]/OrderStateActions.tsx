'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateOrderStatus } from "../actions";
import { toast } from "sonner";
import { OrderStatus } from "@prisma/client";
import { ALLOWED_TRANSITIONS } from "@/lib/orders/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function OrderStateActions({ orderId, currentStatus }: { orderId: string, currentStatus: OrderStatus }) {
 const allowedTransitions = ALLOWED_TRANSITIONS[currentStatus] || [];
 const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "">("");
 const [notes, setNotes] = useState("");
 const [isLoading, setIsLoading] = useState(false);

 if (allowedTransitions.length === 0) {
 return <div className="text-sm text-muted-foreground">No further status transitions allowed.</div>;
 }

 const handleUpdate = async () => {
 if (!selectedStatus) return;
 setIsLoading(true);
 const res = await updateOrderStatus(orderId, selectedStatus as OrderStatus, notes);
 if (res?.error) {
 toast.error(res.error);
 } else {
 toast.success("Order status updated.");
 setSelectedStatus("");
 setNotes("");
 }
 setIsLoading(false);
 };

 return (
 <div className="space-y-4">
 <div className="flex flex-col sm:flex-row gap-4">
 <Select value={selectedStatus} onValueChange={(v) => setSelectedStatus(v as OrderStatus)}>
 <SelectTrigger className="w-[200px]">
 <SelectValue placeholder="Select new status..." />
 </SelectTrigger>
 <SelectContent>
 {allowedTransitions.map(status => (
 <SelectItem key={status} value={status}>{status}</SelectItem>
 ))}
 </SelectContent>
 </Select>
 <Input 
 placeholder="Optional transition notes..." 
 value={notes} 
 onChange={e => setNotes(e.target.value)} 
 className="flex-1"
 />
 <Button onClick={handleUpdate} disabled={isLoading || !selectedStatus}>
 Update Status
 </Button>
 </div>
 </div>
 );
}

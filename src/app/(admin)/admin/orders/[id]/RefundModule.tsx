'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { processRefund } from "../actions";
import { toast } from "sonner";
import { OrderStatus } from "@prisma/client";

export function RefundModule({ orderId, status }: { orderId: string, status: OrderStatus }) {
 const [amount, setAmount] = useState("");
 const [notes, setNotes] = useState("");
 const [loading, setLoading] = useState(false);

 const handleRefund = async () => {
 if (!amount) return;
 setLoading(true);
 const res = await processRefund(orderId, parseFloat(amount), notes);
 if (res?.error) {
 toast.error(res.error);
 } else {
 toast.success("Refund processed and logged.");
 setAmount("");
 setNotes("");
 }
 setLoading(false);
 };

 // Only show refund UI if it makes sense (not for pending orders usually, but we'll leave it up to the admin)
 if (status === 'PENDING') return null;

 return (
 <Card>
 <CardHeader>
 <CardTitle className="text-red-600">Issue Refund</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Refund Amount (₹)</Label>
 <Input type="number" step="0.01" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Reason / Notes</Label>
 <Input placeholder="Reason for refund" value={notes} onChange={e => setNotes(e.target.value)} />
 </div>
 </div>
 <Button variant="destructive" onClick={handleRefund} disabled={loading || !amount}>Process Refund</Button>
 </CardContent>
 </Card>
 );
}

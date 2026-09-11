'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { adjustInventory } from "./actions";
import { Pencil, Plus, Minus } from "lucide-react";

export function InventoryAdjustButton({
 variantId,
 currentStock,
 variantName
}: {
 variantId: string;
 currentStock: number;
 variantName: string;
}) {
 const [open, setOpen] = useState(false);
 const [delta, setDelta] = useState(0);
 const [reason, setReason] = useState('');
 const [loading, setLoading] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (delta === 0) {
 toast.error("Delta cannot be zero.");
 return;
 }
 setLoading(true);
 const res = await adjustInventory(variantId, delta, reason);
 if (res.error) {
 toast.error(res.error);
 } else {
 toast.success(`Stock updated. New stock: ${res.newStock}`);
 setOpen(false);
 setDelta(0);
 setReason('');
 }
 setLoading(false);
 };

 return (
 <>
 <Button variant="ghost" size="sm" onClick={() => setOpen(true)} className="gap-1">
 <Pencil className="h-3.5 w-3.5" /> Adjust
 </Button>
 <Dialog open={open} onOpenChange={setOpen}>
 <DialogContent>
 <DialogHeader>
 <DialogTitle>Adjust Inventory</DialogTitle>
 </DialogHeader>
 <form onSubmit={handleSubmit} className="space-y-4 py-2">
 <div className="text-sm text-muted-foreground bg-secondary/20 rounded-md p-3">
 <div className="font-medium">{variantName}</div>
 <div className="mt-1">Current stock: <span className="font-bold">{currentStock}</span></div>
 </div>
 <div className="space-y-2">
 <Label>Adjustment Amount</Label>
 <div className="flex items-center gap-3">
 <Button type="button" variant="outline" size="sm" onClick={() => setDelta(d => d - 1)}>
 <Minus className="h-4 w-4" />
 </Button>
 <Input
 type="number"
 value={delta}
 onChange={e => setDelta(Number(e.target.value))}
 className="text-center font-bold w-24"
 />
 <Button type="button" variant="outline" size="sm" onClick={() => setDelta(d => d + 1)}>
 <Plus className="h-4 w-4" />
 </Button>
 </div>
 {delta !== 0 && (
 <div className="text-xs text-muted-foreground">
 New stock will be: <span className="font-bold">{currentStock + delta}</span>
 {delta > 0 ? <span className="text-green-600"> (+{delta})</span> : <span className="text-red-600"> ({delta})</span>}
 </div>
 )}
 </div>
 <div className="space-y-2">
 <Label htmlFor="inv-reason">Reason *</Label>
 <Textarea
 id="inv-reason"
 value={reason}
 onChange={e => setReason(e.target.value)}
 placeholder="e.g., Shipment received, Damaged goods removed, Stock count correction..."
 required
 rows={3}
 />
 </div>
 <DialogFooter>
 <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
 <Button type="submit" disabled={loading || delta === 0 || !reason.trim()}>
 {loading ? "Saving..." : "Apply Adjustment"}
 </Button>
 </DialogFooter>
 </form>
 </DialogContent>
 </Dialog>
 </>
 );
}

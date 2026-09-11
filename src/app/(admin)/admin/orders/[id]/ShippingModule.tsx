'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateShippingDetails } from "../actions";
import { toast } from "sonner";

export function ShippingModule({ orderId, initialCourier, initialTracking }: { orderId: string, initialCourier: string | null, initialTracking: string | null }) {
 const [courier, setCourier] = useState(initialCourier || "");
 const [tracking, setTracking] = useState(initialTracking || "");
 const [loading, setLoading] = useState(false);

 const handleSave = async () => {
 setLoading(true);
 const res = await updateShippingDetails(orderId, courier || null, tracking || null);
 if (res?.error) {
 toast.error(res.error);
 } else {
 toast.success("Shipping details updated.");
 }
 setLoading(false);
 };

 return (
 <Card>
 <CardHeader>
 <CardTitle>Shipping & Tracking</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label>Courier</Label>
 <Input placeholder="e.g. FedEx" value={courier} onChange={e => setCourier(e.target.value)} />
 </div>
 <div className="space-y-2">
 <Label>Tracking Number</Label>
 <Input placeholder="Tracking ID" value={tracking} onChange={e => setTracking(e.target.value)} />
 </div>
 </div>
 <Button onClick={handleSave} disabled={loading}>Save Shipping Details</Button>
 </CardContent>
 </Card>
 );
}

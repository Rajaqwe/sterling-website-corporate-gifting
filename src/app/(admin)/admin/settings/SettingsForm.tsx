'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { saveStoreSettings } from "./actions";

export type SettingsData = {
 defaultTaxRate: string;
 flatShippingRate: string;
 contactEmail: string;
 contactPhone: string;
};

export function SettingsForm({ initialData }: { initialData: SettingsData }) {
 const [data, setData] = useState<SettingsData>(initialData);
 const [isLoading, setIsLoading] = useState(false);

 const handleSave = async () => {
 setIsLoading(true);
 const res = await saveStoreSettings({
 defaultTaxRate: parseFloat(data.defaultTaxRate) || 0,
 flatShippingRate: parseFloat(data.flatShippingRate) || 0,
 contactEmail: data.contactEmail || null,
 contactPhone: data.contactPhone || null
 });
 
 if (res.error) {
 toast.error(res.error);
 } else {
 toast.success("Settings saved successfully");
 }
 setIsLoading(false);
 };

 return (
 <div className="grid gap-6 md:grid-cols-2">
 <Card>
 <CardHeader>
 <CardTitle>Company Information</CardTitle>
 <CardDescription>Update the primary contact information displayed on invoices and quotes.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Support Email</Label>
 <Input 
 value={data.contactEmail} 
 onChange={e => setData(d => ({ ...d, contactEmail: e.target.value }))} 
 placeholder="support@sterlinggifting.com"
 />
 </div>
 <div className="space-y-2">
 <Label>Phone Number</Label>
 <Input 
 value={data.contactPhone} 
 onChange={e => setData(d => ({ ...d, contactPhone: e.target.value }))} 
 placeholder="+1 (800) 555-0199"
 />
 </div>
 <Button onClick={handleSave} disabled={isLoading}>Save Changes</Button>
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle>Order Settings</CardTitle>
 <CardDescription>Configure default taxes and shipping costs.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="space-y-2">
 <Label>Default Tax Rate (%)</Label>
 <Input 
 value={data.defaultTaxRate} 
 onChange={e => setData(d => ({ ...d, defaultTaxRate: e.target.value }))} 
 type="number" step="0.01"
 />
 </div>
 <div className="space-y-2">
 <Label>Standard Flat Shipping (₹)</Label>
 <Input 
 value={data.flatShippingRate} 
 onChange={e => setData(d => ({ ...d, flatShippingRate: e.target.value }))} 
 type="number" step="0.01"
 />
 </div>
 <Button onClick={handleSave} disabled={isLoading}>Update Order Config</Button>
 </CardContent>
 </Card>
 </div>
 );
}

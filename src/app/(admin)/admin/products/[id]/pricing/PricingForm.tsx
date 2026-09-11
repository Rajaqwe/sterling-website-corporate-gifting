'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash, Plus, Save } from "lucide-react";
import { saveBulkPricing } from "../../actions";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

export type PricingTierData = {
 id?: string;
 minQuantity: number;
 maxQuantity: number | null;
 price: string;
};

export function PricingForm({ productId, initialTiers }: { productId: string, initialTiers: PricingTierData[] }) {
 const [tiers, setTiers] = useState<PricingTierData[]>(initialTiers || []);
 const [isLoading, setIsLoading] = useState(false);

 const addTier = () => {
 setTiers([...tiers, {
 minQuantity: tiers.length > 0 ? (tiers[tiers.length - 1].maxQuantity || 0) + 1 : 1,
 maxQuantity: null,
 price: ""
 }]);
 };

 const removeTier = (index: number) => {
 setTiers(tiers.filter((_, i) => i !== index));
 };

 const updateTier = (index: number, field: keyof PricingTierData, value: any) => {
 const newTiers = [...tiers];
 newTiers[index] = { ...newTiers[index], [field]: value };
 setTiers(newTiers);
 };

 const handleSave = async () => {
 // Validate overlapping ranges
 for (let i = 0; i < tiers.length - 1; i++) {
 if (tiers[i].maxQuantity && tiers[i + 1].minQuantity <= tiers[i].maxQuantity!) {
 toast.error(`Overlapping range at Tier ${i + 1} and ${i + 2}`);
 return;
 }
 }

 setIsLoading(true);
 try {
 const res = await saveBulkPricing(productId, tiers);
 if (res?.error) {
 toast.error(res.error);
 } else {
 toast.success("Bulk pricing saved successfully.");
 }
 } catch (e) {
 toast.error("An unexpected error occurred.");
 } finally {
 setIsLoading(false);
 }
 };

 return (
 <div className="space-y-6">
 <div className="flex justify-between items-center">
 <div>
 <h2 className="text-xl font-semibold">Bulk Pricing Tiers</h2>
 <p className="text-sm text-muted-foreground">Define quantity-based discounts (e.g. Buy 10-49 for ₹500 each).</p>
 </div>
 <Button onClick={addTier} variant="outline" className="gap-2">
 <Plus className="w-4 h-4" /> Add Tier
 </Button>
 </div>

 {tiers.length === 0 ? (
 <div className="text-center py-10 border border-dashed rounded-lg text-muted-foreground">
 No bulk pricing tiers defined. Base product price will be used.
 </div>
 ) : (
 <div className="space-y-4">
 {tiers.map((tier, i) => (
 <Card key={tier.id || i} className="p-4 flex gap-4 items-center">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
 <div className="space-y-1">
 <Label>Min Quantity</Label>
 <Input 
 type="number" 
 value={tier.minQuantity || ''} 
 onChange={e => updateTier(i, 'minQuantity', parseInt(e.target.value) || 0)} 
 min="1"
 />
 </div>
 <div className="space-y-1">
 <Label>Max Quantity</Label>
 <Input 
 type="number" 
 value={tier.maxQuantity === null ? '' : tier.maxQuantity} 
 onChange={e => updateTier(i, 'maxQuantity', e.target.value === '' ? null : parseInt(e.target.value))} 
 placeholder="Leave empty for infinity"
 />
 </div>
 <div className="space-y-1">
 <Label>Price Per Unit</Label>
 <Input 
 type="number" 
 step="0.01" 
 value={tier.price || ''} 
 onChange={e => updateTier(i, 'price', e.target.value)} 
 placeholder="e.g. 599.00"
 />
 </div>
 </div>
 <Button variant="ghost" size="icon" className="text-red-500 shrink-0 mt-6" onClick={() => removeTier(i)}>
 <Trash className="w-4 h-4" />
 </Button>
 </Card>
 ))}
 </div>
 )}

 <div className="flex justify-end pt-4 border-t">
 <Button onClick={handleSave} disabled={isLoading} className="gap-2">
 <Save className="w-4 h-4" /> Save Pricing
 </Button>
 </div>
 </div>
 );
}

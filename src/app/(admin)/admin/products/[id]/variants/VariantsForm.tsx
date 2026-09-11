'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash, Plus, GripVertical, Save } from "lucide-react";
import { saveVariants } from "../../actions";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

export type VariantData = {
 id?: string;
 name: string;
 sku: string | null;
 price: string | null;
 stockQuantity: number | null;
 weight: string | null;
 dimensions: string | null;
 isActive: boolean;
};

export function VariantsForm({ productId, initialVariants }: { productId: string, initialVariants: VariantData[] }) {
 const [variants, setVariants] = useState<VariantData[]>(initialVariants);
 const [isLoading, setIsLoading] = useState(false);

 const addVariant = () => {
 setVariants([...variants, {
 name: "",
 sku: "",
 price: null,
 stockQuantity: null,
 weight: null,
 dimensions: null,
 isActive: true
 }]);
 };

 const removeVariant = (index: number) => {
 setVariants(variants.filter((_, i) => i !== index));
 };

 const updateVariant = (index: number, field: keyof VariantData, value: any) => {
 const newVariants = [...variants];
 newVariants[index] = { ...newVariants[index], [field]: value };
 setVariants(newVariants);
 };

 const handleSave = async () => {
 setIsLoading(true);
 try {
 const res = await saveVariants(productId, variants);
 if (res?.error) {
 toast.error(res.error);
 } else {
 toast.success("Variants saved successfully.");
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
 <h2 className="text-xl font-semibold">Product Variants</h2>
 <p className="text-sm text-muted-foreground">Manage distinct variations like size or color.</p>
 </div>
 <Button onClick={addVariant} variant="outline" className="gap-2">
 <Plus className="w-4 h-4" /> Add Variant
 </Button>
 </div>

 {variants.length === 0 ? (
 <div className="text-center py-10 border border-dashed rounded-lg text-muted-foreground">
 No variants added yet.
 </div>
 ) : (
 <div className="space-y-4">
 {variants.map((variant, i) => (
 <Card key={variant.id || i} className="p-4 flex gap-4 items-start relative">
 <div className="mt-2 cursor-grab text-muted-foreground">
 <GripVertical className="w-5 h-5" />
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
 <div className="space-y-1">
 <Label>Name *</Label>
 <Input value={variant.name} onChange={e => updateVariant(i, 'name', e.target.value)} placeholder="e.g. Large / Red" />
 </div>
 <div className="space-y-1">
 <Label>SKU</Label>
 <Input value={variant.sku || ''} onChange={e => updateVariant(i, 'sku', e.target.value || null)} placeholder="Optional" />
 </div>
 <div className="space-y-1">
 <Label>Price Add-on/Override</Label>
 <Input type="number" step="0.01" value={variant.price || ''} onChange={e => updateVariant(i, 'price', e.target.value || null)} placeholder="Optional" />
 </div>
 <div className="space-y-1">
 <Label>Stock</Label>
 <Input type="number" value={variant.stockQuantity === null ? '' : variant.stockQuantity} onChange={e => updateVariant(i, 'stockQuantity', e.target.value === '' ? null : parseInt(e.target.value))} placeholder="Optional" />
 </div>
 <div className="flex items-center gap-2 lg:col-span-4 mt-2">
 <Checkbox 
 id={`active-${i}`}
 checked={variant.isActive} 
 onCheckedChange={c => updateVariant(i, 'isActive', !!c)} 
 />
 <Label htmlFor={`active-${i}`}>Active</Label>
 </div>
 </div>
 <Button variant="ghost" size="icon" className="text-red-500 shrink-0" onClick={() => removeVariant(i)}>
 <Trash className="w-4 h-4" />
 </Button>
 </Card>
 ))}
 </div>
 )}

 <div className="flex justify-end pt-4 border-t">
 <Button onClick={handleSave} disabled={isLoading} className="gap-2">
 <Save className="w-4 h-4" /> Save Variants
 </Button>
 </div>
 </div>
 );
}

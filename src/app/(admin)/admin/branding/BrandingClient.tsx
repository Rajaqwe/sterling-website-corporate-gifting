'use client';

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Edit2, ToggleLeft, ToggleRight } from "lucide-react";
import { createBrandingOption, updateBrandingOption, toggleBrandingStatus, type BrandingFormPayload } from "./actions";

type BrandingOption = {
 id: string;
 name: string;
 description: string | null;
 additionalCost: number | { toNumber: () => number };
 minimumQuantity: number;
 leadTimeDays: number;
 isActive: boolean;
 _count: { products: number };
};

const BLANK: BrandingFormPayload = {
 name: '',
 description: '',
 additionalCost: 0,
 minimumQuantity: 1,
 leadTimeDays: 7,
 isActive: true,
};

export function BrandingClient({ options }: { options: BrandingOption[] }) {
 const [dialogOpen, setDialogOpen] = useState(false);
 const [editing, setEditing] = useState<BrandingOption | null>(null);
 const [form, setForm] = useState<BrandingFormPayload>(BLANK);
 const [loading, setLoading] = useState(false);

 const openCreate = () => { setEditing(null); setForm(BLANK); setDialogOpen(true); };
 const openEdit = (opt: BrandingOption) => {
 setEditing(opt);
 setForm({
 name: opt.name,
 description: opt.description || '',
 additionalCost: typeof opt.additionalCost === 'object' ? opt.additionalCost.toNumber() : Number(opt.additionalCost),
 minimumQuantity: opt.minimumQuantity,
 leadTimeDays: opt.leadTimeDays,
 isActive: opt.isActive,
 });
 setDialogOpen(true);
 };

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);
 const res = editing ? await updateBrandingOption(editing.id, form) : await createBrandingOption(form);
 if (res.error) toast.error(res.error);
 else { toast.success(editing ? "Updated." : "Created."); setDialogOpen(false); }
 setLoading(false);
 };

 const handleToggle = async (opt: BrandingOption) => {
 const res = await toggleBrandingStatus(opt.id, !opt.isActive);
 if (res.error) toast.error(res.error);
 else toast.success(opt.isActive ? "Deactivated." : "Activated.");
 };

 return (
 <div className="space-y-4">
 <div className="flex justify-end">
 <Button onClick={openCreate} className="flex items-center gap-2">
 <Plus className="h-4 w-4" /> Add Branding Option
 </Button>
 </div>

 <div className="rounded-md border overflow-hidden">
 <table className="w-full text-sm">
 <thead className="bg-secondary/20 border-b">
 <tr>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Additional Cost</th>
 <th className="text-center px-4 py-3 font-medium text-muted-foreground">Min Qty</th>
 <th className="text-center px-4 py-3 font-medium text-muted-foreground">Lead Time</th>
 <th className="text-center px-4 py-3 font-medium text-muted-foreground">Products</th>
 <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
 <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y">
 {options.length === 0 && (
 <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No branding options found.</td></tr>
 )}
 {options.map(opt => (
 <tr key={opt.id} className="hover:bg-secondary/20">
 <td className="px-4 py-3">
 <div className="font-medium">{opt.name}</div>
 {opt.description && <div className="text-xs text-muted-foreground">{opt.description}</div>}
 </td>
 <td className="px-4 py-3">
 {Number(typeof opt.additionalCost === 'object' ? opt.additionalCost.toNumber() : opt.additionalCost) > 0
 ? `+₹${Number(typeof opt.additionalCost === 'object' ? opt.additionalCost.toNumber() : opt.additionalCost).toLocaleString('en-IN')}`
 : 'Included'}
 </td>
 <td className="px-4 py-3 text-center">{opt.minimumQuantity}</td>
 <td className="px-4 py-3 text-center">{opt.leadTimeDays} days</td>
 <td className="px-4 py-3 text-center">{opt._count.products}</td>
 <td className="px-4 py-3 text-center">
 <Badge variant={opt.isActive ? 'default' : 'secondary'} className={opt.isActive ? "bg-green-100 text-green-800" : ""}>
 {opt.isActive ? 'Active' : 'Inactive'}
 </Badge>
 </td>
 <td className="px-4 py-3 text-right">
 <div className="flex justify-end gap-2">
 <Button variant="ghost" size="sm" onClick={() => openEdit(opt)}><Edit2 className="h-4 w-4" /></Button>
 <Button variant="ghost" size="sm" onClick={() => handleToggle(opt)}>
 {opt.isActive ? <ToggleRight className="h-4 w-4 text-green-500" /> : <ToggleLeft className="h-4 w-4 text-muted-foreground" />}
 </Button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
 <DialogContent className="max-w-lg">
 <DialogHeader><DialogTitle>{editing ? 'Edit Branding Option' : 'New Branding Option'}</DialogTitle></DialogHeader>
 <form onSubmit={handleSubmit} className="space-y-4 py-2">
 <div className="space-y-2">
 <Label>Name *</Label>
 <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
 </div>
 <div className="space-y-2">
 <Label>Description</Label>
 <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} />
 </div>
 <div className="grid grid-cols-3 gap-4">
 <div className="space-y-2">
 <Label>Add. Cost (₹)</Label>
 <Input type="number" min="0" step="0.01" value={form.additionalCost} onChange={e => setForm(p => ({ ...p, additionalCost: Number(e.target.value) }))} />
 </div>
 <div className="space-y-2">
 <Label>Min Qty</Label>
 <Input type="number" min="1" value={form.minimumQuantity} onChange={e => setForm(p => ({ ...p, minimumQuantity: Number(e.target.value) }))} />
 </div>
 <div className="space-y-2">
 <Label>Lead Time (days)</Label>
 <Input type="number" min="0" value={form.leadTimeDays} onChange={e => setForm(p => ({ ...p, leadTimeDays: Number(e.target.value) }))} />
 </div>
 </div>
 <div className="flex items-center gap-2">
 <input type="checkbox" id="branding-active" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))} className="h-4 w-4 rounded" />
 <Label htmlFor="branding-active">Active</Label>
 </div>
 <DialogFooter>
 <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
 <Button type="submit" disabled={loading}>{loading ? 'Saving...' : (editing ? 'Save Changes' : 'Create')}</Button>
 </DialogFooter>
 </form>
 </DialogContent>
 </Dialog>
 </div>
 );
}

'use client';

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, X, ChevronDown, ChevronRight } from "lucide-react";
import { createAttribute, updateAttribute, deleteAttribute, addAttributeValue, deleteAttributeValue } from "./actions";

type AttributeValue = {
 id: string;
 value: string;
 attributeId: string;
};

type Attribute = {
 id: string;
 name: string;
 type: string;
 values: AttributeValue[];
 _count: { values: number };
};

export function AttributesClient({ attributes }: { attributes: Attribute[] }) {
 const [dialogOpen, setDialogOpen] = useState(false);
 const [editing, setEditing] = useState<Attribute | null>(null);
 const [form, setForm] = useState({ name: '', type: 'TEXT' });
 const [loading, setLoading] = useState(false);
 const [expanded, setExpanded] = useState<Set<string>>(new Set());
 const [newValues, setNewValues] = useState<Record<string, string>>({});
 const [addingValue, setAddingValue] = useState<Record<string, boolean>>({});

 const toggleExpand = (id: string) => {
 setExpanded(prev => {
 const next = new Set(prev);
 if (next.has(id)) next.delete(id); else next.add(id);
 return next;
 });
 };

 const openCreate = () => { setEditing(null); setForm({ name: '', type: 'TEXT' }); setDialogOpen(true); };
 const openEdit = (attr: Attribute) => {
 setEditing(attr);
 setForm({ name: attr.name, type: attr.type });
 setDialogOpen(true);
 };

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);
 const res = editing ? await updateAttribute(editing.id, form) : await createAttribute(form);
 if (res.error) toast.error(res.error);
 else { toast.success(editing ? "Attribute updated." : "Attribute created."); setDialogOpen(false); }
 setLoading(false);
 };

 const handleDelete = async (attr: Attribute) => {
 if (!confirm(`Delete "${attr.name}"? This may affect products using this attribute.`)) return;
 const res = await deleteAttribute(attr.id);
 if (res.error) toast.error(res.error);
 else toast.success("Attribute deleted.");
 };

 const handleAddValue = async (attrId: string) => {
 const value = newValues[attrId]?.trim();
 if (!value) return;
 setAddingValue(p => ({ ...p, [attrId]: true }));
 const res = await addAttributeValue(attrId, value);
 if (res.error) toast.error(res.error);
 else { toast.success("Value added."); setNewValues(p => ({ ...p, [attrId]: '' })); }
 setAddingValue(p => ({ ...p, [attrId]: false }));
 };

 const handleDeleteValue = async (valueId: string) => {
 const res = await deleteAttributeValue(valueId);
 if (res.error) toast.error(res.error);
 else toast.success("Value removed.");
 };

 return (
 <div className="space-y-4">
 <div className="flex justify-end">
 <Button onClick={openCreate} className="flex items-center gap-2">
 <Plus className="h-4 w-4" /> Add Attribute
 </Button>
 </div>

 <div className="space-y-2">
 {attributes.length === 0 && (
 <p className="text-center text-muted-foreground py-8">No attributes found. Create one to get started.</p>
 )}
 {attributes.map(attr => (
 <div key={attr.id} className="border rounded-lg overflow-hidden">
 <div className="flex items-center justify-between px-4 py-3 bg-secondary/20">
 <button
 onClick={() => toggleExpand(attr.id)}
 className="flex items-center gap-2 flex-1 text-left"
 >
 {expanded.has(attr.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
 <span className="font-medium">{attr.name}</span>
 <Badge variant="outline" className="text-xs">{attr.type}</Badge>
 <span className="text-xs text-muted-foreground">{attr._count.values} values</span>
 </button>
 <div className="flex gap-2">
 <Button variant="ghost" size="sm" onClick={() => openEdit(attr)}><Edit2 className="h-4 w-4" /></Button>
 <Button variant="ghost" size="sm" onClick={() => handleDelete(attr)} className="text-red-500 hover:text-red-700">
 <Trash2 className="h-4 w-4" />
 </Button>
 </div>
 </div>
 {expanded.has(attr.id) && (
 <div className="p-4 border-t">
 <div className="flex flex-wrap gap-2 mb-3">
 {attr.values.map(v => (
 <Badge key={v.id} variant="secondary" className="flex items-center gap-1 pr-1">
 {v.value}
 <button onClick={() => handleDeleteValue(v.id)} className="ml-1 text-muted-foreground hover:text-red-500">
 <X className="h-3 w-3" />
 </button>
 </Badge>
 ))}
 {attr.values.length === 0 && <span className="text-sm text-muted-foreground">No values yet.</span>}
 </div>
 <div className="flex gap-2">
 <Input
 placeholder="New value..."
 value={newValues[attr.id] || ''}
 onChange={e => setNewValues(p => ({ ...p, [attr.id]: e.target.value }))}
 onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddValue(attr.id); } }}
 className="max-w-xs text-sm"
 />
 <Button
 size="sm"
 variant="outline"
 disabled={addingValue[attr.id] || !newValues[attr.id]?.trim()}
 onClick={() => handleAddValue(attr.id)}
 >
 Add
 </Button>
 </div>
 </div>
 )}
 </div>
 ))}
 </div>

 <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
 <DialogContent className="max-w-sm">
 <DialogHeader><DialogTitle>{editing ? 'Edit Attribute' : 'New Attribute'}</DialogTitle></DialogHeader>
 <form onSubmit={handleSubmit} className="space-y-4 py-2">
 <div className="space-y-2">
 <Label>Name *</Label>
 <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
 </div>
 <div className="space-y-2">
 <Label>Type</Label>
 <select
 value={form.type}
 onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
 className="w-full border rounded-md px-3 py-2 text-sm"
 >
 <option value="TEXT">Text</option>
 <option value="COLOR">Color</option>
 <option value="SIZE">Size</option>
 <option value="MATERIAL">Material</option>
 <option value="NUMBER">Number</option>
 </select>
 </div>
 <DialogFooter>
 <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
 <Button type="submit" disabled={loading}>{loading ? 'Saving...' : (editing ? 'Save' : 'Create')}</Button>
 </DialogFooter>
 </form>
 </DialogContent>
 </Dialog>
 </div>
 );
}

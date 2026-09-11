'use client';

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Edit2, ToggleLeft, ToggleRight, Package } from "lucide-react";
import { createCategory, updateCategory, toggleCategoryStatus, type CategoryFormPayload } from "./actions";

type Category = {
 id: string;
 name: string;
 slug: string;
 description: string | null;
 isActive: boolean;
 sortOrder: number;
 imageUrl: string | null;
 parentId: string | null;
 seoTitle: string | null;
 seoDescription: string | null;
 parent: { name: string } | null;
 _count: { products: number; children: number };
};

const BLANK_FORM: CategoryFormPayload = {
 name: '',
 slug: '',
 description: '',
 imageUrl: '',
 isActive: true,
 sortOrder: 0,
 parentId: '',
 seoTitle: '',
 seoDescription: '',
};

export function CategoriesClient({ categories }: { categories: Category[] }) {
 const [dialogOpen, setDialogOpen] = useState(false);
 const [editing, setEditing] = useState<Category | null>(null);
 const [form, setForm] = useState<CategoryFormPayload>(BLANK_FORM);
 const [loading, setLoading] = useState(false);

 const openCreate = () => {
 setEditing(null);
 setForm(BLANK_FORM);
 setDialogOpen(true);
 };

 const openEdit = (cat: Category) => {
 setEditing(cat);
 setForm({
 name: cat.name,
 slug: cat.slug,
 description: cat.description || '',
 imageUrl: cat.imageUrl || '',
 isActive: cat.isActive,
 sortOrder: cat.sortOrder,
 parentId: cat.parentId || '',
 seoTitle: cat.seoTitle || '',
 seoDescription: cat.seoDescription || '',
 });
 setDialogOpen(true);
 };

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);
 const res = editing
 ? await updateCategory(editing.id, form)
 : await createCategory(form);
 if (res.error) {
 toast.error(res.error);
 } else {
 toast.success(editing ? "Category updated." : "Category created.");
 setDialogOpen(false);
 }
 setLoading(false);
 };

 const handleToggle = async (cat: Category) => {
 const res = await toggleCategoryStatus(cat.id, !cat.isActive);
 if (res.error) toast.error(res.error);
 else toast.success(cat.isActive ? "Category deactivated." : "Category activated.");
 };

 const autoSlug = (name: string) =>
 name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

 return (
 <div className="space-y-4">
 <div className="flex justify-end">
 <Button onClick={openCreate} className="flex items-center gap-2">
 <Plus className="h-4 w-4" /> Add Category
 </Button>
 </div>

 <div className="rounded-md border overflow-hidden">
 <table className="w-full text-sm">
 <thead className="bg-secondary/20 border-b">
 <tr>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Slug</th>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Parent</th>
 <th className="text-center px-4 py-3 font-medium text-muted-foreground">Products</th>
 <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
 <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y">
 {categories.length === 0 && (
 <tr>
 <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No categories found. Create one to get started.</td>
 </tr>
 )}
 {categories.map(cat => (
 <tr key={cat.id} className="hover:bg-secondary/20">
 <td className="px-4 py-3 font-medium">
 {cat.name}
 {cat._count.children > 0 && (
 <span className="ml-2 text-xs text-muted-foreground">({cat._count.children} subcategories)</span>
 )}
 </td>
 <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{cat.slug}</td>
 <td className="px-4 py-3 text-muted-foreground">{cat.parent?.name || '—'}</td>
 <td className="px-4 py-3 text-center">
 <span className="flex items-center justify-center gap-1 text-muted-foreground">
 <Package className="h-3 w-3" /> {cat._count.products}
 </span>
 </td>
 <td className="px-4 py-3 text-center">
 <Badge variant={cat.isActive ? 'default' : 'secondary'} className={cat.isActive ? "bg-green-100 text-green-800" : ""}>
 {cat.isActive ? 'Active' : 'Inactive'}
 </Badge>
 </td>
 <td className="px-4 py-3 text-right">
 <div className="flex justify-end gap-2">
 <Button variant="ghost" size="sm" onClick={() => openEdit(cat)}>
 <Edit2 className="h-4 w-4" />
 </Button>
 <Button variant="ghost" size="sm" onClick={() => handleToggle(cat)}>
 {cat.isActive ? <ToggleRight className="h-4 w-4 text-green-500" /> : <ToggleLeft className="h-4 w-4 text-muted-foreground" />}
 </Button>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
 <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
 <DialogHeader>
 <DialogTitle>{editing ? 'Edit Category' : 'Create Category'}</DialogTitle>
 </DialogHeader>
 <form onSubmit={handleSubmit} className="space-y-4 py-2">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label htmlFor="cat-name">Name *</Label>
 <Input
 id="cat-name"
 value={form.name}
 onChange={e => setForm(p => ({ ...p, name: e.target.value, slug: editing ? p.slug : autoSlug(e.target.value) }))}
 required
 />
 </div>
 <div className="space-y-2">
 <Label htmlFor="cat-slug">Slug *</Label>
 <Input
 id="cat-slug"
 value={form.slug}
 onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
 required
 className="font-mono text-sm"
 />
 </div>
 </div>
 <div className="space-y-2">
 <Label htmlFor="cat-desc">Description</Label>
 <Textarea id="cat-desc" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} />
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label htmlFor="cat-img">Image URL</Label>
 <Input id="cat-img" value={form.imageUrl} onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))} placeholder="https://..." />
 </div>
 <div className="space-y-2">
 <Label htmlFor="cat-sort">Sort Order</Label>
 <Input id="cat-sort" type="number" value={form.sortOrder} onChange={e => setForm(p => ({ ...p, sortOrder: Number(e.target.value) }))} />
 </div>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label htmlFor="cat-seo-title">SEO Title</Label>
 <Input id="cat-seo-title" value={form.seoTitle} onChange={e => setForm(p => ({ ...p, seoTitle: e.target.value }))} />
 </div>
 <div className="space-y-2">
 <Label htmlFor="cat-active">Active</Label>
 <div className="flex items-center gap-2 pt-2">
 <input
 type="checkbox"
 id="cat-active"
 checked={form.isActive}
 onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))}
 className="h-4 w-4 rounded border-border"
 />
 <span className="text-sm text-muted-foreground">{form.isActive ? 'Active' : 'Inactive'}</span>
 </div>
 </div>
 </div>
 <div className="space-y-2">
 <Label htmlFor="cat-seo-desc">SEO Description</Label>
 <Textarea id="cat-seo-desc" value={form.seoDescription} onChange={e => setForm(p => ({ ...p, seoDescription: e.target.value }))} rows={2} />
 </div>
 <DialogFooter>
 <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
 <Button type="submit" disabled={loading}>
 {loading ? "Saving..." : (editing ? "Save Changes" : "Create Category")}
 </Button>
 </DialogFooter>
 </form>
 </DialogContent>
 </Dialog>
 </div>
 );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateProduct, createProduct } from "../actions";
import { AutoDismissAlert } from "@/components/ui/auto-dismiss-alert";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

type Category = {
  id: string;
  name: string;
};

export function ProductForm({ categories, initialData }: { categories: Category[], initialData?: any }) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  // Auto-generate slug from name
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!initialData) {
      setSlug(newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);
    
    const formData = new FormData(e.currentTarget);
    const result = initialData 
      ? await updateProduct(initialData.id, formData)
      : await createProduct(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
    // On success, the action redirects, so we don't need to do anything else.
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center mb-6">
        <Link href="/admin/products" className="mr-4 p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Add New Product</h1>
          <p className="text-slate-500 mt-1">Create a new corporate gift for your catalog.</p>
        </div>
      </div>

      {error && <AutoDismissAlert message={error} type="error" />}

      <form onSubmit={onSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Basic Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input id="name" name="name" value={name} onChange={handleNameChange} required placeholder="e.g. Executive Leather Briefcase" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input id="sku" name="sku" required placeholder="e.g. BAG-001" defaultValue={initialData?.sku} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug *</Label>
                <Input id="slug" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required placeholder="executive-leather-briefcase" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category *</Label>
                <select 
                  id="categoryId" 
                  name="categoryId" 
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={initialData?.categoryId}
                >
                  <option value="">Select a category...</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Pricing & Inventory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Base Price (₹) *</Label>
                <Input id="price" name="price" type="number" step="0.01" min="0" required defaultValue={initialData?.price || "1000"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stockQuantity">Stock Quantity *</Label>
                <Input id="stockQuantity" name="stockQuantity" type="number" min="0" required defaultValue={initialData?.stockQuantity ?? "500"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minimumOrderQuantity">Minimum Order (MOQ) *</Label>
                <Input id="minimumOrderQuantity" name="minimumOrderQuantity" type="number" min="1" required defaultValue={initialData?.minimumOrderQuantity || "10"} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Publish Status *</Label>
              <select 
                id="status" 
                name="status" 
                required
                className="flex h-10 w-full md:w-1/3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                defaultValue={initialData?.status || "ACTIVE"}
              >
                <option value="DRAFT">Draft</option>
                <option value="ACTIVE">Active (Visible to users)</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/products">
            <Button variant="outline" type="button" disabled={isPending}>Cancel</Button>
          </Link>
          <Button type="submit" className="bg-slate-900 text-white" disabled={isPending}>
            <Save className="w-4 h-4 mr-2" />
            {isPending ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}

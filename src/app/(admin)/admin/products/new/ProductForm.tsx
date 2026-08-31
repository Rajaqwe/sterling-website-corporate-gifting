/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { updateProduct, createProduct, deleteReview, ProductFormPayload } from "../actions";
import { AutoDismissAlert } from "@/components/ui/auto-dismiss-alert";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, Image as ImageIcon } from "lucide-react";

type Category = { id: string; name: string; };
type BrandingOption = { id: string; name: string; additionalCost: number | string; };

export function ProductForm({ categories, brandingOptions = [], initialData }: { categories: Category[], brandingOptions?: BrandingOption[], initialData?: any }) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Basic Details
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");

  // Media
  const [mediaList, setMediaList] = useState<any[]>(
    initialData?.media?.length > 0 
      ? initialData.media 
      : []
  );

  // Dynamic KV pairs
  const parseJsonToKV = (jsonStr: any) => {
    if (!jsonStr) return [];
    try {
      const obj = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
      return Object.entries(obj).map(([key, value]) => ({ key, value: String(value) }));
    } catch {
      return [];
    }
  };

  const [techSpecs, setTechSpecs] = useState<{key: string, value: string}[]>(parseJsonToKV(initialData?.technicalSpecifications));
  const [logistics, setLogistics] = useState<{key: string, value: string}[]>(parseJsonToKV(initialData?.packageLogistics));

  // Branding
  const initialBrandingIds = initialData?.brandingOptions?.map((bo: any) => bo.brandingOptionId) || [];
  const [selectedBranding, setSelectedBranding] = useState<string[]>(initialBrandingIds);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!initialData) {
      setSlug(newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const addMediaRow = () => {
    setMediaList([...mediaList, { url: "", type: "IMAGE", isPrimary: mediaList.length === 0, isLiveProofing: false }]);
  };
  const removeMediaRow = (index: number) => {
    setMediaList(mediaList.filter((_, i) => i !== index));
  };
  const updateMedia = (index: number, field: string, value: any) => {
    const newList = [...mediaList];
    
    // Enforce logic: if isPrimary is checked, uncheck others
    if (field === 'isPrimary' && value === true) {
      newList.forEach(m => m.isPrimary = false);
    }
    // Enforce logic: if isLiveProofing is checked, uncheck others
    if (field === 'isLiveProofing' && value === true) {
      newList.forEach(m => m.isLiveProofing = false);
    }

    newList[index] = { ...newList[index], [field]: value };
    setMediaList(newList);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    // Construct tech specs JSON
    const techSpecsObj = techSpecs.reduce((acc, {key, value}) => {
      if (key.trim()) acc[key.trim()] = value;
      return acc;
    }, {} as Record<string, string>);

    // Construct logistics JSON
    const logisticsObj = logistics.reduce((acc, {key, value}) => {
      if (key.trim()) acc[key.trim()] = value;
      return acc;
    }, {} as Record<string, string>);

    // Fix media fallback if none selected
    let finalMedia = [...mediaList].filter(m => m.url.trim() !== "");
    if (finalMedia.length > 0) {
      const hasPrimary = finalMedia.some(m => m.isPrimary);
      if (!hasPrimary) finalMedia[0].isPrimary = true;

      const hasLiveProofing = finalMedia.some(m => m.isLiveProofing);
      if (!hasLiveProofing) finalMedia[0].isLiveProofing = true; // Use first image as fallback
    }

    const payload: ProductFormPayload = {
      name: String(formData.get('name')),
      sku: String(formData.get('sku')),
      slug: String(formData.get('slug')),
      categoryId: String(formData.get('categoryId')),
      price: Number(formData.get('price')),
      compareAtPrice: formData.get('compareAtPrice') ? Number(formData.get('compareAtPrice')) : undefined,
      stockQuantity: Number(formData.get('stockQuantity')),
      minimumOrderQuantity: Number(formData.get('minimumOrderQuantity')),
      status: String(formData.get('status')) as any,
      likes: Number(formData.get('likes') || 0),
      weight: formData.get('weight') ? Number(formData.get('weight')) : undefined,
      dimensions: String(formData.get('dimensions') || ""),
      material: String(formData.get('material') || ""),
      shortDescription: String(formData.get('shortDescription') || ""),
      description: String(formData.get('description') || ""),
      technicalSpecifications: Object.keys(techSpecsObj).length > 0 ? techSpecsObj : undefined,
      packageLogistics: Object.keys(logisticsObj).length > 0 ? logisticsObj : undefined,
      media: finalMedia,
      brandingOptionIds: selectedBranding
    };

    startTransition(async () => {
      const result = initialData 
        ? await updateProduct(initialData.id, payload)
        : await createProduct(payload);
      
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  const handleDeleteReview = (reviewId: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      startTransition(async () => {
        await deleteReview(reviewId);
        window.location.reload(); // Quick refresh to update state
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/admin/products" className="mr-4 p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900">{initialData ? 'Edit Product' : 'Add New Product'}</h1>
          <p className="text-slate-500 mt-1">Manage all details, media, and logistics.</p>
        </div>
        <Button onClick={() => document.getElementById('submit-btn')?.click()} className="bg-slate-900 text-white" disabled={isPending}>
          <Save className="w-4 h-4 mr-2" />
          {isPending ? "Saving..." : "Save Product"}
        </Button>
      </div>

      {error && <AutoDismissAlert message={error} type="error" />}

      <form onSubmit={onSubmit} id="product-form">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-2 md:grid-cols-5 h-auto">
            <TabsTrigger value="basic" className="py-2">Basic</TabsTrigger>
            <TabsTrigger value="media" className="py-2">Media</TabsTrigger>
            <TabsTrigger value="details" className="py-2">Details</TabsTrigger>
            <TabsTrigger value="branding" className="py-2">Branding</TabsTrigger>
            <TabsTrigger value="engagement" className="py-2">Reviews</TabsTrigger>
          </TabsList>

          {/* BASIC & PRICING TAB */}
          <TabsContent value="basic">
            <Card>
              <CardHeader><CardTitle>Basic Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input id="name" name="name" value={name} onChange={handleNameChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input id="sku" name="sku" required defaultValue={initialData?.sku} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input id="slug" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoryId">Category *</Label>
                    <select id="categoryId" name="categoryId" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={initialData?.categoryId}>
                      <option value="">Select a category...</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader><CardTitle>Pricing & Inventory</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Base Price (₹) *</Label>
                    <Input id="price" name="price" type="number" step="0.01" min="0" required defaultValue={initialData?.price || "1000"} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="compareAtPrice">Compare At Price (₹)</Label>
                    <Input id="compareAtPrice" name="compareAtPrice" type="number" step="0.01" min="0" defaultValue={initialData?.compareAtPrice || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Publish Status *</Label>
                    <select id="status" name="status" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={initialData?.status || "ACTIVE"}>
                      <option value="DRAFT">Draft</option>
                      <option value="ACTIVE">Active</option>
                      <option value="OUT_OF_STOCK">Out of Stock</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stockQuantity">Stock Quantity *</Label>
                    <Input id="stockQuantity" name="stockQuantity" type="number" min="0" required defaultValue={initialData?.stockQuantity ?? "500"} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minimumOrderQuantity">Minimum Order (MOQ) *</Label>
                    <Input id="minimumOrderQuantity" name="minimumOrderQuantity" type="number" min="1" required defaultValue={initialData?.minimumOrderQuantity || "10"} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MEDIA TAB */}
          <TabsContent value="media">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Media Gallery</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={addMediaRow}><Plus className="w-4 h-4 mr-1"/> Add Media URL</Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">The Live Proofing engine will use the designated image, or fallback to the first image.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {mediaList.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-md">
                    <ImageIcon className="mx-auto h-8 w-8 mb-2 opacity-50" />
                    <p>No media added yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {mediaList.map((media, index) => (
                      <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-3 p-3 border rounded-md bg-slate-50">
                        <select 
                          value={media.type} 
                          onChange={(e) => updateMedia(index, 'type', e.target.value)}
                          className="flex h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="IMAGE">Image</option>
                          <option value="VIDEO">Video</option>
                        </select>
                        <Input 
                          placeholder="https://..." 
                          value={media.url}
                          onChange={(e) => updateMedia(index, 'url', e.target.value)}
                          className="flex-1"
                        />
                        <div className="flex items-center gap-4 px-2">
                          <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                            <Checkbox 
                              checked={media.isPrimary} 
                              onCheckedChange={(c) => updateMedia(index, 'isPrimary', c === true)} 
                            /> Primary
                          </label>
                          <label className="flex items-center gap-1.5 text-sm cursor-pointer whitespace-nowrap">
                            <Checkbox 
                              checked={media.isLiveProofing} 
                              onCheckedChange={(c) => updateMedia(index, 'isLiveProofing', c === true)} 
                            /> Live Proofing
                          </label>
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeMediaRow(index)} className="text-destructive self-end md:self-auto">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* DETAILS & LOGISTICS TAB */}
          <TabsContent value="details">
            <Card className="mb-6">
              <CardHeader><CardTitle>Description</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea id="shortDescription" name="shortDescription" defaultValue={initialData?.shortDescription || ""} rows={2} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea id="description" name="description" defaultValue={initialData?.description || ""} rows={5} />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Technical Specs</CardTitle>
                    <Button type="button" variant="outline" size="sm" onClick={() => setTechSpecs([...techSpecs, {key:'', value:''}])}><Plus className="w-4 h-4"/> Add</Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="material">Material</Label>
                      <Input id="material" name="material" defaultValue={initialData?.material || ""} />
                    </div>
                  </div>
                  {techSpecs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input placeholder="Key (e.g. Output)" value={spec.key} onChange={(e) => {
                        const newSpecs = [...techSpecs];
                        newSpecs[i].key = e.target.value;
                        setTechSpecs(newSpecs);
                      }} />
                      <Input placeholder="Value (e.g. 5V/2A)" value={spec.value} onChange={(e) => {
                        const newSpecs = [...techSpecs];
                        newSpecs[i].value = e.target.value;
                        setTechSpecs(newSpecs);
                      }} />
                      <Button type="button" variant="ghost" size="icon" onClick={() => setTechSpecs(techSpecs.filter((_, idx) => idx !== i))}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Package Logistics</CardTitle>
                    <Button type="button" variant="outline" size="sm" onClick={() => setLogistics([...logistics, {key:'', value:''}])}><Plus className="w-4 h-4"/> Add</Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input id="weight" name="weight" type="number" step="0.01" defaultValue={initialData?.weight || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dimensions">Dimensions (LxWxH)</Label>
                      <Input id="dimensions" name="dimensions" defaultValue={initialData?.dimensions || ""} />
                    </div>
                  </div>
                  {logistics.map((log, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input placeholder="Key (e.g. HS Code)" value={log.key} onChange={(e) => {
                        const newLogs = [...logistics];
                        newLogs[i].key = e.target.value;
                        setLogistics(newLogs);
                      }} />
                      <Input placeholder="Value (e.g. 4202.92)" value={log.value} onChange={(e) => {
                        const newLogs = [...logistics];
                        newLogs[i].value = e.target.value;
                        setLogistics(newLogs);
                      }} />
                      <Button type="button" variant="ghost" size="icon" onClick={() => setLogistics(logistics.filter((_, idx) => idx !== i))}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* BRANDING TAB */}
          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Available Branding Imprint Methods</CardTitle>
                <p className="text-sm text-muted-foreground">Select all branding options available for this product.</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {brandingOptions.map(option => (
                    <label key={option.id} className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                      <Checkbox 
                        checked={selectedBranding.includes(option.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedBranding([...selectedBranding, option.id]);
                          } else {
                            setSelectedBranding(selectedBranding.filter(id => id !== option.id));
                          }
                        }}
                      />
                      <div>
                        <div className="font-medium text-sm leading-none">{option.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">Additional: ₹{option.additionalCost}</div>
                      </div>
                    </label>
                  ))}
                  {brandingOptions.length === 0 && (
                    <p className="text-sm text-muted-foreground">No branding options found in database.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ENGAGEMENT TAB */}
          <TabsContent value="engagement">
            <Card className="mb-6">
              <CardHeader><CardTitle>Metrics</CardTitle></CardHeader>
              <CardContent>
                <div className="w-full md:w-1/3 space-y-2">
                  <Label htmlFor="likes">Likes Override</Label>
                  <Input id="likes" name="likes" type="number" defaultValue={initialData?.likes || "0"} />
                  <p className="text-xs text-muted-foreground">Manually adjust the total likes count for this product.</p>
                </div>
              </CardContent>
            </Card>

            {initialData && (
              <Card>
                <CardHeader><CardTitle>Customer Reviews ({initialData.reviews?.length || 0})</CardTitle></CardHeader>
                <CardContent>
                  {(!initialData.reviews || initialData.reviews.length === 0) ? (
                    <p className="text-sm text-muted-foreground">No reviews yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {initialData.reviews.map((review: any) => (
                        <div key={review.id} className="p-4 border rounded-lg bg-slate-50 flex justify-between gap-4 items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">{review.authorName}</span>
                              <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">{review.rating} ★</span>
                            </div>
                            <p className="text-sm text-slate-700">{review.content}</p>
                            <p className="text-xs text-muted-foreground mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => handleDeleteReview(review.id)} className="text-destructive shrink-0">
                            Delete
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Hidden submit button to be triggered from top bar */}
        <button type="submit" id="submit-btn" className="hidden">Submit</button>
      </form>
    </div>
  );
}

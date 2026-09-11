/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useTransition, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { updateProduct, createProduct, deleteReview, ProductFormPayload } from "../actions";
import { AutoDismissAlert } from "@/components/ui/auto-dismiss-alert";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2, Image as ImageIcon, ExternalLink, Settings2, Package, Tag, BarChart } from "lucide-react";
import { useRouter } from "next/navigation";

type Category = { id: string; name: string; };
type BrandingOption = { id: string; name: string; additionalCost: number | string; };

export function ProductForm({ categories, brandingOptions = [], initialData }: { categories: Category[], brandingOptions?: BrandingOption[], initialData?: any }) {
  const router = useRouter();
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

  const [isDragging, setIsDragging] = useState(false);

  // Dynamic KV pairs
  const parseJsonToKV = useCallback((jsonStr: any) => {
    if (!jsonStr) return [];
    try {
      const obj = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
      return Object.entries(obj).map(([key, value]) => ({ key, value: String(value) }));
    } catch {
      return [];
    }
  }, []);

  const [techSpecs, setTechSpecs] = useState<{ key: string, value: string }[]>(() => parseJsonToKV(initialData?.technicalSpecifications));
  const [logistics, setLogistics] = useState<{ key: string, value: string }[]>(() => parseJsonToKV(initialData?.packageLogistics));

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

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        console.error("Only images and videos are supported");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setMediaList(prev => [...prev, {
          url: base64,
          type: file.type.startsWith('video/') ? "VIDEO" : "IMAGE",
          isPrimary: prev.length === 0,
          isLiveProofing: false
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
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
    const techSpecsObj = techSpecs.reduce((acc, { key, value }) => {
      if (key.trim()) acc[key.trim()] = value;
      return acc;
    }, {} as Record<string, string>);

    // Construct logistics JSON
    const logisticsObj = logistics.reduce((acc, { key, value }) => {
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
      try {
        const result = initialData
          ? await updateProduct(initialData.id, payload)
          : await createProduct(payload);

        if (result?.error) {
          setError(result.error);
        } else {
          router.push('/admin/products');
          router.refresh();
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
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
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 rounded-full hover:bg-muted dark:hover:bg-primary/90 transition-colors text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
              {initialData ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground mt-1">
              Manage product details, pricing, media, and branding options.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="hidden sm:flex"
            onClick={() => router.push('/admin/products')}
          >
            Cancel
          </Button>
          <Button
            onClick={() => document.getElementById('submit-btn')?.click()}
            className="btn-primary shadow-lg hover-lift font-medium px-6"
            disabled={isPending}
          >
            <Save className="w-4 h-4 mr-2" />
            {isPending ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </div>

      {error && <AutoDismissAlert message={error} type="error" />}

      <form onSubmit={onSubmit} id="product-form" className="space-y-8">
        <Tabs defaultValue="basic" className="flex flex-col lg:flex-row gap-8 w-full items-start">
          <TabsList className="flex overflow-x-auto lg:flex-col w-full lg:w-56 shrink-0 gap-1.5 bg-transparent p-0 h-auto justify-start items-start">
            <TabsTrigger value="basic" className="w-full justify-start text-left data-active:bg-card dark:data-active:bg-primary data-active:shadow-sm border border-transparent data-active:border-border dark:data-active:border-slate-800 py-2.5 px-3 rounded-lg transition-all whitespace-nowrap">
              <Package className="w-4 h-4 mr-2.5 text-muted-foreground" /> Basic Info
            </TabsTrigger>
            <TabsTrigger value="media" className="w-full justify-start text-left data-active:bg-card dark:data-active:bg-primary data-active:shadow-sm border border-transparent data-active:border-border dark:data-active:border-slate-800 py-2.5 px-3 rounded-lg transition-all whitespace-nowrap">
              <ImageIcon className="w-4 h-4 mr-2.5 text-muted-foreground" /> Media
            </TabsTrigger>
            <TabsTrigger value="details" className="w-full justify-start text-left data-active:bg-card dark:data-active:bg-primary data-active:shadow-sm border border-transparent data-active:border-border dark:data-active:border-slate-800 py-2.5 px-3 rounded-lg transition-all whitespace-nowrap">
              <Settings2 className="w-4 h-4 mr-2.5 text-muted-foreground" /> Specifications
            </TabsTrigger>
            <TabsTrigger value="branding" className="w-full justify-start text-left data-active:bg-card dark:data-active:bg-primary data-active:shadow-sm border border-transparent data-active:border-border dark:data-active:border-slate-800 py-2.5 px-3 rounded-lg transition-all whitespace-nowrap">
              <Tag className="w-4 h-4 mr-2.5 text-muted-foreground" /> Branding
            </TabsTrigger>
            <TabsTrigger value="engagement" className="w-full justify-start text-left data-active:bg-card dark:data-active:bg-primary data-active:shadow-sm border border-transparent data-active:border-border dark:data-active:border-slate-800 py-2.5 px-3 rounded-lg transition-all whitespace-nowrap">
              <BarChart className="w-4 h-4 mr-2.5 text-muted-foreground" /> Engagement
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 w-full min-w-0 mt-0">
            {/* BASIC & PRICING TAB */}
            <TabsContent keepMounted value="basic" className="space-y-6 focus-visible:outline-none">
              <Card className="border-border shadow-sm bg-card ">
                <CardHeader>
                  <CardTitle className="text-xl">General Information</CardTitle>
                  <CardDescription>The core identity of your product.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <Label htmlFor="name" className="text-muted-foreground ">Product Name *</Label>
                      <Input id="name" name="name" value={name} onChange={handleNameChange} required className="bg-card " />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="sku" className="text-muted-foreground ">SKU *</Label>
                      <Input id="sku" name="sku" required defaultValue={initialData?.sku} className="bg-card font-mono text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <Label htmlFor="slug" className="text-muted-foreground ">URL Slug *</Label>
                      <Input id="slug" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required className="bg-secondary/20 font-mono text-sm" />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="categoryId" className="text-muted-foreground ">Category *</Label>
                      <select id="categoryId" name="categoryId" required className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" defaultValue={initialData?.categoryId}>
                        <option value="">Select a category...</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-sm bg-card ">
                <CardHeader>
                  <CardTitle className="text-xl">Pricing & Inventory</CardTitle>
                  <CardDescription>Manage how this product is priced and stocked.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2.5">
                      <Label htmlFor="price" className="text-muted-foreground ">Base Price (₹) *</Label>
                      <Input id="price" name="price" type="number" step="0.01" min="0" required defaultValue={initialData?.price || "1000"} className="bg-card " />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="compareAtPrice" className="text-muted-foreground ">Compare At Price (₹)</Label>
                      <Input id="compareAtPrice" name="compareAtPrice" type="number" step="0.01" min="0" defaultValue={initialData?.compareAtPrice || ""} className="bg-card " />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="status" className="text-muted-foreground ">Publish Status *</Label>
                      <select id="status" name="status" required className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" defaultValue={initialData?.status || "ACTIVE"}>
                        <option value="DRAFT">Draft</option>
                        <option value="ACTIVE">Active</option>
                        <option value="OUT_OF_STOCK">Out of Stock</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <Label htmlFor="stockQuantity" className="text-muted-foreground ">Stock Quantity *</Label>
                      <Input id="stockQuantity" name="stockQuantity" type="number" min="0" required defaultValue={initialData?.stockQuantity ?? "500"} className="bg-card " />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="minimumOrderQuantity" className="text-muted-foreground ">Minimum Order (MOQ) *</Label>
                      <Input id="minimumOrderQuantity" name="minimumOrderQuantity" type="number" min="1" required defaultValue={initialData?.minimumOrderQuantity || "10"} className="bg-card " />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* MEDIA TAB */}
            <TabsContent keepMounted value="media" className="focus-visible:outline-none">
              <Card className="border-border shadow-sm bg-card ">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl">Media Gallery</CardTitle>
                      <CardDescription className="mt-1">
                        Manage product images and videos. The Live Proofing engine will use the designated image.
                      </CardDescription>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={addMediaRow} className="hidden sm:flex hover:bg-muted dark:hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-1.5" /> Add Media
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mediaList.length === 0 ? (
                    <div
                      className={`text-center py-12 px-4 border-2 border-dashed rounded-xl transition-colors ${isDragging
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-secondary/20 hover:bg-secondary/50'
                        }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-sm font-medium text-foreground">No media assets</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-6">
                        Drag and drop images or videos here, or choose an option below.
                      </p>
                      <div className="flex items-center justify-center gap-3">
                        <label className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer transition-colors shadow-sm">
                          <Plus className="w-4 h-4 mr-1.5" /> Upload File
                          <input
                            type="file"
                            accept="image/*,video/*"
                            multiple
                            className="hidden"
                            onChange={(e) => handleFileUpload(e.target.files)}
                          />
                        </label>
                        <Button type="button" variant="outline" size="sm" onClick={addMediaRow}>
                          Add URL
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {mediaList.map((media, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border border-border rounded-xl bg-secondary/20 /50 hover:border-border dark:hover:border-slate-700 transition-colors">
                          <select
                            value={media.type}
                            onChange={(e) => updateMedia(index, 'type', e.target.value)}
                            className="flex h-10 w-full md:w-32 rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <option value="IMAGE">Image</option>
                            <option value="VIDEO">Video</option>
                          </select>
                          <div className="flex-1 w-full flex items-center gap-2">
                            <Input
                              placeholder="https://..."
                              value={media.url}
                              onChange={(e) => updateMedia(index, 'url', e.target.value)}
                              className="bg-card "
                            />
                            {media.url && (
                              <a href={media.url} target="_blank" rel="noreferrer" className="p-2 text-muted-foreground hover:text-blue-500 transition-colors" title="Open URL">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>

                          <div className="flex items-center gap-6 px-2 w-full md:w-auto mt-2 md:mt-0">
                            <label className="flex items-center gap-2 text-sm cursor-pointer font-medium text-muted-foreground ">
                              <Checkbox
                                checked={media.isPrimary}
                                onCheckedChange={(c) => updateMedia(index, 'isPrimary', c === true)}
                                className="data-checked:bg-blue-600 data-checked:border-blue-600"
                              /> Primary
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer font-medium text-muted-foreground whitespace-nowrap">
                              <Checkbox
                                checked={media.isLiveProofing}
                                onCheckedChange={(c) => updateMedia(index, 'isLiveProofing', c === true)}
                                className="data-checked:bg-purple-600 data-checked:border-purple-600"
                              /> Live Proofing
                            </label>
                          </div>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeMediaRow(index)} className="text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 self-end md:self-auto ml-auto md:ml-0">
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
            <TabsContent keepMounted value="details" className="space-y-6 focus-visible:outline-none">
              <Card className="border-border shadow-sm bg-card ">
                <CardHeader>
                  <CardTitle className="text-xl">Description</CardTitle>
                  <CardDescription>Provide compelling copy for the product page.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2.5">
                    <Label htmlFor="shortDescription" className="text-muted-foreground ">Short Description (Excerpt)</Label>
                    <Textarea id="shortDescription" name="shortDescription" defaultValue={initialData?.shortDescription || ""} rows={2} className="bg-card resize-none" placeholder="A brief summary for product cards..." />
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="description" className="text-muted-foreground ">Full Description</Label>
                    <Textarea id="description" name="description" defaultValue={initialData?.description || ""} rows={6} className="bg-card " placeholder="Detailed product information..." />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-border shadow-sm bg-card ">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">Technical Specs</CardTitle>
                        <CardDescription className="mt-1">Add material and features.</CardDescription>
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={() => setTechSpecs([...techSpecs, { key: '', value: '' }])} className="hover:bg-muted dark:hover:bg-primary/90">
                        <Plus className="w-4 h-4 mr-1.5" /> Add Spec
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2.5 mb-6">
                      <Label htmlFor="material" className="text-muted-foreground ">Primary Material</Label>
                      <Input id="material" name="material" defaultValue={initialData?.material || ""} className="bg-card " placeholder="e.g. Recycled Aluminum" />
                    </div>

                    {techSpecs.length > 0 && <div className="h-px bg-muted/70 my-4" />}

                    <div className="space-y-3">
                      {techSpecs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-3 bg-secondary/20 /50 p-2 rounded-lg border border-border /80">
                          <Input placeholder="Key (e.g. Capacity)" value={spec.key} onChange={(e) => {
                            const newSpecs = [...techSpecs];
                            newSpecs[i].key = e.target.value;
                            setTechSpecs(newSpecs);
                          }} className="bg-card border-border " />
                          <Input placeholder="Value (e.g. 10000mAh)" value={spec.value} onChange={(e) => {
                            const newSpecs = [...techSpecs];
                            newSpecs[i].value = e.target.value;
                            setTechSpecs(newSpecs);
                          }} className="bg-card border-border " />
                          <Button type="button" variant="ghost" size="icon" onClick={() => setTechSpecs(techSpecs.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 shrink-0">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border shadow-sm bg-card ">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">Package Logistics</CardTitle>
                        <CardDescription className="mt-1">Shipping and dimensional data.</CardDescription>
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={() => setLogistics([...logistics, { key: '', value: '' }])} className="hover:bg-muted dark:hover:bg-primary/90">
                        <Plus className="w-4 h-4 mr-1.5" /> Add Data
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2.5">
                        <Label htmlFor="weight" className="text-muted-foreground ">Weight (kg)</Label>
                        <Input id="weight" name="weight" type="number" step="0.01" defaultValue={initialData?.weight || ""} className="bg-card " />
                      </div>
                      <div className="space-y-2.5">
                        <Label htmlFor="dimensions" className="text-muted-foreground ">Dimensions (LxWxH)</Label>
                        <Input id="dimensions" name="dimensions" defaultValue={initialData?.dimensions || ""} className="bg-card " placeholder="e.g. 10x5x2 cm" />
                      </div>
                    </div>

                    {logistics.length > 0 && <div className="h-px bg-muted/70 my-4" />}

                    <div className="space-y-3">
                      {logistics.map((log, i) => (
                        <div key={i} className="flex items-center gap-3 bg-secondary/20 /50 p-2 rounded-lg border border-border /80">
                          <Input placeholder="Key (e.g. HS Code)" value={log.key} onChange={(e) => {
                            const newLogs = [...logistics];
                            newLogs[i].key = e.target.value;
                            setLogistics(newLogs);
                          }} className="bg-card border-border " />
                          <Input placeholder="Value (e.g. 4202.92)" value={log.value} onChange={(e) => {
                            const newLogs = [...logistics];
                            newLogs[i].value = e.target.value;
                            setLogistics(newLogs);
                          }} className="bg-card border-border " />
                          <Button type="button" variant="ghost" size="icon" onClick={() => setLogistics(logistics.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 shrink-0">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* BRANDING TAB */}
            <TabsContent keepMounted value="branding" className="focus-visible:outline-none">
              <Card className="border-border shadow-sm bg-card ">
                <CardHeader>
                  <CardTitle className="text-xl">Available Branding Methods</CardTitle>
                  <CardDescription>Select all custom branding options supported for this product.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {brandingOptions.map(option => {
                      const isSelected = selectedBranding.includes(option.id);
                      return (
                        <label
                          key={option.id}
                          className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${isSelected
                              ? 'border-blue-500 bg-blue-50/50 dark:border-blue-500/50 dark:bg-blue-900/10'
                              : 'border-border hover:bg-secondary/20 dark:hover:bg-muted/50'
                            }`}
                        >
                          <Checkbox
                            className="mt-0.5 data-checked:bg-blue-600 data-checked:border-blue-600"
                            checked={isSelected}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedBranding([...selectedBranding, option.id]);
                              } else {
                                setSelectedBranding(selectedBranding.filter(id => id !== option.id));
                              }
                            }}
                          />
                          <div>
                            <div className={`font-semibold text-sm ${isSelected ? 'text-blue-900 dark:text-blue-200' : 'text-foreground '}`}>
                              {option.name}
                            </div>
                            <div className={`text-xs mt-1 ${isSelected ? 'text-blue-700/80 dark:text-blue-300/80' : 'text-muted-foreground dark:text-muted-foreground'}`}>
                              Additional cost: ₹{option.additionalCost}
                            </div>
                          </div>
                        </label>
                      );
                    })}
                    {brandingOptions.length === 0 && (
                      <div className="col-span-full text-center py-8 text-muted-foreground dark:text-muted-foreground bg-secondary/20 /50 rounded-xl border border-border ">
                        No branding options found in database.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ENGAGEMENT TAB */}
            <TabsContent keepMounted value="engagement" className="space-y-6 focus-visible:outline-none">
              <Card className="border-border shadow-sm bg-card ">
                <CardHeader>
                  <CardTitle className="text-xl">Engagement Metrics</CardTitle>
                  <CardDescription>View and manage product popularity metrics.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full md:w-1/3 space-y-2.5">
                    <Label htmlFor="likes" className="text-muted-foreground ">Likes Override</Label>
                    <Input id="likes" name="likes" type="number" defaultValue={initialData?.likes || "0"} className="bg-card " />
                    <p className="text-xs text-muted-foreground dark:text-muted-foreground leading-relaxed">
                      Manually adjust the total likes count for this product. Useful for initial social proof.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {initialData && (
                <Card className="border-border shadow-sm bg-card ">
                  <CardHeader>
                    <CardTitle className="text-xl">Customer Reviews ({initialData.reviews?.length || 0})</CardTitle>
                    <CardDescription>Manage user-generated reviews for this product.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(!initialData.reviews || initialData.reviews.length === 0) ? (
                      <div className="text-center py-8 text-muted-foreground dark:text-muted-foreground bg-secondary/20 /50 rounded-xl border border-border ">
                        No reviews yet.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {initialData.reviews.map((review: any) => (
                          <div key={review.id} className="p-5 border border-border rounded-xl bg-secondary/20 /50 flex flex-col sm:flex-row justify-between gap-4 items-start hover:border-border dark:hover:border-slate-700 transition-colors">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-semibold text-sm text-foreground ">{review.authorName}</span>
                                <span className="text-xs px-2.5 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded-full font-medium flex items-center gap-1">
                                  {review.rating} <span className="text-[10px]">★</span>
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
                              <p className="text-xs text-muted-foreground dark:text-muted-foreground mt-3 font-medium">
                                {new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                              </p>
                            </div>
                            <Button type="button" variant="ghost" size="sm" onClick={() => handleDeleteReview(review.id)} className="text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 shrink-0 sm:self-center">
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </div>
        </Tabs>

        {/* Hidden submit button to be triggered from top bar */}
        <button type="submit" id="submit-btn" className="hidden">Submit</button>
      </form>
    </div>
  );
}

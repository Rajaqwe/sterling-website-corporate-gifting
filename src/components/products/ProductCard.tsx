/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Eye, Layers, Sparkles } from "lucide-react";
import { formatINR } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className = "", priority = false }: ProductCardProps) {
  const mediaList = (product as any).media || [];
  const primaryMedia = mediaList.find((m: any) => m.isPrimary)?.url || mediaList[0]?.url;
  const [imageSrc, setImageSrc] = useState(
    (product as any).featuredImage || (product as any).images?.[0] || primaryMedia || "/placeholder-product.jpg"
  );
  const [imageError, setImageError] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const title = product.title || product.name || "Corporate Gift";
  const displayCategory = (product as any).category?.name || "Corporate Gift";
  const lowestBulkPrice = Number(product.startingPrice ?? product.lowestPrice ?? (product as any).basePrice ?? (product as any).price ?? 0);
  const basePrice = (product as any).basePrice ? Number((product as any).basePrice) : Number((product as any).price ?? 0);
  const minimumOrderQuantity = (product as any).minimumOrderQuantity || product.moq || 1;
  const calculatedSavings = basePrice > 0 && lowestBulkPrice < basePrice ? Math.round(((basePrice - lowestBulkPrice) / basePrice) * 100) : 0;
  const maxSavingsPercent = product.priceTiers?.[product.priceTiers.length - 1]?.savingsPercent || calculatedSavings;

  // Customization methods
  const customizations = product.customizations || product.customizationOptions || [];
  const primaryCustomizations = customizations.slice(0, 2);

  return (
    <Card
      data-testid="product-card"
      className={cn("group group/card flex flex-col h-full bg-background rounded-xl border border-border/40 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300", className)}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary/30">
        <Link
          href={`/products/${product.slug}`}
          className="block w-full h-full relative"
          aria-label={`View ${title}`}
        >
          {imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-secondary/60 text-muted-foreground p-4 text-center">
              <Layers className="h-10 w-10 mb-2 opacity-50" />
              <span className="text-xs font-medium line-clamp-1">{title}</span>
            </div>
          ) : (
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="object-cover object-center transition-transform duration-[var(--motion-soft)] ease-[var(--ease-standard)] group-hover/card:scale-[1.03]"
              onError={() => {
                setImageError(true);
                setImageSrc("/placeholder-product.jpg");
              }}
            />
          )}
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none gap-2">
          {/* Promotional / Status Badge */}
          {product.badge ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-2.5 py-0.5 text-xs font-medium text-primary-foreground backdrop-blur-sm shadow-sm">
              <Sparkles className="h-3 w-3 text-accent" />
              {product.badge}
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-medium text-accent-foreground backdrop-blur-sm border border-accent/20 shadow-sm">
              {displayCategory}
            </span>
          )}

          {/* MOQ Badge */}
          <span
            data-testid="moq-badge"
            className="inline-flex items-center rounded-full bg-accent text-primary px-2.5 py-0.5 text-xs font-bold shadow-sm"
          >
            MOQ: {product.moq} units
          </span>
        </div>

        {/* Removed Hover CTA to keep image clean and ensure actions are always visible */}
      </div>

      {/* Content Area */}
      <CardContent className="flex flex-col flex-1 p-5 gap-3">
        {/* Category & Tagline */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {displayCategory}
          </span>
          {product.rating && (
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
              ★ {product.rating.toFixed(1)}
              {product.reviewCount ? (
                <span className="text-muted-foreground text-[10px]">({product.reviewCount})</span>
              ) : null}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/products/${product.slug}`} className="group-hover/card:text-accent transition-colors">
          <h3 className="text-lg font-serif font-bold text-primary leading-snug line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Tagline / Subtitle */}
        {product.tagline && (
          <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">
            {product.tagline}
          </p>
        )}

        {/* Customization Badges */}
        {primaryCustomizations.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {primaryCustomizations.map((c) => (
              <span
                key={c.id}
                className="text-[11px] bg-secondary/80 text-secondary-foreground px-2 py-0.5 rounded border border-border/30"
              >
                {c.name}
              </span>
            ))}
            {customizations.length > 2 && (
              <span className="text-[11px] text-muted-foreground px-1 py-0.5">
                +{customizations.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* B2B Pricing Section */}
        <div className="mt-auto pt-3 border-t border-border/40 flex items-end justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground block">
              Volume Pricing
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-muted-foreground">From</span>
              <span data-testid="product-price" className="text-lg font-bold text-primary">
                {formatINR(lowestBulkPrice)}
              </span>
              <span className="text-xs text-muted-foreground">/ unit</span>
            </div>
          </div>

          {basePrice > 0 && basePrice !== lowestBulkPrice && maxSavingsPercent > 0 && (
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground block line-through">
                {formatINR(basePrice)} / unit
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                Save up to {maxSavingsPercent}%
              </span>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 pt-3 mt-1">
          <Button type="button" variant="outline" size="sm" className="h-9 px-3 shrink-0" onClick={() => setIsQuickViewOpen(true)} aria-label={`Quick view ${title}`}>
            <Eye className="h-4 w-4" />
          </Button>
          <Link href={`/products/${product.slug}`} className="flex-1">
            <span className="btn-secondary h-9 w-full rounded-md text-[11px] font-semibold flex items-center justify-center">VIEW PRODUCT</span>
          </Link>
          <Button 
            type="button" 
            className="flex-1 btn-primary h-9 rounded-md text-[11px] font-semibold px-2"
            onClick={async (e) => {
              e.preventDefault();
              const { addToCart } = await import("@/app/products/actions");
              const res = await addToCart(product.id, minimumOrderQuantity);
              if (res.success) {
                // To avoid needing useCart in a deeply nested possible Server Component tree before
                // We just dispatch a custom event that CartDrawer can listen to, or rely on router.refresh
                // Wait, useCart is safe here since ProductCard is a client component
                // Actually, I will just call window.dispatchEvent to notify cart change if we don't have useCart hook right here
                window.dispatchEvent(new Event("cart-updated"));
                const { toast } = await import("sonner");
                toast.success("Added to cart");
              } else {
                const { toast } = await import("sonner");
                toast.error(res.error || "Failed to add to cart");
              }
            }}
          >
            ADD TO CART
          </Button>
        </div>
      </CardContent>

      <Sheet open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-lg">
          <SheetHeader className="border-b border-border/60 p-6 text-left">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Quick view</span>
            <SheetTitle className="mt-2 text-2xl font-serif font-bold text-primary">{title}</SheetTitle>
          </SheetHeader>
          <div className="space-y-6 p-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary/50">
              {!imageError && <Image src={imageSrc} alt={title} fill sizes="(max-width: 640px) 100vw, 512px" className="object-cover" />}
              {imageError && <div className="flex h-full items-center justify-center text-muted-foreground"><Layers className="h-10 w-10" /></div>}
            </div>
            <div className="flex items-center justify-between gap-3"><span className="text-sm text-muted-foreground">{displayCategory}</span><span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">MOQ {minimumOrderQuantity}</span></div>
            {product.tagline && <p className="text-sm leading-relaxed text-muted-foreground">{product.tagline}</p>}
            <div className="rounded-xl border border-primary/15 bg-primary/[0.035] p-4"><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Starting at</span><p className="mt-1 text-2xl font-bold text-primary">{formatINR(lowestBulkPrice)} <span className="text-sm font-normal text-muted-foreground">/ unit</span></p></div>
            <div className="grid grid-cols-2 gap-3 text-sm"><div className="rounded-xl border border-border p-3"><span className="block text-xs text-muted-foreground">Branding</span><strong className="mt-1 block text-foreground">{customizations.length ? "Available" : "Ask our team"}</strong></div><div className="rounded-xl border border-border p-3"><span className="block text-xs text-muted-foreground">Category</span><strong className="mt-1 block text-foreground">{displayCategory}</strong></div></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href={`/products/${product.slug}`} onClick={() => setIsQuickViewOpen(false)} className="btn-primary h-11 w-full rounded-md font-semibold text-sm flex items-center justify-center">VIEW PRODUCT</Link>
              <Button 
                onClick={async () => {
                  const { addToCart } = await import("@/app/products/actions");
                  const res = await addToCart(product.id, minimumOrderQuantity);
                  if (res.success) {
                    window.dispatchEvent(new Event("cart-updated"));
                    const { toast } = await import("sonner");
                    toast.success("Added to cart");
                    setIsQuickViewOpen(false);
                  } else {
                    const { toast } = await import("sonner");
                    toast.error(res.error || "Failed to add to cart");
                  }
                }} 
                className="btn-secondary h-11 w-full rounded-md font-semibold text-sm flex items-center justify-center"
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Card>
  );
}

export default ProductCard;

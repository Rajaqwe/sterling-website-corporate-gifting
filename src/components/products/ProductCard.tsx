/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { formatINR } from "@/lib/currency";

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

  const title = product.title || product.name || "Corporate Gift";
  const displayCategory = (product as any).category?.name || "Corporate Gift";
  const lowestBulkPrice = Number(product.startingPrice ?? product.lowestPrice ?? (product as any).basePrice ?? (product as any).price ?? 0);
  const basePrice = (product as any).basePrice ? Number((product as any).basePrice) : Number((product as any).price ?? 0);

  // Customization methods
  const customizations = product.customizations || product.customizationOptions || [];
  const primaryCustomizations = customizations.slice(0, 2);

  return (
    <Card
      data-testid="product-card"
      className={cn("group group/card flex flex-col h-full bg-background rounded-xl border border-border/40 overflow-hidden hover:-translate-y-1 hover:shadow-md transition-ui", className)}
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
            MOQ: {(product as any).minimumOrderQuantity || product.moq || 1}
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

          {basePrice > 0 && basePrice !== lowestBulkPrice && (
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground block line-through">
                {formatINR(basePrice)} / unit
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                Save up to {product.priceTiers?.[product.priceTiers.length - 1]?.savingsPercent || 25}%
              </span>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 pt-3 mt-1">
          <Link href={`/products/${product.slug}`} className="flex-1">
            <button className="w-full h-9 rounded-md border border-border/60 hover:bg-secondary/50 text-xs font-semibold text-foreground transition-colors">
              View Details
            </button>
          </Link>
          <Link href={`/request-a-quote?product=${product.slug}`} className="flex-1">
            <button className="w-full h-9 rounded-md bg-accent hover:bg-gold-hover text-primary text-xs font-semibold shadow-sm transition-colors">
              Request Quote
            </button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;

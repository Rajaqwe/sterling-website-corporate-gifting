"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Layers, ShieldCheck, CheckCircle2, Truck } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  title: string;
  badge?: string;
  moq: number;
}

export function ProductGallery({ images, title, badge, moq }: ProductGalleryProps) {
  const safeImages = images && images.length > 0 ? images : ["/placeholder-product.jpg"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasError, setHasError] = useState<Record<number, boolean>>({});

  const activeImage = safeImages[activeIndex] || safeImages[0];

  return (
    <div data-testid="product-gallery" className="flex flex-col gap-4">
      {/* Main High-Res Image Stage */}
      <div className="relative aspect-[4/3] sm:aspect-[1/1] md:aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/60 bg-secondary/30 shadow-xs">
        {hasError[activeIndex] ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-secondary/60 text-muted-foreground p-8 text-center">
            <Layers className="h-16 w-16 mb-3 opacity-40 text-primary" />
            <span className="text-sm font-semibold">{title}</span>
          </div>
        ) : (
          <Image
            src={activeImage}
            alt={`${title} - View ${activeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center transition-ui"
            onError={() => {
              setHasError((prev) => ({ ...prev, [activeIndex]: true }));
            }}
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
          {badge ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/95 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-md shadow-md">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              {badge}
            </span>
          ) : (
            <div />
          )}

          <span
            data-testid="pdp-moq-badge"
            className="inline-flex items-center rounded-full bg-accent text-primary px-3 py-1 text-xs font-bold shadow-md"
          >
            MOQ: {moq} units
          </span>
        </div>
      </div>

      {/* Thumbnail Selector Strip */}
      {safeImages.length > 1 && (
        <div
          data-testid="gallery-thumbnails"
          className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin"
          role="tablist"
          aria-label="Product Images"
        >
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={activeIndex === idx}
              aria-label={`View image ${idx + 1}`}
              onClick={() => setActiveIndex(idx)}
              className={`relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-xl overflow-hidden border-2 transition-ui cursor-pointer ${
                activeIndex === idx
                  ? "border-accent ring-2 ring-accent/30 scale-[0.98] shadow-sm"
                  : "border-border/60 hover:border-accent/60 opacity-80 hover:opacity-100 hover:-translate-y-[1px]"
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="96px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* Enterprise Buyer Trust Badges */}
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-secondary/40 border border-border/50 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Free Digital Mockup</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
          <span>100% Quality Inspected</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-primary shrink-0" />
          <span>Split Shipping Available</span>
        </div>
      </div>
    </div>
  );
}

export default ProductGallery;

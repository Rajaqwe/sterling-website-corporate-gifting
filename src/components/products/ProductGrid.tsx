"use client";

import React from "react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { PackageSearch, RotateCcw } from "lucide-react";
import { Reveal, StaggerContainer } from "@/components/ui/reveal";

interface ProductGridProps {
  products: Product[];
  onResetFilters?: () => void;
  className?: string;
}

export function ProductGrid({
  products,
  onResetFilters,
  className = "",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        data-testid="product-empty-state"
        className="flex flex-col items-center justify-center text-center p-12 bg-card rounded-xl border border-dashed border-border/80 my-4 min-h-[380px]"
      >
        <div className="h-16 w-16 rounded-full bg-secondary/80 flex items-center justify-center mb-4 text-muted-foreground">
          <PackageSearch className="h-8 w-8 text-primary/60" />
        </div>
        <h3 className="text-xl font-serif font-bold text-primary mb-2">
          No Corporate Gifts Found
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
          We could not find any products matching your specific combination of filters and search keywords.
          Try adjusting your price range, MOQ threshold, or clear your search term.
        </p>
        {onResetFilters && (
          <Button
            data-testid="reset-filters-button"
            onClick={onResetFilters}
            className="bg-accent text-primary hover:bg-accent/90 gap-2 h-10 px-6 font-semibold"
          >
            <RotateCcw className="h-4 w-4" />
            Reset All Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <StaggerContainer
      data-testid="product-grid"
      staggerDelay={50}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {products.map((product, idx) => (
        <Reveal key={product.id || product.slug} className="h-full">
          <ProductCard
            product={product}
            priority={idx < 4}
          />
        </Reveal>
      ))}
    </StaggerContainer>
  );
}

export default ProductGrid;

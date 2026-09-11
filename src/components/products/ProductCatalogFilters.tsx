"use client";

import { useFilters } from "@/hooks/useFilters";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActiveFilters() {
  const { searchParams, updateFilters, clearAllFilters } = useFilters();
  
  const activeFilters: { key: string; value: string; label: string }[] = [];
  
  const category = searchParams.get("category");
  if (category) activeFilters.push({ key: "category", value: category, label: `Category: ${category}` });
  
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  if (minPrice || maxPrice) {
    const label = minPrice && maxPrice ? `Budget: ₹${minPrice}–₹${maxPrice}` : minPrice ? `Budget: ₹${minPrice}+` : `Budget: Under ₹${maxPrice}`;
    activeFilters.push({ key: "price", value: `${minPrice || ""}-${maxPrice || ""}`, label });
  }

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm text-muted-foreground mr-1">Active Filters:</span>
      {activeFilters.map((filter) => (
        <span 
          key={`${filter.key}-${filter.value}`}
          className="inline-flex items-center gap-1 bg-secondary/80 text-secondary-foreground text-xs px-2.5 py-1 rounded-full border"
        >
          {filter.label}
          <button 
            onClick={() => filter.key === "price" ? updateFilters({ minPrice: "", maxPrice: "" }) : updateFilters({ [filter.key]: "" })}
            className="rounded-sm hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Remove ${filter.label} filter`}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={clearAllFilters}
        className="h-6 text-xs text-muted-foreground hover:text-foreground px-2"
      >
        Clear all
      </Button>
    </div>
  );
}

export function SortDropdown() {
  const { searchParams, updateFilters } = useFilters();
  const currentSort = searchParams.get("sort") || "newest";

  return (
    <select
      aria-label="Sort catalogue products"
      value={currentSort}
      onChange={(e) => updateFilters({ sort: e.target.value })}
      className="text-sm border-border bg-background rounded-md px-3 py-1.5 focus:ring-accent focus:border-accent outline-none"
    >
      <option value="newest">Newest</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="popular">Best Sellers</option>
    </select>
  );
}

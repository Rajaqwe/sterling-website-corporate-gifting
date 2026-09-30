"use client";

import { useFilters } from "@/hooks/useFilters";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActiveFilters() {
  const { searchParams, updateFilters, clearAllFilters } = useFilters();

  const activeFilters: { key: string; value: string; label: string }[] = [];
  const standardKeys = new Set([
    "q",
    "category",
    "minPrice",
    "maxPrice",
    "minMoq",
    "maxMoq",
    "rating",
    "isDiscounted",
    "sort",
    "page",
  ]);

  const query = searchParams.get("q");
  if (query) {
    activeFilters.push({
      key: "q",
      value: query,
      label: `Search: “${query}”`,
    });
  }

  searchParams.getAll("category").forEach((value) => {
    activeFilters.push({
      key: "category",
      value,
      label: `Category: ${value}`,
    });
  });

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  if (minPrice || maxPrice) {
    const label =
      minPrice && maxPrice
        ? `Budget: ₹${minPrice}–₹${maxPrice}`
        : minPrice
          ? `Budget: ₹${minPrice}+`
          : `Budget: Under ₹${maxPrice}`;
    activeFilters.push({
      key: "price",
      value: `${minPrice || ""}-${maxPrice || ""}`,
      label,
    });
  }

  const minMoq = searchParams.get("minMoq");
  const maxMoq = searchParams.get("maxMoq");
  if (minMoq || maxMoq) {
    const label =
      minMoq && maxMoq
        ? `MOQ: ${minMoq}–${maxMoq}`
        : minMoq
          ? `MOQ: ${minMoq}+`
          : `MOQ: Under ${maxMoq}`;
    activeFilters.push({
      key: "moq",
      value: `${minMoq || ""}-${maxMoq || ""}`,
      label,
    });
  }

  const rating = searchParams.get("rating");
  if (rating) {
    activeFilters.push({
      key: "rating",
      value: rating,
      label: `Rating: ${rating}★+`,
    });
  }

  if (searchParams.get("isDiscounted") === "true") {
    activeFilters.push({
      key: "isDiscounted",
      value: "true",
      label: "On sale",
    });
  }

  for (const key of new Set(searchParams.keys())) {
    if (standardKeys.has(key)) continue;

    searchParams.getAll(key).forEach((value) => {
      activeFilters.push({
        key,
        value,
        label: `${key.replace(/[-_]/g, " ")}: ${value}`,
      });
    });
  }

  if (activeFilters.length === 0) return null;

  const removeFilter = (filter: { key: string; value: string }) => {
    if (filter.key === "price") return updateFilters({ minPrice: null, maxPrice: null });
    if (filter.key === "moq") return updateFilters({ minMoq: null, maxMoq: null });
    if (filter.key === "q" || filter.key === "rating" || filter.key === "isDiscounted") {
      return updateFilters({ [filter.key]: null });
    }

    const remaining = searchParams
      .getAll(filter.key)
      .filter((value) => value !== filter.value);

    updateFilters({ [filter.key]: remaining });
  };

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm text-muted-foreground">Active Filters:</span>
      {activeFilters.map((filter) => (
        <span
          key={`${filter.key}-${filter.value}`}
          className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/80 px-2.5 py-1 text-xs text-secondary-foreground"
        >
          {filter.label}
          <button
            type="button"
            onClick={() => removeFilter(filter)}
            className="rounded-full p-0.5 transition-ui hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Remove ${filter.label} filter`}
          >
            <X className="h-3 w-3" aria-hidden="true" />
          </button>
        </span>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={clearAllFilters}
        className="h-7 px-2 text-xs text-muted-foreground transition-ui hover:bg-secondary/70 hover:text-foreground"
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
      className="h-9 text-sm border border-border bg-background rounded-lg px-3 py-1.5 focus:ring-3 focus:ring-accent/30 focus:border-accent outline-none transition-ui cursor-pointer"
    >
      <option value="newest">Newest</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="popular">Best Sellers</option>
    </select>
  );
}

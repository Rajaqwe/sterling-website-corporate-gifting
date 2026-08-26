"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, RotateCcw, Check } from "lucide-react";
import { useFilters } from "@/hooks/useFilters";

export interface FilterOption {
  id: string;
  name: string;
  slug?: string;
  value?: string;
  count: number;
}

export interface AttributeGroup {
  id: string;
  name: string;
  values: FilterOption[];
}

export interface FilterSidebarProps {
  categories: FilterOption[];
  attributes: AttributeGroup[];
  totalResultsCount: number;
  className?: string;
}

export function FilterControls({
  categories,
  attributes,
}: Omit<FilterSidebarProps, "className" | "totalResultsCount">) {
  const { searchParams, updateFilters, clearAllFilters } = useFilters();

  // Local state for debounced inputs
  const [minPrice, setMinPrice] = useState<string>(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get("maxPrice") || "");

  // Sync state if URL changes
  useEffect(() => {
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
  }, [searchParams]);

  // Handle Debounced Price
  useEffect(() => {
    const handler = setTimeout(() => {
      const currentMin = searchParams.get("minPrice") || "";
      const currentMax = searchParams.get("maxPrice") || "";
      
      if (minPrice !== currentMin || maxPrice !== currentMax) {
        updateFilters({
          minPrice: minPrice || null,
          maxPrice: maxPrice || null,
        });
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [minPrice, maxPrice, updateFilters, searchParams]);

  const selectedCategories = searchParams.getAll("category");
  const selectedRating = searchParams.get("rating");
  const isDiscounted = searchParams.get("isDiscounted") === "true";

  // Calculate total active filters
  const activeFilterCount = Array.from(searchParams.keys()).filter(k => k !== 'sort' && k !== 'q' && k !== 'page').reduce((acc, key) => {
    return acc + searchParams.getAll(key).length;
  }, 0);

  const toggleArrayFilter = (key: string, value: string) => {
    const current = searchParams.getAll(key);
    const updated = current.includes(value) 
      ? current.filter(v => v !== value) 
      : [...current, value];
    updateFilters({ [key]: updated });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <h3 className="font-serif font-bold text-base text-primary">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center justify-center bg-accent text-primary text-xs font-bold rounded-full h-5 w-5">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-muted-foreground hover:text-primary h-7 px-2"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
        )}
      </div>

      <Accordion defaultValue={["category", "price", ...attributes.map(a => `attr-${a.id}`)]} className="w-full">
        {/* Category Filter */}
        <AccordionItem value="category" className="border-b-0 mb-4">
          <AccordionTrigger className="py-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:no-underline">
            Category
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="flex flex-col gap-1.5">
              {categories.map((cat) => {
                const val = cat.slug || cat.name;
                const isSelected = selectedCategories.includes(val);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleArrayFilter("category", val)}
                    className={`flex items-center justify-between text-left text-sm py-1.5 px-2.5 rounded-lg transition-colors ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-foreground hover:bg-secondary/70"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className={`h-4 w-4 rounded flex items-center justify-center border transition-colors ${
                          isSelected ? "border-accent bg-accent text-primary" : "border-muted-foreground/30 bg-background"
                        }`}>
                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                      </span>
                      <span className="truncate">{cat.name}</span>
                    </span>
                    <span className={`text-xs ml-2 ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      ({cat.count})
                    </span>
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Dynamic Attributes (Occasion, Recipient, Material, etc.) */}
        {attributes.map(attr => (
          <AccordionItem key={attr.id} value={`attr-${attr.id}`} className="border-b-0 mb-4">
            <AccordionTrigger className="py-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:no-underline">
              {attr.name}
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="flex flex-col gap-1.5">
                {attr.values.map((val) => {
                  const actualVal = val.value || val.name;
                  const isSelected = searchParams.getAll(attr.name).includes(actualVal);
                  return (
                    <div key={val.id} className="flex items-center space-x-3 py-1 px-1">
                      <Checkbox 
                        id={`attr-${attr.id}-${val.id}`} 
                        checked={isSelected}
                        onCheckedChange={() => toggleArrayFilter(attr.name, actualVal)}
                      />
                      <Label 
                        htmlFor={`attr-${attr.id}-${val.id}`} 
                        className="text-sm font-normal cursor-pointer flex-1 flex justify-between"
                      >
                        <span>{actualVal}</span>
                        <span className="text-xs text-muted-foreground">({val.count})</span>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}

        {/* Price Range Filter */}
        <AccordionItem value="price" className="border-b-0 mb-4">
          <AccordionTrigger className="py-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            <div className="flex flex-col gap-4 px-1 pb-2">
              <Slider
                min={0}
                max={20000}
                step={100}
                value={[
                  minPrice ? parseInt(minPrice) : 0,
                  maxPrice ? parseInt(maxPrice) : 20000
                ]}
                onValueChange={(val) => {
                  if (Array.isArray(val)) {
                    setMinPrice(val[0].toString());
                    setMaxPrice(val[1].toString());
                  } else {
                    setMinPrice(val.toString());
                  }
                }}
                className="my-2"
              />
              <div className="grid grid-cols-2 gap-2 items-center">
                <div>
                  <label className="text-[11px] text-muted-foreground mb-1 block">Min (₹)</label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-muted-foreground mb-1 block">Max (₹)</label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="20000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="h-8 text-xs"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Rating Filter */}
        <AccordionItem value="rating" className="border-b-0 mb-4">
          <AccordionTrigger className="py-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:no-underline">
            Rating
          </AccordionTrigger>
          <AccordionContent className="pt-2">
             <div className="flex flex-col gap-2 px-1">
               {[4, 3, 2].map(r => (
                  <div key={r} className="flex items-center space-x-3">
                    <Checkbox 
                      id={`rating-${r}`} 
                      checked={selectedRating === String(r)}
                      onCheckedChange={(checked) => updateFilters({ rating: checked ? String(r) : null })}
                    />
                    <Label htmlFor={`rating-${r}`} className="text-sm font-normal cursor-pointer flex items-center">
                       {r}★ & above
                    </Label>
                  </div>
               ))}
             </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Offers Filter */}
        <AccordionItem value="offers" className="border-b-0 mb-4">
          <AccordionTrigger className="py-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:no-underline">
            Offers & Discounts
          </AccordionTrigger>
          <AccordionContent className="pt-2">
             <div className="flex flex-col gap-2 px-1">
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="isDiscounted" 
                    checked={isDiscounted}
                    onCheckedChange={(checked) => updateFilters({ isDiscounted: checked ? "true" : null })}
                  />
                  <Label htmlFor="isDiscounted" className="text-sm font-normal cursor-pointer">
                      On Sale
                  </Label>
                </div>
             </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function ProductFilterSidebar(props: FilterSidebarProps) {
  const { className = "", ...filterProps } = props;

  return (
    <aside
      data-testid="filter-sidebar"
      className={`w-full lg:w-64 shrink-0 bg-card rounded-xl border border-border/60 p-5 shadow-xs max-h-[calc(100vh-8rem)] overflow-y-auto ${className}`}
    >
      <FilterControls {...filterProps} />
    </aside>
  );
}

export function MobileFilterDrawer(props: FilterSidebarProps) {
  const { totalResultsCount, ...filterProps } = props;
  const { searchParams } = useFilters();
  
  const activeFilterCount = Array.from(searchParams.keys()).filter(k => k !== 'sort' && k !== 'q' && k !== 'page').reduce((acc, key) => {
    return acc + searchParams.getAll(key).length;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger 
        render={
          <Button
            variant="outline"
            size="sm"
            data-testid="mobile-filter-button"
            className="lg:hidden flex items-center gap-2 h-9 border-border/80"
          />
        }
      >
        <Filter className="h-4 w-4 text-primary" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="inline-flex items-center justify-center bg-accent text-primary text-[10px] font-bold rounded-full h-4 w-4">
            {activeFilterCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] sm:max-w-md overflow-y-auto p-6">
        <SheetHeader className="p-0 mb-4 text-left">
          <SheetTitle className="text-lg font-serif font-bold text-primary">
            Filter Products
          </SheetTitle>
        </SheetHeader>

        <FilterControls
          {...filterProps}
        />

        <SheetFooter className="p-0 mt-6 pt-4 border-t border-border/60">
          <SheetClose 
            render={
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10" />
            }
          >
            Show {totalResultsCount} Results
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ProductFilterSidebar;

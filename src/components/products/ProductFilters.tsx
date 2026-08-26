'use client';

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "Corporate Gift Sets",
  "Executive Gifts",
  "Tech Gifts",
  "Drinkware",
  "Bags",
  "Stationery",
  "Personalized Gifts",
  "Eco-Friendly Gifts",
  "Gift Hampers"
];

const PRICE_TIERS = [
  "Under ₹500",
  "Under ₹1,000",
  "Under ₹2,500",
  "Under ₹5,000",
  "₹5,000–₹10,000",
  "₹10,000+"
];

const PRODUCT_OPTIONS = {
  Color: ["Black", "White", "Navy Blue", "Silver", "Gold", "Wood"],
  Material: ["Leather", "Metal", "Bamboo", "Canvas", "Ceramic", "Glass"],
  Packaging: ["Standard Box", "Premium Gift Box", "Eco-Friendly Tube", "Custom Sleeve"],
  Personalization: ["Laser Engraving", "Screen Printing", "Embossing", "UV Printing"]
};

const CORPORATE_REQ = {
  Occasion: ["Employee Welcome", "Client Appreciation", "Diwali", "New Year", "Events & Conferences", "Anniversary"],
  DeliveryTime: ["Ready to Ship (24h)", "Standard (3-5 Days)", "Custom (10-14 Days)"]
};

export function ProductFilters() {
  const router = useRouter();


  // Local state for instant updates (in a real app, these would sync with URL searchParams)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearCategories = () => setSelectedCategories([]);

  return (
    <div className="w-full bg-white border rounded-xl shadow-sm">
      <div className="p-5 border-b flex items-center justify-between">
        <h2 className="font-serif text-xl font-medium">Filters</h2>
        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-primary">
          Clear All
        </Button>
      </div>

      <Accordion className="w-full">
        
        {/* CATEGORY */}
        <AccordionItem value="category" className="border-b px-5">
          <AccordionTrigger className="hover:no-underline py-4 font-medium">
            Category
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              <div className="flex justify-end mb-2">
                {selectedCategories.length > 0 && (
                  <button onClick={clearCategories} className="text-xs text-primary hover:underline font-medium">
                    Clear ({selectedCategories.length})
                  </button>
                )}
              </div>
              {CATEGORIES.map((cat) => (
                <div key={cat} className="flex items-center space-x-3">
                  <Checkbox 
                    id={`cat-${cat}`} 
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={() => toggleCategory(cat)}
                  />
                  <Label htmlFor={`cat-${cat}`} className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {cat}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* PRICE */}
        <AccordionItem value="price" className="border-b px-5">
          <AccordionTrigger className="hover:no-underline py-4 font-medium">
            Price
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-4">
              <div className="space-y-3">
                {PRICE_TIERS.map((tier) => (
                  <div key={tier} className="flex items-center space-x-3">
                    <Checkbox id={`price-${tier}`} />
                    <Label htmlFor={`price-${tier}`} className="text-sm font-normal cursor-pointer leading-none">
                      {tier}
                    </Label>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Custom Range</Label>
                  <span className="text-xs text-muted-foreground font-medium bg-secondary px-2 py-1 rounded-md">
                    ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                  </span>
                </div>
                <Slider 
                  defaultValue={[0, 20000]} 
                  max={20000} 
                  step={500}
                  value={priceRange}
                  onValueChange={(val: number | readonly number[]) => {
                    if (Array.isArray(val)) {
                      setPriceRange([...val]);
                    } else {
                      setPriceRange([val as number, priceRange[1]]);
                    }
                  }}
                  className="mt-2"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* CORPORATE REQUIREMENTS */}
        <AccordionItem value="requirements" className="border-b px-5">
          <AccordionTrigger className="hover:no-underline py-4 font-medium">
            Corporate Requirements
          </AccordionTrigger>
          <AccordionContent className="pb-4 space-y-5">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Checkbox id="req-instock" />
                <Label htmlFor="req-instock" className="text-sm font-normal cursor-pointer leading-none">
                  In Stock Only
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox id="req-bulk" />
                <Label htmlFor="req-bulk" className="text-sm font-normal cursor-pointer leading-none">
                  Bulk Pricing Available
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Minimum Order Quantity (MOQ)</Label>
              <div className="space-y-3 pt-1">
                {['No Minimum (1+)', '10+ Units', '50+ Units', '100+ Units'].map((moq) => (
                  <div key={moq} className="flex items-center space-x-3">
                    <Checkbox id={`moq-${moq}`} />
                    <Label htmlFor={`moq-${moq}`} className="text-sm font-normal cursor-pointer leading-none">
                      {moq}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Occasion</Label>
              <div className="space-y-3 pt-1">
                {CORPORATE_REQ.Occasion.map((occ) => (
                  <div key={occ} className="flex items-center space-x-3">
                    <Checkbox id={`occ-${occ}`} />
                    <Label htmlFor={`occ-${occ}`} className="text-sm font-normal cursor-pointer leading-none">
                      {occ}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Delivery Time</Label>
              <div className="space-y-3 pt-1">
                {CORPORATE_REQ.DeliveryTime.map((time) => (
                  <div key={time} className="flex items-center space-x-3">
                    <Checkbox id={`del-${time}`} />
                    <Label htmlFor={`del-${time}`} className="text-sm font-normal cursor-pointer leading-none">
                      {time}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* PRODUCT OPTIONS */}
        <AccordionItem value="options" className="px-5 border-none">
          <AccordionTrigger className="hover:no-underline py-4 font-medium">
            Product Options
          </AccordionTrigger>
          <AccordionContent className="pb-4 space-y-5">
            {Object.entries(PRODUCT_OPTIONS).map(([groupName, options]) => (
              <div key={groupName} className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">{groupName}</Label>
                <div className="space-y-3 pt-1">
                  {options.map((opt) => (
                    <div key={opt} className="flex items-center space-x-3">
                      <Checkbox id={`opt-${opt}`} />
                      <Label htmlFor={`opt-${opt}`} className="text-sm font-normal cursor-pointer leading-none">
                        {opt}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

      </Accordion>

      <div className="p-5 border-t bg-gray-50/50">
        <Button className="w-full" size="lg" onClick={() => router.push(window.location.pathname)}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

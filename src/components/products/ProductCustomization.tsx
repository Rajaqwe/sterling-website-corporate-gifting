"use client";

import React from "react";
import { CustomizationOption } from "@/types/product";
import { Check, Palette } from "lucide-react";

interface ProductCustomizationProps {
  customizations: CustomizationOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  selectedPlacements?: Record<string, string>;
  onPlacementChange?: (customizationId: string, placement: string) => void;
}

export function ProductCustomization({
  customizations,
  selectedIds,
  onToggle,
  selectedPlacements = {},
  onPlacementChange,
}: ProductCustomizationProps) {
  if (!customizations || customizations.length === 0) return null;

  return (
    <div data-testid="product-customizations" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-accent" />
          <h3 className="text-sm font-serif font-bold text-primary">
            Custom Branding & Packaging
          </h3>
        </div>
        <span className="text-[11px] text-muted-foreground">Select one or more branding techniques</span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {customizations.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          const activePlacement =
            selectedPlacements[option.id] || option.placementOptions?.[0] || "";

          return (
            <div
              key={option.id}
              data-testid={`customization-option-${option.id}`}
              onClick={() => onToggle(option.id)}
              className={`flex flex-col p-3.5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20 shadow-xs"
                  : "border-border/60 bg-card hover:border-accent/50 hover:bg-secondary/20"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Checkbox indicator & Option Details */}
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`h-5 w-5 rounded-md flex items-center justify-center border mt-0.5 transition-colors shrink-0 ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/40 bg-background"
                    }`}
                  >
                    {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-foreground">
                        {option.name}
                      </span>
                      {option.isDefault && (
                        <span className="text-[10px] bg-accent/20 text-primary font-bold px-2 py-0.5 rounded-full">
                          Popular Choice
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </div>

                {/* Pricing Badges */}
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-primary block">
                    +${option.unitCost.toFixed(2)}{" "}
                    <span className="text-[10px] font-normal text-muted-foreground">/ unit</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground block">
                    +${option.setupFee.toFixed(2)} setup fee
                  </span>
                </div>
              </div>

              {/* Placement Options Sub-Selector (when selected) */}
              {isSelected && option.placementOptions && option.placementOptions.length > 1 && (
                <div
                  className="mt-3 pt-2.5 border-t border-border/40 flex items-center gap-2 flex-wrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-[11px] font-medium text-muted-foreground">
                    Placement:
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {option.placementOptions.map((placement) => (
                      <button
                        key={placement}
                        type="button"
                        onClick={() =>
                          onPlacementChange && onPlacementChange(option.id, placement)
                        }
                        className={`text-[11px] px-2.5 py-0.5 rounded-md border transition-all ${
                          activePlacement === placement
                            ? "border-primary bg-primary text-primary-foreground font-semibold"
                            : "border-border/60 bg-background text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {placement}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductCustomization;

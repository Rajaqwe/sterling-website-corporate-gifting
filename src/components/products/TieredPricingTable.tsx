"use client";

import React from "react";
import { PriceTier } from "@/types/product";
import { Check, Sparkles } from "lucide-react";
import { formatINR } from "@/lib/currency";

interface TieredPricingTableProps {
  priceTiers: PriceTier[];
  selectedQuantity: number;
  basePrice?: number;
  onSelectTierQuantity?: (minQty: number) => void;
}

export function TieredPricingTable({
  priceTiers,
  selectedQuantity,
  basePrice,
  onSelectTierQuantity,
}: TieredPricingTableProps) {
  if (!priceTiers || priceTiers.length === 0) return null;

  return (
    <div data-testid="tiered-pricing-table" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          <h3 className="text-sm font-serif font-bold text-primary">
            Tiered Volume Pricing
          </h3>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {basePrice ? `Starting base: ${formatINR(basePrice)} / unit • ` : ""}
          Unit price decreases with volume
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-secondary/70 border-b border-border/70 text-muted-foreground font-semibold">
              <th className="py-2.5 px-3.5">Quantity Tier</th>
              <th className="py-2.5 px-3.5">Unit Price</th>
              <th className="py-2.5 px-3.5 text-right">Savings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {priceTiers.map((tier, idx) => {
              // Determine if this tier is active for the current selected quantity
              const isMatch =
                selectedQuantity >= tier.minQuantity &&
                (tier.maxQuantity === null || selectedQuantity <= tier.maxQuantity);

              const rangeLabel =
                tier.maxQuantity !== null
                  ? `${tier.minQuantity} – ${tier.maxQuantity} units`
                  : `${tier.minQuantity}+ units`;

              const savings =
                tier.savingsPercent !== undefined && tier.savingsPercent > 0
                  ? `Save ${tier.savingsPercent}%`
                  : idx === 0
                  ? "Standard Bulk"
                  : "Standard";

              return (
                <tr
                  key={idx}
                  onClick={() => onSelectTierQuantity && onSelectTierQuantity(tier.minQuantity)}
                  className={`transition-colors cursor-pointer ${
                    isMatch
                      ? "bg-accent/15 font-semibold text-primary"
                      : "hover:bg-secondary/40 text-foreground"
                  }`}
                  data-active-tier={isMatch ? "true" : "false"}
                >
                  <td className="py-3 px-3.5 flex items-center gap-2">
                    {isMatch && (
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent text-primary">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                    )}
                    <span>{rangeLabel}</span>
                  </td>
                  <td className="py-3 px-3.5 font-bold">
                    {formatINR(tier.unitPrice)}{" "}
                    <span className="text-[10px] font-normal text-muted-foreground">/ unit</span>
                  </td>
                  <td className="py-3 px-3.5 text-right">
                    {tier.savingsPercent && tier.savingsPercent > 0 ? (
                      <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold text-[11px]">
                        {savings}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-[11px]">{savings}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TieredPricingTable;

"use client";

import React from "react";
import { QuoteCalculation, PriceTier } from "@/types/product";
import { Check, Sparkles, TrendingDown } from "lucide-react";
import { formatINR } from "@/lib/currency";

interface TieredPricingTableProps {
  priceTiers: PriceTier[];
  selectedQuantity: number;
  quoteCalculation?: QuoteCalculation;
  basePrice?: number;
  onSelectTierQuantity?: (minQty: number) => void;
}

export function TieredPricingTable({
  priceTiers,
  selectedQuantity,
  quoteCalculation,
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
                  role="button"
                  tabIndex={0}
                  aria-pressed={isMatch}
                  onClick={() => onSelectTierQuantity && onSelectTierQuantity(tier.minQuantity)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectTierQuantity && onSelectTierQuantity(tier.minQuantity);
                    }
                  }}
                  className={`transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
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

      {quoteCalculation?.opportunity?.nextTier && (
        <div className="mt-2 p-3 rounded-xl border border-accent/30 bg-accent/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold text-accent uppercase tracking-wider">Next Volume Tier</span>
            <span className="text-sm font-semibold text-foreground">
              {quoteCalculation.opportunity.nextTier.minQuantity} units → {formatINR(quoteCalculation.opportunity.nextUnitPrice || 0)} / unit
            </span>
          </div>
          <div className="flex flex-col sm:items-end gap-1 text-sm">
            <span className="text-muted-foreground">
              Add <strong className="text-foreground">{quoteCalculation.opportunity.unitsToNextTier}</strong> more units
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <TrendingDown className="h-3.5 w-3.5" />
              Save another {formatINR(quoteCalculation.opportunity.incrementalSavingsTotal || 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default TieredPricingTable;

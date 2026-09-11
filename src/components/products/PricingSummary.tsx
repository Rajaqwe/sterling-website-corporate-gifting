"use client";

import React from "react";
import { QuoteCalculation } from "@/types/product";
import { formatINR } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Send } from "lucide-react";

interface PricingSummaryProps {
  quoteCalculation: QuoteCalculation;
  productName: string;
  moq: number;
  onAddToCart?: () => void;
  isAddingToCart?: boolean;
  onRequestQuote?: () => void;
}

export function PricingSummary({
  quoteCalculation,
  productName,
  moq,
  onAddToCart,
  isAddingToCart,
  onRequestQuote,
}: PricingSummaryProps) {
  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-card border border-border/80 shadow-md sticky top-24">
      <div className="flex flex-col gap-1 border-b border-border/60 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Estimated Order Value
        </span>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-3xl font-serif font-bold text-primary">
            {formatINR(quoteCalculation.estimatedTotal)}
          </span>
          <div className="text-right flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              {formatINR(quoteCalculation.effectiveUnitCost)} / unit
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-xs">
        <div className="flex justify-between text-muted-foreground">
          <span>{quoteCalculation.quantity} units (Base)</span>
          <span className="font-medium text-foreground">{formatINR(quoteCalculation.productSubtotal)}</span>
        </div>
        {quoteCalculation.customizationSetupTotal > 0 && (
          <div className="flex justify-between text-muted-foreground">
            <span>Setup Fees</span>
            <span className="font-medium text-foreground">+{formatINR(quoteCalculation.customizationSetupTotal)}</span>
          </div>
        )}
        {quoteCalculation.customizationUnitTotal > 0 && (
          <div className="flex justify-between text-muted-foreground">
            <span>Branding</span>
            <span className="font-medium text-foreground">+{formatINR(quoteCalculation.customizationUnitTotal)}</span>
          </div>
        )}
        {quoteCalculation.savingsTotal > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold pt-1 border-t border-border/40">
            <span>Volume Savings</span>
            <span>-{formatINR(quoteCalculation.savingsTotal)}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {onAddToCart && (
          <Button
            size="lg"
            onClick={onAddToCart}
            disabled={isAddingToCart}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-bold shadow-sm transition-colors text-sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        )}
        {onRequestQuote && (
          <Button
            onClick={onRequestQuote}
            variant="outline"
            className="w-full border-accent text-accent-foreground hover:bg-accent/10 h-12 font-bold transition-colors text-sm"
          >
            <Send className="mr-2 h-4 w-4" />
            Get Custom Quote
          </Button>
        )}
      </div>
    </div>
  );
}

export default PricingSummary;

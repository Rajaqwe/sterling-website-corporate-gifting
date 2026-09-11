"use client";

import React, { useState, useMemo, useTransition } from "react";
import { ProductCustomization } from "@/components/products/ProductCustomization";
import { TieredPricingTable } from "@/components/products/TieredPricingTable";
import { PricingSummary } from "@/components/products/PricingSummary";
import { QuoteRequestModal } from "@/components/products/QuoteRequestModal";
import { LogoMockupPreview } from "@/components/products/LogoMockupPreview";
import { calculateProductPricing } from "@/lib/utils/pricing";
import { ProductConfiguration } from "@/types/product";
import { useCart } from "@/components/cart/CartContext";
import { addToCart } from "@/app/products/actions";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const DynamicLogoMockupPreview = dynamic(
  () => import("@/components/products/LogoMockupPreview").then(m => m.LogoMockupPreview),
  {
    ssr: false,
    loading: () => <div className="aspect-square w-full bg-secondary/50 animate-pulse rounded-xl" />,
  }
);

interface ProductConfiguratorClientProps {
  product: any;
  availableCustomizations: any[];
  initialVariantId: string;
}

export function ProductConfiguratorClient({
  product,
  availableCustomizations,
  initialVariantId
}: ProductConfiguratorClientProps) {
  const [quantity, setQuantity] = useState<number>(product.minimumOrderQuantity);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(initialVariantId);
  
  const [selectedCustomizationIds, setSelectedCustomizationIds] = useState<string[]>(() => {
    const defaults = availableCustomizations.filter((c: any) => c.isDefault).map((c: any) => c.id);
    return defaults.length > 0 ? defaults : availableCustomizations.slice(0, 1).map((c: any) => c.id);
  });

  const [selectedPlacements, setSelectedPlacements] = useState<Record<string, string>>({});
  const [artworkAssetIds, setArtworkAssetIds] = useState<string[]>([]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const [isPending, startTransition] = useTransition();
  const { incrementCart } = useCart();

  const selectedVariant = product.variants?.find((v: any) => v.id === selectedVariantId);
  const selectedCustomizations = availableCustomizations.filter((c: any) =>
    selectedCustomizationIds.includes(c.id)
  );

  const configuration: ProductConfiguration = {
    quantity,
    variantId: selectedVariantId,
    customizations: selectedCustomizationIds.map(id => ({
      customizationId: id,
      placement: selectedPlacements[id]
    })),
    artworkAssetIds
  };

  const quoteCalculation = useMemo(() => {
    return calculateProductPricing({
      product,
      quantity,
      variant: selectedVariant,
      customizations: selectedCustomizations
    });
  }, [product, quantity, selectedVariant, selectedCustomizations]);

  const handleToggleCustomization = (id: string) => {
    setSelectedCustomizationIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handlePlacementChange = (customizationId: string, placement: string) => {
    setSelectedPlacements((prev) => ({ ...prev, [customizationId]: placement }));
  };

  const handleSelectTierQuantity = (minQty: number) => {
    setQuantity(minQty);
  };

  const handleAddToCart = async () => {
    incrementCart(quantity);
    
    startTransition(async () => {
      const res = await addToCart(product.id, quantity, selectedVariantId, configuration);
      if (res.success) {
        toast.success("Added to cart successfully!");
      } else {
        incrementCart(-quantity);
        toast.error(res.error || "Failed to add to cart");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      <div className="lg:col-span-7 flex flex-col gap-10">
        {product.brandingAvailable !== false && (
          <DynamicLogoMockupPreview 
            productImageSrc={product.media?.find((m: any) => m.isPrimary)?.url || product.media?.[0]?.url || "/placeholder-product.jpg"} 
          />
        )}
      </div>

      <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
        <div className="p-6 rounded-2xl bg-surface-elevated border border-border/40 shadow-sm flex flex-col gap-6">
          {product.variants && product.variants.length > 1 && (
            <div className="flex flex-col gap-3 mb-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">
                  Colorway / Material Finish
                </span>
                <span className="text-muted-foreground">
                  {selectedVariant?.name || "Select finish"}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {product.variants.map((variant: any) => {
                  const isSelected = selectedVariantId === variant.id;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-sm scale-[0.98]"
                          : "border-border/60 bg-background text-foreground hover:bg-secondary/60 hover:-translate-y-[1px]"
                        }`}
                    >
                      {variant.colorHex && (
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: variant.colorHex }}
                        />
                      )}
                      <span>{variant.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <ProductCustomization
            customizations={availableCustomizations}
            selectedIds={selectedCustomizationIds}
            onToggle={handleToggleCustomization}
            selectedPlacements={selectedPlacements}
            onPlacementChange={handlePlacementChange}
          />

          <div className="pt-6 border-t border-border/50">
            <TieredPricingTable
              priceTiers={product.bulkPricingTiers || []}
              selectedQuantity={quantity}
              quoteCalculation={quoteCalculation}
              basePrice={Number(product.price)}
              onSelectTierQuantity={handleSelectTierQuantity}
            />
          </div>
          
          <div className="pt-2">
            <PricingSummary
              quoteCalculation={quoteCalculation}
              productName={product.name}
              moq={product.minimumOrderQuantity}
              onAddToCart={handleAddToCart}
              isAddingToCart={isPending}
              onRequestQuote={() => setIsQuoteModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <QuoteRequestModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)}
        product={product}
        configuration={configuration}
        quoteCalculation={quoteCalculation}
      />
    </div>
  );
}

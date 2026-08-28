import { QuoteCalculation, PriceTier } from "@/types/product";

export interface PricingProduct {
  price?: number | string | null;
  minimumOrderQuantity?: number | null;
  bulkPricingTiers?: {
    minQuantity: number;
    maxQuantity: number | null;
    price: number | string;
  }[];
  brandingOptions?: any[];
}

export type PricingCustomization = string | {
  id?: string;
  setupFee?: number | string | null;
  additionalCost?: number | string | null;
  unitCost?: number | string | null;
};

/**
 * Calculates real-time tiered volume pricing and customization costs
 * using the Prisma Product shape.
 */
export function calculateQuotePricing(
  product: PricingProduct,
  quantity: number,
  selectedCustomizations: PricingCustomization[] = []
): QuoteCalculation {
  const moq = product.minimumOrderQuantity || 1;
  const isMoqSatisfied = quantity >= moq;
  const isBelowMoq = !isMoqSatisfied;

  const basePrice = Number(product.price || 0);

  // Resolve matching price tier
  const tiers = product.bulkPricingTiers || [];
  let activeTier: PriceTier = tiers.length > 0 ? {
    minQuantity: tiers[0].minQuantity,
    maxQuantity: tiers[0].maxQuantity,
    unitPrice: Number(tiers[0].price),
    savingsPercent: 0,
  } : {
    minQuantity: moq,
    maxQuantity: null,
    unitPrice: basePrice,
    savingsPercent: 0,
  };

  for (const tier of tiers) {
    if (quantity >= tier.minQuantity) {
      if (tier.maxQuantity === null || quantity <= tier.maxQuantity) {
        activeTier = {
          minQuantity: tier.minQuantity,
          maxQuantity: tier.maxQuantity,
          unitPrice: Number(tier.price),
          savingsPercent: 0
        };
        // We do NOT break here because tiers might be out of order, 
        // though typically they are ordered. We want the highest matching tier.
        // Actually since we rely on order, let's keep the highest minQuantity that matches
      }
    }
  }

  const baseUnitPrice = basePrice;
  const tierUnitPrice = activeTier.unitPrice;
  const productSubtotal = tierUnitPrice * quantity;

  // Resolve selected customizations
  const availableCustomizations = product.brandingOptions || [];
  const resolvedCustomizations: PricingCustomization[] = [];

  for (const item of selectedCustomizations) {
    const itemId = typeof item === "string" ? item : item.id;
    const match = availableCustomizations.find((c: PricingCustomization & { brandingOptionId?: string, brandingOption?: any }) => {
       const cid = typeof c === "string" ? c : c.id;
       return cid === itemId || (typeof c === "object" && c !== null && ('brandingOptionId' in c ? c.brandingOptionId === itemId : false)) || (typeof c === "object" && c !== null && ('brandingOption' in c && c.brandingOption ? c.brandingOption.id === itemId : false));
    });
    if (match) {
      // Handle joined table structure (ProductBrandingOption) vs Direct BrandingOption
      resolvedCustomizations.push(match.brandingOption || match);
    } else if (typeof item === "object") {
      resolvedCustomizations.push(item as any);
    }
  }

  let customizationSetupTotal = 0;
  let customizationUnitTotal = 0;

  for (const opt of resolvedCustomizations) {
    if (typeof opt === "object" && opt !== null) {
      customizationSetupTotal += Number(opt.setupFee || 0);
      customizationUnitTotal += Number(opt.additionalCost || opt.unitCost || 0) * quantity;
    }
  }

  const customizationSubtotal = customizationSetupTotal + customizationUnitTotal;
  const estimatedTotal = productSubtotal + customizationSubtotal;
  const effectiveUnitCost = quantity > 0 ? Number((estimatedTotal / quantity).toFixed(2)) : 0;

  // Calculate savings vs base price
  const baseSubtotal = baseUnitPrice * quantity;
  const savingsTotal = Math.max(0, baseSubtotal - productSubtotal);
  const savingsPercent = baseUnitPrice > 0 ? Math.round(((baseUnitPrice - tierUnitPrice) / baseUnitPrice) * 100) : 0;
  
  activeTier.savingsPercent = savingsPercent;

  return {
    quantity,
    baseUnitPrice,
    tierUnitPrice,
    unitPrice: tierUnitPrice,
    productSubtotal,
    customizationSetupTotal,
    customizationUnitTotal,
    customizationSubtotal,
    setupFeesTotal: customizationSetupTotal,
    estimatedTotal,
    effectiveUnitCost,
    savingsPercent,
    savingsTotal,
    isMoqSatisfied,
    isBelowMoq,
    activeTier,
  };
}

import { QuoteCalculation, PriceTier } from "@/types/product";
import { Money } from "@/lib/money";

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

  const basePriceMoney = Money.fromDecimal(product.price || 0);

  // Resolve matching price tier
  const tiers = product.bulkPricingTiers || [];
  let activeTier: PriceTier = tiers.length > 0 ? {
    minQuantity: tiers[0].minQuantity,
    maxQuantity: tiers[0].maxQuantity,
    unitPrice: Money.fromDecimal(tiers[0].price).toPaise() / 100, // Kept as number for output schema compatibility
    savingsPercent: 0,
  } : {
    minQuantity: moq,
    maxQuantity: null,
    unitPrice: basePriceMoney.toPaise() / 100,
    savingsPercent: 0,
  };

  let activeTierMoney = Money.fromDecimal(activeTier.unitPrice);

  for (const tier of tiers) {
    if (quantity >= tier.minQuantity) {
      if (tier.maxQuantity === null || quantity <= tier.maxQuantity) {
        activeTier = {
          minQuantity: tier.minQuantity,
          maxQuantity: tier.maxQuantity,
          unitPrice: Money.fromDecimal(tier.price).toPaise() / 100,
          savingsPercent: 0
        };
        activeTierMoney = Money.fromDecimal(tier.price);
      }
    }
  }

  const baseUnitPrice = basePriceMoney.toPaise() / 100;
  const tierUnitPrice = activeTierMoney.toPaise() / 100;
  const productSubtotalMoney = activeTierMoney.multiply(quantity);

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
      resolvedCustomizations.push(match.brandingOption || match);
    } else if (typeof item === "object") {
      resolvedCustomizations.push(item as any);
    }
  }

  let customizationSetupTotalMoney = Money.fromInteger(0);
  let customizationUnitTotalMoney = Money.fromInteger(0);

  for (const opt of resolvedCustomizations) {
    if (typeof opt === "object" && opt !== null) {
      customizationSetupTotalMoney = customizationSetupTotalMoney.add(Money.fromDecimal(opt.setupFee || 0));
      const unitCost = Money.fromDecimal(opt.additionalCost || opt.unitCost || 0);
      customizationUnitTotalMoney = customizationUnitTotalMoney.add(unitCost.multiply(quantity));
    }
  }

  const customizationSubtotalMoney = customizationSetupTotalMoney.add(customizationUnitTotalMoney);
  const estimatedTotalMoney = productSubtotalMoney.add(customizationSubtotalMoney);
  
  const effectiveUnitCostMoney = quantity > 0 
    ? estimatedTotalMoney.divide(quantity) 
    : Money.fromInteger(0);

  // Calculate savings vs base price
  const baseSubtotalMoney = basePriceMoney.multiply(quantity);
  const savingsTotalMoney = baseSubtotalMoney.subtract(productSubtotalMoney);
  
  // Percent math is fine with floats
  const savingsPercent = baseUnitPrice > 0 
    ? Math.round(((baseUnitPrice - tierUnitPrice) / baseUnitPrice) * 100) 
    : 0;
  
  activeTier.savingsPercent = savingsPercent;

  return {
    quantity,
    baseUnitPrice,
    tierUnitPrice,
    unitPrice: tierUnitPrice,
    productSubtotal: productSubtotalMoney.toPaise() / 100,
    customizationSetupTotal: customizationSetupTotalMoney.toPaise() / 100,
    customizationUnitTotal: customizationUnitTotalMoney.toPaise() / 100,
    customizationSubtotal: customizationSubtotalMoney.toPaise() / 100,
    setupFeesTotal: customizationSetupTotalMoney.toPaise() / 100,
    estimatedTotal: estimatedTotalMoney.toPaise() / 100,
    effectiveUnitCost: effectiveUnitCostMoney.toPaise() / 100,
    savingsPercent,
    savingsTotal: Math.max(0, savingsTotalMoney.toPaise() / 100),
    isMoqSatisfied,
    isBelowMoq,
    activeTier,
  };
}

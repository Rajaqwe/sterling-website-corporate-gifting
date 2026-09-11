import { QuoteCalculation, PriceTier, PricingOpportunity, CustomizationOption } from "@/types/product";
import { Money } from "@/lib/money";

export interface PricingProduct {
  price?: number | string | null;
  minimumOrderQuantity?: number | null;
  bulkPricingTiers?: {
    minQuantity: number;
    maxQuantity: number | null;
    price: number | string;
  }[];
  brandingOptions?: CustomizationOption[];
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
export function calculateProductPricing({
  product,
  quantity,
  variant,
  customizations = [],
}: {
  product: PricingProduct;
  quantity: number;
  variant?: { price?: number | string | any | null } | null;
  customizations?: PricingCustomization[];
}): QuoteCalculation {
  // P1.6: Harden pricing-domain validation
  if (typeof quantity !== 'number' || isNaN(quantity) || !isFinite(quantity)) {
    throw new Error("Quantity must be a valid number");
  }
  if (quantity < 1 || !Number.isInteger(quantity)) {
    throw new Error("Quantity must be a positive integer");
  }

  const moq = product.minimumOrderQuantity || 1;
  const isMoqSatisfied = quantity >= moq;
  const isBelowMoq = !isMoqSatisfied;

  const productPrice = Number(product.price || 0);
  if (productPrice < 0) throw new Error("Product price cannot be negative");

  const baseProductPriceMoney = Money.fromDecimal(productPrice);
  const variantPrice = variant?.price != null ? Number(variant.price) : productPrice;
  if (variantPrice < 0) throw new Error("Variant price cannot be negative");

  const variantPriceMoney = Money.fromDecimal(variantPrice);
  const basePriceMoney = variantPriceMoney;

  // Resolve matching price tier
  const rawTiers = product.bulkPricingTiers || [];
  // Validate tiers
  for (const tier of rawTiers) {
    if (tier.minQuantity < 1) throw new Error("Tier minQuantity must be >= 1");
    if (tier.maxQuantity !== null && tier.maxQuantity < tier.minQuantity) {
      throw new Error("Tier maxQuantity must be >= minQuantity");
    }
  }

  const tiers = [...rawTiers].sort((a, b) => a.minQuantity - b.minQuantity);
  
  let activeTier: PriceTier = tiers.length > 0 ? {
    minQuantity: tiers[0].minQuantity,
    maxQuantity: tiers[0].maxQuantity,
    unitPrice: Money.fromDecimal(Number(tiers[0].price)).toPaise() / 100,
    savingsPercent: 0,
  } : {
    minQuantity: moq,
    maxQuantity: null,
    unitPrice: basePriceMoney.toPaise() / 100,
    savingsPercent: 0,
  };

  let activeTierMoney = Money.fromDecimal(activeTier.unitPrice);
  let nextTierIndex = -1;

  for (let i = 0; i < tiers.length; i++) {
    const tier = tiers[i];
    if (quantity >= tier.minQuantity) {
      if (tier.maxQuantity === null || quantity <= tier.maxQuantity) {
        activeTier = {
          minQuantity: tier.minQuantity,
          maxQuantity: tier.maxQuantity,
          unitPrice: Money.fromDecimal(Number(tier.price)).toPaise() / 100,
          savingsPercent: 0
        };
        activeTierMoney = Money.fromDecimal(Number(tier.price));
        nextTierIndex = i + 1;
      }
    }
  }

  const baseUnitPrice = basePriceMoney.toPaise() / 100;
  
  // P1.7 Explicitly define variant + bulk-tier pricing rules
  // Business Rule: Variant price applies base bulk discount proportionally.
  let activeTierUnitPrice = activeTierMoney.toPaise() / 100;
  if (variant?.price != null && baseProductPriceMoney.toPaise() > 0) {
    const discountRatio = activeTierUnitPrice / (baseProductPriceMoney.toPaise() / 100);
    activeTierUnitPrice = baseUnitPrice * discountRatio;
    activeTierMoney = Money.fromDecimal(activeTierUnitPrice);
    activeTier.unitPrice = activeTierUnitPrice;
  }

  const tierUnitPrice = activeTierUnitPrice;
  const productSubtotalMoney = activeTierMoney.multiply(quantity);

  // Resolve selected customizations
  const availableCustomizations = product.brandingOptions || [];
  const resolvedCustomizations: PricingCustomization[] = [];

  for (const item of customizations) {
    const itemId = typeof item === "string" ? item : item.id;
    const match = availableCustomizations.find((c: any) => {
       const cid = typeof c === "string" ? c : c.id;
       return cid === itemId || (typeof c === "object" && c !== null && ('brandingOptionId' in c ? c.brandingOptionId === itemId : false)) || (typeof c === "object" && c !== null && ('brandingOption' in c && c.brandingOption ? c.brandingOption.id === itemId : false));
    });
    if (match) {
      resolvedCustomizations.push((match as any).brandingOption || match);
    } else if (typeof item === "object") {
      resolvedCustomizations.push(item as any);
    }
  }

  let customizationSetupTotalMoney = Money.fromInteger(0);
  let customizationUnitTotalMoney = Money.fromInteger(0);

  for (const opt of resolvedCustomizations) {
    if (typeof opt === "object" && opt !== null) {
      const setupFee = Number(opt.setupFee || 0);
      if (setupFee < 0) throw new Error("Customization setup fee cannot be negative");
      customizationSetupTotalMoney = customizationSetupTotalMoney.add(Money.fromDecimal(setupFee));
      
      const unitCostRaw = opt.additionalCost !== undefined ? opt.additionalCost : opt.unitCost;
      const unitCost = Number(unitCostRaw || 0);
      if (unitCost < 0) throw new Error("Customization unit cost cannot be negative");
      customizationUnitTotalMoney = customizationUnitTotalMoney.add(Money.fromDecimal(unitCost).multiply(quantity));
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
  
  const savingsPercent = baseUnitPrice > 0 
    ? Math.round(((baseUnitPrice - tierUnitPrice) / baseUnitPrice) * 100) 
    : 0;
  
  activeTier.savingsPercent = savingsPercent;

  // PricingOpportunity calculation
  let opportunity: PricingOpportunity | undefined;
  if (nextTierIndex >= 0 && nextTierIndex < tiers.length) {
    const nextTierRaw = tiers[nextTierIndex];
    
    // Apply the same variant proportional discount rule for the next tier
    let nextTierBasePrice = Money.fromDecimal(Number(nextTierRaw.price)).toPaise() / 100;
    if (variant?.price != null && baseProductPriceMoney.toPaise() > 0) {
      const nextDiscountRatio = nextTierBasePrice / (baseProductPriceMoney.toPaise() / 100);
      nextTierBasePrice = baseUnitPrice * nextDiscountRatio;
    }

    const nextTier: PriceTier = {
      minQuantity: nextTierRaw.minQuantity,
      maxQuantity: nextTierRaw.maxQuantity,
      unitPrice: nextTierBasePrice,
      savingsPercent: baseUnitPrice > 0 ? Math.round(((baseUnitPrice - nextTierBasePrice) / baseUnitPrice) * 100) : 0
    };

    const nextQty = nextTier.minQuantity;
    const additionalUnits = nextQty - quantity;
    
    // incremental savings per unit is the difference in unit price
    const incSavingsPerUnit = tierUnitPrice - nextTierBasePrice;
    
    // If they order `nextQty` units instead of `quantity` units, how much more do they save in total?
    // Savings at current qty = savingsTotalMoney
    // Savings at next qty = basePriceMoney.multiply(nextQty) - activeTierMoney(nextQty) 
    // Wait, incremental savings total = difference in total savings, or difference in total cost?
    // "Add 250 units, Save another ₹13,250" usually means extra savings vs buying those extra units at current price.
    // Let's define it as total savings at nextQty - total savings at currentQty
    const nextSubtotalBase = basePriceMoney.multiply(nextQty);
    const nextSubtotalDiscounted = Money.fromDecimal(nextTierBasePrice).multiply(nextQty);
    const nextSavingsTotal = nextSubtotalBase.subtract(nextSubtotalDiscounted);
    const incSavingsTotal = nextSavingsTotal.subtract(savingsTotalMoney);

    opportunity = {
      currentTier: activeTier,
      nextTier: nextTier,
      unitsToNextTier: additionalUnits,
      currentUnitPrice: tierUnitPrice,
      nextUnitPrice: nextTierBasePrice,
      incrementalSavingsPerUnit: incSavingsPerUnit,
      incrementalSavingsTotal: incSavingsTotal.toPaise() / 100
    };
  } else {
    opportunity = {
      currentTier: activeTier,
      nextTier: null,
      unitsToNextTier: null,
      currentUnitPrice: tierUnitPrice,
      nextUnitPrice: null,
      incrementalSavingsPerUnit: null,
      incrementalSavingsTotal: null
    };
  }

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
    opportunity
  };
}

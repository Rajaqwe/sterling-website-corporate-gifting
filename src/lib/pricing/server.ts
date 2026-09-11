import { prisma } from "@/lib/prisma/client";
import { calculateProductPricing } from "@/lib/utils/pricing";

export function validateBulkPricingTiers(tiers: { minQuantity: number; maxQuantity: number | null; price: any }[]) {
  if (!tiers || tiers.length === 0) return true;

  const sorted = [...tiers].sort((a, b) => a.minQuantity - b.minQuantity);
  let openEndedCount = 0;

  for (let i = 0; i < sorted.length; i++) {
    const tier = sorted[i];
    
    if (tier.minQuantity < 1) throw new Error("Tier minQuantity must be at least 1.");
    if (Number(tier.price) < 0) throw new Error("Tier price cannot be negative.");
    
    if (tier.maxQuantity !== null) {
      if (tier.maxQuantity < tier.minQuantity) {
        throw new Error(`Tier maxQuantity (${tier.maxQuantity}) cannot be less than minQuantity (${tier.minQuantity}).`);
      }
    } else {
      openEndedCount++;
    }

    if (openEndedCount > 1) {
      throw new Error("Only one open-ended tier is allowed.");
    }

    if (i > 0) {
      const prevTier = sorted[i - 1];
      if (prevTier.maxQuantity === null) {
        throw new Error("An open-ended tier must be the last tier.");
      }
      if (tier.minQuantity <= prevTier.maxQuantity) {
        throw new Error(`Tier overlaps: Tier minQuantity (${tier.minQuantity}) is less than or equal to previous tier maxQuantity (${prevTier.maxQuantity}).`);
      }
    }
  }

  return true;
}

export async function calculateServerProductTotal(
  productId: string,
  quantity: number,
  selectedCustomizationIds: string[] = [],
  variantId?: string
) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      // Always fetch tiers in ascending minQuantity order so the loop below
      // is deterministic regardless of DB insertion order or provider.
      bulkPricingTiers: { orderBy: { minQuantity: 'asc' } },
      brandingOptions: {
        include: {
          brandingOption: true,
        },
      },
      variants: variantId ? { where: { id: variantId } } : false,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (quantity < product.minimumOrderQuantity) {
    throw new Error(`Quantity ${quantity} is below minimum order quantity ${product.minimumOrderQuantity}`);
  }

  const variant = variantId && product.variants ? product.variants[0] : null;

  // Map selectedCustomizationIds to full option objects so calculateProductPricing can process them
  const selectedCustomizations = selectedCustomizationIds.map(id => {
    const opt = product.brandingOptions.find(o => o.brandingOptionId === id);
    return opt ? opt.brandingOption : id;
  });

  const pricing = calculateProductPricing({
    product: product as any,
    quantity,
    variant,
    customizations: selectedCustomizations as any,
  });

  return {
    baseUnitPrice: pricing.baseUnitPrice,
    tierUnitPrice: pricing.tierUnitPrice,
    productSubtotal: pricing.productSubtotal,
    customizationSetupTotal: pricing.customizationSetupTotal,
    customizationUnitTotal: pricing.customizationUnitTotal,
    customizationSubtotal: pricing.customizationSubtotal,
    total: pricing.estimatedTotal,
    product,
  };
}

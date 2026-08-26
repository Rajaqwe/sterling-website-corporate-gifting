import { prisma } from "@/lib/prisma/client";

export async function calculateServerProductTotal(
  productId: string,
  quantity: number,
  selectedCustomizationIds: string[] = []
) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      bulkPricingTiers: true,
      brandingOptions: {
        include: {
          brandingOption: true,
        },
      },
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (quantity < product.minimumOrderQuantity) {
    throw new Error(`Quantity ${quantity} is below minimum order quantity ${product.minimumOrderQuantity}`);
  }

  // 1. Calculate Base Price based on volume tier
  let activeTier = product.bulkPricingTiers[0] || {
    minQuantity: product.minimumOrderQuantity,
    maxQuantity: null,
    price: product.price,
  };

  for (const tier of product.bulkPricingTiers) {
    if (quantity >= tier.minQuantity) {
      if (tier.maxQuantity === null || quantity <= tier.maxQuantity) {
        activeTier = tier;
        break;
      }
    }
  }

  // If quantity is higher than the max of all defined tiers, select highest bracket
  if (product.bulkPricingTiers.length > 0) {
    const highestTier = product.bulkPricingTiers.sort((a, b) => b.minQuantity - a.minQuantity)[0];
    if (quantity >= highestTier.minQuantity) {
      activeTier = highestTier;
    }
  }

  const tierUnitPrice = Number(activeTier.price);
  const productSubtotal = tierUnitPrice * quantity;

  // 2. Calculate Customizations Setup Fees & Unit Costs
  let customizationSetupTotal = 0;
  let customizationUnitTotal = 0;

  for (const id of selectedCustomizationIds) {
    const option = product.brandingOptions.find(o => o.brandingOptionId === id);
    if (option) {
      customizationSetupTotal += 0; // BrandingOption schema doesn't have a setup fee
      customizationUnitTotal += (Number(option.brandingOption.additionalCost || 0) * quantity);
    }
  }

  const customizationSubtotal = customizationSetupTotal + customizationUnitTotal;
  const total = productSubtotal + customizationSubtotal;

  return {
    baseUnitPrice: Number(product.price),
    tierUnitPrice,
    productSubtotal,
    customizationSetupTotal,
    customizationUnitTotal,
    customizationSubtotal,
    total,
    product,
  };
}

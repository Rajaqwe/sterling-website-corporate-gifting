import { Prisma } from "@prisma/client";

export type LineItemInput = {
  quantity: number;
  productId: string;
  variantId?: string | null;
  product: {
    price: Prisma.Decimal | number | string;
    bulkPricingTiers?: {
      minQuantity: number;
      maxQuantity: number | null;
      price: Prisma.Decimal | number | string;
    }[];
  };
  variant?: {
    price?: Prisma.Decimal | number | string | null;
  } | null;
};

import { calculateProductPricing } from "@/lib/utils/pricing";

/**
 * Calculates the correct unit price for a line item, taking into account
 * variant pricing and bulk quantity discounts.
 */
export function getLineItemPrice(item: LineItemInput): number {
  const calculation = calculateProductPricing({
    product: item.product as any,
    quantity: item.quantity,
    variant: item.variant,
    customizations: [],
  });

  return calculation.unitPrice;
}

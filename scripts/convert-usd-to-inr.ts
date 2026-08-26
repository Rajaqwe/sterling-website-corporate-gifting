import "dotenv/config";
import { prisma } from "../src/lib/prisma/client";
import { EXCHANGE_RATE_USD_TO_INR } from "../src/lib/currency";

const USD_THRESHOLD = 500; // Assume anything less than 500 is USD.

async function main() {
  console.log("Starting USD to INR Database Migration...");
  console.log(`Using Exchange Rate: 1 USD = ${EXCHANGE_RATE_USD_TO_INR} INR`);

  const products = await prisma.product.findMany({
    include: {
      variants: true,
      bulkPricingTiers: true,
      brandingOptions: true
    }
  });

  for (const p of products) {
    const currentPrice = Number(p.price);
    
    // Only convert if it looks like a USD price (e.g. less than 500)
    // because some seeded products are already in INR (e.g. 3500)
    if (currentPrice < USD_THRESHOLD) {
      const newPrice = currentPrice * EXCHANGE_RATE_USD_TO_INR;
      
      const updateData: any = { price: newPrice };
      if (p.compareAtPrice && Number(p.compareAtPrice) < USD_THRESHOLD) {
        updateData.compareAtPrice = Number(p.compareAtPrice) * EXCHANGE_RATE_USD_TO_INR;
      }

      await prisma.product.update({
        where: { id: p.id },
        data: updateData
      });
      
      console.log(`Converted Product: ${p.name} | $${currentPrice} -> ₹${newPrice}`);

      // Convert Variants
      for (const v of p.variants) {
        if (v.price && Number(v.price) < USD_THRESHOLD) {
          await prisma.productVariant.update({
            where: { id: v.id },
            data: { price: Number(v.price) * EXCHANGE_RATE_USD_TO_INR }
          });
        }
      }

      // Convert Bulk Tiers
      for (const t of p.bulkPricingTiers) {
        if (Number(t.price) < USD_THRESHOLD) {
          await prisma.bulkPricingTier.update({
            where: { id: t.id },
            data: { price: Number(t.price) * EXCHANGE_RATE_USD_TO_INR }
          });
        }
      }
    }
  }

  // Branding Options
  const brandingOptions = await prisma.brandingOption.findMany();
  for (const bo of brandingOptions) {
    if (Number(bo.additionalCost) > 0 && Number(bo.additionalCost) < USD_THRESHOLD) {
      await prisma.brandingOption.update({
        where: { id: bo.id },
        data: { additionalCost: Number(bo.additionalCost) * EXCHANGE_RATE_USD_TO_INR }
      });
    }
  }

  console.log("Migration Complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());

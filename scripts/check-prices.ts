import "dotenv/config";
import { prisma } from "../src/lib/prisma/client";

async function main() {
  const products = await prisma.product.findMany({
    select: { name: true, price: true },
    take: 10
  });
  console.log(products);
}
main().catch(console.error);

import { prisma } from "@/lib/prisma/client";
import { ProductForm } from "./ProductForm";
import { seedCategoriesIfEmpty } from "../actions";

export default async function NewProductPage() {
  // Ensure we have categories for the user to select from
  await seedCategoriesIfEmpty();
  
  // Fetch active categories
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  });

  const brandingOptionsRaw = await prisma.brandingOption.findMany({
    where: { isActive: true },
    select: { id: true, name: true, additionalCost: true },
    orderBy: { name: 'asc' }
  });

  const safeBrandingOptions = JSON.parse(JSON.stringify(brandingOptionsRaw, (key, value) =>
    typeof value === 'object' && value !== null && value.d !== undefined && value.e !== undefined
      ? value.toString()
      : value
  ));

  return (
    <div className="pb-10">
      <ProductForm categories={categories} brandingOptions={safeBrandingOptions} />
    </div>
  );
}

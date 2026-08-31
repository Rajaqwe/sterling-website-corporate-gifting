import { prisma } from "@/lib/prisma/client";
import { ProductForm } from "../new/ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      media: {
        orderBy: { sortOrder: 'asc' }
      },
      brandingOptions: true,
      reviews: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!product) {
    notFound();
  }

  // Fetch active categories
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  });

  // Fetch branding options
  const brandingOptions = await prisma.brandingOption.findMany({
    where: { isActive: true },
    select: { id: true, name: true, additionalCost: true },
    orderBy: { name: 'asc' }
  });

  // We must serialize the product to plain JSON to avoid Decimal/Date errors from Server to Client component boundary
  const safeProduct = JSON.parse(JSON.stringify(product, (key, value) =>
    typeof value === 'object' && value !== null && value.d !== undefined && value.e !== undefined
      ? value.toString()
      : value
  ));

  const safeBrandingOptions = JSON.parse(JSON.stringify(brandingOptions, (key, value) =>
    typeof value === 'object' && value !== null && value.d !== undefined && value.e !== undefined
      ? value.toString()
      : value
  ));

  return (
    <div className="pb-10">
      <ProductForm 
        categories={categories} 
        brandingOptions={safeBrandingOptions}
        initialData={safeProduct} 
      />
    </div>
  );
}

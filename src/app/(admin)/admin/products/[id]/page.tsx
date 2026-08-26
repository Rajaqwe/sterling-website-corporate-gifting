import { prisma } from "@/lib/prisma/client";
import { ProductForm } from "../new/ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const id = params.id;

  const product = await prisma.product.findUnique({
    where: { id }
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

  return (
    <div className="pb-10">
      <ProductForm categories={categories} initialData={product} />
    </div>
  );
}

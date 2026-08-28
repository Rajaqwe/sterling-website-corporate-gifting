'use server';

import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";

const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  sku: z.string().min(2, "SKU is required"),
  slug: z.string().min(2, "Slug is required"),
  categoryId: z.string().min(1, "Category is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  stockQuantity: z.coerce.number().int().min(0, "Stock cannot be negative"),
  minimumOrderQuantity: z.coerce.number().int().min(1, "MOQ must be at least 1"),
  status: z.enum(["DRAFT", "ACTIVE", "OUT_OF_STOCK", "ARCHIVED"]),
});

export async function seedCategoriesIfEmpty() {
  await requireAdmin();
  const count = await prisma.category.count();
  if (count === 0) {
    await prisma.category.createMany({
      data: [
        { name: "Executive Gifts", slug: "executive-gifts", description: "Premium gifts for executives" },
        { name: "Tech & Electronics", slug: "tech-electronics", description: "Gadgets and tech accessories" },
        { name: "Drinkware", slug: "drinkware", description: "Mugs, tumblers, and bottles" },
        { name: "Stationery", slug: "stationery", description: "Notebooks, pens, and desk accessories" },
        { name: "Bags & Backpacks", slug: "bags", description: "Premium corporate bags" },
      ]
    });
  }
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const data = Object.fromEntries(formData.entries());
  
  const validatedFields = productSchema.safeParse({
    name: data.name,
    sku: data.sku,
    slug: data.slug,
    categoryId: data.categoryId,
    price: data.price,
    stockQuantity: data.stockQuantity,
    minimumOrderQuantity: data.minimumOrderQuantity,
    status: data.status,
  });

  if (!validatedFields.success) {
    return { 
      error: "Validation failed. Please check your inputs.",
      details: validatedFields.error.flatten().fieldErrors
    };
  }

  const { data: validData } = validatedFields;

  try {
    await prisma.product.create({
      data: {
        name: validData.name,
        sku: validData.sku,
        slug: validData.slug,
        categoryId: validData.categoryId,
        price: validData.price,
        stockQuantity: validData.stockQuantity,
        minimumOrderQuantity: validData.minimumOrderQuantity,
        status: validData.status,
      }
    });
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && (error as {code: string}).code === 'P2002') {
      return { error: "A product with this SKU or URL Slug already exists." };
    }
    console.error(error);
    return { error: "Failed to create product." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/corporate-gifts");
  
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin();
  const data = Object.fromEntries(formData.entries());
  
  const validatedFields = productSchema.safeParse({
    name: data.name,
    sku: data.sku,
    slug: data.slug,
    categoryId: data.categoryId,
    price: data.price,
    stockQuantity: data.stockQuantity,
    minimumOrderQuantity: data.minimumOrderQuantity,
    status: data.status,
  });

  if (!validatedFields.success) {
    return { 
      error: "Validation failed. Please check your inputs.",
      details: validatedFields.error.flatten().fieldErrors
    };
  }

  const { data: validData } = validatedFields;

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name: validData.name,
        sku: validData.sku,
        slug: validData.slug,
        categoryId: validData.categoryId,
        price: validData.price,
        stockQuantity: validData.stockQuantity,
        minimumOrderQuantity: validData.minimumOrderQuantity,
        status: validData.status,
      }
    });
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && (error as {code: string}).code === 'P2002') {
      return { error: "A product with this SKU or URL Slug already exists." };
    }
    console.error(error);
    return { error: "Failed to update product." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/corporate-gifts");
  
  redirect("/admin/products");
}

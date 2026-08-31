'use server';

import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";

const mediaSchema = z.object({
  id: z.string().optional(),
  url: z.string().url("Must be a valid URL"),
  type: z.enum(["IMAGE", "VIDEO"]).default("IMAGE"),
  isPrimary: z.boolean().default(false),
  isLiveProofing: z.boolean().default(false)
});

const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  sku: z.string().min(2, "SKU is required"),
  slug: z.string().min(2, "Slug is required"),
  categoryId: z.string().min(1, "Category is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  compareAtPrice: z.coerce.number().nullable().optional(),
  stockQuantity: z.coerce.number().int().min(0, "Stock cannot be negative"),
  minimumOrderQuantity: z.coerce.number().int().min(1, "MOQ must be at least 1"),
  status: z.enum(["DRAFT", "ACTIVE", "OUT_OF_STOCK", "ARCHIVED"]),
  likes: z.coerce.number().int().default(0),
  technicalSpecifications: z.any().optional(),
  packageLogistics: z.any().optional(),
  media: z.array(mediaSchema).optional(),
  brandingOptionIds: z.array(z.string()).optional(),
  weight: z.coerce.number().nullable().optional(),
  dimensions: z.string().nullable().optional(),
  material: z.string().nullable().optional(),
  shortDescription: z.string().nullable().optional(),
  description: z.string().nullable().optional()
});

export type ProductFormPayload = z.infer<typeof productSchema>;

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

export async function createProduct(data: ProductFormPayload) {
  await requireAdmin();
  
  const validatedFields = productSchema.safeParse(data);

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
        compareAtPrice: validData.compareAtPrice,
        stockQuantity: validData.stockQuantity,
        minimumOrderQuantity: validData.minimumOrderQuantity,
        status: validData.status,
        likes: validData.likes,
        weight: validData.weight,
        dimensions: validData.dimensions,
        material: validData.material,
        shortDescription: validData.shortDescription,
        description: validData.description,
        technicalSpecifications: validData.technicalSpecifications,
        packageLogistics: validData.packageLogistics,
        media: {
          create: validData.media?.map((m, i) => ({
            url: m.url,
            type: m.type,
            isPrimary: m.isPrimary,
            isLiveProofing: m.isLiveProofing,
            sortOrder: i
          })) || []
        },
        brandingOptions: {
          create: validData.brandingOptionIds?.map(id => ({
            brandingOption: { connect: { id } }
          })) || []
        }
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

export async function updateProduct(id: string, data: ProductFormPayload) {
  await requireAdmin();
  
  const validatedFields = productSchema.safeParse(data);

  if (!validatedFields.success) {
    return { 
      error: "Validation failed. Please check your inputs.",
      details: validatedFields.error.flatten().fieldErrors
    };
  }

  const { data: validData } = validatedFields;

  try {
    // We run in a transaction to handle related deletes and creates safely
    await prisma.$transaction([
      // 1. Update basic fields
      prisma.product.update({
        where: { id },
        data: {
          name: validData.name,
          sku: validData.sku,
          slug: validData.slug,
          categoryId: validData.categoryId,
          price: validData.price,
          compareAtPrice: validData.compareAtPrice,
          stockQuantity: validData.stockQuantity,
          minimumOrderQuantity: validData.minimumOrderQuantity,
          status: validData.status,
          likes: validData.likes,
          weight: validData.weight,
          dimensions: validData.dimensions,
          material: validData.material,
          shortDescription: validData.shortDescription,
          description: validData.description,
          technicalSpecifications: validData.technicalSpecifications,
          packageLogistics: validData.packageLogistics,
        }
      }),
      // 2. Delete existing media and branding options
      prisma.productMedia.deleteMany({ where: { productId: id } }),
      prisma.productBrandingOption.deleteMany({ where: { productId: id } }),
      
      // 3. Re-create media and branding options
      ...(validData.media && validData.media.length > 0 ? [
        prisma.product.update({
          where: { id },
          data: {
            media: {
              create: validData.media.map((m, i) => ({
                url: m.url,
                type: m.type,
                isPrimary: m.isPrimary,
                isLiveProofing: m.isLiveProofing,
                sortOrder: i
              }))
            }
          }
        })
      ] : []),
      ...(validData.brandingOptionIds && validData.brandingOptionIds.length > 0 ? [
        prisma.product.update({
          where: { id },
          data: {
            brandingOptions: {
              create: validData.brandingOptionIds.map(optionId => ({
                brandingOption: { connect: { id: optionId } }
              }))
            }
          }
        })
      ] : [])
    ]);

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

export async function deleteReview(reviewId: string) {
  await requireAdmin();
  try {
    await prisma.review.delete({
      where: { id: reviewId }
    });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete review:", error);
    return { error: "Failed to delete review." };
  }
}

'use server';

import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requirePermission } from "@/lib/auth/permissions";

const mediaSchema = z.object({
    id: z.string().optional(),
    url: z.union([
        z.string().url("Must be a valid URL"),
        z.string().startsWith("data:", "Must be a valid URL or uploaded file")
    ]),
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
    await requirePermission('categories.manage');
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
    await requirePermission('products.manage');

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
        if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2002') {
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
    await requirePermission('products.manage');

    const validatedFields = productSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            error: "Validation failed. Please check your inputs.",
            details: validatedFields.error.flatten().fieldErrors
        };
    }

    const { data: validData } = validatedFields;

    try {
        const existingMedia = await prisma.productMedia.findMany({ where: { productId: id } });
        const existingBranding = await prisma.productBrandingOption.findMany({ where: { productId: id } });

        // Media Diff
        const inputMedia = validData.media || [];
        const mediaToKeep = inputMedia.filter(m => m.id);
        const mediaToCreate = inputMedia.filter(m => !m.id);
        const mediaIdsToKeep = mediaToKeep.map(m => m.id as string);
        const mediaToDelete = existingMedia.filter(m => !mediaIdsToKeep.includes(m.id));

        // Branding Diff
        const inputBrandingIds = validData.brandingOptionIds || [];
        const existingBrandingIds = existingBranding.map(b => b.brandingOptionId);
        const brandingToDelete = existingBrandingIds.filter(x => !inputBrandingIds.includes(x));
        const brandingToCreate = inputBrandingIds.filter(x => !existingBrandingIds.includes(x));

        // We run in a transaction to handle related updates safely
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

            // 2. Delete removed relations
            ...(mediaToDelete.length > 0 ? [
                prisma.productMedia.deleteMany({ where: { id: { in: mediaToDelete.map(m => m.id) } } })
            ] : []),
            ...(brandingToDelete.length > 0 ? [
                prisma.productBrandingOption.deleteMany({ where: { productId: id, brandingOptionId: { in: brandingToDelete } } })
            ] : []),

            // 3. Update existing relations
            ...mediaToKeep.map((m, i) => prisma.productMedia.update({
                where: { id: m.id as string },
                data: {
                    url: m.url,
                    type: m.type,
                    isPrimary: m.isPrimary,
                    isLiveProofing: m.isLiveProofing,
                    sortOrder: i
                }
            })),

            // 4. Create new relations
            ...mediaToCreate.map((m, i) => prisma.productMedia.create({
                data: {
                    productId: id,
                    url: m.url,
                    type: m.type,
                    isPrimary: m.isPrimary,
                    isLiveProofing: m.isLiveProofing,
                    sortOrder: mediaToKeep.length + i
                }
            })),
            ...(brandingToCreate.length > 0 ? [
                prisma.productBrandingOption.createMany({
                    data: brandingToCreate.map(bid => ({
                        productId: id,
                        brandingOptionId: bid
                    }))
                })
            ] : [])
        ]);

    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2002') {
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
    await requirePermission('reviews.manage');
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

export type VariantData = {
    id?: string;
    name: string;
    sku: string | null;
    price: string | null;
    stockQuantity: number | null;
    weight: string | null;
    dimensions: string | null;
    isActive: boolean;
};

export async function saveVariants(productId: string, variants: VariantData[]) {
    await requirePermission('variants.manage');

    try {
        const existingVariants = await prisma.productVariant.findMany({ where: { productId } });

        const variantsToKeep = variants.filter(v => v.id);
        const variantsToCreate = variants.filter(v => !v.id);
        const idsToKeep = variantsToKeep.map(v => v.id as string);
        const variantsToDelete = existingVariants.filter(v => !idsToKeep.includes(v.id));

        await prisma.$transaction([
            ...(variantsToDelete.length > 0 ? [
                prisma.productVariant.deleteMany({ where: { id: { in: variantsToDelete.map(v => v.id) } } })
            ] : []),

            ...variantsToKeep.map((v, i) => prisma.productVariant.update({
                where: { id: v.id as string },
                data: {
                    name: v.name,
                    sku: v.sku || null,
                    price: v.price ? parseFloat(v.price) : null,
                    stockQuantity: v.stockQuantity,
                    weight: v.weight ? parseFloat(v.weight) : null,
                    dimensions: v.dimensions || null,
                    isActive: v.isActive,
                    sortOrder: i
                }
            })),

            ...variantsToCreate.map((v, i) => prisma.productVariant.create({
                data: {
                    productId,
                    name: v.name,
                    sku: v.sku || null,
                    price: v.price ? parseFloat(v.price) : null,
                    stockQuantity: v.stockQuantity,
                    weight: v.weight ? parseFloat(v.weight) : null,
                    dimensions: v.dimensions || null,
                    isActive: v.isActive,
                    sortOrder: variantsToKeep.length + i
                }
            }))
        ]);

        revalidatePath(`/admin/products/${productId}/variants`);
        revalidatePath(`/admin/products`);
        return { success: true };
    } catch (error) {
        console.error("Failed to save variants:", error);
        return { error: "Failed to save variants. SKU might be duplicated." };
    }
}

export type PricingTierData = {
    id?: string;
    minQuantity: number;
    maxQuantity: number | null;
    price: string;
};

export async function saveBulkPricing(productId: string, tiers: PricingTierData[]) {
    await requirePermission('products.manage');

    try {
        const existingTiers = await prisma.bulkPricingTier.findMany({ where: { productId } });

        const tiersToKeep = tiers.filter(t => t.id);
        const tiersToCreate = tiers.filter(t => !t.id);
        const idsToKeep = tiersToKeep.map(t => t.id as string);
        const tiersToDelete = existingTiers.filter(t => !idsToKeep.includes(t.id));

        await prisma.$transaction([
            ...(tiersToDelete.length > 0 ? [
                prisma.bulkPricingTier.deleteMany({ where: { id: { in: tiersToDelete.map(t => t.id) } } })
            ] : []),

            ...tiersToKeep.map(t => prisma.bulkPricingTier.update({
                where: { id: t.id as string },
                data: {
                    minQuantity: t.minQuantity,
                    maxQuantity: t.maxQuantity,
                    price: parseFloat(t.price)
                }
            })),

            ...tiersToCreate.map(t => prisma.bulkPricingTier.create({
                data: {
                    productId,
                    minQuantity: t.minQuantity,
                    maxQuantity: t.maxQuantity,
                    price: parseFloat(t.price)
                }
            }))
        ]);

        revalidatePath(`/admin/products/${productId}/pricing`);
        revalidatePath(`/admin/products`);
        return { success: true };
    } catch (error) {
        console.error("Failed to save bulk pricing:", error);
        return { error: "Failed to save bulk pricing." };
    }
}


export async function toggleProductFeatured(id: string, isFeatured: boolean) {
    await requirePermission('products.manage');
    await prisma.product.update({ where: { id }, data: { isFeatured: !isFeatured } });
    revalidatePath('/admin/products');
}

export async function bulkDeleteProducts(ids: string[]) {
    await requirePermission('products.manage');
    await prisma.product.deleteMany({ where: { id: { in: ids } } });
    revalidatePath('/admin/products');
    return { success: true };
}

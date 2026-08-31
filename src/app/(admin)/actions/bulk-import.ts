"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function bulkImportProducts(data: any[]) {
  try {
    const user = await requireAdmin();

    let successCount = 0;
    let failedCount = 0;

    // Process sequentially to avoid connection pool exhaustion
    for (const row of data) {
      try {
        if (!row.name || !row.sku || !row.price) {
          failedCount++;
          continue;
        }

        // Check for existing SKU
        const existing = await prisma.product.findUnique({
          where: { sku: String(row.sku).trim() }
        });

        if (existing) {
          failedCount++;
          continue;
        }

        // Get or create category
        let categoryId: string;
        const categoryName = row.category ? String(row.category).trim() : "Uncategorized";
        let cat = await prisma.category.findFirst({
          where: { name: categoryName }
        });
        if (!cat) {
          cat = await prisma.category.create({
            data: {
              name: categoryName,
              slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            }
          });
        }
        categoryId = cat.id;

        // Create product
        await prisma.product.create({
          data: {
            name: String(row.name).trim(),
            slug: String(row.name).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
            sku: String(row.sku).trim(),
            description: row.description ? String(row.description) : null,
            price: Number(row.price),
            minimumOrderQuantity: row.moq ? Number(row.moq) : 10,
            stockQuantity: row.stock ? Number(row.stock) : 1000,
            status: "ACTIVE",
            categoryId,
          }
        });

        successCount++;
      } catch (err) {
        console.error(`Failed to import row:`, row, err);
        failedCount++;
      }
    }

    revalidatePath("/admin/products");
    return { success: true, count: successCount, failedCount };
  } catch (error: any) {
    console.error("Bulk import error:", error);
    return { success: false, error: error.message };
  }
}

"use server";

import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/permissions";
import { z } from "zod";

// Strict validation schema for bulk import
const bulkImportRowSchema = z.object({
 name: z.string().trim().min(1, "Name is required"),
 sku: z.string().trim().min(1, "SKU is required"),
 category: z.string().trim().min(1, "Category is required"),
 price: z.preprocess(
   (val) => (typeof val === "string" ? val.replace(/[₹$,\s]/g, "") : val),
   z.coerce.number().positive("Price must be greater than 0")
 ),
 minimumOrderQuantity: z.preprocess(
   (val) => (typeof val === "string" ? val.replace(/,/g, "").trim() : val),
   z.coerce.number().int().min(1, "MOQ must be at least 1")
 ),
 stockQuantity: z.preprocess(
   (val) => (typeof val === "string" ? val.replace(/,/g, "").trim() : val),
   z.coerce.number().int().min(0, "Stock must be 0 or greater")
 ),
 description: z.string().optional(),
});

export type ValidatedRow = z.infer<typeof bulkImportRowSchema>;

export type BulkImportValidationResult = {
 validRows: ValidatedRow[];
 invalidRows: { row: any; errors: string[] }[];
 summary: {
 total: number;
 valid: number;
 invalid: number;
 };
};

export async function validateBulkImportProducts(data: any[]): Promise<BulkImportValidationResult> {
 await requirePermission('products.manage');

 const validRows: ValidatedRow[] = [];
 const invalidRows: { row: any; errors: string[] }[] = [];

 // Extract all incoming SKUs to check against DB
 const incomingSkus = data.map(r => String(r.sku || '').trim()).filter(Boolean);
 
 // Find duplicates in DB
 const existingProducts = await prisma.product.findMany({
 where: { sku: { in: incomingSkus } },
 select: { sku: true }
 });
 const existingSkuSet = new Set(existingProducts.map(p => p.sku));

 // Find duplicates within the CSV itself
 const csvSkuSet = new Set<string>();

 for (const row of data) {
 // 1. Zod schema validation
 const parsed = bulkImportRowSchema.safeParse(row);
 if (!parsed.success) {
 invalidRows.push({
 row,
 errors: parsed.error.issues.map((e: any) => `${e.path.join('.')}: ${e.message}`)
 });
 continue;
 }

 const cleanRow = parsed.data;

 // 2. Duplicate SKU validation
 if (existingSkuSet.has(cleanRow.sku)) {
 invalidRows.push({
 row,
 errors: [`SKU '${cleanRow.sku}' already exists in the database.`]
 });
 continue;
 }

 if (csvSkuSet.has(cleanRow.sku)) {
 invalidRows.push({
 row,
 errors: [`Duplicate SKU '${cleanRow.sku}' found in the CSV file.`]
 });
 continue;
 }
 
 csvSkuSet.add(cleanRow.sku);
 validRows.push(cleanRow);
 }

 return {
 validRows,
 invalidRows,
 summary: {
 total: data.length,
 valid: validRows.length,
 invalid: invalidRows.length
 }
 };
}

export async function confirmBulkImportProducts(validRows: ValidatedRow[]) {
 await requirePermission('products.manage');
 
 if (!validRows || validRows.length === 0) {
 return { success: false, error: "No valid rows provided" };
 }

 try {
 let successCount = 0;
 
 // We process sequentially to avoid pool exhaustion for large files,
 // and to safely create categories on the fly.
 for (const row of validRows) {
 // Get or create category
 const categoryName = row.category.trim();
 const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `cat-${Date.now()}`;
 let cat = await prisma.category.findFirst({
 where: { OR: [{ name: categoryName }, { slug }] }
 });
 
 if (!cat) {
 cat = await prisma.category.create({
 data: {
 name: categoryName,
 slug,
 }
 });
 }

 // Create product
 await prisma.product.create({
 data: {
 name: row.name.trim(),
 slug: row.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
 sku: row.sku.trim(),
 description: row.description || null,
 price: row.price,
 minimumOrderQuantity: row.minimumOrderQuantity,
 stockQuantity: row.stockQuantity,
 status: "ACTIVE",
 categoryId: cat.id,
 }
 });
 
 successCount++;
 }

 revalidatePath("/admin/products");
 return { success: true, count: successCount };
 } catch (error: any) {
 console.error("Bulk import error:", error);
 return { success: false, error: error.message };
 }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { hasPermission } from "@/lib/auth/permissions";
import { getAuthUser } from "@/lib/auth/server";

export async function GET(req: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth || !auth.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allowed = await hasPermission(auth.user.id, 'products.read');
    if (!allowed) {
      return NextResponse.json({ error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }

    const products = await prisma.product.findMany({
      include: {
        category: true,
        variants: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const headers = ["Product ID", "Name", "SKU", "Status", "Category", "Base Price", "Stock Quantity", "Variants Count"];
    
    const rows = products.map(product => [
      product.id,
      product.name.replace(/,/g, ''),
      product.sku,
      product.status,
      product.category?.name?.replace(/,/g, '') || "N/A",
      product.price.toString(),
      product.stockQuantity.toString(),
      product.variants.length.toString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="products_export_${new Date().getTime()}.csv"`
      }
    });

  } catch (error) {
    console.error("Products export failed:", error);
    return new NextResponse("Failed to generate export", { status: 500 });
  }
}

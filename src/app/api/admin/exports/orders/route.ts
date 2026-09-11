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

    const allowed = await hasPermission(auth.user.id, 'orders.read');
    if (!allowed) {
      return NextResponse.json({ error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }

    const orders = await prisma.order.findMany({
      include: {
        user: true,
        company: true
      },
      orderBy: { createdAt: 'desc' }
    });

    const headers = ["Order Number", "Date", "Customer Name", "Customer Email", "Company", "Status", "Subtotal", "Tax", "Shipping", "Discount", "Total"];
    
    const rows = orders.map(order => [
      order.orderNumber,
      new Date(order.createdAt).toISOString(),
      (order.user.fullName || '').replace(/,/g, ''),
      order.user.email,
      order.company?.name?.replace(/,/g, '') || "N/A",
      order.status,
      order.subtotal.toString(),
      order.tax.toString(),
      order.shippingCost.toString(),
      order.discount.toString(),
      order.total.toString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="orders_export_${new Date().getTime()}.csv"`
      }
    });

  } catch (error) {
    console.error("Orders export failed:", error);
    return new NextResponse("Failed to generate export", { status: 500 });
  }
}

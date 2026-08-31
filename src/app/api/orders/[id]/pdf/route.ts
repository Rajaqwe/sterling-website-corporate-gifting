import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/server";
import { generateInvoicePdfStream } from "@/lib/pdf/generateInvoicePdf";

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const auth = await requireUser();
    
    if (!auth || !auth.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            product: true
          }
        },
        user: true,
        company: true,
        billingAddress: true,
        shippingAddress: true,
        payments: true
      }
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    const isAdmin = auth.user.role === 'ADMIN' || auth.user.role === 'SUPER_ADMIN';
    if (order.userId !== auth.user.id && !isAdmin) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const pdfStream = await generateInvoicePdfStream(order);
    
    return new NextResponse(pdfStream as unknown as ReadableStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Sterling-Invoice-${order.orderNumber}.pdf"`,
      },
    });

  } catch (error) {
    console.error("PDF generation error:", error);
    return new NextResponse("Failed to generate PDF", { status: 500 });
  }
}

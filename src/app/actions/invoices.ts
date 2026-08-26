'use server'

import { prisma } from '@/lib/prisma/client'
import { revalidatePath } from 'next/cache'
import { InvoiceStatus } from '@prisma/client'
import { requireAdmin } from '@/lib/auth/server'

export async function generateInvoiceForOrder(orderId: string) {
  try {
    await requireAdmin();
    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) return { success: false, error: "Order not found" };

    const year = new Date().getFullYear();
    const count = await prisma.invoice.count();
    const invoiceNumber = `INV-${year}-${String(count + 1).padStart(4, '0')}`;

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        orderId: order.id,
        userId: order.userId,
        companyId: order.companyId,
        subtotal: order.subtotal,
        tax: order.tax,
        total: order.total,
        status: InvoiceStatus.DRAFT,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Net 30 terms
      }
    });

    revalidatePath('/admin/orders');
    return { success: true, invoiceId: invoice.id };
  } catch {
    return { success: false, error: "Failed to generate invoice." };
  }
}

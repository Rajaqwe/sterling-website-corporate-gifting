'use server'

import { prisma } from '@/lib/prisma/client'
import { revalidatePath } from 'next/cache'
import { InvoiceStatus } from '@/generated/prisma'
import { createClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function generateInvoiceForOrder(orderId: string) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return { success: false, error: "Unauthorized" }

    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) return { success: false, error: "Order not found" };

    const isAdmin = user.app_metadata?.role === 'ADMIN' || user.app_metadata?.role === 'SUPER_ADMIN'
    if (!isAdmin && order.userId !== user.id) {
      return { success: false, error: "Forbidden: You do not own this order." }
    }

    // --- Idempotency check (P1-2) ---
    const existingInvoice = await prisma.invoice.findFirst({
      where: { orderId: order.id }
    });

    if (existingInvoice) {
      return { success: true, invoiceId: existingInvoice.id, message: "Invoice already exists for this order." };
    }

    // --- Race-safe invoice numbering (P1-1) ---
    const year = new Date().getFullYear();
    const invoiceNumber = `INV-${year}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    // Wrap in transaction for safety
    const invoice = await prisma.$transaction(async (tx: any) => {
      return await tx.invoice.create({
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
    });

    revalidatePath('/admin/orders');
    return { success: true, invoiceId: invoice.id };
  } catch (error: any) {
    console.error("Failed to generate invoice:", error);
    return { success: false, error: "Failed to generate invoice." };
  }
}

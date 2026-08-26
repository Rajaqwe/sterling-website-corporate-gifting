'use server'

import { prisma } from '@/lib/prisma/client'
import { createQuoteSchema } from '@/lib/validations/quotes'
import { revalidatePath } from 'next/cache'
import { QuoteStatus } from '@prisma/client'
import { getAuthUser, requireAdmin } from '@/lib/auth/server'

import { calculateServerProductTotal } from '@/lib/pricing/server'

export async function createQuote(formData: FormData) {
  try {
    const auth = await getAuthUser();
    
    const rawData = Object.fromEntries(formData.entries());
    const data = {
      ...rawData,
      brandingRequired: rawData.brandingRequired === 'on',
    };
    
    const parsed = createQuoteSchema.parse(data);

    // Generate a unique quote number (e.g., QR-YYYY-XXXX)
    const year = new Date().getFullYear();
    const count = await prisma.quoteRequest.count();
    const quoteNumber = `QR-${year}-${String(count + 1).padStart(4, '0')}`;

    // Perform secure server-side price calculation if a product is selected
    let quoteItem = undefined;
    if (parsed.productId) {
      try {
        const pricing = await calculateServerProductTotal(parsed.productId, parsed.quantity, []);
        
        quoteItem = {
          productId: parsed.productId,
          description: pricing.product.name,
          quantity: parsed.quantity,
          unitPrice: pricing.tierUnitPrice,
          totalPrice: pricing.total,
        };
      } catch (err) {
        console.error("Pricing error:", err);
        return { success: false, error: "Failed to calculate pricing securely." };
      }
    }

    const quote = await prisma.quoteRequest.create({
      data: {
        ...parsed,
        quoteNumber,
        userId: auth?.user.id,
        items: quoteItem ? {
          create: quoteItem
        } : undefined
      },
    });

    revalidatePath('/request-quote');
    return { success: true, quoteId: quote.id };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to submit quote request." };
  }
}

export async function updateQuoteStatus(quoteId: string, status: QuoteStatus) {
  try {
    await requireAdmin();
    
    await prisma.quoteRequest.update({
      where: { id: quoteId },
      data: { status },
    });
    revalidatePath(`/admin/quotes/${quoteId}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to update status." };
  }
}

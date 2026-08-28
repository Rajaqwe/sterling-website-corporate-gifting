'use server'

import { prisma } from '@/lib/prisma/client'
import { createQuoteSchema } from '@/lib/validations/quotes'
import { revalidatePath } from 'next/cache'
import { QuoteStatus } from '@/generated/prisma'
import { getAuthUser } from '@/lib/auth/server'
import { requireAdmin } from '@/lib/auth/require-admin'

import { calculateServerProductTotal } from '@/lib/pricing/server'
import { rateLimit } from '@/lib/security/rate-limit'

import { sendQuoteReceivedEmail } from '@/lib/email/sender'
import crypto from 'crypto'

export async function createQuote(payload: FormData | Record<string, any>) {
  try {
    const auth = await getAuthUser();
    const identifier = auth?.user?.id || 'anonymous';
    const limitCheck = await rateLimit(`quote_${identifier}`, 3, 60000);
    
    if (!limitCheck.success) {
      return { success: false, error: 'Too many requests. Please wait a minute before submitting again.' };
    }

    
    let rawData: Record<string, any>;
    if (payload instanceof FormData) {
      rawData = Object.fromEntries(payload.entries());
      rawData.brandingRequired = rawData.brandingRequired === 'on';
      // Try to parse customizationIds if provided as string
      if (typeof rawData.customizationIds === 'string') {
        try {
          rawData.customizationIds = JSON.parse(rawData.customizationIds);
        } catch(e) {}
      }
    } else {
      rawData = payload;
    }
    
    const parsed = createQuoteSchema.parse(rawData);

    // Generate a unique collision-resistant quote number (P1-1)
    const year = new Date().getFullYear();
    const quoteNumber = `QR-${year}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    // Perform secure server-side price calculation if a product is selected
    let quoteItem = undefined;
    if (parsed.productId) {
      try {
        const pricing = await calculateServerProductTotal(
          parsed.productId, 
          parsed.quantity, 
          parsed.customizationIds || []
        );
        
        quoteItem = {
          productId: parsed.productId,
          description: pricing.product.name,
          quantity: parsed.quantity,
          unitPrice: pricing.tierUnitPrice,
          totalPrice: pricing.total,
          brandingOption: parsed.customizationIds ? parsed.customizationIds.join(",") : null
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

    // Send email asynchronously
    void sendQuoteReceivedEmail(quote.workEmail, {
      quoteNumber: quote.quoteNumber,
      customerName: quote.fullName,
      companyName: quote.companyName
    });

    revalidatePath('/request-a-quote');
    return { success: true, quoteId: quote.id, quoteNumber: quote.quoteNumber };
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

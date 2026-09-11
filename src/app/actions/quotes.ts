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
import { requirePermission } from '@/lib/auth/permissions'
import { transitionQuote, QuoteStateError } from '@/lib/quotes/state-machine'

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

    // Destructure model fields explicitly — `parsed` also contains
    // `customizationIds`, which is not a QuoteRequest column and would make
    // Prisma throw "Unknown argument".
    const quote = await prisma.quoteRequest.create({
      data: {
        fullName: parsed.fullName,
        companyName: parsed.companyName,
        workEmail: parsed.workEmail,
        phone: parsed.phone,
        numberOfRecipients: parsed.numberOfRecipients,
        productId: parsed.productId,
        categoryId: parsed.categoryId,
        quantity: parsed.quantity,
        budgetPerRecipient: parsed.budgetPerRecipient,
        brandingRequired: parsed.brandingRequired,
        deliveryLocation: parsed.deliveryLocation,
        eventType: parsed.eventType,
        additionalRequirements: parsed.additionalRequirements,
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
  } catch (error: any) {
    console.error("Create quote error:", error);
    if (error?.issues && Array.isArray(error.issues) && error.issues.length > 0) {
      const firstIssue = error.issues[0];
      return { success: false, error: firstIssue?.message || "Validation failed." };
    }
    return { success: false, error: "Failed to submit quote request." };
  }
}

export async function updateQuoteStatus(quoteId: string, status: QuoteStatus, notes?: string) {
  const user = await requirePermission('quotes.manage');
  
  try {
    await transitionQuote(quoteId, status, user.id, notes);
    
    revalidatePath(`/admin/quotes/${quoteId}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    if (error instanceof QuoteStateError) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to update status." };
  }
}

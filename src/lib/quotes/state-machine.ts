import { QuoteStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma/client';

import { ALLOWED_QUOTE_TRANSITIONS } from './constants';

export class QuoteStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuoteStateError';
  }
}

/**
 * Transitions a quote to a new status, enforcing the state machine rules.
 * Records the transition in the AuditLog.
 */
export async function transitionQuote(
  quoteId: string, 
  newStatus: QuoteStatus, 
  actorId: string, 
  notes?: string
) {
  return await prisma.$transaction(async (tx) => {
    const quote = await tx.quoteRequest.findUnique({
      where: { id: quoteId },
      select: { id: true, status: true, quoteNumber: true }
    });

    if (!quote) {
      throw new Error(`Quote ${quoteId} not found`);
    }

    const currentStatus = quote.status;
    const allowedNext = ALLOWED_QUOTE_TRANSITIONS[currentStatus];

    if (!allowedNext.includes(newStatus)) {
      throw new QuoteStateError(
        `Invalid transition: Cannot move quote ${quote.quoteNumber} from ${currentStatus} to ${newStatus}`
      );
    }

    // Perform the update
    const updatedQuote = await tx.quoteRequest.update({
      where: { id: quoteId },
      data: { status: newStatus }
    });

    // Audit the transition
    await tx.auditLog.create({
      data: {
        actorId,
        action: 'QUOTE_STATUS_CHANGED',
        resource: 'Quote',
        resourceId: quoteId,
        metadata: {
          from: currentStatus,
          to: newStatus,
          notes: notes || null
        }
      }
    });

    return updatedQuote;
  });
}

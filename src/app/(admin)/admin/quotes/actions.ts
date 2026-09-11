'use server';

import { prisma } from '@/lib/prisma/client';
import { requirePermission } from '@/lib/auth/permissions';
import { revalidatePath } from 'next/cache';

export async function saveQuoteNotes(quoteId: string, notes: string) {
 const admin = await requirePermission('quotes.manage');

 try {
 await prisma.quoteRequest.update({
 where: { id: quoteId },
 data: { internalNotes: notes },
 });

 await prisma.auditLog.create({
 data: {
 actorId: admin.id,
 action: 'QUOTE_NOTES_UPDATED',
 resource: 'Quote',
 resourceId: quoteId,
 metadata: {}
 }
 });

 revalidatePath(`/admin/quotes/${quoteId}`);
 return { success: true };
 } catch (error) {
 console.error('Failed to save quote notes:', error);
 return { error: 'Failed to save notes.' };
 }
}

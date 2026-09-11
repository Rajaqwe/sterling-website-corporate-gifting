import { OrderStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma/client';

import { ALLOWED_TRANSITIONS } from './constants';

export class OrderStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrderStateError';
  }
}

/**
 * Transitions an order to a new status, enforcing the state machine rules.
 * Records the transition in the AuditLog.
 */
export async function transitionOrder(
  orderId: string, 
  newStatus: OrderStatus, 
  actorId: string, 
  notes?: string
) {
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { items: true }
    });

    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }

    const currentStatus = order.status;
    const allowedNext = ALLOWED_TRANSITIONS[currentStatus];

    if (!allowedNext.includes(newStatus)) {
      throw new OrderStateError(
        `Invalid transition: Cannot move order ${order.orderNumber} from ${currentStatus} to ${newStatus}`
      );
    }

    // Perform the update
    const updatedOrder = await tx.order.update({
      where: { id: orderId },
      data: { status: newStatus }
    });

    // P0 Commerce Integrity: Inventory Allocation logic
    // If moving from PENDING to an allocated state, decrement stock
    const isAllocatedState = newStatus === 'CONFIRMED' || newStatus === 'PROCESSING';
    if (currentStatus === 'PENDING' && isAllocatedState) {
      for (const item of order.items) {
        const variantId = (item.variantSnapshot as any)?.id;
        if (variantId) {
          const res = await tx.productVariant.updateMany({
            where: { id: variantId, stockQuantity: { gte: item.quantity } },
            data: { stockQuantity: { decrement: item.quantity } }
          });
          if (res.count === 0) {
            throw new OrderStateError(`Insufficient stock for variant ${variantId} of item ${item.productName}`);
          }
        } else {
          const res = await tx.product.updateMany({
            where: { id: item.productId, stockQuantity: { gte: item.quantity } },
            data: { stockQuantity: { decrement: item.quantity } }
          });
          if (res.count === 0) {
            throw new OrderStateError(`Insufficient stock for product ${item.productId} (${item.productName})`);
          }
        }
      }
    }

    // If cancelling an order that already allocated stock, restore it
    if (newStatus === 'CANCELLED' && currentStatus !== 'PENDING') {
      for (const item of order.items) {
        const variantId = (item.variantSnapshot as any)?.id;
        if (variantId) {
          await tx.productVariant.update({
            where: { id: variantId },
            data: { stockQuantity: { increment: item.quantity } }
          });
        } else {
          await tx.product.update({
            where: { id: item.productId },
            data: { stockQuantity: { increment: item.quantity } }
          });
        }
      }
    }

    // Audit the transition
    await tx.auditLog.create({
      data: {
        actorId,
        action: 'ORDER_STATUS_CHANGED',
        resource: 'Order',
        resourceId: orderId,
        metadata: {
          from: currentStatus,
          to: newStatus,
          notes: notes || null
        }
      }
    });

    return updatedOrder;
  });
}

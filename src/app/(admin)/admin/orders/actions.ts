'use server';

import { requirePermission } from "@/lib/auth/permissions";
import { transitionOrder } from "@/lib/orders/state-machine";
import { OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, newStatus: OrderStatus, notes?: string) {
 const user = await requirePermission('orders.manage');
 
 try {
 await transitionOrder(orderId, newStatus, user.id, notes);
 revalidatePath(`/admin/orders/${orderId}`);
 revalidatePath(`/admin/orders`);
 return { success: true };
 } catch (error: any) {
 console.error("Failed to update order status:", error);
 return { error: error.message || "Failed to update order status." };
 }
}

export async function updateShippingDetails(orderId: string, courier: string | null, trackingNumber: string | null) {
 const user = await requirePermission('orders.manage');
 try {
 await prisma.order.update({
 where: { id: orderId },
 data: { shippingCourier: courier, trackingNumber }
 });

 await prisma.auditLog.create({
 data: {
 actorId: user.id,
 action: 'ORDER_SHIPPING_UPDATED',
 resource: 'Order',
 resourceId: orderId,
 metadata: { courier, trackingNumber }
 }
 });

 revalidatePath(`/admin/orders/${orderId}`);
 return { success: true };
 } catch (error: any) {
 return { error: "Failed to update shipping details." };
 }
}

export async function processRefund(orderId: string, amount: number, notes: string) {
 const user = await requirePermission('orders.manage');
 try {
 // In a real app, you would integrate with Stripe/Razorpay here
 
 // For now, just create a negative payment record and update status
 await prisma.$transaction(async (tx: any) => {
 await tx.payment.create({
 data: {
 orderId,
 provider: 'INVOICE',
 amount: -amount,
 status: 'REFUNDED',
 method: 'MANUAL_REFUND',
 metadata: { notes }
 }
 });

 await tx.auditLog.create({
 data: {
 actorId: user.id,
 action: 'ORDER_REFUNDED',
 resource: 'Order',
 resourceId: orderId,
 metadata: { amount, notes }
 }
 });
 
 // Optionally transition the order if it's a full refund, but let's let the admin do it manually or assume they use the state machine.
 });

 revalidatePath(`/admin/orders/${orderId}`);
 return { success: true };
 } catch (error: any) {
 return { error: "Failed to process refund." };
 }
}


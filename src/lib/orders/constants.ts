import { OrderStatus } from '@prisma/client';

export type TransitionMap = {
  [key in OrderStatus]: OrderStatus[];
};

export const ALLOWED_TRANSITIONS: TransitionMap = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PROCESSING', 'CANCELLED'],
  PROCESSING: ['BRANDING', 'PACKED', 'CANCELLED'],
  BRANDING: ['PACKED', 'CANCELLED'],
  PACKED: ['SHIPPED'],
  SHIPPED: ['DELIVERED'],
  DELIVERED: ['REFUNDED'],
  CANCELLED: ['REFUNDED'],
  REFUNDED: [],
};

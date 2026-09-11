import { z } from "zod";

// Shared server-side validation for shipping/billing address data.
// Used by cart checkout and quote-to-order conversion so both flows accept
// exactly the same fields with the same constraints.
export const shippingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(10, "Valid phone number required").max(20).regex(/^[+\d\s\-()]+$/, "Invalid phone format"),
  addressLine1: z.string().min(5, "Address must be at least 5 characters").max(200),
  addressLine2: z.string().max(200).optional(),
  city: z.string().min(2, "City is required").max(100),
  state: z.string().min(2, "State is required").max(100),
  postalCode: z.string().min(4, "Postal code is required").max(10).regex(/^[0-9a-zA-Z\s\-]+$/, "Invalid postal code"),
  country: z.string().min(2).max(100).optional().default("India"),
});

export type ShippingInput = z.infer<typeof shippingSchema>;

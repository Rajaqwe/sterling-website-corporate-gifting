import * as z from "zod";

export const createQuoteSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  companyName: z.string().min(2, "Company name is required"),
  workEmail: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  numberOfRecipients: z.coerce.number().min(1, "Must be at least 1 recipient"),
  productId: z.string().optional(),
  categoryId: z.string().optional(),
  quantity: z.coerce.number().min(1, "Must be at least 1"),
  budgetPerRecipient: z.coerce.number().optional(),
  brandingRequired: z.boolean().default(false),
  deliveryLocation: z.string().optional(),
  eventType: z.string().optional(),
  additionalRequirements: z.string().optional(),
});

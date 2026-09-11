import * as z from "zod";

export const createQuoteSchema = z.object({
  fullName: z.string().min(2, "Name is required").max(100, "Name is too long"),
  companyName: z.string().min(2, "Company name is required").max(150, "Company name is too long"),
  workEmail: z.string().email("Invalid email address").max(255, "Email is too long"),
  phone: z.string().min(10, "Phone number is required").max(20, "Phone number is too long").regex(/^[+\d\s\-()]+$/, "Invalid phone format"),
  numberOfRecipients: z.coerce.number().min(1, "Must be at least 1 recipient").max(1000000, "Maximum recipients exceeded"),
  productId: z.string().max(255).optional(),
  categoryId: z.string().max(255).optional(),
  quantity: z.coerce.number().min(1, "Must be at least 1").max(10000000, "Maximum quantity exceeded"),
  budgetPerRecipient: z.coerce.number().min(0, "Budget cannot be negative").max(10000000, "Maximum budget exceeded").optional(),
  brandingRequired: z.boolean().default(false),
  deliveryLocation: z.string().max(500).optional(),
  eventType: z.string().max(255).optional(),
  additionalRequirements: z.string().max(5000).optional(),
  customizationIds: z.array(z.string()).optional(),
});

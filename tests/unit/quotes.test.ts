import { describe, it, expect } from 'vitest';
import { createQuoteSchema } from '@/lib/validations/quotes';

describe('Quote Request Validation', () => {
  it('should validate a correct quote request', () => {
    const validData = {
      fullName: 'John Doe',
      companyName: 'Acme Corp',
      workEmail: 'john@acmecorp.com',
      phone: '1234567890',
      numberOfRecipients: 50,
      quantity: 50,
      deliveryLocation: 'New York',
    };
    
    const result = createQuoteSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid emails', () => {
    const invalidData = {
      fullName: 'John Doe',
      companyName: 'Acme Corp',
      workEmail: 'not-an-email',
      phone: '1234567890',
      numberOfRecipients: 50,
      quantity: 50,
      deliveryLocation: 'New York',
    };
    
    const result = createQuoteSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
  
  it('should enforce minimum recipient count', () => {
    const invalidData = {
      fullName: 'John Doe',
      companyName: 'Acme Corp',
      workEmail: 'john@acmecorp.com',
      phone: '1234567890',
      numberOfRecipients: 0, // Must be at least 1
      quantity: 50,
      deliveryLocation: 'New York',
    };
    
    const result = createQuoteSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

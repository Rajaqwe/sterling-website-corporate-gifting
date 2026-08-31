import { Money } from "@/lib/money";

export interface TaxCalculation {
  subtotal: Money;
  taxAmount: Money;
  total: Money;
  taxRatePercent: number;
}

export class TaxService {
  /**
   * Calculates GST for an order subtotal.
   * Standard B2B corporate gifting GST rate in India is often 18%.
   */
  static calculateGST(subtotal: Money, taxRatePercent: number = 18): TaxCalculation {
    // tax = subtotal * (rate / 100)
    // To keep it integer math: tax = (subtotal * rate) / 100
    const taxAmount = subtotal.multiply(taxRatePercent).divide(100);
    
    return {
      subtotal,
      taxAmount,
      total: subtotal.add(taxAmount),
      taxRatePercent
    };
  }
}

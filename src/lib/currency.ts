/**
 * Centralized utility for handling currency conversion and formatting.
 * Sterling uses INR as the canonical currency.
 */

export const EXCHANGE_RATE_USD_TO_INR = 83; // 1 USD = 83 INR

/**
 * Formats a numeric price into proper Indian Rupees format (e.g., ₹1,499).
 * Removes unnecessary decimals unless there is a fractional value.
 *
 * @param price - The numeric price to format.
 * @returns Formatted currency string.
 */
export function formatINR(price: number | string | undefined | null | any): string {
  if (price === undefined || price === null) return "₹0";
  
  const numPrice = typeof price === 'string' ? parseINRString(price) : Number(price);
  if (isNaN(numPrice)) return "₹0";

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: numPrice % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(numPrice);
}

/**
 * Parses a formatted currency string back into a number if needed.
 * Useful for admin inputs.
 */
export function parseINRString(formatted: string): number {
  const numericString = formatted.replace(/[^0-9.-]+/g, "");
  return parseFloat(numericString) || 0;
}

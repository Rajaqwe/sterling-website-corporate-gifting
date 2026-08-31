import { Prisma } from "@prisma/client";

/**
 * A strict Integer-based money utility to avoid floating-point math errors.
 * Internally stores amounts in minor units (e.g., paise for INR).
 * Example: ₹10.50 -> 1050
 */
export class Money {
  private readonly amount: bigint;

  private constructor(amount: bigint | number | string) {
    if (typeof amount === 'bigint') {
      this.amount = amount;
    } else if (typeof amount === 'number') {
      if (!Number.isInteger(amount)) {
        throw new Error(`Money must be initialized with an integer representing minor units. Got float: ${amount}`);
      }
      this.amount = BigInt(amount);
    } else {
      this.amount = BigInt(amount);
    }
  }

  // Create from minor units (e.g., paise)
  static fromInteger(minorUnits: number | bigint | string): Money {
    return new Money(minorUnits);
  }

  // Create from a Decimal or string from the DB (which represents major units e.g. 10.50)
  static fromDecimal(majorUnits: Prisma.Decimal | number | string | any): Money {
    if (!majorUnits) return new Money(0);
    
    let valStr: string;
    if (typeof majorUnits === 'object' && majorUnits !== null && 'toString' in majorUnits) {
      valStr = majorUnits.toString();
    } else {
      valStr = String(majorUnits);
    }

    // Convert string like "10.50" to "1050"
    const parts = valStr.split('.');
    let major = parts[0] || '0';
    let minor = parts[1] || '';
    
    // Pad minor to exactly 2 digits for standard currencies
    if (minor.length > 2) {
      minor = minor.substring(0, 2); // Truncate extra precision safely
    } else {
      minor = minor.padEnd(2, '0');
    }

    return new Money(BigInt(major + minor));
  }

  add(other: Money): Money {
    return new Money(this.amount + other.amount);
  }

  subtract(other: Money): Money {
    return new Money(this.amount - other.amount);
  }

  multiply(factor: number | bigint): Money {
    if (typeof factor === 'bigint') {
      return new Money(this.amount * factor);
    }
    if (Number.isNaN(factor)) throw new Error("Cannot multiply by NaN");
    // Preserve 4 decimal places of precision when multiplying by float
    const factorBig = BigInt(Math.round(factor * 10000));
    return new Money((this.amount * factorBig) / 10000n);
  }

  // Divide and round to nearest minor unit
  divide(divisor: number | bigint): Money {
    const d = typeof divisor === 'bigint' ? divisor : BigInt(Math.round(divisor));
    if (d === 0n) throw new Error("Cannot divide by zero");
    
    // Add half the divisor before dividing for rounding
    const halfDivisor = d / 2n;
    const sign = (this.amount < 0n) !== (d < 0n) ? -1n : 1n;
    
    // For rounding away from zero
    const rounded = (this.amount + (sign * halfDivisor)) / d;
    return new Money(rounded);
  }

  // Converts back to major units as a string for DB storage or API output
  toDecimal(): string {
    const isNegative = this.amount < 0n;
    const absAmount = isNegative ? -this.amount : this.amount;
    const str = absAmount.toString().padStart(3, '0'); // At least "000"
    const major = str.slice(0, -2);
    const minor = str.slice(-2);
    
    const val = `${major}.${minor}`;
    return isNegative ? `-${val}` : val;
  }

  // Raw minor units value for passing to Stripe/Razorpay
  toPaise(): number {
    return Number(this.amount);
  }

  // Formatted string for UI
  format(): string {
    const num = Number(this.toDecimal());
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: num % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(num);
  }

  get isZero(): boolean {
    return this.amount === 0n;
  }

  get isPositive(): boolean {
    return this.amount > 0n;
  }
}

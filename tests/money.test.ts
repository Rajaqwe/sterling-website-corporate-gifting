import { expect, test, describe } from 'vitest';
import { Money } from '../src/lib/money';

describe('Money arithmetic', () => {
  test('creates Money from integer paise', () => {
    const m = Money.fromInteger(1500);
    expect(m.toPaise()).toBe(1500);
    expect(m.toDecimal().toString()).toBe('15.00');
  });

  test('creates Money from decimal string', () => {
    const m = Money.fromDecimal('19.99');
    expect(m.toPaise()).toBe(1999);
  });
  
  test('creates Money from Decimal object', () => {
    const m = Money.fromDecimal({ toString: () => '45.5' } as any);
    expect(m.toPaise()).toBe(4550);
  });

  test('adds two Money objects', () => {
    const a = Money.fromInteger(1000);
    const b = Money.fromInteger(200);
    expect(a.add(b).toPaise()).toBe(1200);
  });

  test('subtracts two Money objects', () => {
    const a = Money.fromInteger(1000);
    const b = Money.fromInteger(200);
    expect(a.subtract(b).toPaise()).toBe(800);
  });

  test('multiplies Money by float', () => {
    const a = Money.fromInteger(1000); // 10.00
    // 10.00 * 1.18 = 11.80 (Minor units: 1000 * 1.18 = 1180)
    expect(a.multiply(1.18).toPaise()).toBe(1180);
  });

  test('throws error on multiply with NaN', () => {
    const a = Money.fromInteger(1000);
    expect(() => a.multiply(NaN)).toThrow();
  });
});

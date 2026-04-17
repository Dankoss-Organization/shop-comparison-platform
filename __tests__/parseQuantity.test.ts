import { expect, test, describe } from 'vitest';
import { parseQuantity } from '../src/lib/utils';

describe('Utility: parseQuantity', () => {
  test('should parse standard unit (packs/pcs)', () => {
    const result = parseQuantity("1 pack");
    expect(result).toEqual({ baseValue: 1, baseUnit: "pack", isWeight: false });
  });

  test('should parse kilograms with decimals', () => {
    const result = parseQuantity("1.5 kg");
    expect(result).toEqual({ baseValue: 1.5, baseUnit: "kg", isWeight: true });
  });

  test('should parse grams correctly', () => {
    const result = parseQuantity("500 g");
    expect(result).toEqual({ baseValue: 500, baseUnit: "g", isWeight: true });
  });

  test('should handle comma as decimal separator', () => {
    const result = parseQuantity("2,5 kg");
    expect(result).toEqual({ baseValue: 2.5, baseUnit: "kg", isWeight: true });
  });

  test('should fallback to default if no number is found', () => {
    const result = parseQuantity("invalid string");
    expect(result.baseValue).toBe(1);
    expect(result.baseUnit).toBe("pcs");
  });
});
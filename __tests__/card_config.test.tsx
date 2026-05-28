import { describe, test, expect } from 'vitest';
import { cardSizes } from '../src/Components/UI/card_config'; 

describe('cardSizes Configuration', () => {
  test('should define all required size variants', () => {

    expect(cardSizes).toHaveProperty('default');
    expect(cardSizes).toHaveProperty('compact');
    expect(cardSizes).toHaveProperty('recent');
  });

  test('each variant should have all required design tokens', () => {
    const requiredTokens = [
      'wrapper',
      'image',
      'container',
      'title',
      'meta',
      'price',
      'cta',
      'badge',
      'icon',
      'iconSize',
    ];

    Object.values(cardSizes).forEach((variantTokens) => {
      requiredTokens.forEach((token) => {
        expect(variantTokens).toHaveProperty(token);
        
        if (token === 'iconSize') {
          expect(typeof variantTokens[token as keyof typeof variantTokens]).toBe('number');
        } else {
          expect(typeof variantTokens[token as keyof typeof variantTokens]).toBe('string');
        }
      });
    });
  });

  test('should allow optional description property', () => {

    expect(typeof cardSizes.default.description).toBe('string');
    expect(typeof cardSizes.compact.description).toBe('string');
    expect(typeof cardSizes.recent.description).toBe('string');
  });

  test('default variant should have specific known baseline values', () => {

    expect(cardSizes.default.iconSize).toBe(16);
    expect(cardSizes.default.wrapper).toContain('w-full');
    expect(cardSizes.default.price).toContain('text-[1.4rem]');
  });
});
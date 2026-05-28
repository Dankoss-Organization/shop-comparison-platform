import { describe, test, expect } from 'vitest';
import { 
  mapProductCardToDealCard, 
  mapCatalogItemToDealCard,
  mapRelatedProductsToDealCards,
  mapStoreProductToDealCard,
  mapMeilisearchToDealCard
} from '../src/Lib/api/products_api.adapters'; 

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80";

describe('Products API Adapters', () => {

  describe('mapProductCardToDealCard', () => {
    test('should map a full product response correctly', () => {
      const mockResponse = {
        product: {
          id: 'prod-1',
          canonicalName: 'Test Banana 1 kg',
          brand: 'EcoFarm',
          category: 'Fruits',
          media: 'https://test.com/image.jpg',
          description: 'Fresh yellow bananas. Good for health.',
          measurements: { weight: '1 kg' },
          calories: '89',
          proteins_g: 1.1,
          fats_g: 0.3,
          carbohydrates_g: 22.8
        },
        topOffers: [
          {
            id: 'offer-1',
            store: { id: 's_silpo', brand: 'Silpo', city: 'Kyiv' },
            availability: 'in_stock',
            currentPrice: 50,
            oldPrice: 60,
            discountPercent: 16
          }
        ],
        pricingSummary: { bestPrice: 50, oldPrice: 60, discountPercent: 16, currency: 'UAH' },
        availabilityStatus: 'in_stock' as const,
        stats: { priceTrend: 'stable' as const, minPrice30d: 45, maxPrice30d: 65, avgPrice30d: 55 }
      };

      const result = mapProductCardToDealCard(mockResponse as any);


      expect(result.id).toBe('prod-1');
      expect(result.title).toBe('Test Banana 1 kg');
      expect(result.brand).toBe('EcoFarm');
      expect(result.image).toBe('https://test.com/image.jpg');

      expect(result.quantity).toBe('1 kg'); 

      expect(result.offers).toHaveLength(1);
      expect(result.offers[0].store_id).toBe('s_silpo');
      expect(result.offers[0].pricing.current_price).toBe(50);

      expect(result.nutrition.calories).toBe('89');
      expect(result.nutrition.protein).toBe('1.1 g');

      expect(result.descriptionSections).toEqual(['Fresh yellow bananas.', 'Good for health.']);
    });

    test('should fallback to default image if media is invalid or missing', () => {
      const mockResponse = {
        product: { id: 'prod-2', canonicalName: 'Test' },
        topOffers: []
      };

      const result = mapProductCardToDealCard(mockResponse as any);
      expect(result.image).toBe(FALLBACK_IMAGE);
    });

    test('should parse JSON media strings', () => {
      const jsonMedia = JSON.stringify({ main_image: 'https://real-image.com/pic.jpg' });
      const mockResponse = {
        product: { id: 'prod-3', canonicalName: 'Test', media: jsonMedia },
        topOffers: []
      };

      const result = mapProductCardToDealCard(mockResponse as any);
      expect(result.image).toBe('https://real-image.com/pic.jpg');
    });
  });

  describe('mapCatalogItemToDealCard', () => {
    test('should map catalog item with pseudo-offer and parse quantity from name', () => {
      const mockItem = {
        id: 'cat-1',
        canonicalName: 'Milk 900ml pack',
        bestPrice: 40,
        oldPrice: 45,
        discountPercent: 11,
        currency: 'UAH',
        offers: [{ storeId: 's_atb', price: 40, regularPrice: 45 }]
      };

      const result = mapCatalogItemToDealCard(mockItem);

      expect(result.id).toBe('cat-1');
      expect(result.title).toBe('Milk 900ml pack');
      expect(result.quantity).toBe('900ml'); 
      expect(result.detailsLine).toBe('900ml'); 

      expect(result.offers[0].store_name).toBe('ATB'); 
      expect(result.offers[0].pricing.current_price).toBe(40);
    });
  });

  describe('mapRelatedProductsToDealCards', () => {
    test('should map related products list', () => {
      const mockResponse = {
        related: [
          { id: 'rel-1', canonicalName: 'Bread 500g', bestPrice: 20, offersCount: 3 }
        ]
      };

      const results = mapRelatedProductsToDealCards(mockResponse as any);

      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('Bread 500g');
      expect(results[0].quantity).toBe('500g');
      expect(results[0].offers[0].store_name).toBe('3 stores');
    });
  });

  describe('mapStoreProductToDealCard', () => {
    test('should map a specific store product correctly', () => {
      const mockItem = {
        productId: 'store-prod-1',
        canonicalName: 'Cheese 200g',
        currentPrice: 100,
        regularPrice: 120,
        discountPercent: 16,
        availabilityStatus: 'in_stock'
      };

      const result = mapStoreProductToDealCard(mockItem as any, 's_novus', 'Novus');

      expect(result.id).toBe('store-prod-1');
      expect(result.offers).toHaveLength(1);
      expect(result.offers[0].store_id).toBe('s_novus');
      expect(result.offers[0].store_name).toBe('Novus');
      expect(result.offers[0].pricing.current_price).toBe(100);
    });
  });

  describe('mapMeilisearchToDealCard', () => {
    test('should map search results correctly', () => {
      const mockSearchItem = {
        id: 'search-1',
        canonicalName: 'Search Item 1kg',
        bestPrice: 150,
        storeNames: ['Silpo', 'Novus']
      };

      const result = mapMeilisearchToDealCard(mockSearchItem as any);

      expect(result.id).toBe('search-1');
      expect(result.quantity).toBe('1kg');
      expect(result.offers[0].store_name).toBe('Silpo');
      expect(result.offers[0].pricing.current_price).toBe(150);
    });
  });
});
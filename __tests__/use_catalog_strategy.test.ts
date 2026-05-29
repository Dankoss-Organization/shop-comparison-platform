import { describe, test, expect, vi, beforeEach } from 'vitest';
import { strategies } from '../src/Lib/use_catalog_strategy'; 


vi.mock('@/Data/home_data', () => ({
  seasonalRecipes: [
    { id: 'sr1', title: 'Autumn Pumpkin Soup', description: 'Warm and cozy' },
    { id: 'sr2', title: 'Winter Stew', description: 'Hearty meal' }
  ],
  peopleLiked: [
    { id: 'pl1', title: 'Summer Salad', description: 'Fresh and light' }
  ]
}));

const mockGetRecipes = vi.fn();
const mockGetProducts = vi.fn();

vi.mock('@/Lib/api/index', () => ({
  getRecipesApi: () => ({ getRecipes: mockGetRecipes }),
  getProductsApi: () => ({ getProducts: mockGetProducts })
}));

const mockSearch = vi.fn();
vi.mock('@/Lib/api/search_api.client', () => ({
  searchApi: { search: mockSearch }
}));

vi.mock('@/Lib/api/products_api.adapters', () => ({
  mapCatalogItemToDealCard: vi.fn((item) => ({ title: item.name, mappedFrom: 'catalog' })),
  mapMeilisearchToDealCard: vi.fn((item) => ({ title: item.name, mappedFrom: 'meili' }))
}));

describe('Catalog Strategies', () => {
  beforeEach(() => {
    vi.clearAllMocks(); 
  });

  describe('Recipes Strategy', () => {
    test('should fetch from API successfully and map data', async () => {

      mockGetRecipes.mockResolvedValueOnce({
        items: [{ id: '1', name: 'Test Recipe', difficulty: 'Easy', prepTime: 15, servings: 2 }],
        total: 1,
        totalPages: 1
      });

      const result = await strategies.recipes.fetchData({ page: 1, limit: 10 });

      expect(mockGetRecipes).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
        search: undefined,
        categoryId: undefined
      });
      
      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe('Test Recipe');
      expect(result.items[0]._uniqueId).toContain('1-r1-0');
    });

    test('should fallback to local mock data if API fails', async () => {

      mockGetRecipes.mockRejectedValueOnce(new Error('Network Error'));

      const result = await strategies.recipes.fetchData({ page: 1, limit: 10, categoryId: 'seasonal-recipes' });

      expect(result.items).toHaveLength(2);
      expect(result.items[0].title).toBe('Autumn Pumpkin Soup');
      expect(result.total).toBe(2);
    });

    test('should filter fallback local data by search term', async () => {
      mockGetRecipes.mockRejectedValueOnce(new Error('API Down'));

      const result = await strategies.recipes.fetchData({ page: 1, limit: 10, search: 'salad' });

      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe('Summer Salad');
    });
  });

  describe('Products Strategy', () => {
    test('should use searchApi when search term is provided', async () => {
      mockSearch.mockResolvedValueOnce({
        results: [{ id: 'm1', name: 'Search Product' }],
        totalHits: 1,
        totalPages: 1
      });

      const result = await strategies.products.fetchData({ page: 1, limit: 10, search: 'apple' });

      expect(mockSearch).toHaveBeenCalledWith('apple', 10, 0); 
      expect(result.items).toHaveLength(1);
      expect((result.items[0] as any).mappedFrom).toBe('meili');
      expect(result.items[0]._uniqueId).toContain('m1-s1-0');
    });

    test('should use getProductsApi when no search term is provided', async () => {
      mockGetProducts.mockResolvedValueOnce({
        items: [{ id: 'p1', name: 'Backend Product' }],
        total: 1,
        totalPages: 1
      });

      const result = await strategies.products.fetchData({ page: 1, limit: 10, categoryId: 'in-stock' });

      expect(mockGetProducts).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
        search: undefined,
        sort: 'updated', 
        categoryId: undefined, 
        inStock: true
      });

      expect(result.items).toHaveLength(1);
      expect((result.items[0] as any).mappedFrom).toBe('catalog');
      expect(result.items[0]._uniqueId).toContain('p1-p1-0');
    });

    test('should map backend sorting order correctly', async () => {
      mockGetProducts.mockResolvedValueOnce({ items: [], total: 0, totalPages: 1 });

      await strategies.products.fetchData({ page: 1, limit: 10, sort: 'name' });

      expect(mockGetProducts).toHaveBeenCalledWith(
        expect.objectContaining({ sort: 'name' })
      );
    });

    test('should throw error if API completely fails (no fallback for products)', async () => {
      mockGetProducts.mockRejectedValueOnce(new Error('Fatal Error'));

      await expect(
        strategies.products.fetchData({ page: 1, limit: 10 })
      ).rejects.toThrow('Fatal Error');
    });
  });
});
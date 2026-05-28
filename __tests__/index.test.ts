import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { getApiBaseUrl, getProductsApi, getRecipesApi, getCartApi } from '../src/Lib/api/index'; 
import { ProductsApiClient } from '@/Lib/api/products_api.client';
import { RecipesApiClient } from '@/Lib/api/recipes_api.client';
import { CartApiClient } from '@/Lib/api/cart_api.client';

vi.mock('@/Lib/api/products_api.client', () => ({
  ProductsApiClient: vi.fn()
}));
vi.mock('@/Lib/api/recipes_api.client', () => ({
  RecipesApiClient: vi.fn()
}));
vi.mock('@/Lib/api/cart_api.client', () => ({
  CartApiClient: vi.fn()
}));

describe('API Index Entrypoint', () => {
  const originalEnv = process.env;
  let originalWindow: typeof window | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };

    originalWindow = global.window;
  });

  afterEach(() => {
    process.env = originalEnv;
    if (originalWindow !== undefined) {
      global.window = originalWindow;
    } else {

      delete global.window;
    }
  });

  describe('getApiBaseUrl', () => {
    test('should return API_INTERNAL_BASE_URL on server-side', () => {
      delete global.window; 
      process.env.API_INTERNAL_BASE_URL = 'http://internal-api:8080';
      
      expect(getApiBaseUrl()).toBe('http://internal-api:8080');
    });

    test('should return default localhost on server-side if env var is missing', () => {
      delete global.window;
      delete process.env.API_INTERNAL_BASE_URL;
      
      expect(getApiBaseUrl()).toBe('http://localhost:3000');
    });

    test('should return NEXT_PUBLIC_API_URL on client-side', () => {
      global.window = originalWindow || {} as Window & typeof globalThis;
      process.env.NEXT_PUBLIC_API_URL = 'https://api.public.com';
      
      expect(getApiBaseUrl()).toBe('https://api.public.com');
    });

    test('should return empty string on client-side if env var is missing', () => {
      global.window = originalWindow || {} as Window & typeof globalThis;
      delete process.env.NEXT_PUBLIC_API_URL;
      
      expect(getApiBaseUrl()).toBe('');
    });
  });

  describe('API Factories', () => {
    beforeEach(() => {
      global.window = originalWindow || {} as Window & typeof globalThis;
      process.env.NEXT_PUBLIC_API_URL = 'https://test.api';
    });

    test('getProductsApi should instantiate ProductsApiClient with correct baseUrl', () => {
      getProductsApi();
      expect(ProductsApiClient).toHaveBeenCalledTimes(1);
      expect(ProductsApiClient).toHaveBeenCalledWith({ baseUrl: 'https://test.api' });
    });

    test('getRecipesApi should instantiate RecipesApiClient with correct baseUrl', () => {
      getRecipesApi();
      expect(RecipesApiClient).toHaveBeenCalledTimes(1);
      expect(RecipesApiClient).toHaveBeenCalledWith({ baseUrl: 'https://test.api' });
    });

    test('getCartApi should instantiate CartApiClient with correct baseUrl', () => {
      getCartApi();
      expect(CartApiClient).toHaveBeenCalledTimes(1);
      expect(CartApiClient).toHaveBeenCalledWith({ baseUrl: 'https://test.api' });
    });
  });
});
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { CartApiClient } from '../src/Lib/api/cart_api.client'; 
import { ApiClientError } from '../src/Lib/api/products_api.client'; 

describe('CartApiClient', () => {
  let mockFetch: any;
  let client: CartApiClient;

  const baseUrl = 'https://api.example.com';
  const baseUrlWithSlash = 'https://api.example.com/';

  beforeEach(() => {
    vi.clearAllMocks();
 
    mockFetch = vi.fn();
    
    client = new CartApiClient({
      baseUrl,
      fetchImpl: mockFetch,
    });
  });

  const mockSuccessResponse = (body: any) => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(typeof body === 'string' ? body : JSON.stringify(body)),
    });
  };

  const mockErrorResponse = (status: number, body: any) => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status,
      text: () => Promise.resolve(typeof body === 'string' ? body : JSON.stringify(body)),
    });
  };

  describe('getCart', () => {
    test('should make a GET request to the correct URL with auth token', async () => {
      const mockResponse = { items: [], total: 0 };
      mockSuccessResponse(mockResponse);

      const result = await client.getCart('test-token');

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/api/v1/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    test('should make a GET request without auth token', async () => {
      mockSuccessResponse({ items: [] });
      await client.getCart();

      expect(mockFetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        headers: {
          'Content-Type': 'application/json',
        },
      }));
    });
  });

  describe('addCartItem', () => {
    test('should make a POST request with correct body', async () => {
      const requestData = { offerId: 'prod-1', quantity: 2 };
      const responseData = { id: 'item-1', ...requestData };
      mockSuccessResponse(responseData);

      const result = await client.addCartItem(requestData, 'test-token');

      expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/api/v1/cart/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token',
        },
        body: JSON.stringify(requestData),
      });
      expect(result).toEqual(responseData);
    });
  });

  describe('updateCartItemQuantity', () => {
    test('should make a PATCH request with URL-encoded itemId', async () => {
      mockSuccessResponse({}); 

      const itemId = 'item 123/456'; 
      const requestData = { quantity: 5 };

      await client.updateCartItemQuantity(itemId, requestData);

      expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/api/v1/cart/items/item%20123%2F456', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
    });
  });

  describe('deleteCartItem', () => {
    test('should make a DELETE request', async () => {
      mockSuccessResponse({});

      await client.deleteCartItem('item-1', 'test-token');

      expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/api/v1/cart/items/item-1', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token',
        },
      });
    });
  });

  describe('URL Handling', () => {
    test('should strip trailing slash from baseUrl', async () => {
      mockSuccessResponse({});
      
      const clientWithSlash = new CartApiClient({
        baseUrl: baseUrlWithSlash,
        fetchImpl: mockFetch,
      });

      await clientWithSlash.getCart();

      expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/api/v1/cart', expect.any(Object));
    });
  });

  describe('Error Handling', () => {
    test('should throw ApiClientError with parsed message on 400 Bad Request', async () => {
      const errorPayload = { message: 'Invalid quantity' };
      mockErrorResponse(400, errorPayload);

      try {
        await client.getCart();
        expect(true).toBe(false);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ApiClientError);
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe('Invalid quantity');
        expect(error.payload).toEqual(errorPayload);
      }
    });

    test('should throw ApiClientError with default message if response is not JSON', async () => {
      const errorText = 'Internal Server Error';
      mockErrorResponse(500, errorText);

      try {
        await client.getCart();
        expect(true).toBe(false);
      } catch (error: any) {
        expect(error).toBeInstanceOf(ApiClientError);
        expect(error.statusCode).toBe(500);
        expect(error.message).toBe('Request failed with status 500');
        expect(error.payload).toBe(errorText); 
      }
    });
  });
});
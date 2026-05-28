/**
 * @file cart_api.client.ts
 * @brief HTTP client layer interacting with internal endpoints for the Cart.
 */

import { ApiClientError } from "./products_api.client";
import type { ApiErrorResponse } from "./products_api.contracts";
import type {
  CartResponse,
  AddCartItemRequest,
  AddCartItemResponse,
  UpdateCartItemRequest,
} from "./cart_api.contracts";

export interface CartApiClientOptions {
  baseUrl: string;
  fetchImpl?: typeof fetch;
}

export class CartApiClient {
  private readonly fetchImpl: typeof fetch;

  constructor(private readonly options: CartApiClientOptions) {
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch.bind(globalThis);
  }

  getCart(token?: string): Promise<CartResponse> {
    return this.request<CartResponse>("/api/v1/cart", {
      method: "GET",
      headers: this.getHeaders(token),
    });
  }

  addCartItem(data: AddCartItemRequest, token?: string): Promise<AddCartItemResponse> {
    return this.request<AddCartItemResponse>("/api/v1/cart/items", {
      method: "POST",
      headers: this.getHeaders(token),
      body: JSON.stringify(data),
    });
  }

  updateCartItemQuantity(itemId: string, data: UpdateCartItemRequest, token?: string): Promise<void> {
    return this.request<void>(`/api/v1/cart/items/${encodeURIComponent(itemId)}`, {
      method: "PATCH",
      headers: this.getHeaders(token),
      body: JSON.stringify(data),
    });
  }

  deleteCartItem(itemId: string, token?: string): Promise<void> {
    return this.request<void>(`/api/v1/cart/items/${encodeURIComponent(itemId)}`, {
      method: "DELETE",
      headers: this.getHeaders(token),
    });
  }

  private getHeaders(token?: string): HeadersInit {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const url = `${this.stripTrailingSlash(this.options.baseUrl)}${path}`;
    const response = await this.fetchImpl(url, init);
    
    const text = await response.text();
    let payload: unknown = undefined;
    
    if (text) {
      try {
        payload = JSON.parse(text);
      } catch {
        payload = text;
      }
    }

    if (!response.ok) {
      const defaultMessage = `Request failed with status ${response.status}`;
      const apiMessage =
        typeof payload === "object" && payload !== null && "message" in payload
          ? String((payload as ApiErrorResponse).message)
          : defaultMessage;

      throw new ApiClientError(response.status, apiMessage, payload);
    }

    return payload as T;
  }

  private stripTrailingSlash(url: string): string {
    return url.endsWith("/") ? url.slice(0, -1) : url;
  }
}
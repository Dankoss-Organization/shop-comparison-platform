/**
 * @file users_api.client.ts
 * @brief HTTP client for user-related endpoints (favorites).
 */

import { ApiClientError } from "./products_api.client";
import type { ApiErrorResponse } from "./products_api.contracts";

export interface UsersApiClientOptions {
  baseUrl: string;
  fetchImpl?: typeof fetch;
}

export interface FavoritesResponse {
  productIds: string[];
}

export interface FavoriteActionResponse {
  success: boolean;
  productId: string;
}

export class UsersApiClient {
  private readonly fetchImpl: typeof fetch;

  constructor(private readonly options: UsersApiClientOptions) {
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch.bind(globalThis);
  }

  getMyFavorites(): Promise<FavoritesResponse> {
    return this.request<FavoritesResponse>("/api/v1/users/me/favorites", { method: "GET" });
  }

  addToFavorites(productId: string): Promise<FavoriteActionResponse> {
    return this.request<FavoriteActionResponse>(
      `/api/v1/users/me/favorites/${encodeURIComponent(productId)}`,
      { method: "POST" }
    );
  }

  removeFromFavorites(productId: string): Promise<FavoriteActionResponse> {
    return this.request<FavoriteActionResponse>(
      `/api/v1/users/me/favorites/${encodeURIComponent(productId)}`,
      { method: "DELETE" }
    );
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${this.stripTrailingSlash(this.options.baseUrl)}${path}`;
  const { useUserStore } = await import("@/Store/user_store");
  const token = typeof document !== "undefined"
    ? document.cookie.match(/(?:^|;\s*)token=([^;]*)/)?.[1]
    : undefined;

  const response = await this.fetchImpl(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

    const text = await response.text();
    let payload: unknown = undefined;
    if (text) {
      try { payload = JSON.parse(text); } catch { payload = text; }
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
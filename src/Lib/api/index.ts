/**
 * @file index.ts
 * @description Centralized frontend API entrypoint for backend clients.
 */

import { ProductsApiClient } from "@/Lib/api/products_api.client";

export function getApiBaseUrl(): string {
  if (typeof window === "undefined" && process.env.API_INTERNAL_BASE_URL?.trim()) {
    return process.env.API_INTERNAL_BASE_URL.trim();
  }

  if (process.env.NEXT_PUBLIC_API_BASE_URL?.trim()) {
    return process.env.NEXT_PUBLIC_API_BASE_URL.trim();
  }

  return "http://localhost:3001";
}

export const productsApi = new ProductsApiClient({
  baseUrl: getApiBaseUrl(),
});

export * from "@/Lib/api/products_api.shared";
/**
 * @file index.ts
 * @description Centralized frontend API entrypoint for backend clients.
 */

import { ProductsApiClient } from "@/Lib/api/products_api.client";

export function getApiBaseUrl(): string {
  if (typeof window === "undefined") {
    return process.env.API_INTERNAL_BASE_URL?.trim() || "http://localhost:3000";
  }
  return "";
}

export function getProductsApi() {
  return new ProductsApiClient({ baseUrl: getApiBaseUrl() });
}

export * from "@/Lib/api/products_api.shared";
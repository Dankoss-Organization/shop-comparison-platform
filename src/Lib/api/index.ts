/**
 * @file index.ts
 * @description Centralized frontend API entrypoint for backend clients.
 */

import { ProductsApiClient } from "@/Lib/api/products_api.client";
import { RecipesApiClient } from "@/Lib/api/recipes_api.client";
import { CartApiClient } from "@/Lib/api/cart_api.client"; // <-- Add this

/**
 * Resolves the correct base URL depending on the environment.
 */
export function getApiBaseUrl(): string {
  if (typeof window === "undefined") {
    return (
      process.env.API_INTERNAL_BASE_URL?.trim() ||
      "http://localhost:3000"
    );
  }
  return process.env.NEXT_PUBLIC_API_URL?.trim() || "";
}

/**
 * Factory for Products API client.
 */
export function getProductsApi(): ProductsApiClient {
  return new ProductsApiClient({
    baseUrl: getApiBaseUrl(),
  });
}

/**
 * Factory for Recipes API client.
 */
export function getRecipesApi(): RecipesApiClient {
  return new RecipesApiClient({
    baseUrl: getApiBaseUrl(),
  });
}

/**
 * Factory for Cart API client.
 */
export function getCartApi(): CartApiClient {
  return new CartApiClient({
    baseUrl: getApiBaseUrl(),
  });
}

export * from "@/Lib/api/products_api.shared";
export * from "@/Lib/api/recipes_api.shared";
export * from "@/Lib/api/cart_api.shared"; // <-- Add this
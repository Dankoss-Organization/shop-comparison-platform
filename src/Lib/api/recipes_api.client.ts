/**
 * @file recipes_api.client.ts
 * @brief HTTP client layer interacting with internal endpoints for recipe listings, categories, and related recipes.
 */

import { ApiClientError } from "./products_api.client";
import type {
  ApiErrorResponse,
  GetRecipesQuery,
  RecipesResponse,
  GetRecipeCategoriesQuery,
  RecipeCategoriesResponse,
  GetRelatedRecipesQuery,
  RelatedRecipesResponse,
  RecipeDetailsResponse,
} from "./recipes_api.contracts";

export interface RecipesApiClientOptions {
  baseUrl: string;
  fetchImpl?: typeof fetch;
}

export class RecipesApiClient {
  private readonly fetchImpl: typeof fetch;

  constructor(private readonly options: RecipesApiClientOptions) {
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch.bind(globalThis);
  }

  getRecipes(query: GetRecipesQuery = {}): Promise<RecipesResponse> {
    return this.request<RecipesResponse>(`/api/v1/recipes${toQueryString(query)}`);
  }

  getCategories(query: GetRecipeCategoriesQuery = {}): Promise<RecipeCategoriesResponse> {
    return this.request<RecipeCategoriesResponse>(`/api/v1/recipes/categories${toQueryString(query)}`);
  }

  getRecipeDetails(id: string): Promise<RecipeDetailsResponse> {
    return this.request<RecipeDetailsResponse>(`/api/v1/recipes/${encodeURIComponent(id)}`);
  }

  getRelatedRecipes(id: string, query: GetRelatedRecipesQuery = {}): Promise<RelatedRecipesResponse> {
    return this.request<RelatedRecipesResponse>(
      `/api/v1/recipes/${encodeURIComponent(id)}/related${toQueryString(query)}`
    );
  }

  private async request<T>(path: string): Promise<T> {
    const url = `${stripTrailingSlash(this.options.baseUrl)}${path}`;
    const response = await this.fetchImpl(url);
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
}

function toQueryString<T extends object>(query: T): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query as Record<string, unknown>)) {
    if (value === undefined || value === null) continue;
    if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") continue;
    params.set(key, String(value));
  }
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export const recipesClient = new RecipesApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});
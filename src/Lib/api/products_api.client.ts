/**
 * @file products_api.client.ts
 * @brief HTTP client layer interacting with internal endpoints for product catalogs, offers, pricing history, and metadata.
 */

import type {
  ApiErrorResponse,
  CategoriesResponse,
  GetProductOffersQuery,
  GetProductPriceHistoryQuery,
  GetProductsQuery,
  GetRelatedProductsQuery,
  ProductCardResponse,
  ProductCatalogResponse,
  ProductOffersResponse,
  ProductPriceHistoryResponse,
  RelatedProductsResponse,
} from "@/Lib/api/products_api.contracts";

/**
 * @brief Custom error wrapper representing failed structural API lifecycle responses.
 */
export class ApiClientError extends Error {
  readonly statusCode: number;
  readonly payload?: ApiErrorResponse | unknown;

  constructor(statusCode: number, message: string, payload?: ApiErrorResponse | unknown) {
    super(message);
    this.name = "ApiClientError";
    this.statusCode = statusCode;
    this.payload = payload;
  }
}

/**
 * @brief Client provider executing data mutations and query listings over catalog assets.
 */
export interface ProductsApiClientOptions {
  baseUrl: string;
  fetchImpl?: typeof fetch;
}

export class ProductsApiClient {
  private readonly fetchImpl: typeof fetch;

  constructor(private readonly options: ProductsApiClientOptions) {
    this.fetchImpl = options.fetchImpl ?? globalThis.fetch.bind(globalThis);
  }

  getProductCard(id: string): Promise<ProductCardResponse> {
    return this.request<ProductCardResponse>(`/api/v1/products/${encodeURIComponent(id)}/card`);
  }

  getProductOffers(id: string, query: GetProductOffersQuery = {}): Promise<ProductOffersResponse> {
    return this.request<ProductOffersResponse>(
      `/api/v1/products/${encodeURIComponent(id)}/offers${toQueryString(query)}`
    );
  }

  getProductPriceHistory(id: string, query: GetProductPriceHistoryQuery = {}): Promise<ProductPriceHistoryResponse> {
    return this.request<ProductPriceHistoryResponse>(
      `/api/v1/products/${encodeURIComponent(id)}/price-history${toQueryString(query)}`
    );
  }

  getRelatedProducts(id: string, query: GetRelatedProductsQuery = {}): Promise<RelatedProductsResponse> {
    return this.request<RelatedProductsResponse>(
      `/api/v1/products/${encodeURIComponent(id)}/related${toQueryString(query)}`
    );
  }

  getProducts(query: GetProductsQuery = {}): Promise<ProductCatalogResponse> {
    return this.request<ProductCatalogResponse>(`/api/v1/products${toQueryString(query)}`);
  }

  getCategories(query: { parentId?: string } = {}): Promise<CategoriesResponse> {
    return this.request<CategoriesResponse>(`/api/v1/products/categories${toQueryString(query)}`);
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
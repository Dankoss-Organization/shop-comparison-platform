export type SearchProduct = {
  id: string;
  canonicalName: string;
  brand: string | null;
  category: string;
  media: string;
  description: string | null;
  bestPrice: number | null;
  oldPrice: number | null;
  discountPercent: number | null;
  currency: "UAH";
  offersCount: number;
  storeNames: string[];
};

export type SearchResult = {
  results: SearchProduct[];
  totalHits: number;
  query: string;
  processingTimeMs: number;
  totalPages: number;
  page: number;
};

const BASE = "/api/v1/search";

export const searchApi = {
  search: async (q: string, limit = 20, offset = 0): Promise<SearchResult> => {
    const res = await fetch(`${BASE}?q=${encodeURIComponent(q)}&limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new Error("Search failed");
    return res.json();
  },

  suggestions: async (q: string, limit = 6): Promise<string[]> => {
    const res = await fetch(`${BASE}/suggestions?q=${encodeURIComponent(q)}&limit=${limit}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.suggestions;
  },

  advanced: async (params: {
    q: string;
    page?: number;
    limit?: number;
    categoryId?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    stores?: string;
    sortField?: string;
    sortDirection?: "asc" | "desc";
  }): Promise<SearchResult> => {
    const url = new URL(`${BASE}/advanced`, window.location.origin);
    url.searchParams.set("q", params.q);
    if (params.page) url.searchParams.set("page", String(params.page));
    if (params.limit) url.searchParams.set("limit", String(params.limit));
    if (params.categoryId) url.searchParams.set("filters[categoryId]", params.categoryId);
    if (params.brand) url.searchParams.set("filters[brand]", params.brand);
    if (params.minPrice !== undefined) url.searchParams.set("filters[minPrice]", String(params.minPrice));
    if (params.maxPrice !== undefined) url.searchParams.set("filters[maxPrice]", String(params.maxPrice));
    if (params.stores) url.searchParams.set("filters[stores]", params.stores);
    if (params.sortField) url.searchParams.set("sort[field]", params.sortField);
    if (params.sortDirection) url.searchParams.set("sort[direction]", params.sortDirection);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error("Advanced search failed");
    return res.json();
  },
};
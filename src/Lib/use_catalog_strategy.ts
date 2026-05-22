/**
 * @file use_catalog_strategy.ts
 * @brief Strategy pattern implementation separating data sourcing and listing operations between local recipes and backend product APIs.
 */

"use client";

import { seasonalRecipes, peopleLiked, type DealCard } from "@/Data/home_data";
import { productsApi } from "@/Lib/api/index";
import { mapCatalogItemToDealCard, mapProductCardToDealCard } from "@/Lib/api/products_api.adapters";

/**
 * @brief Represents a specific navigation node category option within a catalog tab layout.
 */
export interface CatalogCategory {
  id: string;
  label: string;
  slug: string;
}

/**
 * @brief Unified criteria parameters used for executing paginated filter workflows.
 */
export interface StrategyFetchParams {
  page: number;
  limit: number;
  search?: string;
  categoryId?: string;
  sort?: string;
}

/**
 * @brief Structural encapsulation detailing a resolved paginated segment slice data block.
 */
export interface StrategyFetchResult {
  items: (DealCard & { _cat?: string; _uniqueId?: string })[];
  total: number;
  totalPages: number;
}

/**
 * @brief Contract definition guaranteeing consistent layout and lookup structures across tab view domains.
 */
export interface CatalogStrategy {
  categories: CatalogCategory[];
  fetchData: (params: StrategyFetchParams) => Promise<StrategyFetchResult>;
}

function truncate(str: string | undefined, length = 80) {
  if (!str) return "";
  if (str.length <= length) return str;
  return str.substring(0, length) + "...";
}

/**
 * @brief Dictionary matching layout strategies mapped to structural navigation keys.
 */
export const strategies: Record<"recipes" | "products", CatalogStrategy> = {
  recipes: {
    categories: [
      { id: "all",              label: "All Recipes",      slug: "/catalog?tab=recipes&category=all" },
      { id: "seasonal-recipes", label: "Seasonal Recipes", slug: "/catalog?tab=recipes&category=seasonal-recipes" },
      { id: "people-liked",     label: "People Also Liked",slug: "/catalog?tab=recipes&category=people-liked" },
    ],

    async fetchData(params) {
      const source =
        params.categoryId === "seasonal-recipes" ? seasonalRecipes
        : params.categoryId === "people-liked"   ? peopleLiked
        : [...seasonalRecipes, ...peopleLiked];

      const filtered = params.search?.trim()
        ? source.filter((r) => r.title.toLowerCase().includes(params.search!.toLowerCase()))
        : source;

      const total      = filtered.length;
      const totalPages = Math.max(1, Math.ceil(total / params.limit));
      const start      = (params.page - 1) * params.limit;
      const page       = filtered.slice(start, start + params.limit);

      const items = page.map((item, i) => ({
        ...item,
        description: truncate(item.description),
        _cat: params.categoryId ?? "all",
        _uniqueId: `${item.id}-r${params.page}-${i}`,
      }));

      return { items, total, totalPages };
    },
  },

  products: {
    categories: [
      { id: "all",      label: "All Products", slug: "/catalog?tab=products&category=all" },
      { id: "in-stock", label: "In Stock Now",  slug: "/catalog?tab=products&category=in-stock" },
    ],

    async fetchData(params) {
      try {
        const isAll     = !params.categoryId || params.categoryId === "all";
        const isInStock = params.categoryId === "in-stock";
        const backendSortOrder: "name" | "updated" = params.sort === "name" ? "name" : "updated";

        const response = await productsApi.getProducts({
          page:       params.page,
          limit:      params.limit,
          search:     params.search?.trim() || undefined,
          sort:       backendSortOrder, 
          categoryId: isAll || isInStock ? undefined : params.categoryId,
          inStock:    isInStock ? true : undefined,
        });

        const targetItems = response?.items || [];

        const cardResults = await Promise.allSettled(
          targetItems.map((item) => productsApi.getProductCard(item.productId)),
        );

        const items = targetItems.map((catalogItem, i) => {
          const cardResult = cardResults[i];

          const dealCard =
            cardResult.status === "fulfilled"
              ? mapProductCardToDealCard(cardResult.value)
              : mapCatalogItemToDealCard(catalogItem);

          return {
            ...dealCard,
            _cat:      params.categoryId ?? "all",
            _uniqueId: `${catalogItem.productId}-p${params.page}-${i}`,
          };
        });

        return {
          items,
          total:      response?.total ?? 0,
          totalPages: response?.totalPages ?? 1,
        };
      } catch (error) {
        console.error("[CatalogStrategy] fetchData failed:", error);
        return { items: [], total: 0, totalPages: 1 };
      }
    },
  },
};
/**
 * @file use_catalog_strategy.ts
 * @description Strategy pattern implementation separating data sourcing and listing operations between local recipes and backend product APIs.
 */

"use client";

import { seasonalRecipes, peopleLiked, type DealCard } from "@/Data/home_data";
import { getProductsApi, getRecipesApi } from "@/Lib/api/index";
import { mapCatalogItemToDealCard, mapMeilisearchToDealCard } from "@/Lib/api/products_api.adapters";
import { searchApi } from "@/Lib/api/search_api.client";
import type { RecipeListItem } from "@/Lib/api/recipes_api.contracts";

export interface CatalogCategory {
  id: string;
  label: string;
  slug: string;
}

export interface StrategyFetchParams {
  page: number;
  limit: number;
  search?: string;
  categoryId?: string;
  sort?: string;
}

export interface StrategyFetchResult {
  items: (DealCard & { _cat?: string; _uniqueId?: string })[];
  total: number;
  totalPages: number;
}

export interface CatalogStrategy {
  categories: CatalogCategory[];
  fetchData: (params: StrategyFetchParams) => Promise<StrategyFetchResult>;
}

function truncate(str: string | undefined, length = 80) {
  if (!str) return "";
  if (str.length <= length) return str;
  return str.substring(0, length) + "...";
}

function mapRecipeToDealCard(recipe: RecipeListItem): DealCard {
  return {
    id: recipe.id,
    internalId: recipe.id,
    title: recipe.name,
    rawTitle: recipe.name,
    category: recipe.categoryId,
    brand: undefined,
    image: recipe.imageUrl || "/fallback-recipe.jpg",
    description: `${recipe.difficulty} • ${recipe.prepTime} min`,
    quantity: `${recipe.servings} servings`,
    rating: String(recipe.avgRating ?? 0),
    nutrition: {
      calories: "N/A",
      carbs: "N/A",
      fats: "N/A",
      protein: "N/A",
      fiber: "N/A", 
      sugar: "N/A", 
    },
    offers: [
      {
        store_id: "recipe",
        store_name: "Recipes",
        is_in_stock: true,
        pricing: { current_price: 0, regular_price: 0, discount_percent: 0 },
      },
    ],
    pricingSummary: { bestPrice: 0, oldPrice: 0, discountPercent: 0 },
    currency: "UAH",
    availabilityStatus: "in_stock",
    notes: [],
  } as DealCard;
}

export const strategies: Record<"recipes" | "products", CatalogStrategy> = {
  recipes: {
    categories: [
      { id: "all",              label: "All Recipes",       slug: "/catalog?tab=recipes&category=all" },
      { id: "seasonal-recipes", label: "Seasonal Recipes",  slug: "/catalog?tab=recipes&category=seasonal-recipes" },
      { id: "people-liked",     label: "People Also Liked", slug: "/catalog?tab=recipes&category=people-liked" },
    ],

    async fetchData(params) {
      try {
        const response = await getRecipesApi().getRecipes({
          page: params.page,
          limit: params.limit,
          search: params.search?.trim() || undefined,
          categoryId: params.categoryId === "all" ? undefined : params.categoryId,
        });

        if (response && response.items && response.items.length > 0) {
          const items = response.items.map((recipe: RecipeListItem, i: number) => {
            const dealCard = mapRecipeToDealCard(recipe);
            return {
              ...dealCard,
              _cat: params.categoryId ?? "all",
              _uniqueId: `${recipe.id}-r${params.page}-${i}`,
            };
          });

          return {
            items,
            total: response.total,
            totalPages: response.totalPages,
          };
        }
      } catch (error) {
        console.warn("[CatalogStrategy] Recipe API unavailable or failed, falling back to mock data.", error);
      }

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
      { id: "in-stock", label: "In Stock Now", slug: "/catalog?tab=products&category=in-stock" },
    ],

    async fetchData(params) {
      try {
        if (params.search?.trim()) {
          const res = await searchApi.search(params.search.trim(), params.limit, (params.page - 1) * params.limit);
          const items = res.results.map((item, i) => {
            const dealCard = mapMeilisearchToDealCard(item);
            dealCard.id = item.id;

            return {
              ...dealCard,
              _cat: params.categoryId ?? "all",
              _uniqueId: `${item.id}-s${params.page}-${i}`,
            };
          });
          return { items, total: res.totalHits, totalPages: res.totalPages };
        }
        
        const isAll     = !params.categoryId || params.categoryId === "all";
        const isInStock = params.categoryId === "in-stock";
        const backendSortOrder: "name" | "updated" = params.sort === "name" ? "name" : "updated";

        const response = await getProductsApi().getProducts({
          page:       params.page,
          limit:      params.limit,
          search:     params.search?.trim() || undefined,
          sort:       backendSortOrder,
          categoryId: isAll || isInStock ? undefined : params.categoryId,
          inStock:    isInStock ? true : undefined,
        });

        const targetItems = response?.items || [];

        const items = targetItems.map((catalogItem, i) => {
          const dealCard = mapCatalogItemToDealCard(catalogItem);
          
          dealCard.id = catalogItem.id;

          return {
            ...dealCard,
            _cat:      params.categoryId ?? "all",
            _uniqueId: `${catalogItem.id}-p${params.page}-${i}`,
          };
        });

        return {
          items,
          total:      response?.total ?? 0,
          totalPages: response?.totalPages ?? 1,
        };
      } catch (error) {
        console.error("[CatalogStrategy] fetchData failed:", error);
        throw error;
      }
    },
  },
};
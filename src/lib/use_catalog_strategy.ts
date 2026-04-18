/**
 * @file use_catalog_strategy.ts
 * @description Defines the data-fetching and categorization strategies for the catalog.
 * @pattern Strategy Pattern: Encapsulates the specific logic for formatting, categorizing, and retrieving different types of catalog items (Products vs. Recipes) behind a common interface.
 * @pattern Data Mocking: Uses a helper to multiply smaller datasets into larger arrays to simulate a robust, paginated backend response.
 */

import { 
  weekDiscounts, 
  dailyDiscounts, 
  expiringDiscounts, 
  seasonalRecipes, 
  peopleLiked,
  type DealCard 
} from "@/Data/home_data";

/**
 * Represents a selectable category/filter tab within a specific catalog strategy.
 * @property {string} id - The internal identifier used for state matching (e.g., "week-discounts").
 * @property {string} label - The human-readable name displayed in the UI.
 * @property {string} slug - The full URL path and query string used for routing.
 */

export interface CatalogCategory {
  id: string;
  label: string;
  slug: string;
}

/**
 * The common interface that all catalog data sources must implement.
 * Ensures the facade and UI components can interact with any data type interchangeably.
 * @property {"products" | "recipes"} id - Identifies the strategy domain.
 * @property {CatalogCategory[]} categories - The list of valid filter categories for this domain.
 * @property {Function} getData - A method that returns the fully formatted, flattened array of items.
 */

export interface CatalogStrategy {
  id: "products" | "recipes";
  categories: CatalogCategory[];
  getData: () => (DealCard & { _cat: string; _uniqueId: string })[];
}

const FALLBACK_IMG = "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80";

const truncateDesc = (text: string, maxLength = 70) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength).trim() + "..." : text;
};

const formatData = (baseArray: DealCard[], categoryId: string) => {
  return Array(8).fill(baseArray).flat().map((item, i) => ({
    ...item,
    _cat: categoryId,
    _uniqueId: `${item.title}-${i}`,
    image: item.image || FALLBACK_IMG,
    description: truncateDesc(item.description)
  }));
};

/**
 * Strategy implementation specifically for handling Grocery Products.
 * Aggregates weekly, daily, and expiring discounts.
 */

export const ProductStrategy: CatalogStrategy = {
  id: "products",
  categories: [
    { id: "all", label: "All Products", slug: "/catalog?tab=products&category=all" },
    { id: "week-discounts", label: "Week Discounts", slug: "/catalog?tab=products&category=week-discounts" },
    { id: "daily-discounts", label: "Daily Discounts", slug: "/catalog?tab=products&category=daily-discounts" },
    { id: "expiring-discounts", label: "Expiring Soon", slug: "/catalog?tab=products&category=expiring-discounts" },
  ],
  getData: () => [
    ...formatData(weekDiscounts || [], "week-discounts"),
    ...formatData(dailyDiscounts || [], "daily-discounts"),
    ...formatData(expiringDiscounts || [], "expiring-discounts"),
  ]
};

/**
 * Strategy implementation specifically for handling Culinary Recipes.
 * Aggregates seasonal picks and community-liked content.
 */

export const RecipeStrategy: CatalogStrategy = {
  id: "recipes",
  categories: [
    { id: "all", label: "All Recipes", slug: "/catalog?tab=recipes&category=all" },
    { id: "seasonal-recipes", label: "Seasonal Recipes", slug: "/catalog?tab=recipes&category=seasonal-recipes" },
    { id: "people-liked", label: "People Also Liked", slug: "/catalog?tab=recipes&category=people-liked" },
  ],
  getData: () => [
    ...formatData(seasonalRecipes || [], "seasonal-recipes"),
    ...formatData(peopleLiked || [], "people-liked"),
  ]
};

/**
 * A dictionary exporting all available strategies, allowing dynamic lookup 
 * based on the active tab (e.g., `strategies[activeTab].getData()`).
 */

export const strategies = {
  products: ProductStrategy,
  recipes: RecipeStrategy
};
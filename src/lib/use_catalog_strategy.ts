import { 
  weekDiscounts, 
  dailyDiscounts, 
  expiringDiscounts, 
  seasonalRecipes, 
  peopleLiked,
  type DealCard 
} from "@/Data/home_data";

export interface CatalogCategory {
  id: string;
  label: string;
  slug: string;
}

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

export const strategies = {
  products: ProductStrategy,
  recipes: RecipeStrategy
};
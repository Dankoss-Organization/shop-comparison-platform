/**
 * @file recipes_api.contracts.ts
 * @brief Data contract models, request queries, and response DTO schemas mapping the recipes API layer.
 */

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export interface GetRecipesQuery {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  difficulty?: "easy" | "medium" | "hard";
  sort?: "rating" | "newest" | "prepTime";
}

export interface RecipeListItem {
  id: string;
  name: string;
  imageUrl: string | null;
  difficulty: string;
  prepTime: number;
  servings: number;
  categoryId: string;
  avgRating: number;
  reviewCount: number;
}

export interface RecipesResponse {
  items: RecipeListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetRecipeCategoriesQuery {
  parentId?: string;
}

export interface RecipeCategoryTreeNode {
  id: string;
  name: string;
  parentId: string | null;
  recipeCount: number;
  children: RecipeCategoryTreeNode[];
}

export interface RecipeCategoriesResponse {
  categories: RecipeCategoryTreeNode[];
}

export interface GetRelatedRecipesQuery {
  limit?: number;
}

export interface RelatedRecipesResponse {
  recipeId: string;
  related: RecipeListItem[];
}

export interface RecipeDetailsResponse {
  recipe: RecipeListItem;
}
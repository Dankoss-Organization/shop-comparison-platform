/**
 * @file recipes_api.shared.ts
 * @description Single shared entrypoint for recipes API contracts and client.
 */

export type {
  GetRecipesQuery,
  RecipeListItem,
  RecipesResponse,
  GetRecipeCategoriesQuery,
  RecipeCategoryTreeNode,
  RecipeCategoriesResponse,
  GetRelatedRecipesQuery,
  RelatedRecipesResponse,
  RecipeDetailsResponse,
} from "@/Lib/api/recipes_api.contracts";

export * from "@/Lib/api/recipes_api.client";
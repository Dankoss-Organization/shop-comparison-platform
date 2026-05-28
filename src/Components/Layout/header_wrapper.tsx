/**
 * @file header_wrapper.tsx
 * @description Async Server Component wrapper for the main Header. 
 * Fetches and maps category data from the Products API, gracefully falling 
 * back to static catalog data if the request fails or returns empty.
 */

import { ProductsApiClient } from "@/Lib/api/products_api.client";
import { getApiBaseUrl } from "@/Lib/api";
import { mapCategoriesToUI } from "@/Lib/api/categories_adapter";
import { categories as fallbackCategories } from "@/Data/catalog_data";
import Header from "./header";

export default async function HeaderWrapper() {
  let categories = fallbackCategories;
  
  try {
    const api = new ProductsApiClient({ baseUrl: getApiBaseUrl() });
    // Виправляємо getCategoriesTree на getCategories
    const data = await api.getCategories(); 
    const mapped = mapCategoriesToUI(data.categories);
    
    if (mapped.length > 0) categories = mapped;
  } catch {}

  return <Header categories={categories} />;
}
/**
 * @file categories_adapter.ts
 * @description Transforms an array of API category nodes into the format expected by the UI. 
 * Filters out empty top-level categories (those with no children and no products) and maps 
 * the nested API structure (including subcategories, leaf items, and thumbnails) into the 
 * UI Category model.
*/

import type { CategoryTreeNode } from "@/Lib/api/products_api.contracts";
import type { Category } from "@/Data/catalog_data";

export function mapCategoriesToUI(nodes: CategoryTreeNode[]): Category[] {
  return nodes
    .filter(n => n.children.length > 0 || n.productCount > 0)
    .map(node => ({
      name: node.name,
      slug: node.slug,
      subcategories: node.children.map(child => ({
        name: child.name,
        slug: child.slug,
        image: child.thumbnailUrl ?? undefined,
        items: child.children.map(leaf => ({
          name: leaf.name,
          slug: leaf.slug,
        })),
      })),
    }));
}
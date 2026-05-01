/**
 * @file optimizer.utils.ts
 * @description Utility functions for generating and chunking store combinations for the basket optimization algorithm.
 */

import type { CartProduct, Combination } from "@/Types/optimization";

/**
 * Generates all possible store combinations for a given list of cart items.
 * * This function creates a Cartesian product of all available in-stock offers 
 * for each item in the cart. To prevent memory overflow, the output is capped 
 * at 100,000 combinations.
 *
 * @param cartItems - An array of products currently in the cart, including their store offers.
 * @returns An array of combinations, where each combination is a record mapping a `product_id` to a `store_id`.
 */
export function generateCombinations(cartItems: CartProduct[]): Combination[] {
  if (!cartItems || cartItems.length === 0) return [];

  let combinations: Combination[] = [{}];

  for (const item of cartItems) {
    const newCombinations: Combination[] = [];
    const availableOffers = (item.offers || []).filter(o => o.is_in_stock);

    if (availableOffers.length === 0) {
      return [];
    }

    for (const combo of combinations) {
      for (const offer of availableOffers) {
        newCombinations.push({
          ...combo,
          [item.product_id]: offer.store_id,
        });

        if (newCombinations.length > 100000) {
          return newCombinations;
        }
      }
    }
    combinations = newCombinations;
  }

  return combinations;
}

/**
 * Splits an array into a specified number of equally-sized chunks (or as close as possible).
 * * This is primarily used to divide massive arrays of combinations into smaller workloads 
 * that can be processed by Web Workers in parallel or sequentially without blocking the UI.
 *
 * @template T - The type of elements within the array.
 * @param array - The array to be divided into chunks.
 * @param chunkCount - The maximum number of chunks to split the array into.
 * @returns A two-dimensional array containing the chunked elements.
 */
export function splitIntoChunks<T>(array: T[], chunkCount: number): T[][] {
  if (!array || array.length === 0) return [];
  const chunks: T[][] = [];
  const size = Math.max(1, Math.ceil(array.length / chunkCount));

  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
/**
 * @file optimizer.worker.ts
 * @description Web Worker script responsible for calculating the lowest possible cost for a chunk of store combinations.
 */

import type { OptimizerInput, Combination, CartProduct } from "@/Types/optimization";

/**
 * Flat delivery fee applied per unique store present in a combination.
 */
const DELIVERY_FEE_PER_STORE = 5; 

/**
 * Calculates the total cost of a specific combination of items across various stores.
 * * This cost includes the base price of the items at the selected stores, multiplied 
 * by their required quantities, plus a flat delivery fee for every unique store involved.
 *
 * @param cartItems - The list of products in the user's cart, containing pricing and offer details.
 * @param combination - A specific mapping of `id` to `store_id` to evaluate.
 * @returns An object containing the combined `totalCost`, the raw `itemsCost`, and the `deliveryCost`. 
 * If an offer is invalid or out of stock, it returns `Infinity` for all values.
 */
function calculateCombinationCost(cartItems: CartProduct[], combination: Combination) {
  let itemsCost = 0;

  for (const item of cartItems) {
    const selectedStoreId = combination[item.id];
    const offer = (item.offers || []).find(o => o.store_id === selectedStoreId && o.is_in_stock);

    if (!offer) {
      return { totalCost: Infinity, itemsCost: Infinity, deliveryCost: Infinity };
    }

    itemsCost += offer.pricing.current_price * (item.cartQuantity || 1);
  }

  const uniqueStores = new Set(Object.values(combination)).size;
  const deliveryCost = uniqueStores * DELIVERY_FEE_PER_STORE;

  return {
    totalCost: itemsCost + deliveryCost,
    itemsCost,
    deliveryCost
  };
}

/**
 * Main message event listener for the Web Worker.
 * * Listens for the "START_OPTIMIZATION" event, processes the provided chunk of combinations 
 * to find the absolute lowest cost, and posts the result back to the main thread.
 *
 * @param event - The message event containing the `OptimizerInput` payload.
 */
self.onmessage = (event: MessageEvent) => {
  try {
    if (event.data.type !== "START_OPTIMIZATION") return;

    const { cartItems, combinationsChunk } = event.data.payload as OptimizerInput;

    if (!combinationsChunk || combinationsChunk.length === 0) {
      self.postMessage({
        status: "idle",
        message: "Awaiting combinations chunk.",
        totalCost: Infinity,
        storeAllocation: null,
        executionTimeMs: 0,
      });
      return;
    }

    const startTime = performance.now();

    let minCost = Infinity;
    let bestItemsCost = 0;
    let bestDeliveryCost = 0;
    let bestCombination: Combination | null = null;

    for (const currentCombo of combinationsChunk) {
      const costs = calculateCombinationCost(cartItems, currentCombo);

      if (costs.totalCost < minCost) {
        minCost = costs.totalCost;
        bestItemsCost = costs.itemsCost;
        bestDeliveryCost = costs.deliveryCost;
        bestCombination = currentCombo;
      }
    }

    const endTime = performance.now();

    self.postMessage({
      status: "success",
      totalCost: minCost,
      itemsCost: bestItemsCost,
      deliveryCost: bestDeliveryCost,
      storeAllocation: bestCombination,
      executionTimeMs: Number((endTime - startTime).toFixed(2)),
    });
  } catch (error) {
    self.postMessage({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
      totalCost: Infinity,
      storeAllocation: null,
      executionTimeMs: 0,
    });
  }
};
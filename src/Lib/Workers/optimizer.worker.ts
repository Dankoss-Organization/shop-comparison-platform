interface StoreOffer {
  store_id: string;
  store_name: string;
  is_in_stock: boolean;
  pricing: {
    current_price: number;
  };
}

interface ProductItem {
  product_id: string;
  canonical_name: string;
  offers: StoreOffer[];
}

type Combination = Record<string, string>; 

interface OptimizerPayload {
  cartItems: ProductItem[];
  chunk: Combination[]; 
}

function calculateCombinationCost(cartItems: ProductItem[], combination: Combination): number {
  let totalCost = 0;

  for (const item of cartItems) {
    const selectedStoreId = combination[item.product_id];
    
    const offer = item.offers.find(o => o.store_id === selectedStoreId && o.is_in_stock);
    
    if (!offer) {
      return Infinity; 
    }

    totalCost += offer.pricing.current_price;
  }
  const uniqueStores = new Set(Object.values(combination)).size;
  totalCost += uniqueStores * 50;

  return totalCost;
}

self.onmessage = (event: MessageEvent) => {
  if (event.data.type !== "START_OPTIMIZATION") return;

  const { cartItems, chunk } = event.data.payload as OptimizerPayload;
  
  if (!chunk || chunk.length === 0) {
    self.postMessage({ status: "idle", message: "Очікую масив комбінацій для розрахунку." });
    return;
  }

  console.log(`⚙️ [Worker]: Started processing chunk with ${chunk.length} combinations...`);
  const startTime = performance.now();

  let minCost = Infinity;
  let bestCombination: Combination | null = null;

  for (const currentCombo of chunk) {
    const currentCost = calculateCombinationCost(cartItems, currentCombo);

    if (currentCost < minCost) {
      minCost = currentCost;
      bestCombination = currentCombo;
    }
  }

  const endTime = performance.now();

  self.postMessage({
    status: "success",
    cheapestTotal: minCost,
    storeSplit: bestCombination,
    executionTimeMs: Number((endTime - startTime).toFixed(2))
  });
};

export {};
/**
 * @file optimization.ts
 * @description Core TypeScript interfaces and types for the basket optimization engine.
 * These types establish a strict contract between the UI, API, and Web Workers.
 */

export interface StoreOfferPricing {
  regular_price: number;
  current_price: number;
  discount_percent: number;
  is_online_only: boolean;
  promo_end_date: string | null;
  bulk_discounts: any[];
}

export interface StoreRating {
  rating: number;
  reviews_count: number;
}

export interface StoreOffer {
  store_id: string;
  store_name: string;
  url: string;
  is_in_stock: boolean;
  sku: string;
  scraped_at: string;
  store_rating: StoreRating;
  pricing: StoreOfferPricing;
  price_history: any[];
}

export interface ProductMedia {
  raw_main_image: string;
  raw_gallery: string[];
  main_image: string;
  gallery: string[];
}

export interface ProductMeasurements {
  value: number;
  unit: string;
}

export interface ProductPricingLogic {
  sales_unit: string;
  unit_step: number;
}

/**
 * Base parsed product representing a structured item from the database or scraper.
 * Adapted to use `id` to maintain compatibility with `DealCardType`.
 */
export interface ParsedProduct {
  id: string; 
  canonical_name: string;
  brand: string;
  category: string;
  country: string;
  media: ProductMedia;
  measurements: ProductMeasurements;
  pricing_logic: ProductPricingLogic;
  specific_attributes: Record<string, any>;
  offers?: StoreOffer[];
}

/**
 * Extended to match the `use_cart_store` structure perfectly.
 * Uses `cartQuantity` and `selectedStoreId` instead of generic names.
 */
export interface CartProduct extends Partial<ParsedProduct> {
  id: string;
  title?: string;
  quantity: number;
  cartQuantity: number;
  selectedStoreId?: string | null;
  offers?: StoreOffer[];
  [key: string]: any; // Allows fallback properties from DealCardType without strict type errors
}

export type Combination = Record<string, string>;

export interface OptimizerInput {
  cartItems: CartProduct[];
  combinationsChunk?: Combination[];
}

export interface OptimizerResult {
  totalCost: number;
  itemsCost?: number;
  deliveryCost?: number;
  storeAllocation: Combination | null;
  executionTimeMs: number;
  status?: "success" | "idle" | "error";
  message?: string;
}

/**
 * The base interface contract for all basket optimizers (Sequential or Parallel).
 * Ensures consistency across different optimization implementations.
 */
export interface IBasketOptimizer {
  optimize(input: OptimizerInput): Promise<OptimizerResult>;
}
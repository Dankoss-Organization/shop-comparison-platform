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

export interface ParsedProduct {
  product_id: string;
  canonical_name: string;
  brand: string;
  category: string;
  country: string;
  media: ProductMedia;
  measurements: ProductMeasurements;
  pricing_logic: ProductPricingLogic;
  specific_attributes: Record<string, any>;
  offers: StoreOffer[];
}

export interface CartProduct extends ParsedProduct {
  quantity: number;
  selected_store_id?: string | null;
  title?: string;
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
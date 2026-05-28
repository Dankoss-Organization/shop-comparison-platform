/**
 * @file cart_api.contracts.ts
 * @brief Data contract models and DTO schemas for the Cart API.
 */

export interface CartOfferProduct {
  productId: string;
  canonicalName: string;
  mainImage: string;
  media?: string;
}

export interface CartOfferStore {
  id: string;
  brand: string;
  city: string;
}

export interface CartOffer {
  id: string;
  currentPrice: number;
  discountPrice: number | null;
  product: CartOfferProduct;
  store: CartOfferStore;
}

export interface CartItem {
  id: string;
  quantity: number;
  price: number;
  offer: CartOffer;
}

export interface CartResponse {
  id: string | null;
  isActive: boolean;
  items: CartItem[];
  sum: number;
  discountSum: number;
  totalPayable: number;
  currency: string;
}

export interface AddCartItemRequest {
  offerId: string;
  quantity: number;
}

export interface AddCartItemResponse {
  success: boolean;
  cartItemId: string;
}

export interface UpdateCartItemRequest {
  quantity: number;
}
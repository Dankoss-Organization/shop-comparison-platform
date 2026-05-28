/**
 * @file products_api.adapters.ts
 * @description Maps backend product payloads into the UI DealCard model.
 * Includes defensive guard clauses to protect the UI from dirty database/search data.
 */

import type { DealCard, NutritionFacts, StoreOffer } from "@/Data/home_data";
import type {
  ProductCardResponse,
  ProductOfferItem,
  RelatedProductsResponse,
  StoreProductItem,
} from "@/Lib/api/products_api.contracts";
import { parseQuantity } from "@/Lib/utils";
import type { SearchProduct } from "@/Lib/api/search_api.client";

const DETAIL_TOKENS = [
  "ж/б", "с/к", "в/к", "н/к", "с/в", "вар", "вар.", "копч", "копч.",
  "рафінована", "нерафінована", "ультрапастеризоване", "пастеризоване",
  "стерилізоване", "безлактозне", "незбиране", "солодке", "напівсолодке",
  "сухе", "напівсухе",
];

const FALLBACK_NUTRITION: NutritionFacts = {
  calories: "N/A", carbs: "N/A", fats: "N/A", protein: "N/A", fiber: "N/A", sugar: "N/A",
};

const STORE_NAMES: Record<string, string> = {
  s_silpo: "Сільпо",
  s_novus: "Novus",
  s_atb: "ATB",
  s_fora: "Fora",
  s_varus: "Varus",
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80";

function parseMediaUrl(media?: string | null): string {
  if (!media) return FALLBACK_IMAGE;

  if (media.startsWith("%7B")) {
    try {
      return extractImageFromParsed(JSON.parse(decodeURIComponent(media)));
    } catch {
      return FALLBACK_IMAGE;
    }
  }

  if (media.startsWith("http")) return media;

  try {
    return extractImageFromParsed(JSON.parse(media));
  } catch {
    return FALLBACK_IMAGE;
  }
}

function extractImageFromParsed(obj: Record<string, unknown>): string {
  const candidates = [
    obj.main_image,
    Array.isArray(obj.gallery) ? obj.gallery[0] : undefined,
    obj.raw_main_image,
    Array.isArray(obj.raw_gallery) ? obj.raw_gallery[0] : undefined,
  ];
  for (const v of candidates) {
    if (typeof v === "string" && v.startsWith("http")) return v;
  }
  return FALLBACK_IMAGE;
}

type ParsedName = {
  title: string;
  detailsLine?: string;
};

type ParsedDescription = {
  description: string;
  descriptionSections: string[];
};

function normalizeWhitespace(value?: string | null): string {
  if (!value) return "";
  return value.replace(/\s+/g, " ").replace(/\s*·\s*/g, " · ").trim();
}

function extractQuantitySegment(value?: string | null): string {
  if (!value) return "";
  const match = value.match(/\b\d+(?:[.,]\d+)?\s*(?:г|кг|мл|л|шт|ml|kg|g|pcs)\b/i);
  return match ? normalizeWhitespace(match[0]) : "";
}

function splitName(rawName?: string | null, brand?: string | null): ParsedName {
  if (!rawName) return { title: brand ?? "Unknown Product" };
  
  const title = normalizeWhitespace(rawName);
  const quantitySegment = extractQuantitySegment(title);

  return {
    title,
    detailsLine: quantitySegment || undefined,
  };
}

function mapOfferItemToStoreOffer(offer: ProductOfferItem): StoreOffer {
  return {
    store_id: offer.store.id,
    store_name: offer.store.brand,
    store_city: offer.store.city,
    store_address: offer.store.address,
    is_in_stock: offer.availability === "in_stock",
    offerId: offer.id,
    pricing: {
      current_price: offer.effectivePrice ?? offer.currentPrice,
      regular_price: offer.oldPrice ?? offer.currentPrice,
      discount_percent: offer.discountPercent ?? 0,
    },
  };
}

function getQuantityLabel(measurements?: Record<string, unknown> | null): string {
  if (!measurements) return "1 pcs";

  const candidates = [
    measurements.weight,
    measurements.volume,
    measurements.size,
    measurements.pack,
    measurements.quantity,
  ].filter(Boolean);

  for (const candidate of candidates) {
    const text = normalizeWhitespace(String(candidate));
    if (text && text.toLowerCase() !== "n/a") {
      return text;
    }
  }

  return "1 pcs";
}

function trimTrailingZeros(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.?0+$/, "");
}

function findNutritionValue(text: string, pattern: RegExp): string {
  if (!text) return "";
  const match = text.match(pattern);
  return match?.[1] ? normalizeWhitespace(match[1]) : "";
}

function parseNutritionFromText(text?: string | null) {
  if (!text) return FALLBACK_NUTRITION;
  const normalized = text.replace(/,/g, ".");
  return {
    calories: findNutritionValue(normalized, /(?:калор(?:ії|ійність)|kcal|ккал)\s*[:\-]?\s*(\d+(?:\.\d+)?\s*(?:ккал|kcal)?)/i),
    protein: findNutritionValue(normalized, /(?:білки|protein)\s*[:\-]?\s*(\d+(?:\.\d+)?\s*(?:г|g)?)/i),
    fats: findNutritionValue(normalized, /(?:жири|fat|fats)\s*[:\-]?\s*(\d+(?:\.\d+)?\s*(?:г|g)?)/i),
    carbs: findNutritionValue(normalized, /(?:вуглеводи|carb|carbs|carbohydrates)\s*[:\-]?\s*(\d+(?:\.\d+)?\s*(?:г|g)?)/i),
    fiber: findNutritionValue(normalized, /(?:клітковина|fiber)\s*[:\-]?\s*(\d+(?:\.\d+)?\s*(?:г|g)?)/i),
    sugar: findNutritionValue(normalized, /(?:цукор|sugar)\s*[:\-]?\s*(\d+(?:\.\d+)?\s*(?:г|g)?)/i),
  };
}

function mapNutrition(product: ProductCardResponse["product"], description?: string | null): NutritionFacts {
  const parsed = parseNutritionFromText(description);

  return {
    calories: product.calories || parsed.calories || "N/A",
    carbs: product.carbohydrates_g != null ? `${trimTrailingZeros(product.carbohydrates_g)} g` : (parsed.carbs || "N/A"),
    fats: product.fats_g != null ? `${trimTrailingZeros(product.fats_g)} g` : (parsed.fats || "N/A"),
    protein: product.proteins_g != null ? `${trimTrailingZeros(product.proteins_g)} g` : (parsed.protein || "N/A"),
    fiber: parsed.fiber || "N/A",
    sugar: parsed.sugar || "N/A",
  };
}

function splitDescription(description?: string | null): ParsedDescription {
  const normalized = normalizeWhitespace(description);

  if (!normalized) {
    return {
      description: "Product description is not available yet.",
      descriptionSections: ["Product description is not available yet."],
    };
  }

  const sections = normalized
    .split(/(?<=[.!?;])\s+|\n+/)
    .map((section) => normalizeWhitespace(section))
    .filter(Boolean);

  return {
    description: normalized,
    descriptionSections: sections.length ? sections : [normalized],
  };
}

function collectNotes(card: ProductCardResponse): string[] {
  const notes = new Set<string>();

  if (card.badges?.length) {
    card.badges.forEach(badge => notes.add(badge));
  }

  if (card.stats?.minPrice30d != null && card.stats?.maxPrice30d != null) {
    notes.add(`30d range: ${card.stats.minPrice30d} - ${card.stats.maxPrice30d} UAH`);
  }

  return Array.from(notes);
}

function buildDealCardBase(params: {
  id: string;
  rawTitle?: string | null;
  brand?: string | null;
  category?: string | null;
  image?: string | null;
  description?: string | null;
  quantity?: string | null;
  offers: StoreOffer[];
  rating?: string;
  currency?: string;
  internalId?: string;
  availabilityStatus?: "in_stock" | "out_of_stock";
  pricingSummary?: {
    bestPrice: number | null;
    oldPrice: number | null;
    discountPercent: number | null;
  };
  stats?: DealCard["stats"];
  nutrition?: NutritionFacts;
  allergens?: string[];
  notes?: string[];
}): DealCard {
  const parsedName = splitName(params.rawTitle, params.brand);
  const descriptionData = splitDescription(params.description);
  const quantity = params.quantity || "1 pcs";
  const parsedQuantity = parseQuantity(quantity);
  
  const quantityLabel = quantity !== "1 pcs" 
    ? quantity 
    : parsedQuantity.isWeight 
      ? `${parsedQuantity.baseValue}${parsedQuantity.baseUnit}` 
      : quantity;

  const detailsParts = [
    parsedName.detailsLine,
    quantityLabel !== "1 pcs" ? quantityLabel : undefined,
  ].filter(Boolean) as string[];

  return {
    id: params.id,
    internalId: params.internalId,
    title: parsedName.title,
    detailsLine: detailsParts.length ? [...new Set(detailsParts)].join(" · ") : undefined,
    image: parseMediaUrl(params.image),
    rating: params.rating ?? "4.8",
    description: descriptionData.description,
    descriptionSections: descriptionData.descriptionSections,
    quantity: quantityLabel || "1 pcs",
    nutrition: params.nutrition ?? FALLBACK_NUTRITION,
    allergens: params.allergens ?? [],
    notes: params.notes ?? [],
    offers: params.offers,
    brand: params.brand ?? undefined,
    category: params.category ?? undefined,
    currency: params.currency ?? "UAH",
    availabilityStatus: params.availabilityStatus,
    pricingSummary: params.pricingSummary,
    stats: params.stats,
  };
}

export function mapProductCardToDealCard(response: ProductCardResponse): DealCard {
  const quantity = getQuantityLabel(response.product.measurements);
  const offers = response.topOffers.map(mapOfferItemToStoreOffer);
  const description = response.product.description ?? "";

  return buildDealCardBase({
    id: response.product.id,
    internalId: response.product.id,
    rawTitle: response.product.canonicalName,
    brand: response.product.brand,
    category: response.product.category,
    image: response.product.media,
    description,
    quantity,
    offers,
    currency: response.pricingSummary?.currency || "UAH",
    availabilityStatus: response.availabilityStatus,
    pricingSummary: {
      bestPrice: response.pricingSummary?.bestPrice ?? null,
      oldPrice: response.pricingSummary?.oldPrice ?? null,
      discountPercent: response.pricingSummary?.discountPercent ?? null,
    },
    stats: response.stats ? {
      priceTrend: response.stats.priceTrend,
      minPrice30d: response.stats.minPrice30d,
      maxPrice30d: response.stats.maxPrice30d,
      avgPrice30d: response.stats.avgPrice30d,
    } : undefined,
    nutrition: mapNutrition(response.product, description),
    notes: collectNotes(response),
  });
}

export function mapCatalogItemToDealCard(item: any): DealCard {
  const firstOffer = item.offers?.[0];
  const bestPrice = item.bestPrice ?? item.best_price ?? firstOffer?.price ?? null;
  const oldPrice = item.oldPrice ?? item.old_price ?? firstOffer?.regularPrice ?? bestPrice ?? null;
  const discountPercent = item.discountPercent ?? item.discount_percent ?? firstOffer?.discountPercent ?? null;
  const canonicalName = item.canonicalName ?? item.canonical_name ?? "";
  
  const pseudoOffer: StoreOffer = {
    store_id: firstOffer?.storeId ?? `${item.id}-best`,
    store_name: STORE_NAMES[firstOffer?.storeId] ?? firstOffer?.storeId ?? "Найкраща ціна",
    is_in_stock: true,
    offerId: firstOffer?.id,
    pricing: {
      current_price: bestPrice ?? 0,
      regular_price: oldPrice ?? bestPrice ?? 0,
      discount_percent: discountPercent ?? 0,
    },
  };

  return buildDealCardBase({
    id: item.id,
    internalId: item.id,
    rawTitle: canonicalName,
    brand: item.brand,
    category: item.category?.name ?? item.category ?? item.categoryId,
    image: item.media,
    description: item.description,
    quantity: extractQuantitySegment(canonicalName) || "1 pcs",
    offers: [pseudoOffer],
    currency: item.currency ?? "UAH",
    availabilityStatus: "in_stock",
    pricingSummary: { bestPrice, oldPrice, discountPercent },
    notes: item.offers?.length ? [`${item.offers.length} store${item.offers.length === 1 ? "" : "s"} available`] : [],
  });
}

export function mapRelatedProductsToDealCards(response: RelatedProductsResponse): DealCard[] {
  return response.related.map((item) =>
    buildDealCardBase({
      id: item.id,
      internalId: item.id,
      rawTitle: item.canonicalName,
      brand: item.brand,
      image: item.media,
      description: "",
      quantity: extractQuantitySegment(item.canonicalName) || "1 pcs",
      offers: [
        {
          store_id: `${item.id}-related`,
          store_name: item.storeName ?? (item.offersCount 
            ? `${item.offersCount} store${item.offersCount === 1 ? "" : "s"}` 
            : "Suggested"),
          is_in_stock: true,
          pricing: {
            current_price: item.bestPrice ?? 0,
            regular_price: item.bestPrice ?? 0,
            discount_percent: 0,
          },
        },
      ],
      pricingSummary: {
        bestPrice: item.bestPrice,
        oldPrice: item.bestPrice,
        discountPercent: null,
      },
      notes: item.offersCount ? [`${item.offersCount} store${item.offersCount === 1 ? "" : "s"} available`] : [],
    })
  );
}

export function mapStoreProductToDealCard(
  item: StoreProductItem,
  storeId: string,
  storeName: string
): DealCard {
  const storeOffer: StoreOffer = {
    store_id: storeId,
    store_name: storeName,
    is_in_stock: item.availabilityStatus === "in_stock",
    pricing: {
      current_price: item.currentPrice,
      regular_price: item.regularPrice,
      discount_percent: item.discountPercent ?? 0,
    },
  };

  return buildDealCardBase({
    id: item.productId,
    rawTitle: item.canonicalName,
    brand: item.brand,
    image: item.media,
    description: "",
    quantity: extractQuantitySegment(item.canonicalName) || "1 pcs",
    offers: [storeOffer],
    currency: item.currency,
    availabilityStatus: item.availabilityStatus as "in_stock" | "out_of_stock",
    pricingSummary: {
      bestPrice: item.currentPrice,
      oldPrice: item.regularPrice,
      discountPercent: item.discountPercent,
    },
    notes: [],
  });
}

export function mapMeilisearchToDealCard(item: SearchProduct): DealCard {
  return buildDealCardBase({
    id: item.id,
    internalId: item.id,
    rawTitle: item.canonicalName,
    brand: item.brand ?? undefined,
    category: item.category,
    image: item.media,
    description: item.description,
    quantity: extractQuantitySegment(item.canonicalName) || "1 pcs",
    offers: [{
      store_id: "search",
      store_name: item.storeNames?.[0] ?? "",
      is_in_stock: true,
      pricing: {
        current_price: item.bestPrice ?? 0,
        regular_price: item.oldPrice ?? item.bestPrice ?? 0,
        discount_percent: item.discountPercent ?? 0,
      },
    }],
    currency: item.currency,
    pricingSummary: {
      bestPrice: item.bestPrice ?? null,
      oldPrice: item.oldPrice ?? null,
      discountPercent: item.discountPercent ?? null,
    },
    notes: item.offersCount ? [`${item.offersCount} store${item.offersCount === 1 ? "" : "s"} available`] : [],
  });
}

export { mapOfferItemToStoreOffer };
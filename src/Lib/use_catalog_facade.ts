/**
 * @file use_catalog_facade.ts
 * @description Facade hook managing the full state of the catalog page.
 * All product data is fetched from the real backend API via the strategy layer.
 */
"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { strategies } from "./use_catalog_strategy";
import type { StrategyFetchResult } from "./use_catalog_strategy";
import type { DealCard } from "@/Data/home_data";

export type CatalogSortKey =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "discount-desc"
  | "rating-desc";

export type CatalogItem = DealCard & {
  _cat?: string;
  _uniqueId?: string;
};

export type ActiveFilterChip =
  | { key: "search";   label: string }
  | { key: "price";    label: string }
  | { key: "rating";   label: string; value: number }
  | { key: "discount"; label: string; value: number }
  | { key: "market";   label: string; value: string };

const sortOptions: { value: CatalogSortKey; label: string }[] = [
  { value: "featured",      label: "Featured" },
  { value: "price-asc",     label: "Price: Low to High" },
  { value: "price-desc",    label: "Price: High to Low" },
  { value: "discount-desc", label: "Highest Discount" },
  { value: "rating-desc",   label: "Highest Rating" },
];

function getItemStores(item: any): string[] {
  const stores = new Set<string>();
  if (item.store_name) stores.add(item.store_name);
  if (item.market) stores.add(item.market);
  
  item.offers?.forEach((offer: any) => {
    if (offer.store_name) stores.add(offer.store_name);
  });
  return Array.from(stores);
}

function getLowestPrice(item: any): number {
  const prices: number[] = [];
  if (typeof item.price === "number" && item.price > 0) prices.push(item.price);
  if (typeof item.current_price === "number" && item.current_price > 0) prices.push(item.current_price);
  if (typeof item.bestPrice === "number" && item.bestPrice > 0) prices.push(item.bestPrice);
  
  item.offers?.forEach((o: any) => {
    if (o.pricing?.current_price && o.pricing.current_price > 0) {
      prices.push(o.pricing.current_price);
    } else if (o.price && o.price > 0) {
      prices.push(o.price);
    }
  });
  return prices.length > 0 ? Math.min(...prices) : 0;
}

function getHighestDiscount(item: any): number {
  const discounts: number[] = [];
  if (typeof item.discount_percent === "number") discounts.push(item.discount_percent);
  if (typeof item.discountPercent === "number") discounts.push(item.discountPercent);
  
  item.offers?.forEach((o: any) => {
    if (o.pricing?.discount_percent) {
      discounts.push(o.pricing.discount_percent);
    } else if (o.discount_percent) {
      discounts.push(o.discount_percent);
    }
  });
  return discounts.length > 0 ? Math.max(...discounts) : 0;
}

export function useCatalogFacade() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") === "recipes" ? "recipes" : "products";
  const activeCategory = searchParams.get("category") || "all";

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<CatalogSortKey>("featured");
  const [searchTerm, setSearchTerm] = useState("");

  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0); 
  const [minDiscount, setMinDiscount] = useState(0);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);

  const [fetchResult, setFetchResult] = useState<StrategyFetchResult>({
    items: [],
    total: 0,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const strategy = strategies[activeTab];
  const currentCats = strategy.categories;
  const currentCatLabel = currentCats.find((c) => c.id === activeCategory)?.label ?? "All Items";

  const prevTabRef = useRef(activeTab);
  const prevCatRef = useRef(activeCategory);

const loadData = useCallback(async (page: number, append: boolean) => {
  if (page === 1) setIsLoading(true);
  else setIsLoadingMore(true);

  try {
    const res = await strategy.fetchData({
      page,
      limit: 12,
      search: searchTerm,
      categoryId: activeCategory,
      sort: sortBy,
    });
    setFetchResult((prev) => ({
      items: append ? [...prev.items, ...res.items] : res.items,
      total: res.total,
      totalPages: res.totalPages,
    }));
  } catch (error) {
    console.error("[Facade] Error fetching catalog data:", error);
    setFetchResult({ items: [], total: 0, totalPages: 1 });
  } finally {
    setIsLoading(false);
    setIsLoadingMore(false);
  }
}, [strategy, activeCategory, searchTerm, sortBy]);

useEffect(() => {
  const tabChanged = prevTabRef.current !== activeTab;
  const catChanged = prevCatRef.current !== activeCategory;

  if (tabChanged) prevTabRef.current = activeTab;
  if (catChanged) prevCatRef.current = activeCategory;

  const shouldReset = tabChanged || catChanged;

  if (shouldReset) {
    setCurrentPage(1);
    loadData(1, false);
  } else {
    loadData(currentPage, currentPage > 1);
  }

  if (typeof window !== "undefined") {
    sessionStorage.setItem("lastCatalogUrl", window.location.pathname + window.location.search);
  }
}, [activeTab, activeCategory, searchTerm, sortBy, currentPage, loadData]);

  const { priceBounds, availableMarkets } = useMemo(() => {
    let pMin = Infinity, pMax = 0;
    const markets = new Set<string>();

    fetchResult.items.forEach((item) => {
      const price = getLowestPrice(item);
      if (price > 0) {
        if (price < pMin) pMin = price;
        if (price > pMax) pMax = price;
      }
      getItemStores(item).forEach((store) => markets.add(store));
    });

    return {
      priceBounds: { min: pMin === Infinity ? 0 : pMin, max: pMax },
      availableMarkets: Array.from(markets).sort(),
    };
  }, [fetchResult.items]);

  const visibleItems = useMemo(() => {
    return fetchResult.items.filter((item) => {
      const itemRating = Number(item.rating) || 0;
      if (minRating > 0 && itemRating < minRating) return false;

      const currentPrice = getLowestPrice(item);
      if (maxPrice > 0 && currentPrice > maxPrice) return false;

      const itemDiscount = getHighestDiscount(item);
      if (minDiscount > 0 && itemDiscount < minDiscount) return false;

      if (selectedMarkets.length > 0) {
        const itemStores = getItemStores(item);
        const hasMarket = itemStores.some((store) => selectedMarkets.includes(store));
        if (!hasMarket) return false;
      }

      return true;
    });
  }, [fetchResult.items, minRating, maxPrice, minDiscount, selectedMarkets]);

  const sortedItems = useMemo(() => {
    const sorted = [...visibleItems];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
        break;
      case "price-desc":
        sorted.sort((a, b) => getLowestPrice(b) - getLowestPrice(a));
        break;
      case "discount-desc":
        sorted.sort((a, b) => getHighestDiscount(b) - getHighestDiscount(a));
        break;
      case "rating-desc":
        sorted.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
        break;
    }
    return sorted;
  }, [visibleItems, sortBy]);

  const hasMore = currentPage < fetchResult.totalPages;

  const activeFilterChips = useMemo(() => {
    const chips: ActiveFilterChip[] = [];
    if (searchTerm) chips.push({ key: "search", label: `"${searchTerm}"` });
    if (maxPrice > 0 && maxPrice < priceBounds.max) chips.push({ key: "price", label: `Up to ₴${maxPrice}` });
    if (minRating > 0) chips.push({ key: "rating", label: `${minRating}★ & up`, value: minRating });
    if (minDiscount > 0) chips.push({ key: "discount", label: `Min ${minDiscount}% off`, value: minDiscount });
    selectedMarkets.forEach((m) => chips.push({ key: "market", label: m, value: m }));
    return chips;
  }, [searchTerm, maxPrice, priceBounds.max, minRating, minDiscount, selectedMarkets]);

  const updateUrl = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => params.set(k, v));
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const handleTabChange = (tab: "products" | "recipes") => {
    updateUrl({ tab, category: "all" });
  };
  const handleCategoryChange = (catId: string) => updateUrl({ category: catId });
  
  const handleSortChange = (key: CatalogSortKey) => { setSortBy(key); setCurrentPage(1); };
  const handleSearchChange = (val: string) => { setSearchTerm(val); setCurrentPage(1); };
  const handleMaxPriceChange = (val: number) => setMaxPrice(val);
  const handleMinRatingChange = (val: number) => setMinRating(val);
  const handleMinDiscountChange = (val: number) => setMinDiscount(val);
  
  const handleMarketToggle = (market: string) => {
    setSelectedMarkets((prev) =>
      prev.includes(market) ? prev.filter((m) => m !== market) : [...prev, market],
    );
  };

  const handlePageChange = (page: number) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleLoadMore = () => setCurrentPage((p) => p + 1);

  const handleResetFilters = () => {
    setSearchTerm("");
    setMaxPrice(0);
    setMinRating(0);
    setMinDiscount(0);
    setSelectedMarkets([]);
  };

  const handleRemoveFilterChip = (chip: ActiveFilterChip) => {
    switch (chip.key) {
      case "search":   setSearchTerm(""); break;
      case "price":    setMaxPrice(0); break;
      case "rating":   setMinRating(0); break;
      case "discount": setMinDiscount(0); break;
      case "market":   setSelectedMarkets((prev) => prev.filter((m) => m !== chip.value)); break;
    }
  };

  const handleBackToBrowsing = () => router.push("/");

  return {
    state: {
      activeTab,
      activeCategory,
      currentPage,
      sortBy,
      sortOptions,
      totalPages: fetchResult.totalPages,
      visibleItems: sortedItems,
      totalItemsCount: fetchResult.total,
      hasMore,
      isLoading,
      isLoadingMore,
      searchTerm,
      minRating,
      selectedMarkets,
      maxPrice: maxPrice > 0 ? maxPrice : priceBounds.max, 
      minDiscount,
      priceBounds,
      activeFilterChips,
      activeFilterCount: activeFilterChips.length,
      availableMarkets,
      currentCats,
      currentCatLabel,
    },
    actions: {
      handleTabChange,
      handleCategoryChange,
      handleSearchChange,
      handleMaxPriceChange,
      handleMinRatingChange,
      handleMinDiscountChange,
      handleMarketToggle,
      handleSortChange,
      handlePageChange,
      handleLoadMore,
      handleResetFilters,
      handleRemoveFilterChip,
      handleBackToBrowsing,
    },
  };
}
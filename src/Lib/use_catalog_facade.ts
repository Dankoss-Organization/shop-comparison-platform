/**
 * @file use_catalog_facade.ts
 * @description A custom hook acting as a Facade to manage the complex state of the catalog page, including pagination, filtering, URL synchronization, and "Load More" functionality.
 * @pattern Facade: Hides the complex orchestration of Next.js routers, Zustand stores, and data filtering logic behind a simple, unified interface (`state` and `actions`).
 * @pattern URL-State Sync: Initializes and updates component state based on URL search parameters, ensuring shareable links and proper browser history navigation.
 */
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { strategies } from "./use_catalog_strategy";
import type { CatalogCategory } from "./use_catalog_strategy";
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
  market?: string;
  discount?: number | string;
};

type PriceBounds = { min: number; max: number };

export type ActiveFilterChip =
  | { key: "search"; label: string }
  | { key: "price"; label: string }
  | { key: "rating"; label: string }
  | { key: "discount"; label: string }
  | { key: "market"; label: string; value: string };

const ITEMS_PER_PAGE = 12;

const parsePrice = (priceStr: string | number): number => {
  if (typeof priceStr === "number") return priceStr;
  const match = priceStr.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

const parseDiscount = (discount: string | number | undefined): number => {
  if (discount === undefined || discount === null) return 0;
  if (typeof discount === "number") return discount;
  const match = String(discount).match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
};

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "discount-desc", label: "Biggest Discount" },
  { value: "rating-desc", label: "Top Rated" },
] as const;

/**
 * @description The primary hook driving the Catalog/Browsing experience.
 * Manages tabs (Products vs. Recipes), category filtering, pagination, and URL routing.
 * @returns {Object} An object divided into `state` (readonly data/UI properties) and `actions` (event handlers).
 */
export function useCatalogFacade() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultTab = searchParams.get("tab") || "products";
  const defaultCategory = searchParams.get("category") || "all";

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<CatalogSortKey>("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const strategy = useMemo(
    () => strategies[activeTab as keyof typeof strategies] || strategies.products,
    [activeTab],
  );

  const rawData = useMemo(
    () => strategy.getData() as unknown as CatalogItem[],
    [strategy],
  );

  const categoryData = useMemo(() => {
    if (activeCategory === "all") return rawData;
    return rawData.filter((item) => item._cat === activeCategory);
  }, [rawData, activeCategory]);

  const priceBounds = useMemo<PriceBounds>(() => {
    if (!categoryData.length) return { min: 0, max: 1000 };
    const prices = categoryData.map((item) => parsePrice(item.price));
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [categoryData]);

  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setMinRating(0);
    setMinDiscount(0);
    setMaxPrice(null);
    setSelectedMarkets([]);
    setCurrentPage(1);
    setVisibleCount(ITEMS_PER_PAGE);
  }, []);

  useEffect(() => {
    if (maxPrice === null && priceBounds.max > 0) {
      setMaxPrice(priceBounds.max);
    }
  }, [priceBounds.max, maxPrice]);

  useEffect(() => {
    const tab = searchParams.get("tab") || "products";
    const cat = searchParams.get("category") || "all";
    if (tab !== activeTab || cat !== activeCategory) {
      setActiveTab(tab);
      setActiveCategory(cat);
      resetFilters();
    }
  }, [searchParams, activeTab, activeCategory, resetFilters]);

  const filteredAndSortedData = useMemo(() => {
    const filtered = categoryData.filter((item) => {
      const itemPrice = parsePrice(item.price);
      const itemRating = Number(item.rating || 0);
      const itemDiscount = parseDiscount(item.discount);
      const itemMarket = item.market || "Unknown";

      const matchesSearch =
        !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = maxPrice === null || itemPrice <= maxPrice;
      const matchesRating = itemRating >= minRating;
      const matchesDiscount = itemDiscount >= minDiscount;
      const matchesMarket =
        selectedMarkets.length === 0 || selectedMarkets.includes(itemMarket);

      return matchesSearch && matchesPrice && matchesRating && matchesDiscount && matchesMarket;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return parsePrice(a.price) - parsePrice(b.price);
        case "price-desc":
          return parsePrice(b.price) - parsePrice(a.price);
        case "rating-desc":
          return Number(b.rating || 0) - Number(a.rating || 0);
        case "discount-desc":
          return parseDiscount(b.discount) - parseDiscount(a.discount);
        default:
          return 0;
      }
    });
  }, [categoryData, searchTerm, maxPrice, minRating, minDiscount, selectedMarkets, sortBy]);

  const effectiveMaxPrice = maxPrice ?? priceBounds.max;

  const activeFilterChips = useMemo(() => {
    const chips: ActiveFilterChip[] = [];
    if (searchTerm) chips.push({ key: "search", label: `"${searchTerm}"` });
    if (maxPrice !== null && maxPrice < priceBounds.max)
      chips.push({ key: "price", label: `Up to $${maxPrice.toFixed(2)}` });
    if (minRating > 0) chips.push({ key: "rating", label: `${minRating}+ Stars` });
    if (minDiscount > 0) chips.push({ key: "discount", label: `${minDiscount}%+ Off` });
    selectedMarkets.forEach((m) => chips.push({ key: "market", label: m, value: m }));
    return chips;
  }, [searchTerm, maxPrice, priceBounds.max, minRating, minDiscount, selectedMarkets]);

  const activeFilterCount = activeFilterChips.length;
  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
  const visibleItems = filteredAndSortedData.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedData.length;

  const availableMarkets = useMemo(() => {
    const markets = new Set<string>();
    rawData.forEach((item) => { if (item.market) markets.add(item.market); });
    return Array.from(markets);
  }, [rawData]);

  const currentCats: CatalogCategory[] = useMemo(
    () => strategy.categories ?? [{ id: "all", label: "All", slug: "" }],
    [strategy],
  );

  const currentCatLabel = useMemo(
    () => currentCats.find((c) => c.id === activeCategory)?.label ?? "All",
    [currentCats, activeCategory],
  );

  const handleTabChange = (tabId: string) => router.push(`?tab=${tabId}&category=all`);
  const handleCategoryChange = (categoryId: string) => router.push(`?tab=${activeTab}&category=${categoryId}`);
  const handleBackToBrowsing = () => router.push("/");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleMaxPriceChange = (value: number) => {
    setMaxPrice(value);
    setCurrentPage(1);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleMinRatingChange = (value: number) => {
    setMinRating(value);
    setCurrentPage(1);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleMinDiscountChange = (value: number) => {
    setMinDiscount(value);
    setCurrentPage(1);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleMarketToggle = (market: string) => {
    setSelectedMarkets((prev) =>
      prev.includes(market) ? prev.filter((m) => m !== market) : [...prev, market],
    );
    setCurrentPage(1);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as CatalogSortKey);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleLoadMore = () => setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  const handleResetFilters = () => resetFilters();

  const handleRemoveFilterChip = (chip: ActiveFilterChip) => {
    switch (chip.key) {
      case "search": setSearchTerm(""); break;
      case "price": setMaxPrice(priceBounds.max); break;
      case "rating": setMinRating(0); break;
      case "discount": setMinDiscount(0); break;
      case "market":
        setSelectedMarkets((prev) => prev.filter((m) => m !== chip.value));
        break;
    }
    setCurrentPage(1);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return {
    state: {
      activeTab: activeTab as "products" | "recipes",
      activeCategory,
      currentPage,
      sortBy,
      sortOptions: [...sortOptions],
      visibleCount,
      totalPages,
      visibleItems,
      totalItemsCount: filteredAndSortedData.length,
      hasMore,
      searchTerm,
      minRating,
      selectedMarkets,
      maxPrice: effectiveMaxPrice,
      minDiscount,
      priceBounds,
      activeFilterChips,
      activeFilterCount,
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
      setCurrentPage,
    },
  };
}
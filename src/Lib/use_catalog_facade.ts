/**
 * @file use_catalog_facade.ts
 * @description A custom hook acting as a Facade to manage the complex state of the catalog page, including pagination, filtering, URL synchronization, and "Load More" functionality.
 * @pattern Facade: Hides the complex orchestration of Next.js routers, Zustand stores, and data filtering logic behind a simple, unified interface (`state` and `actions`).
 * @pattern URL-State Sync: Initializes and updates component state based on URL search parameters, ensuring shareable links and proper browser history navigation.
 */

"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCartStore } from "@/Store/use_cart_store";
import { strategies } from "./use_catalog_strategy";
import type { DealCard } from "@/Data/home_data";

interface CartState {
  setOpen: (open: boolean) => void;
}

export type CatalogSortKey =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "discount-desc"
  | "rating-desc";

type CatalogItem = DealCard & { _cat: string; _uniqueId: string; market: string };
type PriceBounds = { min: number; max: number };

type ActiveFilterChip =
  | { key: "search"; label: string }
  | { key: "price"; label: string }
  | { key: "rating"; label: string }
  | { key: "discount"; label: string }
  | { key: "market"; value: string; label: string };

const sortOptions: { value: CatalogSortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "discount-desc", label: "Biggest discount" },
  { value: "rating-desc", label: "Top rated" },
];

const PRICE_FILTER_EPSILON = 0.005;

const isSortKey = (value: string | null): value is CatalogSortKey =>
  sortOptions.some((option) => option.value === value);

const parseMoney = (price: string) => Number.parseFloat(price.replace(/[^\d.]/g, ""));
const parseDiscount = (discount: string) => Math.abs(Number.parseFloat(discount.replace(/[^\d.-]/g, "")));
const parseRating = (rating: string) => Number.parseFloat(rating);

function uniqueCatalogItems(items: CatalogItem[]) {
  const uniqueMap = new Map<string, CatalogItem>();

  for (const item of items) {
    const uniqueKey = `${item._cat}::${item.title}::${item.market}`;
    if (!uniqueMap.has(uniqueKey)) {
      uniqueMap.set(uniqueKey, item);
    }
  }

  return [...uniqueMap.values()];
}

function getPriceBounds(items: CatalogItem[]): PriceBounds {
  if (items.length === 0) return { min: 0, max: 0 };
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (const item of items) {
    const price = parseMoney(item.price);
    if (price < min) min = price;
    if (price > max) max = price;
  }
  return {
    min: min === Number.POSITIVE_INFINITY ? 0 : min,
    max: max === Number.NEGATIVE_INFINITY ? 0 : max,
  };
}

function compareCatalogItems(
  left: CatalogItem,
  right: CatalogItem,
  sortBy: CatalogSortKey,
  categoryOrder: Map<string, number>,
) {
  switch (sortBy) {
    case "price-asc":
      return parseMoney(left.price) - parseMoney(right.price) || left.title.localeCompare(right.title);
    case "price-desc":
      return parseMoney(right.price) - parseMoney(left.price) || left.title.localeCompare(right.title);
    case "discount-desc":
      return parseDiscount(right.discount) - parseDiscount(left.discount) || left.title.localeCompare(right.title);
    case "rating-desc":
      return parseRating(right.rating) - parseRating(left.rating) || left.title.localeCompare(right.title);
    default:
      return (
        (categoryOrder.get(left._cat) ?? Number.MAX_SAFE_INTEGER) -
          (categoryOrder.get(right._cat) ?? Number.MAX_SAFE_INTEGER) ||
        left.title.localeCompare(right.title)
      );
  }
}

function sortCatalogItems(items: CatalogItem[], sortBy: CatalogSortKey, categoriesOrder: string[]) {
  if (sortBy === "featured") {
    return items;
  }

  const categoryOrder = new Map(categoriesOrder.map((id, index) => [id, index]));
  const groupedByTitle = new Map<string, CatalogItem[]>();

  for (const item of items) {
    const existingGroup = groupedByTitle.get(item.title);
    if (existingGroup) {
      existingGroup.push(item);
    } else {
      groupedByTitle.set(item.title, [item]);
    }
  }

  const orderedGroups = [...groupedByTitle.values()].sort((leftGroup, rightGroup) =>
    compareCatalogItems(leftGroup[0], rightGroup[0], sortBy, categoryOrder),
  );

  const interleaved: CatalogItem[] = [];
  let hasItemsLeft = true;

  while (hasItemsLeft) {
    hasItemsLeft = false;

    for (const group of orderedGroups) {
      const nextItem = group.shift();
      if (nextItem) {
        interleaved.push(nextItem);
        hasItemsLeft = true;
      }
    }
  }

  return interleaved;
}

/**
 * The primary hook driving the Catalog/Browsing experience.
 * Manages tabs (Products vs. Recipes), category filtering, pagination, and URL routing.
 * @returns {Object} An object divided into `state` (readonly data/UI properties) and `actions` (event handlers).
 */
export function useCatalogFacade() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setOpen = useCartStore((state: CartState) => state.setOpen);

  const config = useMemo(() => ({
    itemsPerLoad: 8,
    maxRowsPerPage: 3,
    get itemsPerPage() { return this.itemsPerLoad * this.maxRowsPerPage; }
  }), []);

  const urlTab = searchParams.get("tab") === "recipes" ? "recipes" : "products";
  const urlCategory = searchParams.get("category") || "all";
  const urlPage = parseInt(searchParams.get("page") || "1", 10);
  const urlSort = searchParams.get("sort");

  const [activeTab, setActiveTab] = useState<"products" | "recipes">(urlTab);
  const [activeCategory, setActiveCategory] = useState<string>(urlCategory);
  const [currentPage, setCurrentPage] = useState(urlPage > 0 ? urlPage : 1);
  const [sortBy, setSortBy] = useState<CatalogSortKey>(isSortKey(urlSort) ? urlSort : "featured");
  const [visibleCount, setVisibleCount] = useState(config.itemsPerLoad);

  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  useEffect(() => {
    const currentQuery = `?tab=${activeTab}&category=${activeCategory}&page=${currentPage}&sort=${sortBy}`;
    sessionStorage.setItem("lastCatalogUrl", `${pathname}${currentQuery}`);
  }, [pathname, activeTab, activeCategory, currentPage, sortBy]);

  const allProducts = useMemo(() => uniqueCatalogItems(strategies.products.getData() as CatalogItem[]), []);
  const allRecipes = useMemo(() => uniqueCatalogItems(strategies.recipes.getData() as CatalogItem[]), []);

  const currentCats = activeTab === "products" ? strategies.products.categories : strategies.recipes.categories;
  const currentCatLabel = currentCats.find((c) => c.id === activeCategory)?.label || "Items";

  const activeData = useMemo(() => {
    let data = activeTab === "products" ? allProducts : allRecipes;
    if (activeCategory !== "all") {
      data = data.filter((item) => item._cat === activeCategory);
    }
    return data;
  }, [activeTab, activeCategory, allProducts, allRecipes]);

  const priceBounds = useMemo(() => getPriceBounds(activeData), [activeData]);

  const availableMarkets = useMemo(() => {
    const markets = new Set<string>();
    for (const item of activeData) {
      if (item.market) {
        markets.add(item.market);
      }
    }
    return Array.from(markets).sort();
  }, [activeData]);

  const filteredData = useMemo(() => {
    return activeData.filter((item) => {
      const matchesSearch = searchTerm ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      const matchesMarket = selectedMarkets.length > 0 ? selectedMarkets.includes(item.market) : true;
      const matchesRating = minRating > 0 ? parseRating(item.rating) >= minRating : true;
      const matchesPrice = maxPrice <= 0 || parseMoney(item.price) <= maxPrice;
      const matchesDiscount = parseDiscount(item.discount) >= minDiscount;

      return matchesSearch && matchesMarket && matchesRating && matchesPrice && matchesDiscount;
    });
  }, [activeData, searchTerm, selectedMarkets, minRating, maxPrice, minDiscount]);

  const sortedActiveData = useMemo(
    () => sortCatalogItems(filteredData, sortBy, currentCats.map((cat) => cat.id)),
    [filteredData, sortBy, currentCats],
  );

  const isPriceFilterActive =
    priceBounds.max > 0 &&
    maxPrice > 0 &&
    maxPrice < priceBounds.max - PRICE_FILTER_EPSILON;

  const activeFilterCount =
    (searchTerm.trim() ? 1 : 0) +
    (selectedMarkets.length > 0 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (isPriceFilterActive ? 1 : 0) +
    (minDiscount > 0 ? 1 : 0);

  const activeFilterChips = useMemo<ActiveFilterChip[]>(() => {
    const chips: ActiveFilterChip[] = [];

    if (searchTerm.trim()) {
      chips.push({ key: "search", label: `Search: ${searchTerm}` });
    }

    if (isPriceFilterActive) {
      chips.push({ key: "price", label: `Up to $${maxPrice.toFixed(2)}` });
    }

    if (minRating > 0) {
      chips.push({ key: "rating", label: `Rating ${minRating}+` });
    }

    if (minDiscount > 0) {
      chips.push({ key: "discount", label: `Discount ${minDiscount}%+` });
    }

    for (const market of selectedMarkets) {
      chips.push({ key: "market", value: market, label: market });
    }

    return chips;
  }, [searchTerm, maxPrice, isPriceFilterActive, minRating, minDiscount, selectedMarkets]);

  const totalPages = Math.max(1, Math.ceil(sortedActiveData.length / config.itemsPerPage));
  const startIndex = (currentPage - 1) * config.itemsPerPage;
  const itemsOnThisPage = sortedActiveData.slice(startIndex, startIndex + config.itemsPerPage);
  const visibleItems = itemsOnThisPage.slice(0, visibleCount);

  const hasMore = visibleCount < itemsOnThisPage.length;

  const updateUrl = (tab: string, cat: string, page: number, nextSort: CatalogSortKey) => {
    router.push(`${pathname}?tab=${tab}&category=${cat}&page=${page}&sort=${nextSort}`, { scroll: false });
  };

  const handleTabChange = (newTab: "products" | "recipes") => {
    setActiveTab(newTab);
    setActiveCategory("all");
    setCurrentPage(1);
    setVisibleCount(config.itemsPerLoad);
    updateUrl(newTab, "all", 1, sortBy);
  };

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setCurrentPage(1);
    setVisibleCount(config.itemsPerLoad);
    updateUrl(activeTab, catId, 1, sortBy);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setVisibleCount(config.itemsPerLoad);
    updateUrl(activeTab, activeCategory, newPage, sortBy);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (nextSort: CatalogSortKey) => {
    setSortBy(nextSort);
    setCurrentPage(1);
    setVisibleCount(config.itemsPerLoad);
    updateUrl(activeTab, activeCategory, 1, nextSort);
  };

  const handleMaxPriceChange = (value: number) => {
    setMaxPrice(value);
    setCurrentPage(1);
    setVisibleCount(config.itemsPerLoad);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    setVisibleCount(config.itemsPerLoad);
  };

  const handleMinRatingChange = (value: number) => {
    setMinRating(value);
    setCurrentPage(1);
    setVisibleCount(config.itemsPerLoad);
  };

  const handleMarketToggle = (market: string) => {
    setSelectedMarkets((prev) =>
      prev.includes(market)
        ? prev.filter((m) => m !== market)
        : [...prev, market]
    );
    setCurrentPage(1);
    setVisibleCount(config.itemsPerLoad);
  };

  const handleMinDiscountChange = (value: number) => {
    setMinDiscount(value);
    setCurrentPage(1);
    setVisibleCount(config.itemsPerLoad);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setMaxPrice(priceBounds.max);
    setMinRating(0);
    setMinDiscount(0);
    setSelectedMarkets([]);
    setCurrentPage(1);
    setVisibleCount(config.itemsPerLoad);
  };

  const handleRemoveFilterChip = (chip: ActiveFilterChip) => {
    switch (chip.key) {
      case "search":
        setSearchTerm("");
        break;
      case "price":
        setMaxPrice(priceBounds.max);
        break;
      case "rating":
        setMinRating(0);
        break;
      case "discount":
        setMinDiscount(0);
        break;
      case "market":
        setSelectedMarkets((current) => current.filter((market) => market !== chip.value));
        break;
    }

    setCurrentPage(1);
    setVisibleCount(config.itemsPerLoad);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + config.itemsPerLoad, itemsOnThisPage.length));
  };

  const handleBackToBrowsing = () => {
    router.push(`/#${activeTab}`);
  };

  return {
    state: {
      activeTab,
      activeCategory,
      currentPage,
      sortBy,
      visibleCount,
      totalPages,
      visibleItems,
      itemsOnThisPage,
      currentCats,
      currentCatLabel,
      totalItemsCount: sortedActiveData.length,
      hasMore,
      sortOptions,
      searchTerm,
      minRating,
      selectedMarkets,
      maxPrice,
      minDiscount,
      priceBounds,
      activeFilterCount,
      activeFilterChips,
      isPriceFilterActive,
      availableMarkets,
    },
    actions: {
      handleTabChange,
      handleCategoryChange,
      handlePageChange,
      handleLoadMore,
      handleBackToBrowsing,
      handleSortChange,
      handleSearchChange,
      handleMinRatingChange,
      handleMarketToggle,
      handleMaxPriceChange,
      handleMinDiscountChange,
      handleResetFilters,
      handleRemoveFilterChip,
    }
  };
}
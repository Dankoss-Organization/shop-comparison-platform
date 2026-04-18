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

interface CartState {
  setOpen: (open: boolean) => void;
}

/**
 * The primary hook driving the Catalog/Browsing experience.
 * Manages tabs (Products vs. Recipes), category filtering, pagination, and URL routing.
 * * @returns {Object} An object divided into `state` (readonly data/UI properties) and `actions` (event handlers).
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

  const [activeTab, setActiveTab] = useState<"products" | "recipes">(urlTab);
  const [activeCategory, setActiveCategory] = useState<string>(urlCategory);
  const [currentPage, setCurrentPage] = useState(urlPage > 0 ? urlPage : 1);
  const [visibleCount, setVisibleCount] = useState(config.itemsPerLoad);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  useEffect(() => {
    const currentQuery = `?tab=${activeTab}&category=${activeCategory}&page=${currentPage}`;
    sessionStorage.setItem("lastCatalogUrl", `${pathname}${currentQuery}`);
  }, [pathname, activeTab, activeCategory, currentPage]);

  const allProducts = useMemo(() => strategies.products.getData(), []);
  const allRecipes = useMemo(() => strategies.recipes.getData(), []);

  const activeData = useMemo(() => {
    let data = activeTab === "products" ? allProducts : allRecipes;
    if (activeCategory !== "all") {
      data = data.filter((item) => item._cat === activeCategory);
    }
    return data;
  }, [activeTab, activeCategory, allProducts, allRecipes]);

  const totalPages = Math.max(1, Math.ceil(activeData.length / config.itemsPerPage));
  const startIndex = (currentPage - 1) * config.itemsPerPage;
  const itemsOnThisPage = activeData.slice(startIndex, startIndex + config.itemsPerPage);
  const visibleItems = itemsOnThisPage.slice(0, visibleCount);
  
  const currentCats = activeTab === "products" ? strategies.products.categories : strategies.recipes.categories;
  const currentCatLabel = currentCats.find(c => c.id === activeCategory)?.label || "Items";
  
  const hasMore = visibleCount < itemsOnThisPage.length;

  const updateUrl = (tab: string, cat: string, page: number) => {
    router.push(`${pathname}?tab=${tab}&category=${cat}&page=${page}`, { scroll: false });
  };

  const handleTabChange = (newTab: "products" | "recipes") => {
    setActiveTab(newTab);
    setActiveCategory("all");
    setCurrentPage(1);
    setVisibleCount(config.itemsPerLoad);
    updateUrl(newTab, "all", 1);
  };

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setCurrentPage(1);
    setVisibleCount(config.itemsPerLoad);
    updateUrl(activeTab, catId, 1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setVisibleCount(config.itemsPerLoad);
    updateUrl(activeTab, activeCategory, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      visibleCount,
      totalPages,
      visibleItems,
      itemsOnThisPage,
      currentCats,
      currentCatLabel,
      totalItemsCount: activeData.length,
      hasMore,
    },
    actions: {
      handleTabChange,
      handleCategoryChange,
      handlePageChange,
      handleLoadMore,
      handleBackToBrowsing
    }
  };
}
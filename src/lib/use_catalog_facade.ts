"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCartStore } from "@/store/use_cart_store";

import { 
  weekDiscounts, 
  dailyDiscounts, 
  expiringDiscounts, 
  seasonalRecipes, 
  peopleLiked,
  type DealCard
} from "@/Data/home_data";

export function useCatalogFacade() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setOpen = useCartStore((state) => state.setOpen);

  const config = useMemo(() => ({
    fallbackImg: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
    itemsPerLoad: 8,
    maxRowsPerPage: 3,
    get itemsPerPage() { return this.itemsPerLoad * this.maxRowsPerPage; },
    productCats: [
      { id: "all", label: "All Products", anchor: "products" },
      { id: "week-discounts", label: "Week Discounts", anchor: "week-discounts" },
      { id: "daily-discounts", label: "Daily Discounts", anchor: "daily-discounts" },
      { id: "expiring-discounts", label: "Expiring Soon", anchor: "expiring-discounts" },
    ],
    recipeCats: [
      { id: "all", label: "All Recipes", anchor: "recipes" },
      { id: "seasonal-recipes", label: "Seasonal Recipes", anchor: "seasonal-recipes" },
      { id: "people-liked", label: "People Also Liked", anchor: "people-liked" },
    ]
  }), []);

  const truncateDesc = (text: string, maxLength = 70) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength).trim() + "..." : text;
  };

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

  const allProducts = useMemo(() => {
    const base = [
      ...(weekDiscounts || []).map(p => ({ ...p, _cat: "week-discounts" })),
      ...(dailyDiscounts || []).map(p => ({ ...p, _cat: "daily-discounts" })),
      ...(expiringDiscounts || []).map(p => ({ ...p, _cat: "expiring-discounts" })),
    ];
    return Array(8).fill(base).flat().map((p, i) => ({
      ...p,
      _uniqueId: `prod-${p.title}-${i}`, 
      image: p.image || config.fallbackImg,
      description: truncateDesc(p.description)
    }));
  }, [config.fallbackImg]);

  const allRecipes = useMemo(() => {
    const base = [
      ...(seasonalRecipes || []).map(r => ({ ...r, _cat: "seasonal-recipes" })),
      ...(peopleLiked || []).map(r => ({ ...r, _cat: "people-liked" })),
    ];
    return Array(8).fill(base).flat().map((r, i) => ({
      ...r,
      _uniqueId: `rec-${r.title}-${i}`,
      image: r.image || config.fallbackImg,
      description: truncateDesc(r.description)
    }));
  }, [config.fallbackImg]);

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
  
  const currentCats = activeTab === "products" ? config.productCats : config.recipeCats;
  const currentCatLabel = currentCats.find(c => c.id === activeCategory)?.label || "Items";

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
    const selection = currentCats.find(c => c.id === activeCategory);
    const anchor = selection?.anchor || activeTab;
    router.push(`/#${anchor}`);
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
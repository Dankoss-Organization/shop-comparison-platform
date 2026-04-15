"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Header from "@/Components/Layout/Header";
import Footer from "@/Components/Layout/Footer";
import DealCardFactory from "@/Components/ui/DealCard";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/use_cart_store";
import { CartDrawer } from "@/Components/cart/CartDrawer"; 

import { 
  weekDiscounts, 
  dailyDiscounts, 
  expiringDiscounts, 
  seasonalRecipes, 
  peopleLiked
} from "@/Data/home_data";

function CatalogContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setOpen = useCartStore((state) => state.setOpen);
  const FALLBACK_IMG = "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80";
  const ITEMS_PER_LOAD = 8;
  const MAX_ROWS_PER_PAGE = 3;
  const ITEMS_PER_PAGE = ITEMS_PER_LOAD * MAX_ROWS_PER_PAGE;

  const truncateDesc = (text: string, maxLength = 70) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength).trim() + "..." : text;
  };

  const PRODUCT_CATS = useMemo(() => [
    { id: "all", label: "All Products" },
    { id: "week-discounts", label: "Week Discounts" },
    { id: "daily-discounts", label: "Daily Discounts" },
    { id: "expiring-discounts", label: "Expiring Soon" },
  ], []);

  const RECIPE_CATS = useMemo(() => [
    { id: "all", label: "All Recipes" },
    { id: "seasonal-recipes", label: "Seasonal Recipes" },
    { id: "people-liked", label: "People Also Liked" },
  ], []);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  const urlTab = searchParams.get("tab") === "recipes" ? "recipes" : "products";
  const urlCategory = searchParams.get("category") || "all";
  const urlPage = parseInt(searchParams.get("page") || "1", 10);

  const [activeTab, setActiveTab] = useState<"products" | "recipes">(urlTab);
  const [activeCategory, setActiveCategory] = useState<string>(urlCategory);
  const [currentPage, setCurrentPage] = useState(urlPage > 0 ? urlPage : 1);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const allProducts = useMemo(() => {
    const base = [
      ...(weekDiscounts || []).map(p => ({ ...p, _cat: "week-discounts" })),
      ...(dailyDiscounts || []).map(p => ({ ...p, _cat: "daily-discounts" })),
      ...(expiringDiscounts || []).map(p => ({ ...p, _cat: "expiring-discounts" })),
    ];
    return Array(8).fill(base).flat().map((p, i) => ({
      ...p,
      _uniqueId: `${p.title}-${i}`, 
      image: p.image || FALLBACK_IMG,
      description: truncateDesc(p.description)
    }));
  }, [FALLBACK_IMG]);

  const allRecipes = useMemo(() => {
    const base = [
      ...(seasonalRecipes || []).map(r => ({ ...r, _cat: "seasonal-recipes" })),
      ...(peopleLiked || []).map(r => ({ ...r, _cat: "people-liked" })),
    ];
    return Array(8).fill(base).flat().map((r, i) => ({
      ...r,
      _uniqueId: `${r.title}-${i}`,
      image: r.image || FALLBACK_IMG,
      description: truncateDesc(r.description)
    }));
  }, [FALLBACK_IMG]);

  const activeData = useMemo(() => {
    let data = activeTab === "products" ? allProducts : allRecipes;
    if (activeCategory !== "all") {
      data = data.filter((item) => item._cat === activeCategory);
    }
    return data;
  }, [activeTab, activeCategory, allProducts, allRecipes]);

  const totalPages = Math.max(1, Math.ceil(activeData.length / ITEMS_PER_PAGE));

  const updateUrl = (tab: "products" | "recipes", cat: string, page: number) => {
    router.push(`${pathname}?tab=${tab}&category=${cat}&page=${page}`, { scroll: false });
  };

  const handleTabChange = (newTab: "products" | "recipes") => {
    setActiveTab(newTab);
    setActiveCategory("all");
    setCurrentPage(1);
    setVisibleCount(ITEMS_PER_LOAD);
    updateUrl(newTab, "all", 1);
  };

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setCurrentPage(1);
    setVisibleCount(ITEMS_PER_LOAD);
    updateUrl(activeTab, catId, 1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setVisibleCount(ITEMS_PER_LOAD);
    updateUrl(activeTab, activeCategory, newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_LOAD, itemsOnThisPage.length));
  };

  const handleBackToBrowsing = () => {
    const targetAnchor = activeCategory !== "all" ? activeCategory : activeTab;
    router.push(`/#${targetAnchor}`);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const itemsOnThisPage = activeData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const visibleItems = itemsOnThisPage.slice(0, visibleCount);

  const currentCats = activeTab === "products" ? PRODUCT_CATS : RECIPE_CATS;
  const currentCatLabel = currentCats.find(c => c.id === activeCategory)?.label || "Available Items";

  return (
    <main className="mx-auto w-full max-w-[1800px] flex-1 px-4 pb-24 pt-[110px] md:px-8 lg:px-12 2xl:px-[60px]">
      
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-[1600px] mx-auto">
        <div>
          <button
            onClick={handleBackToBrowsing}
            className="group mb-6 flex items-center gap-2 text-sm font-semibold text-[#FFDEBA]/60 transition-colors hover:text-[#EC5800]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to browsing
          </button>
          <h1 className="text-4xl font-black text-white md:text-5xl lg:text-[54px] tracking-tight">
            Full Catalog
          </h1>
        </div>

        <div className="flex gap-3 rounded-2xl bg-[#1f1a1f] p-1.5 border border-white/5 shadow-inner">
          <button
            onClick={() => handleTabChange("products")}
            className={cn(
              "rounded-xl px-8 py-3.5 text-sm font-bold transition-all duration-300",
              activeTab === "products" ? "bg-[#EC5800] text-white shadow-[0_4px_15px_rgba(236,88,0,0.4)]" : "text-[#FFDEBA]/60 hover:text-white hover:bg-white/5"
            )}
          >
            All Products
          </button>
          <button
            onClick={() => handleTabChange("recipes")}
            className={cn(
              "rounded-xl px-8 py-3.5 text-sm font-bold transition-all duration-300",
              activeTab === "recipes" ? "bg-[#EC5800] text-white shadow-[0_4px_15px_rgba(236,88,0,0.4)]" : "text-[#FFDEBA]/60 hover:text-white hover:bg-white/5"
            )}
          >
            All Recipes
          </button>
        </div>
      </div>

      <div className="mb-14 flex flex-wrap gap-3 max-w-[1600px] mx-auto">
        {currentCats.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 border",
              activeCategory === cat.id ? "bg-white/10 border-white/20 text-white shadow-sm" : "bg-transparent border-white/5 text-[#FFDEBA]/50 hover:bg-white/5 hover:text-white"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <section className="w-full max-w-[1600px] mx-auto">
        
        <div className="mb-10 flex items-center justify-between px-2">
          <h2 className="text-2xl font-bold text-white">
            {activeCategory === "all" ? (activeTab === "products" ? "All Available Products" : "All Curated Recipes") : currentCatLabel}
          </h2>
          <span className="rounded-full bg-[#342e34] px-4 py-1.5 text-xs font-bold text-[#FFDEBA]">
            {activeData.length} items total
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 w-full place-items-center">
          {visibleItems.map((item) => (
            <div 
              key={item._uniqueId} 
              className="flex w-full max-w-[320px] min-w-0 h-full animate-in fade-in zoom-in-95 duration-500"
            >
              <DealCardFactory 
                item={item} 
                variant="default" 
                className="w-full h-full flex flex-col items-stretch justify-between shadow-xl"
                onClick={() => router.push(`/product/${encodeURIComponent(item.title)}`)}
              />
            </div>
          ))}
          {visibleItems.length === 0 && (
            <div className="col-span-full py-20 text-center text-white/50">
              No items found in this category.
            </div>
          )}
        </div>

        {visibleCount < itemsOnThisPage.length && (
          <div className="mt-16 flex justify-center pt-8">
            <button
              onClick={handleLoadMore}
              className="group relative flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-[#EC5800] bg-[#1f1a1f] px-10 text-[15px] font-bold text-[#EC5800] transition-all duration-300 hover:bg-[#EC5800] hover:text-white hover:shadow-[0_8px_20px_rgba(236,88,0,0.3)] active:scale-95"
            >
              <span>Load More Rows</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-y-1"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>
        )}

      </section>

      {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-3">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1f1a1f] text-white transition-all hover:border-[#EC5800] hover:text-[#EC5800] disabled:opacity-30 disabled:pointer-events-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <div className="flex items-center gap-2 px-4">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={`page-${pageNum}`}
                  onClick={() => handlePageChange(pageNum)}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full text-[15px] font-bold transition-all",
                    isActive ? "bg-[#EC5800] text-white shadow-[0_4px_12px_rgba(236,88,0,0.4)]" : "border border-white/5 bg-[#1f1a1f] text-[#FFDEBA]/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1f1a1f] text-white transition-all hover:border-[#EC5800] hover:text-[#EC5800] disabled:opacity-30 disabled:pointer-events-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      )}

    </main>
  );
}

export default function CatalogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#2d282d] font-sans">
      <div className="fixed left-0 right-0 top-0 z-50 bg-[rgba(45,40,45,0.8)] border-b border-white/5 backdrop-blur-xl">
        <Header />
      </div>
      
      <Suspense fallback={
        <div className="flex-1 min-h-screen pt-[110px] flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#EC5800] border-t-transparent"></div>
        </div>
      }>
        <CatalogContent />
      </Suspense>

      <Footer />
      <CartDrawer />
    </div>
  );
}
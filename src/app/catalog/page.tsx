/**
 * @file page.tsx
 * @description Main catalog view with tabbed navigation (products/recipes), category filtering, and a paginated grid layout. Utilizes a facade pattern for state logic.
 */
"use client";

import { Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/Lib/utils";
import Header from "@/Components/Layout/header";
import Footer from "@/Components/Layout/footer";
import { CartDrawer } from "@/Components/Cart/cart_drawer";
import { useCatalogFacade } from "@/Lib/use_catalog_facade";
import CatalogFilterDrawer from "@/Components/Catalog/catalog_filter_drawer";
import CatalogHeader from "@/Components/Catalog/catalog_header";
import CatalogGrid from "@/Components/Catalog/catalog_grid";
import CatalogPagination from "@/Components/Catalog/catalog_pagination";

/**
 * @description Internal component responsible for rendering the content body of the catalog.
 * Uses the `useCatalogFacade` hook to govern complex state like current tab, active category, and pagination variables.
 * Designed to be encapsulated by a React Suspense boundary.
 * @returns {JSX.Element} The header controls, filters, and paginated product grid.
 */
function CatalogContent() {
  const { state, actions } = useCatalogFacade();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (isFilterOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isFilterOpen]);

  const catalogMotionKey = [
    state.activeTab,
    state.activeCategory,
    state.sortBy,
    state.currentPage,
    state.searchTerm,
    state.selectedMarkets.join(","),
    state.minRating,
    state.maxPrice,
    state.minDiscount,
  ].join("-");

  return (
    <>
      <CatalogFilterDrawer
        isOpen={isFilterOpen}
        state={state}
        actions={actions}
        onClose={() => setIsFilterOpen(false)}
      />

      <main className="mx-auto flex w-full max-w-[1800px] flex-1 px-3 pb-24 pt-8 md:px-6 lg:px-8 2xl:px-10">
        <div className="mx-auto w-full max-w-[1700px]">
          <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <button
                onClick={actions.handleBackToBrowsing}
                className="group mb-6 flex items-center gap-2 text-sm font-semibold text-[#FFDEBA]/60 transition-colors hover:text-[#EC5800]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to browsing
              </button>
              <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-[54px]">
                Full Catalog
              </h1>
            </div>

            <div className="relative grid grid-cols-2 gap-2 rounded-2xl border border-white/5 bg-[#1F1A1F] p-1.5 shadow-[inset_0_1px_0_#FFFFFF08,0_14px_28px_#00000020]">
              <div
                className={cn(
                  "pointer-events-none absolute bottom-1.5 top-1.5 z-0 rounded-[0.95rem] bg-[#EC5800] shadow-[0_12px_24px_#5E1F0035] transition-all duration-300 ease-out",
                  state.activeTab === "products"
                    ? "left-1.5 right-[calc(50%+0.25rem)]"
                    : "left-[calc(50%+0.25rem)] right-1.5",
                )}
              />
              <button
                onClick={() => actions.handleTabChange("products")}
                className={cn(
                  "relative z-10 rounded-xl px-8 py-3.5 text-sm font-bold transition-all duration-300",
                  state.activeTab === "products"
                    ? "text-white"
                    : "text-[#FFDEBA]/60 hover:bg-white/5 hover:text-white",
                )}
              >
                All Products
              </button>
              <button
                onClick={() => actions.handleTabChange("recipes")}
                className={cn(
                  "relative z-10 rounded-xl px-8 py-3.5 text-sm font-bold transition-all duration-300",
                  state.activeTab === "recipes"
                    ? "text-white"
                    : "text-[#FFDEBA]/60 hover:bg-white/5 hover:text-white",
                )}
              >
                All Recipes
              </button>
            </div>
          </div>

          <div className="mb-12 flex flex-wrap gap-3">
            {state.currentCats.map((cat) => (
              <button
                key={cat.id}
                onClick={() => actions.handleCategoryChange(cat.id)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5",
                  state.activeCategory === cat.id
                    ? "border-white/20 bg-white/10 text-white shadow-[0_10px_18px_#00000018]"
                    : "border-white/5 bg-transparent text-[#FFDEBA]/50 hover:bg-white/5 hover:text-white",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <CatalogHeader
            state={state}
            actions={actions}
            onOpenFilters={() => setIsFilterOpen(true)}
          />

          <section className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={catalogMotionKey}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <CatalogGrid items={state.visibleItems} />
              </motion.div>
            </AnimatePresence>

            <CatalogPagination
              currentPage={state.currentPage}
              totalPages={state.totalPages}
              hasMore={state.hasMore}
              onPageChange={actions.handlePageChange}
              onLoadMore={actions.handleLoadMore}
            />
          </section>
        </div>
      </main>
    </>
  );
}

/**
 * @description The main page component for the `/catalog` route.
 * Combines layout-level elements (Header, Footer, CartDrawer) and provides 
 * a loading state fallback for the main `CatalogContent`.
 * @returns {JSX.Element} The composed catalog page.
 */
export default function CatalogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#2D282D] font-sans">
      <div className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#2D282DF2]">
        <Header />
      </div>
      <Suspense
        fallback={
          <div className="flex min-h-screen flex-1 items-center justify-center pt-8">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#EC5800] border-t-transparent" />
          </div>
        }
      >
        <CatalogContent />
      </Suspense>
      <Footer />
      <CartDrawer />
    </div>
  );
}
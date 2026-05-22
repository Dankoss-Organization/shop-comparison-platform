/**
 * @file page.tsx  (app/catalog/page.tsx)
 * @description Full catalog view with tabbed navigation (Products / Recipes),
 * category filter pills, and a server-paginated grid.
 * Data is fetched from the real backend API via useCatalogFacade → strategy.fetchData.
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

function CatalogContent() {
  const { state, actions } = useCatalogFacade();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (isFilterOpen) {
      const w = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow    = "hidden";
      document.body.style.paddingRight = `${w}px`;
    } else {
      document.body.style.overflow    = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow    = "";
      document.body.style.paddingRight = "";
    };
  }, [isFilterOpen]);

  const motionKey = [
    state.activeTab,
    state.activeCategory,
    state.sortBy,
    state.currentPage,
    state.searchTerm,
    state.selectedMarkets.join(","),
    state.minRating,
    state.maxPrice,
    state.minDiscount,
  ].join("|");

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
                className="group mb-6 flex items-center gap-2 text-sm font-semibold text-text-primary/60 transition-colors hover:text-brand-orange"
              >
                <svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Back to browsing
              </button>
              <h1 className="text-4xl font-black tracking-tight text-text-main md:text-5xl lg:text-[54px]">
                Full Catalog
              </h1>
            </div>

            <div
              data-testid="tab-switcher"
              className="relative grid grid-cols-2 gap-2 rounded-2xl border border-glass/10 bg-bg-elevated p-1.5 shadow-sm"
            >
              <div
                className={cn(
                  "pointer-events-none absolute bottom-1.5 top-1.5 z-0 rounded-[0.95rem] bg-brand-orange shadow-[0_12px_24px_rgb(var(--brand-orange)_/_0.3)] transition-all duration-300 ease-out",
                  state.activeTab === "products"
                    ? "left-1.5 right-[calc(50%+0.25rem)]"
                    : "left-[calc(50%+0.25rem)] right-1.5",
                )}
              />
              <button
                onClick={() => actions.handleTabChange("products")}
                className={cn(
                  "relative z-10 rounded-xl px-8 py-3.5 text-sm font-bold transition-all duration-300",
                  state.activeTab === "products" ? "text-white" : "text-text-primary/60 hover:text-text-main",
                )}
              >
                All Products
              </button>
              <button
                onClick={() => actions.handleTabChange("recipes")}
                className={cn(
                  "relative z-10 rounded-xl px-8 py-3.5 text-sm font-bold transition-all duration-300",
                  state.activeTab === "recipes" ? "text-white" : "text-text-primary/60 hover:text-text-main",
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
                  "rounded-full border px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5",
                  state.activeCategory === cat.id
                    ? "border-brand-orange/20 bg-brand-orange/10 text-brand-orange"
                    : "border-glass/10 bg-bg-surface text-text-primary/70 hover:bg-bg-elevated hover:text-text-main",
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
            {state.isLoading ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-orange border-t-transparent" />
              </div>
            ) : state.visibleItems.length === 0 ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
                <p className="text-xl font-semibold text-text-primary/60">No items found</p>
                <p className="text-sm text-text-primary/40">
                  Try adjusting your filters or search term.
                </p>
                <button
                  onClick={actions.handleResetFilters}
                  className="mt-2 rounded-full bg-brand-orange px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={motionKey}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CatalogGrid items={state.visibleItems} />
                </motion.div>
              </AnimatePresence>
            )}

            {state.isLoadingMore && (
              <div className="mt-6 flex justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-orange border-t-transparent" />
              </div>
            )}

            {!state.isLoading && !state.isLoadingMore && state.visibleItems.length > 0 && (
              <CatalogPagination
                currentPage={state.currentPage}
                totalPages={state.totalPages}
                hasMore={state.hasMore}
                onPageChange={actions.handlePageChange}
                onLoadMore={actions.handleLoadMore}
              />
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default function CatalogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-main font-sans transition-colors duration-500">
      <div className="sticky top-0 z-50 w-full border-b border-glass/10 bg-bg-surface/95 backdrop-blur-md">
        <Header />
      </div>

      <Suspense
        fallback={
          <div className="flex min-h-screen flex-1 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-orange border-t-transparent" />
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
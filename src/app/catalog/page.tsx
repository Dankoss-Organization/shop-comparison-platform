/**
 * @file CatalogPage.tsx
 * @description Main catalog view with tabbed navigation (products/recipes), category filtering, and a paginated grid layout. Utilizes a facade pattern for state logic.
 */
"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/Components/Layout/header";
import Footer from "@/Components/Layout/footer";
import DealCardFactory from "@/Components/UI/deal_card";
import { cn } from "@/Lib/utils";
import { CartDrawer } from "@/Components/Cart/cart_drawer"; 
import { useCatalogFacade } from "@/Lib/use_catalog_facade";

function CatalogContent() {
  const router = useRouter();
  const { state, actions } = useCatalogFacade();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!sortDropdownRef.current?.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const activeSortLabel =
    state.sortOptions.find((option) => option.value === state.sortBy)?.label ?? "Featured";
  const catalogMotionKey = `${state.activeTab}-${state.activeCategory}-${state.sortBy}-${state.currentPage}`;

  return (
    <main className="mx-auto flex w-full max-w-[1800px] flex-1 px-4 pb-24 pt-8 md:px-8 lg:px-12 2xl:px-[60px]">
      <div className="mx-auto w-full max-w-[1600px]">
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

          <div className="relative grid grid-cols-2 gap-2 rounded-2xl border border-white/5 bg-[#1f1a1f] p-1.5 shadow-[inset_0_1px_0_#ffffff08,0_14px_28px_#00000020]">
            <div
              className={cn(
                "pointer-events-none absolute bottom-1.5 top-1.5 z-0 rounded-[0.95rem] bg-[#EC5800] shadow-[0_12px_24px_#5e1f0035] transition-all duration-300 ease-out",
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

        <div className="mb-14 flex flex-wrap gap-3">
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

        <section className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={catalogMotionKey}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-10 flex flex-col gap-4 px-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {state.activeCategory === "all"
                      ? state.activeTab === "products"
                        ? "All Available Products"
                        : "All Curated Recipes"
                      : state.currentCatLabel}
                  </h2>
                  <span className="mt-3 inline-flex rounded-full bg-[#342e34] px-4 py-1.5 text-xs font-bold text-[#FFDEBA]">
                    {state.totalItemsCount} items total
                  </span>
                </div>

                <div className="flex flex-col gap-2 md:items-end">
                  <span className="px-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FFDEBA]/45">
                    Sort catalog
                  </span>

                  <div ref={sortDropdownRef} className="relative w-full md:w-auto">
                    <button
                      type="button"
                      onClick={() => setIsSortOpen((current) => !current)}
                      className={cn(
                        "group flex w-full items-center justify-between gap-4 rounded-[1rem] border px-4 py-2.5 text-left shadow-[inset_0_1px_0_#ffffff08,0_10px_22px_#00000018] transition-all duration-300 md:min-w-[230px]",
                        isSortOpen
                          ? "border-[#EC5800]/60 bg-[#2a242a] text-[#FFDEBA]"
                          : "border-white/8 bg-[#1f1a1f] text-[#FFDEBA] hover:border-[#EC5800]/35 hover:bg-[#262126]",
                      )}
                    >
                      <span className="text-sm font-semibold">{activeSortLabel}</span>
                      <span
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-full bg-[#342e34] text-[#FFDEBA]/65 transition-all duration-300 group-hover:text-[#EC5800]",
                          isSortOpen ? "rotate-180 text-[#EC5800]" : "",
                        )}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    <div
                      className={cn(
                        "absolute right-0 z-20 mt-2 w-full origin-top overflow-hidden rounded-[1rem] border border-white/8 bg-[#1f1a1f] p-1.5 shadow-[0_18px_34px_#00000038] transition-all duration-200 md:min-w-[240px]",
                        isSortOpen
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-1 opacity-0",
                      )}
                    >
                      <div className="grid gap-1">
                        {state.sortOptions.map((option) => {
                          const isActive = state.sortBy === option.value;

                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                actions.handleSortChange(option.value);
                                setIsSortOpen(false);
                              }}
                              className={cn(
                                "flex items-center justify-between rounded-[0.85rem] px-3.5 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive
                                  ? "bg-[#EC5800] text-white shadow-[0_10px_18px_#5e1f002f]"
                                  : "text-[#FFDEBA]/78 hover:bg-[#2a242a] hover:text-[#FFDEBA]",
                              )}
                            >
                              <span>{option.label}</span>
                              <span
                                className={cn(
                                  "text-sm transition-opacity duration-200",
                                  isActive ? "opacity-100" : "opacity-0",
                                )}
                              >
                                ✓
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid w-full grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-12">
                {state.visibleItems.map((item) => (
                  <motion.div
                    key={item._uniqueId}
                    layout
                    initial={{ opacity: 0, y: 16, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full w-full max-w-[320px] min-w-0"
                  >
                    <DealCardFactory
                      item={item}
                      context="grid"
                      className="flex h-full w-full flex-col items-stretch justify-between shadow-xl"
                      onClick={() => router.push(`/product/${encodeURIComponent(item.title)}`)}
                    />
                  </motion.div>
                ))}
                {state.visibleItems.length === 0 && (
                  <div className="col-span-full py-20 text-center text-white/50">
                    No items found in this category.
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {state.hasMore && (
            <div className="mt-16 flex justify-center pt-8">
              <button
                onClick={actions.handleLoadMore}
                className="group relative flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-[#EC5800] bg-[#1f1a1f] px-10 text-[15px] font-bold text-[#EC5800] transition-all duration-300 hover:bg-[#EC5800] hover:text-white active:scale-95"
              >
                <span>Load More Rows</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-y-1"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          )}
        </section>

        {state.totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-3">
            <button
              onClick={() => actions.handlePageChange(Math.max(1, state.currentPage - 1))}
              disabled={state.currentPage === 1}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1f1a1f] text-white transition-all hover:border-[#EC5800] disabled:pointer-events-none disabled:opacity-30"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="flex items-center gap-2 px-4">
              {Array.from({ length: state.totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === state.currentPage;

                return (
                  <button
                    key={`page-${pageNum}`}
                    onClick={() => actions.handlePageChange(pageNum)}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full text-[15px] font-bold transition-all",
                      isActive
                        ? "bg-[#EC5800] text-white"
                        : "border border-white/5 bg-[#1f1a1f] text-[#FFDEBA]/60",
                    )}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => actions.handlePageChange(Math.min(state.totalPages, state.currentPage + 1))}
              disabled={state.currentPage === state.totalPages}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1f1a1f] text-white transition-all hover:border-[#EC5800] disabled:pointer-events-none disabled:opacity-30"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function CatalogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#2d282d] font-sans">
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

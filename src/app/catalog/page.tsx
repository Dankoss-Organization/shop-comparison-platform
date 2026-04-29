/**
 * @file page.tsx
 * @description catalog/page.tsx is the main catalog view with tab navigation, sorting, left filter drawer, and paginated grid layout.
 */
"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/Components/Layout/header";
import Footer from "@/Components/Layout/footer";
import DealCardFactory from "@/Components/UI/deal_card";
import { CartDrawer } from "@/Components/Cart/cart_drawer";
import { cn } from "@/Lib/utils";
import { useCatalogFacade } from "@/Lib/use_catalog_facade";

const ratingOptions = [0, 4, 4.5, 4.8];
const discountOptions = [0, 10, 20, 30];

type FilterDrawerProps = {
  isOpen: boolean;
  activeTab: "products" | "recipes";
  searchTerm: string;
  maxPrice: number;
  minRating: number;
  minDiscount: number;
  priceBounds: { min: number; max: number };
  availableMarkets: string[];
  selectedMarkets: string[];
  onClose: () => void;
  onSearchChange: (value: string) => void;
  onMaxPriceChange: (value: number) => void;
  onMinRatingChange: (value: number) => void;
  onMinDiscountChange: (value: number) => void;
  onMarketToggle: (value: string) => void;
  onReset: () => void;
};

function FilterDrawer({
  isOpen,
  activeTab,
  searchTerm,
  maxPrice,
  minRating,
  minDiscount,
  priceBounds,
  availableMarkets,
  selectedMarkets,
  onClose,
  onSearchChange,
  onMaxPriceChange,
  onMinRatingChange,
  onMinDiscountChange,
  onMarketToggle,
  onReset,
}: FilterDrawerProps) {
  const [isStoresOpen, setIsStoresOpen] = useState(true);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close filters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-[#120F12B8] backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: "-100%", opacity: 0.7 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0.7 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 top-0 z-[80] flex h-screen w-full max-w-[420px] flex-col overflow-hidden bg-[#191519] shadow-[24px_0_60px_#00000042,inset_0_1px_0_#FFFFFF05]"
          >
            <div className="flex items-center justify-between border-b border-white/6 px-5 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#FFDEBA]/45">
                  Filters
                </p>
                <h3 className="mt-2 text-xl font-black text-white">Refine catalog</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onReset}
                  className="rounded-full bg-[#262026] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#EC5800] transition-all duration-300 hover:bg-[#2E262D] hover:text-[#FF9B58]"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#262026] text-[#FFDEBA] transition-all duration-300 hover:bg-[#2E262D] hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="rounded-[1.3rem] bg-[#211C21] px-4 py-4 shadow-[0_16px_28px_#00000024]">
                <div className="pb-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FFDEBA]/45">
                    Search
                  </p>
                  <label className="mt-3 flex items-center gap-3 rounded-[1rem] bg-[#171317] px-3.5 py-3.5 shadow-[inset_0_1px_0_#FFFFFF04] transition-all duration-300 focus-within:bg-[#1B161B]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#FFDEBA]/55">
                      <path
                        d="M21 21L16.65 16.65M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      value={searchTerm}
                      onChange={(event) => onSearchChange(event.target.value)}
                      placeholder={activeTab === "products" ? "Search products or stores" : "Search recipes or stores"}
                      className="w-full bg-transparent text-sm font-medium text-[#FFDEBA] outline-none placeholder:text-[#FFDEBA]/35"
                    />
                  </label>
                </div>

                <div className="border-t border-[#2F282F] pt-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FFDEBA]/45">
                        Price cap
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#FFDEBA]">
                        Up to ${maxPrice.toFixed(2)}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#2A2120] px-3 py-1 text-xs font-bold text-[#EC5800]">
                      ${priceBounds.min.toFixed(2)} - ${priceBounds.max.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={priceBounds.min || 0}
                    max={priceBounds.max || 0}
                    step={0.05}
                    value={maxPrice}
                    onChange={(event) => onMaxPriceChange(Number(event.target.value))}
                    className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-[#171317] accent-[#EC5800]"
                  />
                </div>

                <div className="border-t border-[#2F282F] pt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FFDEBA]/45">
                    Minimum rating
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {ratingOptions.map((rating) => {
                      const isActive = minRating === rating;

                      return (
                        <button
                          key={`rating-${rating}`}
                          type="button"
                          onClick={() => onMinRatingChange(rating)}
                          className={cn(
                            "rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300",
                            isActive
                              ? "bg-[#EC5800] text-white shadow-[0_10px_18px_#5E1F002F]"
                              : "bg-[#171317] text-[#FFDEBA]/75 hover:bg-[#221B22] hover:text-[#FFDEBA]",
                          )}
                        >
                          {rating === 0 ? "Any" : `${rating}+`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-[#2F282F] pt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FFDEBA]/45">
                    Discount
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {discountOptions.map((discount) => {
                      const isActive = minDiscount === discount;

                      return (
                        <button
                          key={`discount-${discount}`}
                          type="button"
                          onClick={() => onMinDiscountChange(discount)}
                          className={cn(
                            "rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-300",
                            isActive
                              ? "bg-[#EC5800] text-white shadow-[0_10px_18px_#5E1F002F]"
                              : "bg-[#171317] text-[#FFDEBA]/75 hover:bg-[#221B22] hover:text-[#FFDEBA]",
                          )}
                        >
                          {discount === 0 ? "Any" : `${discount}%+`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-[#2F282F] pt-6">
                  <button
                    type="button"
                    onClick={() => setIsStoresOpen((current) => !current)}
                    className="flex w-full items-center justify-between gap-3 rounded-[1rem] bg-[#171317] px-3.5 py-3 text-left transition-all duration-300 hover:bg-[#1D181D]"
                  >
                    <div className="flex items-center gap-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FFDEBA]/45">
                        Stores
                      </p>
                      <span className="rounded-full bg-[#241F24] px-3 py-1 text-xs font-bold text-[#FFDEBA]">
                        {selectedMarkets.length || availableMarkets.length}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-full bg-[#241F24] text-[#FFDEBA]/70 transition-all duration-300",
                        isStoresOpen ? "rotate-180 text-[#EC5800]" : "",
                      )}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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

                  <AnimatePresence initial={false}>
                    {isStoresOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 grid gap-2.5 pb-1">
                          {availableMarkets.map((market) => {
                            const isActive = selectedMarkets.includes(market);

                            return (
                              <button
                                key={market}
                                type="button"
                                onClick={() => onMarketToggle(market)}
                                className={cn(
                                  "flex items-center justify-between rounded-[0.95rem] px-3.5 py-3 text-sm font-semibold transition-all duration-300",
                                  isActive
                                    ? "bg-[#2A2120] text-[#FFDEBA]"
                                    : "bg-[#171317] text-[#FFDEBA]/72 hover:bg-[#221B22] hover:text-[#FFDEBA]",
                                )}
                              >
                                <span>{market}</span>
                                <span
                                  className={cn(
                                    "flex h-5 w-5 items-center justify-center rounded-full text-[10px] transition-all duration-300",
                                    isActive
                                      ? "bg-[#EC5800] text-white shadow-[0_0_0_1px_#EC580040]"
                                      : "bg-[#100D10] text-transparent shadow-[inset_0_0_0_1px_#FFFFFF14]",
                                  )}
                                >
                                  ✓
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function CatalogContent() {
  const router = useRouter();
  const { state, actions } = useCatalogFacade();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const controlsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!controlsRef.current?.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFilterOpen]);

  const activeSortLabel =
    state.sortOptions.find((option) => option.value === state.sortBy)?.label ?? "Featured";

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
      <FilterDrawer
        isOpen={isFilterOpen}
        activeTab={state.activeTab}
        searchTerm={state.searchTerm}
        maxPrice={state.maxPrice}
        minRating={state.minRating}
        minDiscount={state.minDiscount}
        priceBounds={state.priceBounds}
        availableMarkets={state.availableMarkets || []} 
        selectedMarkets={state.selectedMarkets || []}
        onClose={() => setIsFilterOpen(false)}
        onSearchChange={actions.handleSearchChange}
        onMaxPriceChange={actions.handleMaxPriceChange}
        onMinRatingChange={actions.handleMinRatingChange}
        onMinDiscountChange={actions.handleMinDiscountChange}
        onMarketToggle={actions.handleMarketToggle}
        onReset={actions.handleResetFilters}
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

          <section className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={catalogMotionKey}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {state.activeFilterChips.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 flex flex-wrap items-center gap-2.5"
                  >
                    {state.activeFilterChips.map((chip) => (
                      <button
                        key={chip.key === "market" ? `${chip.key}-${chip.value}` : chip.key}
                        type="button"
                        onClick={() => actions.handleRemoveFilterChip(chip)}
                        className="group inline-flex items-center gap-2 rounded-full bg-[#1F1A1F] px-3.5 py-2 text-xs font-semibold text-[#FFDEBA] shadow-[inset_0_0_0_1px_#FFFFFF10] transition-all duration-300 hover:bg-[#262026] hover:text-white"
                      >
                        <span>{chip.label}</span>
                        <span className="text-[#FFDEBA]/45 transition-colors duration-300 group-hover:text-[#EC5800]">×</span>
                      </button>
                    ))}
                  </motion.div>
                ) : null}

                <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {state.activeCategory === "all"
                        ? state.activeTab === "products"
                          ? "All Available Products"
                          : "All Curated Recipes"
                        : state.currentCatLabel}
                    </h2>
                    <span className="mt-3 inline-flex rounded-full bg-[#342E34] px-4 py-1.5 text-xs font-bold text-[#FFDEBA]">
                      {state.totalItemsCount} items total
                    </span>
                  </div>

                  <div ref={controlsRef} className="relative flex flex-col gap-2 md:items-end">
                    <span className="px-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FFDEBA]/45">
                      Catalog controls
                    </span>

                    <div className="flex flex-wrap gap-2 md:justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setIsFilterOpen(true);
                          setIsSortOpen(false);
                        }}
                        className="group inline-flex items-center gap-3 rounded-[1rem] bg-[#1F1A1F] px-4 py-2.5 text-sm font-semibold text-[#FFDEBA] shadow-[inset_0_0_0_1px_#FFFFFF0F,0_10px_22px_#00000018] transition-all duration-300 hover:bg-[#262126]"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#EC5800]">
                          <path
                            d="M3 5H21M6 12H18M10 19H14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span>Filters</span>
                        {state.activeFilterCount > 0 ? (
                          <span className="rounded-full bg-[#EC5800] px-2 py-0.5 text-[11px] font-bold text-white">
                            {state.activeFilterCount}
                          </span>
                        ) : null}
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsSortOpen((current) => !current)}
                        className={cn(
                          "group inline-flex items-center justify-between gap-4 rounded-[1rem] px-4 py-2.5 text-left text-[#FFDEBA] transition-all duration-300 md:min-w-[220px]",
                          isSortOpen
                            ? "bg-[#2A242A] shadow-[inset_0_0_0_1px_#EC58004A,0_10px_22px_#00000020]"
                            : "bg-[#1F1A1F] shadow-[inset_0_0_0_1px_#FFFFFF0F,0_10px_22px_#00000018] hover:bg-[#262126]",
                        )}
                      >
                        <span className="text-sm font-semibold">{activeSortLabel}</span>
                        <span
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full bg-[#342E34] text-[#FFDEBA]/65 transition-all duration-300 group-hover:text-[#EC5800]",
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
                    </div>

                    <div
                      className={cn(
                        "absolute right-0 top-full z-30 mt-3 w-full max-w-[320px] origin-top rounded-[1.2rem] bg-[#1C171C] p-1.5 shadow-[inset_0_0_0_1px_#FFFFFF10,0_18px_34px_#00000042] transition-all duration-200 sm:min-w-[300px]",
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
                                "flex items-center justify-between rounded-[0.9rem] px-3.5 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive
                                  ? "bg-[#EC5800] text-white shadow-[0_10px_18px_#5E1F002F]"
                                  : "text-[#FFDEBA]/78 hover:bg-[#2A242A] hover:text-[#FFDEBA]",
                              )}
                            >
                              <span>{option.label}</span>
                              <span className={cn("text-sm transition-opacity duration-200", isActive ? "opacity-100" : "opacity-0")}>✓</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid w-full grid-cols-1 place-items-center gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 2xl:gap-9">
                  {state.visibleItems.map((item) => (
                    <motion.div
                      key={item._uniqueId}
                      layout
                      initial={{ opacity: 0, y: 16, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="flex h-full w-full min-w-0 justify-center"
                    >
                      <DealCardFactory
                        item={item}
                        context="grid"
                        className="flex h-full w-full max-w-[320px] flex-col items-stretch justify-between shadow-xl"
                        onClick={() => router.push(`/product/${encodeURIComponent(item.title)}`)}
                      />
                    </motion.div>
                  ))}

                  {state.visibleItems.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-white/50">
                      No items found for the selected filters.
                    </div>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>

            {state.hasMore ? (
              <div className="mt-16 flex justify-center pt-8">
                <button
                  onClick={actions.handleLoadMore}
                  className="group relative flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-[#EC5800] bg-[#1F1A1F] px-10 text-[15px] font-bold text-[#EC5800] transition-all duration-300 hover:bg-[#EC5800] hover:text-white active:scale-95"
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
            ) : null}
          </section>

          {state.totalPages > 1 ? (
            <div className="mt-16 flex items-center justify-center gap-3">
              <button
                onClick={() => actions.handlePageChange(Math.max(1, state.currentPage - 1))}
                disabled={state.currentPage === 1}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1F1A1F] text-white transition-all hover:border-[#EC5800] disabled:pointer-events-none disabled:opacity-30"
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
                          : "border border-white/5 bg-[#1F1A1F] text-[#FFDEBA]/60",
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
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1F1A1F] text-white transition-all hover:border-[#EC5800] disabled:pointer-events-none disabled:opacity-30"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}

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
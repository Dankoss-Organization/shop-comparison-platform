/**
 * @file catalog_header.tsx
 * @description Provides the catalog title area, sorting dropdown, filter toggle, and active filter chip display.
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/Lib/utils";
import type { useCatalogFacade } from "@/Lib/use_catalog_facade";

type FacadeReturn = ReturnType<typeof useCatalogFacade>;

export interface CatalogHeaderProps {
  state: FacadeReturn["state"];
  actions: FacadeReturn["actions"];
  onOpenFilters: () => void;
}

/**
 * @description The header section above the catalog grid, controlling sort order and active filters.
 * @param {CatalogHeaderProps} props - Facade state, actions, and filter drawer toggle.
 * @returns {JSX.Element} The catalog header controls.
 */
export default function CatalogHeader({ state, actions, onOpenFilters }: CatalogHeaderProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const controlsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!controlsRef.current?.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const activeSortLabel =
    state.sortOptions.find((opt) => opt.value === state.sortBy)?.label ?? "Featured";

  return (
    <div className="mb-8 flex flex-col gap-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-black text-text-main">
            {state.activeCategory === "all"
              ? state.activeTab === "products"
                ? "All Available Products"
                : "All Curated Recipes"
              : state.currentCatLabel}
          </h2>
          <span className="mt-3 inline-flex rounded-full bg-bg-elevated px-4 py-1.5 text-xs font-bold text-brand-orange border border-glass/5 shadow-sm">
            {state.totalItemsCount} items total
          </span>
        </div>

        <div ref={controlsRef} className="relative flex flex-col gap-2 md:items-end">
          <span className="px-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-text-primary/50">
            Catalog controls
          </span>

          <div className="flex flex-wrap gap-2 md:justify-end">
            <button
              type="button"
              onClick={() => {
                onOpenFilters();
                setIsSortOpen(false);
              }}
              className="group inline-flex items-center gap-3 rounded-[1rem] bg-bg-surface px-4 py-2.5 text-sm font-semibold text-text-primary border border-glass/10 shadow-sm transition-all duration-300 hover:bg-bg-elevated hover:text-text-main"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-brand-orange">
                <path
                  d="M3 5H21M6 12H18M10 19H14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span>Filters</span>
              {state.activeFilterCount > 0 ? (
                <span className="rounded-full bg-brand-orange px-2 py-0.5 text-[11px] font-bold text-white">
                  {state.activeFilterCount}
                </span>
              ) : null}
            </button>

            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              className={cn(
                "group inline-flex items-center justify-between gap-4 rounded-[1rem] px-4 py-2.5 text-left text-text-primary transition-all duration-300 md:min-w-[220px] border border-glass/10 shadow-sm",
                isSortOpen
                  ? "bg-bg-elevated border-brand-orange/40"
                  : "bg-bg-surface hover:bg-bg-elevated hover:text-text-main",
              )}
            >
              <span className="text-sm font-semibold">{activeSortLabel}</span>
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full bg-bg-elevated text-text-primary/65 transition-all duration-300 group-hover:text-brand-orange",
                  isSortOpen ? "rotate-180 text-brand-orange" : "",
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
              "absolute right-0 top-full z-30 mt-3 w-full max-w-[320px] origin-top rounded-[1.2rem] bg-bg-surface p-1.5 shadow-xl border border-glass/10 transition-all duration-200 sm:min-w-[300px]",
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
                        ? "bg-brand-orange text-white shadow-md"
                        : "text-text-primary hover:bg-bg-elevated hover:text-text-main",
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

      {state.activeFilterChips.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2.5">
          {state.activeFilterChips.map((chip) => (
            <button
              key={chip.key === "market" ? `${chip.key}-${chip.value}` : chip.key}
              type="button"
              onClick={() => actions.handleRemoveFilterChip(chip)}
              className="group inline-flex items-center gap-2 rounded-full bg-bg-elevated px-3.5 py-2 text-xs font-semibold text-text-primary border border-glass/5 shadow-sm transition-all duration-300 hover:border-brand-orange/30 hover:text-text-main"
            >
              <span>{chip.label}</span>
              <span className="text-text-primary/45 transition-colors duration-300 group-hover:text-brand-orange">
                ×
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
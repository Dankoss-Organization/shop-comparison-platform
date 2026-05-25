"use client";

import { useRef } from "react";
import type { useCatalogFacade } from "@/Lib/use_catalog_facade";
import BaseSortDropdown from "@/Components/UI/base_sort_dropdown";

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
  const controlsRef = useRef<HTMLDivElement | null>(null);

  const sortOptions = state.sortOptions.map(opt => ({
    value: String(opt.value),
    label: opt.label
  }));

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
              onClick={onOpenFilters}
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

            <BaseSortDropdown 
              options={sortOptions}
              value={String(state.sortBy)}
              onChange={(newVal) => actions.handleSortChange(newVal as any)}
              fallbackLabel="Featured"
            />
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
/**
 * @file catalog_pagination.tsx
 * @description Handles traditional page-based navigation and "Load More" functionality for the catalog.
 */
"use client";

import { cn } from "@/Lib/utils";

export interface CatalogPaginationProps {
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  onPageChange: (page: number) => void;
  onLoadMore: () => void;
}

/**
 * @description Pagination controls component.
 * @param {CatalogPaginationProps} props - Current page, total pages, and load more configurations.
 * @returns {JSX.Element | null} Pagination interface.
 */
export default function CatalogPagination({
  currentPage,
  totalPages,
  hasMore,
  onPageChange,
  onLoadMore,
}: CatalogPaginationProps) {
  return (
    <div className="mt-16 flex flex-col items-center gap-10">
      {hasMore ? (
        <button
          onClick={onLoadMore}
          className="group relative flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-brand-orange bg-bg-surface px-10 text-[15px] font-bold text-brand-orange transition-all duration-300 hover:bg-brand-orange hover:text-white active:scale-95 shadow-sm"
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
      ) : null}

      {totalPages > 1 ? (
        <div className="flex items-center gap-3">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-glass/10 bg-bg-elevated text-text-primary transition-all hover:border-brand-orange hover:text-brand-orange disabled:pointer-events-none disabled:opacity-20"
            aria-label="Previous page"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="flex items-center gap-2 px-4">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === currentPage;

              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={`page-${pageNum}`}
                    onClick={() => onPageChange(pageNum)}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full text-[15px] font-bold transition-all",
                      isActive
                        ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20"
                        : "border border-glass/5 bg-bg-elevated text-text-primary/70 hover:border-brand-orange/40 hover:text-text-main",
                    )}
                  >
                    {pageNum}
                  </button>
                );
              }

              if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                return (
                  <span
                    key={`ellipsis-${pageNum}`}
                    className="flex h-12 w-6 items-center justify-center text-text-primary/30"
                  >
                    …
                  </span>
                );
              }

              return null;
            })}
          </div>

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-glass/10 bg-bg-elevated text-text-primary transition-all hover:border-brand-orange hover:text-brand-orange disabled:pointer-events-none disabled:opacity-20"
            aria-label="Next page"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
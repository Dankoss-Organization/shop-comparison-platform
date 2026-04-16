/**
 * @file CatalogPage.tsx
 * @description Main catalog view with tabbed navigation (products/recipes), category filtering, and a paginated grid layout. Utilizes a facade pattern for state logic.
 */
"use client";

import { Suspense } from "react";
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

  return (
    <main className="mx-auto w-full max-w-[1800px] flex-1 px-4 pb-24 pt-8 md:px-8 lg:px-12 2xl:px-[60px]">
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-[1600px] mx-auto">
        <div>
          <button onClick={actions.handleBackToBrowsing} className="group mb-6 flex items-center gap-2 text-sm font-semibold text-[#FFDEBA]/60 transition-colors hover:text-[#EC5800]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to browsing
          </button>
          <h1 className="text-4xl font-black text-white md:text-5xl lg:text-[54px] tracking-tight">Full Catalog</h1>
        </div>
        <div className="flex gap-3 rounded-2xl bg-[#1f1a1f] p-1.5 border border-white/5 shadow-inner">
          <button onClick={() => actions.handleTabChange("products")} className={cn("rounded-xl px-8 py-3.5 text-sm font-bold transition-all duration-300", state.activeTab === "products" ? "bg-[#EC5800] text-white" : "text-[#FFDEBA]/60 hover:text-white hover:bg-white/5")}>All Products</button>
          <button onClick={() => actions.handleTabChange("recipes")} className={cn("rounded-xl px-8 py-3.5 text-sm font-bold transition-all duration-300", state.activeTab === "recipes" ? "bg-[#EC5800] text-white" : "text-[#FFDEBA]/60 hover:text-white hover:bg-white/5")}>All Recipes</button>
        </div>
      </div>

      <div className="mb-14 flex flex-wrap gap-3 max-w-[1600px] mx-auto">
        {state.currentCats.map((cat) => (
          <button key={cat.id} onClick={() => actions.handleCategoryChange(cat.id)} className={cn("rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 border", state.activeCategory === cat.id ? "bg-white/10 border-white/20 text-white shadow-sm" : "bg-transparent border-white/5 text-[#FFDEBA]/50 hover:bg-white/5 hover:text-white")}>
            {cat.label}
          </button>
        ))}
      </div>

      <section className="w-full max-w-[1600px] mx-auto">
        <div className="mb-10 flex items-center justify-between px-2">
          <h2 className="text-2xl font-bold text-white">{state.activeCategory === "all" ? (state.activeTab === "products" ? "All Available Products" : "All Curated Recipes") : state.currentCatLabel}</h2>
          <span className="rounded-full bg-[#342e34] px-4 py-1.5 text-xs font-bold text-[#FFDEBA]">{state.totalItemsCount} items total</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 w-full place-items-center">
          {state.visibleItems.map((item: any) => (
            <div key={item._uniqueId} className="flex w-full max-w-[320px] min-w-0 h-full animate-in fade-in zoom-in-95 duration-500">
              <DealCardFactory item={item} context="grid" className="w-full h-full flex flex-col items-stretch justify-between shadow-xl" onClick={() => router.push(`/product/${encodeURIComponent(item.title)}`)} />
            </div>
          ))}
          {state.visibleItems.length === 0 && <div className="col-span-full py-20 text-center text-white/50">No items found in this category.</div>}
        </div>

        {state.hasMore && (
          <div className="mt-16 flex justify-center pt-8">
            <button onClick={actions.handleLoadMore} className="group relative flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-[#EC5800] bg-[#1f1a1f] px-10 text-[15px] font-bold text-[#EC5800] transition-all duration-300 hover:bg-[#EC5800] hover:text-white active:scale-95">
              <span>Load More Rows</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-y-1"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>
        )}
      </section>

      {state.totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-3">
          <button onClick={() => actions.handlePageChange(Math.max(1, state.currentPage - 1))} disabled={state.currentPage === 1} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1f1a1f] text-white transition-all hover:border-[#EC5800] disabled:opacity-30 disabled:pointer-events-none"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
          <div className="flex items-center gap-2 px-4">
            {Array.from({ length: state.totalPages }).map((_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === state.currentPage;
              return <button key={`page-${pageNum}`} onClick={() => actions.handlePageChange(pageNum)} className={cn("flex h-12 w-12 items-center justify-center rounded-full text-[15px] font-bold transition-all", isActive ? "bg-[#EC5800] text-white" : "border border-white/5 bg-[#1f1a1f] text-[#FFDEBA]/60")}>{pageNum}</button>;
            })}
          </div>
          <button onClick={() => actions.handlePageChange(Math.min(state.totalPages, state.currentPage + 1))} disabled={state.currentPage === state.totalPages} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1f1a1f] text-white transition-all hover:border-[#EC5800] disabled:opacity-30 disabled:pointer-events-none"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
        </div>
      )}
    </main>
  );
}

export default function CatalogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#2d282d] font-sans">
      <div className="sticky top-0 z-50 w-full bg-[rgba(45,40,45,0.95)] border-b border-white/5">
        <Header />
      </div>
      <Suspense fallback={<div className="flex-1 min-h-screen pt-8 flex items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-[#EC5800] border-t-transparent"></div></div>}>
        <CatalogContent />
      </Suspense>
      <Footer />
      <CartDrawer />
    </div>
  );
}
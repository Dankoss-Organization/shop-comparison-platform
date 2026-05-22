/**
 * @file page.tsx (app/favorites/page.tsx)
 * @description Dedicated view displaying all products users saved.
 * Fetches real product data from the backend based on saved IDs.
 */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/Components/Layout/header";
import Footer from "@/Components/Layout/footer";
import DealCardFactory from "@/Components/UI/deal_card";
import { useFavoritesStore } from "@/Store/use_favourite_store";
import { useUserStore } from "@/Store/user_store";
import { useUIStore } from "@/Store/use_ui_store";
import { productsApi } from "@/Lib/api/index";
import { mapProductCardToDealCard } from "@/Lib/api/products_api.adapters";
import type { DealCard } from "@/Data/home_data";

export default function FavoritesPage() {
  const router = useRouter();
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const { isAuthenticated } = useUserStore();
  const openProfileWithLoginHint = useUIStore((state) => state.openProfileWithLoginHint);
  
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState<DealCard[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !isAuthenticated) return;

    if (favoriteIds.length === 0) {
      setFavoriteItems([]);
      return;
    }

    let isCancelled = false;

    const fetchFavorites = async () => {
      setIsFetching(true);
      try {
        const results = await Promise.allSettled(
          favoriteIds.map((id) => productsApi.getProductCard(id))
        );

        if (isCancelled) return;

        const validItems = results
          .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
          .map((r) => mapProductCardToDealCard(r.value));

        setFavoriteItems(validItems);
      } catch (error) {
        console.error("[Favorites] Error fetching favorite products:", error);
      } finally {
        if (!isCancelled) setIsFetching(false);
      }
    };

    fetchFavorites();

    return () => {
      isCancelled = true;
    };
  }, [isMounted, isAuthenticated, favoriteIds]);

  const handleSignInHint = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => openProfileWithLoginHint(), 300);
  };

  const LockedView = () => (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-10 rounded-[48px] border border-glass/10 bg-bg-surface backdrop-blur-xl px-10 py-24 text-center shadow-soft">
      <div className="relative flex h-32 w-32 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-bg-elevated border border-brand-orange/10 shadow-sm">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange">
            <path d="M12 21C11.7 21 11.4 20.9 11.2 20.7C7.8 17.8 5.5 15.7 4 13.9C2.5 12.1 1.75 10.4 1.75 8.45C1.75 6.85 2.28333 5.5 3.35 4.4C4.41667 3.3 5.75 2.75 7.35 2.75C8.25 2.75 9.10833 2.94167 9.925 3.325C10.7417 3.70833 11.4333 4.25 12 4.95C12.5667 4.25 13.2583 3.70833 14.075 3.325C14.8917 2.94167 15.75 2.75 16.65 2.75C18.25 2.75 19.5833 3.3 20.65 4.4C21.7167 5.5 22.25 6.85 22.25 8.45C22.25 10.4 21.5 12.1 20 13.9C18.5 15.7 16.2 17.8 12.8 20.7C12.6 20.9 12.3 21 12 21Z" />
          </svg>
          <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange border-[3px] border-bg-surface shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 max-w-[420px]">
        <h2 className="text-3xl font-light tracking-wide text-text-main">Sign in to view favorites</h2>
        <p className="text-[16px] text-text-muted leading-relaxed font-light">
          Create a free account to view your wishlist, sync your saved items across devices, and never lose track of a deal.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <button
          onClick={handleSignInHint}
          className="flex h-[48px] min-w-[180px] items-center justify-center rounded-full bg-brand-orange text-[15px] font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-95"
        >
          Sign In / Register
        </button>
        <button
          onClick={() => router.push("/")}
          className="flex h-[48px] min-w-[180px] items-center justify-center rounded-full border border-glass/10 bg-bg-elevated text-[15px] font-medium text-text-muted backdrop-blur-md transition-all hover:border-brand-orange/40 hover:text-brand-orange active:scale-95 shadow-sm"
        >
          Browse Catalog
        </button>
      </div>
    </div>
  );

  const EmptyView = () => (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-8 rounded-[48px] border border-glass/10 bg-bg-surface backdrop-blur-xl px-10 py-24 text-center shadow-soft">
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-bg-elevated border border-glass/5 shadow-sm">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange opacity-80">
          <path d="M12 21C11.7 21 11.4 20.9 11.2 20.7C7.8 17.8 5.5 15.7 4 13.9C2.5 12.1 1.75 10.4 1.75 8.45C1.75 6.85 2.28333 5.5 3.35 4.4C4.41667 3.3 5.75 2.75 7.35 2.75C8.25 2.75 9.10833 2.94167 9.925 3.325C10.7417 3.70833 11.4333 4.25 12 4.95C12.5667 4.25 13.2583 3.70833 14.075 3.325C14.8917 2.94167 15.75 2.75 16.65 2.75C18.25 2.75 19.5833 3.3 20.65 4.4C21.7167 5.5 22.25 6.85 22.25 8.45C22.25 10.4 21.5 12.1 20 13.9C18.5 15.7 16.2 17.8 12.8 20.7C12.6 20.9 12.3 21 12 21Z" />
        </svg>
      </div>
      <div className="flex flex-col gap-3 max-w-[400px]">
        <h2 className="text-3xl font-light tracking-wide text-text-main">Your wishlist is empty</h2>
        <p className="text-[16px] text-text-muted leading-relaxed font-light">
          Explore the catalog and tap the heart icon on items you want to save for later.
        </p>
      </div>
      <button
        onClick={() => router.push("/")}
        className="mt-4 flex h-[48px] min-w-[200px] items-center justify-center rounded-full bg-brand-orange text-[15px] font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-95"
      >
        Go to Catalog
      </button>
    </div>
  );

  return (
    <main className="min-h-screen bg-bg-main font-sans text-text-main transition-colors duration-500">
      <Header />

      <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 xl:px-[40px] min-h-[70vh]">
        <button
          onClick={() => router.push("/")}
          className="group mb-10 flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-brand-orange"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-x-1">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to browsing
        </button>

        <div className="mb-10 flex items-end justify-between border-b border-glass/10 pb-6">
          <div>
            <h1 className="text-[2.5rem] font-black tracking-[0.05em] text-text-main uppercase leading-none">
              Favorites
            </h1>
            <p className="mt-3 text-[15px] text-text-muted font-light">
              {!isMounted || isFetching
                ? "Loading…"
                : !isAuthenticated
                ? "Sign in to view your synced wishlist"
                : favoriteItems.length === 0
                ? "No saved items yet"
                : `${favoriteItems.length} saved item${favoriteItems.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          <div className="hidden sm:flex items-center justify-center h-14 w-14 rounded-full border border-glass/5 bg-bg-surface shadow-sm">
            <svg 
              width="26" height="26" viewBox="0 0 24 24" 
              fill={isMounted && isAuthenticated && favoriteItems.length > 0 ? "currentColor" : "none"} 
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              className="text-brand-orange"
            >
              <path d="M12 21C11.7 21 11.4 20.9 11.2 20.7C7.8 17.8 5.5 15.7 4 13.9C2.5 12.1 1.75 10.4 1.75 8.45C1.75 6.85 2.28333 5.5 3.35 4.4C4.41667 3.3 5.75 2.75 7.35 2.75C8.25 2.75 9.10833 2.94167 9.925 3.325C10.7417 3.70833 11.4333 4.25 12 4.95C12.5667 4.25 13.2583 3.70833 14.075 3.325C14.8917 2.94167 15.75 2.75 16.65 2.75C18.25 2.75 19.5833 3.3 20.65 4.4C21.7167 5.5 22.25 6.85 22.25 8.45C22.25 10.4 21.5 12.1 20 13.9C18.5 15.7 16.2 17.8 12.8 20.7C12.6 20.9 12.3 21 12 21Z" />
            </svg>
          </div>
        </div>

        {!isMounted || isFetching ? (
          <div className="flex h-[40vh] items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-orange border-t-transparent" />
          </div>
        ) : !isAuthenticated ? (
          <LockedView />
        ) : favoriteItems.length === 0 ? (
          <EmptyView />
        ) : (
          <div className="grid w-full grid-cols-1 place-items-center gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 2xl:gap-9">
            {favoriteItems.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex h-full w-full min-w-0 justify-center">
                <DealCardFactory
                  item={item}
                  context="grid"
                  className="flex h-full w-full max-w-[320px] flex-col items-stretch justify-between shadow-xl"
                  onClick={() => router.push(`/product/${encodeURIComponent(item.id)}?from=favorites`)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
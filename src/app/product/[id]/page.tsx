/**
 * @file page.tsx
 * @description Dynamic product details view backed by the real products API.
 */
"use client";

import React, { useEffect, useState } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import Header from "@/Components/Layout/header";
import Footer from "@/Components/Layout/footer";
import ProductCarousel from "@/Components/Sections/product_carousel";
import { useCartStore } from "@/Store/use_cart_store";
import { CartDrawer } from "@/Components/Cart/cart_drawer";
import {
  ImageGallery,
  ProductActions,
  ProductDetails,
  ProductHeader,
  Reviews,
} from "@/Components/UI/product_view";
import type { DealCard } from "@/Data/home_data";
import {
  mapProductCardToDealCard,
  mapRelatedProductsToDealCards,
} from "@/Lib/api/products_api.adapters";
import { productsApi } from "@/Lib/api";

export interface HistoryItem {
  title: string;
  url: string;
}

interface CartState {
  setOpen: (open: boolean) => void;
}

const PRODUCT_ROUTE_ALIASES: Record<string, string> = {
  "BAR-005": "BAR-005",
  "Spaghetti No.5": "BAR-005",
  "Barilla Pasta": "BAR-005",
  "KMO-112": "KMO-112",
  "Gouda Cheese": "KMO-112",
  "Cream Cheese": "KMO-112",
  "GAL-025": "GAL-025",
  "Kefir 2.5%": "GAL-025",
  "Greek Yogurt": "GAL-025",
  "OLN-001": "OLN-001",
  "Sunflower Oil": "OLN-001",
  "Olive Oil": "OLN-001",
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setOpen = useCartStore((state: CartState) => state.setOpen);

  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const decodedId = rawId ? decodeURIComponent(rawId) : "";
  const backendProductId = PRODUCT_ROUTE_ALIASES[decodedId] ?? decodedId;
  const fromSource = searchParams.get("from");

  const [item, setItem] = useState<DealCard | null>(null);
  const [similarItems, setSimilarItems] = useState<DealCard[]>([]);
  const [categoryTitle, setCategoryTitle] = useState("Premium Selection");
  const [historyTrail, setHistoryTrail] = useState<HistoryItem[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  useEffect(() => {
    if (!backendProductId) {
      setIsReady(true);
      return;
    }

    let cancelled = false;

    const load = async () => {
      setIsReady(false);
      setError(null);
      setItem(null);
      setSimilarItems([]);

      const applyHistory = (resolved: DealCard) => {
        try {
          const stored = sessionStorage.getItem("productHistoryTrail");
          let parsed: HistoryItem[] = stored ? JSON.parse(stored) : [];

          const existingIndex = parsed.findIndex((entry) => entry.title === resolved.title);
          if (existingIndex !== -1) {
            parsed = parsed.slice(0, existingIndex + 1);
          } else {
            parsed.push({
              title: resolved.title,
              url: `/product/${encodeURIComponent(resolved.id)}`,
            });
            if (parsed.length > 6) parsed.shift();
          }

          if (!cancelled) setHistoryTrail(parsed);
          sessionStorage.setItem("productHistoryTrail", JSON.stringify(parsed));
        } catch {
        }
      };

      try {
        const [cardResult, relatedResult] = await Promise.allSettled([
          productsApi.getProductCard(backendProductId),
          productsApi.getRelatedProducts(backendProductId, { limit: 10 }),
        ]);

        if (cancelled) return;

        if (cardResult.status === "fulfilled") {
          const card = mapProductCardToDealCard(cardResult.value);
          setItem(card);
          applyHistory(card);

          if (cardResult.value.product.category) {
            const category = cardResult.value.product.category as any;
            setCategoryTitle(category.name ?? String(category));
          }
        } else {
          setError("Product not found or failed to load.");
        }

        if (relatedResult.status === "fulfilled") {
          setSimilarItems(mapRelatedProductsToDealCards(relatedResult.value));
        }
      } catch {
        if (!cancelled) {
          setError("Something went wrong while loading this product.");
        }
      } finally {
        if (!cancelled) setIsReady(true);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [backendProductId]);

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-main transition-colors duration-300">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-orange border-t-transparent" />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg-main text-text-main transition-colors duration-300">
        <p className="text-xl font-semibold text-text-primary/60">
          {error ?? "Product not found."}
        </p>
        <button
          onClick={() => router.back()}
          className="rounded-full bg-brand-orange px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          Go back
        </button>
      </div>
    );
  }

  const handleBackToBrowsing = () => {
    sessionStorage.removeItem("productHistoryTrail");

    if (fromSource === "favorites") {
      router.push("/favorites");
      return;
    }

    const lastCatalogUrl = sessionStorage.getItem("lastCatalogUrl");
    if (lastCatalogUrl) {
      router.push(lastCatalogUrl);
    } else {
      router.push("/#products");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg-main text-text-main transition-colors duration-300">
      <div className="sticky top-0 z-50 w-full border-b border-text-main/5 bg-bg-elevated/95 backdrop-blur-md transition-colors duration-300 dark:border-text-primary/5">
        <Header />
      </div>

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 pb-12 pt-8 md:px-8 lg:px-12 2xl:px-[60px]">
        <nav className="mb-4 mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-text-muted dark:text-text-primary/60">
          <button
            onClick={handleBackToBrowsing}
            className="group flex items-center gap-1.5 transition-colors hover:text-brand-orange"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:-translate-x-1"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to browsing
          </button>

          {historyTrail.map((historyItem, index) => (
            <React.Fragment key={`crumb-${index}`}>
              <span className="text-text-main/20 dark:text-white/20">/</span>
              {index === historyTrail.length - 1 ? (
                <span className="text-brand-orange">{historyItem.title}</span>
              ) : (
                <button
                  onClick={() => router.push(historyItem.url)}
                  className="transition-colors hover:text-text-main hover:underline dark:hover:text-text-primary"
                >
                  {historyItem.title}
                </button>
              )}
            </React.Fragment>
          ))}
        </nav>

        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:gap-10">
          <div className="flex w-full flex-col gap-4 lg:w-[45%] xl:w-1/2">
            <ImageGallery item={item} />
            <Reviews item={item} />
          </div>

          <div className="flex w-full flex-col gap-5 lg:w-[55%] xl:w-1/2">
            <ProductHeader item={item} categoryTitle={categoryTitle} />
            <ProductActions item={item} categoryTitle={categoryTitle} />
            <ProductDetails item={item} categoryTitle={categoryTitle} />
          </div>
        </div>

        {similarItems.length > 0 && (
          <div className="-mx-4 border-t border-text-main/5 pt-8 dark:border-white/5 md:-mx-8 lg:-mx-12 2xl:-mx-[60px]">
            <ProductCarousel
              id="related-products"
              eyebrow="More to Explore"
              title="You might also like"
              description="Discover similar products hand-picked for you based on your current selection."
              items={similarItems}
              directLink={true}
            />
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}
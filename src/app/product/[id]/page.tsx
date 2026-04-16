"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import Header from "@/Components/Layout/Header";
import Footer from "@/Components/Layout/Footer";
import ProductCarousel from "@/Components/Sections/ProductCarousel";
import { useCartStore } from "@/store/use_cart_store";
import { CartDrawer } from "@/Components/cart/CartDrawer"; 

import { 
  ImageGallery, 
  Reviews, 
  ProductHeader, 
  ProductActions, 
  ProductDetails 
} from "@/Components/ui/ProductView";

import { 
  weekDiscounts, 
  dailyDiscounts, 
  expiringDiscounts, 
  seasonalRecipes, 
  peopleLiked,
  type DealCard 
} from "@/Data/home_data";

interface HistoryItem {
  title: string;
  url: string;
}

interface CartState {
  setOpen: (open: boolean) => void;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const setOpen = useCartStore((state: CartState) => state.setOpen);
  
  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const decodedId = rawId ? decodeURIComponent(rawId) : "";

  const [item, setItem] = useState<DealCard | null>(null);
  const [similarItems, setSimilarItems] = useState<DealCard[]>([]);
  const [categoryTitle, setCategoryTitle] = useState("Premium Selection");
  const [historyTrail, setHistoryTrail] = useState<HistoryItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  useEffect(() => {
    if (!decodedId) {
      setIsReady(true);
      return;
    }

    const allProducts = [
      ...weekDiscounts.map(i => ({ ...i, _catTitle: "Week Discounts", _isRecipe: false })),
      ...dailyDiscounts.map(i => ({ ...i, _catTitle: "Daily Discounts", _isRecipe: false })),
      ...expiringDiscounts.map(i => ({ ...i, _catTitle: "Expiring Discounts", _isRecipe: false })),
      ...seasonalRecipes.map(i => ({ ...i, _catTitle: "Seasonal Recipes", _isRecipe: true })),
      ...peopleLiked.map(i => ({ ...i, _catTitle: "People Also Liked", _isRecipe: true }))
    ];
    
    const matchId = decodedId.toLowerCase().replace(/\s+/g, '-');
    let match = allProducts.find((i) => 
      i.title === decodedId || 
      i.title.toLowerCase().replace(/\s+/g, '-') === matchId ||
      encodeURIComponent(i.title) === decodedId
    );

    if (!match) match = allProducts[0];

    const related = allProducts.filter((i) => i.title !== match?.title).slice(0, 10);

    setItem(match);
    setSimilarItems(related);
    setCategoryTitle((match as any)._catTitle || "Premium Selection");

    try {
      const storedHistory = sessionStorage.getItem("productHistoryTrail");
      let parsed: HistoryItem[] = storedHistory ? JSON.parse(storedHistory) : [];
      
      const existingIdx = parsed.findIndex((p) => p.title === match?.title);
      if (existingIdx !== -1) {
        parsed = parsed.slice(0, existingIdx + 1);
      } else {
        parsed.push({ title: match.title, url: `/product/${encodeURIComponent(match.title)}` });
        if (parsed.length > 6) parsed.shift();
      }
      
      setHistoryTrail(parsed);
      sessionStorage.setItem("productHistoryTrail", JSON.stringify(parsed));
    } catch (e) {}

    setIsReady(true);
  }, [decodedId]);

  if (!isReady || !item) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2d282d]">
         <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#EC5800] border-t-transparent"></div>
      </div>
    );
  }

  const handleBackToBrowsing = () => {
    sessionStorage.removeItem("productHistoryTrail");
    
    const lastCatalogUrl = sessionStorage.getItem("lastCatalogUrl");
    if (lastCatalogUrl) {
      router.push(lastCatalogUrl);
    } else {
      const isRecipe = (item as any)?._isRecipe || item?.title.toLowerCase().includes("recipe") || item?.title.toLowerCase().includes("pasta");
      router.push(isRecipe ? "/#recipes" : "/#products");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#2d282d]">
      <div className="sticky top-0 z-50 w-full bg-[rgba(45,40,45,0.95)] border-b border-white/5">
        <Header />
      </div>

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 pb-12 pt-8 md:px-8 lg:px-12 2xl:px-[60px]">
        
        <nav className="mb-4 mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-[#FFDEBA]/60">
          <button onClick={handleBackToBrowsing} className="group flex items-center gap-1.5 transition-colors hover:text-[#EC5800]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to browsing
          </button>
          
          {historyTrail.map((h, i) => (
            <React.Fragment key={`crumb-${i}`}>
              <span className="text-white/20">/</span>
              {i === historyTrail.length - 1 ? (
                <span className="text-[#EC5800]">{h.title}</span>
              ) : (
                <button onClick={() => router.push(h.url)} className="transition-colors hover:text-[#FFDEBA] hover:underline">
                  {h.title}
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
          <div className="-mx-4 border-t border-white/5 pt-8 md:-mx-8 lg:-mx-12 2xl:-mx-[60px]">
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
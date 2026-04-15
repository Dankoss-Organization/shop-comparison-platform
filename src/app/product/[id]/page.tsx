"use client";

import React, { useEffect, useState, useMemo, ReactNode } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import Header from "@/Components/Layout/Header";
import Footer from "@/Components/Layout/Footer";
import SmartImage from "@/Components/ui/SmartImage";
import ProductCarousel from "@/Components/Sections/ProductCarousel";
import { useFavoritesStore } from "@/store/use_favourites_store";
import { useCartStore } from "@/store/use_cart_store";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/Components/cart/CartDrawer"; 

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

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const setOpen = useCartStore((state) => state.setOpen);
  
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
    const isRecipe = (item as any)?._isRecipe || item?.title.toLowerCase().includes("recipe") || item?.title.toLowerCase().includes("pasta");
    router.push(isRecipe ? "/#recipes" : "/#products");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#2d282d]">
      <div className="fixed left-0 right-0 top-0 z-50 bg-[rgba(45,40,45,0.8)] border-b border-white/5 backdrop-blur-xl">
        <Header />
      </div>

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 pb-12 pt-[80px] md:px-8 lg:px-12 2xl:px-[60px]">
        
        <nav className="mb-4 mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-[#FFDEBA]/60">
          <button
            onClick={handleBackToBrowsing}
            className="group flex items-center gap-1.5 transition-colors hover:text-[#EC5800]"
          >
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


function ImageGallery({ item }: { item: DealCard }) {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavoriteGlobal = useFavoritesStore((state) => state.isFavorite(item.title));
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  const favourite = isMounted ? isFavoriteGlobal : false;

  return (
    <div className="relative overflow-hidden rounded-[1.7rem] border border-[#ffffff0f] bg-[linear-gradient(180deg,#3a343a_0%,#241f24_100%)] p-5 shadow-[0_20px_36px_#00000022]">
      <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
        <span className="rounded-full bg-[#171316E6] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFDEBA]">{item.market || "MARKET"}</span>
        <span className="rounded-full bg-[#EC5800] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">{item.discount || "SALE"}</span>
      </div>
      <button
        type="button"
        onClick={() => toggleFavorite(item.title)}
        className={cn(
          "absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 active:scale-75",
          favourite ? "bg-[#EC5800] text-white shadow-[0_4px_15px_rgba(236,88,0,0.5)] border border-[#EC5800]" : "bg-black/30 backdrop-blur-md border border-white/20 text-white/90 hover:bg-black/50 hover:text-white"
        )}
      >
        <div className={cn("transition-transform duration-300", favourite ? "scale-110" : "scale-100")}><HeartBadge filled={favourite} /></div>
      </button>
      <div className="mx-auto aspect-[4/4.8] h-[48vh] max-w-full overflow-hidden rounded-[1rem] flex items-center justify-center">
        <SmartImage src={item.image || "/placeholder.jpg"} alt={item.title} />
      </div>
    </div>
  );
}

function Reviews({ item }: { item: DealCard }) {
  const [open, setOpen] = useState(true);
  const reviewCards = useMemo(() => [
    { author: "Anna M.", stars: 5, text: `Looks premium and the ${item.discount || "price"} really feels worth it. Great pick for a quick basket.` },
    { author: "Maks K.", stars: 4, text: `Very solid choice. I like the nutrition block and the pack size makes sense for repeat orders.` },
  ], [item.discount]);

  return (
    <>
      <div className="rounded-[1.2rem] border border-[#ffffff0d] bg-[#1f1a1f] px-4 py-4">
        <div className="rounded-[1.15rem] border border-[#ffffff10] bg-[#262126] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#FFDEBA80]">Rating</p>
              <p className="mt-3 text-[2.7rem] font-black leading-none text-[#FFDEBA]">{item.rating || "4.9"}</p>
            </div>
            <div className="rounded-full bg-[#EC58001A] px-3 py-1.5 text-xs font-semibold text-[#EC5800]">Verified reviews</div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[#EC5800]">
            {Array.from({ length: 5 }).map((_, index) => <span key={`hero-star-${index}`}>{index < Math.round(Number(item.rating || 5)) ? "★" : "☆"}</span>)}
          </div>
          <p className="mt-4 text-sm leading-6 text-[#FFDEBAA6]">Loved for strong savings, clear nutrition info, and quick basket decisions.</p>
        </div>
      </div>
      <AccordionBlock label="Reviews" open={open} onToggle={() => setOpen(!open)}>
        <div className="space-y-3">{reviewCards.map((review) => <ReviewCard key={review.author} {...review} />)}</div>
      </AccordionBlock>
    </>
  );
}

function ProductHeader({ item, categoryTitle }: { item: DealCard, categoryTitle: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#EC5800]">{categoryTitle}</p>
      <h1 className="mt-3 text-[2rem] font-black leading-[1.02] text-[#FFDEBA]">{item.title}</h1>
      <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
        <p className="text-[2rem] font-black text-[#FFDEBA]">{item.price}</p>
        {item.oldPrice && <span className="text-base text-[#FFDEBA66] line-through">{item.oldPrice}</span>}
      </div>
      <p className="mt-4 text-sm leading-6 text-[#FFDEBAA6]">{item.description}</p>
    </div>
  );
}

function ProductActions({ item, categoryTitle }: { item: DealCard, categoryTitle: string }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  
  const parsedQuantity = useMemo(() => {
    try {
      const q = (item.quantity || "1 pc").toLowerCase();
      const isWeight = q.includes("g") || q.includes("kg");
      return { isWeight, baseUnit: isWeight ? "g" : "pc", baseValue: 1 };
    } catch {
      return { isWeight: false, baseUnit: "pc", baseValue: 1 };
    }
  }, [item.quantity]);

  const [amount, setAmount] = useState(() => parsedQuantity.isWeight ? 100 : 1);

  const handleDecrease = () => setAmount((a) => parsedQuantity.isWeight ? Math.max(100, a - 100) : Math.max(1, a - 1));
  const handleIncrease = () => setAmount((a) => parsedQuantity.isWeight ? a + 100 : a + 1);

  const handleAddToCart = () => {
    const qtyToAdd = parsedQuantity.isWeight ? Math.max(1, Math.floor(amount / 100)) : Math.max(1, amount);
    for (let i = 0; i < qtyToAdd; i++) {
      addItem(item);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); 
  };

  const amountDisplay = parsedQuantity.isWeight ? (amount >= 1000 ? `${Number((amount / 1000).toFixed(3))} kg` : `${amount} g`) : `${amount} ${amount === 1 ? "pack" : "packs"}`;
  const totalDisplay = parsedQuantity.isWeight ? amountDisplay : `${amount} ${parsedQuantity.baseUnit}`;

  return (
    <>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <OptionBlock label="Quantity" content={
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <button type="button" onClick={handleDecrease} disabled={parsedQuantity.isWeight ? amount <= 100 : amount <= 1} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.9rem] border border-[#ffffff12] bg-[#1f1a1f] text-lg font-semibold text-[#FFDEBA] transition disabled:cursor-not-allowed disabled:opacity-45 hover:border-[#EC5800]">
                −
              </button>
              <div className="flex h-11 w-full items-center justify-center rounded-[0.9rem] border border-[#ffffff12] bg-[#1f1a1f] px-4 text-sm font-semibold text-[#FFDEBA]">
                {amountDisplay}
              </div>
              <button type="button" onClick={handleIncrease} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.9rem] border border-[#ffffff12] bg-[#1f1a1f] text-lg font-semibold text-[#FFDEBA] transition hover:border-[#EC5800]">
                +
              </button>
            </div>
            <p className="text-xs font-medium text-[#FFDEBA66]">Total: {totalDisplay}</p>
          </div>
        } />
        <OptionBlock label="Pack info" content={
          <div className="flex flex-wrap gap-2"><SoftTag>{item.quantity || "1 pc"}</SoftTag><SoftTag>{categoryTitle}</SoftTag></div>
        } />
      </div>
      
      <div className="mt-6">
        <button 
          type="button" 
          onClick={handleAddToCart}
          className={cn(
            "w-full rounded-[1rem] px-5 py-4 text-[16px] font-bold text-white transition-all duration-300 active:scale-[0.98]",
            added 
              ? "bg-green-600 shadow-[0_8px_20px_rgba(22,163,74,0.3)] hover:shadow-[0_12px_25px_rgba(22,163,74,0.4)]"
              : "bg-[#EC5800] shadow-[0_8px_20px_rgba(236,88,0,0.3)] hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(236,88,0,0.4)]"
          )}
        >
          {added ? "Added! ✓" : "Add to cart"}
        </button>
      </div>
    </>
  );
}

function ProductDetails({ item, categoryTitle }: { item: DealCard, categoryTitle: string }) {
  const [expanded, setExpanded] = useState({ description: true, nutrition: true, details: false });
  const toggle = (key: keyof typeof expanded) => setExpanded(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="mt-8 space-y-3">
      <AccordionBlock label="Description" open={expanded.description} onToggle={() => toggle("description")}>
        <div className="space-y-4 text-sm leading-6 text-[#FFDEBAA6]">
          <p>{item.description}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <QuickFact label="Category" value={categoryTitle} />
            <QuickFact label="Pack" value={item.quantity || "N/A"} />
            <QuickFact label="Price" value={item.price} />
            <QuickFact label="Previous" value={item.oldPrice || "-"} />
          </div>
        </div>
      </AccordionBlock>
      
      <AccordionBlock label="Nutrition" open={expanded.nutrition} onToggle={() => toggle("nutrition")}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <NutrientStat label="Calories" value={item.nutrition?.calories || "-"} accent="#EC5800" />
          <NutrientStat label="Carbs" value={item.nutrition?.carbs || "-"} accent="#f6a35a" />
          <NutrientStat label="Fats" value={item.nutrition?.fats || "-"} accent="#d87b34" />
          <NutrientStat label="Protein" value={item.nutrition?.protein || "-"} accent="#FFDEBA" />
          <NutrientStat label="Fiber" value={item.nutrition?.fiber || "-"} accent="#c18d61" />
          <NutrientStat label="Sugar" value={item.nutrition?.sugar || "-"} accent="#ee9656" />
        </div>
      </AccordionBlock>

      <AccordionBlock label="Details & allergens" open={expanded.details} onToggle={() => toggle("details")}>
        <div className="space-y-4 text-sm text-[#FFDEBAA6]">
          <DetailLine title="Allergens" values={item.allergens?.length ? item.allergens : ["No major allergens listed"]} />
          <DetailLine title="Notes" values={item.notes?.length ? item.notes : ["No extra notes available"]} />
        </div>
      </AccordionBlock>
    </div>
  );
}

function OptionBlock({ label, content }: { label: string; content: ReactNode }) {
  return (
    <div className="rounded-[1.2rem] border border-[#ffffff10] bg-[#1f1a1f] p-4 shadow-[0_10px_20px_#00000014] h-full">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FFDEBA80]">{label}</p>
      <div className="mt-3">{content}</div>
    </div>
  );
}
function SoftTag({ children }: { children: ReactNode }) { return <span className="rounded-full border border-[#ffffff12] bg-[#2a242a] px-3 py-1.5 text-sm font-semibold text-[#FFDEBA]">{children}</span>; }
function AccordionBlock({ label, open, onToggle, children }: { label: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-[#ffffff10] bg-[#1f1a1f] shadow-[0_10px_18px_#00000014]">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between px-5 py-4 text-left">
        <span className="text-base font-semibold text-[#FFDEBA]">{label}</span>
        <span className={cn("text-[#FFDEBA] transition duration-300", open ? "rotate-180 text-[#EC5800]" : "")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </button>
      {open && <div className="border-t border-[#ffffff0c] px-5 py-4">{children}</div>}
    </div>
  );
}
function QuickFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] bg-[#2a242a] px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.24em] text-[#FFDEBA80]">{label}</p>
      <p className="mt-2 font-semibold text-[#FFDEBA]">{value}</p>
    </div>
  );
}
function NutrientStat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-[1rem] border border-[#ffffff10] bg-[#262126] p-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#FFDEBA80]">{label}</p>
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
      </div>
      <p className="mt-3 text-xl font-black text-[#FFDEBA]">{value}</p>
    </div>
  );
}
function DetailLine({ title, values }: { title: string; values: string[] }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFDEBA80]">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.map((value) => <span key={`${title}-${value}`} className="rounded-full border border-[#EC580022] bg-[#EC580014] px-3 py-1.5 text-xs font-semibold text-[#FFDEBA]">{value}</span>)}
      </div>
    </div>
  );
}
function ReviewCard({ author, stars, text }: { author: string; stars: number; text: string }) {
  return (
    <div className="rounded-[1rem] border border-[#ffffff10] bg-[#262126] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-[#FFDEBA]">{author}</p>
          <div className="mt-1 flex items-center gap-1 text-[#EC5800]">
            {Array.from({ length: 5 }).map((_, i) => <span key={`${author}-${i}`}>{i < stars ? "★" : "☆"}</span>)}
          </div>
        </div>
        <span className="rounded-full bg-[#EC580014] px-3 py-1 text-xs font-semibold text-[#EC5800]">Verified</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-[#FFDEBAA6]">{text}</p>
    </div>
  );
}
function HeartBadge({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21C11.7 21 11.4 20.9 11.2 20.7C7.8 17.8 5.5 15.7 4 13.9C2.5 12.1 1.75 10.4 1.75 8.45C1.75 6.85 2.28333 5.5 3.35 4.4C4.41667 3.3 5.75 2.75 7.35 2.75C8.25 2.75 9.10833 2.94167 9.925 3.325C10.7417 3.70833 11.4333 4.25 12 4.95C12.5667 4.25 13.2583 3.70833 14.075 3.325C14.8917 2.94167 15.75 2.75 16.65 2.75C18.25 2.75 19.5833 3.3 20.65 4.4C21.7167 5.5 22.25 6.85 22.25 8.45C22.25 10.4 21.5 12.1 20 13.9C18.5 15.7 16.2 17.8 12.8 20.7C12.6 20.9 12.3 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
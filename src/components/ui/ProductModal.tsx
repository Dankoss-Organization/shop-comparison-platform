"use client";

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import type { DealCard } from "@/Data/home_data";
import SmartImage from "./SmartImage";
import { useFavoritesStore } from "@/store/use_favourites_store";
import { cn, parseQuantity } from "@/lib/utils";

interface ProductModalContextType {
  item: DealCard;
  onClose: () => void;
}

const ProductModalContext = createContext<ProductModalContextType | undefined>(undefined);

function useProductModal() {
  const context = useContext(ProductModalContext);
  if (!context) throw new Error("ProductModal components must be used within <ProductModal>");
  return context;
}

export function ProductModal({ item, onClose, children }: { item: DealCard; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <ProductModalContext.Provider value={{ item, onClose }}>
      <div 
        className="fixed inset-0 z-[120] flex items-start justify-center bg-[#120f12]/85 p-4 pt-14 pb-12 backdrop-blur-md overflow-y-auto" 
        onClick={onClose}
      >
        {children}
      </div>
    </ProductModalContext.Provider>
  );
}

ProductModal.Window = function Window({ children }: { children: ReactNode }) {
  const { onClose } = useProductModal();

  const handleFullView = () => {
    alert("Full product page is coming soon!");
  };

  return (
    <div
      className="relative mb-12 min-h-[500px] w-[90vw] max-w-[1240px] overflow-hidden rounded-[2.5rem] border border-[#ffffff10] bg-[#2D282D] text-[#FFDEBA] shadow-[0_36px_90px_#000000] lg:h-[86vh]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute right-6 top-6 z-30 rounded-full border border-[#ffffff10] bg-[#8B87901F] px-3 py-2.5 shadow-[0_12px_24px_#00000026] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <ActionIconButton 
            label="Open in separate page" 
            onClick={handleFullView} 
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>} 
          />
          <ActionIconButton label="Close" onClick={onClose} icon={<span className="text-xl leading-none">×</span>} />
        </div>
      </div>
      <div className="grid h-full overflow-hidden lg:grid-cols-[0.92fr_1.08fr]">
        {children}
      </div>
    </div>
  );
};

ProductModal.LeftColumn = function LeftColumn({ children }: { children: ReactNode }) {
  return <div className="h-full overflow-y-auto border-r border-[#ffffff0d] px-5 pb-6 pt-6 lg:px-6 lg:pb-8 lg:pt-8 custom-scrollbar"><div className="flex flex-col gap-4">{children}</div></div>;
};

ProductModal.RightColumn = function RightColumn({ children }: { children: ReactNode }) {
  return <div className="h-full overflow-y-auto px-5 pb-6 pt-6 lg:px-8 lg:pb-8 lg:pt-8 custom-scrollbar"><div className="max-w-[580px]">{children}</div></div>;
};

ProductModal.ImageGallery = function ImageGallery() {
  const { item } = useProductModal();
  
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavoriteGlobal = useFavoritesStore((state) => state.isFavorite(item.title));
  
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const favourite = isMounted ? isFavoriteGlobal : false;

  return (
    <div className="relative overflow-hidden rounded-[1.7rem] border border-[#ffffff0f] bg-[linear-gradient(180deg,#3a343a_0%,#241f24_100%)] p-5 shadow-[0_20px_36px_#00000022]">
      <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
        <span className="rounded-full bg-[#171316E6] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFDEBA]">
          {item.market}
        </span>
        <span className="rounded-full bg-[#EC5800] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
          {item.discount}
        </span>
      </div>
      
      <button
        type="button"
        onClick={() => toggleFavorite(item.title)}
        className={cn(
          "absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 active:scale-75",
          favourite
            ? "bg-[#EC5800] text-white shadow-[0_4px_15px_rgba(236,88,0,0.5)] border border-[#EC5800]"
            : "bg-black/30 backdrop-blur-md border border-white/20 text-white/90 hover:bg-black/50 hover:text-white"
        )}
      >
        <div className={cn("transition-transform duration-300", favourite ? "scale-110" : "scale-100")}>
          <HeartBadge filled={favourite} />
        </div>
      </button>

      <div className="mx-auto aspect-[4/4.8] h-[48vh] max-w-full overflow-hidden rounded-[1rem]">
        <SmartImage src={item.image} alt={item.title} />
      </div>
    </div>
  );
};

ProductModal.Reviews = function Reviews() {
  const { item } = useProductModal();
  const [open, setOpen] = useState(true);
  const reviewCards = useMemo(() => [
    { author: "Anna M.", stars: 5, text: `Looks premium and the ${item.discount} really feels worth it. Great pick for a quick basket.` },
    { author: "Maks K.", stars: 4, text: `Very solid choice. I like the nutrition block and the pack size makes sense for repeat orders.` },
  ], [item.discount]);

  return (
    <>
      <div className="rounded-[1.2rem] border border-[#ffffff0d] bg-[#1f1a1f] px-4 py-4">
        <div className="rounded-[1.15rem] border border-[#ffffff10] bg-[#262126] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#FFDEBA80]">Rating</p>
              <p className="mt-3 text-[2.7rem] font-black leading-none text-[#FFDEBA]">{item.rating}</p>
            </div>
            <div className="rounded-full bg-[#EC58001A] px-3 py-1.5 text-xs font-semibold text-[#EC5800]">Verified reviews</div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-[#EC5800]">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={`hero-star-${index}`}>{index < Math.round(Number(item.rating)) ? "★" : "☆"}</span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-[#FFDEBAA6]">Loved for strong savings, clear nutrition info, and quick basket decisions.</p>
        </div>
      </div>
      <AccordionBlock label="Reviews" open={open} onToggle={() => setOpen(!open)}>
        <div className="space-y-3">
          {reviewCards.map((review) => <ReviewCard key={review.author} {...review} />)}
        </div>
      </AccordionBlock>
    </>
  );
};

ProductModal.Header = function Header({ categoryTitle }: { categoryTitle: string }) {
  const { item } = useProductModal();
  return (
    <>
      <div className="flex items-start justify-between gap-4 pr-20">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#EC5800]">{categoryTitle}</p>
          <h3 className="mt-3 text-[2rem] font-black leading-[1.02] text-[#FFDEBA]">{item.title}</h3>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
        <p className="text-[2rem] font-black text-[#FFDEBA]">{item.price}</p>
        <span className="text-base text-[#FFDEBA66] line-through">{item.oldPrice}</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-[#FFDEBAA6]">{item.description}</p>
    </>
  );
};

ProductModal.Actions = function Actions({ categoryTitle }: { categoryTitle: string }) {
  const { item } = useProductModal();
  const parsedQuantity = useMemo(() => parseQuantity(item.quantity), [item.quantity]);
  const [amount, setAmount] = useState(() => parsedQuantity.isWeight ? (parsedQuantity.baseUnit === "kg" ? parsedQuantity.baseValue * 1000 : parsedQuantity.baseValue) : 1);

  const handleDecrease = () => setAmount((a) => parsedQuantity.isWeight ? Math.max(100, a - 100) : Math.max(1, a - 1));
  const handleIncrease = () => setAmount((a) => parsedQuantity.isWeight ? a + 100 : a + 1);

  const amountDisplay = parsedQuantity.isWeight ? (amount >= 1000 ? `${Number((amount / 1000).toFixed(3))} kg` : `${amount} g`) : `${amount} ${amount === 1 ? "pack" : "packs"}`;
  const totalDisplay = parsedQuantity.isWeight ? amountDisplay : `${Math.round(amount * parsedQuantity.baseValue * 1000) / 1000} ${parsedQuantity.baseUnit}`;

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
          <div className="flex flex-wrap gap-2"><SoftTag>{item.quantity}</SoftTag><SoftTag>{categoryTitle}</SoftTag></div>
        } />
      </div>
      <div className="mt-6 grid gap-3 grid-cols-2">
        <button type="button" className="rounded-[1rem] border border-[#FFDEBA] bg-transparent px-5 py-3.5 text-sm font-semibold text-[#FFDEBA] transition hover:border-[#EC5800] hover:bg-[#EC580012]">
          Add to cart
        </button>
        <button type="button" className="rounded-[1rem] bg-[#EC5800] px-5 py-3.5 text-sm font-semibold text-white transition hover:brightness-110">
          Buy it now
        </button>
      </div>
    </>
  );
};

ProductModal.Details = function Details({ categoryTitle }: { categoryTitle: string }) {
  const { item } = useProductModal();
  const [expanded, setExpanded] = useState({ description: true, nutrition: true, details: false });
  const toggle = (key: keyof typeof expanded) => setExpanded(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="mt-8 space-y-3">
      <AccordionBlock label="Description" open={expanded.description} onToggle={() => toggle("description")}>
        <div className="space-y-4 text-sm leading-6 text-[#FFDEBAA6]">
          <p>{item.description}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <QuickFact label="Category" value={categoryTitle} />
            <QuickFact label="Pack" value={item.quantity} />
            <QuickFact label="Price" value={item.price} />
            <QuickFact label="Previous" value={item.oldPrice} />
          </div>
        </div>
      </AccordionBlock>
      
      <AccordionBlock label="Nutrition" open={expanded.nutrition} onToggle={() => toggle("nutrition")}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <NutrientStat label="Calories" value={item.nutrition.calories} accent="#EC5800" />
          <NutrientStat label="Carbs" value={item.nutrition.carbs} accent="#f6a35a" />
          <NutrientStat label="Fats" value={item.nutrition.fats} accent="#d87b34" />
          <NutrientStat label="Protein" value={item.nutrition.protein} accent="#FFDEBA" />
          <NutrientStat label="Fiber" value={item.nutrition.fiber} accent="#c18d61" />
          <NutrientStat label="Sugar" value={item.nutrition.sugar} accent="#ee9656" />
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
};

function OptionBlock({ label, content }: { label: string; content: ReactNode }) {
  return (
    <div className="rounded-[1.2rem] border border-[#ffffff10] bg-[#1f1a1f] p-4 shadow-[0_10px_20px_#00000014]">
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
        <span className={["text-[#FFDEBA] transition", open ? "rotate-180" : ""].join(" ")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </button>
      {open ? <div className="border-t border-[#ffffff0c] px-5 py-4">{children}</div> : null}
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

function ActionIconButton({ label, onClick, icon }: { label: string; onClick: () => void; icon: ReactNode }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#ffffff10] bg-[#8B87901A] text-[#FFDEBA] transition hover:border-[#EC5800] hover:bg-[#8B879024] hover:text-[#EC5800]">
      {icon}
    </button>
  );
}

function HeartBadge({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21C11.7 21 11.4 20.9 11.2 20.7C7.8 17.8 5.5 15.7 4 13.9C2.5 12.1 1.75 10.4 1.75 8.45C1.75 6.85 2.28333 5.5 3.35 4.4C4.41667 3.3 5.75 2.75 7.35 2.75C8.25 2.75 9.10833 2.94167 9.925 3.325C10.7417 3.70833 11.4333 4.25 12 4.95C12.5667 4.25 13.2583 3.70833 14.075 3.325C14.8917 2.94167 15.75 2.75 16.65 2.75C18.25 2.75 19.5833 3.3 20.65 4.4C21.7167 5.5 22.25 6.85 22.25 8.45C22.25 10.4 21.5 12.1 20 13.9C18.5 15.7 16.2 17.8 12.8 20.7C12.6 20.9 12.3 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
export default ProductModal;
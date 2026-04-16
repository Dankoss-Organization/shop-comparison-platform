/**
 * @file product_modal.tsx
 * @description A complex, composable modal component for displaying detailed product information, reviews, and handling cart/favorite actions.
 * @pattern Compound Components: Uses the Context API to allow parent-child component communication without prop drilling (e.g., `<ProductModal.Window>`, `<ProductModal.Header>`).
 * @pattern Custom Hooks: Encapsulates complex business logic (favorites, cart manipulation, parsing quantities) into isolated, reusable hooks (`useFavoriteLogic`, `useCartLogic`).
 */
"use client";

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { DealCard } from "@/Data/home_data";
import SmartImage from "./smart_image";
import { useFavoritesStore } from "@/Store/use_favourites_store";
import { useCartStore } from "@/Store/use_cart_store";
import { cn } from "@/Lib/utils";

interface FavoritesState {
  toggleFavorite: (title: string) => void;
  isFavorite: (title: string) => boolean;
}

interface CartState {
  addItem: (item: DealCard) => void;
}

/**
 * Defines the shape of the data shared across all internal modal components.
 */

interface ProductModalContextType {
  item: DealCard;
  onClose: () => void;
}

const ProductModalContext = createContext<ProductModalContextType | undefined>(undefined);

/**
 * Custom hook to securely access the modal's context.
 * Throws an error if a child component is used outside of the `ProductModalRoot`.
 */

function useProductModal() {
  const context = useContext(ProductModalContext);
  if (!context) throw new Error("ProductModal components must be used within <ProductModal.Root>");
  return context;
}

/**
 * Encapsulates the logic for checking and toggling a product's favorite status globally.
 * Handles React hydration safety for Next.js.
 * * @param {string} title - The unique identifier (title) of the product.
 * @returns {Object} State and methods for favorites management.
 */

function useFavoriteLogic(title: string) {
  const toggleFavorite = useFavoritesStore((state: FavoritesState) => state.toggleFavorite);
  const isFavoriteGlobal = useFavoritesStore((state: FavoritesState) => state.isFavorite(title));
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => setIsMounted(true), []);
  const favourite = isMounted ? isFavoriteGlobal : false;

  return { favourite, toggleFavorite: () => toggleFavorite(title) };
}

/**
 * Encapsulates the complex logic for parsing product quantities (grams vs pieces),
 * handling user increments/decrements, and dispatching items to the global cart store.
 * * @param {DealCard} item - The current product object.
 * @returns {Object} Computed display values, state variables, and action handlers.
 */

function useCartLogic(item: DealCard) {
  const addItem = useCartStore((state: CartState) => state.addItem);
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
    for (let i = 0; i < qtyToAdd; i++) { addItem(item); }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); 
  };

  const amountDisplay = parsedQuantity.isWeight 
    ? (amount >= 1000 ? `${Number((amount / 1000).toFixed(3))} kg` : `${amount} g`) 
    : `${amount} ${amount === 1 ? "pack" : "packs"}`;
    
  const totalDisplay = parsedQuantity.isWeight ? amountDisplay : `${amount} ${parsedQuantity.baseUnit}`;

  return { 
    amount, 
    amountDisplay, 
    totalDisplay, 
    added, 
    parsedQuantity, 
    handleDecrease, 
    handleIncrease, 
    handleAddToCart 
  };
}

/**
 * The primary wrapper component that establishes the Context Provider.
 * Also manages global DOM side-effects like body scroll locking and Escape key listeners.
 */

function ProductModalRoot({ item, onClose, children }: { item: DealCard; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
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
        className="fixed inset-0 z-[120] flex items-start justify-center bg-[#120f12]/85 p-4 pt-14 pb-12 backdrop-blur-md overflow-y-auto transition-opacity" 
        onClick={onClose}
      >
        {children}
      </div>
    </ProductModalContext.Provider>
  );
}

/**
 * The main container rendering the modal's physical UI boundaries.
 * Includes layout grid setups and absolute positioned action buttons (Close/Expand).
 */

function ModalWindow({ children }: { children: ReactNode }) {
  const { item, onClose } = useProductModal();
  const router = useRouter();

  const handleFullView = () => {
    onClose();
    router.push(`/product/${encodeURIComponent(item.title)}`);
  };

  return (
    <div 
      className="relative mb-12 min-h-[500px] w-[90vw] max-w-[1240px] overflow-hidden rounded-[2.5rem] border border-[#ffffff10] bg-[#2D282D] text-[#FFDEBA] shadow-[0_36px_90px_#000000] lg:h-[86vh] animate-in zoom-in-95 fade-in duration-300" 
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute right-6 top-6 z-30 rounded-full border border-[#ffffff10] bg-[#8B87901F] px-3 py-2.5 shadow-[0_12px_24px_#00000026] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <ActionIconButton 
            label="Open in separate page" 
            onClick={handleFullView} 
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>} 
          />
          <ActionIconButton 
            label="Close" 
            onClick={onClose} 
            icon={<span className="text-xl leading-none">×</span>} 
          />
        </div>
      </div>
      <div className="grid h-full overflow-hidden lg:grid-cols-[0.92fr_1.08fr]">
        {children}
      </div>
    </div>
  );
}

/**
 * Structural component for the left side of the split layout (usually images and reviews).
 */

function LeftColumn({ children }: { children: ReactNode }) {
  return (
    <div className="h-full overflow-y-auto border-r border-[#ffffff0d] px-5 pb-6 pt-6 lg:px-6 lg:pb-8 lg:pt-8 custom-scrollbar">
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

/**
 * Structural component for the right side of the split layout (usually details and actions).
 */

function RightColumn({ children }: { children: ReactNode }) {
  return (
    <div className="h-full overflow-y-auto px-5 pb-6 pt-6 lg:px-8 lg:pb-8 lg:pt-8 custom-scrollbar">
      <div className="max-w-[580px]">{children}</div>
    </div>
  );
}

/**
 * Displays the primary product image, store badges, discount tags, and favorite toggle.
 */

function ImageGallery() {
  const { item } = useProductModal();
  const { favourite, toggleFavorite } = useFavoriteLogic(item.title);

  return (
    <div className="relative overflow-hidden rounded-[1.7rem] border border-[#ffffff0f] bg-[linear-gradient(180deg,#3a343a_0%,#241f24_100%)] p-5 shadow-[0_20px_36px_#00000022]">
      <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
        <span className="rounded-full bg-[#171316E6] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FFDEBA]">{item.market || "MARKET"}</span>
        <span className="rounded-full bg-[#EC5800] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">{item.discount || "SALE"}</span>
      </div>
      
      <button 
        type="button" 
        onClick={toggleFavorite} 
        className={cn("absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 active:scale-75", favourite ? "bg-[#EC5800] text-white shadow-[0_4px_15px_rgba(236,88,0,0.5)] border border-[#EC5800]" : "bg-black/30 backdrop-blur-md border border-white/20 text-white/90 hover:bg-black/50 hover:text-white")}
      >
        <div className={cn("transition-transform duration-300", favourite ? "scale-110" : "scale-100")}>
          <HeartBadge filled={favourite} />
        </div>
      </button>

      <div className="mx-auto aspect-[4/4.8] h-[48vh] max-w-full overflow-hidden rounded-[1rem] flex items-center justify-center">
        <SmartImage src={item.image || "/placeholder.jpg"} alt={item.title} />
      </div>
    </div>
  );
}

/**
 * Displays aggregate rating data and individual user reviews inside a collapsible accordion.
 */

function Reviews() {
  const { item } = useProductModal();
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
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={`hero-star-${index}`}>{index < Math.round(Number(item.rating || 5)) ? "★" : "☆"}</span>
            ))}
          </div>
        </div>
      </div>
      <AccordionBlock label="Reviews" open={open} onToggle={() => setOpen(!open)}>
        <div className="space-y-3">
          {reviewCards.map((review) => <ReviewCard key={review.author} {...review} />)}
        </div>
      </AccordionBlock>
    </>
  );
}

/**
 * Renders the top-level typography: Category, Title, Price, and short description.
 */

function Header({ categoryTitle = "Details" }: { categoryTitle?: string }) {
  const { item } = useProductModal();
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

/**
 * Handles the user interactions for modifying quantities and dispatching the Add to Cart action.
 */

function Actions({ categoryTitle = "Details" }: { categoryTitle?: string }) {
  const { item } = useProductModal();
  const { 
    amount, 
    amountDisplay, 
    totalDisplay, 
    added, 
    parsedQuantity, 
    handleDecrease, 
    handleIncrease, 
    handleAddToCart 
  } = useCartLogic(item);

  return (
    <>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <OptionBlock 
          label="Quantity" 
          content={
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={handleDecrease} 
                  disabled={parsedQuantity.isWeight ? amount <= 100 : amount <= 1} 
                  className="flex h-11 w-11 items-center justify-center rounded-[0.9rem] border border-[#ffffff12] bg-[#1f1a1f] text-lg font-semibold text-[#FFDEBA] transition disabled:opacity-45 hover:border-[#EC5800]"
                >
                  −
                </button>
                <div className="flex h-11 w-full items-center justify-center rounded-[0.9rem] border border-[#ffffff12] bg-[#1f1a1f] px-4 text-sm font-semibold text-[#FFDEBA]">
                  {amountDisplay}
                </div>
                <button 
                  type="button" 
                  onClick={handleIncrease} 
                  className="flex h-11 w-11 items-center justify-center rounded-[0.9rem] border border-[#ffffff12] bg-[#1f1a1f] text-lg font-semibold text-[#FFDEBA] transition hover:border-[#EC5800]"
                >
                  +
                </button>
              </div>
              <p className="text-xs font-medium text-[#FFDEBA66]">Total: {totalDisplay}</p>
            </div>
          } 
        />
        <OptionBlock 
          label="Pack info" 
          content={
            <div className="flex flex-wrap gap-2">
              <SoftTag>{item.quantity || "1 pc"}</SoftTag>
              <SoftTag>{categoryTitle}</SoftTag>
            </div>
          } 
        />
      </div>
      <div className="mt-6">
        <button 
          type="button" 
          onClick={handleAddToCart} 
          className={cn("w-full rounded-[1rem] px-5 py-4 text-[16px] font-bold text-white transition-all duration-300 active:scale-[0.98]", added ? "bg-green-600 shadow-[0_8px_20px_rgba(22,163,74,0.3)]" : "bg-[#EC5800] shadow-[0_8px_20px_rgba(236,88,0,0.3)] hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(236,88,0,0.4)]")}
        >
          {added ? "Added! ✓" : "Add to cart"}
        </button>
      </div>
    </>
  );
}

/**
 * Displays expandable technical/nutritional data inside accordion menus.
 */

function Details({ categoryTitle = "Details" }: { categoryTitle?: string }) {
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
            <QuickFact label="Pack" value={item.quantity || "N/A"} />
            <QuickFact label="Price" value={item.price} />
            <QuickFact label="Previous" value={item.oldPrice || "-"} />
          </div>
        </div>
      </AccordionBlock>
      <AccordionBlock label="Nutrition" open={expanded.nutrition} onToggle={() => toggle("nutrition")}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <NutrientStat label="Calories" value={item.nutrition?.calories || "-"} accent="#EC5800" />
          <NutrientStat label="Protein" value={item.nutrition?.protein || "-"} accent="#FFDEBA" />
        </div>
      </AccordionBlock>
    </div>
  );
}

/**
 * The assembled Compound Component. 
 * Allows consumers to structure the modal's internal layout declaratively.
 * * @example
 * <ProductModal item={product} onClose={handleClose}>
 * <ProductModal.Window>
 * <ProductModal.LeftColumn>
 * <ProductModal.ImageGallery />
 * </ProductModal.LeftColumn>
 * </ProductModal.Window>
 * </ProductModal>
 */

export const ProductModal = Object.assign(ProductModalRoot, {
  Window: ModalWindow,
  LeftColumn,
  RightColumn,
  ImageGallery,
  Reviews,
  Header,
  Actions,
  Details,
});

function OptionBlock({ label, content }: { label: string; content: ReactNode }) {
  return (
    <div className="rounded-[1.2rem] border border-[#ffffff10] bg-[#1f1a1f] p-4 shadow-[0_10px_20px_#00000014] h-full">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FFDEBA80]">
        {label}
      </p>
      <div className="mt-3">
        {content}
      </div>
    </div>
  );
}

function SoftTag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-[#ffffff12] bg-[#2a242a] px-3 py-1.5 text-sm font-semibold text-[#FFDEBA]">
      {children}
    </span>
  );
}

function AccordionBlock({ label, open, onToggle, children }: { label: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-[#ffffff10] bg-[#1f1a1f]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-base font-semibold text-[#FFDEBA]">
          {label}
        </span>
        <span className={cn("text-[#FFDEBA] transition duration-300", open ? "rotate-180 text-[#EC5800]" : "")}>
          ▼
        </span>
      </button>
      
      {open && (
        <div className="border-t border-[#ffffff0c] px-5 py-4">
          {children}
        </div>
      )}
    </div>
  );
}

function QuickFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] bg-[#2a242a] px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.24em] text-[#FFDEBA80]">
        {label}
      </p>
      <p className="mt-2 font-semibold text-[#FFDEBA]">
        {value}
      </p>
    </div>
  );
}

function NutrientStat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-[1rem] border border-[#ffffff10] bg-[#262126] p-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#FFDEBA80]">
          {label}
        </p>
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: accent }}
        />
      </div>
      <p className="mt-3 text-xl font-black text-[#FFDEBA]">
        {value}
      </p>
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
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < stars ? "★" : "☆"}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-[#FFDEBAA6]">
        {text}
      </p>
    </div>
  );
}

function ActionIconButton({ label, onClick, icon }: { label: string; onClick: () => void; icon: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ffffff10] bg-[#8B87901A] text-[#FFDEBA] transition hover:border-[#EC5800]"
    >
      {icon}
    </button>
  );
}

function HeartBadge({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21C11.7 21 11.4 20.9 11.2 20.7C7.8 17.8 5.5 15.7 4 13.9C2.5 12.1 1.75 10.4 1.75 8.45C1.75 6.85 2.28333 5.5 3.35 4.4C4.41667 3.3 5.75 2.75 7.35 2.75C8.25 2.75 9.10833 2.94167 9.925 3.325C10.7417 3.70833 11.4333 4.25 12 4.95C12.5667 4.25 13.2583 3.70833 14.075 3.325C14.8917 2.94167 15.75 2.75 16.65 2.75C18.25 2.75 19.5833 3.3 20.65 4.4C21.7167 5.5 22.25 6.85 22.25 8.45C22.25 10.4 21.5 12.1 20 13.9C18.5 15.7 16.2 17.8 12.8 20.7C12.6 20.9 12.3 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
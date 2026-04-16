/**
 * @file product_modal_blocks.tsx
 * @description A collection of modular UI components used to construct the Product Modal. These components handle specific domains like imagery, reviews, cart actions, and nutritional details.
 * @pattern Modular Design: Breaks down a complex modal into single-responsibility building blocks, making the code easier to test, read, and rearrange.
 */

"use client";

import React, { useState, useMemo, useEffect, ReactNode } from "react";
import { useFavoritesStore } from "@/Store/use_favourites_store";
import { useCartStore } from "@/Store/use_cart_store";
import SmartImage from "./smart_image";
import { cn } from "@/Lib/utils";
import type { DealCard } from "@/Data/home_data";

/**
 * Renders the product image gallery alongside promotional badges and the favorite toggle button.
 * Interacts directly with the global `useFavoritesStore`.
 * * @param {Object} props - Component props.
 * @param {DealCard} props.item - The product data object.
 * @returns {JSX.Element} The image gallery component.
 */

export function ImageGallery({ item }: { item: DealCard }) {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavoriteGlobal = useFavoritesStore((state) => state.isFavorite(item.title));
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => setIsMounted(true), []);
  const favourite = isMounted ? isFavoriteGlobal : false;

  return (
    <div className="relative flex-1 overflow-hidden rounded-[1.5rem] border border-[#ffffff0f] bg-[linear-gradient(180deg,#3a343a_0%,#241f24_100%)] p-4 shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
      <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
        <span className="rounded-full bg-[#171316E6] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFDEBA]">
          {item.market || "MARKET"}
        </span>
        <span className="rounded-full bg-[#EC5800] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
          {item.discount || "SALE"}
        </span>
      </div>
      
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(item.title);
        }}
        className={cn(
          "absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 active:scale-75",
          favourite
            ? "border border-[#EC5800] bg-[#EC5800] text-white shadow-[0_4px_15px_rgba(236,88,0,0.5)]"
            : "border border-white/20 bg-black/30 text-white/90 backdrop-blur-md hover:bg-black/50 hover:text-white"
        )}
      >
        <div className={cn("transition-transform duration-300", favourite ? "scale-110" : "scale-100")}>
          <HeartBadge filled={favourite} />
        </div>
      </button>

      <div className="mx-auto aspect-square w-full max-w-[450px] overflow-hidden rounded-xl bg-[#1e1a1e] flex items-center justify-center">
        <SmartImage src={item.image} alt={item.title} />
      </div>
    </div>
  );
}

/**
 * Displays the aggregate product rating, star indicators, and a collapsible list of user reviews.
 * * @param {Object} props - Component props.
 * @param {DealCard} props.item - The product data object.
 * @returns {JSX.Element} The reviews section.
 */

export function Reviews({ item }: { item: DealCard }) {
  const [open, setOpen] = useState(true);
  const reviewCards = useMemo(() => [
    { author: "Anna M.", stars: 5, text: `Looks premium and the ${item.discount || "price"} really feels worth it. Great pick for a quick basket.` },
    { author: "Maks K.", stars: 4, text: `Very solid choice. I like the nutrition block and the pack size makes sense for repeat orders.` },
  ], [item.discount]);

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-[1.2rem] border border-[#ffffff0d] bg-[#342e34] p-3.5">
        <div className="rounded-xl border border-[#ffffff10] bg-[#2d282d] p-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#FFDEBA80]">Rating</p>
              <p className="mt-1 text-4xl font-black leading-none text-[#FFDEBA]">{item.rating || "4.9"}</p>
            </div>
            <div className="rounded-full bg-[#EC58001A] px-3 py-1.5 text-[11px] font-semibold text-[#EC5800]">Verified reviews</div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[15px] text-[#EC5800]">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={`hero-star-${index}`}>{index < Math.round(Number(item.rating || 5)) ? "★" : "☆"}</span>
            ))}
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-[#FFDEBAA6]">Loved for strong savings, clear nutrition info, and quick basket decisions.</p>
        </div>
      </div>

      <AccordionBlock label="Recent Reviews" open={open} onToggle={() => setOpen(!open)}>
        <div className="flex flex-col gap-3 pt-2">
          {reviewCards.map((review) => <ReviewCard key={review.author} {...review} />)}
        </div>
      </AccordionBlock>
    </div>
  );
}
/**
 * Renders the primary typography of the product including category, title, current price, and original price.
 * * @param {Object} props - Component props.
 * @param {DealCard} props.item - The product data object.
 * @param {string} props.categoryTitle - The name of the category the product belongs to.
 * @returns {JSX.Element} The header component.
 */

export function ProductHeader({ item, categoryTitle }: { item: DealCard, categoryTitle: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#EC5800]">{categoryTitle}</p>
      <h1 className="mt-2 text-3xl font-black leading-tight text-white lg:text-4xl">{item.title}</h1>
      
      <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-2">
        <p className="text-4xl font-black text-[#EC5800]">{item.price}</p>
        {item.oldPrice && <span className="mb-1.5 text-lg text-white/40 line-through">{item.oldPrice}</span>}
      </div>
      <p className="mt-4 text-[14px] leading-relaxed text-[#FFDEBAA6]">{item.description}</p>
    </div>
  );
}

/**
 * Handles the "Add to Cart" interactions. Parses product quantities (weights vs. pieces) 
 * to provide accurate increment/decrement controls and dispatches actions to the global cart store.
 * * @param {Object} props - Component props.
 * @param {DealCard} props.item - The product data object to add to the cart.
 * @param {string} props.categoryTitle - The category context for display tags.
 * @returns {JSX.Element} The actions component (quantity selectors and add button).
 */

export function ProductActions({ item, categoryTitle }: { item: DealCard, categoryTitle: string }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  
  const parsedQuantity = useMemo(() => {
    const q = (item.quantity || "1 pc").toLowerCase();
    const isWeight = q.includes("g") || q.includes("kg");
    return { isWeight, baseUnit: isWeight ? "g" : "pc", baseValue: 1 };
  }, [item.quantity]);

  const [amount, setAmount] = useState(() => parsedQuantity.isWeight ? (parsedQuantity.baseUnit === "kg" ? parsedQuantity.baseValue * 1000 : parsedQuantity.baseValue) : 1);

  const handleDecrease = () => setAmount((a) => parsedQuantity.isWeight ? Math.max(100, a - 100) : Math.max(1, a - 1));
  const handleIncrease = () => setAmount((a) => parsedQuantity.isWeight ? a + 100 : a + 1);

  const handleAddToCart = () => {
    addItem(item);
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); 
  };

  const amountDisplay = parsedQuantity.isWeight ? (amount >= 1000 ? `${Number((amount / 1000).toFixed(3))} kg` : `${amount} g`) : `${amount} ${amount === 1 ? "pack" : "packs"}`;
  const totalDisplay = parsedQuantity.isWeight ? amountDisplay : `${Math.round(amount * parsedQuantity.baseValue * 1000) / 1000} ${parsedQuantity.baseUnit}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <OptionBlock label="Quantity" content={
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <button type="button" onClick={handleDecrease} disabled={parsedQuantity.isWeight ? amount <= 100 : amount <= 1} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#ffffff12] bg-[#2d282d] text-lg font-semibold text-[#FFDEBA] transition disabled:cursor-not-allowed disabled:opacity-45 hover:border-[#EC5800]">
                −
              </button>
              <div className="flex h-10 w-full items-center justify-center rounded-lg border border-[#ffffff12] bg-[#2d282d] px-4 text-sm font-semibold text-[#FFDEBA]">
                {amountDisplay}
              </div>
              <button type="button" onClick={handleIncrease} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#ffffff12] bg-[#2d282d] text-lg font-semibold text-[#FFDEBA] transition hover:border-[#EC5800]">
                +
              </button>
            </div>
            <p className="text-[11px] font-medium text-[#FFDEBA66]">Total: {totalDisplay}</p>
          </div>
        } />
        <OptionBlock label="Pack info" content={
          <div className="flex flex-wrap gap-2 pt-1">
            <SoftTag>{item.quantity || "1 pc"}</SoftTag>
            <SoftTag>{categoryTitle}</SoftTag>
          </div>
        } />
      </div>
      
      <div className="mt-2">
        <button 
          type="button" 
          onClick={handleAddToCart}
          className={cn(
            "w-full rounded-2xl px-5 py-4 text-[16px] font-bold text-white transition-all duration-300 active:scale-[0.98]",
            added 
              ? "bg-green-500 shadow-[0_8px_20px_rgba(34,197,94,0.3)] hover:shadow-[0_12px_25px_rgba(34,197,94,0.4)]"
              : "bg-[#EC5800] shadow-[0_8px_20px_rgba(236,88,0,0.3)] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_12px_25px_rgba(236,88,0,0.4)]"
          )}
        >
          {added ? "Added! ✓" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

/**
 * Displays detailed, collapsible information blocks including full descriptions, 
 * nutrition facts (calories, macros), and allergen notes.
 * * @param {Object} props - Component props.
 * @param {DealCard} props.item - The product data containing nutrition and allergen info.
 * @param {string} props.categoryTitle - Display name for the category quick fact.
 * @returns {JSX.Element} The detailed accordions section.
 */

export function ProductDetails({ item, categoryTitle }: { item: DealCard, categoryTitle: string }) {
  const [expanded, setExpanded] = useState({ description: true, nutrition: true, details: false });
  const toggle = (key: keyof typeof expanded) => setExpanded(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="flex flex-col gap-3">
      <AccordionBlock label="Description" open={expanded.description} onToggle={() => toggle("description")}>
        <div className="space-y-3 pt-2 text-[13px] leading-relaxed text-[#FFDEBAA6]">
          <p>{item.description}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <QuickFact label="Category" value={categoryTitle} />
            <QuickFact label="Pack" value={item.quantity || "N/A"} />
            <QuickFact label="Price" value={item.price} />
            <QuickFact label="Previous" value={item.oldPrice || "-"} />
          </div>
        </div>
      </AccordionBlock>
      
      <AccordionBlock label="Nutrition" open={expanded.nutrition} onToggle={() => toggle("nutrition")}>
        <div className="grid gap-2 pt-2 sm:grid-cols-2 xl:grid-cols-3">
          <NutrientStat label="Calories" value={item.nutrition?.calories || "-"} accent="#EC5800" />
          <NutrientStat label="Carbs" value={item.nutrition?.carbs || "-"} accent="#f6a35a" />
          <NutrientStat label="Fats" value={item.nutrition?.fats || "-"} accent="#d87b34" />
          <NutrientStat label="Protein" value={item.nutrition?.protein || "-"} accent="#FFDEBA" />
          <NutrientStat label="Fiber" value={item.nutrition?.fiber || "-"} accent="#c18d61" />
          <NutrientStat label="Sugar" value={item.nutrition?.sugar || "-"} accent="#ee9656" />
        </div>
      </AccordionBlock>

      <AccordionBlock label="Details & allergens" open={expanded.details} onToggle={() => toggle("details")}>
        <div className="space-y-3 pt-2 text-[13px] text-[#FFDEBAA6]">
          <DetailLine title="Allergens" values={item.allergens?.length ? item.allergens : ["No major allergens listed"]} />
          <DetailLine title="Notes" values={item.notes?.length ? item.notes : ["No extra notes available"]} />
        </div>
      </AccordionBlock>
    </div>
  );
}


function OptionBlock({ label, content }: { label: string; content: ReactNode }) {
  return (
    <div className="rounded-xl border border-[#ffffff10] bg-[#342e34] p-4 shadow-sm h-full">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#FFDEBA80]">{label}</p>
      <div className="mt-3">{content}</div>
    </div>
  );
}

function SoftTag({ children }: { children: ReactNode }) { 
  return <span className="rounded-full border border-[#ffffff12] bg-[#2d282d] px-2.5 py-1 text-[11px] font-semibold text-[#FFDEBA]">{children}</span>; 
}

function AccordionBlock({ label, open, onToggle, children }: { label: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#ffffff10] bg-[#342e34] shadow-sm">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between px-5 py-3.5 text-left transition hover:bg-white/5">
        <span className="text-[15px] font-bold text-white">{label}</span>
        <span className={cn("text-white transition-transform duration-300", open ? "rotate-180 text-[#EC5800]" : "")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </button>
      <div className={cn("grid transition-all duration-300", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">
          <div className="border-t border-[#ffffff0c] px-5 pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

function QuickFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[#2d282d] px-3 py-2.5">
      <p className="text-[9px] uppercase tracking-[0.24em] text-[#FFDEBA80]">{label}</p>
      <p className="mt-1 text-[13px] font-semibold text-white">{value}</p>
    </div>
  );
}

function NutrientStat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-lg border border-[#ffffff10] bg-[#2d282d] p-3">
      <div className="flex items-center justify-between">
        <p className="text-[9px] uppercase tracking-[0.24em] text-[#FFDEBA80]">{label}</p>
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
      </div>
      <p className="mt-1.5 text-lg font-black text-white">{value}</p>
    </div>
  );
}

function DetailLine({ title, values }: { title: string; values: string[] }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FFDEBA80]">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.map((value) => <span key={`${title}-${value}`} className="rounded-full border border-[#EC580022] bg-[#EC580014] px-2.5 py-1 text-[11px] font-semibold text-[#FFDEBA]">{value}</span>)}
      </div>
    </div>
  );
}

function ReviewCard({ author, stars, text }: { author: string; stars: number; text: string }) {
  return (
    <div className="rounded-lg border border-[#ffffff10] bg-[#2d282d] p-3.5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[13px] font-semibold text-white">{author}</p>
          <div className="mt-0.5 flex items-center gap-0.5 text-[#EC5800] text-[11px]">
            {Array.from({ length: 5 }).map((_, i) => <span key={`${author}-${i}`}>{i < stars ? "★" : "☆"}</span>)}
          </div>
        </div>
        <span className="rounded-full bg-[#EC580014] px-2.5 py-1 text-[10px] font-semibold text-[#EC5800]">Verified</span>
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-[#FFDEBAA6]">{text}</p>
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
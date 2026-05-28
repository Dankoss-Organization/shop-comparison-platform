/**
 * @file ProductCarousel.tsx
 * @description Horizontal product deal carousel with modal or direct link integration.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { DealCard } from "@/Data/home_data";
import DealCardFactory from "@/Components/UI/deal_card";
import { ProductModal } from "@/Components/UI/product_modal";
import { getProductsApi } from "@/Lib/api";

export default function ProductCarousel({
  id,
  eyebrow,
  title,
  description,
  items,
  viewAllLink, 
  directLink = false,
  tab,
  category
}: {
  id?: string; 
  eyebrow: string;
  title: string;
  description: string;
  items: DealCard[];
  viewAllLink?: string;
  directLink?: boolean;
  tab?: "products" | "recipes";
  category?: string;
}) {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<DealCard | null>(null);
  const [categoryTitle, setCategoryTitle] = useState<string>("");

  const lowTitle = title.toLowerCase();
  const lowEyebrow = eyebrow.toLowerCase();
  const isRecipeContext = 
    lowTitle.includes("recipe") || 
    lowEyebrow.includes("recipe") ||
    lowTitle.includes("liking") || 
    lowTitle.includes("liked") || 
    lowTitle.includes("people");

  const targetTab = tab || (isRecipeContext ? "recipes" : "products");

  const getAutoCategory = () => {
    if (category) return category;
    if (lowTitle.includes("liking") || lowTitle.includes("liked") || lowTitle.includes("people")) {
      return "peoples-liking";
    }
    if (lowTitle.includes("seasonal") || lowTitle.includes("expiring")) {
      return "seasonal";
    }
    return "all";
  };

  const handleProductClick = async (item: DealCard) => {
    setSelectedItem(item);
    setCategoryTitle("");
    try {
      const card = await getProductsApi().getProductCard(item.id);
      const cat = card.product.category as any;
      setCategoryTitle(cat?.name ?? String(cat ?? ""));
    } catch {
      setCategoryTitle("");
    }
  };

  const targetCategory = getAutoCategory();
  const finalViewAllLink = viewAllLink || `/catalog?tab=${targetTab}&category=${targetCategory}`;

  return (
    <>
      <section id={id} className="w-full px-4 py-6 md:px-8 lg:px-12 2xl:px-[60px]">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-orange/80">
              {eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black text-text-main md:text-4xl">{title}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-text-main/60">{description}</p>
          </div>
          
          <Link 
            href={finalViewAllLink}
            className="group flex h-11 w-max shrink-0 items-center gap-2 rounded-full border border-glass/15 bg-bg-elevated px-6 text-sm font-semibold text-text-primary shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-orange/50 hover:bg-brand-orange/10 hover:text-brand-orange hover:shadow-[0_8px_20px_rgb(var(--brand-orange)_/_0.15)] active:scale-95"
          >
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>

        <div className="custom-scrollbar flex snap-x snap-mandatory gap-3 md:gap-5 overflow-x-auto px-2 pt-3 pb-6">
          {items.map((item, idx) => (
            <DealCardFactory
              key={`${title}-${item.title}-${idx}`}
              item={item}
              onClick={() => {
                if (directLink) {
                  router.push(`/product/${encodeURIComponent(item.id)}`);
                } else {
                  handleProductClick(item);
                }
              }}
              className="snap-start shrink-0 w-[220px] sm:w-[240px] lg:w-[280px]"
            />
          ))}
        </div>
      </section>

      {!directLink && selectedItem ? (
        <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)}>
          <ProductModal.Window>
            <ProductModal.LeftColumn>
              <ProductModal.ImageGallery />
              <ProductModal.Reviews />
            </ProductModal.LeftColumn>
            <ProductModal.RightColumn>
              <ProductModal.Header categoryTitle={categoryTitle || selectedItem.category || ""} />
              <ProductModal.Actions categoryTitle={categoryTitle || selectedItem.category || ""} />
              <ProductModal.Details categoryTitle={categoryTitle || selectedItem.category || ""} />
            </ProductModal.RightColumn>
          </ProductModal.Window>
        </ProductModal>
      ) : null}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgb(var(--glass-bg) / 0.15); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgb(var(--glass-bg) / 0.25); }
      `}} />
    </>
  );
}
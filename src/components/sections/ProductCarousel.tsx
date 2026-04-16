/**
 * @file ProductCarousel.tsx
 * @brief Horizontal product deal carousel with modal or direct link integration.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { DealCard } from "@/Data/home_data";
import DealCardFactory from "@/Components/ui/DealCard";
import { ProductModal } from "@/Components/ui/ProductModal";

/**
 * @brief Renders a scrollable list of DealCards.
 * Depending on the directLink prop, clicking a card either opens a modal or navigates to the product page.
 * @param {Object} props Component properties.
 * @param {string} [props.id] Optional ID for the section.
 * @param {string} props.eyebrow Over-title text for the carousel section.
 * @param {string} props.title Main title for the carousel section.
 * @param {string} props.description Brief descriptive text.
 * @param {DealCard[]} props.items List of deals to map and render.
 * @param {string} [props.viewAllLink] Optional URL for the "View All" link.
 * @param {boolean} [props.directLink=false] Dictates whether card click routes directly or opens a modal.
 * @returns {JSX.Element} The rendered product carousel section.
 */
export default function ProductCarousel({
  id,
  eyebrow,
  title,
  description,
  items,
  viewAllLink, 
  directLink = false 
}: {
  id?: string; 
  eyebrow: string;
  title: string;
  description: string;
  items: DealCard[];
  viewAllLink?: string;
  directLink?: boolean;
}) {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<DealCard | null>(null);
  const finalViewAllLink = viewAllLink || "/catalog";

  return (
    <>
      <section id={id} className="w-full px-4 py-6 md:px-8 lg:px-12 2xl:px-[60px]">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#EC5800]/80">
              {eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black text-white md:text-4xl">{title}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">{description}</p>
          </div>
          
          <Link 
            href={finalViewAllLink}
            className="group flex h-11 w-max shrink-0 items-center gap-2 rounded-full border border-[#ffffff15] bg-[#342e34] px-6 text-sm font-semibold text-[#FFDEBA] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#EC5800]/50 hover:bg-[#EC5800]/10 hover:text-[#EC5800] hover:shadow-[0_8px_20px_rgba(236,88,0,0.15)] active:scale-95"
          >
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>

        <div className="custom-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pt-3 pb-6">
          {items.map((item, idx) => (
            <DealCardFactory
              key={`${title}-${item.title}-${idx}`}
              item={item}
              onClick={() => {
                if (directLink) {
                  router.push(`/product/${encodeURIComponent(item.title)}`);
                } else {
                  setSelectedItem(item);
                }
              }}
              className="snap-start"
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
              <ProductModal.Header categoryTitle={title} />
              <ProductModal.Actions categoryTitle={title} />
              <ProductModal.Details categoryTitle={title} />
            </ProductModal.RightColumn>
          </ProductModal.Window>
        </ProductModal>
      ) : null}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ffffff15; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ffffff25; }
      `}} />
    </>
  );
}
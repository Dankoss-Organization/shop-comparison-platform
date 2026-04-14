"use client";

import { useState } from "react";
import type { DealCard } from "@/Data/home_data";
import DealCardFactory from "@/Components/ui/DealCard";
import { ProductModal } from "@/Components/ui/ProductModal"; 

export default function ProductCarousel({
  id,
  eyebrow,
  title,
  description,
  items,
}: {
  id?: string; 
  eyebrow: string;
  title: string;
  description: string;
  items: DealCard[];
}) {
  const [selectedItem, setSelectedItem] = useState<DealCard | null>(null);
  
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});
  const setFavourite = (itemTitle: string, value: boolean) => {
    setFavourites((current) => ({ ...current, [itemTitle]: value }));
  };

  return (
    <>
      <section id={id} className="w-full px-4 py-6 md:px-8 lg:px-12 2xl:px-[60px]">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#EC5800]/80">
              {eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black text-white md:text-4xl">{title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/60">{description}</p>
        </div>

        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pt-3 pb-6">
          {items.map((item) => (
            <DealCardFactory
              key={`${title}-${item.title}`}
              item={item}
              onClick={() => setSelectedItem(item)}
              favourite={Boolean(favourites[item.title])}
              onToggleFavourite={(value) => setFavourite(item.title, value)}
              className="snap-start"
            />
          ))}
        </div>
      </section>

      {selectedItem ? (
        <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)}>
          <ProductModal.Window>
            
            <ProductModal.LeftColumn>
              <ProductModal.ImageGallery 
                favourite={Boolean(favourites[selectedItem.title])}
                onToggleFavourite={(val) => setFavourite(selectedItem.title, val)}
              />
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
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #ffffff15; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ffffff25; }
      `}} />
    </>
  );
}
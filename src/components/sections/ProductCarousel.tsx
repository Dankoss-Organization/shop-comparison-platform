"use client";

import { useEffect, useState } from "react";
import type { DealCard } from "@/Data/home_data";
import DealCardView from "@/Components/UI/DealCard";

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

  useEffect(() => {
    if (!selectedItem) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedItem]);

  return (
    <>
      <section id={id} className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-orange/70">
              {eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black text-white md:text-4xl">{title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/62">{description}</p>
        </div>

        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
          {items.map((item) => (
            <DealCardView
              key={`${title}-${item.title}`}
              item={item}
              onClick={() => setSelectedItem(item)}
              className="min-w-[320px] snap-start md:min-w-[360px]"
            />
          ))}
        </div>
      </section>

      {selectedItem ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#120f12]/65 p-4 backdrop-blur-md"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative h-[75vh] w-[75vw] max-w-[1200px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#272126]/95 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-xl text-white transition hover:border-brand-orange/40 hover:bg-brand-orange"
            >
              x
            </button>

            <div className="grid h-full overflow-y-auto lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[320px] overflow-hidden bg-[#1d191d]">
                <img src={selectedItem.image} alt={selectedItem.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#272126] via-transparent to-transparent" />
                <div className="absolute left-6 top-6 flex items-center gap-3">
                  <span className="rounded-full bg-[#201b20]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orangeSoft backdrop-blur-md">
                    {selectedItem.market}
                  </span>
                  <span className="rounded-full bg-brand-orange px-4 py-2 text-xs font-semibold text-white">
                    {selectedItem.discount}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/65">
                      {selectedItem.quantity}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/65">
                      Rating {selectedItem.rating}
                    </span>
                  </div>

                  <h3 className="mt-5 text-4xl font-black text-white">{selectedItem.title}</h3>
                  <p className="mt-4 text-base leading-7 text-white/65">{selectedItem.description}</p>

                  <div className="mt-6 flex items-end gap-4">
                    <p className="text-4xl font-black text-brand-orange">{selectedItem.price}</p>
                    <div className="pb-1 text-sm">
                      <span className="text-white/35 line-through">{selectedItem.oldPrice}</span>
                      <span className="ml-2 text-brand-orangeSoft">{selectedItem.discount}</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-orange/70">
                      Nutrition
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <NutritionTile label="Calories" value={selectedItem.nutrition.calories} />
                      <NutritionTile label="Carbs" value={selectedItem.nutrition.carbs} />
                      <NutritionTile label="Fats" value={selectedItem.nutrition.fats} />
                      <NutritionTile label="Protein" value={selectedItem.nutrition.protein} />
                      <NutritionTile label="Fiber" value={selectedItem.nutrition.fiber} />
                      <NutritionTile label="Sugar" value={selectedItem.nutrition.sugar} />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    type="button"
                    className="rounded-full bg-white px-6 py-3 font-semibold text-brand-night transition hover:bg-brand-orange hover:text-white"
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-white/10 px-6 py-3 font-semibold text-white transition hover:border-brand-orange/40 hover:bg-white/6"
                  >
                    Save to favourites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function NutritionTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">{label}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </div>
  );
}

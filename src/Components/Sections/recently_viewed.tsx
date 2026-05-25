/**
 * @file RecentlyViewed.tsx
 * @description Component displaying recently viewed items using custom SVG panel backgrounds.
 */

"use client";

import { useId, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import DealCardView from "@/Components/UI/deal_card";
import { getProductsApi } from "@/Lib/api/index";
import { mapProductCardToDealCard } from "@/Lib/api/products_api.adapters";
import { peopleLiked, type DealCard } from "@/Data/home_data";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

export default function RecentlyViewed() {
  const [recentProduct, setRecentProduct] = useState<DealCard | null>(null);
  const recentRecipe = peopleLiked?.[0] || null;
  useEffect(() => {
    async function fetchRecentProduct() {
      try {
        const response = await getProductsApi().getProducts({ page: 1, limit: 1 });
        if (response?.items && response.items.length > 0) {
          const cardData = await getProductsApi().getProductCard(response.items[0].id);
          const dealCard = mapProductCardToDealCard(cardData);
          setRecentProduct(dealCard);
        }
      } catch (error) {
        console.error("Не вдалося завантажити продукт для RecentlyViewed:", error);
      }
    }
    fetchRecentProduct();
  }, []);

  return (
    <section className="mx-auto flex w-full justify-center px-2 py-12 sm:px-3 lg:px-4 lg:pb-20 xl:pb-28 overflow-hidden -mb-8 lg:-mb-8">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} 
        className="flex flex-col min-[780px]:flex-row flex-wrap justify-center items-center gap-8 lg:gap-10 xl:gap-12"
      >
        {(recentProduct ?? peopleLiked?.[1]) && (
          <RecentlyViewedPanel item={recentProduct ?? peopleLiked[1]} accent="products" category="all" />
        )}
        
        {recentRecipe && (
          <RecentlyViewedPanel 
            item={recentRecipe} 
            accent="recipes" 
            category="peoples-liking" 
          />
        )}
      </motion.div>
    </section>
  );
}

/**
 * @description Component of one brand panel
 */
export function RecentlyViewedPanel({ 
  item, 
  accent,
  category 
}: { 
  item: DealCard; 
  accent: "products" | "recipes"; 
  category: string;
}) {
  const router = useRouter();
  const rawId = useId();
  const gradientId = "gradient-" + rawId.replace(/:/g, "");

  if (!item) return null;

  return (
    <motion.div 
      variants={panelVariants}
      className="relative h-[180px] w-[310px] sm:h-[205px] sm:w-[367px] md:h-[235px] md:w-[419px] lg:h-[255px] lg:w-[452px] xl:h-[305px] xl:w-[536px] 2xl:h-[380px] 2xl:w-[675px]"
    >
      <div className="absolute left-0 top-0 h-[500px] w-[860px] origin-top-left scale-[0.360] sm:scale-[0.427] md:scale-[0.487] lg:scale-[0.525] xl:scale-[0.623] 2xl:scale-[0.785]">
        <svg
          viewBox="0 0 860 500"
          className="absolute inset-0 h-full w-full [filter:drop-shadow(0px_-2px_5px_rgb(var(--brand-orange)))]"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="30%" y1="0%" x2="100%" y2="100%">
              <stop offset="58%" stopColor="rgb(var(--bg-surface))" stopOpacity="1" />
              <stop offset="92%" stopColor="rgb(var(--brand-orange-dark))" stopOpacity="1" />
              <stop offset="96%" stopColor="rgb(var(--brand-orange-dark))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="rgb(var(--brand-orange))" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M70 248H390C420 248 442 226 442 196V110C442 72 473 42 511 42H774C810 42 836 68 836 104V288C836 324 810 350 774 350H548A42 42 0 0 0 548 436H804C818 436 828 444 828 452C828 461 818 469 804 469H70C38 469 14 445 14 413V314C14 281 38 248 70 248Z"
            fill={`url(#${gradientId})`}
            opacity="0.98"
          />
        </svg>

        <div className="absolute left-[45px] top-[10px] z-10 origin-top-left" style={{ transform: 'scale(1.274)' }}>
          <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
            <DealCardView
              item={item}
              variant="default"
              className="w-[280px] shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer"
              onClick={() => router.push(`/product/${encodeURIComponent(item.id || item.title || "")}`)}
            />
          </motion.div>
        </div>

        <div className="absolute left-[510px] top-[105px] z-10 flex h-[176px] w-[255px] items-center justify-center">
          <h2 className="text-center text-[45px] font-black leading-[1.14] tracking-[-0.03em] text-text-primary">
            Recently<br />viewed<br />
            <span className="text-brand-orange">{accent}</span>
          </h2>
        </div>

        <motion.div 
          className="absolute left-[600px] top-[368px] z-10 flex cursor-pointer items-center"
          whileHover="hover"
          whileTap="tap"
          onClick={() => router.push(`/catalog?tab=${accent}&category=${category}`)}
        >
          <motion.div
            className="flex items-center gap-6"
            variants={{ hover: { x: 12 } }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <span className="text-[27px] font-semibold tracking-[-0.02em] text-text-main">View all</span>
            <motion.button
              type="button"
              aria-label={`Open recently viewed ${accent}`}
              className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-brand-orange text-bg-main shadow-[0_0_14px_rgb(var(--brand-orange)_/_0.45)]"
              variants={{
                hover: { filter: "brightness(1.15)", boxShadow: "0 0 22px rgb(var(--brand-orange) / 0.6)", scale: 1.05 },
                tap: { scale: 0.9 }
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4L16 12L8 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
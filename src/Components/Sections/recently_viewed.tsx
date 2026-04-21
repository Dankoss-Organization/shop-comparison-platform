/**
 * @file RecentlyViewed.tsx
 * @brief Component displaying recently viewed items using custom SVG panel backgrounds.
 * @pattern Framer Motion - Added scroll-triggered entrance animations and spring physics for hover/tap interactions.
 */

"use client";

import { useId } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import DealCardView from "@/Components/UI/deal_card";
import { expiringDiscounts, peopleLiked, type DealCard } from "@/Data/home_data";

const recentDiscount = expiringDiscounts[2];
const recentRecipe = peopleLiked[1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};
/**
 * @brief Main section container for recently viewed panels.
 * @returns {JSX.Element} The rendered recently viewed section.
 */
export default function RecentlyViewed() {
  return (
    <section className="mx-auto flex w-full justify-center px-2 py-12 sm:px-3 lg:px-4">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} 
        className="grid shrink-0 grid-cols-1 justify-items-center gap-8 lg:gap-10 xl:gap-12 min-[1100px]:grid-cols-2"
      >
        <RecentlyViewedPanel item={recentDiscount} accent="discounts" />
        <RecentlyViewedPanel item={recentRecipe} accent="recipes" />
      </motion.div>
    </section>
  );
}

/**
 * @brief Renders an individual recently viewed panel with an SVG mask/background.
 */
export function RecentlyViewedPanel({
  item,
  accent,
}: {
  item: DealCard;
  accent: string;
}) {
  const router = useRouter();
  const rawId = useId();
  const gradientId = "gradient-" + rawId.replace(/:/g, "");

  return (
    <motion.div 
      variants={panelVariants}
      className="relative h-[212px] w-[367px] sm:h-[242px] sm:w-[419px] md:h-[261px] md:w-[452px] lg:h-[282px] lg:w-[487px] xl:h-[335px] xl:w-[579px] 2xl:h-[390px] 2xl:w-[675px]"
    >
      <div className="absolute left-0 top-0 h-[500px] w-[860px] origin-top-left scale-[0.427] sm:scale-[0.487] md:scale-[0.525] lg:scale-[0.566] xl:scale-[0.673] 2xl:scale-[0.785]">
        
        <svg
          viewBox="0 0 860 500"
          className="absolute inset-0 h-full w-full [filter:drop-shadow(0px_-2px_5px_#EC5800)]"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="30%" y1="0%" x2="100%" y2="100%">
              <stop offset="55%" stopColor="#2D282D" stopOpacity="1" />
              <stop offset="82%" stopColor="#6A311D" stopOpacity="1" />
              <stop offset="96%" stopColor="#CC4A0B" stopOpacity="1" />
              <stop offset="100%" stopColor="#EC5800" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M70 248H390C420 248 442 226 442 196V110C442 72 473 42 511 42H774C810 42 836 68 836 104V288C836 324 810 350 774 350H548A42 42 0 0 0 548 436H804C818 436 828 444 828 452C828 461 818 469 804 469H70C38 469 14 445 14 413V314C14 281 38 248 70 248Z"
            fill={`url(#${gradientId})`}
            opacity="0.98"
          />
        </svg>

        <div 
          className="absolute left-[45px] top-[10px] z-10 origin-top-left"
          style={{ transform: 'scale(1.274)' }}
        >
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }} 
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <DealCardView
              item={item}
              variant="default"
              className="w-[280px] shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer"
              onClick={() => router.push(`/product/${encodeURIComponent(item.title)}`)}
            />
          </motion.div>
        </div>

        <div className="absolute left-[510px] top-[105px] z-10 flex h-[176px] w-[255px] items-center justify-center">
          <h2 className="text-center text-[45px] font-black leading-[1.14] tracking-[-0.03em] text-[#ffdeba]">
            Recently<br />viewed<br />
            <span className="text-[#EC5800]">{accent}</span>
          </h2>
        </div>

        <motion.div 
          className="absolute left-[600px] top-[368px] z-10 flex cursor-pointer items-center"
          whileHover="hover"
          whileTap="tap"
        >
          <motion.div
            className="flex items-center gap-6"
            variants={{ hover: { x: 12 } }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <span className="text-[27px] font-semibold tracking-[-0.02em] text-white/95">
              View all
            </span>
            
            <motion.button
              type="button"
              aria-label={`Open recently viewed ${accent}`}
              className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-[#EC5800] text-white shadow-[0_0_14px_rgba(236,88,0,0.45)]"
              variants={{
                hover: { 
                  backgroundColor: "#ff6a0d",
                  boxShadow: "0 0 22px rgba(236,88,0,0.6)",
                  scale: 1.05 
                },
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
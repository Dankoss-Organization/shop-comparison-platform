import { useId } from "react";
import DealCardView from "@/Components/ui/DealCard";
import { expiringDiscounts, peopleLiked, type DealCard } from "@/Data/home_data";

const recentDiscount = expiringDiscounts[2];
const recentRecipe = peopleLiked[1];

export default function RecentlyViewed() {
  return (
    <section className="mx-auto flex w-full justify-center px-2 py-12 sm:px-3 lg:px-4">
      <div className="grid shrink-0 grid-cols-1 justify-items-center gap-8 lg:gap-10 xl:gap-12 min-[1100px]:grid-cols-2">
        <RecentlyViewedPanel item={recentDiscount} accent="знижки" />
        <RecentlyViewedPanel item={recentRecipe} accent="рецепти" />
      </div>
    </section>
  );
}

function RecentlyViewedPanel({
  item,
  accent,
}: {
  item: DealCard;
  accent: string;
}) {
  const gradientId = useId();

  return (
    <div className="relative h-[212px] w-[367px] sm:h-[242px] sm:w-[419px] md:h-[261px] md:w-[452px] lg:h-[282px] lg:w-[487px] xl:h-[335px] xl:w-[579px] 2xl:h-[390px] 2xl:w-[675px]">
      <div className="absolute left-0 top-0 h-[500px] w-[860px] origin-top-left scale-[0.427] sm:scale-[0.487] md:scale-[0.525] lg:scale-[0.566] xl:scale-[0.673] 2xl:scale-[0.785]">
        <svg
          viewBox="0 0 860 500"
          className="absolute inset-0 h-full w-full [filter:drop-shadow(0px_-2px_5px_#EC5800)]"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="30%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
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

        <div className="absolute left-[48px] top-[40px] z-10 h-[400px] w-[360px]">
          <DealCardView
            item={item}
            variant="recent"
            className="h-full w-full rounded-2xl border-2 border-white/10 shadow-[0_15px_15px_-15px_rgba(0.5,0,0,0.7)]"
          />
        </div>

        <div className="absolute left-[510px] top-[105px] z-10 flex h-[176px] w-[255px] items-center justify-center">
          <h2 className="text-center text-[45px] font-black leading-[1.14] tracking-[-0.03em] text-[#ffdeba]">
            Нещодавно
            <br />
            переглянуті
            <br />
            <span className="text-[#EC5800]">{accent}</span>
          </h2>
        </div>

        <div className="absolute left-[530px] top-[368px] z-10 flex w-[280px] items-center justify-between">
          <span className="text-[27px] font-semibold tracking-[-0.02em] text-white/95">
            Переглянути всі
          </span>
          <button
            type="button"
            aria-label={`Open recently viewed ${accent}`}
            className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full border border-[#ffb37a]/40 bg-[#EC5800] text-white shadow-[0_0_14px_rgba(236,88,0,0.45)] transition-transform duration-300 hover:scale-105 hover:bg-[#ff6a0d] hover:shadow-[0_0_18px_rgba(236,88,0,0.58)]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 4L16 12L8 20"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import type { DealCard } from "@/Data/home_data";

export default function Hero({ featured: _featured }: { featured: DealCard[] }) {
  return (
    <div className="grid gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <div>
        <p className="inline-flex rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-orangeSoft">
          Dark storefront experience
        </p>
        <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight text-white md:text-6xl">
          Products, discounts, recipes, and store price comparison in one bold DANKOSS landing page.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
          The header now follows your real brand language more closely, while the cards are more practical for shopping with photos, ratings, discounts, quantity, favorites, and add-to-cart actions.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#discounts-week" className="rounded-full bg-brand-orange px-6 py-3 font-semibold text-white transition hover:bg-brand-orangeSoft hover:text-brand-night">
            Explore discounts
          </a>
          <a href="#recipes-season" className="rounded-full border border-white/12 px-6 py-3 font-semibold text-white transition hover:bg-white/8">
            Discover recipes
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#contact" className="inline-flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/6 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
            <Image src="/google_play_icon.svg" alt="Google Play" width={150} height={150} />
          </a>
          <a href="#contact" className="inline-flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/6 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
            <Image src="/apple_store_icon.svg" alt="Apple Store" width={150} height={150} />
          </a>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[2.4rem] border border-brand-orange/20 bg-[linear-gradient(145deg,rgba(236,88,0,0.18),rgba(255,255,255,0.04))] p-5 shadow-soft">
        <div className="absolute left-2 top-10 h-36 w-36 rounded-full bg-brand-orange/30 blur-3xl" />
        <div className="absolute bottom-4 right-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <div className="relative rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(52,46,52,0.92),rgba(35,31,35,0.88))] p-6 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-white/55">Smart cart preview</p>
              <h2 className="mt-2 text-3xl font-black text-white">All your best picks in one place</h2>
            </div>
            <span className="rounded-full bg-brand-orange px-3 py-1 text-sm font-semibold text-white">
              Updated now
            </span>
          </div>

          <div className="relative mt-8 overflow-hidden rounded-[1.8rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(236,88,0,0.18),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-2 pb-0 pt-4">
            <div className="pointer-events-none absolute inset-x-10 bottom-2 h-12 rounded-full bg-brand-orange/25 blur-2xl" />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-28 bg-[linear-gradient(90deg,rgba(38,33,38,0.96)_0%,rgba(38,33,38,0.8)_34%,rgba(38,33,38,0.32)_72%,transparent_100%)]" />
            <div className="pointer-events-none absolute inset-y-6 left-10 z-20 w-16 rounded-full bg-[#2f292f]/70 blur-2xl" />
            <Image
              src="/cart_hero.svg"
              alt="Cart hero"
              width={620}
              height={620}
              priority
              className="relative z-10 ml-auto h-auto w-[118%] max-w-none translate-x-[8%] drop-shadow-[0_32px_56px_rgba(0,0,0,0.38)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
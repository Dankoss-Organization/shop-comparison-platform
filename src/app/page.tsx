import Header from "@/Components/Layout/Header";
import Footer from "@/Components/Layout/Footer";
import Banner from "@/Components/Sections/Banner";
import Hero from "@/Components/Sections/Hero";
import Newsletter from "@/Components/Sections/Newsletter";
import ProductCarousel from "@/Components/Sections/ProductCarousel";
import RecentlyViewed from "@/Components/Sections/RecentlyViewed";
import StoreNav from "@/Components/Sections/StoreNav";
import { CartDrawer } from "@/Components/cart/CartDrawer"; 

import {
  dailyDiscounts,
  expiringDiscounts,
  peopleLiked,
  recentItems,
  seasonalRecipes,
  weekDiscounts,
} from "@/Data/home_data";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-night text-white">
      <CartDrawer />
      <Header />
      <section className="relative overflow-x-hidden overflow-y-visible border-b border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(236,88,0,0.22),transparent_28%),radial-gradient(circle_at_right,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,#2d282d_0%,#231f23_100%)]">
      
      <div>
          <StoreNav />
      </div>
      <div className="w-full pb-8 md:px-8 lg:px-12 2xl:px-[60px]">
        <Hero featured={weekDiscounts.slice(0, 3)} />
      </div>
  </section>

      <Banner
        eyebrow="Banner"
        title="Compare what matters first: weekly hits, expiring discounts, and the recipes people actually want to cook."
        cta="Open app"
        href="#contact"
      />

      <ProductCarousel
        id="discounts-week"
        eyebrow="Discount Rows"
        title="Discounts of the week"
        description="Each card carries the details shoppers usually need before adding something to cart: photo, favorite action, price, old price, discount, rating, description, quantity, and market."
        items={weekDiscounts}
      />
      <ProductCarousel
        id="discounts-all"
        eyebrow="Discount Rows"
        title="Just discounts"
        description="A practical row for users who want to browse broad offers without filtering too aggressively."
        items={dailyDiscounts}
      />
      <ProductCarousel
        id="discounts-expire"
        eyebrow="Discount Rows"
        title="Discounts that may expire soon"
        description="Time-sensitive offers are grouped here so urgency stays visible and useful rather than buried."
        items={expiringDiscounts}
      />

      <Banner
        eyebrow="Recipe Banner"
        title="From seasonal ingredients to crowd favorites, recipe cards now feel like practical shopping objects instead of static editorial blocks."
        cta="See recipes"
        href="#recipes-season"
        dark
      />

      <ProductCarousel
        id="recipes-season"
        eyebrow="Recipe Rows"
        title="Season recipies"
        description="The recipe cards use the same visual system as the products, so browsing stays consistent across the page."
        items={seasonalRecipes}
      />
      <ProductCarousel
        id="recipes-liked"
        eyebrow="Recipe Rows"
        title="People's liking"
        description="This row highlights the recipes users revisit, save, and respond to most often."
        items={peopleLiked}
      />

      <RecentlyViewed/>
      <Newsletter />
      <Footer />
    </main>
  );
}

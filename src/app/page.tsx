/**
 * @file page.tsx  (app/page.tsx — Home)
 * @description Home page.  React Server Component — all product data is fetched
 * directly from the backend API at request time.  No mock data is used for products.
 * Recipe carousels keep static data until a dedicated /api/v1/recipes endpoint exists.
 */

import Header from "@/Components/Layout/header";
import Footer from "@/Components/Layout/footer";
import Banner from "@/Components/Sections/banner";
import Hero from "@/Components/Sections/hero";
import Newsletter from "@/Components/Sections/newsletter";
import ProductCarousel from "@/Components/Sections/product_carousel";
import RecentlyViewed from "@/Components/Sections/recently_viewed";
import StoreNav from "@/Components/Sections/store_nav";

import { seasonalRecipes, peopleLiked } from "@/Data/home_data";
import type { DealCard } from "@/Data/home_data";
import { mapProductCardToDealCard } from "@/Lib/api/products_api.adapters";

import { ProductsApiClient } from "@/Lib/api/products_api.client";
import { getApiBaseUrl } from "@/Lib/api/index";

const serverProductsApi = new ProductsApiClient({
  baseUrl: getApiBaseUrl(),
  fetchImpl: (input, init) => fetch(input, { ...init, next: { revalidate: 60 } })
});

/**
 * Fetch one page of the product catalog and convert it to DealCard UI models.
 * Returns [] on any error so the page always renders even when the API is down.
 */
async function fetchProductSlice(options: {
  page: number;
  limit: number;
  sort?: "updated" | "name";
  inStock?: boolean;
}): Promise<DealCard[]> {
  try {
    const data = await serverProductsApi.getProducts(options);
    
    const cards = await Promise.allSettled(
      data.items.map((item) => serverProductsApi.getProductCard(item.productId))
    );

    return cards
      .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
      .map((r) => mapProductCardToDealCard(r.value));
  } catch (err) {
    console.error("[Home] fetchProductSlice error:", err);
    return [];
  }
}

export default async function Home() {
  const [weekDiscounts, dailyDiscounts, expiringDiscounts] = await Promise.all([
    fetchProductSlice({ page: 1, limit: 12, sort: "updated", inStock: true }),
    fetchProductSlice({ page: 2, limit: 12, sort: "updated", inStock: true }),
    fetchProductSlice({ page: 3, limit: 12, sort: "updated", inStock: true }),
  ]);

  return (
    <main className="min-h-screen bg-bg-main text-text-main transition-colors duration-300">
      <Header />

      <section
        className="relative overflow-x-hidden overflow-y-visible border-b border-text-main/5 dark:border-white/5 transition-colors duration-300"
        style={{
          backgroundImage: `
            radial-gradient(circle at top left, rgb(var(--brand-orange) / 0.15), transparent 28%),
            radial-gradient(circle at right, rgb(var(--text-main) / 0.05), transparent 22%),
            linear-gradient(180deg, rgb(var(--bg-main)) 0%, rgb(var(--bg-darker)) 100%)
          `,
        }}
      >
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

      <RecentlyViewed />
      <Newsletter />
      <Footer />
    </main>
  );
}
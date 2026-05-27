/**
 * @file home_data.ts
 * @description Type definitions and static data for the application.
 * Product data is fetched from the real API. Recipe data remains static.
 */

export type NutritionFacts = {
  calories: string;
  carbs: string;
  fats: string;
  protein: string;
  fiber: string;
  sugar: string;
};

export type StoreOffer = {
  store_id: string;
  store_name: string;
  store_city?: string;
  store_address?: string;
  is_in_stock: boolean;
  offerId?: string;
  pricing: {
    current_price: number;
    regular_price: number;
    discount_percent: number;
  };
};

export type DealCard = {
  id: string;
  internalId?: string;
  title: string;
  detailsLine?: string;
  image: string;
  rating: string;
  description: string;
  descriptionSections?: string[];
  quantity: string;
  nutrition: NutritionFacts;
  allergens?: string[];
  notes?: string[];
  offers: StoreOffer[];
  brand?: string;
  category?: string;
  currency?: string;
  availabilityStatus?: "in_stock" | "out_of_stock";
  pricingSummary?: {
    bestPrice: number | null;
    oldPrice: number | null;
    discountPercent: number | null;
  };
  stats?: {
    priceTrend: "up" | "down" | "stable";
    minPrice30d: number | null;
    maxPrice30d: number | null;
    avgPrice30d: number | null;
  };
};

export function makeNutrition(
  calories: string,
  carbs: string,
  fats: string,
  protein: string,
  fiber: string,
  sugar: string,
): NutritionFacts {
  return { calories, carbs, fats, protein, fiber, sugar };
}

export const seasonalRecipes: DealCard[] = [
  {
    id: "rec_citrusbowl_19",
    title: "Spring Citrus Bowl",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    rating: "4.9",
    description: "A light seasonal bowl assembled around discounted greens, oranges, and soft cheese.",
    quantity: "2 servings",
    nutrition: makeNutrition("290 kcal", "24 g", "15 g", "14 g", "6 g", "10 g"),
    allergens: ["Milk"],
    notes: ["Fresh seasonal recipe", "Serve chilled"],
    offers: [
      { store_id: "s_silpo", store_name: "Silpo", is_in_stock: true, pricing: { current_price: 7.20, regular_price: 9.10, discount_percent: 21 } },
      { store_id: "s_novus", store_name: "Novus", is_in_stock: true, pricing: { current_price: 7.50, regular_price: 9.10, discount_percent: 17 } },
    ],
  },
  {
    id: "rec_roast_20",
    title: "Roasted Market Tray",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    rating: "4.7",
    description: "An easy oven tray recipe based on seasonal vegetables with current discounts.",
    quantity: "3 servings",
    nutrition: makeNutrition("245 kcal", "28 g", "10 g", "8 g", "7 g", "9 g"),
    allergens: [],
    notes: ["Family-friendly", "Oven-ready"],
    offers: [
      { store_id: "s_fora", store_name: "Fora", is_in_stock: true, pricing: { current_price: 6.50, regular_price: 8.00, discount_percent: 19 } },
      { store_id: "s_atb", store_name: "ATB", is_in_stock: true, pricing: { current_price: 6.80, regular_price: 8.20, discount_percent: 17 } },
    ],
  },
  {
    id: "rec_pasta_21",
    title: "Creamy Pasta Night",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
    rating: "4.8",
    description: "Comfort pasta using discounted pantry goods and crowd-approved flavor balance.",
    quantity: "4 servings",
    nutrition: makeNutrition("410 kcal", "52 g", "14 g", "16 g", "4 g", "6 g"),
    allergens: ["Gluten", "Milk"],
    notes: ["Dinner favorite", "Creamy texture"],
    offers: [
      { store_id: "s_novus", store_name: "Novus", is_in_stock: true, pricing: { current_price: 5.90, regular_price: 7.40, discount_percent: 20 } },
      { store_id: "s_silpo", store_name: "Silpo", is_in_stock: true, pricing: { current_price: 6.10, regular_price: 7.50, discount_percent: 18 } },
    ],
  },
  {
    id: "rec_nachos_22",
    title: "Game Day Loaded Nachos",
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=900&q=80",
    rating: "4.9",
    description: "The ultimate sharing platter. Built with discounted cheese, jalapeños, and ground beef.",
    quantity: "4 servings",
    nutrition: makeNutrition("520 kcal", "45 g", "28 g", "22 g", "8 g", "4 g"),
    allergens: ["Milk", "Gluten"],
    notes: ["Best served hot", "Spicy"],
    offers: [
      { store_id: "s_silpo", store_name: "Silpo", is_in_stock: true, pricing: { current_price: 8.50, regular_price: 10.20, discount_percent: 16 } },
    ],
  },
  {
    id: "rec_smoothie_23",
    title: "Power Berry Smoothie",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80",
    rating: "4.7",
    description: "A quick, cold blended drink using today's discounts on frozen berries and greek yogurt.",
    quantity: "2 portions",
    nutrition: makeNutrition("210 kcal", "32 g", "4 g", "12 g", "5 g", "18 g"),
    allergens: ["Milk"],
    notes: ["Blend with ice", "High antioxidants"],
    offers: [
      { store_id: "s_atb", store_name: "ATB", is_in_stock: true, pricing: { current_price: 4.10, regular_price: 5.50, discount_percent: 25 } },
    ],
  },
];

export const peopleLiked: DealCard[] = [
  {
    id: "rec_wrap_24",
    title: "Honey Chicken Wrap",
    image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=900&q=80",
    rating: "4.9",
    description: "A fan-favorite recipe that turns a chicken promo into a practical lunch option.",
    quantity: "2 wraps",
    nutrition: makeNutrition("360 kcal", "31 g", "12 g", "28 g", "4 g", "7 g"),
    allergens: ["Gluten"],
    notes: ["Lunch-friendly", "Portable meal"],
    offers: [
      { store_id: "s_atb", store_name: "ATB", is_in_stock: true, pricing: { current_price: 5.10, regular_price: 6.45, discount_percent: 21 } },
    ],
  },
  {
    id: "rec_toast_25",
    title: "Mushroom Toast Stack",
    image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?auto=format&fit=crop&w=900&q=80",
    rating: "4.8",
    description: "A heavily saved comfort dish built from bread, mushrooms, herbs, and soft cheese.",
    quantity: "2 portions",
    nutrition: makeNutrition("275 kcal", "22 g", "14 g", "13 g", "3 g", "4 g"),
    allergens: ["Gluten", "Milk"],
    notes: ["Comfort dish", "Pairs well with salad"],
    offers: [
      { store_id: "s_silpo", store_name: "Silpo", is_in_stock: true, pricing: { current_price: 4.20, regular_price: 5.20, discount_percent: 19 } },
    ],
  },
  {
    id: "rec_salmonplate_26",
    title: "Salmon Rice Plate",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
    rating: "5.0",
    description: "A premium-feeling dinner recipe users revisit when salmon and rice deals line up.",
    quantity: "2 servings",
    nutrition: makeNutrition("430 kcal", "34 g", "17 g", "32 g", "2 g", "5 g"),
    allergens: ["Fish", "Soy"],
    notes: ["Dinner centerpiece", "High protein"],
    offers: [
      { store_id: "s_varus", store_name: "Varus", is_in_stock: true, pricing: { current_price: 9.40, regular_price: 12.20, discount_percent: 23 } },
    ],
  },
  {
    id: "rec_meatballs_27",
    title: "Lean Turkey Meatballs",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80",
    rating: "4.8",
    description: "A heavily bookmarked recipe. Lean protein paired with a rich tomato basil sauce.",
    quantity: "3 servings",
    nutrition: makeNutrition("320 kcal", "12 g", "14 g", "35 g", "3 g", "4 g"),
    allergens: ["Eggs", "Gluten"],
    notes: ["Freezer friendly", "Great for meal prep"],
    offers: [
      { store_id: "s_novus", store_name: "Novus", is_in_stock: true, pricing: { current_price: 6.80, regular_price: 8.50, discount_percent: 20 } },
    ],
  },
  {
    id: "rec_oatbites_28",
    title: "Energy Oat Bites",
    image: "https://images.unsplash.com/photo-1605092683936-cecb8c7512bc?auto=format&fit=crop&w=900&q=80",
    rating: "4.9",
    description: "No-bake treats that users love keeping in the fridge for a quick bite before running out.",
    quantity: "12 bites",
    nutrition: makeNutrition("140 kcal", "18 g", "7 g", "4 g", "2 g", "8 g"),
    allergens: ["Peanuts", "Gluten"],
    notes: ["No-bake", "Keep refrigerated"],
    offers: [
      { store_id: "s_fora", store_name: "Fora", is_in_stock: true, pricing: { current_price: 3.50, regular_price: 4.40, discount_percent: 20 } },
    ],
  },
];

export const recentItems = [
  { title: "Coffee Beans Discount", type: "Viewed discount", detail: "ATB | 1 hour ago" },
  { title: "Budget Green Bowl",     type: "Viewed recipe",   detail: "Recipe | 3 hours ago" },
  { title: "Olive Oil Promo",       type: "Viewed discount", detail: "Novus | Yesterday" },
  { title: "Salmon Rice Plate",     type: "Viewed recipe",   detail: "Recipe | Yesterday" },
];

export const weekDiscounts: DealCard[] = [];
export const dailyDiscounts: DealCard[] = [];
export const expiringDiscounts: DealCard[] = [];
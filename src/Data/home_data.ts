export type NutritionFacts = {
  calories: string;
  carbs: string;
  fats: string;
  protein: string;
  fiber: string;
  sugar: string;
};

export type DealCard = {
  title: string;
  image: string;
  market: string;
  price: string;
  oldPrice: string;
  discount: string;
  rating: string;
  description: string;
  quantity: string;
  nutrition: NutritionFacts;
};

function makeNutrition(
  calories: string,
  carbs: string,
  fats: string,
  protein: string,
  fiber: string,
  sugar: string,
): NutritionFacts {
  return { calories, carbs, fats, protein, fiber, sugar };
}

export const weekDiscounts: DealCard[] = [
  {
    title: "Salmon Steak",
    image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=900&q=80",
    market: "Silpo",
    price: "$8.49",
    oldPrice: "$12.50",
    discount: "-32%",
    rating: "4.8",
    description: "Fresh chilled salmon with a strong weekly drop and premium dinner value.",
    quantity: "2 pcs",
    nutrition: makeNutrition("208 kcal", "0 g", "13 g", "20 g", "0 g", "0 g"),
  },
  {
    title: "Barilla Pasta",
    image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=900&q=80",
    market: "Novus",
    price: "$1.79",
    oldPrice: "$2.19",
    discount: "-18%",
    rating: "4.7",
    description: "A pantry staple that works well for budget recipes and quick weekday meals.",
    quantity: "500 g",
    nutrition: makeNutrition("371 kcal", "75 g", "1.5 g", "13 g", "3 g", "3 g"),
  },
  {
    title: "Cream Cheese",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
    market: "Fora",
    price: "$2.95",
    oldPrice: "$3.74",
    discount: "-21%",
    rating: "4.6",
    description: "Smooth breakfast spread with a visible discount and high shopper save rate.",
    quantity: "2 pcs",
    nutrition: makeNutrition("342 kcal", "6 g", "34 g", "6 g", "0 g", "4 g"),
  },
  {
    title: "Nescafe Gold",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    market: "ATB",
    price: "$4.20",
    oldPrice: "$5.60",
    discount: "-25%",
    rating: "4.9",
    description: "Popular instant coffee deal with dependable savings and high return demand.",
    quantity: "190 g",
    nutrition: makeNutrition("352 kcal", "74 g", "0.2 g", "7 g", "0 g", "2 g"),
  },
];

export const dailyDiscounts: DealCard[] = [
  {
    title: "Greek Yogurt",
    image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?auto=format&fit=crop&w=900&q=80",
    market: "Varus",
    price: "$2.10",
    oldPrice: "$2.65",
    discount: "-21%",
    rating: "4.5",
    description: "Protein-rich yogurt that is practical for breakfasts, bowls, and sauces.",
    quantity: "850 g",
    nutrition: makeNutrition("97 kcal", "4 g", "5 g", "9 g", "0 g", "4 g"),
  },
  {
    title: "Cherry Tomatoes",
    image: "https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80",
    market: "Silpo",
    price: "$1.35",
    oldPrice: "$1.80",
    discount: "-25%",
    rating: "4.4",
    description: "Sweet and bright tomatoes that push recipe conversions when they go on sale.",
    quantity: "500 g",
    nutrition: makeNutrition("18 kcal", "3.9 g", "0.2 g", "0.9 g", "1.2 g", "2.6 g"),
  },
  {
    title: "Olive Oil",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80",
    market: "Novus",
    price: "$6.50",
    oldPrice: "$8.10",
    discount: "-20%",
    rating: "4.7",
    description: "Premium kitchen item with enough savings to shift users toward a better brand.",
    quantity: "1 bottle",
    nutrition: makeNutrition("119 kcal", "0 g", "13.5 g", "0 g", "0 g", "0 g"),
  },
  {
    title: "Chicken Fillet",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=900&q=80",
    market: "ATB",
    price: "$4.80",
    oldPrice: "$6.00",
    discount: "-20%",
    rating: "4.6",
    description: "Reliable protein offer that supports quick dinner planning and bulk shopping.",
    quantity: "1 kg",
    nutrition: makeNutrition("120 kcal", "0 g", "2.6 g", "22.5 g", "0 g", "0 g"),
  },
];

export const expiringDiscounts: DealCard[] = [
  {
    title: "Avocado Duo",
    image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&w=900&q=80",
    market: "Fora",
    price: "$2.60",
    oldPrice: "$3.20",
    discount: "-19%",
    rating: "4.5",
    description: "Fresh produce offer ending soon and perfect for salads, bowls, and toast.",
    quantity: "2 pcs",
    nutrition: makeNutrition("160 kcal", "8.5 g", "14.7 g", "2 g", "6.7 g", "0.7 g"),
  },
  {
    title: "Orange Juice",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80",
    market: "Varus",
    price: "$1.95",
    oldPrice: "$2.45",
    discount: "-20%",
    rating: "4.3",
    description: "A quick-moving family drink discount with only a short promo window left.",
    quantity: "1 L",
    nutrition: makeNutrition("45 kcal", "10.4 g", "0.2 g", "0.7 g", "0.2 g", "8.4 g"),
  },
  {
    title: "Dark Chocolate",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=80",
    market: "Silpo",
    price: "$1.40",
    oldPrice: "$1.90",
    discount: "-26%",
    rating: "4.8",
    description: "Popular snack discount with strong rating and a very visible price cut.",
    quantity: "100 g",
    nutrition: makeNutrition("546 kcal", "61 g", "31 g", "4.9 g", "7 g", "48 g"),
  },
  {
    title: "Rice Pack",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
    market: "Novus",
    price: "$1.25",
    oldPrice: "$1.59",
    discount: "-21%",
    rating: "4.4",
    description: "Last-day staple discount that pairs naturally with many weekly recipes.",
    quantity: "800 g",
    nutrition: makeNutrition("360 kcal", "79 g", "0.6 g", "6.7 g", "1.3 g", "0.1 g"),
  },
];

export const seasonalRecipes: DealCard[] = [
  {
    title: "Spring Citrus Bowl",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    market: "Silpo",
    price: "$7.20",
    oldPrice: "$9.10",
    discount: "-21%",
    rating: "4.9",
    description: "A light seasonal bowl assembled around discounted greens, oranges, and soft cheese.",
    quantity: "2 servings",
    nutrition: makeNutrition("290 kcal", "24 g", "15 g", "14 g", "6 g", "10 g"),
  },
  {
    title: "Roasted Market Tray",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    market: "Fora",
    price: "$6.50",
    oldPrice: "$8.00",
    discount: "-19%",
    rating: "4.7",
    description: "An easy oven tray recipe based on seasonal vegetables with current discounts.",
    quantity: "3 servings",
    nutrition: makeNutrition("245 kcal", "28 g", "10 g", "8 g", "7 g", "9 g"),
  },
  {
    title: "Creamy Pasta Night",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
    market: "Novus",
    price: "$5.90",
    oldPrice: "$7.40",
    discount: "-20%",
    rating: "4.8",
    description: "Comfort pasta using discounted pantry goods and crowd-approved flavor balance.",
    quantity: "4 servings",
    nutrition: makeNutrition("410 kcal", "52 g", "14 g", "16 g", "4 g", "6 g"),
  },
];

export const peopleLiked: DealCard[] = [
  {
    title: "Honey Chicken Wrap",
    image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=900&q=80",
    market: "ATB",
    price: "$5.10",
    oldPrice: "$6.45",
    discount: "-21%",
    rating: "4.9",
    description: "A fan-favorite recipe that turns a chicken promo into a practical lunch option.",
    quantity: "2 wraps",
    nutrition: makeNutrition("360 kcal", "31 g", "12 g", "28 g", "4 g", "7 g"),
  },
  {
    title: "Mushroom Toast Stack",
    image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?auto=format&fit=crop&w=900&q=80",
    market: "Silpo",
    price: "$4.20",
    oldPrice: "$5.20",
    discount: "-19%",
    rating: "4.8",
    description: "A highly saved comfort dish built from bread, mushrooms, herbs, and soft cheese.",
    quantity: "2 portions",
    nutrition: makeNutrition("275 kcal", "22 g", "14 g", "13 g", "3 g", "4 g"),
  },
  {
    title: "Salmon Rice Plate",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80",
    market: "Varus",
    price: "$9.40",
    oldPrice: "$12.20",
    discount: "-23%",
    rating: "5.0",
    description: "A premium-feeling dinner recipe users revisit when salmon and rice deals line up.",
    quantity: "2 servings",
    nutrition: makeNutrition("430 kcal", "34 g", "17 g", "32 g", "2 g", "5 g"),
  },
];

export const recentItems = [
  { title: "Coffee Beans Discount", type: "Viewed discount", detail: "ATB | 1 hour ago" },
  { title: "Budget Green Bowl", type: "Viewed recipe", detail: "Recipe | 3 hours ago" },
  { title: "Olive Oil Promo", type: "Viewed discount", detail: "Novus | Yesterday" },
  { title: "Salmon Rice Plate", type: "Viewed recipe", detail: "Recipe | Yesterday" },
];

export interface SubItem {
  name: string;
  href?: string;
}

export interface SubCategory {
  name: string;
  image?: string; 
  items?: SubItem[];
}

export interface Category {
  name: string;
  subcategories: SubCategory[];
}

export const categories: Category[] = [
  {
    name: "Products",
    subcategories: [
      { 
        name: "Fruits and vegetables",
        image: "/fruit-bg.jpg",
        items: [
          { name: "Apples & Pears" },
          { name: "Citrus fruits" },
          { name: "Berries" },
          { name: "Tomatoes & Cucumbers" },
          { name: "Potatoes & Carrots" },
          { name: "Fresh herbs" }
        ]
      },
      { 
        name: "Meat and fish",
        image: "/salmon.jpg",
        items: [
          { name: "Chicken & Poultry" },
          { name: "Beef & Veal" },
          { name: "Pork" },
          { name: "Fresh fish" },
          { name: "Seafood & Shrimp" }
        ]
      },
      { 
        name: "Dairy",
        image: "/dairy-bg.jpg",
        items: [
          { name: "Milk & Cream" },
          { name: "Hard cheeses" },
          { name: "Yogurts & Kefir" },
          { name: "Butter & Margarine" }
        ]
      },
      { 
        name: "Bakery",
        image: "/bakery-bg.jpg",
        items: [
          { name: "Fresh bread" },
          { name: "Croissants & Pastries" },
          { name: "Cakes" },
          { name: "Buns & Rolls" }
        ]
      },
      {
        name: "Shop by Values",
        image: "/eco-bg.jpg",
        items: [
          { name: "100% Organic" },
          { name: "Local Farmers" },
          { name: "Gluten-Free" },
          { name: "Sugar-Free" }
        ]
      }
    ],
  },
  {
    name: "Discounts",
    subcategories: [
      { name: "Weekly offers" },
      { name: "Hot deals" },
      { name: "Ending soon" },
      { name: "Family packs" },
    ],
  },
  {
    name: "Recipes",
    subcategories: [
      { 
        name: "Seasonal",
        image: "/salad-bg.jpg",
        items: [
          { name: "Spring Salads" },
          { name: "Easter Baking" },
          { name: "Fresh Greens" },
          { name: "Cold Soups" }
        ]
      },
      { 
        name: "Quick & Easy",
        image: "/pasta-bg.jpg",
        items: [
          { name: "15-Min Pasta" },
          { name: "One-Pan Meals" },
          { name: "Toast Stacks" },
          { name: "No-Bake Snacks" }
        ]
      },
      { 
        name: "Healthy Living",
        image: "/smoothie-bg.jpg",
        items: [
          { name: "High Protein" },
          { name: "Low Carb" },
          { name: "Smoothies" },
          { name: "Keto Friendly" }
        ]
      },
      { 
        name: "Treat Yourself",
        image: "/cupcake-bg.jpg",
        items: [
          { name: "Cupcakes & Muffins" },
          { name: "Donuts" },
          { name: "Cheesecakes" },
          { name: "Cocktails & Mocktails" }
        ]
      },
    ],
  },
  {
    name: "Stores",
    subcategories: [
      { name: "Novus" },
      { name: "ATB" },
      { name: "Fora" },
      { name: "Silpo" },
    ],
  },
];
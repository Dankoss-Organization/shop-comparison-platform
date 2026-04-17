/**
 * @file catalog_data.ts
 * @description Centralized data models and static mock data for the application's hierarchical catalog and mega-menu.
 * @pattern Static Data Store: Decouples the UI structure (the dropdown) from the actual menu content, making it easy to update or swap with an API fetch in the future.
 */

/**
 * Represents the deepest level of the catalog hierarchy (Level 3).
 * Typically rendered as a clickable link or specific filter item.
 * * @property {string} name - The display name of the item (e.g., "Apples & Pears").
 * @property {string} [href] - Optional URL path. If omitted, the item might function as a client-side filter rather than a direct link.
 */

export interface SubItem {
  name: string;
  href?: string;
}

/**
 * Represents a secondary grouping within a main category (Level 2).
 * Can optionally contain a background image for rich UI displays and a list of specific SubItems.
 * * @property {string} name - The display name of the subcategory (e.g., "Fruits and vegetables").
 * @property {string} [image] - Optional URL path to a background image used when this subcategory is active.
 * @property {SubItem[]} [items] - Optional array of Level 3 items belonging to this subcategory.
 */

export interface SubCategory {
  name: string;
  image?: string; 
  items?: SubItem[];
}

/**
 * Represents the top-level navigation categories (Level 1).
 * These are usually the main tabs presented in the root of the dropdown menu.
 * * @property {string} name - The main category name (e.g., "Products", "Recipes").
 * @property {SubCategory[]} subcategories - An array of Level 2 groupings belonging to this category.
 */

export interface Category {
  name: string;
  subcategories: SubCategory[];
}

/**
 * The primary static dataset driving the CatalogDropdown component.
 * Structured as a 3-deep hierarchy: Category -> SubCategory -> SubItem.
 */

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
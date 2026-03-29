export interface Subcategory {
  name: string;
}

export interface Category {
  name: string;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    name: "Electronics",
    subcategories: [
      { name: "Smartphones" },
      { name: "Laptops" },
      { name: "Headphones" },
      { name: "Cameras" },
    ],
  },
  {
    name: "Clothing",
    subcategories: [
      { name: "Men" },
      { name: "Women" },
      { name: "Shoes" },
      { name: "Accessories" },
    ],
  },
  {
    name: "Home",
    subcategories: [
      { name: "Furniture" },
      { name: "Decor" },
      { name: "Kitchen" },
      { name: "Lighting" },
    ],
  },
  {
    name: "Beauty",
    subcategories: [
      { name: "Skincare" },
      { name: "Makeup" },
      { name: "Haircare" },
      { name: "Fragrance" },
    ],
  },
];
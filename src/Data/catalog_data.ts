export type Category = {
  name: string;
  subcategories: { name: string }[];
};

export const categories: Category[] = [
  {
    name: "Products",
    subcategories: [
      { name: "Fruits and vegetables" },
      { name: "Meat and fish" },
      { name: "Dairy" },
      { name: "Bakery" },
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
      { name: "Season recipes" },
      { name: "High protein" },
      { name: "Budget picks" },
      { name: "People like" },
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

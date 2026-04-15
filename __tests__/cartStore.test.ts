import { expect, test, describe, beforeEach } from 'vitest';
import { useCartStore } from '../src/store/use_cart_store';
import type { DealCard } from '../src/Data/home_data';
const testItem: DealCard = { 
  title: "Milk", 
  price: "$2.50", 
  discount: "", 
  rating: "5.0", 
  market: "ATB", 
  image: "/placeholder.png", 
  quantity: "1 L", 
  oldPrice: "",
  description: "Fresh whole milk, perfect for your morning coffee or cereal.",
  nutrition: {
    calories: "60 kcal",
    carbs: "4.8 g",
    fats: "3.2 g",
    protein: "3.3 g",
    fiber: "0 g",
    sugar: "4.8 g"
  }
};

describe('Cart Store Business Logic', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false });
  });

  test('should calculate total price correctly', () => {
    const store = useCartStore.getState();
    
    store.addItem(testItem);
    expect(useCartStore.getState().getTotalPrice()).toBe(2.50);
    
    useCartStore.getState().updateQuantity("Milk", 1); 
    
    expect(useCartStore.getState().getTotalPrice()).toBe(5.00);
  });

  test('should remove item from cart', () => {
    const store = useCartStore.getState();
    
    store.addItem(testItem);
    expect(useCartStore.getState().items.length).toBe(1);

    store.removeItem("Milk");
    expect(useCartStore.getState().items.length).toBe(0);
  });
});
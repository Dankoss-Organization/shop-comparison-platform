import { expect, test, describe, beforeEach } from 'vitest';
import { useCartStore } from '../src/Store/use_cart_store';
import type { DealCard } from '../src/Data/home_data';

const testItem: DealCard = { 
  id: "milk-001",
  title: "Milk", 
  rating: "5.0", 
  image: "/placeholder.png", 
  quantity: "1 L", 
  description: "Fresh whole milk, perfect for your morning coffee or cereal.",
  nutrition: {
    calories: "60 kcal",
    carbs: "4.8 g",
    fats: "3.2 g",
    protein: "3.3 g",
    fiber: "0 g",
    sugar: "4.8 g"
  },
  offers: [
    {
      store_id: "atb-store",
      store_name: "ATB",
      is_in_stock: true,
      pricing: {
        current_price: 2.50,
        regular_price: 2.50,
        discount_percent: 0
      }
    }
  ]
};

describe('Cart Store Business Logic', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false });
  });

  test('should calculate total price correctly', () => {
    const store = useCartStore.getState();
    
    store.addItem(testItem);
    expect(useCartStore.getState().getTotalPrice()).toBe(2.50);
    
    useCartStore.getState().updateQuantity("milk-001", 1); 
    
    expect(useCartStore.getState().getTotalPrice()).toBe(5.00);
  });

  test('should remove item from cart', () => {
    const store = useCartStore.getState();
    
    store.addItem(testItem);
    expect(useCartStore.getState().items.length).toBe(1);

    store.removeItem("milk-001");
    expect(useCartStore.getState().items.length).toBe(0);
  });

  test('should calculate total items count correctly', () => {
    const store = useCartStore.getState();
    
    store.addItem(testItem);
    expect(useCartStore.getState().getTotalItems()).toBe(1);
    
    useCartStore.getState().updateQuantity("milk-001", 3);
    expect(useCartStore.getState().getTotalItems()).toBe(4);

    useCartStore.getState().updateQuantity("milk-001", -1);
    expect(useCartStore.getState().getTotalItems()).toBe(3);
  });

  test('should not allow item quantity to drop below 1 via updateQuantity', () => {
    const store = useCartStore.getState();
    store.addItem(testItem); 
    useCartStore.getState().updateQuantity("milk-001", -5);
    
    const milkInCart = useCartStore.getState().items.find(i => i.id === "milk-001");
    
    expect(milkInCart?.cartQuantity).toBeGreaterThanOrEqual(1);
  });
});
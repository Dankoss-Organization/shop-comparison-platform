import { describe, test, expect, beforeEach, vi } from 'vitest';
import { useCartStore } from '../src/Store/use_cart_store'; 

const mockAddCartItem = vi.fn().mockResolvedValue({});
const mockGetProductCard = vi.fn().mockResolvedValue({
  topOffers: [{ id: 'fallback-offer-1' }]
});

vi.mock('@/Lib/api', () => ({
  getCartApi: () => ({
    addCartItem: mockAddCartItem,
  }),
  getProductsApi: () => ({
    getProductCard: mockGetProductCard,
  })
}));

const mockItem1 = {
  id: 'prod-1',
  internalId: 'prod-1',
  title: 'Apple',
  offers: [
    { store_id: 'store-A', offerId: 'off-1', pricing: { current_price: 10 } },
    { store_id: 'store-B', offerId: 'off-2', pricing: { current_price: 15 } }
  ]
} as any;

const mockItem2 = {
  id: 'prod-2',
  title: 'Banana',
  offers: [
    { store_id: 'store-A', offerId: 'off-3', pricing: { current_price: 20 } }
  ]
} as any;

describe('useCartStore', () => {

  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false, fulfillmentType: "delivery" });
    vi.clearAllMocks();
  });

  test('should initialize with empty state', () => {
    const state = useCartStore.getState();
    expect(state.items).toEqual([]);
    expect(state.isOpen).toBe(false);
    expect(state.fulfillmentType).toBe("delivery");
  });

  describe('UI State Methods', () => {
    test('setOpen should toggle cart visibility', () => {
      useCartStore.getState().setOpen(true);
      expect(useCartStore.getState().isOpen).toBe(true);
    });

    test('setFulfillmentType should update delivery method', () => {
      useCartStore.getState().setFulfillmentType("pickup");
      expect(useCartStore.getState().fulfillmentType).toBe("pickup");
    });
  });

  describe('Cart Operations', () => {
    test('addItem should add a new item with quantity 1 and call API', () => {
      useCartStore.getState().addItem(mockItem1);

      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].id).toBe('prod-1');
      expect(items[0].cartQuantity).toBe(1);

      expect(items[0].selectedStoreId).toBe('store-A');

      expect(mockAddCartItem).toHaveBeenCalledTimes(1);
      expect(mockAddCartItem).toHaveBeenCalledWith({ offerId: 'off-1', quantity: 1 });
    });

    test('addItem should increase quantity if product already exists', () => {
      const store = useCartStore.getState();
      store.addItem(mockItem1); // +1
      store.addItem(mockItem1); // +1

      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].cartQuantity).toBe(2);
    });

    test('removeItem should delete the item by id or internalId', () => {
      const store = useCartStore.getState();
      store.addItem(mockItem1);
      store.addItem(mockItem2);
      
      expect(store.items).toHaveLength(2);

      store.removeItem('prod-1');
      
      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].id).toBe('prod-2'); 
    });

    test('updateQuantity should change quantity but not go below 1', () => {
      const store = useCartStore.getState();
      store.addItem(mockItem1); 
      
      store.updateQuantity('prod-1', 2); 
      expect(useCartStore.getState().items[0].cartQuantity).toBe(3);

      store.updateQuantity('prod-1', -10); 
      expect(useCartStore.getState().items[0].cartQuantity).toBe(1);
    });

    test('clearCart should remove all items', () => {
      const store = useCartStore.getState();
      store.addItem(mockItem1);
      store.addItem(mockItem2);
      
      store.clearCart();
      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe('Item Customization', () => {
    test('updateSelectedStore should change store and lock the item', () => {
      const store = useCartStore.getState();
      store.addItem(mockItem1);
      
      store.updateSelectedStore('prod-1', 'store-B');
      
      const item = useCartStore.getState().items[0];
      expect(item.selectedStoreId).toBe('store-B');
      expect(item.isLocked).toBe(true);
    });

    test('toggleItemLock should toggle the isLocked property', () => {
      const store = useCartStore.getState();
      store.addItem(mockItem1); 
      
      store.toggleItemLock('prod-1');
      expect(useCartStore.getState().items[0].isLocked).toBe(true);

      store.toggleItemLock('prod-1');
      expect(useCartStore.getState().items[0].isLocked).toBe(false);
    });

    test('applyOptimizedCart should update selectedStoreId for matched items', () => {
      const store = useCartStore.getState();
      store.addItem(mockItem1); 
      store.addItem(mockItem2);
      
      store.applyOptimizedCart([
        { itemId: 'prod-1', storeId: 'store-OPTIMIZED' }
      ]);
      
      const items = useCartStore.getState().items;
      expect(items.find(i => i.id === 'prod-1')?.selectedStoreId).toBe('store-OPTIMIZED');
      expect(items.find(i => i.id === 'prod-2')?.selectedStoreId).toBe('store-A'); 
    });
  });

  describe('Calculations', () => {
    test('getTotalItems should return the sum of all cartQuantities', () => {
      const store = useCartStore.getState();
      store.addItem(mockItem1); 
      store.updateQuantity('prod-1', 2); 
      store.addItem(mockItem2); 
      
      expect(store.getTotalItems()).toBe(4);
    });

    test('getTotalPrice should calculate sum correctly based on selected store', () => {
      const store = useCartStore.getState();
      
      store.addItem(mockItem1); 
      expect(store.getTotalPrice()).toBe(10);
      
      store.updateQuantity('prod-1', 1); 
      expect(store.getTotalPrice()).toBe(20);

      store.updateSelectedStore('prod-1', 'store-B');
      expect(store.getTotalPrice()).toBe(30);
    });
  });
});
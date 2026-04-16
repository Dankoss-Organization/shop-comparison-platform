import { expect, test, describe, beforeEach } from 'vitest';
import { useFavoritesStore } from '../src/Store/use_favourites_store';

describe('Favorites Store Business Logic', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favoriteIds: [] });
  });

  test('should toggle item in favorites correctly', () => {
    const store = useFavoritesStore.getState();
    const testProductId = "Cream Cheese";

    expect(store.isFavorite(testProductId)).toBe(false);

    useFavoritesStore.getState().toggleFavorite(testProductId);
    
    expect(useFavoritesStore.getState().favoriteIds).toContain(testProductId);
    expect(useFavoritesStore.getState().isFavorite(testProductId)).toBe(true);

    useFavoritesStore.getState().toggleFavorite(testProductId);
    
    expect(useFavoritesStore.getState().favoriteIds).not.toContain(testProductId);
    expect(useFavoritesStore.getState().isFavorite(testProductId)).toBe(false);
  });
});
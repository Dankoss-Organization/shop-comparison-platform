import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi, beforeEach } from 'vitest';
import CatalogPage from '../src/app/catalog/page'; 
import * as cartStore from '../src/store/useCartStore';
import * as favStore from '../src/store/useFavouritesStore';
import '@testing-library/jest-dom';

const mockPush = vi.fn();
let mockSearchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/catalog',
  useSearchParams: () => mockSearchParams
}));

vi.mock('next/image', () => ({ default: (props: any) => <img {...props} /> }));

describe('CatalogPage Integration Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams(''); 
    
    vi.spyOn(cartStore, 'useCartStore').mockImplementation((selector: any) => {
      const state = { setOpen: vi.fn(), getTotalItems: () => 0, getTotalPrice: () => 0, items: [] };
      return typeof selector === 'function' ? selector(state) : state;
    });

    vi.spyOn(favStore, 'useFavoritesStore').mockImplementation((selector: any) => {
      const state = { isFavorite: () => false, toggleFavorite: vi.fn(), favoriteIds: [] };
      return typeof selector === 'function' ? selector(state) : state;
    });
    
    window.scrollTo = vi.fn();
  });

  test('responds to URL search parameters to load specific categories', () => {
    mockSearchParams = new URLSearchParams('?tab=recipes&category=seasonal-recipes');
    
    render(<CatalogPage />);
    
    const recipeTabs = screen.getAllByRole('button', { name: /All Recipes/i });
    expect(recipeTabs[0]).toHaveClass('bg-[#EC5800]');
    
    const seasonalBtn = screen.getByRole('button', { name: /Seasonal Recipes/i });
    expect(seasonalBtn).toHaveClass('text-white'); 
  });

  test('updates the URL when a different tab or category is clicked', () => {
    render(<CatalogPage />);
    
    const recipeTabs = screen.getAllByRole('button', { name: /All Recipes/i });
    fireEvent.click(recipeTabs[0]);

    expect(mockPush).toHaveBeenCalledWith(
      '/catalog?tab=recipes&category=all&page=1',
      expect.objectContaining({ scroll: false })
    );
  });
});
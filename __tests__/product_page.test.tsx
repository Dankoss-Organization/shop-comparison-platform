import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi, beforeEach } from 'vitest';
import ProductPage from '../src/app/product/[id]/page';
import * as cartStore from '../src/Store/use_cart_store';
import * as favStore from '../src/Store/use_favourite_store';
import '@testing-library/jest-dom';

const mockPush = vi.fn();
let mockParams: { id: string | string[] } = { id: 'salmon-steak' };

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/product/salmon-steak',
  useParams: () => mockParams,
  useSearchParams: () => new URLSearchParams()
}));

vi.mock('next/image', () => ({ default: (props: any) => <img {...props} /> }));

describe('ProductPage Integration Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear(); 

    vi.spyOn(cartStore, 'useCartStore').mockImplementation((selector: any) => {
      const state = { 
        setOpen: vi.fn(), 
        addItem: vi.fn(),
        getTotalItems: () => 0, 
        getTotalPrice: () => 0,
        items: []
      };
      return typeof selector === 'function' ? selector(state) : state;
    });

    vi.spyOn(favStore, 'useFavoritesStore').mockImplementation((selector: any) => {
      const state = { 
        toggleFavorite: vi.fn(), 
        isFavorite: () => false,
        favoriteIds: [] 
      };
      return typeof selector === 'function' ? selector(state) : state;
    });
  });

  test('redirects back to exact previous catalog state when Back to browsing is clicked', () => {
    mockParams = { id: 'Salmon%20Steak' };
    
    sessionStorage.setItem('lastCatalogUrl', '/catalog?tab=products&category=week-discounts&page=2');
    
    render(<ProductPage />);
    
    const backBtn = screen.getByRole('button', { name: /Back to browsing/i });
    fireEvent.click(backBtn);

    expect(mockPush).toHaveBeenCalledWith('/catalog?tab=products&category=week-discounts&page=2');
  });

  test('handles 404/not found state by falling back safely', () => {
    mockParams = { id: 'Non-Existent-Ghost-Item-999' }; 
    
    render(<ProductPage />);
    
    const fallbackTitle = screen.getByRole('heading', { level: 1 }).textContent;
    expect(fallbackTitle).toBeTruthy();
    expect(fallbackTitle).not.toBe('Non-Existent-Ghost-Item-999'); 
  });
});
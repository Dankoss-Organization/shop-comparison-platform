import { render, screen, fireEvent, within } from '@testing-library/react';
import { expect, test, describe, vi, beforeEach } from 'vitest';
import ProductPage from '../src/app/product/[id]/page';
import * as cartStore from '../src/Store/use_cart_store';
import * as favStore from '../src/Store/use_favourite_store';
import '@testing-library/jest-dom';

const { mockPush, mockBack, mockGetProductCard, mockGetRelatedProducts } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockBack: vi.fn(),
  mockGetProductCard: vi.fn(),
  mockGetRelatedProducts: vi.fn(),
}));
let mockParams: { id: string | string[] } = { id: 'salmon-steak' };

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, back: mockBack }),
  usePathname: () => '/product/salmon-steak',
  useParams: () => mockParams,
  useSearchParams: () => new URLSearchParams()
}));

vi.mock('@/Lib/api', () => ({
  getProductsApi: () => ({
    getProductCard: mockGetProductCard,
    getRelatedProducts: mockGetRelatedProducts,
  }),
}));

vi.mock('next/image', () => ({ default: (props: any) => <img {...props} /> }));

describe('ProductPage Integration Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear(); 
    mockGetRelatedProducts.mockResolvedValue({ related: [] });

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

  test('redirects back to exact previous catalog state when Back to browsing is clicked', async () => {
    mockParams = { id: 'Salmon%20Steak' };
    mockGetProductCard.mockResolvedValueOnce({
      product: {
        id: 'salmon-steak',
        canonicalName: 'Salmon Steak',
        brand: 'FreshSea',
        category: 'Seafood',
        media: '/salmon.jpg',
      },
      topOffers: [],
      pricingSummary: { bestPrice: 250, oldPrice: null, discountPercent: 0, currency: 'UAH' },
      availabilityStatus: 'in_stock',
      stats: null,
    });
    
    sessionStorage.setItem('lastCatalogUrl', '/catalog?tab=products&category=week-discounts&page=2');
    
    render(<ProductPage />);
    
    const main = screen.getByRole('main');
    const backBtn = await within(main).findByRole('button', { name: /Back to browsing/i });
    fireEvent.click(backBtn);

    expect(mockPush).toHaveBeenCalledWith('/catalog?tab=products&category=week-discounts&page=2');
  });

  test('handles 404/not found state by falling back safely', async () => {
    mockParams = { id: 'Non-Existent-Ghost-Item-999' }; 
    mockGetProductCard.mockRejectedValueOnce(new Error('Not Found'));
    
    render(<ProductPage />);
    
    const main = screen.getByRole('main');
    expect(await within(main).findByText(/Product not found or failed to load\./i)).toBeInTheDocument();
    expect(within(main).getByRole('button', { name: /Go back/i })).toBeInTheDocument();
  });
});
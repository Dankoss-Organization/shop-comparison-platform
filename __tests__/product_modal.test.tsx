import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { ProductModal } from '../src/Components/UI/product_modal'; 
import '@testing-library/jest-dom';


const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockToggleFavorite = vi.fn();
const mockIsFavorite = vi.fn();
vi.mock('@/Store/use_favourite_store', () => ({
  useFavoritesStore: (selector: any) => selector({
    toggleFavorite: mockToggleFavorite,
    isFavorite: mockIsFavorite,
  }),
}));

const mockAddItem = vi.fn();
vi.mock('@/Store/use_cart_store', () => ({
  useCartStore: (selector: any) => selector({
    addItem: mockAddItem,
  }),
}));

vi.mock('@/Lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
  formatCurrency: (val: number, currency: string) => `${val} ${currency}`,
}));

vi.mock('./smart_image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} data-testid="smart-image" />
}));


const mockProduct = {
  id: 'test-id-1',
  title: 'Test Modal Product',
  description: 'Test description text',
  category: 'Snacks',
  brand: 'TestBrand',
  rating: '4.5',
  currency: 'UAH',
  quantity: '1 pcs',
  offers: [
    { 
      store_id: 'store_1', 
      store_name: 'Store A', 
      pricing: { current_price: 100, regular_price: 120, discount_percent: 16 } 
    },
    { 
      store_id: 'store_2', 
      store_name: 'Store B', 
      pricing: { current_price: 110, regular_price: 110, discount_percent: 0 } 
    }
  ],
  nutrition: { calories: '200', protein: '10g' }
} as any;

describe('ProductModal Component Suite', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockIsFavorite.mockReturnValue(false);
  });

  test('should render context and Window structure', () => {
    render(
      <ProductModal item={mockProduct} onClose={mockOnClose}>
        <ProductModal.Window>
          <div data-testid="modal-content">Modal Content</div>
        </ProductModal.Window>
      </ProductModal>
    );

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  test('should call onClose when clicking backdrop', () => {
    render(
      <ProductModal item={mockProduct} onClose={mockOnClose}>
        <ProductModal.Window>
          <div>Content</div>
        </ProductModal.Window>
      </ProductModal>
    );

    const backdrop = screen.getByLabelText('Close');
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('should call router.push when clicking "Open product page"', () => {
    render(
      <ProductModal item={mockProduct} onClose={mockOnClose}>
        <ProductModal.Window>
          <div>Content</div>
        </ProductModal.Window>
      </ProductModal>
    );

    const openPageBtn = screen.getByLabelText('Open product page');
    fireEvent.click(openPageBtn);
    
    expect(mockPush).toHaveBeenCalledWith('/product/test-id-1');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('Header should render correct product info and best price by default', () => {
    render(
      <ProductModal item={mockProduct} onClose={mockOnClose}>
        <ProductModal.Header categoryTitle="Default Cat" />
      </ProductModal>
    );

    expect(screen.getByText('Test Modal Product')).toBeInTheDocument();
    expect(screen.getByText('Snacks')).toBeInTheDocument();
    expect(screen.getByText('TestBrand')).toBeInTheDocument();
    
    // Має показати найменшу ціну (Store A)
    expect(screen.getByText('100 UAH')).toBeInTheDocument();
    expect(screen.getByText('-16%')).toBeInTheDocument();
  });

  test('Actions should allow switching stores and adding to cart', () => {
    render(
      <ProductModal item={mockProduct} onClose={mockOnClose}>
        <ProductModal.Actions />
      </ProductModal>
    );

    const storeBButton = screen.getByText('Store B').closest('button');
    expect(storeBButton).toBeInTheDocument();

    fireEvent.click(storeBButton!);

    const addToCartBtn = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addToCartBtn);

    expect(mockAddItem).toHaveBeenCalledTimes(1);
    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({ 
        id: 'test-id-1', 
        selectedStoreId: 'store_2', 
        store_name: 'Store B' 
      })
    );
  });

  test('ImageGallery should allow toggling favorites', () => {
    render(
      <ProductModal item={mockProduct} onClose={mockOnClose}>
        <ProductModal.ImageGallery />
      </ProductModal>
    );

    const favButton = screen.getByTestId('smart-image').parentElement?.previousElementSibling;
    
    fireEvent.click(favButton as Element);
    expect(mockToggleFavorite).toHaveBeenCalledWith('test-id-1');
  });

  test('Details should render nutrition info if available', () => {
    render(
      <ProductModal item={mockProduct} onClose={mockOnClose}>
        <ProductModal.Details categoryTitle="Default Cat" />
      </ProductModal>
    );

    expect(screen.getByText('Calories')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('Protein')).toBeInTheDocument();
    expect(screen.getByText('10g')).toBeInTheDocument();
  });
});
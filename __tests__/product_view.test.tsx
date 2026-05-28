import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { 
  ImageGallery, 
  ProductHeader, 
  ProductActions, 
  ProductDetails, 
  Reviews 
} from '../src/Components/UI/product_view'; 
import '@testing-library/jest-dom';


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

const mockItem = {
  id: 'prod-123',
  title: 'Organic Bananas',
  description: 'Fresh and organic bananas.',
  category: 'Fruits',
  brand: 'EcoFarm',
  rating: '4.8',
  currency: 'UAH',
  quantity: '1 kg', 
  availabilityStatus: 'in_stock',
  offers: [
    { 
      store_id: 's_atb', 
      store_name: 'ATB', 
      pricing: { current_price: 50, regular_price: 60, discount_percent: 16 } 
    },
    { 
      store_id: 's_silpo', 
      store_name: 'Silpo', 
      pricing: { current_price: 55, regular_price: 55, discount_percent: 0 } 
    }
  ],
  nutrition: { calories: '89', carbs: '23g', protein: '1.1g' },
  stats: { minPrice30d: 45, maxPrice30d: 65, avgPrice30d: 55, priceTrend: 'stable' },
  allergens: ['None'],
  notes: ['Keep in a cool place']
} as any;


describe('ProductView Components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsFavorite.mockReturnValue(false);
  });

  describe('ImageGallery Component', () => {
    test('should render the image and best offer badge', () => {
      render(<ImageGallery item={mockItem} />);
      
      expect(screen.getByTestId('smart-image')).toBeInTheDocument();
      expect(screen.getByText(/ATB/i)).toBeInTheDocument();
      expect(screen.getByText('-16%')).toBeInTheDocument();
      expect(screen.getByText('In Stock')).toBeInTheDocument();
    });

    test('should trigger toggleFavorite on heart icon click', () => {
      render(<ImageGallery item={mockItem} />);

      const favButton = screen.getByTestId('smart-image').parentElement?.previousElementSibling;
      fireEvent.click(favButton as Element);
      
      expect(mockToggleFavorite).toHaveBeenCalledWith('prod-123');
    });

    test('should display price trend stats if available', () => {
      render(<ImageGallery item={mockItem} />);
      expect(screen.getByText(/Price stable/i)).toBeInTheDocument();
      expect(screen.getByText(/30d: 45 UAH - 65 UAH/i)).toBeInTheDocument();
    });
  });

  describe('ProductHeader Component', () => {
    test('should render title, category, brand, and best price', () => {
      render(<ProductHeader item={mockItem} categoryTitle="Default" />);
      
      expect(screen.getByText('Organic Bananas')).toBeInTheDocument();
      expect(screen.getByText('Fruits')).toBeInTheDocument();
      expect(screen.getByText('EcoFarm')).toBeInTheDocument();
      
      expect(screen.getByText('50 UAH')).toBeInTheDocument();
      expect(screen.getByText('60 UAH')).toBeInTheDocument();
    });
  });

  describe('ProductActions Component', () => {
    test('should display stores and switch active store', () => {
      const mockOnOfferChange = vi.fn();
      render(<ProductActions item={mockItem} categoryTitle="Fruits" onOfferChange={mockOnOfferChange} />);

      expect(screen.getByText('ATB')).toBeInTheDocument();
      expect(screen.getByText('Silpo')).toBeInTheDocument();

      const silpoBtn = screen.getByText('Silpo').closest('button');
      fireEvent.click(silpoBtn!);

      expect(mockOnOfferChange).toHaveBeenCalledWith(
        expect.objectContaining({ store_name: 'Silpo' })
      );
    });

    test('should handle quantity changes for weight items (g/kg)', () => {
      render(<ProductActions item={mockItem} categoryTitle="Fruits" />);
      
      expect(screen.getByText('100 g')).toBeInTheDocument();

      const increaseBtn = screen.getByText('+');
      const decreaseBtn = screen.getByText('-');

      for (let i = 0; i < 9; i++) {
        fireEvent.click(increaseBtn);
      }
      expect(screen.getByText('1.00 kg')).toBeInTheDocument();

      fireEvent.click(decreaseBtn);
      expect(screen.getByText('900 g')).toBeInTheDocument();
    });

    test('should handle quantity changes for piece items (pcs)', () => {
      const pieceItem = { ...mockItem, quantity: '1 pcs' };
      render(<ProductActions item={pieceItem} categoryTitle="Fruits" />);
      
      expect(screen.getByText('1 pack')).toBeInTheDocument();

      const increaseBtn = screen.getByText('+');
      fireEvent.click(increaseBtn);
      
      expect(screen.getByText('2 packs')).toBeInTheDocument();
    });

    test('should add correct amount to cart', () => {
      render(<ProductActions item={mockItem} categoryTitle="Fruits" />);

      const addToCartBtn = screen.getByRole('button', { name: /Add to cart/i });
      fireEvent.click(addToCartBtn);

      expect(mockAddItem).toHaveBeenCalledTimes(1);

      expect(screen.getByText('Added!')).toBeInTheDocument();
    });
  });

  describe('ProductDetails Component', () => {
    test('should render details and all accordions', () => {
      render(<ProductDetails item={mockItem} categoryTitle="Fruits" />);
      
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Fresh and organic bananas.')).toBeInTheDocument();
      
      expect(screen.getByText('Nutrition')).toBeInTheDocument();
      expect(screen.getByText('89')).toBeInTheDocument(); 
      expect(screen.getByText('23g')).toBeInTheDocument(); 

      expect(screen.getByText('Details & allergens')).toBeInTheDocument();
      expect(screen.getByText('Keep in a cool place')).toBeInTheDocument();
    });
  });

  describe('Reviews Component', () => {
    test('should render product rating and reviews', () => {
      render(<Reviews item={mockItem} />);
      
      expect(screen.getByText('4.8')).toBeInTheDocument();
      expect(screen.getByText('Anna M.')).toBeInTheDocument();
      expect(screen.getByText('Maks K.')).toBeInTheDocument();
    });
  });
});
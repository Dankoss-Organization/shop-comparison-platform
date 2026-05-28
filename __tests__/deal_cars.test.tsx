import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import DealCardFactory from '../src/Components/UI/deal_card'; 
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

vi.mock('@/Components/UI/smart_image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} data-testid="smart-image" />
}));

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: any) => <>{children}</>,
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} data-testid="motion-dropdown" {...props}>
        {children}
      </div>
    ),
  },
}));

const mockItem = {
  id: 'prod-1',
  title: 'Test Product Apple',
  image: '/test.jpg',
  rating: '4.8',
  currency: 'UAH',
  offers: [
    { 
      store_id: 's_silpo', 
      store_name: 'Silpo', 
      pricing: { current_price: 150, regular_price: 180, discount_percent: 16 } 
    },
    { 
      store_id: 's_atb', 
      store_name: 'ATB', 
      pricing: { current_price: 120, regular_price: 120, discount_percent: 0 } 
    }
  ]
} as any;


describe('DealCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsFavorite.mockReturnValue(false); 
  });

  test('should render the best offer (lowest price) by default', () => {
    render(<DealCardFactory item={mockItem} />);
    
    expect(screen.getByText('Test Product Apple')).toBeInTheDocument();

    expect(screen.getByText('ATB')).toBeInTheDocument();
    expect(screen.getByText('120 UAH')).toBeInTheDocument();
  });

  test('should render the preferred store if provided', () => {
    render(<DealCardFactory item={mockItem} preferredStore="Silpo" />);

    expect(screen.getByText('Silpo')).toBeInTheDocument();
    expect(screen.getByText('150 UAH')).toBeInTheDocument();
    
    expect(screen.getByText('180 UAH')).toBeInTheDocument();
  });

  test('should call addItem to cart when Buy button is clicked', () => {
    render(<DealCardFactory item={mockItem} />);
    
    const buyButton = screen.getByRole('button', { name: /buy/i });
    fireEvent.click(buyButton);
    
    expect(mockAddItem).toHaveBeenCalledTimes(1);
    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'prod-1', selectedStoreId: 's_atb' })
    );
  });

  test('should call toggleFavorite when Heart icon is clicked', () => {
    render(<DealCardFactory item={mockItem} />);
    
    const favoriteButton = screen.getByTestId('smart-image').parentElement?.nextElementSibling?.querySelector('button:last-child');
    
    fireEvent.click(favoriteButton!);
    
    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockToggleFavorite).toHaveBeenCalledWith('prod-1');
  });

  test('should open offers dropdown and change selected store on click', () => {
    render(<DealCardFactory item={mockItem} />);
    
    expect(screen.queryByText('120 UAH')).toBeInTheDocument();
    
    const storeBadge = screen.getByText('ATB');
    fireEvent.click(storeBadge);
    
    expect(screen.getByText('Available at')).toBeInTheDocument();
    
    const silpoOptions = screen.getAllByText('Silpo');
    const silpoButtonInDropdown = silpoOptions[silpoOptions.length - 1].closest('button');
    
    fireEvent.click(silpoButtonInDropdown!);

    expect(screen.queryByText('150 UAH')).toBeInTheDocument();

    expect(screen.queryByText('Available at')).not.toBeInTheDocument();
  });

  test('should call onClick callback when the whole card is clicked', () => {
    const mockOnClick = vi.fn();
    render(<DealCardFactory item={mockItem} onClick={mockOnClick} />);

    const article = screen.getByRole('article');
    fireEvent.click(article);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
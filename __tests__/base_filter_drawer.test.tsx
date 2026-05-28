import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { 
  BaseFilterDrawer, 
  FilterPriceCap, 
  FilterRating, 
  FilterDiscount 
} from '../src/Components/UI/base_filter_drawer'; 
import '@testing-library/jest-dom';


vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: any) => <>{children}</>,
  motion: {
    button: ({ initial, animate, exit, transition, ...props }: any) => <button {...props} />,
    aside: ({ initial, animate, exit, transition, ...props }: any) => <aside {...props} />,
  },
}));

vi.mock('@/Lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
  formatCurrency: (val: number) => `${val} UAH`, 
}));


describe('BaseFilterDrawer Component', () => {
  const mockOnClose = vi.fn();
  const mockOnReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should not render anything when isOpen is false', () => {
    render(
      <BaseFilterDrawer isOpen={false} onClose={mockOnClose} onReset={mockOnReset}>
        <div>Test Content</div>
      </BaseFilterDrawer>
    );
    expect(screen.queryByText('Filters')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  test('should render content and children when isOpen is true', () => {
    render(
      <BaseFilterDrawer isOpen={true} onClose={mockOnClose} onReset={mockOnReset} title="Custom Title">
        <div data-testid="child-element">Test Content</div>
      </BaseFilterDrawer>
    );
    
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
  });

  test('should call onClose when close button is clicked', () => {
    render(
      <BaseFilterDrawer isOpen={true} onClose={mockOnClose} onReset={mockOnReset}>
        <div>Content</div>
      </BaseFilterDrawer>
    );

    const backdropCloseBtn = screen.getByLabelText('Close filters');
    fireEvent.click(backdropCloseBtn);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('should call onReset and onClose when reset button is clicked', () => {
    render(
      <BaseFilterDrawer isOpen={true} onClose={mockOnClose} onReset={mockOnReset}>
        <div>Content</div>
      </BaseFilterDrawer>
    );
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    
    expect(mockOnReset).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});


describe('FilterPriceCap Component', () => {
  const mockSetMaxPrice = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render with correct initial values and bounds', () => {
    render(
      <FilterPriceCap 
        maxPrice={500} 
        setMaxPrice={mockSetMaxPrice} 
        priceBounds={{ min: 10, max: 1000 }} 
      />
    );
    expect(screen.getByText('Up to 500 UAH')).toBeInTheDocument();
    expect(screen.getByText('10 UAH - 1000 UAH')).toBeInTheDocument();
    
    const rangeInput = screen.getByRole('slider');
    expect(rangeInput).toHaveValue('500');
  });

  test('should call setMaxPrice on range change', () => {
    render(
      <FilterPriceCap 
        maxPrice={500} 
        setMaxPrice={mockSetMaxPrice} 
        priceBounds={{ min: 10, max: 1000 }} 
      />
    );

    const rangeInput = screen.getByRole('slider');
    fireEvent.change(rangeInput, { target: { value: '750' } });

    expect(mockSetMaxPrice).toHaveBeenCalledWith(750);
  });
});

describe('FilterRating Component', () => {
  const mockSetMinRating = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render all rating options', () => {
    render(<FilterRating minRating={0} setMinRating={mockSetMinRating} />);
    
    expect(screen.getByRole('button', { name: 'Any' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4+' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4.5+' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4.8+' })).toBeInTheDocument();
  });

  test('should call setMinRating with correct value when clicked', () => {
    render(<FilterRating minRating={0} setMinRating={mockSetMinRating} />);
    
    fireEvent.click(screen.getByRole('button', { name: '4.5+' }));
    expect(mockSetMinRating).toHaveBeenCalledWith(4.5);
  });
});


describe('FilterDiscount Component', () => {
  const mockSetMinDiscount = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render all discount options', () => {
    render(<FilterDiscount minDiscount={0} setMinDiscount={mockSetMinDiscount} />);
    
    expect(screen.getByRole('button', { name: 'Any' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '10%+' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '20%+' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '30%+' })).toBeInTheDocument();
  });

  test('should call setMinDiscount with correct value when clicked', () => {
    render(<FilterDiscount minDiscount={0} setMinDiscount={mockSetMinDiscount} />);
    
    fireEvent.click(screen.getByRole('button', { name: '20%+' }));
    expect(mockSetMinDiscount).toHaveBeenCalledWith(20);
  });
});
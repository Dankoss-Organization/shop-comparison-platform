import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi, beforeEach } from 'vitest';
import { CartHeaderWidget } from '../src/Components/Layout/Header/CartHeaderWidget';
import * as cartStore from '../src/store/use_cart_store';
import '@testing-library/jest-dom';

vi.mock('../src/store/use_cart_store');
vi.mock('next/image', () => ({ default: (props: any) => <img {...props} /> }));

describe('CartHeaderWidget UI Logic', () => {
  const mockSetOpen = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('displays correct badge number and price when populated, and opens cart on click', () => {
    vi.spyOn(cartStore, 'useCartStore').mockImplementation((selector: any) => {
      const state = { getTotalItems: () => 3, getTotalPrice: () => 24.50, setOpen: mockSetOpen };
      return selector(state);
    });

    render(<CartHeaderWidget />);

    expect(screen.getByText(/\$24\.50/i)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    expect(mockSetOpen).toHaveBeenCalledWith(true);
  });
});
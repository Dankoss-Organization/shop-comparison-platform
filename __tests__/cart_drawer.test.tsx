import { render, screen } from '@testing-library/react';
import { expect, test, describe, beforeEach } from 'vitest';
import { CartDrawer } from '../src/Components/Cart/cart_drawer';
import { useCartStore } from '../src/Store/use_cart_store';
import '@testing-library/jest-dom';

describe('CartDrawer UI Logic', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: true });
  });

  test('should render empty state illustration when items array is empty', () => {
    render(<CartDrawer />);
    
    const emptyMessage = screen.getByText(/empty/i); 
    expect(emptyMessage).toBeInTheDocument();
    
    const checkoutButton = screen.queryByRole('button', { name: /CHECKOUT|PLACE ORDER/i });
    expect(checkoutButton).not.toBeInTheDocument();
  });
});
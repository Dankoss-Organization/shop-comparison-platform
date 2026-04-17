import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi, beforeEach } from 'vitest';
import CatalogDropdown from '../src/components/layout/header/CatalogDropdown';
import * as catalogContext from '../src/context/CatalogContext';
import '@testing-library/jest-dom';

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />
}));

const mockCategories = [
  { name: 'Products', subcategories: [] },
  { name: 'Recipes', subcategories: [] }
];

describe('CatalogDropdown UI Logic', () => {
  const mockSetActiveCategory = vi.fn();
  const mockSetLockedCategory = vi.fn();

  beforeEach(() => {
    vi.spyOn(catalogContext, 'useCatalog').mockReturnValue({
      isCatalogOpen: true,
      activeCategory: null,
      lockedCategory: null,
      setActiveCategory: mockSetActiveCategory,
      setLockedCategory: mockSetLockedCategory,
      setIsCatalogOpen: vi.fn(),
      closeCatalog: vi.fn()
    });
  });

  test('triggers hover and click logic for locking categories', () => {
    render(<CatalogDropdown categories={mockCategories} />);

    const productsLink = screen.getByText('Products').closest('div')!;

    fireEvent.mouseEnter(productsLink);
    expect(mockSetActiveCategory).toHaveBeenCalledWith('Products');

    fireEvent.click(productsLink);
    expect(mockSetLockedCategory).toHaveBeenCalledWith('Products');
  });
});
import { render, screen, fireEvent, within } from '@testing-library/react';
import { expect, test, describe, vi, beforeEach } from 'vitest';
import CatalogPage from '../src/app/catalog/page';
import * as cartStore from '../src/Store/use_cart_store';
import * as favStore from '../src/Store/use_favourite_store';
import '@testing-library/jest-dom';

const mockPush = vi.fn();
const mockBack = vi.fn();
let mockSearchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, back: mockBack }),
  usePathname: () => '/catalog',
  useSearchParams: () => mockSearchParams,
}));

vi.mock('next/image', () => ({ default: (props: any) => <img {...props} /> }));

function mockStores() {
  vi.spyOn(cartStore, 'useCartStore').mockImplementation((selector: any) => {
    const state = { setOpen: vi.fn(), getTotalItems: () => 0, getTotalPrice: () => 0, items: [] };
    return typeof selector === 'function' ? selector(state) : state;
  });
  vi.spyOn(favStore, 'useFavoritesStore').mockImplementation((selector: any) => {
    const state = { isFavorite: () => false, toggleFavorite: vi.fn(), favoriteIds: [] };
    return typeof selector === 'function' ? selector(state) : state;
  });
}

function getTabSwitcher() {
  return screen.getByTestId('tab-switcher');
}

function getMain() {
  return screen.getByRole('main');
}

describe('CatalogPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams('');
    mockStores();
    window.scrollTo = vi.fn();
  });

  describe('initial render', () => {
    test('renders the page heading', () => {
      render(<CatalogPage />);
      expect(within(getMain()).getByRole('heading', { name: /full catalog/i })).toBeInTheDocument();
    });

    test('renders both tab buttons', () => {
      render(<CatalogPage />);
      const tabs = getTabSwitcher();
      expect(within(tabs).getByRole('button', { name: /all products/i })).toBeInTheDocument();
      expect(within(tabs).getByRole('button', { name: /all recipes/i })).toBeInTheDocument();
    });

    test('renders the Back to browsing button', () => {
      render(<CatalogPage />);
      expect(within(getMain()).getByRole('button', { name: /back to browsing/i })).toBeInTheDocument();
    });
  });

  describe('URL param hydration', () => {
    test('activates the recipes tab when tab=recipes is in the URL', () => {
      mockSearchParams = new URLSearchParams('tab=recipes');
      render(<CatalogPage />);
      const tabs = getTabSwitcher();

      expect(within(tabs).getByRole('button', { name: /all recipes/i })).toHaveClass('text-white');
      expect(within(tabs).getByRole('button', { name: /all products/i })).not.toHaveClass('text-white');
    });

    test('activates the products tab by default when no tab param is present', () => {
      render(<CatalogPage />);
      const tabs = getTabSwitcher();

      expect(within(tabs).getByRole('button', { name: /all products/i })).toHaveClass('text-white');
      expect(within(tabs).getByRole('button', { name: /all recipes/i })).not.toHaveClass('text-white');
    });

    test('marks the correct category pill as active from URL', () => {
      mockSearchParams = new URLSearchParams('tab=recipes&category=seasonal-recipes');
      render(<CatalogPage />);

      const seasonalBtn = within(getMain()).getByRole('button', { name: /seasonal recipes/i });
      expect(seasonalBtn).toHaveClass('bg-white/10');
    });

    test('inactive category pills do not have the active class', () => {
      mockSearchParams = new URLSearchParams('tab=recipes&category=seasonal-recipes');
      render(<CatalogPage />);

      const allRecipesPill = within(getMain())
        .getAllByRole('button', { name: /^all recipes$/i })
        .find(btn => btn.classList.contains('rounded-full'));

      expect(allRecipesPill).toBeDefined();
      expect(allRecipesPill).not.toHaveClass('bg-white/10');
    });
  });

  describe('tab switching', () => {
    test('clicking the recipes tab calls router.push with tab=recipes', () => {
      render(<CatalogPage />);
      fireEvent.click(within(getTabSwitcher()).getByRole('button', { name: /all recipes/i }));

      expect(mockPush).toHaveBeenCalledOnce();
      expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('tab=recipes'));
    });

    test('clicking the products tab calls router.push with tab=products', () => {
      mockSearchParams = new URLSearchParams('tab=recipes');
      render(<CatalogPage />);
      fireEvent.click(within(getTabSwitcher()).getByRole('button', { name: /all products/i }));

      expect(mockPush).toHaveBeenCalledOnce();
      expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('tab=products'));
    });

    test('switching tabs resets category to all', () => {
      mockSearchParams = new URLSearchParams('tab=products&category=sauces');
      render(<CatalogPage />);
      fireEvent.click(within(getTabSwitcher()).getByRole('button', { name: /all recipes/i }));

      expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('category=all'));
    });
  });

  describe('category filtering', () => {
    test('clicking a category pill calls router.push with the correct category', () => {
      mockSearchParams = new URLSearchParams('tab=recipes');
      render(<CatalogPage />);

      fireEvent.click(within(getMain()).getByRole('button', { name: /seasonal recipes/i }));

      expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('category=seasonal-recipes'));
    });

    test('clicking a category pill also preserves the current tab in the URL', () => {
      mockSearchParams = new URLSearchParams('tab=recipes');
      render(<CatalogPage />);

      fireEvent.click(within(getMain()).getByRole('button', { name: /seasonal recipes/i }));

      expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('tab=recipes'));
    });
  });

  describe('navigation', () => {
    test('Back to browsing button triggers router navigation', () => {
      render(<CatalogPage />);
      fireEvent.click(within(getMain()).getByRole('button', { name: /back to browsing/i }));

      const navigated = mockPush.mock.calls.length > 0 || mockBack.mock.calls.length > 0;
      expect(navigated).toBe(true);
    });
  });
});
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom';
import { CatalogProvider, useCatalog } from '../src/context/CatalogContext';

const DummyConsumer = () => {
  const { activeCategory, setActiveCategory } = useCatalog();
  return (
    <div>
      <span data-testid="category-value">{activeCategory || 'empty'}</span>
      <button onClick={() => setActiveCategory('seafood')}>Update Category</button>
    </div>
  );
};

describe('CatalogContext', () => {
  test('provides default state and allows state updates', () => {
    render(
      <CatalogProvider>
        <DummyConsumer />
      </CatalogProvider>
    );

    expect(screen.getByTestId('category-value')).toHaveTextContent('empty');
    fireEvent.click(screen.getByRole('button', { name: 'Update Category' }));
    expect(screen.getByTestId('category-value')).toHaveTextContent('seafood');
  });
});
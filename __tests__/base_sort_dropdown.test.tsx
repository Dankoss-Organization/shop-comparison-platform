import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import BaseSortDropdown from '../src/Components/UI/base_sort_dropdown'; 
import '@testing-library/jest-dom';

vi.mock('@/Lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('BaseSortDropdown Component', () => {
  const mockOptions = [
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
  ];

  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render with active label if value matches an option', () => {
    render(
      <BaseSortDropdown 
        options={mockOptions} 
        value="price_desc" 
        onChange={mockOnChange} 
      />
    );

    expect(screen.getByText('Price: High to Low')).toBeInTheDocument();
  });

  test('should render fallback label if value does not match any option', () => {
    render(
      <BaseSortDropdown 
        options={mockOptions} 
        value="unknown_value" 
        onChange={mockOnChange} 
        fallbackLabel="Default Sort"
      />
    );
    
    expect(screen.getByText('Default Sort')).toBeInTheDocument();
  });

  test('should toggle dropdown open and close on button click', () => {
    render(
      <BaseSortDropdown 
        options={mockOptions} 
        value="rating" 
        onChange={mockOnChange} 
      />
    );

    const toggleButton = screen.getByText('Top Rated').closest('button');
    expect(toggleButton).toBeInTheDocument();

    const dropdownMenu = toggleButton?.nextElementSibling;
    
    // Спочатку має бути закрито (клас opacity-0)
    expect(dropdownMenu).toHaveClass('opacity-0');

    // Клікаємо - відкриваємо
    fireEvent.click(toggleButton!);
    expect(dropdownMenu).toHaveClass('opacity-100');

    // Клікаємо знову - закриваємо
    fireEvent.click(toggleButton!);
    expect(dropdownMenu).toHaveClass('opacity-0');
  });

  test('should call onChange and close dropdown when an option is clicked', () => {
    render(
      <BaseSortDropdown 
        options={mockOptions} 
        value="rating" 
        onChange={mockOnChange} 
      />
    );

    const toggleButton = screen.getByText('Top Rated').closest('button');
    const dropdownMenu = toggleButton?.nextElementSibling;

    fireEvent.click(toggleButton!);

    const optionToSelect = screen.getByText('Price: Low to High');
    fireEvent.click(optionToSelect);

    expect(mockOnChange).toHaveBeenCalledWith('price_asc');

    expect(dropdownMenu).toHaveClass('opacity-0');
  });

  test('should close dropdown when clicking outside', () => {
    render(
      <div>
        <div data-testid="outside">Outside Click Area</div>
        <BaseSortDropdown 
          options={mockOptions} 
          value="rating" 
          onChange={mockOnChange} 
        />
      </div>
    );

    const toggleButton = screen.getByText('Top Rated').closest('button');
    const dropdownMenu = toggleButton?.nextElementSibling;
    const outsideElement = screen.getByTestId('outside');

    fireEvent.click(toggleButton!);
    expect(dropdownMenu).toHaveClass('opacity-100');

    fireEvent.click(outsideElement);

    expect(dropdownMenu).toHaveClass('opacity-0');
  });
});
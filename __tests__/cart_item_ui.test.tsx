import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';
import { CartItemUI, CartItemType } from '../src/Components/Cart/cart_item_ui';
import '@testing-library/jest-dom';

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />
}));

describe('CartItemUI Interactions', () => {
  const mockItem: CartItemType = {
    id: 'mock_avocado_01',
    title: 'Avocado',
    image: '/avocado.jpg',
    rating: '4.8',
    description: 'Fresh avocado perfect for toast.',
    quantity: '1 pc',
    nutrition: {
      calories: '160 kcal',
      carbs: '8.5 g',
      fats: '14.7 g',
      protein: '2 g',
      fiber: '6.7 g',
      sugar: '0.7 g'
    },
    offers: [
      {
        store_id: 's_test',
        store_name: 'Test Store',
        is_in_stock: true,
        pricing: {
          current_price: 2.00,
          regular_price: 2.50,
          discount_percent: 20
        }
      }
    ],
    cartQuantity: 1
  };

  test('calls onIncrease, onDecrease, and onRemove when buttons are clicked', () => {
    const onIncrease = vi.fn();
    const onDecrease = vi.fn();
    const onRemove = vi.fn();
    const onClick = vi.fn(); 

    render(
      <CartItemUI 
        item={mockItem} 
        onIncrease={onIncrease} 
        onDecrease={onDecrease} 
        onRemove={onRemove} 
        onClick={onClick} 
      />
    );

    const buttons = screen.getAllByRole('button');
    
    const removeBtn = buttons[0];
    const decreaseBtn = buttons[1];
    const increaseBtn = buttons[2];

    fireEvent.click(increaseBtn);
    expect(onIncrease).toHaveBeenCalledTimes(1);

    fireEvent.click(decreaseBtn);
    expect(onDecrease).toHaveBeenCalledTimes(1);

    fireEvent.click(removeBtn);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
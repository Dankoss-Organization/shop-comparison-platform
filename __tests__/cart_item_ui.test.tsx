import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';
import { CartItemUI } from '../src/Components/Cart/cart_item_ui';
import '@testing-library/jest-dom';

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />
}));

describe('CartItemUI Interactions', () => {
  const mockItem = {
    title: 'Avocado',
    price: '$2.00',
    image: '/avocado.jpg',
    quantity: 1
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
import { render, screen, fireEvent, act } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';
import { CheckoutButton } from '../src/Components/cart/CheckoutButton';
import '@testing-library/jest-dom';

describe('CheckoutButton UI Logic', () => {
  test('should transition through states on click', async () => {
    vi.useFakeTimers(); 
    
    render(<CheckoutButton />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/PLACE ORDER/i);

    fireEvent.click(button);

    expect(button).toHaveTextContent(/PROCESSING/i);
    expect(button).toBeDisabled();

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    expect(button).toHaveTextContent(/ORDER PLACED!/i);
    
    vi.useRealTimers();
  });
});
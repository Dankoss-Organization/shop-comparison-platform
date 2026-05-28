import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { ChainIcon, Connection } from '../src/Components/UI/icon_ui'; 
import '@testing-library/jest-dom';

vi.mock('next/image', () => ({
  default: (props: any) => {
    return <img {...props} data-testid="next-image" />;
  },
}));

describe('ChainIcon Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render children correctly', () => {
    render(
      <ChainIcon>
        <span data-testid="test-child">Icon</span>
      </ChainIcon>
    );

    const child = screen.getByTestId('test-child');
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent('Icon');
  });

  test('should call onClick handler when clicked', () => {
    const mockOnClick = vi.fn();
    render(
      <ChainIcon onClick={mockOnClick}>
        <span>Icon</span>
      </ChainIcon>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('should apply custom className', () => {
    render(
      <ChainIcon className="custom-test-class">
        <span>Icon</span>
      </ChainIcon>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-test-class');
    expect(button).toHaveClass('rounded-full'); 
  });

  test('should apply group-hover:scale-110 by default (stableContent = false)', () => {
    render(
      <ChainIcon>
        <span>Icon</span>
      </ChainIcon>
    );

    const button = screen.getByRole('button');
    const innerSpan = button.querySelector('span.transition-transform');
    
    expect(innerSpan).toHaveClass('group-hover:scale-110');
  });

  test('should NOT apply group-hover:scale-110 when stableContent is true', () => {
    render(
      <ChainIcon stableContent={true}>
        <span>Icon</span>
      </ChainIcon>
    );

    const button = screen.getByRole('button');
    const innerSpan = button.querySelector('span.transition-transform');
    
    expect(innerSpan).not.toHaveClass('group-hover:scale-110');
  });
});

describe('Connection Component', () => {
  test('should render next/image with correct src and alt', () => {
    render(<Connection />);
    
    const image = screen.getByTestId('next-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/connection.svg');
    expect(image).toHaveAttribute('alt', 'connection link');
  });

  test('should apply horizontal styling by default', () => {
    render(<Connection />);
    
    const container = screen.getByTestId('next-image').parentElement;
    const image = screen.getByTestId('next-image');

    expect(container).toHaveClass('mx-[-4px]');
    expect(container).not.toHaveClass('h-[36px]');

    expect(image).not.toHaveClass('rotate-90');
  });

  test('should apply vertical styling when vertical prop is true', () => {
    render(<Connection vertical={true} />);
    
    const container = screen.getByTestId('next-image').parentElement;
    const image = screen.getByTestId('next-image');

    expect(container).toHaveClass('h-[36px]');
    expect(container).toHaveClass('w-[45px]');
    expect(container).not.toHaveClass('mx-[-4px]');
    
    expect(image).toHaveClass('rotate-90');
  });
});
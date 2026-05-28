import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import ThemeToggle from '../src/Components/UI/theme_toggle'; 
import '@testing-library/jest-dom';

let currentTheme = 'light';
const mockSetTheme = vi.fn();

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: currentTheme,
    setTheme: mockSetTheme,
  }),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: any) => (
      <div className={className} data-testid="motion-div">
        {children}
      </div>
    ),
  },
}));


describe('ThemeToggle Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    currentTheme = 'light'; 
  });

  test('should render the toggle button after mounting', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button', { name: /Toggle theme/i });
    expect(button).toBeInTheDocument();
    
    const icons = screen.getAllByTestId('motion-div');
    expect(icons).toHaveLength(2);
  });

  test('should call setTheme with "dark" when clicked in light theme', () => {
    currentTheme = 'light'; 
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button', { name: /Toggle theme/i });
    fireEvent.click(button);
    
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  test('should call setTheme with "light" when clicked in dark theme', () => {
    currentTheme = 'dark'; 
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button', { name: /Toggle theme/i });
    fireEvent.click(button);
    
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });
});
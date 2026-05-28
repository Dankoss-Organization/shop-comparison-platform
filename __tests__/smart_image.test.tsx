import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import SmartImage from '../src/Components/UI/smart_image'; 
import '@testing-library/jest-dom';

describe('SmartImage Component', () => {
  test('should render image with correct src and alt attributes', () => {
    render(<SmartImage src="/test-image.jpg" alt="Beautiful landscape" />);
    
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test-image.jpg');
    expect(img).toHaveAttribute('alt', 'Beautiful landscape');
  });

  test('should apply native lazy loading', () => {
    render(<SmartImage src="/test-image.jpg" alt="Test" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  test('should apply custom className to the wrapper div along with default classes', () => {
    const { container } = render(
      <SmartImage src="/test-image.jpg" alt="Test" className="my-custom-class" />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('my-custom-class');
    expect(wrapper).toHaveClass('bg-bg-elevated'); 
    expect(wrapper).toHaveClass('relative'); 
  });

  test('should have the required animation classes on the img tag', () => {
    render(<SmartImage src="/test-image.jpg" alt="Test" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveClass('group-hover:scale-[1.05]');
    expect(img).toHaveClass('transition-transform');
  });
});
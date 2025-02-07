import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '@/components/Cart';

describe('Shopping Cart', () => {
  it('renders an empty cart message', () => {
    render(<Cart />);
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
  });

  it('adds items to the cart', () => {
    render(<Cart />);
    
    const addToCartButton = screen.getByTestId('add-to-cart-btn');
    fireEvent.click(addToCartButton);

    expect(screen.getByTestId('cart-items')).toBeInTheDocument();
  });
});

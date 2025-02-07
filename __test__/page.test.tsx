import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('Home Page', () => {
  it('renders the marketplace heading', () => {
    render(<HomePage />);
    expect(screen.getByText(/Marketplace/i)).toBeInTheDocument();
  });

  it('fetches and displays products', async () => {
    render(<HomePage />);
    
    // Mock API call and check if products appear
    const productCards = await screen.findAllByTestId('product-card');
    expect(productCards.length).toBeGreaterThan(0);
  });
});

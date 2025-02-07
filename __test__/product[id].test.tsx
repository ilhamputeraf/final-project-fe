import { render, screen } from '@testing-library/react';
import ProductPage from '@/app/product/[id]/page';

describe('Product Details Page', () => {
  it('renders product details', async () => {
    render(<ProductPage params={{ id: '1' }} />);
    
    expect(await screen.findByText(/Product Name/i)).toBeInTheDocument();
    expect(await screen.findByText(/Price:/i)).toBeInTheDocument();
  });
});

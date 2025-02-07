import { render, screen } from '@testing-library/react';
import AdminPage from '@/app/admin/page';

describe('Admin Page', () => {
  it('renders the Admin Panel heading', () => {
    render(<AdminPage />);
    expect(screen.getByText(/Admin Panel/i)).toBeInTheDocument();
  });

  it('displays a list of products', async () => {
    render(<AdminPage />);
    
    // Assuming products are fetched and displayed
    const productList = await screen.findByTestId('product-list');
    expect(productList).toBeInTheDocument();
  });
});

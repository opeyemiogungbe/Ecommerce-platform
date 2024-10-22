import React from 'react'; // Ensure React is imported
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Product List heading', () => {
  render(<App />);
  // Look for the 'Product List' heading instead
  const headingElement = screen.getByText(/Product List/i);
  expect(headingElement).toBeInTheDocument();
});

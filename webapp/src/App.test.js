import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// ✅ Correctly mock axios.get to return a Promise
jest.mock('axios');
import axios from 'axios';


test('renders store heading', async () => {
  axios.get.mockResolvedValue({ data: [] });

  render(<App />);
  const heading = await screen.findByText(/CittiTech Store/i);
  expect(heading).toBeInTheDocument();
});
test('renders product grid', async () => {
  axios.get.mockResolvedValue({
    data: [
      { id: 1, name: 'Product 1', price: 1000 },
      { id: 2, name: 'Product 2', price: 2000 },
    ],
  });

  render(<App />);
  const product1 = await screen.findByText(/Product 1/i);
  const product2 = await screen.findByText(/Product 2/i);
  
  expect(product1).toBeInTheDocument();
  expect(product2).toBeInTheDocument();
});
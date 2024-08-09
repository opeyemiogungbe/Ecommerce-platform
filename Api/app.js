// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
// Add your routes for handling e-commerce operations here
// Example routes for e-commerce operations

app.get('/products', (req, res) => {
  // Logic to fetch products from database
  res.json({ products: [...] });
});

app.post('/cart/add', (req, res) => {
  const { productId, quantity } = req.body;
  // Logic to add product to cart
  res.json({ message: 'Product added to cart' });
});

app.post('/orders', (req, res) => {
  const { cart, paymentInfo } = req.body;
  // Logic to process order
  res.json({ message: 'Order processed successfully' });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


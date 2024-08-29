const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://opeyf:Pawpaw3999@cluster0.nk19h.mongodb.net/ecommerce_platform?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Basic Routes for E-Commerce
app.get('/', (req, res) => {
  res.send('Welcome to the E-Commerce API!');
});

// Example product route (CRUD operations can be added here)
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String
});

const Product = mongoose.model('Product', ProductSchema);

// Create a new product
app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).send(product);
});

// Get all products
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// Get product by ID
app.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).send('Product not found');
  }
  res.send(product);
});

// Update a product
app.put('/products/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) {
    return res.status(404).send('Product not found');
  }
  res.send(product);
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).send('Product not found');
  }
  res.send('Product deleted');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

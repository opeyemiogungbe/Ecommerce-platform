import React from 'react'; // Add this import
import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/products`)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products', error));
  }, []);

  return (
    <div className="container">
      <header>
        <h1>CittiTech Store</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <main>
        <h2>Our Products</h2>
        <div className="product-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <h3>{product.name}</h3>
              <p>₦{product.price || "N/A"}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>&copy; 2025 CittiTech. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;


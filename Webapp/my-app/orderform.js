// OrderForm.js
import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend-api.com/orders', {
        productId,
        quantity,
      });
      setMessage('Order placed successfully');
    } catch (error) {
      setMessage('Error placing order');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={productId} onChange={(e) => setProductId(e.target.value)}>
        <option value="">Select a product</option>
        { /* Populate the dropdown with products */}
      </select>
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button type="submit">Place Order</button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default OrderForm;


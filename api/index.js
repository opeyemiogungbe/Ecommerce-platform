require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));


// Define your routes
app.get('/', (req, res) => {
    res.send("Backend API is live 🎉");
});

app.get('/products', (req, res) => {
    res.status(200).json([{ id: 1, name: 'Product 1' }]); // Example response
});

// Export the app instance
module.exports = app;

// Start the server only if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`API running on port ${PORT}`);
    });
}
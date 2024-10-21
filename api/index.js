const express = require('express');
const app = express();
const PORT = 3000;

// Define your routes
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
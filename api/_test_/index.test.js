const request = require('supertest');
const app = require('../index'); // Ensure this points to your main app file

describe('GET /products', () => {
    it('should return a list of products', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

const mongoose = require('mongoose');

afterAll(async () => {
  await mongoose.connection.close();
});

const request = require('supertest');
const app = require('../index');

it('GET /products should return a list of products', async () => {
  const res = await request(app).get('/products');
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
});
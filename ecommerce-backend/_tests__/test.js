// Import the function to be tested
const add = (a, b) => a + b; // Example function to test

// Basic Jest test
test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);  // Expect the result to be 3
});

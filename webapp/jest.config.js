module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "jsdom", // Necessary for React testing
  transformIgnorePatterns: [
    "/node_modules/(?!axios)" // Transpile axios if needed
  ],
};

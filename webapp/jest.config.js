module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "/node_modules/(?!axios)",
  ],
  testPathIgnorePatterns: [
    "/lib/", // Ignore the 'lib' folder for tests
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testMatch: [
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
  moduleFileExtensions: ["js", "jsx"], // Make sure Jest understands both JS and JSX files
};

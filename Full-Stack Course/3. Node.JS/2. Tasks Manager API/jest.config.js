/** @type {import('jest').Config} */
const config = {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/**/*.test.ts"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  globalSetup: "<rootDir>/src/test-setup.ts",
  globalTeardown: "<rootDir>/src/test-setup.ts",
  setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
  testTimeout: 30000
};

module.exports = config;


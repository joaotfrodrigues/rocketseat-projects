import type { Config } from 'jest';

const config: Config = {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  testMatch: [
    "<rootDir>/src/**/*.test.ts"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  preset: "ts-jest",
  globalTeardown: "<rootDir>/src/tests/teardown.ts"
};

export default config;

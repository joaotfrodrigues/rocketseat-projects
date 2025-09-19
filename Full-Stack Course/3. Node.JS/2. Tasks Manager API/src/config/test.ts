export const testConfig = {
  database: {
    url: 'postgresql://postgres:postgres@localhost:5433/tasks_manager_test'
  },
  jwt: {
    secret: 'test-secret-key-for-testing-only'
  },
  server: {
    port: 3001
  }
};

// Set environment variables for tests
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = testConfig.database.url;
process.env.JWT_SECRET = testConfig.jwt.secret; 
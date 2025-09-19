import { setupTestDatabase, teardownTestDatabase } from '../scripts/setup-test-db';
import './config/test';

// Global setup - runs once before all tests
export async function globalSetup() {
  console.log('🔧 Setting up test environment...');
  await setupTestDatabase();
}

// Global teardown - runs once after all tests
export async function globalTeardown() {
  console.log('🧹 Cleaning up test environment...');
  await teardownTestDatabase();
}

// Setup before each test file
export async function setupFilesAfterEnv() {
  // This function runs before each test file
  console.log('📝 Test file setup complete');
} 
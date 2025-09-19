const { execSync } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

const TEST_DB_URL = 'postgresql://postgres:postgres@localhost:5433/tasks_manager_test';

async function setupTestDatabase() {
  console.log('🚀 Setting up test database...');

  try {
    // Check if Docker is running
    try {
      execSync('docker --version', { stdio: 'ignore' });
    } catch (error) {
      console.error('❌ Docker is not running. Please start Docker and try again.');
      process.exit(1);
    }

    // Stop and remove existing test container if it exists
    try {
      execSync('docker-compose -f docker-compose.test.yml down -v', { stdio: 'ignore' });
    } catch (error) {
      // Container might not exist, which is fine
    }

    // Start the test database
    console.log('📦 Starting test database container...');
    execSync('docker-compose -f docker-compose.test.yml up -d', { stdio: 'inherit' });

    // Wait for the database to be ready
    console.log('⏳ Waiting for database to be ready...');
    let retries = 0;
    const maxRetries = 30;
    
    while (retries < maxRetries) {
      try {
        execSync(`docker exec postgres-test pg_isready -U postgres`, { stdio: 'ignore' });
        console.log('✅ Database is ready!');
        break;
      } catch (error) {
        retries++;
        if (retries >= maxRetries) {
          console.error('❌ Database failed to start within expected time');
          process.exit(1);
        }
        console.log(`⏳ Waiting for database... (${retries}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Set the test database URL
    process.env.DATABASE_URL = TEST_DB_URL;
    process.env.NODE_ENV = 'test';

    // Run Prisma migrations
    console.log('🔄 Running database migrations...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });

    console.log('✅ Test database setup complete!');
  } catch (error) {
    console.error('❌ Error setting up test database:', error.message);
    process.exit(1);
  }
}

async function teardownTestDatabase() {
  console.log('🧹 Cleaning up test database...');
  
  try {
    execSync('docker-compose -f docker-compose.test.yml down -v', { stdio: 'inherit' });
    console.log('✅ Test database cleanup complete!');
  } catch (error) {
    console.error('❌ Error cleaning up test database:', error.message);
  }
}

// Export functions for use in other scripts
module.exports = {
  setupTestDatabase,
  teardownTestDatabase
};

// If this script is run directly
if (require.main === module) {
  const command = process.argv[2];
  
  if (command === 'setup') {
    setupTestDatabase();
  } else if (command === 'teardown') {
    teardownTestDatabase();
  } else {
    console.log('Usage: node scripts/setup-test-db.js [setup|teardown]');
    process.exit(1);
  }
} 
/**
 * Jest Configuration
 * Test configuration for Sufrah Restaurant Theme
 *
 * @package Sufrah Restaurant Theme
 * @version 1.0.0
 */

module.exports = {
  // Test environment
  testEnvironment: 'jsdom',

  // Root directory for tests
  rootDir: '.',

  // Test match patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js'
  ],

  // Ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/public/',
    '/tamplate/'
  ],

  // Module paths
  modulePaths: ['<rootDir>'],

  // Module name mapper (for handling imports)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/tests/__mocks__/fileMock.js'
  },

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

  // Transform files with babel-jest
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },

  // Coverage configuration
  collectCoverageFrom: [
    'src/assets/js/**/*.js',
    '!src/assets/js/**/*.min.js',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],

  coverageDirectory: 'coverage',

  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov',
    'json'
  ],

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },

  // Verbose output
  verbose: true,

  // Clear mocks between tests
  clearMocks: true,

  // Reset mocks between tests
  resetMocks: true,

  // Restore mocks between tests
  restoreMocks: true,

  // Max workers (parallel execution)
  maxWorkers: '50%',

  // Test timeout (milliseconds)
  testTimeout: 10000,

  // Globals
  globals: {
    'NODE_ENV': 'test'
  },

  // Module file extensions
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
    'node'
  ],

  // Error on deprecated APIs
  errorOnDeprecated: true,

  // Notify mode (optional - can be enabled for local dev)
  notify: false,

  // Bail after first failure (optional)
  bail: false
};

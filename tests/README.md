# Sufrah Testing Guide

## Quick Start

```bash
# Install dependencies (if not already done)
pnpm install

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

---

## Test Structure

```
tests/
├── integration/          # Integration tests
│   ├── restaurant-systems.test.js   # Main system tests
│   ├── edge-cases.test.js          # Edge case scenarios
│   └── performance.test.js         # Performance benchmarks
├── helpers/             # Test utilities
│   └── test-utils.js   # Helper functions and mocks
├── __mocks__/          # Mock files
│   ├── styleMock.js    # CSS import mock
│   └── fileMock.js     # Image import mock
├── setup.js            # Global test setup
├── TEST-RESULTS.md     # Latest test results
└── README.md          # This file
```

---

## Writing Tests

### Basic Test Structure

```javascript
import { createTestProduct, createMockSalla } from '../helpers/test-utils.js';

describe('My Feature', () => {
  beforeEach(() => {
    // Setup before each test
    global.salla = createMockSalla();
  });

  test('should do something', () => {
    // Arrange
    const product = createTestProduct({ basePrice: 50 });

    // Act
    // ... perform actions

    // Assert
    expect(something).toBe(expected);
  });
});
```

### Using Test Utilities

```javascript
import {
  createTestProduct,
  createMockSalla,
  createMockZones,
  simulateRadioSelect,
  waitFor,
  cleanupDOM
} from '../helpers/test-utils.js';

// Create test product with modifiers
const product = createTestProduct({
  id: '123',
  basePrice: 50,
  sizeRequired: true,
  sizes: [
    { id: 'small', name: 'Small', price: 0 },
    { id: 'large', name: 'Large', price: 10 }
  ]
});

// Simulate user interaction
const radio = product.querySelector('input[value="large"]');
simulateRadioSelect(radio);

// Wait for async operation
await waitFor(() => someCondition === true);

// Cleanup
cleanupDOM();
```

---

## Available Test Commands

### Basic Commands

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test restaurant-systems

# Run tests matching pattern
pnpm test --testNamePattern="Modifiers"

# Run only failed tests from last run
pnpm test --onlyFailures
```

### Watch Mode

```bash
# Run tests in watch mode (re-runs on file changes)
pnpm test:watch

# In watch mode, press:
# - a: Run all tests
# - p: Filter by filename
# - t: Filter by test name
# - q: Quit watch mode
```

### Coverage

```bash
# Generate coverage report
pnpm test:coverage

# View coverage report
# Open: coverage/lcov-report/index.html
```

### Verbose Output

```bash
# Show detailed test output
pnpm test:verbose

# Show only specific test file verbosely
pnpm test:verbose restaurant-systems
```

### CI Mode

```bash
# Run tests in CI mode (used in CI/CD pipelines)
pnpm test:ci
```

---

## Test Categories

### 1. Integration Tests

Test how different systems work together:
- Modifiers + Cart
- Delivery Zones + Cart Total
- Scheduling + Business Hours
- Complete Order Flow

### 2. Edge Case Tests

Test unusual scenarios:
- Missing/invalid data
- Boundary conditions
- Network errors
- Storage errors
- Race conditions
- Memory leaks

### 3. Performance Tests

Test system performance:
- Initialization speed
- Calculation performance
- Validation speed
- DOM updates
- Cache efficiency

---

## Mocking

### Salla SDK Mock

```javascript
import { createMockSalla } from '../helpers/test-utils.js';

global.salla = createMockSalla();

// Now you can test Salla interactions:
await salla.cart.addItem({ id: 1, quantity: 1 });
expect(salla.notify.success).toHaveBeenCalled();
```

### localStorage Mock

```javascript
// localStorage is automatically mocked in tests
localStorage.setItem('key', 'value');
expect(localStorage.getItem('key')).toBe('value');

// Clear after test
localStorage.clear();
```

### DOM Elements

```javascript
import { createTestProduct } from '../helpers/test-utils.js';

const product = createTestProduct({
  id: '123',
  basePrice: 50,
  hasModifiers: true
});

// Product element is now in the DOM
expect(product).toBeInTheDocument();
```

---

## Debugging Tests

### Using console.log

```javascript
test('my test', () => {
  const value = calculateSomething();
  console.log('Calculated value:', value);
  expect(value).toBe(42);
});
```

### Using debugger

```javascript
test('my test', () => {
  const value = calculateSomething();
  debugger; // Execution will pause here
  expect(value).toBe(42);
});

// Run with Node debugger:
// node --inspect-brk node_modules/.bin/jest --runInBand
```

### Isolating Tests

```javascript
// Run only this test
test.only('my specific test', () => {
  // ...
});

// Skip this test
test.skip('test to skip', () => {
  // ...
});
```

---

## Coverage Goals

| Metric | Target | Current |
|--------|--------|---------|
| Branches | 70% | ~28% |
| Functions | 70% | ~28% |
| Lines | 70% | ~28% |
| Statements | 70% | ~28% |

---

## Common Issues

### Issue: "Cannot find module"

**Solution:** Check import paths. Jest resolves from project root.

```javascript
// ✅ Correct
import ModifiersSystem from '../../src/assets/js/restaurant/modifiers.js';

// ❌ Incorrect
import ModifiersSystem from 'src/assets/js/restaurant/modifiers.js';
```

### Issue: "Container not found" warnings

**Solution:** Create DOM elements before initializing systems.

```javascript
// Create container first
const container = document.createElement('div');
container.setAttribute('data-delivery-zones', '');
document.body.appendChild(container);

// Then initialize system
const zones = new DeliveryZonesSystem();
```

### Issue: Event simulation not working

**Solution:** Use helper functions from test-utils.js

```javascript
import { simulateRadioSelect } from '../helpers/test-utils.js';

const radio = document.querySelector('input[type="radio"]');
simulateRadioSelect(radio); // ✅ Works

// Instead of:
radio.click(); // ❌ May not trigger all listeners
```

---

## Best Practices

### 1. Clean Up After Tests

```javascript
afterEach(() => {
  // Clean DOM
  document.body.innerHTML = '';

  // Clear storage
  localStorage.clear();
  sessionStorage.clear();

  // Clear mocks
  jest.clearAllMocks();
});
```

### 2. Use Descriptive Test Names

```javascript
// ✅ Good
test('should calculate total price including size and extras', () => {});

// ❌ Bad
test('calculates price', () => {});
```

### 3. Arrange-Act-Assert Pattern

```javascript
test('should add extra to total', () => {
  // Arrange
  const product = createTestProduct({ basePrice: 50 });
  const modifiers = new ModifiersSystem(product);

  // Act
  modifiers.addExtra({ id: 'cheese', price: 5 });

  // Assert
  expect(modifiers.calculateTotal()).toBe(55);
});
```

### 4. Test One Thing at a Time

```javascript
// ✅ Good - Tests one behavior
test('should validate required size selection', () => {
  const modifiers = new ModifiersSystem(product);
  const validation = modifiers.validate();
  expect(validation.valid).toBe(false);
});

// ❌ Bad - Tests multiple behaviors
test('should validate and calculate and format', () => {
  // Too much in one test
});
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test:ci
      - uses: codecov/codecov-action@v2
        with:
          files: ./coverage/lcov.info
```

---

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Test Results Report](./TEST-RESULTS.md)

---

## Support

For questions or issues with tests:
1. Check [TEST-RESULTS.md](./TEST-RESULTS.md) for known issues
2. Review test utilities in `helpers/test-utils.js`
3. Check Jest documentation
4. Ask the team

---

**Last Updated:** 2026-03-12
**Framework:** Jest 30.3.0
**Status:** ✅ Infrastructure Ready

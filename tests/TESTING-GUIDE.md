# Testing Guide - Restaurant Systems
## Comprehensive Testing Documentation

**Project:** Sufrah Restaurant Theme
**Version:** 1.0.0
**Last Updated:** 2026-03-12

---

## 📚 Table of Contents

1. [Overview](#overview)
2. [Test Structure](#test-structure)
3. [Running Tests](#running-tests)
4. [Test Categories](#test-categories)
5. [Writing Tests](#writing-tests)
6. [Test Utilities](#test-utilities)
7. [Coverage Goals](#coverage-goals)
8. [Continuous Integration](#continuous-integration)
9. [Troubleshooting](#troubleshooting)

---

## Overview

This guide covers all testing for the Sufrah restaurant systems, including:

- **Modifiers System** - Product customization
- **Delivery Zones System** - Zone selection and validation
- **Order Scheduling System** - ASAP and scheduled delivery
- **Business Hours System** - Open/closed status

### Testing Philosophy

Our testing approach follows these principles:

1. **Comprehensive Coverage** - Test all features and edge cases
2. **Fast Execution** - Tests should run quickly
3. **Isolated Tests** - Each test is independent
4. **Clear Assertions** - Tests are easy to understand
5. **Real-World Scenarios** - Tests reflect actual usage

---

## Test Structure

```
tests/
├── integration/              # Integration tests
│   ├── restaurant-systems.test.js    # Main integration suite
│   ├── edge-cases.test.js            # Edge cases and errors
│   └── performance.test.js           # Performance tests
│
├── helpers/                  # Test utilities
│   └── test-utils.js         # Shared helper functions
│
├── INTEGRATION-TESTS-CHECKLIST.md   # Manual testing checklist
└── TESTING-GUIDE.md          # This file
```

### Test Files

| File | Purpose | Test Count |
|------|---------|------------|
| `restaurant-systems.test.js` | Core integration tests | ~25 tests |
| `edge-cases.test.js` | Edge cases and error handling | ~40 tests |
| `performance.test.js` | Performance benchmarks | ~30 tests |
| **Total** | | **~95 automated tests** |

---

## Running Tests

### Prerequisites

```bash
# Install dependencies
npm install

# Install Jest (if not already installed)
npm install --save-dev jest @babel/preset-env
```

### Jest Configuration

Create or update `jest.config.js`:

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  collectCoverageFrom: [
    'src/assets/js/restaurant/**/*.js',
    '!src/assets/js/restaurant/**/*.test.js'
  ],
  coverageThresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Babel Configuration

Create or update `.babelrc`:

```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
```

### Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test restaurant-systems.test.js

# Run tests with coverage
npm test -- --coverage

# Run tests matching pattern
npm test -- --testNamePattern="Modifiers"

# Run only integration tests
npm test tests/integration

# Run only performance tests
npm test performance.test.js

# Run tests verbosely
npm test -- --verbose

# Run tests with debugging
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Package.json Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:integration": "jest tests/integration",
    "test:performance": "jest performance.test.js",
    "test:verbose": "jest --verbose",
    "test:debug": "node --inspect-brk node_modules/.bin/jest --runInBand"
  }
}
```

---

## Test Categories

### 1. Integration Tests

**File:** `tests/integration/restaurant-systems.test.js`

**Purpose:** Test systems working together

**Examples:**
- Modifiers + Cart integration
- Delivery zones + Cart total validation
- Scheduling + Business hours integration
- Complete order flow

**Run:** `npm test restaurant-systems.test.js`

### 2. Edge Cases Tests

**File:** `tests/integration/edge-cases.test.js`

**Purpose:** Test unusual scenarios and error conditions

**Categories:**
- Missing or invalid data
- Boundary conditions
- Concurrent operations
- Network errors
- Storage errors
- Input validation
- Race conditions
- Memory leaks
- Internationalization edge cases
- Browser compatibility
- Unusual user behavior

**Run:** `npm test edge-cases.test.js`

### 3. Performance Tests

**File:** `tests/integration/performance.test.js`

**Purpose:** Ensure systems perform efficiently

**Thresholds:**
- Initialization: < 50ms
- Calculation: < 10ms
- Validation: < 20ms
- DOM Update: < 30ms
- Cart Operation: < 500ms
- Time Slot Generation: < 100ms
- Cache Hit: < 1ms

**Run:** `npm test performance.test.js`

### 4. Manual Tests

**File:** `tests/INTEGRATION-TESTS-CHECKLIST.md`

**Purpose:** Human-verified testing scenarios

**Categories:**
- Modifiers system (8 sections)
- Delivery zones (6 sections)
- Order scheduling (7 sections)
- Business hours (6 sections)
- Cross-system integration (5 sections)
- Edge cases (6 sections)
- Responsive & cross-browser (4 sections)
- Accessibility (4 sections)
- Performance (4 sections)
- Internationalization (2 sections)

**Total:** ~150 manual test items

---

## Writing Tests

### Test Structure

Follow this structure for all tests:

```javascript
describe('System Name', () => {

  beforeEach(() => {
    // Setup before each test
    cleanupDOM();
    resetStorage();
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Cleanup after each test
    cleanupDOM();
  });

  describe('Feature Name', () => {

    test('should do something specific', () => {
      // Arrange - Setup test data
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      // Act - Perform action
      modifiers.modifiers.size = { id: 'large', name: 'Large', price: 10 };
      const total = modifiers.calculateTotal();

      // Assert - Verify result
      expect(total).toBe(60);
    });

    test('should handle error case', () => {
      // Test error scenarios
      const modifiers = new ModifiersSystem(document.createElement('div'));

      expect(() => {
        modifiers.someMethod();
      }).not.toThrow();
    });

  });
});
```

### Test Naming Convention

Use descriptive names that explain what is being tested:

✅ **Good:**
```javascript
test('should add product with modifiers to cart', () => {});
test('should validate zone against cart total', () => {});
test('should force scheduled type when restaurant is closed', () => {});
```

❌ **Bad:**
```javascript
test('test 1', () => {});
test('modifiers work', () => {});
test('cart', () => {});
```

### Assertion Examples

```javascript
// Equality
expect(value).toBe(expected);
expect(value).toEqual(expected);

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeDefined();
expect(value).toBeUndefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(5);
expect(value).toBeGreaterThanOrEqual(3.5);
expect(value).toBeLessThanOrEqual(4.5);
expect(value).toBeCloseTo(0.3);

// Strings
expect(string).toMatch(/pattern/);
expect(string).toContain('substring');

// Arrays
expect(array).toContain(item);
expect(array).toHaveLength(3);

// Objects
expect(object).toHaveProperty('key');
expect(object).toMatchObject({ key: 'value' });

// Functions
expect(fn).toThrow();
expect(fn).toHaveBeenCalled();
expect(fn).toHaveBeenCalledWith(arg1, arg2);
expect(fn).toHaveBeenCalledTimes(3);

// Async
await expect(promise).resolves.toBe(value);
await expect(promise).rejects.toThrow();
```

---

## Test Utilities

### Available Helpers

The `tests/helpers/test-utils.js` file provides many useful utilities:

#### Mock Creation

```javascript
// Mock Salla SDK
const salla = createMockSalla();

// Mock product
const product = createTestProduct({
  id: '123',
  basePrice: 50,
  sizeRequired: true
});

// Mock zones
const zones = createMockZones();

// Mock business hours
const hours = createMockBusinessHours();

// Mock scheduling config
const config = createMockSchedulingConfig();
```

#### DOM Utilities

```javascript
// Wait for condition
await waitFor(() => element.classList.contains('active'));

// Wait for element
const button = await waitForElement('.add-to-cart-btn');

// Simulate events
simulateEvent(element, 'click');
simulateInput(input, 'value');
simulateRadioSelect(radio);
simulateCheckboxToggle(checkbox, true);

// Cleanup
cleanupDOM();
resetStorage();
```

#### Data Utilities

```javascript
// Date/time
const date = createMockDate('14:30');
const dayName = getDayName(date);
const formatted = formatTime(date);

// Currency
const price = formatCurrency(45.99, 'SAR'); // "45.99 SAR"

// Random data
const str = randomString(10);
const num = randomNumber(1, 100);

// Object utilities
const cloned = deepClone(object);
const isEqual = deepEqual(obj1, obj2);
```

#### Performance Utilities

```javascript
// Measure performance
const { result, duration } = await measurePerformance(async () => {
  return someExpensiveOperation();
});

expect(duration).toBeLessThan(100); // < 100ms
```

#### Testing Utilities

```javascript
// Create spy
const spy = createSpy((arg) => {
  return arg * 2;
});

spy(5);
expect(spy.callCount).toBe(1);
expect(spy.calls[0]).toEqual([5]);

// Assert
assert(condition, 'Error message');

// Sleep (for async tests)
await sleep(1000); // Wait 1 second

// Mock cart/order
const cart = createMockCart([
  { id: '1', price: 50, quantity: 2 }
]);

const order = createMockOrder({
  items: cart.items,
  zone: zones[0],
  scheduling: { type: 'asap' }
});
```

---

## Coverage Goals

### Target Coverage

| Metric | Target | Current |
|--------|--------|---------|
| **Statements** | 80% | - |
| **Branches** | 80% | - |
| **Functions** | 80% | - |
| **Lines** | 80% | - |

### Generate Coverage Report

```bash
npm test -- --coverage
```

### View Coverage Report

After running coverage, open:
```
coverage/lcov-report/index.html
```

### Coverage by File

Aim for high coverage on critical files:

| File | Target | Priority |
|------|--------|----------|
| `modifiers.js` | 85%+ | High |
| `delivery-zones.js` | 85%+ | High |
| `scheduling.js` | 85%+ | High |
| `business-hours.js` | 90%+ | High |

### Excluded from Coverage

- Third-party libraries
- Mock files
- Test files
- Configuration files

---

## Continuous Integration

### GitHub Actions Example

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: true
```

### Pre-commit Hook

Create `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run tests before commit
npm test
```

Install husky:
```bash
npm install --save-dev husky
npx husky install
```

---

## Troubleshooting

### Common Issues

#### 1. Tests Failing Due to Missing Salla Mock

**Error:**
```
ReferenceError: salla is not defined
```

**Solution:**
Add mock at top of test file:
```javascript
global.salla = createMockSalla();
```

#### 2. DOM Not Cleaning Up

**Error:**
```
Element already exists in document
```

**Solution:**
Ensure `cleanupDOM()` in `afterEach`:
```javascript
afterEach(() => {
  cleanupDOM();
});
```

#### 3. localStorage/sessionStorage Issues

**Error:**
```
localStorage is not defined
```

**Solution:**
Jest uses jsdom which includes storage. If still failing:
```javascript
beforeEach(() => {
  resetStorage();
});
```

#### 4. Async Tests Timing Out

**Error:**
```
Timeout - Async callback was not invoked within the 5000 ms timeout
```

**Solution:**
Increase timeout or fix async handling:
```javascript
test('async test', async () => {
  await expect(promise).resolves.toBe(value);
}, 10000); // 10 second timeout
```

#### 5. Mock Not Being Called

**Error:**
```
Expected mock to have been called, but it was not called
```

**Solution:**
Ensure mock is set up before test:
```javascript
beforeEach(() => {
  jest.clearAllMocks();
  salla.cart.addItem = jest.fn().mockResolvedValue({ success: true });
});
```

### Debug Tests

#### Use debugger

```javascript
test('debug test', () => {
  debugger; // Breakpoint here
  const result = someFunction();
  expect(result).toBe(expected);
});
```

Run with:
```bash
npm run test:debug
```

Then open Chrome and navigate to `chrome://inspect`

#### Use console.log

```javascript
test('debug with logs', () => {
  console.log('Value:', value);
  console.log('State:', modifiers.modifiers);
  expect(value).toBe(expected);
});
```

#### Use .only and .skip

```javascript
// Run only this test
test.only('focused test', () => {});

// Skip this test
test.skip('skipped test', () => {});

// Run only this suite
describe.only('focused suite', () => {});
```

---

## Best Practices

### 1. Keep Tests Fast

- Avoid unnecessary waits
- Use mocks instead of real API calls
- Clean up after each test

### 2. Make Tests Independent

- Don't rely on test order
- Reset state before each test
- Use unique test data

### 3. Test Behavior, Not Implementation

✅ **Good:**
```javascript
test('should show error when size not selected', () => {
  const validation = modifiers.validate();
  expect(validation.valid).toBe(false);
  expect(validation.errors).toContain('modifiers.size_required');
});
```

❌ **Bad:**
```javascript
test('should set _validated to false', () => {
  modifiers.validate();
  expect(modifiers._validated).toBe(false);
});
```

### 4. Use Descriptive Test Names

Test names should read like documentation:
```javascript
describe('ModifiersSystem', () => {
  describe('calculateTotal', () => {
    test('should include base price', () => {});
    test('should add size price to total', () => {});
    test('should add all extras to total', () => {});
    test('should handle free modifications', () => {});
  });
});
```

### 5. Arrange-Act-Assert Pattern

```javascript
test('example', () => {
  // Arrange - Set up test data
  const product = createTestProduct({ basePrice: 50 });
  const modifiers = new ModifiersSystem(product);

  // Act - Perform the action
  modifiers.modifiers.size = { price: 10 };
  const total = modifiers.calculateTotal();

  // Assert - Verify the result
  expect(total).toBe(60);
});
```

### 6. Test Edge Cases

Always test:
- Empty values
- Null/undefined
- Boundary values (min, max, exact)
- Invalid input
- Error conditions

### 7. Mock External Dependencies

Always mock:
- API calls (Salla SDK)
- Browser APIs (localStorage, fetch)
- Date/time (for consistency)
- Random values

---

## Resources

### Documentation

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/)
- [Salla Developer Docs](https://docs.salla.dev/)

### Internal Docs

- [Components Guide](../docs/COMPONENTS-GUIDE.md)
- [Design System](../docs/DESIGN-SYSTEM.md)
- [Modifiers System Guide](../docs/MODIFIERS-SYSTEM-GUIDE.md)
- [Delivery Zones Guide](../docs/DELIVERY-ZONES-GUIDE.md)

### Test Files

- [Integration Tests](integration/restaurant-systems.test.js)
- [Edge Cases Tests](integration/edge-cases.test.js)
- [Performance Tests](integration/performance.test.js)
- [Test Utilities](helpers/test-utils.js)
- [Manual Checklist](INTEGRATION-TESTS-CHECKLIST.md)

---

## Support

### Getting Help

1. Check this guide first
2. Review test examples
3. Check Jest documentation
4. Ask in team chat
5. Create GitHub issue

### Reporting Issues

When reporting test issues, include:
1. Test file name
2. Test description
3. Error message
4. Steps to reproduce
5. Expected vs actual behavior

---

**Last Updated:** 2026-03-12
**Version:** 1.0.0
**Maintainer:** Agent 04 (Features Engineer)

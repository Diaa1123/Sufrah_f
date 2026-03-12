/**
 * Test Utilities and Helpers
 * Shared utilities for testing restaurant systems
 *
 * @package Sufrah Restaurant Theme
 * @version 1.0.0
 */

/**
 * Mock Salla SDK for testing
 * @returns {Object} Mocked Salla object
 */
export function createMockSalla() {
  return {
    cart: {
      addItem: jest.fn().mockResolvedValue({ success: true, data: { id: '123' } }),
      updateItem: jest.fn().mockResolvedValue({ success: true }),
      removeItem: jest.fn().mockResolvedValue({ success: true }),
      getItems: jest.fn().mockResolvedValue([]),
      getTotal: jest.fn().mockResolvedValue(0),
      update: jest.fn().mockResolvedValue({ success: true }),
      clear: jest.fn().mockResolvedValue({ success: true })
    },
    notify: {
      success: jest.fn(),
      error: jest.fn(),
      warning: jest.fn(),
      info: jest.fn()
    },
    lang: {
      get: jest.fn((key, replacements = {}) => {
        // Simple mock translation
        const translations = {
          'modifiers.size_required': 'الرجاء اختيار الحجم',
          'modifiers.add_to_cart': 'إضافة للسلة',
          'zones.min_order_not_met': 'الحد الأدنى للطلب غير مستوفى',
          'scheduling.asap': 'في أقرب وقت',
          'scheduling.scheduled': 'تحديد موعد',
          'business_hours.open': 'مفتوح',
          'business_hours.closed': 'مغلق'
        };
        return translations[key] || key;
      }),
      locale: 'ar',
      getLocale: jest.fn().mockReturnValue('ar')
    },
    event: {
      cart: {
        updated: {
          listen: jest.fn(),
          dispatch: jest.fn()
        }
      },
      product: {
        selected: {
          listen: jest.fn(),
          dispatch: jest.fn()
        }
      }
    },
    storage: {
      get: jest.fn((key, defaultValue) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
      }),
      set: jest.fn((key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
      }),
      remove: jest.fn((key) => {
        localStorage.removeItem(key);
      })
    },
    api: {
      request: jest.fn().mockResolvedValue({ success: true })
    }
  };
}

/**
 * Create a test product element with modifiers
 * @param {Object} options - Product configuration options
 * @returns {HTMLElement} Product DOM element
 */
export function createTestProduct(options = {}) {
  const {
    id = '123',
    basePrice = 50,
    sizeRequired = false,
    hasModifiers = true,
    sizes = [
      { id: 'small', name: 'Small', price: 0 },
      { id: 'medium', name: 'Medium', price: 5 },
      { id: 'large', name: 'Large', price: 10 }
    ],
    extras = [
      { id: 'cheese', name: 'Cheese', price: 5 },
      { id: 'sauce', name: 'Extra Sauce', price: 3 }
    ],
    modifications = [
      { id: 'no-onions', name: 'No Onions', price: 0 },
      { id: 'extra-spicy', name: 'Extra Spicy', price: 0 }
    ]
  } = options;

  const product = document.createElement('div');
  product.setAttribute('data-product-modifiers', '');
  product.setAttribute('data-product-id', id);
  product.setAttribute('data-base-price', basePrice.toString());
  product.setAttribute('data-size-required', sizeRequired.toString());

  if (hasModifiers) {
    let html = '';

    // Add sizes
    if (sizes.length > 0) {
      html += '<div class="size-options" data-modifier-group="sizes">';
      sizes.forEach(size => {
        html += `
          <label class="size-option">
            <input
              type="radio"
              name="size"
              value="${size.id}"
              data-price="${size.price}"
              data-name="${size.name}">
            <span>${size.name} ${size.price > 0 ? `(+${size.price} SAR)` : ''}</span>
          </label>
        `;
      });
      html += '</div>';
    }

    // Add extras
    if (extras.length > 0) {
      html += '<div class="extras-options" data-modifier-group="extras">';
      extras.forEach(extra => {
        html += `
          <label class="extra-option">
            <input
              type="checkbox"
              name="extras"
              value="${extra.id}"
              data-price="${extra.price}"
              data-name="${extra.name}">
            <span>${extra.name} (+${extra.price} SAR)</span>
          </label>
        `;
      });
      html += '</div>';
    }

    // Add modifications
    if (modifications.length > 0) {
      html += '<div class="modifications-options" data-modifier-group="modifications">';
      modifications.forEach(mod => {
        html += `
          <label class="modification-option">
            <input
              type="checkbox"
              name="modifications"
              value="${mod.id}"
              data-name="${mod.name}">
            <span>${mod.name}</span>
          </label>
        `;
      });
      html += '</div>';
    }

    // Add special instructions
    html += `
      <div class="special-instructions">
        <label for="special-instructions-${id}">Special Instructions</label>
        <textarea
          id="special-instructions-${id}"
          name="special-instructions"
          rows="3"
          maxlength="200"></textarea>
      </div>
    `;

    // Add to cart button
    html += `
      <button
        type="button"
        class="add-to-cart-btn"
        data-action="add-to-cart">
        Add to Cart - <span class="total-price">${basePrice}</span> SAR
      </button>
    `;

    product.innerHTML = html;
  }

  document.body.appendChild(product);
  return product;
}

/**
 * Create delivery zones system with mock data
 * @param {Array} customZones - Custom zones data
 * @returns {Object} Zones configuration
 */
export function createMockZones(customZones = null) {
  return customZones || [
    {
      id: 'zone-downtown',
      name: 'Downtown',
      name_ar: 'وسط المدينة',
      price: 15,
      min_order: 50,
      delivery_time: '30-45',
      enabled: true
    },
    {
      id: 'zone-suburbs',
      name: 'Suburbs',
      name_ar: 'الضواحي',
      price: 25,
      min_order: 75,
      delivery_time: '45-60',
      enabled: true
    },
    {
      id: 'zone-rural',
      name: 'Rural Area',
      name_ar: 'المنطقة الريفية',
      price: 35,
      min_order: 100,
      delivery_time: '60-90',
      enabled: true
    },
    {
      id: 'zone-disabled',
      name: 'Disabled Zone',
      name_ar: 'منطقة معطلة',
      price: 20,
      min_order: 60,
      delivery_time: '40-55',
      enabled: false
    }
  ];
}

/**
 * Create business hours configuration
 * @param {Object} customHours - Custom hours data
 * @returns {Object} Business hours configuration
 */
export function createMockBusinessHours(customHours = null) {
  const defaultHours = {
    saturday: { enabled: true, open: '09:00', close: '23:00' },
    sunday: { enabled: true, open: '09:00', close: '23:00' },
    monday: { enabled: true, open: '09:00', close: '23:00' },
    tuesday: { enabled: true, open: '09:00', close: '23:00' },
    wednesday: { enabled: true, open: '09:00', close: '23:00' },
    thursday: { enabled: true, open: '09:00', close: '23:00' },
    friday: { enabled: false, open: '00:00', close: '00:00' }
  };

  return customHours || defaultHours;
}

/**
 * Create scheduling configuration
 * @param {Object} customConfig - Custom configuration
 * @returns {Object} Scheduling configuration
 */
export function createMockSchedulingConfig(customConfig = null) {
  const defaultConfig = {
    minAdvanceMinutes: 30,
    maxAdvanceDays: 14,
    slotInterval: 30,
    estimatedPrepTime: 20,
    estimatedDeliveryTime: 30,
    allowAsap: true,
    allowScheduled: true
  };

  return { ...defaultConfig, ...customConfig };
}

/**
 * Wait for a condition to be true
 * @param {Function} condition - Function that returns boolean
 * @param {number} timeout - Timeout in milliseconds
 * @param {number} interval - Check interval in milliseconds
 * @returns {Promise} Resolves when condition is true, rejects on timeout
 */
export function waitFor(condition, timeout = 5000, interval = 100) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const check = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout waiting for condition'));
      } else {
        setTimeout(check, interval);
      }
    };

    check();
  });
}

/**
 * Wait for an element to appear in the DOM
 * @param {string} selector - CSS selector
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<HTMLElement>} The found element
 */
export function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver((mutations, obs) => {
      const element = document.querySelector(selector);
      if (element) {
        obs.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element ${selector} not found within ${timeout}ms`));
    }, timeout);
  });
}

/**
 * Simulate user event (click, change, etc.)
 * @param {HTMLElement} element - Target element
 * @param {string} eventType - Event type (click, change, input, etc.)
 * @param {Object} eventData - Additional event data
 */
export function simulateEvent(element, eventType, eventData = {}) {
  const event = new Event(eventType, {
    bubbles: true,
    cancelable: true,
    ...eventData
  });

  Object.keys(eventData).forEach(key => {
    event[key] = eventData[key];
  });

  element.dispatchEvent(event);
}

/**
 * Simulate user input in a text field
 * @param {HTMLElement} input - Input element
 * @param {string} value - Value to set
 */
export function simulateInput(input, value) {
  input.value = value;
  simulateEvent(input, 'input', { target: input });
  simulateEvent(input, 'change', { target: input });
}

/**
 * Simulate radio button selection
 * @param {HTMLElement} radio - Radio input element
 */
export function simulateRadioSelect(radio) {
  radio.checked = true;
  simulateEvent(radio, 'change', { target: radio });
}

/**
 * Simulate checkbox toggle
 * @param {HTMLElement} checkbox - Checkbox input element
 * @param {boolean} checked - Whether to check or uncheck
 */
export function simulateCheckboxToggle(checkbox, checked = true) {
  checkbox.checked = checked;
  simulateEvent(checkbox, 'change', { target: checkbox });
}

/**
 * Clean up DOM after tests
 */
export function cleanupDOM() {
  document.body.innerHTML = '';
}

/**
 * Reset all storage (localStorage, sessionStorage)
 */
export function resetStorage() {
  localStorage.clear();
  sessionStorage.clear();
}

/**
 * Create a mock Date that returns a specific time
 * @param {string} timeString - Time in HH:MM format
 * @returns {Date} Mock date object
 */
export function createMockDate(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

/**
 * Get the day name from a date
 * @param {Date} date - Date object
 * @returns {string} Day name in lowercase (saturday, sunday, etc.)
 */
export function getDayName(date) {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[date.getDay()];
}

/**
 * Format currency for display
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: SAR)
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = 'SAR') {
  return `${amount.toFixed(2)} ${currency}`;
}

/**
 * Format time for display
 * @param {Date} date - Date object
 * @param {boolean} use24Hour - Use 24-hour format (default: true)
 * @returns {string} Formatted time string
 */
export function formatTime(date, use24Hour = true) {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (use24Hour) {
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  } else {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes} ${period}`;
  }
}

/**
 * Generate random string for testing
 * @param {number} length - Length of string
 * @returns {string} Random string
 */
export function randomString(length = 10) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if two objects are deeply equal
 * @param {*} obj1 - First object
 * @param {*} obj2 - Second object
 * @returns {boolean} True if equal
 */
export function deepEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Debounce function for testing
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Create a spy function for testing
 * @param {Function} implementation - Optional implementation
 * @returns {Function} Spy function with call tracking
 */
export function createSpy(implementation = () => {}) {
  const spy = function(...args) {
    spy.calls.push(args);
    spy.callCount++;
    return implementation(...args);
  };

  spy.calls = [];
  spy.callCount = 0;
  spy.reset = () => {
    spy.calls = [];
    spy.callCount = 0;
  };

  return spy;
}

/**
 * Performance measurement helper
 * @param {Function} func - Function to measure
 * @returns {Object} Result with duration and return value
 */
export async function measurePerformance(func) {
  const start = performance.now();
  const result = await func();
  const duration = performance.now() - start;

  return {
    result,
    duration,
    durationMs: Math.round(duration)
  };
}

/**
 * Assert helper for tests
 * @param {boolean} condition - Condition to check
 * @param {string} message - Error message if condition is false
 */
export function assert(condition, message = 'Assertion failed') {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * Create mock cart data
 * @param {Array} items - Cart items
 * @returns {Object} Mock cart object
 */
export function createMockCart(items = []) {
  return {
    items: items,
    subtotal: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    shipping: 0,
    total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
  };
}

/**
 * Create mock order data
 * @param {Object} options - Order options
 * @returns {Object} Mock order object
 */
export function createMockOrder(options = {}) {
  const {
    items = [],
    zone = null,
    scheduling = { type: 'asap' },
    status = 'pending'
  } = options;

  const cart = createMockCart(items);

  return {
    id: randomString(10),
    status,
    items: cart.items,
    subtotal: cart.subtotal,
    shipping: zone ? zone.price : 0,
    total: cart.subtotal + (zone ? zone.price : 0),
    zone: zone,
    scheduling: scheduling,
    createdAt: new Date().toISOString()
  };
}

/**
 * Log test information (for debugging)
 * @param {string} message - Message to log
 * @param {*} data - Additional data to log
 */
export function testLog(message, data = null) {
  if (process.env.NODE_ENV === 'test' && process.env.DEBUG === 'true') {
    console.log(`[TEST] ${message}`, data || '');
  }
}

/**
 * Sleep for specified milliseconds (for async tests)
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after ms
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Export all utilities
export default {
  createMockSalla,
  createTestProduct,
  createMockZones,
  createMockBusinessHours,
  createMockSchedulingConfig,
  waitFor,
  waitForElement,
  simulateEvent,
  simulateInput,
  simulateRadioSelect,
  simulateCheckboxToggle,
  cleanupDOM,
  resetStorage,
  createMockDate,
  getDayName,
  formatCurrency,
  formatTime,
  randomString,
  randomNumber,
  deepClone,
  deepEqual,
  debounce,
  createSpy,
  measurePerformance,
  assert,
  createMockCart,
  createMockOrder,
  testLog,
  sleep
};

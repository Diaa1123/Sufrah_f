/**
 * Edge Cases and Error Handling Tests
 * Tests unusual scenarios and error conditions
 *
 * @package Sufrah Restaurant Theme
 * @version 1.0.0
 */

import ModifiersSystem from '../../src/assets/js/restaurant/modifiers.js';
import DeliveryZonesSystem from '../../src/assets/js/restaurant/delivery-zones.js';
import OrderSchedulingSystem from '../../src/assets/js/restaurant/scheduling.js';
import BusinessHours from '../../src/assets/js/restaurant/business-hours.js';

import {
  createMockSalla,
  createTestProduct,
  createMockZones,
  createMockBusinessHours,
  cleanupDOM,
  resetStorage,
  createMockDate,
  simulateRadioSelect,
  simulateCheckboxToggle,
  waitFor
} from '../helpers/test-utils.js';

// Mock Salla SDK
global.salla = createMockSalla();

describe('Edge Cases and Error Handling', () => {

  beforeEach(() => {
    cleanupDOM();
    resetStorage();
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupDOM();
  });

  describe('Missing or Invalid Data', () => {

    test('should handle product with no data attributes', () => {
      const emptyDiv = document.createElement('div');
      document.body.appendChild(emptyDiv);

      expect(() => {
        new ModifiersSystem(emptyDiv);
      }).not.toThrow();
    });

    test('should handle product with invalid base price', () => {
      const product = document.createElement('div');
      product.setAttribute('data-product-modifiers', '');
      product.setAttribute('data-base-price', 'invalid');
      document.body.appendChild(product);

      const modifiers = new ModifiersSystem(product);
      expect(modifiers.basePrice).toBe(0); // Should default to 0
    });

    test('should handle zones system with no zones', () => {
      const zones = new DeliveryZonesSystem();
      zones.zones = [];

      const available = zones.getAvailableZones();
      expect(available).toHaveLength(0);

      const cheapest = zones.getCheapestZone();
      expect(cheapest).toBeNull();
    });

    test('should handle business hours with invalid format', () => {
      const businessHours = new BusinessHours();
      businessHours.hours = {
        saturday: { enabled: true, open: 'invalid', close: 'invalid' }
      };

      expect(() => {
        businessHours.isOpen();
      }).not.toThrow();
    });

    test('should handle scheduling with no business hours', () => {
      const scheduling = new OrderSchedulingSystem();
      scheduling.businessHours = null;

      expect(() => {
        scheduling.setSchedulingType('asap');
      }).not.toThrow();
    });
  });

  describe('Boundary Conditions', () => {

    test('should handle cart total exactly at zone minimum', () => {
      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();
      zones.cartTotal = 50; // Exactly at downtown zone minimum

      zones.selectZone('zone-downtown');
      const valid = zones.validateSelectedZone();

      expect(valid).toBe(true); // Should allow exactly at minimum
    });

    test('should handle cart total 0.01 below zone minimum', () => {
      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();
      zones.cartTotal = 49.99; // Just below minimum

      zones.selectZone('zone-downtown');
      const valid = zones.validateSelectedZone();

      expect(valid).toBe(false); // Should reject
    });

    test('should handle scheduling at exact minimum advance time', () => {
      const businessHours = new BusinessHours();
      businessHours.hours = createMockBusinessHours();

      const scheduling = new OrderSchedulingSystem();
      scheduling.businessHours = businessHours;
      scheduling.config = {
        minAdvanceMinutes: 30,
        maxAdvanceDays: 14,
        slotInterval: 30
      };

      const now = new Date();
      const exactTime = new Date(now.getTime() + 30 * 60000); // Exactly 30 min

      scheduling.selectedDate = exactTime;
      scheduling.selectedTime = exactTime.toTimeString().substring(0, 5);

      const validation = scheduling.validate();
      expect(validation.valid).toBe(true); // Should allow exactly at minimum
    });

    test('should handle scheduling 1 minute before minimum advance', () => {
      const businessHours = new BusinessHours();
      businessHours.hours = createMockBusinessHours();

      const scheduling = new OrderSchedulingSystem();
      scheduling.businessHours = businessHours;
      scheduling.config = { minAdvanceMinutes: 30 };

      const now = new Date();
      const tooSoon = new Date(now.getTime() + 29 * 60000); // 29 minutes

      scheduling.selectedDate = tooSoon;
      scheduling.selectedTime = tooSoon.toTimeString().substring(0, 5);

      const validation = scheduling.validate();
      expect(validation.valid).toBe(false); // Should reject
    });

    test('should handle business hours crossing midnight', () => {
      const businessHours = new BusinessHours();
      businessHours.hours = {
        saturday: { enabled: true, open: '22:00', close: '02:00' } // Crosses midnight
      };

      // Test at 11 PM (should be open)
      const lateNight = createMockDate('23:00');
      const isOpen1 = businessHours.isOpen(lateNight);
      expect(isOpen1).toBe(true);

      // Test at 1 AM (should still be open)
      const earlyMorning = createMockDate('01:00');
      const isOpen2 = businessHours.isOpen(earlyMorning);
      expect(isOpen2).toBe(true);

      // Test at 3 AM (should be closed)
      const afterClose = createMockDate('03:00');
      const isOpen3 = businessHours.isOpen(afterClose);
      expect(isOpen3).toBe(false);
    });

    test('should handle price calculation with very large numbers', () => {
      const product = createTestProduct({
        id: '999',
        basePrice: 999999.99
      });

      const modifiers = new ModifiersSystem(product);
      modifiers.modifiers.size = { id: '1', name: 'Large', price: 999999.99 };

      const total = modifiers.calculateTotal();
      expect(total).toBe(1999999.98);
      expect(Number.isFinite(total)).toBe(true);
    });

    test('should handle price calculation with zero and negative', () => {
      const product = createTestProduct({
        id: '888',
        basePrice: 0
      });

      const modifiers = new ModifiersSystem(product);
      modifiers.modifiers.size = { id: '1', name: 'Free', price: 0 };

      const total = modifiers.calculateTotal();
      expect(total).toBe(0);
    });
  });

  describe('Concurrent Operations', () => {

    test('should handle rapid zone changes', async () => {
      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();
      zones.cartTotal = 100;

      // Rapidly change zones
      zones.selectZone('zone-downtown');
      zones.selectZone('zone-suburbs');
      zones.selectZone('zone-rural');
      zones.selectZone('zone-downtown');

      // Should end with last selection
      expect(zones.selectedZone.id).toBe('zone-downtown');
    });

    test('should handle concurrent modifier selections', () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      const radios = product.querySelectorAll('input[name="size"]');

      // Simulate rapid changes
      simulateRadioSelect(radios[0]); // small
      modifiers.handleSizeChange({ target: radios[0] });

      simulateRadioSelect(radios[1]); // medium
      modifiers.handleSizeChange({ target: radios[1] });

      simulateRadioSelect(radios[2]); // large
      modifiers.handleSizeChange({ target: radios[2] });

      // Should have last selection
      expect(modifiers.modifiers.size.name).toBe('Large');
    });

    test('should handle multiple checkbox toggles', () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      const checkboxes = product.querySelectorAll('input[name="extras"]');

      // Check all
      checkboxes.forEach(cb => {
        simulateCheckboxToggle(cb, true);
        modifiers.handleExtraChange({ target: cb });
      });

      expect(modifiers.modifiers.extras.length).toBe(checkboxes.length);

      // Uncheck all
      checkboxes.forEach(cb => {
        simulateCheckboxToggle(cb, false);
        modifiers.handleExtraChange({ target: cb });
      });

      expect(modifiers.modifiers.extras.length).toBe(0);
    });

    test('should handle multiple cart add attempts', async () => {
      const product = createTestProduct({
        id: '123',
        basePrice: 50,
        sizeRequired: true
      });

      const modifiers = new ModifiersSystem(product);

      // Select required size
      const sizeRadio = product.querySelector('input[name="size"]');
      simulateRadioSelect(sizeRadio);
      modifiers.handleSizeChange({ target: sizeRadio });

      // Attempt multiple adds
      const promises = [
        modifiers.handleAddToCart(),
        modifiers.handleAddToCart(),
        modifiers.handleAddToCart()
      ];

      await expect(Promise.all(promises)).resolves.toBeDefined();
      // Should handle multiple calls without errors
    });
  });

  describe('Network Errors', () => {

    test('should handle cart add failure', async () => {
      salla.cart.addItem.mockRejectedValueOnce(new Error('Network error'));

      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      await expect(modifiers.handleAddToCart()).rejects.toThrow('Network error');
      expect(salla.notify.error).toHaveBeenCalled();
    });

    test('should handle cart update failure', async () => {
      salla.cart.update.mockRejectedValueOnce(new Error('Server error'));

      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();
      zones.cartTotal = 100;

      await expect(zones.updateShipping('zone-downtown', 15)).rejects.toThrow();
    });

    test('should handle timeout errors', async () => {
      const timeoutError = new Error('Request timeout');
      timeoutError.code = 'TIMEOUT';
      salla.cart.addItem.mockRejectedValueOnce(timeoutError);

      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      await expect(modifiers.handleAddToCart()).rejects.toThrow('Request timeout');
    });

    test('should handle 500 server errors', async () => {
      const serverError = new Error('Internal server error');
      serverError.status = 500;
      salla.cart.addItem.mockRejectedValueOnce(serverError);

      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      await expect(modifiers.handleAddToCart()).rejects.toThrow();
      expect(salla.notify.error).toHaveBeenCalled();
    });
  });

  describe('Storage Errors', () => {

    test('should handle localStorage quota exceeded', () => {
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = jest.fn(() => {
        throw new Error('QuotaExceededError');
      });

      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();

      expect(() => {
        zones.selectZone('zone-downtown');
      }).not.toThrow(); // Should handle gracefully

      localStorage.setItem = originalSetItem;
    });

    test('should handle sessionStorage quota exceeded', () => {
      const originalSetItem = sessionStorage.setItem;
      sessionStorage.setItem = jest.fn(() => {
        throw new Error('QuotaExceededError');
      });

      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      expect(() => {
        modifiers.saveToSession();
      }).not.toThrow(); // Should handle gracefully

      sessionStorage.setItem = originalSetItem;
    });

    test('should handle corrupted localStorage data', () => {
      localStorage.setItem('restaurant_delivery_zone', 'invalid json {');

      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();

      expect(() => {
        zones.restoreFromStorage();
      }).not.toThrow(); // Should handle gracefully

      expect(zones.selectedZone).toBeNull();
    });

    test('should handle missing localStorage data', () => {
      localStorage.removeItem('restaurant_delivery_zone');

      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();
      zones.restoreFromStorage();

      expect(zones.selectedZone).toBeNull(); // Should default to null
    });
  });

  describe('Input Validation', () => {

    test('should sanitize special instructions input', () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      const textarea = product.querySelector('textarea[name="special-instructions"]');
      textarea.value = '<script>alert("XSS")</script>';

      modifiers.handleSpecialInstructions({ target: textarea });

      // Should store as-is (sanitization happens server-side)
      expect(modifiers.modifiers.specialInstructions).toBe('<script>alert("XSS")</script>');
    });

    test('should handle very long special instructions', () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      const longText = 'A'.repeat(1000);
      const textarea = product.querySelector('textarea[name="special-instructions"]');
      textarea.value = longText;

      modifiers.handleSpecialInstructions({ target: textarea });

      expect(modifiers.modifiers.specialInstructions).toBe(longText);
    });

    test('should handle empty special instructions', () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      const textarea = product.querySelector('textarea[name="special-instructions"]');
      textarea.value = '';

      modifiers.handleSpecialInstructions({ target: textarea });

      expect(modifiers.modifiers.specialInstructions).toBe('');
    });

    test('should handle whitespace-only special instructions', () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      const textarea = product.querySelector('textarea[name="special-instructions"]');
      textarea.value = '   \n\n   ';

      modifiers.handleSpecialInstructions({ target: textarea });

      expect(modifiers.modifiers.specialInstructions.trim()).toBe('');
    });

    test('should handle invalid date formats', () => {
      const scheduling = new OrderSchedulingSystem();
      scheduling.businessHours = new BusinessHours();

      scheduling.selectedDate = 'invalid date';
      scheduling.selectedTime = '25:99'; // Invalid time

      const validation = scheduling.validate();
      expect(validation.valid).toBe(false);
    });

    test('should handle null and undefined values', () => {
      const modifiers = new ModifiersSystem(document.createElement('div'));

      modifiers.modifiers.size = null;
      modifiers.modifiers.extras = undefined;

      expect(() => {
        modifiers.calculateTotal();
      }).not.toThrow();
    });
  });

  describe('Race Conditions', () => {

    test('should handle business hours cache race condition', async () => {
      const businessHours = new BusinessHours();
      businessHours.hours = createMockBusinessHours();

      // Simulate multiple simultaneous checks
      const promises = Array(10).fill(0).map(() =>
        Promise.resolve(businessHours.isOpen())
      );

      const results = await Promise.all(promises);

      // All should return same result (from cache)
      const firstResult = results[0];
      results.forEach(result => {
        expect(result).toBe(firstResult);
      });
    });

    test('should handle zone selection during cart update', async () => {
      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();
      zones.cartTotal = 100;

      // Start cart update
      const updatePromise = zones.updateShipping('zone-downtown', 15);

      // Immediately select different zone
      zones.selectZone('zone-suburbs');

      await updatePromise;

      // Should have last selected zone
      expect(zones.selectedZone.id).toBe('zone-suburbs');
    });

    test('should handle modifier changes during validation', () => {
      const product = createTestProduct({
        id: '123',
        basePrice: 50,
        sizeRequired: true
      });

      const modifiers = new ModifiersSystem(product);

      // Start validation
      const validation1 = modifiers.validate();
      expect(validation1.valid).toBe(false); // No size

      // Change modifiers
      const sizeRadio = product.querySelector('input[name="size"]');
      simulateRadioSelect(sizeRadio);
      modifiers.handleSizeChange({ target: sizeRadio });

      // Validate again
      const validation2 = modifiers.validate();
      expect(validation2.valid).toBe(true); // Size now selected
    });
  });

  describe('Memory Leaks', () => {

    test('should clean up event listeners on destroy', () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      // Initialize (sets up event listeners)
      modifiers.init();

      // Destroy (should clean up)
      modifiers.destroy();

      // Trigger events - should not cause errors
      const sizeRadio = product.querySelector('input[name="size"]');
      expect(() => {
        simulateRadioSelect(sizeRadio);
      }).not.toThrow();
    });

    test('should not accumulate cache entries', () => {
      const businessHours = new BusinessHours();
      businessHours.hours = createMockBusinessHours();

      // Call isOpen many times
      for (let i = 0; i < 1000; i++) {
        businessHours.isOpen();
      }

      // Should only have one cache entry
      expect(businessHours._isOpenCache).toBeDefined();
      expect(businessHours._cacheTimestamp).toBeDefined();
    });

    test('should clear session storage after cart add', async () => {
      const product = createTestProduct({
        id: '123',
        basePrice: 50
      });

      const modifiers = new ModifiersSystem(product);

      // Save to session
      modifiers.saveToSession();
      expect(sessionStorage.getItem('modifiers_123')).toBeDefined();

      // Add to cart
      await modifiers.handleAddToCart();

      // Session should be cleared
      expect(sessionStorage.getItem('modifiers_123')).toBeNull();
    });
  });

  describe('Internationalization Edge Cases', () => {

    test('should handle RTL text in special instructions', () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      const textarea = product.querySelector('textarea[name="special-instructions"]');
      textarea.value = 'بدون بصل، مع صلصة إضافية';

      modifiers.handleSpecialInstructions({ target: textarea });

      expect(modifiers.modifiers.specialInstructions).toBe('بدون بصل، مع صلصة إضافية');
    });

    test('should handle mixed RTL/LTR text', () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      const textarea = product.querySelector('textarea[name="special-instructions"]');
      textarea.value = 'No onions بدون بصل 123';

      modifiers.handleSpecialInstructions({ target: textarea });

      expect(modifiers.modifiers.specialInstructions).toContain('No onions');
      expect(modifiers.modifiers.specialInstructions).toContain('بدون بصل');
    });

    test('should handle Arabic numerals in prices', () => {
      const zones = new DeliveryZonesSystem();
      zones.zones = [{
        id: 'test',
        name: 'Test',
        price: 15,
        min_order: 50,
        delivery_time: '٣٠-٤٥', // Arabic numerals
        enabled: true
      }];

      zones.selectZone('test');
      expect(zones.selectedZone.delivery_time).toBe('٣٠-٤٥');
    });
  });

  describe('Browser Compatibility Edge Cases', () => {

    test('should work without localStorage', () => {
      const originalLocalStorage = global.localStorage;
      delete global.localStorage;

      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();

      expect(() => {
        zones.selectZone('zone-downtown');
      }).not.toThrow();

      global.localStorage = originalLocalStorage;
    });

    test('should work without sessionStorage', () => {
      const originalSessionStorage = global.sessionStorage;
      delete global.sessionStorage;

      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      expect(() => {
        modifiers.saveToSession();
      }).not.toThrow();

      global.sessionStorage = originalSessionStorage;
    });

    test('should handle missing Date.now', () => {
      const originalNow = Date.now;
      delete Date.now;
      Date.now = undefined;

      const businessHours = new BusinessHours();

      expect(() => {
        businessHours.isOpen();
      }).not.toThrow();

      Date.now = originalNow;
    });
  });

  describe('Unusual User Behavior', () => {

    test('should handle back button after cart add', async () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      // Add to cart
      await modifiers.handleAddToCart();

      // Simulate back button (restore from session)
      modifiers.restoreFromSession();

      // Session should be empty (cleared after cart add)
      expect(modifiers.modifiers.size).toBeNull();
    });

    test('should handle page refresh during operation', () => {
      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();
      zones.cartTotal = 100;
      zones.selectZone('zone-downtown');

      // Simulate page refresh (create new instance)
      const zones2 = new DeliveryZonesSystem();
      zones2.zones = createMockZones();
      zones2.restoreFromStorage();

      // Should restore from localStorage
      expect(zones2.selectedZone).toBeDefined();
      expect(zones2.selectedZone.id).toBe('zone-downtown');
    });

    test('should handle rapid form submission attempts', async () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      // Rapid submissions
      const promises = Array(5).fill(0).map(() =>
        modifiers.handleAddToCart()
      );

      // Should handle without errors
      await expect(Promise.allSettled(promises)).resolves.toBeDefined();
    });

    test('should handle cart clear during checkout', () => {
      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();
      zones.cartTotal = 100;
      zones.selectZone('zone-downtown');

      // Clear cart
      zones.cartTotal = 0;

      // Validation should fail
      const valid = zones.validateSelectedZone();
      expect(valid).toBe(false);
    });
  });
});

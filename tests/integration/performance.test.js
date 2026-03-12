/**
 * Performance Tests
 * Tests system performance and optimization
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
  measurePerformance,
  simulateRadioSelect,
  simulateCheckboxToggle
} from '../helpers/test-utils.js';

// Mock Salla SDK
global.salla = createMockSalla();

// Performance thresholds (in milliseconds)
const THRESHOLDS = {
  INITIALIZATION: 50,
  CALCULATION: 10,
  VALIDATION: 20,
  DOM_UPDATE: 30,
  CART_OPERATION: 500,
  TIME_SLOT_GENERATION: 100,
  CACHE_HIT: 1
};

describe('Performance Tests', () => {

  beforeEach(() => {
    cleanupDOM();
    resetStorage();
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupDOM();
  });

  describe('Modifiers System Performance', () => {

    test('should initialize quickly', async () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });

      const { duration } = await measurePerformance(() => {
        return new ModifiersSystem(product);
      });

      expect(duration).toBeLessThan(THRESHOLDS.INITIALIZATION);
    });

    test('should calculate total quickly with multiple modifiers', async () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      // Add many extras
      for (let i = 0; i < 20; i++) {
        modifiers.modifiers.extras.push({
          id: `extra${i}`,
          name: `Extra ${i}`,
          price: i + 1
        });
      }

      const { duration } = await measurePerformance(() => {
        return modifiers.calculateTotal();
      });

      expect(duration).toBeLessThan(THRESHOLDS.CALCULATION);
    });

    test('should validate quickly', async () => {
      const product = createTestProduct({
        id: '123',
        basePrice: 50,
        sizeRequired: true
      });

      const modifiers = new ModifiersSystem(product);

      const { duration } = await measurePerformance(() => {
        return modifiers.validate();
      });

      expect(duration).toBeLessThan(THRESHOLDS.VALIDATION);
    });

    test('should handle rapid size changes efficiently', async () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);
      const radios = product.querySelectorAll('input[name="size"]');

      const { duration } = await measurePerformance(() => {
        // Simulate 100 rapid changes
        for (let i = 0; i < 100; i++) {
          const radio = radios[i % radios.length];
          simulateRadioSelect(radio);
          modifiers.handleSizeChange({ target: radio });
        }
      });

      // Should handle 100 changes in reasonable time
      expect(duration).toBeLessThan(100); // 100ms total = 1ms per change
    });

    test('should handle rapid extra changes efficiently', async () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);
      const checkboxes = product.querySelectorAll('input[name="extras"]');

      const { duration } = await measurePerformance(() => {
        // Simulate 100 rapid toggles
        for (let i = 0; i < 100; i++) {
          const checkbox = checkboxes[i % checkboxes.length];
          simulateCheckboxToggle(checkbox, i % 2 === 0);
          modifiers.handleExtraChange({ target: checkbox });
        }
      });

      expect(duration).toBeLessThan(100);
    });

    test('should format cart data quickly', async () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      // Add multiple modifiers
      modifiers.modifiers.size = { id: 'large', name: 'Large', price: 10 };
      modifiers.modifiers.extras = [
        { id: 'cheese', name: 'Cheese', price: 5 },
        { id: 'sauce', name: 'Sauce', price: 3 }
      ];
      modifiers.modifiers.modifications = [
        { id: 'no-onions', name: 'No Onions', price: 0 }
      ];

      const { duration } = await measurePerformance(() => {
        return modifiers.getModifiersForCart();
      });

      expect(duration).toBeLessThan(THRESHOLDS.CALCULATION);
    });

    test('should save to session quickly', async () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      modifiers.modifiers.size = { id: 'large', name: 'Large', price: 10 };
      modifiers.modifiers.extras = Array(10).fill(0).map((_, i) => ({
        id: `extra${i}`,
        name: `Extra ${i}`,
        price: i + 1
      }));

      const { duration } = await measurePerformance(() => {
        modifiers.saveToSession();
      });

      expect(duration).toBeLessThan(THRESHOLDS.DOM_UPDATE);
    });

    test('should restore from session quickly', async () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      // Save first
      modifiers.modifiers.size = { id: 'large', name: 'Large', price: 10 };
      modifiers.saveToSession();

      // Measure restore
      const { duration } = await measurePerformance(() => {
        modifiers.restoreFromSession();
      });

      expect(duration).toBeLessThan(THRESHOLDS.DOM_UPDATE);
    });
  });

  describe('Delivery Zones Performance', () => {

    test('should initialize quickly', async () => {
      const { duration } = await measurePerformance(() => {
        const zones = new DeliveryZonesSystem();
        zones.zones = createMockZones();
        return zones;
      });

      expect(duration).toBeLessThan(THRESHOLDS.INITIALIZATION);
    });

    test('should validate zone quickly', async () => {
      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();
      zones.cartTotal = 100;
      zones.selectZone('zone-downtown');

      const { duration } = await measurePerformance(() => {
        return zones.validateSelectedZone();
      });

      expect(duration).toBeLessThan(THRESHOLDS.VALIDATION);
    });

    test('should filter available zones quickly', async () => {
      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();
      zones.cartTotal = 75;

      const { duration } = await measurePerformance(() => {
        return zones.getAvailableZones();
      });

      expect(duration).toBeLessThan(THRESHOLDS.CALCULATION);
    });

    test('should find cheapest zone quickly', async () => {
      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();
      zones.cartTotal = 100;

      const { duration } = await measurePerformance(() => {
        return zones.getCheapestZone();
      });

      expect(duration).toBeLessThan(THRESHOLDS.CALCULATION);
    });

    test('should find fastest zone quickly', async () => {
      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();
      zones.cartTotal = 100;

      const { duration } = await measurePerformance(() => {
        return zones.getFastestZone();
      });

      expect(duration).toBeLessThan(THRESHOLDS.CALCULATION);
    });

    test('should handle large zone arrays efficiently', async () => {
      const zones = new DeliveryZonesSystem();

      // Create 100 zones
      zones.zones = Array(100).fill(0).map((_, i) => ({
        id: `zone-${i}`,
        name: `Zone ${i}`,
        price: 10 + i,
        min_order: 50 + i * 5,
        delivery_time: '30-45',
        enabled: true
      }));

      zones.cartTotal = 500; // High enough for all zones

      const { duration: filterDuration } = await measurePerformance(() => {
        return zones.getAvailableZones();
      });

      const { duration: cheapestDuration } = await measurePerformance(() => {
        return zones.getCheapestZone();
      });

      const { duration: fastestDuration } = await measurePerformance(() => {
        return zones.getFastestZone();
      });

      // Even with 100 zones, should be fast
      expect(filterDuration).toBeLessThan(20);
      expect(cheapestDuration).toBeLessThan(20);
      expect(fastestDuration).toBeLessThan(20);
    });

    test('should save to localStorage quickly', async () => {
      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();
      zones.selectZone('zone-downtown');

      const { duration } = await measurePerformance(() => {
        zones.saveToStorage();
      });

      expect(duration).toBeLessThan(THRESHOLDS.DOM_UPDATE);
    });
  });

  describe('Scheduling System Performance', () => {

    test('should initialize quickly', async () => {
      const { duration } = await measurePerformance(() => {
        const scheduling = new OrderSchedulingSystem();
        scheduling.businessHours = new BusinessHours();
        return scheduling;
      });

      expect(duration).toBeLessThan(THRESHOLDS.INITIALIZATION);
    });

    test('should generate time slots quickly', async () => {
      const businessHours = new BusinessHours();
      businessHours.hours = createMockBusinessHours();

      const scheduling = new OrderSchedulingSystem();
      scheduling.businessHours = businessHours;
      scheduling.config = {
        minAdvanceMinutes: 30,
        slotInterval: 30
      };

      const { duration } = await measurePerformance(() => {
        scheduling.selectDate(new Date());
      });

      expect(duration).toBeLessThan(THRESHOLDS.TIME_SLOT_GENERATION);
    });

    test('should generate slots with small intervals efficiently', async () => {
      const businessHours = new BusinessHours();
      businessHours.hours = createMockBusinessHours();

      const scheduling = new OrderSchedulingSystem();
      scheduling.businessHours = businessHours;
      scheduling.config = {
        minAdvanceMinutes: 30,
        slotInterval: 15 // Smaller interval = more slots
      };

      const { duration } = await measurePerformance(() => {
        scheduling.selectDate(new Date());
      });

      // Even with 15-min intervals (more slots), should be fast
      expect(duration).toBeLessThan(THRESHOLDS.TIME_SLOT_GENERATION);
    });

    test('should validate scheduling quickly', async () => {
      const businessHours = new BusinessHours();
      businessHours.hours = createMockBusinessHours();

      const scheduling = new OrderSchedulingSystem();
      scheduling.businessHours = businessHours;
      scheduling.setSchedulingType('asap');

      const { duration } = await measurePerformance(() => {
        return scheduling.validate();
      });

      expect(duration).toBeLessThan(THRESHOLDS.VALIDATION);
    });

    test('should calculate ASAP estimate quickly', async () => {
      const businessHours = new BusinessHours();
      businessHours.hours = createMockBusinessHours();

      const scheduling = new OrderSchedulingSystem();
      scheduling.businessHours = businessHours;
      scheduling.config = {
        estimatedPrepTime: 20,
        estimatedDeliveryTime: 30
      };

      const { duration } = await measurePerformance(() => {
        scheduling.setSchedulingType('asap');
      });

      expect(duration).toBeLessThan(THRESHOLDS.CALCULATION);
    });

    test('should get scheduling data quickly', async () => {
      const businessHours = new BusinessHours();
      businessHours.hours = createMockBusinessHours();

      const scheduling = new OrderSchedulingSystem();
      scheduling.businessHours = businessHours;
      scheduling.setSchedulingType('asap');

      const { duration } = await measurePerformance(() => {
        return scheduling.getSchedulingData();
      });

      expect(duration).toBeLessThan(THRESHOLDS.CALCULATION);
    });
  });

  describe('Business Hours Performance', () => {

    test('should check if open quickly', async () => {
      const businessHours = new BusinessHours();
      businessHours.hours = createMockBusinessHours();

      const { duration } = await measurePerformance(() => {
        return businessHours.isOpen();
      });

      expect(duration).toBeLessThan(THRESHOLDS.CALCULATION);
    });

    test('should use cache for subsequent checks', async () => {
      const businessHours = new BusinessHours();
      businessHours.hours = createMockBusinessHours();

      // First call (sets cache)
      businessHours.isOpen();

      // Second call (from cache)
      const { duration } = await measurePerformance(() => {
        return businessHours.isOpen();
      });

      // Cache hit should be extremely fast
      expect(duration).toBeLessThan(THRESHOLDS.CACHE_HIT);
    });

    test('should calculate time until closing quickly', async () => {
      const businessHours = new BusinessHours();
      businessHours.hours = createMockBusinessHours();
      businessHours._isOpenCache = true; // Mock as open

      const { duration } = await measurePerformance(() => {
        return businessHours.getTimeUntilClosing();
      });

      expect(duration).toBeLessThan(THRESHOLDS.CALCULATION);
    });

    test('should find next opening quickly', async () => {
      const businessHours = new BusinessHours();
      businessHours.hours = createMockBusinessHours();

      const { duration } = await measurePerformance(() => {
        return businessHours.getNextOpening();
      });

      expect(duration).toBeLessThan(THRESHOLDS.CALCULATION);
    });

    test('should get all hours organized quickly', async () => {
      const businessHours = new BusinessHours();
      businessHours.hours = createMockBusinessHours();

      const { duration } = await measurePerformance(() => {
        return businessHours.getAllHoursOrganized();
      });

      expect(duration).toBeLessThan(THRESHOLDS.CALCULATION);
    });

    test('should handle 1000 consecutive checks efficiently', async () => {
      const businessHours = new BusinessHours();
      businessHours.hours = createMockBusinessHours();

      const { duration } = await measurePerformance(() => {
        for (let i = 0; i < 1000; i++) {
          businessHours.isOpen();
        }
      });

      // 1000 checks should complete quickly due to caching
      expect(duration).toBeLessThan(100); // ~0.1ms per check
    });
  });

  describe('Cross-System Performance', () => {

    test('should validate all systems quickly', async () => {
      // Setup all systems
      const product = createTestProduct({
        id: '123',
        basePrice: 50,
        sizeRequired: true
      });

      const modifiers = new ModifiersSystem(product);
      const sizeRadio = product.querySelector('input[name="size"]');
      simulateRadioSelect(sizeRadio);
      modifiers.handleSizeChange({ target: sizeRadio });

      const zones = new DeliveryZonesSystem();
      zones.zones = createMockZones();
      zones.cartTotal = 100;
      zones.selectZone('zone-downtown');

      const businessHours = new BusinessHours();
      businessHours.hours = createMockBusinessHours();

      const scheduling = new OrderSchedulingSystem();
      scheduling.businessHours = businessHours;
      scheduling.setSchedulingType('asap');

      // Measure validation of all systems
      const { duration } = await measurePerformance(() => {
        const modifiersValid = modifiers.validate();
        const zonesValid = zones.validateSelectedZone();
        const schedulingValid = scheduling.validate();

        return modifiersValid.valid && zonesValid && schedulingValid.valid;
      });

      expect(duration).toBeLessThan(50); // All validations in < 50ms
    });

    test('should complete full order flow efficiently', async () => {
      const { duration } = await measurePerformance(async () => {
        // 1. Setup product
        const product = createTestProduct({ id: '123', basePrice: 50 });
        const modifiers = new ModifiersSystem(product);

        // 2. Select modifiers
        const sizeRadio = product.querySelector('input[name="size"]');
        simulateRadioSelect(sizeRadio);
        modifiers.handleSizeChange({ target: sizeRadio });

        const extraCheckbox = product.querySelector('input[name="extras"]');
        simulateCheckboxToggle(extraCheckbox, true);
        modifiers.handleExtraChange({ target: extraCheckbox });

        // 3. Calculate total
        const total = modifiers.calculateTotal();

        // 4. Select zone
        const zones = new DeliveryZonesSystem();
        zones.zones = createMockZones();
        zones.cartTotal = total;
        zones.selectZone('zone-downtown');

        // 5. Schedule order
        const businessHours = new BusinessHours();
        businessHours.hours = createMockBusinessHours();

        const scheduling = new OrderSchedulingSystem();
        scheduling.businessHours = businessHours;
        scheduling.setSchedulingType('asap');

        // 6. Validate all
        const valid = (
          modifiers.validate().valid &&
          zones.validateSelectedZone() &&
          scheduling.validate().valid
        );

        return valid;
      });

      // Complete flow should be fast
      expect(duration).toBeLessThan(100);
    });
  });

  describe('Memory Performance', () => {

    test('should not leak memory with repeated operations', async () => {
      const initialMemory = performance.memory?.usedJSHeapSize || 0;

      // Perform many operations
      for (let i = 0; i < 100; i++) {
        const product = createTestProduct({ id: `${i}`, basePrice: 50 });
        const modifiers = new ModifiersSystem(product);

        modifiers.modifiers.size = { id: 'large', name: 'Large', price: 10 };
        modifiers.calculateTotal();
        modifiers.validate();

        // Cleanup
        product.remove();
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = performance.memory?.usedJSHeapSize || 0;

      // Memory should not grow significantly
      const memoryGrowth = finalMemory - initialMemory;

      // Skip test if performance.memory not available
      if (initialMemory > 0) {
        expect(memoryGrowth).toBeLessThan(10 * 1024 * 1024); // < 10MB growth
      }
    });

    test('should clean up DOM references', () => {
      const products = [];

      // Create many products
      for (let i = 0; i < 50; i++) {
        const product = createTestProduct({ id: `${i}`, basePrice: 50 });
        products.push(product);
        new ModifiersSystem(product);
      }

      // Remove all products
      products.forEach(product => product.remove());

      // DOM should be clean
      expect(document.querySelectorAll('[data-product-modifiers]').length).toBe(0);
    });
  });

  describe('Bundle Size (Simulated)', () => {

    test('should have reasonable code size', () => {
      // Simulate checking class sizes
      const modifiersSize = ModifiersSystem.toString().length;
      const zonesSize = DeliveryZonesSystem.toString().length;
      const schedulingSize = OrderSchedulingSystem.toString().length;
      const businessHoursSize = BusinessHours.toString().length;

      const totalSize = modifiersSize + zonesSize + schedulingSize + businessHoursSize;

      // Total unminified code should be reasonable
      // (This is just source code, not actual bundle size)
      expect(totalSize).toBeLessThan(500 * 1024); // < 500KB unminified
    });
  });

  describe('Scaling Tests', () => {

    test('should handle products with many modifiers', async () => {
      const product = createTestProduct({
        id: '999',
        basePrice: 50,
        sizes: Array(20).fill(0).map((_, i) => ({
          id: `size${i}`,
          name: `Size ${i}`,
          price: i * 5
        })),
        extras: Array(50).fill(0).map((_, i) => ({
          id: `extra${i}`,
          name: `Extra ${i}`,
          price: i + 1
        })),
        modifications: Array(30).fill(0).map((_, i) => ({
          id: `mod${i}`,
          name: `Modification ${i}`,
          price: 0
        }))
      });

      const modifiers = new ModifiersSystem(product);

      // Select some modifiers
      const sizeRadio = product.querySelector('input[name="size"]');
      simulateRadioSelect(sizeRadio);
      modifiers.handleSizeChange({ target: sizeRadio });

      // Select many extras
      const checkboxes = product.querySelectorAll('input[name="extras"]');
      for (let i = 0; i < 20; i++) {
        simulateCheckboxToggle(checkboxes[i], true);
        modifiers.handleExtraChange({ target: checkboxes[i] });
      }

      const { duration } = await measurePerformance(() => {
        return modifiers.calculateTotal();
      });

      expect(duration).toBeLessThan(THRESHOLDS.CALCULATION);
    });

    test('should handle scheduling for extended hours', async () => {
      const businessHours = new BusinessHours();
      businessHours.hours = {
        saturday: { enabled: true, open: '00:00', close: '23:59' } // Full day
      };

      const scheduling = new OrderSchedulingSystem();
      scheduling.businessHours = businessHours;
      scheduling.config = {
        slotInterval: 15 // Creates many slots
      };

      const { duration } = await measurePerformance(() => {
        const today = new Date();
        today.setDate(today.getDate() + (6 - today.getDay())); // Next Saturday
        scheduling.selectDate(today);
      });

      // Even for full day with 15-min intervals (~96 slots)
      expect(duration).toBeLessThan(THRESHOLDS.TIME_SLOT_GENERATION);
    });
  });
});

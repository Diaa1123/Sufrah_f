/**
 * Integration Tests for Restaurant Systems
 * Tests all four systems working together
 *
 * @package Sufrah Restaurant Theme
 * @version 1.0.0
 */

import ModifiersSystem from '../../src/assets/js/restaurant/modifiers.js';
import DeliveryZonesSystem from '../../src/assets/js/restaurant/delivery-zones.js';
import OrderSchedulingSystem from '../../src/assets/js/restaurant/scheduling.js';
import BusinessHours from '../../src/assets/js/restaurant/business-hours.js';

// Mock Salla SDK
global.salla = {
  cart: {
    addItem: jest.fn().mockResolvedValue({ success: true }),
    getItems: jest.fn().mockResolvedValue([]),
    getTotal: jest.fn().mockResolvedValue(0),
    update: jest.fn().mockResolvedValue({ success: true })
  },
  notify: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn()
  },
  lang: {
    get: jest.fn((key) => key),
    locale: 'ar'
  },
  event: {
    cart: {
      updated: {
        listen: jest.fn()
      }
    }
  },
  storage: {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn()
  }
};

describe('Restaurant Systems Integration', () => {

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';

    // Reset localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // Reset all mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Cleanup DOM
    document.body.innerHTML = '';
  });

  describe('Modifiers + Cart Integration', () => {
    test('should add product with modifiers to cart', async () => {
      // Setup
      const product = createTestProduct({
        id: '123',
        basePrice: 50,
        sizeRequired: true
      });

      const modifiers = new ModifiersSystem(product);

      // Select size (required)
      const sizeRadio = product.querySelector('input[name="size"][value="large"]');
      sizeRadio.checked = true;
      modifiers.handleSizeChange({ target: sizeRadio });

      // Select extras
      const extraCheckbox = product.querySelector('input[name="extras"][value="cheese"]');
      extraCheckbox.checked = true;
      modifiers.handleExtraChange({ target: extraCheckbox });

      // Validate
      const validation = modifiers.validate();
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);

      // Calculate total
      const total = modifiers.calculateTotal();
      expect(total).toBe(65); // 50 base + 10 size + 5 extra

      // Format for cart
      const cartData = modifiers.getModifiersForCart();
      expect(cartData).toHaveLength(2); // Size + Extra
      expect(cartData[0]).toMatchObject({
        type: 'size',
        name: 'Large',
        price: 10
      });
      expect(cartData[1]).toMatchObject({
        type: 'extra',
        name: 'Cheese',
        price: 5
      });
    });

    test('should validate required size before cart', () => {
      const product = createTestProduct({
        id: '456',
        basePrice: 30,
        sizeRequired: true
      });

      const modifiers = new ModifiersSystem(product);

      // Don't select size
      const validation = modifiers.validate();

      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('modifiers.size_required');
    });

    test('should handle product without modifiers', () => {
      const product = createTestProduct({
        id: '789',
        basePrice: 25,
        sizeRequired: false,
        hasModifiers: false
      });

      const modifiers = new ModifiersSystem(product);
      const validation = modifiers.validate();

      expect(validation.valid).toBe(true);
      expect(modifiers.calculateTotal()).toBe(25);
    });

    test('should save and restore modifiers from session', () => {
      const product = createTestProduct({
        id: '999',
        basePrice: 40
      });

      const modifiers1 = new ModifiersSystem(product);
      modifiers1.modifiers.size = { id: 'medium', name: 'Medium', price: 5 };
      modifiers1.modifiers.extras = [
        { id: 'extra1', name: 'Extra Sauce', price: 3 }
      ];
      modifiers1.saveToSession();

      // Create new instance
      const modifiers2 = new ModifiersSystem(product);
      modifiers2.restoreFromSession();

      expect(modifiers2.modifiers.size.name).toBe('Medium');
      expect(modifiers2.modifiers.extras).toHaveLength(1);
      expect(modifiers2.calculateTotal()).toBe(48); // 40 + 5 + 3
    });
  });

  describe('Delivery Zones + Cart Total Integration', () => {
    test('should validate zone against cart total', () => {
      const zones = createDeliveryZonesSystem();

      // Set cart total below minimum
      zones.cartTotal = 45;
      zones.selectZone('zone-downtown');

      const validation = zones.validateSelectedZone();
      expect(validation).toBe(false);

      // Should show error via Salla notify
      expect(salla.notify.error).toHaveBeenCalled();

      // Increase cart total above minimum
      zones.cartTotal = 75;
      const validation2 = zones.validateSelectedZone();

      expect(validation2).toBe(true);
    });

    test('should update shipping cost when zone changes', () => {
      const zones = createDeliveryZonesSystem();
      zones.cartTotal = 100; // Above all minimums

      // Select zone 1 (15 SAR)
      zones.selectZone('zone-downtown');
      expect(zones.selectedZone.price).toBe(15);

      // Select zone 2 (25 SAR)
      zones.selectZone('zone-suburbs');
      expect(zones.selectedZone.price).toBe(25);
    });

    test('should persist selected zone in localStorage', () => {
      const zones1 = createDeliveryZonesSystem();
      zones1.cartTotal = 100;
      zones1.selectZone('zone-downtown');

      // Create new instance
      const zones2 = createDeliveryZonesSystem();

      // Should restore from localStorage
      expect(zones2.selectedZone).toBeDefined();
      expect(zones2.selectedZone.id).toBe('zone-downtown');
    });

    test('should get cheapest available zone', () => {
      const zones = createDeliveryZonesSystem();
      zones.cartTotal = 100; // Above all minimums

      const cheapest = zones.getCheapestZone();
      expect(cheapest.id).toBe('zone-downtown'); // 15 SAR
    });

    test('should get fastest available zone', () => {
      const zones = createDeliveryZonesSystem();
      zones.cartTotal = 100;

      const fastest = zones.getFastestZone();
      expect(fastest.id).toBe('zone-downtown'); // 30 min
    });

    test('should filter unavailable zones', () => {
      const zones = createDeliveryZonesSystem();
      zones.cartTotal = 30; // Below most minimums

      const available = zones.getAvailableZones();

      // Should only return zones with min_order <= 30
      expect(available.length).toBeLessThan(zones.zones.length);
      available.forEach(zone => {
        expect(zone.min_order).toBeLessThanOrEqual(30);
      });
    });
  });

  describe('Scheduling + Business Hours Integration', () => {
    test('should force scheduled type when restaurant is closed', () => {
      // Mock business hours as closed
      const businessHours = createBusinessHours(false);
      const scheduling = createSchedulingSystem(businessHours);

      // Try to set ASAP
      scheduling.setSchedulingType('asap');

      // Should force scheduled since restaurant is closed
      expect(scheduling.schedulingType).toBe('scheduled');
      expect(salla.notify.warning).toHaveBeenCalledWith(
        expect.stringContaining('closed')
      );
    });

    test('should allow ASAP when restaurant is open', () => {
      const businessHours = createBusinessHours(true);
      const scheduling = createSchedulingSystem(businessHours);

      scheduling.setSchedulingType('asap');

      expect(scheduling.schedulingType).toBe('asap');
      expect(scheduling.estimatedDelivery).toBeInstanceOf(Date);
    });

    test('should generate time slots based on business hours', () => {
      const businessHours = createBusinessHours(true, {
        saturday: { enabled: true, open: '09:00', close: '23:00' }
      });

      const scheduling = createSchedulingSystem(businessHours);

      // Select today (Saturday in mock)
      const today = new Date();
      scheduling.selectDate(today);

      expect(scheduling.availableSlots.length).toBeGreaterThan(0);

      // All slots should be within business hours
      scheduling.availableSlots.forEach(slot => {
        const hour = parseInt(slot.value.split(':')[0]);
        expect(hour).toBeGreaterThanOrEqual(9);
        expect(hour).toBeLessThan(23);
      });
    });

    test('should enforce 30-minute slot intervals', () => {
      const businessHours = createBusinessHours(true);
      const scheduling = createSchedulingSystem(businessHours);

      scheduling.selectDate(new Date());

      if (scheduling.availableSlots.length >= 2) {
        const slot1 = scheduling.availableSlots[0].value;
        const slot2 = scheduling.availableSlots[1].value;

        const [h1, m1] = slot1.split(':').map(Number);
        const [h2, m2] = slot2.split(':').map(Number);

        const time1 = h1 * 60 + m1;
        const time2 = h2 * 60 + m2;

        expect(time2 - time1).toBe(30);
      }
    });

    test('should enforce minimum advance time', () => {
      const businessHours = createBusinessHours(true);
      const scheduling = createSchedulingSystem(businessHours, {
        minAdvanceMinutes: 60
      });

      scheduling.selectDate(new Date());

      if (scheduling.availableSlots.length > 0) {
        const firstSlot = scheduling.availableSlots[0];
        const [hour, minute] = firstSlot.value.split(':').map(Number);

        const slotTime = new Date();
        slotTime.setHours(hour, minute, 0, 0);

        const now = new Date();
        const diffMinutes = (slotTime - now) / 60000;

        expect(diffMinutes).toBeGreaterThanOrEqual(60);
      }
    });

    test('should enforce maximum advance days', () => {
      const businessHours = createBusinessHours(true);
      const scheduling = createSchedulingSystem(businessHours, {
        maxAdvanceDays: 7
      });

      const farFuture = new Date();
      farFuture.setDate(farFuture.getDate() + 10);

      scheduling.selectDate(farFuture);

      const validation = scheduling.validate();
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('scheduling.date_too_far');
    });

    test('should calculate ASAP delivery estimate correctly', () => {
      const businessHours = createBusinessHours(true);
      const scheduling = createSchedulingSystem(businessHours, {
        estimatedPrepTime: 20,
        estimatedDeliveryTime: 30
      });

      scheduling.setSchedulingType('asap');

      const estimate = scheduling.estimatedDelivery;
      const now = new Date();
      const diffMinutes = (estimate - now) / 60000;

      // Should be ~50 minutes (20 prep + 30 delivery)
      expect(diffMinutes).toBeGreaterThanOrEqual(45);
      expect(diffMinutes).toBeLessThanOrEqual(55);
    });
  });

  describe('Business Hours System', () => {
    test('should accurately determine open/closed status', () => {
      const businessHours = createBusinessHours(true, {
        saturday: { enabled: true, open: '09:00', close: '23:00' }
      });

      // Mock current time to be within hours
      const testDate = new Date();
      testDate.setHours(15, 0, 0, 0); // 3 PM

      const isOpen = businessHours.isOpen(testDate);
      expect(isOpen).toBe(true);

      // Mock time outside hours
      const closedDate = new Date();
      closedDate.setHours(2, 0, 0, 0); // 2 AM

      const isClosed = businessHours.isOpen(closedDate);
      expect(isClosed).toBe(false);
    });

    test('should calculate time until closing', () => {
      const businessHours = createBusinessHours(true, {
        saturday: { enabled: true, open: '09:00', close: '23:00' }
      });

      // Mock current time
      const testDate = new Date();
      testDate.setHours(22, 0, 0, 0); // 10 PM (1 hour before close)

      // Temporarily override isOpen to return true
      businessHours._isOpenCache = true;

      const timeUntilClose = businessHours.getTimeUntilClosing(testDate);

      expect(timeUntilClose).toBeDefined();
      expect(timeUntilClose.hours).toBe(1);
      expect(timeUntilClose.minutes).toBe(60);
    });

    test('should find next opening time when closed', () => {
      const businessHours = createBusinessHours(false, {
        saturday: { enabled: true, open: '09:00', close: '23:00' },
        sunday: { enabled: true, open: '10:00', close: '22:00' }
      });

      const nextOpening = businessHours.getNextOpening();

      expect(nextOpening).toBeDefined();
      expect(nextOpening.day).toBeDefined();
      expect(nextOpening.time).toBeDefined();
    });

    test('should cache open/closed status for performance', () => {
      const businessHours = createBusinessHours(true);

      // First call
      const result1 = businessHours.isOpen();

      // Second call within cache TTL
      const result2 = businessHours.isOpen();

      // Should return cached result
      expect(result1).toBe(result2);
      expect(businessHours._isOpenCache).toBeDefined();
    });

    test('should handle closed days correctly', () => {
      const businessHours = createBusinessHours(true, {
        friday: { enabled: false, open: '00:00', close: '00:00' }
      });

      const fridayDate = new Date();
      // Set to Friday (adjust based on mock)
      fridayDate.setDate(fridayDate.getDate() + (5 - fridayDate.getDay()));
      fridayDate.setHours(12, 0, 0, 0);

      const isOpen = businessHours.isOpen(fridayDate);
      expect(isOpen).toBe(false);
    });
  });

  describe('Complete Order Flow', () => {
    test('should complete full order with all systems', async () => {
      // 1. Setup product with modifiers
      const product = createTestProduct({
        id: '123',
        basePrice: 50,
        sizeRequired: true
      });

      const modifiers = new ModifiersSystem(product);

      // Select size
      const sizeRadio = product.querySelector('input[name="size"][value="large"]');
      sizeRadio.checked = true;
      modifiers.handleSizeChange({ target: sizeRadio });

      // Select extra
      const extraCheckbox = product.querySelector('input[name="extras"][value="cheese"]');
      extraCheckbox.checked = true;
      modifiers.handleExtraChange({ target: extraCheckbox });

      const productTotal = modifiers.calculateTotal();
      expect(productTotal).toBe(65); // 50 + 10 + 5

      // 2. Setup delivery zones
      const zones = createDeliveryZonesSystem();
      zones.cartTotal = productTotal;
      zones.selectZone('zone-downtown');

      expect(zones.selectedZone).toBeDefined();
      expect(zones.selectedZone.price).toBe(15);

      const zonesValid = zones.validateSelectedZone();
      expect(zonesValid).toBe(true);

      // 3. Setup scheduling
      const businessHours = createBusinessHours(true);
      const scheduling = createSchedulingSystem(businessHours);
      scheduling.setSchedulingType('asap');

      const schedulingData = scheduling.getSchedulingData();
      expect(schedulingData.type).toBe('asap');
      expect(schedulingData.estimatedDelivery).toBeInstanceOf(Date);

      // 4. Validate all systems
      const modifiersValidation = modifiers.validate();
      const schedulingValidation = scheduling.validate();

      expect(modifiersValidation.valid).toBe(true);
      expect(zonesValid).toBe(true);
      expect(schedulingValidation.valid).toBe(true);

      // 5. Calculate final order totals
      const orderSummary = {
        subtotal: productTotal,
        shipping: zones.selectedZone.price,
        total: productTotal + zones.selectedZone.price,
        modifiers: modifiers.getModifiersForCart(),
        zone: zones.selectedZone,
        scheduling: schedulingData
      };

      expect(orderSummary.total).toBe(80); // 65 product + 15 shipping
      expect(orderSummary.modifiers).toHaveLength(2);
    });

    test('should handle closed restaurant gracefully', () => {
      const businessHours = createBusinessHours(false);
      const scheduling = createSchedulingSystem(businessHours);

      // Try ASAP - should force scheduled
      scheduling.setSchedulingType('asap');
      expect(scheduling.schedulingType).toBe('scheduled');

      // Should show next opening
      const nextOpening = businessHours.getNextOpening();
      expect(nextOpening).toBeDefined();
    });

    test('should handle insufficient cart total for zone', () => {
      const zones = createDeliveryZonesSystem();
      zones.cartTotal = 30; // Below 50 SAR minimum for downtown

      zones.selectZone('zone-downtown');
      const valid = zones.validateSelectedZone();

      expect(valid).toBe(false);
      expect(salla.notify.error).toHaveBeenCalled();
    });

    test('should handle invalid scheduling date', () => {
      const businessHours = createBusinessHours(true);
      const scheduling = createSchedulingSystem(businessHours);

      // Try to schedule in the past
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);

      scheduling.selectDate(pastDate);
      const validation = scheduling.validate();

      expect(validation.valid).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    test('should handle missing product data gracefully', () => {
      const emptyDiv = document.createElement('div');
      document.body.appendChild(emptyDiv);

      expect(() => {
        new ModifiersSystem(emptyDiv);
      }).not.toThrow();
    });

    test('should handle empty zones array', () => {
      const zones = new DeliveryZonesSystem();
      zones.zones = [];

      const available = zones.getAvailableZones();
      expect(available).toHaveLength(0);
    });

    test('should handle midnight boundary in business hours', () => {
      const businessHours = createBusinessHours(true, {
        saturday: { enabled: true, open: '10:00', close: '02:00' } // Crosses midnight
      });

      const lateNight = new Date();
      lateNight.setHours(1, 0, 0, 0); // 1 AM

      // Should still be open (before 2 AM close)
      const isOpen = businessHours.isOpen(lateNight);
      expect(isOpen).toBe(true);
    });

    test('should handle network errors gracefully', async () => {
      salla.cart.addItem.mockRejectedValue(new Error('Network error'));

      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      await expect(modifiers.handleAddToCart()).rejects.toThrow('Network error');
      expect(salla.notify.error).toHaveBeenCalled();
    });

    test('should handle rapid zone changes', () => {
      const zones = createDeliveryZonesSystem();
      zones.cartTotal = 100;

      // Rapidly change zones
      zones.selectZone('zone-downtown');
      zones.selectZone('zone-suburbs');
      zones.selectZone('zone-downtown');

      // Should end with last selection
      expect(zones.selectedZone.id).toBe('zone-downtown');
    });

    test('should handle concurrent modifier changes', () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      // Simulate rapid changes
      const sizeRadio1 = product.querySelector('input[name="size"][value="large"]');
      const sizeRadio2 = product.querySelector('input[name="size"][value="medium"]');

      modifiers.handleSizeChange({ target: sizeRadio1 });
      modifiers.handleSizeChange({ target: sizeRadio2 });

      // Should have last selection
      expect(modifiers.modifiers.size.name).toBe('Medium');
    });
  });

  describe('Performance Tests', () => {
    test('should initialize modifiers system quickly', () => {
      const start = performance.now();

      const product = createTestProduct({ id: '123', basePrice: 50 });
      new ModifiersSystem(product);

      const duration = performance.now() - start;
      expect(duration).toBeLessThan(50); // Should init in < 50ms
    });

    test('should calculate totals efficiently', () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);

      // Add many extras
      for (let i = 0; i < 10; i++) {
        modifiers.modifiers.extras.push({
          id: `extra${i}`,
          name: `Extra ${i}`,
          price: i + 1
        });
      }

      const start = performance.now();
      modifiers.calculateTotal();
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(10); // Should calculate in < 10ms
    });

    test('should generate time slots efficiently', () => {
      const businessHours = createBusinessHours(true);
      const scheduling = createSchedulingSystem(businessHours);

      const start = performance.now();
      scheduling.selectDate(new Date());
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(100); // Should generate in < 100ms
    });

    test('should validate systems quickly', () => {
      const product = createTestProduct({ id: '123', basePrice: 50 });
      const modifiers = new ModifiersSystem(product);
      const zones = createDeliveryZonesSystem();
      const scheduling = createSchedulingSystem(createBusinessHours(true));

      const start = performance.now();

      modifiers.validate();
      zones.validateSelectedZone();
      scheduling.validate();

      const duration = performance.now() - start;
      expect(duration).toBeLessThan(50); // All validations in < 50ms
    });
  });
});

// ============================================================================
// Helper Functions
// ============================================================================

function createTestProduct(options = {}) {
  const {
    id = '123',
    basePrice = 50,
    sizeRequired = false,
    hasModifiers = true
  } = options;

  const product = document.createElement('div');
  product.setAttribute('data-product-modifiers', '');
  product.setAttribute('data-product-id', id);
  product.setAttribute('data-base-price', basePrice);
  product.setAttribute('data-size-required', sizeRequired);

  if (hasModifiers) {
    // Add size options
    const sizeGroup = `
      <div class="size-options">
        <label>
          <input type="radio" name="size" value="small" data-price="0" data-name="Small">
          <span>Small</span>
        </label>
        <label>
          <input type="radio" name="size" value="medium" data-price="5" data-name="Medium">
          <span>Medium</span>
        </label>
        <label>
          <input type="radio" name="size" value="large" data-price="10" data-name="Large">
          <span>Large</span>
        </label>
      </div>
    `;

    // Add extras
    const extrasGroup = `
      <div class="extras-options">
        <label>
          <input type="checkbox" name="extras" value="cheese" data-price="5" data-name="Cheese">
          <span>Cheese (+5 SAR)</span>
        </label>
        <label>
          <input type="checkbox" name="extras" value="sauce" data-price="3" data-name="Extra Sauce">
          <span>Extra Sauce (+3 SAR)</span>
        </label>
      </div>
    `;

    product.innerHTML = sizeGroup + extrasGroup;
  }

  document.body.appendChild(product);
  return product;
}

function createDeliveryZonesSystem() {
  const zones = new DeliveryZonesSystem();

  // Mock zones data
  zones.zones = [
    {
      id: 'zone-downtown',
      name: 'Downtown',
      price: 15,
      min_order: 50,
      delivery_time: '30-45',
      enabled: true
    },
    {
      id: 'zone-suburbs',
      name: 'Suburbs',
      price: 25,
      min_order: 75,
      delivery_time: '45-60',
      enabled: true
    },
    {
      id: 'zone-rural',
      name: 'Rural Area',
      price: 35,
      min_order: 100,
      delivery_time: '60-90',
      enabled: true
    }
  ];

  return zones;
}

function createBusinessHours(isOpen = true, customHours = {}) {
  const defaultHours = {
    saturday: { enabled: true, open: '09:00', close: '23:00' },
    sunday: { enabled: true, open: '09:00', close: '23:00' },
    monday: { enabled: true, open: '09:00', close: '23:00' },
    tuesday: { enabled: true, open: '09:00', close: '23:00' },
    wednesday: { enabled: true, open: '09:00', close: '23:00' },
    thursday: { enabled: true, open: '09:00', close: '23:00' },
    friday: { enabled: false, open: '00:00', close: '00:00' }
  };

  const businessHours = new BusinessHours();
  businessHours.hours = { ...defaultHours, ...customHours };
  businessHours._isOpenCache = isOpen;
  businessHours._cacheTimestamp = Date.now();

  return businessHours;
}

function createSchedulingSystem(businessHours, config = {}) {
  const defaultConfig = {
    minAdvanceMinutes: 30,
    maxAdvanceDays: 14,
    slotInterval: 30,
    estimatedPrepTime: 20,
    estimatedDeliveryTime: 30
  };

  const scheduling = new OrderSchedulingSystem();
  scheduling.businessHours = businessHours;
  scheduling.config = { ...defaultConfig, ...config };

  return scheduling;
}

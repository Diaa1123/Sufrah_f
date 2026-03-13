# 📖 Sufrah API Integration Guide

> دليل التكامل الشامل مع Salla API لقالب Sufrah

---

## 📑 Table of Contents

1. [Overview](#-overview)
2. [Salla Core APIs](#-salla-core-apis)
3. [Sufrah Custom APIs](#-sufrah-custom-apis)
4. [Event System](#-event-system)
5. [Best Practices](#-best-practices)
6. [Error Handling](#-error-handling)
7. [Examples](#-examples)

---

## 🎯 Overview

This guide explains how Sufrah theme integrates with Salla's API to provide restaurant-specific features including:

- **Product Modifiers**: Size, toppings, spice levels, special instructions
- **Delivery Zones**: Zone-based pricing and availability
- **Business Hours**: Real-time open/closed status
- **Order Scheduling**: Schedule orders for future delivery
- **Settings Management**: Centralized configuration

---

## 📡 Salla Core APIs

### Configuration API

Access theme settings and store configuration:

```javascript
// Get single setting
const storeName = salla.config.get('store.name');
const primaryColor = salla.config.get('restaurant_primary_color');

// Get all settings
const allSettings = salla.config.getAll();

// Check if setting exists
if (salla.config.has('business_hours.monday.open')) {
  // Setting exists
}
```

**Available Settings:**
- `store.*` - Store information (name, phone, email, address)
- `business_hours.*` - Operating hours configuration
- `delivery_zones` - Delivery zones array
- `restaurant_*` - Restaurant-specific settings

---

### Product API

#### Get Product Details
```javascript
// Fetch product with modifiers
salla.product.getDetails(productId).then(response => {
  const product = response.data;

  // Access custom fields for restaurant data
  const modifiers = product.metadata.modifiers;
  const servings = product.metadata.servings;
  const calories = product.metadata.calories;
  const ingredients = product.metadata.ingredients;
  const allergens = product.metadata.allergens;
  const prepTime = product.metadata.preparation_time;
});
```

#### Get Product Price
```javascript
// Get formatted price
const price = salla.product.getPrice();

// Get original price (before discount)
const originalPrice = salla.product.getOriginalPrice();

// Check if on sale
const isOnSale = salla.product.isOnSale();
```

#### Get Product Options
```javascript
// Get all available options
const options = salla.product.getOptions();

// Example: Size options
options.forEach(option => {
  console.log(option.name, option.values);
});
```

---

### Cart API

#### Get Cart Items
```javascript
// Get all items in cart
salla.cart.getItems().then(items => {
  items.forEach(item => {
    console.log(item.name, item.quantity, item.price);
  });
});
```

#### Add Product with Modifiers
```javascript
// Add product to cart with custom modifiers
salla.cart.addItem({
  id: productId,
  quantity: 1,
  options: {
    modifiers: [
      { id: 'size', value: 'large', price: 5 },
      { id: 'sauce', value: 'spicy', price: 2 }
    ],
    special_instructions: 'No onions, please'
  }
}).then(response => {
  console.log('Added to cart:', response);
}).catch(error => {
  console.error('Failed to add:', error);
});
```

#### Update Cart Item
```javascript
// Update quantity
salla.cart.updateItem(itemId, {
  quantity: 3
});

// Update modifiers
salla.cart.updateItem(itemId, {
  options: {
    modifiers: [
      { id: 'size', value: 'medium', price: 3 }
    ]
  }
});
```

#### Remove from Cart
```javascript
// Remove single item
salla.cart.removeItem(itemId);

// Clear entire cart
salla.cart.clear();
```

#### Get Cart Total
```javascript
// Get cart summary
salla.cart.getTotal().then(totals => {
  console.log('Subtotal:', totals.subtotal);
  console.log('Tax:', totals.tax);
  console.log('Shipping:', totals.shipping);
  console.log('Total:', totals.total);
});
```

---

### Order API

#### Create Order
```javascript
// Create immediate order
salla.order.create({
  payment_method: 'cod', // cash on delivery
  delivery_zone_id: 'zone-1',
  delivery_notes: 'Please call when you arrive',
  special_instructions: 'Extra napkins please'
}).then(order => {
  console.log('Order created:', order.id);
  window.location.href = `/orders/${order.id}`;
});
```

#### Schedule Order
```javascript
// Schedule order for later delivery
salla.order.create({
  scheduled_at: '2024-03-15 14:30:00',
  delivery_notes: 'Please call on arrival',
  payment_method: 'credit_card',
  delivery_zone_id: 'zone-2'
}).then(order => {
  console.log('Order scheduled:', order);
});
```

#### Get Order Details
```javascript
// Fetch order by ID
salla.order.getDetails(orderId).then(order => {
  console.log('Status:', order.status);
  console.log('Items:', order.items);
  console.log('Total:', order.total);
});
```

---

## 🍽️ Sufrah Custom APIs

### Settings API

**File:** `src/assets/js/helpers/settings.js`

Centralized settings management for restaurant configuration.

```javascript
import sufrahSettings from './helpers/settings.js';

// Load settings (auto-loads on DOM ready)
await sufrahSettings.load();

// Get specific setting using dot notation
const zones = sufrahSettings.get('delivery_zones');
const primaryColor = sufrahSettings.get('appearance.primary_color');
const mondayHours = sufrahSettings.get('business_hours.days.monday');

// Check if restaurant is open
if (sufrahSettings.isOpen()) {
  console.log('Restaurant is currently open');
}

// Get next time change (opening or closing)
const nextChange = sufrahSettings.getNextTimeChange();
if (nextChange.type === 'closes') {
  console.log(`Closes in ${nextChange.minutes} minutes`);
} else {
  console.log(`Opens in ${nextChange.minutes} minutes`);
}

// Get delivery zone
const zone = sufrahSettings.getDeliveryZone('zone-1');
console.log(zone.name, zone.price, zone.estimated_time);

// Validate delivery zone
const validation = sufrahSettings.validateDeliveryZone('zone-1', 75);
if (validation.valid) {
  console.log('Zone valid! Delivery fee:', validation.delivery_fee);
} else {
  console.error('Validation failed:', validation.error, validation.message);
}

// Check if scheduling is available
const scheduledTime = new Date('2024-03-15 14:30:00');
if (sufrahSettings.isSchedulingAvailable(scheduledTime)) {
  console.log('Time slot available');
}

// Clear cache
sufrahSettings.clearCache();
```

**Settings Structure:**
```javascript
{
  restaurant: {
    name: 'مطعمي',
    name_en: 'My Restaurant',
    phone: '+966501234567',
    email: 'info@restaurant.sa',
    address: '123 Main St, Riyadh',
    coordinates: { lat: 24.7136, lng: 46.6753 }
  },
  business_hours: {
    timezone: 'Asia/Riyadh',
    days: {
      monday: {
        enabled: true,
        open: '09:00',
        close: '23:00',
        breaks: [
          { start: '14:00', end: '16:00' } // Optional break periods
        ]
      },
      // ... other days
    },
    special_days: [
      {
        date: '2024-06-15',
        open: '10:00',
        close: '20:00',
        reason: 'Ramadan Hours'
      }
    ]
  },
  delivery_zones: [
    {
      id: 'zone-1',
      name: 'وسط المدينة',
      name_en: 'Downtown',
      price: 15,
      min_order: 50,
      free_delivery_threshold: 150,
      estimated_time: '30-45 دقيقة',
      estimated_time_min: 30,
      estimated_time_max: 45,
      enabled: true
    }
  ],
  scheduling: {
    enabled: true,
    min_advance_hours: 2,
    max_advance_days: 7,
    slot_interval_minutes: 30,
    buffer_time_minutes: 15,
    blackout_dates: ['2024-06-15', '2024-09-23'],
    same_day_cutoff_time: '21:00'
  },
  modifiers: {
    show_calories: true,
    show_ingredients: true,
    show_allergens: true,
    show_prep_time: true,
    allow_special_instructions: true,
    max_instructions_length: 200,
    spice_levels: ['mild', 'medium', 'hot', 'extra-hot']
  },
  appearance: {
    primary_color: '#D97706',
    secondary_color: '#059669',
    logo_url: '/images/logo.png',
    hero_image_url: '/images/hero.jpg'
  },
  payment: {
    currency: 'SAR',
    tax_rate: 15,
    min_order_amount: 30,
    service_fee: 0,
    service_fee_percentage: 0
  },
  features: {
    loyalty_program: false,
    gift_cards: false,
    table_reservations: false,
    catering: false,
    pickup: true,
    dine_in: false
  }
}
```

---

### Modifiers API

**Example Structure in Product Metadata:**

```json
{
  "product_id": 123,
  "metadata": {
    "modifiers": [
      {
        "id": "size",
        "name": "Size",
        "name_ar": "الحجم",
        "type": "radio",
        "required": true,
        "options": [
          { "id": "small", "name": "Small", "name_ar": "صغير", "price": 0 },
          { "id": "medium", "name": "Medium", "name_ar": "وسط", "price": 5 },
          { "id": "large", "name": "Large", "name_ar": "كبير", "price": 10 }
        ]
      },
      {
        "id": "toppings",
        "name": "Toppings",
        "name_ar": "الإضافات",
        "type": "checkbox",
        "required": false,
        "max_selections": 3,
        "options": [
          { "id": "cheese", "name": "Extra Cheese", "name_ar": "جبنة إضافية", "price": 3 },
          { "id": "mushroom", "name": "Mushrooms", "name_ar": "مشروم", "price": 2 },
          { "id": "olives", "name": "Olives", "name_ar": "زيتون", "price": 2 }
        ]
      },
      {
        "id": "spice_level",
        "name": "Spice Level",
        "name_ar": "درجة الحرارة",
        "type": "radio",
        "required": false,
        "options": [
          { "id": "mild", "name": "Mild", "name_ar": "خفيف", "price": 0 },
          { "id": "medium", "name": "Medium", "name_ar": "متوسط", "price": 0 },
          { "id": "hot", "name": "Hot", "name_ar": "حار", "price": 0 }
        ]
      }
    ],
    "calories": 450,
    "servings": 2,
    "preparation_time": 15,
    "ingredients": ["Chicken", "Rice", "Spices"],
    "allergens": ["Gluten", "Dairy"]
  }
}
```

**Usage:**
```javascript
// Get product modifiers
const product = await salla.product.getDetails(productId);
const modifiers = product.data.metadata.modifiers;

// Validate required modifiers
function validateModifiers(selectedModifiers, productModifiers) {
  for (const modifier of productModifiers) {
    if (modifier.required) {
      const selected = selectedModifiers.find(m => m.id === modifier.id);
      if (!selected) {
        return {
          valid: false,
          error: `${modifier.name} is required`
        };
      }
    }

    // Check max selections for checkbox types
    if (modifier.type === 'checkbox' && modifier.max_selections) {
      const selected = selectedModifiers.filter(m => m.id === modifier.id);
      if (selected.length > modifier.max_selections) {
        return {
          valid: false,
          error: `Maximum ${modifier.max_selections} selections for ${modifier.name}`
        };
      }
    }
  }

  return { valid: true };
}

// Calculate total price with modifiers
function calculateTotalPrice(basePrice, selectedModifiers) {
  let total = basePrice;

  selectedModifiers.forEach(modifier => {
    total += modifier.price || 0;
  });

  return total;
}
```

---

### Delivery Zones API

**Usage:**
```javascript
// Get all zones
const zones = sufrahSettings.get('delivery_zones');

// Filter enabled zones
const activeZones = zones.filter(z => z.enabled);

// Find zone by ID
const zone = zones.find(z => z.id === 'zone-1');

// Calculate delivery fee
function calculateDeliveryFee(zoneId, cartTotal) {
  const validation = sufrahSettings.validateDeliveryZone(zoneId, cartTotal);

  if (!validation.valid) {
    throw new Error(validation.message);
  }

  return validation.delivery_fee;
}

// Check minimum order
function checkMinimumOrder(zoneId, cartTotal) {
  const zone = sufrahSettings.getDeliveryZone(zoneId);

  if (!zone) {
    return { valid: false, message: 'Zone not found' };
  }

  if (cartTotal < zone.min_order) {
    return {
      valid: false,
      message: `Minimum order is ${zone.min_order} SAR`,
      required: zone.min_order,
      difference: zone.min_order - cartTotal
    };
  }

  return { valid: true };
}
```

---

### Business Hours API

```javascript
// Check if open
const isOpen = sufrahSettings.isOpen();

// Get status message
function getStatusMessage() {
  const nextChange = sufrahSettings.getNextTimeChange();

  if (!nextChange) {
    return 'Restaurant is permanently closed';
  }

  if (nextChange.type === 'closes') {
    const hours = Math.floor(nextChange.minutes / 60);
    const mins = nextChange.minutes % 60;
    return `مفتوح الآن • يغلق بعد ${hours > 0 ? `${hours} ساعة و` : ''}${mins} دقيقة`;
  } else {
    if (nextChange.day) {
      const dayNames = {
        sunday: 'الأحد', monday: 'الإثنين', tuesday: 'الثلاثاء',
        wednesday: 'الأربعاء', thursday: 'الخميس', friday: 'الجمعة', saturday: 'السبت'
      };
      return `مغلق الآن • يفتح ${dayNames[nextChange.day]} الساعة ${nextChange.time.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `مغلق الآن • يفتح الساعة ${nextChange.time.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}`;
    }
  }
}

// Get today's hours
function getTodayHours() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];

  return sufrahSettings.get(`business_hours.days.${today}`);
}

// Get full week schedule
function getWeekSchedule() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const schedule = [];

  days.forEach(day => {
    const hours = sufrahSettings.get(`business_hours.days.${day}`);
    schedule.push({
      day,
      ...hours
    });
  });

  return schedule;
}
```

---

### Scheduling API

```javascript
// Check if scheduling is enabled
const schedulingEnabled = sufrahSettings.get('scheduling.enabled');

// Get available time slots for a date
function getAvailableTimeSlots(date) {
  const scheduling = sufrahSettings.get('scheduling');
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const dayHours = sufrahSettings.get(`business_hours.days.${dayName}`);

  if (!dayHours || !dayHours.enabled) {
    return [];
  }

  const slots = [];
  const [openHour, openMin] = dayHours.open.split(':').map(Number);
  const [closeHour, closeMin] = dayHours.close.split(':').map(Number);

  let currentTime = new Date(date);
  currentTime.setHours(openHour, openMin, 0, 0);

  const endTime = new Date(date);
  endTime.setHours(closeHour, closeMin, 0, 0);

  while (currentTime < endTime) {
    if (sufrahSettings.isSchedulingAvailable(currentTime)) {
      slots.push(new Date(currentTime));
    }

    currentTime.setMinutes(currentTime.getMinutes() + scheduling.slot_interval_minutes);
  }

  return slots;
}

// Format time slot
function formatTimeSlot(datetime) {
  return datetime.toLocaleTimeString('ar-SA', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}
```

---

## 🔧 Event System

### Salla Events

```javascript
// Cart updated
salla.event.on('cart::updated', (data) => {
  console.log('Cart updated', data);
  updateCartUI();
});

// Product added to cart
salla.event.on('product::added', (data) => {
  console.log('Product added', data.product_id);
  showSuccessMessage();
});

// Order created
salla.event.on('order::created', (data) => {
  console.log('Order created', data.order_id);
  trackOrderAnalytics(data);
});

// Checkout started
salla.event.on('checkout::started', (data) => {
  console.log('Checkout started');
});
```

---

### Sufrah Custom Events

```javascript
// Settings loaded
window.addEventListener('settings:loaded', (e) => {
  console.log('Settings loaded', e.detail);
  initializeApp();
});

// Modifier selected
document.addEventListener('sufrah:modifier:selected', (e) => {
  console.log('Modifier selected:', e.detail);
  updatePriceDisplay();
});

// Modifier validated
document.addEventListener('sufrah:modifier:validated', (e) => {
  if (e.detail.valid) {
    enableCheckoutButton();
  } else {
    showValidationError(e.detail.errors);
  }
});

// Delivery zone selected
document.addEventListener('sufrah:zone:selected', (e) => {
  console.log('Zone:', e.detail.zone);
  console.log('Fee:', e.detail.fee);
  updateDeliveryFeeDisplay(e.detail.fee);
});

// Business hours changed
document.addEventListener('sufrah:hours:changed', (e) => {
  console.log('Status changed to:', e.detail.isOpen ? 'Open' : 'Closed');
  updateStatusWidget();
});
```

**Dispatching Custom Events:**
```javascript
// Dispatch modifier selection
function selectModifier(modifierId, value) {
  document.dispatchEvent(new CustomEvent('sufrah:modifier:selected', {
    detail: { modifierId, value }
  }));
}

// Dispatch zone selection
function selectZone(zone) {
  document.dispatchEvent(new CustomEvent('sufrah:zone:selected', {
    detail: {
      zone: zone,
      fee: zone.price
    }
  }));
}
```

---

## 📝 Best Practices

### 1. Error Handling

Always handle errors gracefully:

```javascript
try {
  await salla.cart.addItem(item);
  showSuccessMessage('تمت الإضافة إلى السلة');
} catch (error) {
  console.error('Failed to add item:', error);

  if (error.code === 'MODIFIER_REQUIRED') {
    showModifierModal();
  } else if (error.code === 'OUT_OF_STOCK') {
    showErrorMessage('المنتج غير متوفر');
  } else if (error.code === 'MIN_ORDER_NOT_MET') {
    showErrorMessage('لم يتم الوصول للحد الأدنى للطلب');
  } else {
    showErrorMessage('حدث خطأ، يرجى المحاولة مرة أخرى');
  }
}
```

---

### 2. Caching

Cache frequently accessed data:

```javascript
// Cache with TTL
class Cache {
  constructor(ttl = 5 * 60 * 1000) {
    this.cache = new Map();
    this.ttl = ttl;
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  clear() {
    this.cache.clear();
  }
}

// Usage
const productCache = new Cache(5 * 60 * 1000); // 5 minutes

async function getProduct(productId) {
  const cached = productCache.get(productId);
  if (cached) return cached;

  const product = await salla.product.getDetails(productId);
  productCache.set(productId, product);
  return product;
}
```

---

### 3. Loading States

Always show loading states for better UX:

```javascript
async function addToCart(productId, modifiers) {
  const button = document.querySelector('.add-to-cart-btn');

  // Show loading
  button.disabled = true;
  button.innerHTML = `
    <span class="spinner"></span>
    جارٍ الإضافة...
  `;

  try {
    await salla.cart.addItem({
      id: productId,
      quantity: 1,
      options: { modifiers }
    });

    // Success state
    button.innerHTML = `
      <span class="icon-check"></span>
      تمت الإضافة
    `;

    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = 'أضف إلى السلة';
    }, 2000);

  } catch (error) {
    // Error state
    button.innerHTML = `
      <span class="icon-error"></span>
      فشلت العملية
    `;

    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = 'أضف إلى السلة';
    }, 2000);

    throw error;
  }
}
```

---

### 4. Debouncing & Throttling

Optimize performance for frequent operations:

```javascript
// Debounce function
function debounce(func, wait) {
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

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
const searchProducts = debounce(async (query) => {
  const results = await salla.product.search(query);
  displayResults(results);
}, 300);

const updateCart = throttle(async (itemId, quantity) => {
  await salla.cart.updateItem(itemId, { quantity });
}, 1000);
```

---

### 5. Validation

Always validate user input:

```javascript
// Validate modifiers
function validateModifiers(selectedModifiers, productModifiers) {
  const errors = [];

  productModifiers.forEach(modifier => {
    if (modifier.required) {
      const selected = selectedModifiers.find(m => m.id === modifier.id);
      if (!selected) {
        errors.push({
          modifierId: modifier.id,
          message: `${modifier.name} مطلوب`
        });
      }
    }

    if (modifier.type === 'checkbox' && modifier.max_selections) {
      const selected = selectedModifiers.filter(m => m.id === modifier.id);
      if (selected.length > modifier.max_selections) {
        errors.push({
          modifierId: modifier.id,
          message: `الحد الأقصى ${modifier.max_selections} اختيارات`
        });
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

// Validate delivery zone
function validateZone(zoneId, cartTotal) {
  return sufrahSettings.validateDeliveryZone(zoneId, cartTotal);
}

// Validate scheduling
function validateScheduledTime(datetime) {
  if (!sufrahSettings.isSchedulingAvailable(datetime)) {
    return {
      valid: false,
      message: 'الوقت المحدد غير متاح'
    };
  }

  return { valid: true };
}
```

---

## 💡 Examples

### Complete Add to Cart Flow

```javascript
async function completeAddToCart(productId) {
  try {
    // 1. Get product details
    const product = await salla.product.getDetails(productId);
    const modifiers = product.data.metadata.modifiers;

    // 2. Check if modifiers required
    if (modifiers && modifiers.length > 0) {
      // Show modifier modal and wait for selection
      const selectedModifiers = await showModifierModal(product);

      // 3. Validate modifiers
      const validation = validateModifiers(selectedModifiers, modifiers);
      if (!validation.valid) {
        showErrors(validation.errors);
        return;
      }

      // 4. Add to cart with modifiers
      await salla.cart.addItem({
        id: productId,
        quantity: 1,
        options: {
          modifiers: selectedModifiers
        }
      });
    } else {
      // No modifiers, add directly
      await salla.cart.addItem({
        id: productId,
        quantity: 1
      });
    }

    // 5. Show success message
    showSuccessMessage('تمت الإضافة إلى السلة');

  } catch (error) {
    console.error('Add to cart failed:', error);
    showErrorMessage('فشلت عملية الإضافة');
  }
}
```

---

### Complete Checkout Flow

```javascript
async function completeCheckout() {
  try {
    // 1. Get cart total
    const cartData = await salla.cart.getTotal();

    // 2. Validate delivery zone
    const selectedZone = getSelectedZone();
    const zoneValidation = sufrahSettings.validateDeliveryZone(
      selectedZone,
      cartData.subtotal
    );

    if (!zoneValidation.valid) {
      showErrorMessage(zoneValidation.message);
      return;
    }

    // 3. Check if scheduling
    let scheduledAt = null;
    const isScheduled = document.querySelector('#schedule-order').checked;

    if (isScheduled) {
      scheduledAt = getSelectedDateTime();
      const scheduleValidation = validateScheduledTime(new Date(scheduledAt));

      if (!scheduleValidation.valid) {
        showErrorMessage(scheduleValidation.message);
        return;
      }
    }

    // 4. Create order
    const orderData = {
      payment_method: getSelectedPaymentMethod(),
      delivery_zone_id: selectedZone,
      delivery_notes: document.querySelector('#delivery-notes').value
    };

    if (scheduledAt) {
      orderData.scheduled_at = scheduledAt;
    }

    const order = await salla.order.create(orderData);

    // 5. Redirect to success page
    window.location.href = `/orders/${order.id}`;

  } catch (error) {
    console.error('Checkout failed:', error);
    showErrorMessage('فشلت عملية الطلب');
  }
}
```

---

## 🔗 Related Documentation

- [Salla API Documentation](https://docs.salla.dev/api)
- [Components Guide](./COMPONENTS.md)
- [Customization Guide](./CUSTOMIZATION.md)
- [Settings Guide](./SETTINGS-GUIDE.md)

---

**Last Updated:** March 2024
**Version:** 1.0.0

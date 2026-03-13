# 📖 Sufrah Settings System Guide

> Complete guide to Sufrah's centralized settings management system

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Settings Schema](#settings-schema)
3. [JavaScript API](#javascript-api)
4. [Twig Helpers](#twig-helpers)
5. [Configuration Examples](#configuration-examples)
6. [Best Practices](#best-practices)

---

## 🌟 Overview

The Sufrah Settings System provides a centralized, type-safe way to manage restaurant configuration across the theme. It integrates seamlessly with Salla's configuration system while providing restaurant-specific functionality.

### Key Features

- ✅ **Type-Safe Schema** - JSON Schema validation for all settings
- ✅ **Centralized Management** - Single source of truth for configuration
- ✅ **JavaScript API** - Rich helper functions for dynamic behavior
- ✅ **Twig Macros** - Easy template access to settings
- ✅ **Caching** - Performance-optimized with smart caching
- ✅ **Validation** - Built-in validation for delivery zones, business hours, etc.

---

## 📐 Settings Schema

### Core Sections

| Section | Description | Required |
|---------|-------------|----------|
| `restaurant` | Basic restaurant information | ✅ Yes |
| `business_hours` | Operating hours and schedule | ✅ Yes |
| `delivery_zones` | Delivery areas and pricing | ✅ Yes |
| `scheduling` | Advance order booking settings | ❌ No |
| `modifiers` | Product customization options | ❌ No |
| `appearance` | Theme colors and branding | ❌ No |
| `notifications` | Alert preferences | ❌ No |
| `features` | Optional feature toggles | ❌ No |
| `payment` | Payment and pricing settings | ❌ No |
| `integrations` | Third-party services | ❌ No |

### Schema Files

- **[settings.schema.json](../settings.schema.json)** - Full JSON Schema with validation rules
- **[settings.restaurant.example.json](../settings.restaurant.example.json)** - Complete example with realistic data

---

## 💻 JavaScript API

### Getting Started

```javascript
import sufrahSettings from './helpers/settings.js';

// Settings are auto-loaded on DOM ready
// Wait for load if needed:
await sufrahSettings.load();
```

### Core Methods

#### `get(path, defaultValue)`

Get any setting value using dot notation:

```javascript
// Get restaurant name
const name = sufrahSettings.get('restaurant.name', 'My Restaurant');

// Get primary color
const color = sufrahSettings.get('appearance.primary_color', '#D97706');

// Get entire section
const zones = sufrahSettings.get('delivery_zones', []);
```

#### `isOpen()`

Check if restaurant is currently open:

```javascript
if (sufrahSettings.isOpen()) {
  console.log('Restaurant is open!');
  showOrderButton();
} else {
  console.log('Restaurant is closed');
  showClosedMessage();
}
```

#### `getNextTimeChange()`

Get information about next opening/closing:

```javascript
const nextChange = sufrahSettings.getNextTimeChange();

if (nextChange) {
  if (nextChange.type === 'closes') {
    console.log(`Closes in ${nextChange.minutes} minutes`);
  } else if (nextChange.type === 'opens') {
    console.log(`Opens in ${nextChange.minutes} minutes`);
  }
}
```

#### `getDeliveryZone(zoneId)`

Retrieve specific delivery zone:

```javascript
const zone = sufrahSettings.getDeliveryZone('zone-downtown');

console.log(zone.name);     // "وسط المدينة"
console.log(zone.price);    // 15
console.log(zone.min_order); // 50
```

#### `validateDeliveryZone(zoneId, cartTotal)`

Validate zone selection:

```javascript
const cartTotal = 75.50;
const validation = sufrahSettings.validateDeliveryZone('zone-downtown', cartTotal);

if (validation.valid) {
  console.log('Zone valid!');
  console.log(`Delivery fee: ${validation.delivery_fee}`);
} else {
  console.error(validation.message);
  console.log(`Need ${validation.difference} more`);
}
```

#### `isSchedulingAvailable(datetime)`

Check if a date/time is available for scheduling:

```javascript
const desiredTime = new Date('2026-03-15 14:30:00');

if (sufrahSettings.isSchedulingAvailable(desiredTime)) {
  console.log('Time slot available');
} else {
  console.log('Time slot not available');
}
```

### Event Handling

```javascript
// Listen for settings loaded
window.addEventListener('settings:loaded', (event) => {
  console.log('Settings loaded:', event.detail);
});
```

---

## 🎨 Twig Helpers

### Importing Helpers

```twig
{% import 'helpers/settings.twig' as settings %}
```

### Common Macros

#### Get Setting Value

```twig
{# Get restaurant name #}
{{ settings.get('restaurant.name', 'Default Name') }}

{# Get primary color #}
{{ settings.get('appearance.primary_color', '#D97706') }}
```

#### Check if Open

```twig
{% import 'helpers/settings.twig' as settings %}

{% if settings.is_restaurant_open() == 'true' %}
  <div class="badge badge-success">مفتوح الآن</div>
{% else %}
  <div class="badge badge-danger">مغلق</div>
{% endif %}
```

#### Display Status Widget

```twig
{% import 'helpers/settings.twig' as settings %}

{# Formatted status badge #}
{{ settings.get_open_status_text() }}

{# Next opening/closing message #}
{{ settings.get_next_time_message() }}
```

#### Business Hours Widget

```twig
{% import 'helpers/settings.twig' as settings %}

{# Display today's hours with status #}
{{ settings.business_hours_widget() }}

{# Display full week schedule #}
{{ settings.full_schedule() }}
```

#### Delivery Zones

```twig
{% import 'helpers/settings.twig' as settings %}

{# Display zone selector dropdown #}
{{ settings.delivery_zones_selector(selected_zone_id) }}

{# Format delivery time #}
{{ settings.format_delivery_time(zone) }}
```

#### Feature Checks

```twig
{% import 'helpers/settings.twig' as settings %}

{% if settings.is_feature_enabled('loyalty_program') == 'true' %}
  {# Show loyalty program UI #}
{% endif %}

{% if settings.should_show_calories() == 'true' %}
  <span class="calories">{{ product.calories }} cal</span>
{% endif %}
```

#### Format Currency

```twig
{% import 'helpers/settings.twig' as settings %}

{# Display price with currency #}
{{ settings.format_currency(150.50) }}
{# Output: 150.50 ر.س #}
```

#### Spice Level Indicator

```twig
{% import 'helpers/settings.twig' as settings %}

{# Display spice level with icon #}
{{ settings.spice_level_indicator('hot') }}
{# Output: 🌶️🌶️🌶️ حار #}
```

---

## 📝 Configuration Examples

### Example 1: Simple Restaurant Setup

```json
{
  "restaurant": {
    "name": "مطعم البيت",
    "phone": "+966501234567",
    "email": "info@albayt.sa"
  },
  "business_hours": {
    "timezone": "Asia/Riyadh",
    "days": {
      "saturday": {"enabled": true, "open": "10:00", "close": "22:00"},
      "sunday": {"enabled": true, "open": "10:00", "close": "22:00"},
      "monday": {"enabled": true, "open": "10:00", "close": "22:00"},
      "tuesday": {"enabled": true, "open": "10:00", "close": "22:00"},
      "wednesday": {"enabled": true, "open": "10:00", "close": "22:00"},
      "thursday": {"enabled": true, "open": "10:00", "close": "22:00"},
      "friday": {"enabled": true, "open": "14:00", "close": "22:00"}
    }
  },
  "delivery_zones": [
    {
      "id": "zone-1",
      "name": "المنطقة الرئيسية",
      "price": 15,
      "min_order": 50
    }
  ]
}
```

### Example 2: Advanced Configuration with Scheduling

```json
{
  "scheduling": {
    "enabled": true,
    "min_advance_hours": 3,
    "max_advance_days": 14,
    "slot_interval_minutes": 30,
    "buffer_time_minutes": 20,
    "blackout_dates": ["2026-06-15", "2026-06-16"],
    "same_day_cutoff_time": "20:00"
  },
  "modifiers": {
    "show_calories": true,
    "show_ingredients": true,
    "allow_special_instructions": true,
    "max_instructions_length": 250,
    "spice_levels": [
      {"id": "mild", "name": "خفيف", "icon": "🌶️"},
      {"id": "medium", "name": "متوسط", "icon": "🌶️🌶️"},
      {"id": "hot", "name": "حار", "icon": "🌶️🌶️🌶️"}
    ]
  }
}
```

### Example 3: Multiple Delivery Zones with Free Delivery

```json
{
  "delivery_zones": [
    {
      "id": "zone-central",
      "name": "وسط المدينة",
      "name_en": "Central",
      "price": 10,
      "min_order": 40,
      "free_delivery_threshold": 150,
      "estimated_time_min": 25,
      "estimated_time_max": 35
    },
    {
      "id": "zone-north",
      "name": "الشمال",
      "name_en": "North",
      "price": 20,
      "min_order": 60,
      "free_delivery_threshold": 200,
      "estimated_time_min": 40,
      "estimated_time_max": 55
    }
  ]
}
```

---

## ✅ Best Practices

### 1. Always Provide Defaults

```javascript
// ✅ Good
const name = sufrahSettings.get('restaurant.name', 'مطعمي');

// ❌ Bad
const name = sufrahSettings.get('restaurant.name'); // Could be null
```

### 2. Check Settings Load Status

```javascript
// ✅ Good
if (sufrahSettings.loaded) {
  const zones = sufrahSettings.get('delivery_zones', []);
} else {
  await sufrahSettings.load();
}

// ❌ Bad
const zones = sufrahSettings.get('delivery_zones', []); // May not be loaded yet
```

### 3. Cache Expensive Lookups

```javascript
// ✅ Good - Settings manager handles caching automatically
const zone = sufrahSettings.getDeliveryZone('zone-1');

// The cache is cleared automatically after 5 minutes
// Manual cache clear if needed:
sufrahSettings.clearCache();
```

### 4. Validate User Input

```javascript
// ✅ Good
const validation = sufrahSettings.validateDeliveryZone(zoneId, cartTotal);

if (!validation.valid) {
  showError(validation.message);
  return;
}

// Proceed with zone
processDeliveryZone(validation.zone);
```

### 5. Use Twig Macros Consistently

```twig
{# ✅ Good - Reusable component #}
{% import 'helpers/settings.twig' as settings %}
{{ settings.business_hours_widget() }}

{# ❌ Bad - Duplicate logic #}
{% set is_open = ... complex logic ... %}
```

### 6. Handle Missing Settings Gracefully

```javascript
// ✅ Good
const zones = sufrahSettings.get('delivery_zones', []);
if (zones.length === 0) {
  console.warn('No delivery zones configured');
  showConfigurationWarning();
}

// ❌ Bad
const zones = sufrahSettings.get('delivery_zones');
zones.forEach(...); // Could crash if null
```

---

## 🔧 Advanced Usage

### Custom Validation

```javascript
// Extend validation for specific business rules
function validateCateringOrder(datetime, guestCount) {
  if (!sufrahSettings.get('features.catering')) {
    return {valid: false, message: 'Catering not enabled'};
  }

  if (guestCount < 20) {
    return {valid: false, message: 'Minimum 20 guests for catering'};
  }

  // Check if time is available
  if (!sufrahSettings.isSchedulingAvailable(datetime)) {
    return {valid: false, message: 'Time slot not available'};
  }

  return {valid: true};
}
```

### Dynamic Settings Updates

```javascript
// Listen for settings changes (if implemented in future)
window.addEventListener('settings:updated', (event) => {
  const {section, value} = event.detail;

  if (section === 'business_hours') {
    updateOpenStatusDisplay();
  }
});
```

---

## 📚 Related Documentation

- [Settings Schema](../settings.schema.json) - Complete JSON Schema
- [Example Configuration](../settings.restaurant.example.json) - Full example
- [API Guide](./API-GUIDE.md) - General API documentation
- [Components Guide](./COMPONENTS.md) - Restaurant components

---

## 🆘 Troubleshooting

### Settings Not Loading

**Problem:** `sufrahSettings.loaded` is `false`

**Solution:**
```javascript
// Ensure settings are loaded before use
document.addEventListener('DOMContentLoaded', async () => {
  await sufrahSettings.load();
  // Now use settings
});
```

### Incorrect Time Zone

**Problem:** Business hours showing wrong times

**Solution:**
```json
{
  "business_hours": {
    "timezone": "Asia/Riyadh"  // Ensure correct timezone
  }
}
```

### Delivery Zone Validation Failing

**Problem:** Valid zones showing as invalid

**Solution:**
```javascript
// Check zone configuration
const zone = sufrahSettings.getDeliveryZone('zone-1');
console.log('Zone config:', zone);

// Verify cart total calculation
console.log('Cart total:', cartTotal);
console.log('Min order:', zone.min_order);
```

---

**Last Updated:** March 12, 2026
**Version:** 1.0.0

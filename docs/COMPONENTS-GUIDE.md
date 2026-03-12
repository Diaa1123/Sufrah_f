# 📚 Sufrah Restaurant Components Guide

Complete reference for all restaurant-specific UI components.

---

## 🎯 Component Overview

| Component | File | Purpose | Status |
|-----------|------|---------|--------|
| **Modifiers Modal** | `modifiers-modal.twig` | Product customization | ✅ Complete |
| **Delivery Zones** | `delivery-zone-selector.twig` | Zone selection & validation | ✅ Complete |
| **Order Scheduling** | `order-scheduling.twig` | ASAP & scheduled delivery | ✅ Complete |
| **Business Hours** | `business-hours-widget.twig` | Open/closed status | ✅ Complete |

---

## 1. 🎨 Modifiers Modal

### File Location
`src/views/components/restaurant/modifiers-modal.twig`

### Purpose
Comprehensive product customization interface allowing customers to select sizes, extras, modifications, and add special instructions.

### Props

```twig
{
  product: object,              // Required: Product data
  show_in_modal: boolean        // Default: false
}
```

### Features

- ✅ **Size Selection** - Radio buttons with price adjustments
- ✅ **Extras/Add-ons** - Multiple checkboxes with individual pricing
- ✅ **Modifications** - Free options (pill-style UI)
- ✅ **Special Instructions** - Textarea with character counter (200 chars)
- ✅ **Real-time Price Calculation** - Updates as selections change
- ✅ **Sticky Footer** - Total price always visible
- ✅ **Validation** - Required field checking
- ✅ **State Persistence** - Saves to sessionStorage

### Usage

```twig
{# Full modal mode #}
{% include 'components/restaurant/modifiers-modal.twig' with {
  product: product,
  show_in_modal: true
} %}

{# Inline mode #}
{% include 'components/restaurant/modifiers-modal.twig' with {
  product: product,
  show_in_modal: false
} %}
```

### Product Data Structure

```javascript
{
  id: "12345",
  name: "Shawarma Plate",
  price: 45.00,
  description: "Delicious chicken shawarma",
  calories: 650,
  preparation_time: 15,
  spicy_level: 2,
  ingredients: "Chicken, bread, tahini",
  allergens: "Contains gluten, sesame",

  options: {
    size_required: true,
    sizes: [
      { id: "small", name: "صغير", name_en: "Small", additional_price: 0 },
      { id: "large", name: "كبير", name_en: "Large", additional_price: 15 }
    ],
    extras: [
      { id: "cheese", name: "جبنة", name_en: "Cheese", price: 5, calories: 120 }
    ],
    modifications: [
      { id: "no-onions", name: "بدون بصل", name_en: "No Onions" }
    ]
  }
}
```

### Events

```javascript
// System ready
document.addEventListener('modifiers:ready', (e) => {
  console.log('Modifiers initialized');
});

// Size changed
document.addEventListener('modifiers:size-changed', (e) => {
  console.log('Selected size:', e.detail.size);
});

// Extra changed
document.addEventListener('modifiers:extra-changed', (e) => {
  console.log('Extra:', e.detail.extra, 'Added:', e.detail.added);
});

// Price updated
document.addEventListener('modifiers:price-updated', (e) => {
  console.log('New total:', e.detail.total);
});

// Added to cart
document.addEventListener('modifiers:added-to-cart', (e) => {
  console.log('Cart data:', e.detail.cartData);
});
```

### JavaScript API

```javascript
const modifiers = document.querySelector('[data-product-modifiers]').modifiersSystem;

// Get current state
modifiers.modifiers.size          // Selected size
modifiers.modifiers.extras        // Array of extras
modifiers.modifiers.modifications // Array of mods

// Calculate total
const total = modifiers.calculateTotal();

// Validate
const result = modifiers.validate();
if (result.valid) {
  // Proceed
}

// Reset
modifiers.reset();
```

---

## 2. 🚚 Delivery Zone Selector

### File Location
`src/views/components/restaurant/delivery-zone-selector.twig`

### Purpose
Zone selection widget with minimum order validation and shipping cost calculation.

### Props

```twig
{
  show_map: boolean,     // Default: false - Show zone map
  compact: boolean       // Default: false - Compact layout
}
```

### Features

- ✅ **Zone Dropdown** - All available zones with prices
- ✅ **Min Order Validation** - Real-time cart checking
- ✅ **Shipping Cost Update** - Integrates with Salla cart
- ✅ **Zone Details** - Fee, min order, estimated time
- ✅ **Warning Messages** - Clear validation errors
- ✅ **State Persistence** - Saves to localStorage

### Usage

```twig
{# Full mode #}
{% include 'components/restaurant/delivery-zone-selector.twig' %}

{# With map #}
{% include 'components/restaurant/delivery-zone-selector.twig' with {
  show_map: true
} %}

{# Compact mode #}
{% include 'components/restaurant/delivery-zone-selector.twig' with {
  compact: true
} %}
```

### Zone Configuration

```javascript
sufrahSettings.set('delivery_zones', [
  {
    id: 'downtown',
    name: 'وسط المدينة',
    name_en: 'Downtown',
    price: 10,
    min_order: 50,
    estimated_time: '30-45 دقيقة',
    enabled: true,
    coverage_areas: ['Downtown', 'City Center']
  }
]);
```

### Events

```javascript
document.addEventListener('zones:ready', (e) => {
  console.log('Zones loaded');
});

document.addEventListener('zones:selected', (e) => {
  console.log('Selected zone:', e.detail.zone);
});

document.addEventListener('zones:shipping-updated', (e) => {
  console.log('Shipping cost:', e.detail.price);
});
```

### JavaScript API

```javascript
const zones = document.querySelector('[data-delivery-zones]').deliveryZones;

// Select zone
zones.selectZone('downtown');

// Validate
const isValid = zones.validateSelectedZone();

// Get cheapest
const cheapest = zones.getCheapestZone();

// Reset
zones.reset();
```

---

## 3. 📅 Order Scheduling

### File Location
`src/views/components/restaurant/order-scheduling.twig`

### Purpose
ASAP and scheduled delivery selection with business hours integration.

### Features

- ✅ **ASAP Mode** - Shows estimated delivery time
- ✅ **Scheduled Mode** - Date and time pickers
- ✅ **Business Hours Check** - Auto-disables ASAP when closed
- ✅ **Time Slot Generation** - 30-minute intervals
- ✅ **Min Advance Time** - 2-hour minimum for scheduled
- ✅ **Closed Message** - Shows next opening time

### Usage

```twig
{% include 'components/restaurant/order-scheduling.twig' %}
```

### Configuration

```javascript
sufrahSettings.set('scheduling.enabled', true);
sufrahSettings.set('scheduling.min_advance_hours', 2);
sufrahSettings.set('scheduling.max_advance_days', 7);
sufrahSettings.set('scheduling.slot_interval_minutes', 30);
```

### Events

```javascript
document.addEventListener('scheduling:ready', (e) => {
  console.log('Scheduling initialized');
});

document.addEventListener('scheduling:type-changed', (e) => {
  console.log('Type:', e.detail.type); // 'asap' or 'scheduled'
});

document.addEventListener('scheduling:date-selected', (e) => {
  console.log('Date:', e.detail.date);
});

document.addEventListener('scheduling:time-selected', (e) => {
  console.log('Time:', e.detail.time);
});
```

### JavaScript API

```javascript
const scheduling = document.querySelector('[data-order-scheduling]').orderScheduling;

// Get scheduling type
scheduling.schedulingType // 'asap' or 'scheduled'

// Get selected date/time
scheduling.selectedDate
scheduling.selectedTime

// Validate
const result = scheduling.validate();

// Get data for order
const data = scheduling.getSchedulingData();
// { type, scheduledFor, estimatedDelivery }
```

---

## 4. 🕒 Business Hours Widget

### File Location
`src/views/components/restaurant/business-hours-widget.twig`

### Purpose
Display current open/closed status with countdown and weekly hours.

### Props

```twig
{
  show_today_only: boolean,  // Default: false
  compact: boolean           // Default: false
}
```

### Features

- ✅ **Real-time Status** - Updates every minute
- ✅ **Closing Countdown** - Shows time remaining (< 1 hour)
- ✅ **Next Opening** - Displays when closed
- ✅ **Weekly Schedule** - Full hours table
- ✅ **Current Day Highlight** - Visual marker
- ✅ **Compact Badge Mode** - For headers/navigation

### Usage

```twig
{# Full mode #}
{% include 'components/restaurant/business-hours-widget.twig' %}

{# Compact badge #}
{% include 'components/restaurant/business-hours-widget.twig' with {
  compact: true
} %}

{# Today only #}
{% include 'components/restaurant/business-hours-widget.twig' with {
  show_today_only: true
} %}
```

### Configuration

```javascript
sufrahSettings.set('business_hours.schedule', {
  monday: { enabled: true, open: '09:00', close: '23:00' },
  friday: { enabled: true, open: '09:00', close: '00:00' },
  sunday: { enabled: false }
});
```

### JavaScript API

```javascript
const hours = widget.businessHours;

// Check if open
const isOpen = hours.isOpen();

// Get time until closing
const timeLeft = hours.getTimeUntilClosing();
// { minutes, hours, formatted, closeTime }

// Get next opening
const next = hours.getNextOpening();
// { day, time, date }
```

---

## 🎨 Styling Guidelines

### Color Palette

```scss
$restaurant-primary: #D97706;      // Warm amber
$restaurant-secondary: #059669;    // Fresh green
$restaurant-accent: #EF4444;       // Alert red
```

### Typography

- **Headings:** Bold, clear hierarchy
- **Body:** 16px base size
- **Arabic:** Cairo/Tajawal font family
- **English:** Inter/SF Pro font family

### Spacing Scale

```scss
$spacing-xs: 0.25rem;   // 4px
$spacing-sm: 0.5rem;    // 8px
$spacing-md: 1rem;      // 16px
$spacing-lg: 1.5rem;    // 24px
$spacing-xl: 2rem;      // 32px
```

### Border Radius

```scss
$radius-sm: 0.5rem;     // 8px
$radius-md: 0.75rem;    // 12px
$radius-lg: 1rem;       // 16px
$radius-xl: 1.5rem;     // 24px
```

### Shadows

```scss
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

---

## ♿ Accessibility Features

### Keyboard Navigation

- ✅ All interactive elements focusable
- ✅ Logical tab order
- ✅ Focus visible states (ring-4)
- ✅ Escape key closes modals

### Screen Readers

- ✅ Semantic HTML
- ✅ ARIA labels where needed
- ✅ Status announcements
- ✅ Error message linking

### Visual

- ✅ Color contrast WCAG AA compliant
- ✅ High contrast mode support
- ✅ Text scalable to 200%
- ✅ No color-only information

### Motion

- ✅ Reduced motion support
- ✅ Optional animations
- ✅ No auto-playing content

---

## 📱 Responsive Behavior

### Mobile (<640px)

- Single column layouts
- Full-width components
- Touch-friendly targets (≥44px)
- Simplified UI

### Tablet (640px - 1024px)

- 2-column grids
- Optimized spacing
- Balanced layouts

### Desktop (>1024px)

- 3-4 column grids
- Hover effects enabled
- Maximum information density

---

## 🌍 Internationalization

### RTL Support

All components fully support RTL (Arabic) layout:
- Mirrored layouts
- Correct text alignment
- Reversed animations
- Localized number formatting

### Multi-language

```twig
{# Arabic #}
<html lang="ar" dir="rtl">

{# English #}
<html lang="en" dir="ltr">
```

---

## 🧪 Testing Checklist

### Visual Testing

- [ ] All states rendered correctly
- [ ] Animations smooth (60fps)
- [ ] No layout shift
- [ ] Icons/images load properly

### Functional Testing

- [ ] All interactions work
- [ ] Validation accurate
- [ ] Data persists correctly
- [ ] Events fire as expected

### Accessibility Testing

- [ ] Keyboard navigation complete
- [ ] Screen reader compatible
- [ ] Color contrast passes
- [ ] Focus states visible

### Performance Testing

- [ ] Load time <100ms
- [ ] No blocking operations
- [ ] Smooth scrolling
- [ ] No memory leaks

---

## 📚 Related Documentation

- [Modifiers System Guide](MODIFIERS-SYSTEM-GUIDE.md)
- [Delivery Zones Guide](DELIVERY-ZONES-GUIDE.md)
- [Scheduling Guide](ORDER-SCHEDULING-GUIDE.md)
- [Design System](DESIGN-SYSTEM.md)

---

**Version:** 1.0.0
**Last Updated:** 2026-03-12
**Maintained By:** Agent 03 - UI/UX Designer

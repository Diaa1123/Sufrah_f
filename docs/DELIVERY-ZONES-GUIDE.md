# 🚚 Delivery Zones System - Complete Guide

## Overview

The Delivery Zones System allows restaurants to:
- Define multiple delivery zones with different pricing
- Set minimum order requirements per zone
- Provide estimated delivery times
- Validate cart totals against zone requirements
- Automatically update shipping costs in Salla cart

---

## 🚀 Quick Start

### 1. Basic Setup

```twig
{# In your cart.twig or checkout.twig #}
{% include 'components/restaurant/delivery-zone-selector.twig' %}
```

That's it! The system auto-initializes and loads zones from settings.

---

## ⚙️ Configuration

### Define Delivery Zones

Zones are configured in your settings:

```javascript
// In your admin panel or settings.js
sufrahSettings.set('delivery_zones', [
  {
    id: 'downtown',
    name: 'وسط المدينة',
    name_en: 'Downtown',
    price: 10,
    min_order: 50,
    estimated_time: '30-45 دقيقة',
    enabled: true,
    coverage_areas: ['Downtown', 'City Center', 'Al-Balad']
  },
  {
    id: 'north',
    name: 'شمال الرياض',
    name_en: 'North Riyadh',
    price: 15,
    min_order: 75,
    estimated_time: '45-60 دقيقة',
    enabled: true,
    coverage_areas: ['Al-Nakheel', 'Al-Sahafa']
  },
  {
    id: 'suburbs',
    name: 'الضواحي',
    name_en: 'Suburbs',
    price: 25,
    min_order: 100,
    estimated_time: '60-90 دقيقة',
    enabled: false, // Disabled zone
    coverage_areas: ['Al-Kharj Road', 'Exit 10']
  }
]);
```

### Zone Properties Explained

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | ✅ | Unique zone identifier |
| `name` | string | ✅ | Arabic zone name |
| `name_en` | string | ❌ | English zone name (fallback to `name`) |
| `price` | number | ✅ | Delivery fee in SAR |
| `min_order` | number | ✅ | Minimum cart total required |
| `estimated_time` | string | ✅ | Delivery time estimate |
| `enabled` | boolean | ❌ | Is zone active (default: `true`) |
| `coverage_areas` | string[] | ❌ | Covered districts/cities for smart matching |
| `coordinates` | object | ❌ | `{ lat, lng }` for map display |

---

## 💻 JavaScript API

### Initialization

```javascript
import DeliveryZonesSystem from './restaurant/delivery-zones.js';

// Auto-initialization (default)
// Any element with [data-delivery-zones] auto-initializes

// Manual initialization
const container = document.querySelector('[data-delivery-zones]');
const zones = new DeliveryZonesSystem(container);
```

### Instance Methods

```javascript
const zones = container.deliveryZones;

// Select a zone
zones.selectZone('downtown');

// Get selected zone
console.log(zones.selectedZone);
// { id: 'downtown', name: 'وسط المدينة', price: 10, ... }

// Get all zones
console.log(zones.zones);
// [{ ... }, { ... }, ...]

// Validate current selection
const isValid = zones.validateSelectedZone();
// true or false

// Validate specific zone
const validation = zones.validateZone('downtown', 100);
console.log(validation);
// { valid: true, zone: { ... } }
// OR
// { valid: false, error: 'min_order_not_met', required: 50, current: 30, difference: 20 }

// Get cheapest zone
const cheapest = zones.getCheapestZone();
console.log(cheapest.price); // Lowest price

// Get fastest zone
const fastest = zones.getFastestZone();
console.log(fastest.estimated_time); // Shortest time

// Check if area is covered
const available = zones.isDeliveryAvailable('Downtown');
console.log(available); // true or false

// Reset selection
zones.reset();

// Destroy instance
zones.destroy();
```

### Events

```javascript
// System ready
document.addEventListener('zones:ready', (e) => {
  console.log('Zones loaded:', e.detail.zones);
  console.log('Cart total:', e.detail.cartTotal);
});

// Zone selected
document.addEventListener('zones:selected', (e) => {
  console.log('Selected zone:', e.detail.zone);
  console.log('Zone price:', e.detail.zone.price);

  // Update UI, analytics, etc.
  gtag('event', 'select_delivery_zone', {
    zone_id: e.detail.zone.id,
    zone_price: e.detail.zone.price
  });
});

// Shipping updated
document.addEventListener('zones:shipping-updated', (e) => {
  console.log('New shipping cost:', e.detail.price);

  // Refresh cart display
  updateCartTotals();
});

// Selection reset
document.addEventListener('zones:reset', () => {
  console.log('Zone selection cleared');
});
```

---

## 🎨 UI Customization

### Component Options

```twig
{% include 'components/restaurant/delivery-zone-selector.twig' with {
  show_map: true,     {# Show zone map (default: false) #}
  compact: true       {# Compact layout (default: false) #}
} %}
```

### Custom Styling

Override default styles:

```scss
// In your custom.scss
.delivery-zones-widget {
  // Change colors
  .bg-primary-600 {
    @apply bg-blue-600;
  }

  // Adjust spacing
  .p-4 {
    @apply p-6;
  }

  // Custom dropdown
  [data-zone-selector] {
    @apply rounded-full border-4;
  }
}
```

### Hide Components

```html
<!-- Hide map -->
<style>
  [data-zone-map] {
    display: none !important;
  }
</style>

<!-- Hide coverage info -->
<style>
  .bg-blue-50.border-blue-200 {
    display: none;
  }
</style>
```

---

## 🔄 Integration Workflows

### With Salla Cart

```javascript
// Listen for cart updates
salla.event.on('cart::updated', (data) => {
  console.log('Cart updated:', data.total);

  // Zones system automatically revalidates
  // You can also manually trigger validation
  const zones = document.querySelector('[data-delivery-zones]').deliveryZones;
  zones.validateSelectedZone();
});

// Listen for cart cleared
salla.event.on('cart::cleared', () => {
  const zones = document.querySelector('[data-delivery-zones]').deliveryZones;
  zones.reset();
});
```

### With Checkout

```javascript
// Before checkout submission
document.addEventListener('checkout:before-submit', (e) => {
  const zones = document.querySelector('[data-delivery-zones]').deliveryZones;

  if (!zones.selectedZone) {
    e.preventDefault();
    salla.notify.error('Please select a delivery zone');
    return;
  }

  if (!zones.validateSelectedZone()) {
    e.preventDefault();
    salla.notify.error('Cart does not meet minimum order for selected zone');
    return;
  }
});
```

### With Address Form

```javascript
// Smart zone suggestion based on address
const addressForm = document.querySelector('#address-form');

addressForm.addEventListener('submit', (e) => {
  const district = e.target.district.value;

  // Suggest zone
  const zones = document.querySelector('[data-delivery-zones]').deliveryZones;
  zones.suggestZoneFromAddress({ district });
});

// OR trigger custom event
document.dispatchEvent(new CustomEvent('checkout:address-changed', {
  detail: {
    address: {
      district: 'Downtown',
      city: 'Riyadh'
    }
  }
}));
```

---

## 🧪 Testing Guide

### Manual Testing Checklist

**Zone Selection:**
- [ ] Dropdown shows all enabled zones
- [ ] Zone selection updates details grid
- [ ] Delivery fee displayed correctly
- [ ] Min order displayed correctly
- [ ] Estimated time displayed correctly

**Validation:**
- [ ] Cart below min order → Warning shown
- [ ] Cart meets min order → Shipping added
- [ ] Cart increases → Auto-revalidation works
- [ ] Disabled zone → Not shown in dropdown

**Persistence:**
- [ ] Select zone → Refresh → Selection restored
- [ ] Complete order → Refresh → Selection cleared

**Multi-language:**
- [ ] Arabic locale → Shows Arabic names
- [ ] English locale → Shows English names (or fallback)
- [ ] Prices formatted correctly (AR vs EN)

### Automated Testing

```javascript
describe('DeliveryZonesSystem', () => {
  let zones;

  beforeEach(() => {
    // Setup
    zones = new DeliveryZonesSystem(container);
  });

  test('loads zones from settings', () => {
    expect(zones.zones.length).toBeGreaterThan(0);
  });

  test('validates minimum order', () => {
    zones.cartTotal = 30;
    const validation = zones.validateZone('downtown', 30);

    expect(validation.valid).toBe(false);
    expect(validation.error).toBe('min_order_not_met');
    expect(validation.difference).toBe(20); // 50 - 30
  });

  test('finds cheapest zone', () => {
    const cheapest = zones.getCheapestZone();
    expect(cheapest.price).toBe(10); // Downtown
  });

  test('persists selection', () => {
    zones.selectZone('downtown');

    const saved = localStorage.getItem('sufrah_selected_zone');
    expect(saved).toBe('downtown');
  });
});
```

---

## 🌍 Multi-language Support

### Translation Keys

```json
{
  "ar": {
    "restaurant": {
      "delivery_zone": "منطقة التوصيل",
      "select_zone": "اختر منطقة التوصيل",
      "select_zone_desc": "حدد منطقتك لحساب رسوم التوصيل",
      "delivery_fee": "رسوم التوصيل",
      "min_order": "الحد الأدنى للطلب",
      "estimated_time": "وقت التوصيل المتوقع",
      "zone_coverage_info": "يتم التوصيل للمناطق المحددة فقط",
      "zone_suggested": "تم اقتراح منطقة {zone} بناءً على عنوانك",

      "errors": {
        "zone_not_found": "المنطقة غير موجودة",
        "zone_disabled": "التوصيل غير متاح لهذه المنطقة حالياً",
        "min_order_not_met": "الحد الأدنى للطلب {required}، يتبقى {difference}",
        "delivery_unavailable": "التوصيل غير متاح"
      }
    }
  },

  "en": {
    "restaurant": {
      "delivery_zone": "Delivery Zone",
      "select_zone": "Select Delivery Zone",
      "select_zone_desc": "Choose your area to calculate delivery fees",
      "delivery_fee": "Delivery Fee",
      "min_order": "Minimum Order",
      "estimated_time": "Estimated Time",
      "zone_coverage_info": "Delivery only to selected areas",
      "zone_suggested": "Zone {zone} suggested based on your address",

      "errors": {
        "zone_not_found": "Zone not found",
        "zone_disabled": "Delivery unavailable for this zone currently",
        "min_order_not_met": "Minimum order {required}, {difference} more needed",
        "delivery_unavailable": "Delivery unavailable"
      }
    }
  }
}
```

---

## 🔧 Advanced Usage

### Custom Validation Rules

```javascript
class CustomZonesSystem extends DeliveryZonesSystem {
  validateZone(zoneId, cartTotal) {
    const validation = super.validateZone(zoneId, cartTotal);

    // Custom rule: Peak hour surcharge
    const hour = new Date().getHours();
    if (hour >= 18 && hour <= 21) {
      const zone = this.zones.find(z => z.id === zoneId);
      zone.price *= 1.5; // 50% surcharge
    }

    return validation;
  }
}
```

### Dynamic Zone Loading

```javascript
class DynamicZonesSystem extends DeliveryZonesSystem {
  async loadZones() {
    try {
      // Load from API instead of settings
      const response = await fetch('/api/delivery-zones');
      this.zones = await response.json();

      // Filter and sort
      this.zones = this.zones.filter(z => z.enabled);
      this.zones.sort((a, b) => a.price - b.price);

    } catch (error) {
      console.error('Failed to load zones:', error);
      // Fallback to settings
      await super.loadZones();
    }
  }
}
```

### Map Integration

```javascript
updateMap(coordinates) {
  if (!window.google) {
    console.warn('Google Maps not loaded');
    return;
  }

  const mapElement = this.elements.map.querySelector('#zone-map');

  const map = new google.maps.Map(mapElement, {
    center: coordinates,
    zoom: 13
  });

  // Draw zone boundary (if polygon data available)
  if (this.selectedZone.boundary) {
    const polygon = new google.maps.Polygon({
      paths: this.selectedZone.boundary,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });
    polygon.setMap(map);
  }
}
```

---

## 📊 Analytics Integration

### Google Analytics

```javascript
document.addEventListener('zones:selected', (e) => {
  gtag('event', 'select_delivery_zone', {
    event_category: 'Delivery',
    event_label: e.detail.zone.name,
    value: e.detail.zone.price
  });
});

document.addEventListener('zones:shipping-updated', (e) => {
  gtag('event', 'shipping_calculated', {
    event_category: 'Checkout',
    shipping_cost: e.detail.price
  });
});
```

### Facebook Pixel

```javascript
document.addEventListener('zones:selected', (e) => {
  fbq('track', 'AddToCart', {
    content_name: 'Delivery Zone',
    content_ids: [e.detail.zone.id],
    value: e.detail.zone.price,
    currency: 'SAR'
  });
});
```

---

## 🚀 Performance Optimization

### Lazy Load Zones

```javascript
// Only load zones when widget is visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      new DeliveryZonesSystem(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('[data-delivery-zones]').forEach(container => {
  observer.observe(container);
});
```

### Cache Zones

```javascript
class CachedZonesSystem extends DeliveryZonesSystem {
  async loadZones() {
    // Check cache first
    const cached = sessionStorage.getItem('delivery_zones_cache');

    if (cached) {
      this.zones = JSON.parse(cached);
      return;
    }

    // Load from settings
    await super.loadZones();

    // Cache for session
    sessionStorage.setItem('delivery_zones_cache', JSON.stringify(this.zones));
  }
}
```

---

## 🐛 Troubleshooting

### Issue: Zones not loading

**Solution:** Check settings configuration

```javascript
// Verify zones exist
console.log(sufrahSettings.get('delivery_zones'));

// Check for errors
console.error('Zones loading failed');
```

### Issue: Validation not working

**Solution:** Ensure cart total is updated

```javascript
const zones = container.deliveryZones;
console.log('Cart total:', zones.cartTotal);

// Manually update
zones.cartTotal = 100;
zones.validateSelectedZone();
```

### Issue: Shipping not updating in cart

**Solution:** Check Salla API integration

```javascript
// Test API call
salla.cart.updateShipping({
  cost: 15,
  method: 'Express'
}).then(response => {
  console.log('Shipping updated:', response);
}).catch(error => {
  console.error('Shipping update failed:', error);
});
```

---

## 📚 Related Documentation

- [Salla Cart API](https://docs.salla.dev/docs/api/cart)
- [Modifiers System Guide](MODIFIERS-SYSTEM-GUIDE.md)
- [Task 2.2 Completion](../TASK-2.2-COMPLETION.md)

---

**For support, refer to:** [TASK-2.2-COMPLETION.md](../TASK-2.2-COMPLETION.md)

# 🔌 Delivery Zones Integration Examples

## Example 1: Basic Cart Integration

```twig
{# cart.twig #}
<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">{{ 'cart.title'|t }}</h1>

  {# Cart Items #}
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {# Left: Cart Items #}
    <div class="lg:col-span-2">
      {% include 'components/cart/items.twig' %}
    </div>

    {# Right: Summary & Delivery #}
    <div class="space-y-4">
      {# Delivery Zone Selector #}
      {% include 'components/restaurant/delivery-zone-selector.twig' %}

      {# Cart Summary #}
      {% include 'components/cart/summary.twig' %}
    </div>
  </div>
</div>
```

---

## Example 2: Checkout Page Integration

```twig
{# checkout.twig #}
<div class="checkout-container">
  <form id="checkout-form">
    {# Step 1: Customer Info #}
    <div class="checkout-step">
      <h2>{{ 'checkout.customer_info'|t }}</h2>
      {% include 'components/checkout/customer-form.twig' %}
    </div>

    {# Step 2: Delivery Address #}
    <div class="checkout-step">
      <h2>{{ 'checkout.delivery_address'|t }}</h2>
      {% include 'components/checkout/address-form.twig' %}
    </div>

    {# Step 3: Delivery Zone (Auto-suggest based on address) #}
    <div class="checkout-step">
      <h2>{{ 'checkout.delivery_zone'|t }}</h2>
      {% include 'components/restaurant/delivery-zone-selector.twig' with {
        show_map: true
      } %}
    </div>

    {# Step 4: Payment #}
    <div class="checkout-step">
      <h2>{{ 'checkout.payment'|t }}</h2>
      {% include 'components/checkout/payment-methods.twig' %}
    </div>

    <button type="submit" class="btn-primary">
      {{ 'checkout.complete_order'|t }}
    </button>
  </form>
</div>

<script>
document.getElementById('checkout-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate delivery zone
  const zones = document.querySelector('[data-delivery-zones]').deliveryZones;

  if (!zones.selectedZone) {
    salla.notify.error('{{ 'checkout.errors.no_zone_selected'|t }}');
    return;
  }

  if (!zones.validateSelectedZone()) {
    salla.notify.error('{{ 'checkout.errors.min_order_not_met'|t }}');
    return;
  }

  // Proceed with checkout
  const orderData = {
    customer: getCustomerData(),
    address: getAddressData(),
    delivery_zone: zones.selectedZone.id,
    shipping_cost: zones.selectedZone.price,
    payment_method: getPaymentMethod()
  };

  try {
    const order = await salla.order.create(orderData);
    window.location.href = `/order/${order.id}/confirmation`;
  } catch (error) {
    salla.notify.error(error.message);
  }
});
</script>
```

---

## Example 3: Smart Zone Suggestion from Address

```javascript
// address-form.js
const addressForm = document.getElementById('address-form');
const zoneSelector = document.querySelector('[data-delivery-zones]');

addressForm.addEventListener('change', (e) => {
  if (e.target.name === 'district' || e.target.name === 'city') {
    // Get zones system
    const zones = zoneSelector.deliveryZones;

    // Get address data
    const address = {
      district: addressForm.district.value,
      city: addressForm.city.value
    };

    // Trigger suggestion
    zones.suggestZoneFromAddress(address);
  }
});
```

---

## Example 4: Dynamic Minimum Order Alert

```javascript
// Show alert when approaching minimum order
document.addEventListener('zones:selected', (e) => {
  const zone = e.detail.zone;
  const cartTotal = e.detail.cartTotal;

  const remaining = zone.min_order - cartTotal;

  if (remaining > 0 && remaining <= 20) {
    // Close to minimum, encourage adding more
    salla.notify.info(
      `Add ${remaining} SAR more to unlock delivery to ${zone.name}!`,
      {
        action: {
          label: 'Browse Products',
          onClick: () => window.location.href = '/products'
        }
      }
    );
  }
});
```

---

## Example 5: Zone-Specific Product Recommendations

```javascript
// Recommend products to meet minimum order
document.addEventListener('zones:selected', (e) => {
  const zone = e.detail.zone;
  const cartTotal = e.detail.cartTotal;

  if (cartTotal < zone.min_order) {
    const difference = zone.min_order - cartTotal;

    // Fetch products under the difference amount
    fetch(`/api/products?max_price=${difference}&limit=3`)
      .then(res => res.json())
      .then(products => {
        showRecommendationsModal(products, difference);
      });
  }
});

function showRecommendationsModal(products, targetAmount) {
  const modal = `
    <div class="modal">
      <h3>Add ${targetAmount} SAR more to complete your order</h3>
      <div class="products-grid">
        ${products.map(p => `
          <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <h4>${p.name}</h4>
            <span class="price">${p.price} SAR</span>
            <button onclick="addToCart(${p.id})">Add</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Show modal (use your modal library)
  showModal(modal);
}
```

---

## Example 6: Multi-Zone Comparison

```javascript
// Show comparison of all zones
function showZoneComparison() {
  const zones = document.querySelector('[data-delivery-zones]').deliveryZones;

  const comparison = zones.zones.map(zone => ({
    name: zone.name,
    price: zone.price,
    minOrder: zone.min_order,
    time: zone.estimated_time
  }));

  // Render comparison table
  const table = `
    <table class="zone-comparison">
      <thead>
        <tr>
          <th>Zone</th>
          <th>Delivery Fee</th>
          <th>Min Order</th>
          <th>Est. Time</th>
        </tr>
      </thead>
      <tbody>
        ${comparison.map(z => `
          <tr>
            <td>${z.name}</td>
            <td>${z.price} SAR</td>
            <td>${z.minOrder} SAR</td>
            <td>${z.time}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  // Display in modal or sidebar
  showComparison(table);
}
```

---

## Example 7: Conditional Free Delivery

```javascript
// Offer free delivery for orders above threshold
class PromoZonesSystem extends DeliveryZonesSystem {
  updateShipping(price) {
    const freeDeliveryThreshold = 200;

    if (this.cartTotal >= freeDeliveryThreshold) {
      // Free delivery!
      salla.notify.success('🎉 Free delivery unlocked!');
      super.updateShipping(0);
    } else {
      super.updateShipping(price);
    }
  }
}
```

---

## Example 8: Peak Hour Surcharge

```javascript
// Add surcharge during peak hours
class PeakHourZonesSystem extends DeliveryZonesSystem {
  selectZone(zoneId) {
    super.selectZone(zoneId);

    if (!this.selectedZone) return;

    const hour = new Date().getHours();
    const isPeakHour = hour >= 18 && hour <= 21;

    if (isPeakHour) {
      const surcharge = this.selectedZone.price * 0.5;
      const totalPrice = this.selectedZone.price + surcharge;

      salla.notify.warning(
        `Peak hour surcharge: +${surcharge} SAR (6 PM - 9 PM)`
      );

      this.updateShipping(totalPrice);
    }
  }
}
```

---

## Example 9: Analytics Tracking

```javascript
// Track zone selection analytics
document.addEventListener('zones:selected', (e) => {
  const zone = e.detail.zone;

  // Google Analytics
  gtag('event', 'select_delivery_zone', {
    event_category: 'Delivery',
    event_label: zone.name,
    zone_id: zone.id,
    zone_price: zone.price,
    cart_total: e.detail.cartTotal
  });

  // Facebook Pixel
  fbq('track', 'CustomizeProduct', {
    content_name: 'Delivery Zone',
    content_ids: [zone.id],
    value: zone.price,
    currency: 'SAR'
  });

  // Custom Analytics
  fetch('/api/analytics/zone-selection', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      zone_id: zone.id,
      zone_price: zone.price,
      cart_total: e.detail.cartTotal,
      timestamp: new Date().toISOString()
    })
  });
});
```

---

## Example 10: Save Zone to User Profile

```javascript
// Save preferred zone to user account
document.addEventListener('zones:selected', async (e) => {
  const zone = e.detail.zone;

  if (salla.user.isLoggedIn()) {
    try {
      await fetch('/api/user/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preferred_delivery_zone: zone.id
        })
      });

      console.log('Preferred zone saved to profile');
    } catch (error) {
      console.warn('Could not save zone preference:', error);
    }
  }
});

// Restore preferred zone on page load
document.addEventListener('zones:ready', async (e) => {
  if (salla.user.isLoggedIn()) {
    try {
      const res = await fetch('/api/user/preferences');
      const prefs = await res.json();

      if (prefs.preferred_delivery_zone) {
        const zones = document.querySelector('[data-delivery-zones]').deliveryZones;
        zones.selectZone(prefs.preferred_delivery_zone);
      }
    } catch (error) {
      console.warn('Could not restore zone preference:', error);
    }
  }
});
```

---

## Example 11: A/B Testing

```javascript
// Test different zone pricing strategies
class ABTestZonesSystem extends DeliveryZonesSystem {
  async loadZones() {
    await super.loadZones();

    // Determine test variant
    const variant = Math.random() < 0.5 ? 'A' : 'B';

    if (variant === 'B') {
      // Variant B: 20% discount on delivery
      this.zones = this.zones.map(zone => ({
        ...zone,
        price: zone.price * 0.8,
        ab_test: 'variant_b'
      }));
    }

    // Track variant
    gtag('event', 'ab_test_variant', {
      experiment_id: 'delivery_pricing_test',
      variant: variant
    });
  }
}
```

---

## Example 12: Zone Availability Schedule

```javascript
// Show zones only during operating hours
class ScheduledZonesSystem extends DeliveryZonesSystem {
  async loadZones() {
    await super.loadZones();

    const now = new Date();
    const day = now.getDay(); // 0 = Sunday
    const hour = now.getHours();

    // Filter zones by schedule
    this.zones = this.zones.filter(zone => {
      if (!zone.schedule) return true;

      const schedule = zone.schedule[day];
      if (!schedule) return false;

      return hour >= schedule.open && hour < schedule.close;
    });

    if (this.zones.length === 0) {
      salla.notify.warning('Delivery is currently closed. Opens tomorrow at 10 AM.');
    }
  }
}

// Example zone with schedule
const zoneWithSchedule = {
  id: 'downtown',
  name: 'Downtown',
  price: 10,
  min_order: 50,
  estimated_time: '30-45 min',
  schedule: {
    0: null, // Sunday: Closed
    1: { open: 10, close: 22 }, // Monday
    2: { open: 10, close: 22 }, // Tuesday
    3: { open: 10, close: 22 }, // Wednesday
    4: { open: 10, close: 22 }, // Thursday
    5: { open: 10, close: 23 }, // Friday
    6: { open: 10, close: 23 }  // Saturday
  }
};
```

---

## Example 13: Express Delivery Option

```twig
{# Add express delivery toggle #}
<div data-delivery-zones>
  {# ... existing zone selector ... #}

  <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
    <label class="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        id="express-delivery"
        class="w-5 h-5 text-primary-600"
      >
      <div class="flex-1">
        <div class="font-semibold text-gray-900">
          ⚡ Express Delivery (+15 SAR)
        </div>
        <div class="text-sm text-gray-600">
          Get your order 50% faster!
        </div>
      </div>
    </label>
  </div>
</div>

<script>
document.getElementById('express-delivery').addEventListener('change', (e) => {
  const zones = document.querySelector('[data-delivery-zones]').deliveryZones;

  if (e.target.checked) {
    const expressPrice = zones.selectedZone.price + 15;
    zones.updateShipping(expressPrice);

    salla.notify.success('Express delivery enabled!');
  } else {
    zones.updateShipping(zones.selectedZone.price);
  }
});
</script>
```

---

## Example 14: Real-time Distance Calculation

```javascript
// Calculate delivery fee based on distance (requires Geocoding API)
class DistanceBasedZonesSystem extends DeliveryZonesSystem {
  async calculateDistance(destination) {
    const restaurantLocation = { lat: 24.7136, lng: 46.6753 };

    const service = new google.maps.DistanceMatrixService();

    return new Promise((resolve, reject) => {
      service.getDistanceMatrix({
        origins: [restaurantLocation],
        destinations: [destination],
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          const distance = response.rows[0].elements[0].distance.value; // meters
          resolve(distance / 1000); // km
        } else {
          reject(status);
        }
      });
    });
  }

  async selectZone(zoneId) {
    await super.selectZone(zoneId);

    if (!this.selectedZone) return;

    // Get user's address coordinates
    const userAddress = await this.getUserAddress();

    if (userAddress.coordinates) {
      const distance = await this.calculateDistance(userAddress.coordinates);

      // Dynamic pricing: 2 SAR per km
      const distancePrice = Math.ceil(distance * 2);
      const totalPrice = Math.max(this.selectedZone.price, distancePrice);

      this.updateShipping(totalPrice);

      salla.notify.info(`Distance: ${distance.toFixed(1)} km - ${totalPrice} SAR`);
    }
  }
}
```

---

These examples demonstrate the flexibility and extensibility of the Delivery Zones System. Mix and match to create the perfect delivery experience for your restaurant! 🚀

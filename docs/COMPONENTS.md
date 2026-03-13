# 🧩 Sufrah Components Guide

> دليل مكونات قالب Sufrah

---

## 📋 Table of Contents

1. [Restaurant Components](#restaurant-components)
2. [Usage Examples](#usage-examples)
3. [Customization](#customization)
4. [Props & Options](#props--options)

---

## 🍽️ Restaurant Components

### 1. Modifiers Modal

**Location:** `src/views/components/restaurant/modifiers-modal.twig`

**Purpose:** Display product modifiers (size, toppings, sauces) in an interactive modal.

**Usage:**
```twig
{% include 'components.restaurant.modifiers-modal' with {
  product: product,
  modifiers: product.metadata.modifiers
} %}
```

**Features:**
- ✅ Required vs optional modifiers
- ✅ Single selection (radio) or multiple (checkbox)
- ✅ Price calculation in real-time
- ✅ Validation before adding to cart
- ✅ Bilingual support (AR/EN)

---

### 2. Dish Card

**Location:** `src/views/components/restaurant/dish-card.twig`

**Purpose:** Enhanced product card specifically designed for food items.

**Usage:**
```twig
{% include 'components.restaurant.dish-card' with {
  product: product,
  show_calories: true,
  show_prep_time: true
} %}
```

**Features:**
- ✅ Food-optimized image display
- ✅ Calorie information
- ✅ Preparation time
- ✅ Allergen badges
- ✅ Quick-add button
- ✅ Responsive design

**Preview:**
```
┌─────────────────────────┐
│   [Product Image]       │
│                         │
├─────────────────────────┤
│ Grilled Chicken         │
│ 🔥 350 cal | ⏱️ 15 min  │
│                         │
│ SAR 45.00      [+ Add]  │
└─────────────────────────┘
```

---

### 3. Menu Navigation

**Location:** `src/views/components/restaurant/menu-nav.twig`

**Purpose:** Sticky category navigation for easy menu browsing.

**Usage:**
```twig
{% include 'components.restaurant.menu-nav' with {
  categories: categories,
  active_category: 'main-dishes'
} %}
```

**Features:**
- ✅ Sticky navigation on scroll
- ✅ Smooth scrolling to categories
- ✅ Active state highlighting
- ✅ Mobile-friendly horizontal scroll

---

### 4. Business Hours Widget

**Location:** `src/views/components/restaurant/business-hours-widget.twig`

**Purpose:** Display current restaurant status (open/closed) and working hours.

**Usage:**
```twig
{% include 'components.restaurant.business-hours-widget' with {
  business_hours: store.business_hours,
  show_full_schedule: false
} %}
```

**Features:**
- ✅ Real-time open/closed status
- ✅ Countdown to opening/closing
- ✅ Full week schedule (optional)
- ✅ Special hours support
- ✅ Auto-updates every minute

**Display States:**
```
🟢 مفتوح الآن • يغلق الساعة 10:00 م
🔴 مغلق الآن • يفتح غداً الساعة 9:00 ص
```

---

### 5. Delivery Zone Selector

**Location:** `src/views/components/restaurant/delivery-zone-selector.twig`

**Purpose:** Allow customers to select delivery zone and see fees.

**Usage:**
```twig
{% include 'components.restaurant.delivery-zone-selector' with {
  zones: delivery_zones,
  selected_zone: user.zone
} %}
```

**Features:**
- ✅ Zone dropdown selection
- ✅ Automatic fee calculation
- ✅ Estimated delivery time
- ✅ Zone availability check

---

## 💻 Usage Examples

### Example 1: Product Page with Modifiers

```twig
{# pages/product/single.twig #}

<div class="product-page">
  {# Product Images #}
  <div class="product-gallery">
    {# ... #}
  </div>

  {# Product Info #}
  <div class="product-info">
    <h1>{{ product.name }}</h1>

    {# Calories & Prep Time #}
    {% if product.metadata.calories %}
      <span class="text-gray-600">
        🔥 {{ product.metadata.calories }} {{ trans('restaurant.product.calories') }}
      </span>
    {% endif %}

    {# Add to Cart Button #}
    <button onclick="showModifiersModal({{ product.id }})">
      {{ trans('restaurant.modifiers.add_to_cart') }}
    </button>
  </div>
</div>

{# Modifiers Modal #}
{% include 'components.restaurant.modifiers-modal' with {
  product: product
} %}
```

---

### Example 2: Menu Page with Categories

```twig
{# pages/products/index.twig #}

<div class="menu-page">
  {# Sticky Category Navigation #}
  {% include 'components.restaurant.menu-nav' with {
    categories: categories
  } %}

  {# Products Grid by Category #}
  {% for category in categories %}
    <section id="category-{{ category.id }}" class="menu-category">
      <h2>{{ category.name }}</h2>

      <div class="products-grid">
        {% for product in category.products %}
          {% include 'components.restaurant.dish-card' with {
            product: product
          } %}
        {% endfor %}
      </div>
    </section>
  {% endfor %}
</div>
```

---

### Example 3: Cart Page with Delivery Zones

```twig
{# pages/cart.twig #}

<div class="cart-page">
  {# Cart Items #}
  <div class="cart-items">
    {# ... #}
  </div>

  {# Delivery Zone Selector #}
  <div class="delivery-section">
    {% include 'components.restaurant.delivery-zone-selector' %}
  </div>

  {# Order Summary #}
  <div class="order-summary">
    <div class="line-item">
      <span>{{ trans('common.subtotal') }}</span>
      <span>{{ cart.subtotal }}</span>
    </div>
    <div class="line-item" id="delivery-fee">
      <span>{{ trans('restaurant.delivery.delivery_fee') }}</span>
      <span id="delivery-fee-amount">-</span>
    </div>
  </div>
</div>
```

---

## 🎨 Customization

### Styling Components

All restaurant components use Tailwind CSS classes and can be customized:

**Method 1: Tailwind Config**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'restaurant-primary': '#FF6B35',
      }
    }
  }
}
```

**Method 2: SCSS Variables**
```scss
// src/assets/styles/restaurant/_variables.scss
$dish-card-radius: 12px;
$dish-card-shadow: 0 2px 8px rgba(0,0,0,0.1);
```

**Method 3: Component Override**
```scss
// src/assets/styles/restaurant/_menu-card.scss
.dish-card {
  &__title {
    font-size: 1.125rem;
    font-weight: 600;
  }

  &__price {
    color: var(--restaurant-primary);
  }
}
```

---

## ⚙️ Props & Options

### Modifiers Modal Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `product` | Object | Yes | - | Product object with modifiers |
| `auto_open` | Boolean | No | `false` | Auto-open modal on page load |
| `show_nutrition` | Boolean | No | `true` | Show nutritional info |

### Dish Card Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `product` | Object | Yes | - | Product object |
| `show_calories` | Boolean | No | `true` | Display calorie count |
| `show_prep_time` | Boolean | No | `true` | Display preparation time |
| `show_allergens` | Boolean | No | `true` | Show allergen badges |
| `card_style` | String | No | `default` | Options: `default`, `compact`, `wide` |

### Business Hours Widget Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `business_hours` | Object | Yes | - | Weekly schedule |
| `show_full_schedule` | Boolean | No | `false` | Show all days |
| `update_interval` | Number | No | `60000` | Update interval (ms) |

---

## 🔗 Related Documentation

- [API Integration Guide](./API-GUIDE.md)
- [Customization Guide](./CUSTOMIZATION.md)
- [Main README](../README.md)

---

**Last Updated:** March 2024
**Version:** 1.0.0

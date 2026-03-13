# 🎯 Sufrah Modifiers System - Quick Reference Guide

## Overview

The Modifiers System allows customers to customize restaurant products with:
- **Sizes** (Small, Medium, Large, etc.)
- **Extras** (Additional toppings, sides, drinks)
- **Modifications** (No onions, extra spicy, etc.)
- **Special Instructions** (Custom requests)

All with **real-time price calculation** and **smooth animations**.

---

## 🚀 Quick Start

### 1. Basic Implementation

```twig
{# In your product page #}
{% include 'components/restaurant/modifiers-modal.twig' with {
  product: product
} %}
```

### 2. Product Data Structure

Your product object needs these properties:

```javascript
{
  id: "12345",
  name: "Shawarma Plate",
  price: 45.00,
  description: "Delicious chicken shawarma",

  options: {
    size_required: true,  // Make size selection mandatory

    sizes: [
      {
        id: "small",
        name: "صغير",
        name_en: "Small",
        additional_price: 0,
        description: "Serves 1"
      },
      {
        id: "large",
        name: "كبير",
        name_en: "Large",
        additional_price: 15,
        description: "Serves 2"
      }
    ],

    extras: [
      {
        id: "cheese",
        name: "جبنة إضافية",
        name_en: "Extra Cheese",
        price: 5,
        description: "Melted cheese topping",
        calories: 120
      },
      {
        id: "drink",
        name: "مشروب",
        name_en: "Drink",
        price: 8,
        required: false
      }
    ],

    modifications: [
      {
        id: "no-onions",
        name: "بدون بصل",
        name_en: "No Onions",
        icon: "sicon-close-circle"
      },
      {
        id: "extra-spicy",
        name: "حار جداً",
        name_en: "Extra Spicy",
        icon: "sicon-hot"
      }
    ]
  },

  // Optional fields
  calories: 650,
  preparation_time: 15,
  spicy_level: 2,
  ingredients: "Chicken, bread, tahini, vegetables",
  allergens: "Contains gluten, sesame",
  delivery_time: "20-30 min"
}
```

---

## 💻 JavaScript API

### Initialization

```javascript
// Auto-initialization (default)
// Any element with [data-product-modifiers] will be automatically initialized

// Manual initialization
import ModifiersSystem from './restaurant/modifiers.js';

const productElement = document.querySelector('[data-product-modifiers]');
const modifiers = new ModifiersSystem(productElement);
```

### Instance Methods

```javascript
const modifiers = productElement.modifiersSystem;

// Get current selections
modifiers.modifiers.size          // Selected size object
modifiers.modifiers.extras        // Array of selected extras
modifiers.modifiers.modifications // Array of modifications
modifiers.modifiers.specialInstructions // Text

// Calculate total
const total = modifiers.calculateTotal(); // Returns number

// Validate selections
const result = modifiers.validate();
if (!result.valid) {
  console.error('Validation errors:', result.errors);
}

// Reset all selections
modifiers.reset();

// Destroy instance
modifiers.destroy();
```

### Events

```javascript
// Listen to events
document.addEventListener('modifiers:ready', (e) => {
  console.log('Modifiers system initialized');
});

document.addEventListener('modifiers:size-changed', (e) => {
  console.log('New size:', e.detail.size);
  console.log('New total:', e.detail.total);
});

document.addEventListener('modifiers:extra-changed', (e) => {
  console.log('Extra:', e.detail.extra);
  console.log('Added:', e.detail.added); // true/false
});

document.addEventListener('modifiers:modification-changed', (e) => {
  console.log('Modification:', e.detail.modification);
});

document.addEventListener('modifiers:instructions-changed', (e) => {
  console.log('Instructions:', e.detail.instructions);
});

document.addEventListener('modifiers:price-updated', (e) => {
  console.log('Total:', e.detail.total);
  console.log('Formatted:', e.detail.formatted); // "45.00 SAR"
});

document.addEventListener('modifiers:added-to-cart', (e) => {
  console.log('Cart data:', e.detail.cartData);
  console.log('API response:', e.detail.response);
});
```

---

## 🎨 Styling Customization

### CSS Variables (Override in your theme)

```scss
// In your custom.scss
.modifiers-container {
  --modifiers-primary: #your-brand-color;
  --modifiers-radius: 12px;
  --modifiers-spacing: 16px;
}
```

### Tailwind Classes

The component uses Tailwind utility classes. Customize by editing the Twig template:

```twig
{# Change primary color #}
<div class="peer-checked:border-blue-500 peer-checked:bg-blue-50">

{# Change spacing #}
<div class="mb-8 gap-4">

{# Change typography #}
<h3 class="text-3xl font-black">
```

---

## 🌍 Localization

### Required Translation Keys

Add these to your Salla translation files:

```json
{
  "restaurant": {
    "modifiers": {
      "size": "الحجم",
      "select_size": "اختر الحجم",
      "add_extras": "إضافات",
      "extras": "الإضافات",
      "modifications": "تعديلات",
      "free": "مجاناً",
      "special_requests": "طلبات خاصة",
      "standard": "قياسي",
      "extra_price": "+{price} ريال"
    },

    "nutrition": {
      "calories": "سعرات حرارية",
      "ingredients": "المكونات",
      "allergens": "مسببات الحساسية"
    },

    "errors": {
      "required_modifier": "يرجى اختيار {modifier}"
    },

    "add_instructions": "أضف تعليمات خاصة (اختياري)",
    "instructions_hint": "مثال: بدون خضار، طازج فقط، إلخ",
    "ready_in": "جاهز خلال",
    "spicy_level": "مستوى الحرارة"
  }
}
```

---

## 📱 Responsive Breakpoints

The system automatically adapts to screen sizes:

| Screen | Size Grid | Layout |
|--------|-----------|--------|
| Mobile | `<640px` | 1 column, stacked |
| Tablet | `640px - 1024px` | 2-3 columns |
| Desktop | `>1024px` | 3-4 columns |

---

## ⚙️ Configuration

Configure via the settings helper:

```javascript
// In your settings.js
sufrahSettings.set('modifiers.show_calories', true);
sufrahSettings.set('modifiers.show_ingredients', true);
sufrahSettings.set('modifiers.allow_special_instructions', true);
sufrahSettings.set('modifiers.max_instructions_length', 200);
```

---

## 🧪 Testing Scenarios

### Scenario 1: Basic Size Selection
1. Open product with sizes
2. Select "Large" size
3. Price should increase by size's `additional_price`
4. Visual feedback should appear (checkmark badge)

### Scenario 2: Multiple Extras
1. Select "Extra Cheese" (+5 SAR)
2. Select "Drink" (+8 SAR)
3. Total should be: base + size + 5 + 8
4. Uncheck "Extra Cheese"
5. Total should decrease by 5

### Scenario 3: Special Instructions
1. Type "No onions please"
2. Character counter should update
3. Type until near limit (180/200)
4. Counter should turn amber
5. Paste long text (>200 chars)
6. Should truncate at 200

### Scenario 4: Validation
1. Don't select required size
2. Click "Add to Cart"
3. Error message should appear
4. Page should scroll to size section

### Scenario 5: Add to Cart
1. Select size + extras
2. Add special instructions
3. Click "Add to Cart"
4. Loading state should appear
5. Success notification shows
6. Cart count increases
7. Modal closes (if applicable)

### Scenario 6: State Persistence
1. Select size + extras
2. Refresh page
3. Selections should be restored from sessionStorage
4. Add to cart successfully
5. Refresh page
6. Selections should be cleared

---

## 🐛 Troubleshooting

### Issue: Price not updating
**Solution:** Check that all modifiers have `data-price` attribute

```html
<input data-modifier-type="size" data-price="15">
```

### Issue: Validation not working
**Solution:** Ensure `data-size-required="true"` on container

```html
<div data-product-modifiers data-size-required="true">
```

### Issue: Salla API error
**Solution:** Check that Salla SDK is loaded before modifiers.js

```html
<script src="https://cdn.salla.sa/assets/js/sdk.js"></script>
<script type="module" src="/assets/js/app.js"></script>
```

### Issue: Animations not working
**Solution:** Import the SCSS file in your main stylesheet

```scss
@import 'restaurant/modifiers';
```

### Issue: RTL layout broken
**Solution:** Ensure `<html dir="rtl">` is set for Arabic

---

## 🔒 Security Considerations

- ✅ **XSS Protection:** Twig auto-escapes all output
- ✅ **Input Validation:** Max length enforced on textarea
- ✅ **API Safety:** Error handling on cart operations
- ✅ **No Injection:** No use of `eval()` or `innerHTML`

---

## 📊 Performance Tips

1. **Lazy Load:** Only initialize when product is visible
   ```javascript
   const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         new ModifiersSystem(entry.target);
         observer.unobserve(entry.target);
       }
     });
   });
   ```

2. **Debounce Input:** Already implemented for instructions field

3. **Minimize Reflows:** Animations use `transform` (GPU-accelerated)

---

## 📚 Related Documentation

- [Salla Cart API](https://docs.salla.dev/docs/api/cart)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

---

## 🎓 Advanced Usage

### Custom Validation Rules

```javascript
class CustomModifiersSystem extends ModifiersSystem {
  validate() {
    const errors = super.validate();

    // Custom rule: At least one extra required
    if (this.modifiers.extras.length === 0) {
      errors.errors.push({
        field: 'extra',
        type: 'custom',
        message: 'Please select at least one extra'
      });
      errors.valid = false;
    }

    return errors;
  }
}
```

### Custom Price Calculation

```javascript
calculateTotal() {
  let total = super.calculateTotal();

  // Apply discount if 3+ extras
  if (this.modifiers.extras.length >= 3) {
    total *= 0.9; // 10% discount
  }

  return total;
}
```

### Analytics Integration

```javascript
document.addEventListener('modifiers:added-to-cart', (e) => {
  // Google Analytics
  gtag('event', 'add_to_cart', {
    items: [{
      id: e.detail.cartData.id,
      name: product.name,
      price: e.detail.total,
      quantity: 1
    }]
  });

  // Facebook Pixel
  fbq('track', 'AddToCart', {
    value: e.detail.total,
    currency: 'SAR'
  });
});
```

---

**For more help, refer to:** [TASK-2.1-COMPLETION.md](../TASK-2.1-COMPLETION.md)

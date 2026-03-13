# 🏗️ Modifiers System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    MODIFIERS SYSTEM                         │
│                     (Task 2.1)                              │
└─────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
    ┌───────────┐   ┌───────────┐   ┌───────────┐
    │   View    │   │ Controller│   │   Model   │
    │  (Twig)   │   │    (JS)   │   │ (Storage) │
    └───────────┘   └───────────┘   └───────────┘
```

---

## Component Architecture

### 1. **View Layer** (Twig Template)

```
modifiers-modal.twig
│
├── Product Header
│   ├── Image
│   ├── Name & Description
│   └── Nutrition Info (calories, prep time, spicy level)
│
├── Product Details
│   ├── Ingredients (collapsible)
│   └── Allergens Warning
│
├── Modifiers Sections
│   ├── Size Selection (Radio Grid)
│   ├── Extras Selection (Checkbox List)
│   ├── Modifications (Pill Tags)
│   └── Special Instructions (Textarea)
│
└── Sticky Footer
    ├── Total Price Display
    └── Add to Cart Button
```

### 2. **Controller Layer** (JavaScript Class)

```
ModifiersSystem Class
│
├── Constructor
│   ├── Initialize state
│   ├── Load config
│   └── Cache DOM elements
│
├── Event Handlers
│   ├── handleSizeChange()
│   ├── handleExtraChange()
│   ├── handleModificationChange()
│   ├── handleInstructionsChange()
│   └── handleAddToCart()
│
├── Business Logic
│   ├── calculateTotal()
│   ├── validate()
│   ├── formatPrice()
│   └── getModifiersForCart()
│
├── State Management
│   ├── saveState()
│   ├── loadSavedState()
│   └── clearState()
│
├── UI Updates
│   ├── updatePrice()
│   ├── focusErrorField()
│   └── triggerEvent()
│
└── Lifecycle
    ├── init()
    ├── reset()
    └── destroy()
```

### 3. **Model Layer** (Data Storage)

```
┌─────────────────────────────────┐
│     sessionStorage              │
├─────────────────────────────────┤
│ modifiers_12345: {              │
│   size: { id, name, price },    │
│   extras: [ {...}, {...} ],     │
│   modifications: [ {...} ],     │
│   specialInstructions: "..."    │
│ }                                │
└─────────────────────────────────┘
```

---

## Data Flow Diagram

### Add to Cart Flow

```
┌──────────────┐
│ User Action  │
│ (Click Size) │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│ handleSizeChange()   │
│ - Parse data attrs   │
│ - Update state       │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ saveState()          │
│ - Serialize to JSON  │
│ - Store in session   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ updatePrice()        │
│ - Calculate total    │
│ - Format currency    │
│ - Animate display    │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ triggerEvent()       │
│ - Create CustomEvent │
│ - Dispatch to DOM    │
└──────────────────────┘
```

### Validation & Submission

```
┌─────────────────────┐
│ User Clicks         │
│ "Add to Cart"       │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ validate()          │
│ - Check required    │
│ - Check lengths     │
└─────────┬───────────┘
          │
     ┌────┴────┐
     │ Valid?  │
     └────┬────┘
          │
    ┌─────┴─────┐
    │           │
   Yes          No
    │           │
    │           ▼
    │    ┌──────────────┐
    │    │ Show Error   │
    │    │ Focus Field  │
    │    └──────────────┘
    │
    ▼
┌─────────────────────┐
│ handleAddToCart()   │
│ - Disable button    │
│ - Prepare data      │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ salla.cart.addItem()│
│ - API call          │
└─────────┬───────────┘
          │
     ┌────┴────┐
     │Success? │
     └────┬────┘
          │
    ┌─────┴─────┐
    │           │
   Yes          No
    │           │
    │           ▼
    │    ┌──────────────┐
    │    │ Show Error   │
    │    │ Re-enable    │
    │    └──────────────┘
    │
    ▼
┌─────────────────────┐
│ Success Actions     │
│ - Show notification │
│ - Clear state       │
│ - Close modal       │
│ - Update cart count │
└─────────────────────┘
```

---

## State Management

### State Object Structure

```javascript
{
  size: {
    id: "large",
    name: "كبير",
    nameEn: "Large",
    price: 15
  },

  extras: [
    {
      id: "cheese",
      name: "جبنة",
      nameEn: "Cheese",
      price: 5
    },
    {
      id: "drink",
      name: "مشروب",
      nameEn: "Drink",
      price: 8
    }
  ],

  modifications: [
    {
      id: "no-onions",
      name: "بدون بصل",
      nameEn: "No Onions",
      price: 0
    }
  ],

  specialInstructions: "Extra spicy please"
}
```

### State Lifecycle

```
┌─────────────────┐
│  Page Load      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ init()          │
│ - Check storage │
└────────┬────────┘
         │
    ┌────┴────┐
    │ Exists? │
    └────┬────┘
         │
    ┌────┴────┐
    │         │
   Yes        No
    │         │
    │         ▼
    │    ┌────────────┐
    │    │ New State  │
    │    └────────────┘
    │
    ▼
┌────────────────┐
│ loadSavedState()│
│ - Restore UI    │
└────────┬────────┘
         │
         ▼
┌────────────────┐
│ User Interacts │
└────────┬────────┘
         │
         ▼
┌────────────────┐
│ saveState()    │
│ (on every      │
│  change)       │
└────────┬────────┘
         │
         ▼
┌────────────────┐
│ Add to Cart    │
│ Success        │
└────────┬────────┘
         │
         ▼
┌────────────────┐
│ clearState()   │
│ - Remove from  │
│   storage      │
└────────────────┘
```

---

## Event System

### Event Flow

```
┌──────────────────────────────────────────────────────┐
│            Custom Events (Bubbling)                  │
└──────────────────────────────────────────────────────┘

User Action
    │
    ▼
Handler Function
    │
    ▼
Update State
    │
    ▼
triggerEvent('modifiers:xxx', { detail })
    │
    ▼
document.dispatchEvent(CustomEvent)
    │
    ▼
External Listeners (Analytics, UI updates, etc.)
```

### Event Catalog

| Event Name | Trigger | Detail |
|------------|---------|--------|
| `modifiers:ready` | System initialized | `{ modifiers, total }` |
| `modifiers:size-changed` | Size selected | `{ size, modifiers, total }` |
| `modifiers:extra-changed` | Extra toggled | `{ extra, added, modifiers, total }` |
| `modifiers:modification-changed` | Mod toggled | `{ modification, added, modifiers, total }` |
| `modifiers:instructions-changed` | Text input | `{ instructions, modifiers, total }` |
| `modifiers:price-updated` | Price recalc | `{ total, formatted, modifiers }` |
| `modifiers:added-to-cart` | Cart success | `{ cartData, response, modifiers }` |
| `modifiers:reset` | Reset called | `{ modifiers, total }` |
| `modifiers:destroyed` | Cleanup | `{}` |

---

## Integration Points

### 1. Salla Platform Integration

```
┌─────────────────┐
│ ModifiersSystem │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Salla SDK      │
├─────────────────┤
│ ✓ salla.cart.   │
│   addItem()     │
│                 │
│ ✓ salla.lang.   │
│   get()         │
│                 │
│ ✓ salla.notify. │
│   success()     │
│   error()       │
│                 │
│ ✓ salla.url.    │
│   get()         │
└─────────────────┘
```

### 2. Settings Module Integration

```
┌─────────────────┐
│ ModifiersSystem │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ sufrahSettings          │
├─────────────────────────┤
│ ✓ show_calories         │
│ ✓ show_ingredients      │
│ ✓ allow_special_        │
│   instructions          │
│ ✓ max_instructions_     │
│   length                │
└─────────────────────────┘
```

---

## Performance Optimizations

### 1. DOM Caching

```javascript
// ✅ Good: Cache once in cacheElements()
this.elements = {
  sizeRadios: this.product.querySelectorAll('[data-modifier-type="size"]'),
  totalPriceDisplay: this.product.querySelector('[data-total-price]')
};

// ❌ Bad: Query every time
updatePrice() {
  const priceDisplay = document.querySelector('[data-total-price]');
  priceDisplay.textContent = this.calculateTotal();
}
```

### 2. Event Delegation (Future)

```javascript
// Current: Individual listeners
this.elements.sizeRadios.forEach(radio => {
  radio.addEventListener('change', handler);
});

// Future optimization: Single delegated listener
this.product.addEventListener('change', (e) => {
  if (e.target.matches('[data-modifier-type="size"]')) {
    this.handleSizeChange(e);
  }
});
```

### 3. Debouncing

```javascript
// Already implemented for paste events
this.elements.instructionsField.addEventListener('paste', (e) => {
  setTimeout(() => this.handleInstructionsChange(e), 0);
});
```

---

## Security Model

### Input Validation Layers

```
User Input
    │
    ▼
┌────────────────────┐
│ HTML5 Validation   │
│ - maxlength        │
│ - required         │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ JS Validation      │
│ - validate()       │
│ - Length checks    │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Twig Escaping      │
│ - Auto-escape      │
│ - XSS prevention   │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ API Validation     │
│ - Salla backend    │
└────────────────────┘
```

---

## Mobile-First Responsive Strategy

```
Mobile (< 640px)
├── Single column layout
├── Stacked sections
├── Full-width buttons
└── Sticky footer

    │
    ▼

Tablet (640px - 1024px)
├── 2-3 column grid
├── Side-by-side extras
└── Optimized spacing

    │
    ▼

Desktop (> 1024px)
├── 3-4 column grid
├── Compact layout
├── Hover effects
└── Maximum density
```

---

## Accessibility Tree

```
<div role="region" aria-label="Product Customization">
  │
  ├── <h3> Product Name
  │
  ├── <fieldset aria-label="Size Selection">
  │   └── <input type="radio" aria-required="true">
  │
  ├── <fieldset aria-label="Extras">
  │   └── <input type="checkbox">
  │
  ├── <fieldset aria-label="Modifications">
  │   └── <input type="checkbox">
  │
  ├── <label for="instructions">Special Instructions</label>
  │   └── <textarea aria-describedby="char-counter">
  │
  └── <button aria-label="Add to Cart">
      └── <span aria-live="polite">Total: 50 SAR</span>
```

---

## File Structure

```
src/
│
├── assets/
│   ├── js/
│   │   └── restaurant/
│   │       └── modifiers.js          ← Controller
│   │
│   └── styles/
│       └── restaurant/
│           └── _modifiers.scss       ← Styling
│
├── views/
│   └── components/
│       └── restaurant/
│           └── modifiers-modal.twig  ← View
│
└── docs/
    ├── MODIFIERS-SYSTEM-GUIDE.md     ← User Guide
    └── MODIFIERS-ARCHITECTURE.md     ← This file
```

---

## Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **View** | Twig | 3.x |
| **Styling** | Tailwind CSS | 3.x |
| **Styling** | SCSS | 1.x |
| **Logic** | ES6 Modules | Native |
| **Storage** | sessionStorage | Native |
| **API** | Salla SDK | Latest |
| **Icons** | Salla Icons | Latest |

---

## Browser Support Matrix

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| IE 11 | - | ❌ Not supported |
| Mobile Safari | iOS 14+ | ✅ Full |
| Mobile Chrome | Android 10+ | ✅ Full |

**Polyfills required for:**
- `CustomEvent` (IE11 only, if needed)
- `Promise` (IE11 only, if needed)
- `Intl.NumberFormat` (Already native in target browsers)

---

## Extension Points

### Custom Modifier Types

```javascript
class ExtendedModifiersSystem extends ModifiersSystem {
  bindEvents() {
    super.bindEvents();

    // Add custom modifier type
    this.elements.customCheckboxes = this.product
      .querySelectorAll('[data-modifier-type="custom"]');

    this.elements.customCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        this.handleCustomChange(e);
      });
    });
  }

  handleCustomChange(event) {
    // Custom logic here
    this.triggerEvent('modifiers:custom-changed', {
      custom: event.target.value
    });
  }
}
```

### Price Calculation Hooks

```javascript
calculateTotal() {
  let total = super.calculateTotal();

  // Apply custom pricing logic
  total = this.applyDynamicPricing(total);
  total = this.applyLoyaltyDiscount(total);

  return total;
}

applyDynamicPricing(total) {
  const hour = new Date().getHours();
  if (hour >= 14 && hour <= 16) {
    // Happy hour: 20% off
    return total * 0.8;
  }
  return total;
}
```

---

## Future Enhancements Roadmap

### Phase 2 (Q2 2026)
- [ ] Multi-step wizard UI
- [ ] Combo meal builder
- [ ] Saved favorite combinations
- [ ] Nutritional calculator (live)

### Phase 3 (Q3 2026)
- [ ] Voice input for instructions
- [ ] AI-powered recommendations
- [ ] Inventory integration (out-of-stock)
- [ ] A/B testing framework

### Phase 4 (Q4 2026)
- [ ] AR preview (visual modifiers)
- [ ] Social sharing of combinations
- [ ] Gamification (achievement badges)
- [ ] Advanced analytics dashboard

---

**Documentation Version:** 1.0.0
**Last Updated:** 2026-03-12
**Maintained By:** Agent 04 - Features Engineer

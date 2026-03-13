# 🎨 Sufrah Customization Guide

> دليل تخصيص قالب Sufrah

---

## 📋 Table of Contents

1. [Colors & Branding](#colors--branding)
2. [Typography](#typography)
3. [Layout & Spacing](#layout--spacing)
4. [Component Customization](#component-customization)
5. [Advanced Customization](#advanced-customization)

---

## 🎨 Colors & Branding

### Primary Colors

Edit `tailwind.config.js` to customize your restaurant's brand colors:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary brand color (buttons, links, highlights)
        'restaurant': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',  // Main brand color
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },

        // Secondary accent color
        'accent': {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706',
        },

        // Status colors
        'status': {
          open: '#10b981',
          closed: '#ef4444',
          busy: '#f59e0b',
        }
      }
    }
  }
}
```

### Quick Color Change

For a quick brand color change, update only the main variables:

```scss
// src/assets/styles/restaurant/_variables.scss

// Brand Colors
$restaurant-primary: #FF6B35;      // Main brand color
$restaurant-secondary: #F7931E;    // Accent color
$restaurant-dark: #2D3748;         // Dark text
$restaurant-light: #F7FAFC;        // Light backgrounds

// Status Colors
$color-open: #10B981;              // Open status
$color-closed: #EF4444;            // Closed status
$color-busy: #F59E0B;              // Busy status
```

---

## ✏️ Typography

### Font Families

**Option 1: Using Google Fonts** (Recommended)

1. Add font to `src/views/layouts/master.twig`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
```

2. Update Tailwind config:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Cairo', 'sans-serif'],
        'en': ['Poppins', 'sans-serif'],
      }
    }
  }
}
```

**Option 2: Custom Fonts**

```scss
// src/assets/styles/restaurant/_typography.scss

@font-face {
  font-family: 'CustomFont';
  src: url('../fonts/CustomFont.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

body {
  font-family: 'CustomFont', sans-serif;
}
```

### Font Sizes

```scss
// src/assets/styles/restaurant/_variables.scss

// Font Sizes
$font-size-xs: 0.75rem;      // 12px
$font-size-sm: 0.875rem;     // 14px
$font-size-base: 1rem;       // 16px
$font-size-lg: 1.125rem;     // 18px
$font-size-xl: 1.25rem;      // 20px
$font-size-2xl: 1.5rem;      // 24px
$font-size-3xl: 1.875rem;    // 30px
$font-size-4xl: 2.25rem;     // 36px

// Product Card Typography
$dish-card-title-size: $font-size-lg;
$dish-card-price-size: $font-size-xl;
$dish-card-description-size: $font-size-sm;
```

---

## 📐 Layout & Spacing

### Container Widths

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    }
  }
}
```

### Grid & Spacing

```scss
// src/assets/styles/restaurant/_variables.scss

// Spacing Scale
$spacing-xs: 0.5rem;   // 8px
$spacing-sm: 1rem;     // 16px
$spacing-md: 1.5rem;   // 24px
$spacing-lg: 2rem;     // 32px
$spacing-xl: 3rem;     // 48px

// Product Grid
$product-grid-gap: $spacing-md;
$product-grid-columns-mobile: 1;
$product-grid-columns-tablet: 2;
$product-grid-columns-desktop: 3;
$product-grid-columns-wide: 4;
```

### Border Radius

```scss
// src/assets/styles/restaurant/_variables.scss

$radius-sm: 0.375rem;   // 6px
$radius-md: 0.5rem;     // 8px
$radius-lg: 0.75rem;    // 12px
$radius-xl: 1rem;       // 16px
$radius-full: 9999px;   // Fully rounded

// Component-specific
$dish-card-radius: $radius-lg;
$button-radius: $radius-md;
$modal-radius: $radius-xl;
```

---

## 🧩 Component Customization

### Dish Card Styling

```scss
// src/assets/styles/restaurant/_menu-card.scss

.dish-card {
  // Card container
  border-radius: $dish-card-radius;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  // Image container
  &__image {
    aspect-ratio: 4/3;
    border-radius: $dish-card-radius $dish-card-radius 0 0;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: scale 0.3s;
    }

    &:hover img {
      scale: 1.05;
    }
  }

  // Title
  &__title {
    font-size: $dish-card-title-size;
    font-weight: 600;
    color: $restaurant-dark;
    margin-bottom: 0.5rem;

    // Truncate long titles
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  // Price
  &__price {
    font-size: $dish-card-price-size;
    font-weight: 700;
    color: $restaurant-primary;
  }

  // Badges (new, popular, etc.)
  &__badge {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    background: $restaurant-primary;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: $radius-full;
    font-size: $font-size-xs;
    font-weight: 600;
  }
}
```

### Modifiers Modal Styling

```scss
// src/assets/styles/restaurant/_modifiers-ui.scss

.modifiers-modal {
  // Modal overlay
  &__overlay {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
  }

  // Modal content
  &__content {
    background: white;
    border-radius: $modal-radius;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  }

  // Modifier group
  &__group {
    margin-bottom: $spacing-lg;
    padding-bottom: $spacing-lg;
    border-bottom: 1px solid #e5e7eb;

    &:last-child {
      border-bottom: none;
    }
  }

  // Modifier option
  &__option {
    display: flex;
    align-items: center;
    padding: $spacing-sm;
    border: 2px solid #e5e7eb;
    border-radius: $radius-md;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: $restaurant-primary;
      background: rgba($restaurant-primary, 0.05);
    }

    &--selected {
      border-color: $restaurant-primary;
      background: rgba($restaurant-primary, 0.1);
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  // Price badge
  &__price {
    margin-left: auto;
    font-weight: 600;
    color: $restaurant-primary;
  }
}
```

### Business Hours Widget

```scss
// src/assets/styles/restaurant/_business-hours.scss

.business-hours-widget {
  // Container
  background: white;
  border-radius: $radius-lg;
  padding: $spacing-md;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  // Status indicator
  &__status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;

    &--open {
      color: $color-open;

      &::before {
        content: '';
        width: 8px;
        height: 8px;
        background: $color-open;
        border-radius: 50%;
        display: inline-block;
      }
    }

    &--closed {
      color: $color-closed;

      &::before {
        content: '';
        width: 8px;
        height: 8px;
        background: $color-closed;
        border-radius: 50%;
        display: inline-block;
      }
    }
  }

  // Schedule table
  &__schedule {
    margin-top: $spacing-md;

    table {
      width: 100%;
      font-size: $font-size-sm;

      td {
        padding: 0.5rem 0;
        border-bottom: 1px solid #f3f4f6;

        &:last-child {
          text-align: right;
          color: #6b7280;
        }
      }
    }
  }
}
```

---

## 🔧 Advanced Customization

### Custom Component Variants

Create your own dish card variants:

```twig
{# src/views/components/restaurant/dish-card-compact.twig #}

<div class="dish-card dish-card--compact">
  <div class="dish-card__content">
    <img src="{{ product.image }}" alt="{{ product.name }}" class="dish-card__thumbnail">

    <div class="dish-card__info">
      <h3 class="dish-card__title">{{ product.name }}</h3>
      <p class="dish-card__price">{{ product.price }}</p>
    </div>

    <button class="dish-card__add-btn">+</button>
  </div>
</div>
```

### Theme Switching (Light/Dark Mode)

```javascript
// src/assets/js/restaurant/theme-switcher.js

class ThemeSwitcher {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.apply();
  }

  apply() {
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.apply();
  }
}
```

```scss
// src/assets/styles/restaurant/_theme-dark.scss

[data-theme="dark"] {
  --bg-primary: #1a202c;
  --bg-secondary: #2d3748;
  --text-primary: #f7fafc;
  --text-secondary: #e2e8f0;

  .dish-card {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }
}
```

### RTL Support Enhancement

```scss
// src/assets/styles/restaurant/_rtl.scss

[dir="rtl"] {
  .dish-card {
    &__badge {
      left: auto;
      right: 0.75rem;
    }

    &__price {
      text-align: left;
    }
  }

  .modifiers-modal {
    &__price {
      margin-left: 0;
      margin-right: auto;
    }
  }
}
```

---

## 📱 Responsive Customization

### Mobile-First Breakpoints

```scss
// src/assets/styles/restaurant/_responsive.scss

// Mobile (default)
.dish-card {
  &__title {
    font-size: 1rem;
  }
}

// Tablet (768px+)
@media (min-width: 768px) {
  .dish-card {
    &__title {
      font-size: 1.125rem;
    }
  }
}

// Desktop (1024px+)
@media (min-width: 1024px) {
  .dish-card {
    &__title {
      font-size: 1.25rem;
    }
  }
}

// Wide screens (1280px+)
@media (min-width: 1280px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## 🎯 Quick Customization Checklist

- [ ] Update brand colors in `tailwind.config.js`
- [ ] Set restaurant logo in theme settings
- [ ] Choose and apply fonts
- [ ] Adjust spacing and border radius
- [ ] Customize dish card appearance
- [ ] Style modifiers modal to match brand
- [ ] Test on mobile, tablet, and desktop
- [ ] Verify RTL (Arabic) layout
- [ ] Test dark mode (if implemented)

---

## 🔗 Related Documentation

- [API Integration Guide](./API-GUIDE.md)
- [Components Guide](./COMPONENTS.md)
- [Main README](../README.md)

---

**Last Updated:** March 2024
**Version:** 1.0.0

# 🎨 Sufrah Restaurant Design System

Complete design system for Sufrah restaurant components and themes.

---

## 🎯 Design Principles

### 1. **Clarity First**
Clear information hierarchy, easy-to-understand interfaces, no cognitive overload.

### 2. **Culturally Aware**
RTL-first design, Arabic typography excellence, cultural color preferences.

### 3. **Speed & Efficiency**
Fast interactions, minimal clicks, predictable behavior.

### 4. **Accessibility Always**
WCAG AA compliance, keyboard navigation, screen reader support.

### 5. **Mobile-First**
Touch-friendly, responsive, progressive enhancement.

---

## 🎨 Color System

### Primary Colors

```scss
// Warm Amber (Primary)
$primary-50:  #FFF7ED;
$primary-100: #FFEDD5;
$primary-200: #FED7AA;
$primary-300: #FDBA74;
$primary-400: #FB923C;
$primary-500: #F97316;
$primary-600: #EA580C;  // Brand primary
$primary-700: #C2410C;
$primary-800: #9A3412;
$primary-900: #7C2D12;
```

### Secondary Colors

```scss
// Fresh Green (Secondary)
$secondary-50:  #ECFDF5;
$secondary-100: #D1FAE5;
$secondary-200: #A7F3D0;
$secondary-300: #6EE7B7;
$secondary-400: #34D399;
$secondary-500: #10B981;
$secondary-600: #059669;  // Brand secondary
$secondary-700: #047857;
$secondary-800: #065F46;
$secondary-900: #064E3B;
```

### Accent Colors

```scss
// Alert Red (Accent/Error)
$accent-50:  #FEF2F2;
$accent-100: #FEE2E2;
$accent-200: #FECACA;
$accent-300: #FCA5A5;
$accent-400: #F87171;
$accent-500: #EF4444;  // Brand accent
$accent-600: #DC2626;
$accent-700: #B91C1C;
$accent-800: #991B1B;
$accent-900: #7F1D1D;
```

### Neutral Colors

```scss
// Grays
$gray-50:  #F9FAFB;
$gray-100: #F3F4F6;
$gray-200: #E5E7EB;
$gray-300: #D1D5DB;
$gray-400: #9CA3AF;
$gray-500: #6B7280;
$gray-600: #4B5563;
$gray-700: #374151;
$gray-800: #1F2937;
$gray-900: #111827;
```

### Semantic Colors

```scss
// Success
$success: #10B981;
$success-bg: #D1FAE5;
$success-text: #065F46;

// Warning
$warning: #F59E0B;
$warning-bg: #FEF3C7;
$warning-text: #92400E;

// Error
$error: #EF4444;
$error-bg: #FEE2E2;
$error-text: #991B1B;

// Info
$info: #3B82F6;
$info-bg: #DBEAFE;
$info-text: #1E40AF;
```

---

## ✍️ Typography

### Font Families

```scss
// Arabic
$font-arabic-primary: 'Cairo', 'Tajawal', sans-serif;
$font-arabic-display: 'Cairo', 'Amiri', serif;

// English
$font-english-primary: 'Inter', 'SF Pro Display', system-ui, sans-serif;
$font-english-display: 'Playfair Display', 'Georgia', serif;

// Monospace
$font-mono: 'Fira Code', 'Monaco', monospace;
```

### Font Sizes

```scss
// Scale (1.25 ratio)
$text-xs:   0.75rem;    // 12px
$text-sm:   0.875rem;   // 14px
$text-base: 1rem;       // 16px
$text-lg:   1.125rem;   // 18px
$text-xl:   1.25rem;    // 20px
$text-2xl:  1.5rem;     // 24px
$text-3xl:  1.875rem;   // 30px
$text-4xl:  2.25rem;    // 36px
$text-5xl:  3rem;       // 48px
```

### Font Weights

```scss
$font-light:     300;
$font-normal:    400;
$font-medium:    500;
$font-semibold:  600;
$font-bold:      700;
$font-extrabold: 800;
$font-black:     900;
```

### Line Heights

```scss
$leading-none:    1;
$leading-tight:   1.25;
$leading-snug:    1.375;
$leading-normal:  1.5;
$leading-relaxed: 1.625;
$leading-loose:   2;
```

### Usage Examples

```scss
// Heading 1
h1, .h1 {
  font-size: $text-4xl;
  font-weight: $font-bold;
  line-height: $leading-tight;
  color: $gray-900;
}

// Heading 2
h2, .h2 {
  font-size: $text-3xl;
  font-weight: $font-bold;
  line-height: $leading-tight;
}

// Body text
p, .body {
  font-size: $text-base;
  font-weight: $font-normal;
  line-height: $leading-relaxed;
  color: $gray-700;
}

// Small text
small, .small {
  font-size: $text-sm;
  color: $gray-600;
}
```

---

## 📐 Spacing System

### Spacing Scale

```scss
$spacing-0:   0;
$spacing-px:  1px;
$spacing-0-5: 0.125rem;  // 2px
$spacing-1:   0.25rem;   // 4px
$spacing-1-5: 0.375rem;  // 6px
$spacing-2:   0.5rem;    // 8px
$spacing-2-5: 0.625rem;  // 10px
$spacing-3:   0.75rem;   // 12px
$spacing-3-5: 0.875rem;  // 14px
$spacing-4:   1rem;      // 16px
$spacing-5:   1.25rem;   // 20px
$spacing-6:   1.5rem;    // 24px
$spacing-7:   1.75rem;   // 28px
$spacing-8:   2rem;      // 32px
$spacing-10:  2.5rem;    // 40px
$spacing-12:  3rem;      // 48px
$spacing-16:  4rem;      // 64px
$spacing-20:  5rem;      // 80px
$spacing-24:  6rem;      // 96px
```

### Layout Spacing

```scss
// Component padding
$component-padding-sm:  $spacing-3;   // 12px
$component-padding-md:  $spacing-4;   // 16px
$component-padding-lg:  $spacing-6;   // 24px

// Section gaps
$section-gap-sm:  $spacing-4;   // 16px
$section-gap-md:  $spacing-6;   // 24px
$section-gap-lg:  $spacing-8;   // 32px
$section-gap-xl:  $spacing-12;  // 48px

// Container padding
$container-padding-mobile:  $spacing-4;   // 16px
$container-padding-tablet:  $spacing-6;   // 24px
$container-padding-desktop: $spacing-8;   // 32px
```

---

## 🔲 Border & Radius

### Border Widths

```scss
$border-0: 0;
$border-1: 1px;
$border-2: 2px;
$border-4: 4px;
$border-8: 8px;
```

### Border Radius

```scss
$radius-none: 0;
$radius-sm:   0.25rem;   // 4px
$radius-md:   0.5rem;    // 8px
$radius-lg:   0.75rem;   // 12px
$radius-xl:   1rem;      // 16px
$radius-2xl:  1.5rem;    // 24px
$radius-3xl:  2rem;      // 32px
$radius-full: 9999px;
```

### Usage

```scss
// Cards
.card {
  border-radius: $radius-xl;
  border: $border-2 solid $gray-200;
}

// Buttons
.button {
  border-radius: $radius-lg;
}

// Badges
.badge {
  border-radius: $radius-full;
}
```

---

## 🌗 Shadows & Elevation

### Shadow Scale

```scss
$shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
            0 1px 2px -1px rgba(0, 0, 0, 0.1);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -2px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -4px rgba(0, 0, 0, 0.1);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 8px 10px -6px rgba(0, 0, 0, 0.1);
$shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Elevation Levels

```scss
// Level 0: Flat
.elevation-0 {
  box-shadow: none;
}

// Level 1: Raised
.elevation-1 {
  box-shadow: $shadow-sm;
}

// Level 2: Floating
.elevation-2 {
  box-shadow: $shadow-md;
}

// Level 3: Modal
.elevation-3 {
  box-shadow: $shadow-lg;
}

// Level 4: Popup
.elevation-4 {
  box-shadow: $shadow-xl;
}
```

---

## 🎬 Animation & Transitions

### Durations

```scss
$duration-fast:    150ms;
$duration-normal:  200ms;
$duration-slow:    300ms;
$duration-slower:  500ms;
```

### Easing Functions

```scss
$ease-linear:     linear;
$ease-in:         cubic-bezier(0.4, 0, 1, 1);
$ease-out:        cubic-bezier(0, 0, 0.2, 1);
$ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);
$ease-bounce:     cubic-bezier(0.34, 1.56, 0.64, 1);
$ease-elastic:    cubic-bezier(0.68, -0.55, 0.27, 1.55);
```

### Common Transitions

```scss
// Color
.transition-colors {
  transition: color $duration-normal $ease-in-out,
              background-color $duration-normal $ease-in-out,
              border-color $duration-normal $ease-in-out;
}

// Transform
.transition-transform {
  transition: transform $duration-normal $ease-out;
}

// All
.transition-all {
  transition: all $duration-normal $ease-in-out;
}
```

### Keyframe Animations

```scss
// Fade in
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

// Slide down
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Pulse
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

// Shimmer
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

---

## 📱 Responsive Breakpoints

### Breakpoints

```scss
$breakpoint-sm:  640px;   // Mobile landscape / Small tablet
$breakpoint-md:  768px;   // Tablet
$breakpoint-lg:  1024px;  // Desktop
$breakpoint-xl:  1280px;  // Large desktop
$breakpoint-2xl: 1536px;  // Extra large desktop
```

### Media Queries

```scss
// Mobile first approach
@mixin sm {
  @media (min-width: $breakpoint-sm) { @content; }
}

@mixin md {
  @media (min-width: $breakpoint-md) { @content; }
}

@mixin lg {
  @media (min-width: $breakpoint-lg) { @content; }
}

@mixin xl {
  @media (min-width: $breakpoint-xl) { @content; }
}

// Usage
.container {
  padding: $spacing-4;

  @include md {
    padding: $spacing-6;
  }

  @include lg {
    padding: $spacing-8;
  }
}
```

---

## 🧩 Component Patterns

### Card

```scss
.restaurant-card {
  background: white;
  border-radius: $radius-xl;
  border: $border-2 solid $gray-200;
  padding: $spacing-6;
  box-shadow: $shadow-sm;
  transition: all $duration-normal $ease-out;

  &:hover {
    box-shadow: $shadow-lg;
    transform: translateY(-2px);
  }
}
```

### Button

```scss
.restaurant-button {
  padding: $spacing-3 $spacing-6;
  border-radius: $radius-lg;
  font-weight: $font-bold;
  font-size: $text-base;
  transition: all $duration-normal $ease-out;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba($primary-600, 0.3);
  }

  &.btn-primary {
    background: $primary-600;
    color: white;

    &:hover {
      background: $primary-700;
    }

    &:active {
      background: $primary-800;
    }
  }
}
```

### Badge

```scss
.restaurant-badge {
  display: inline-flex;
  align-items: center;
  gap: $spacing-2;
  padding: $spacing-1 $spacing-3;
  border-radius: $radius-full;
  font-size: $text-sm;
  font-weight: $font-semibold;

  &.badge-primary {
    background: $primary-100;
    color: $primary-800;
  }
}
```

---

## ♿ Accessibility Guidelines

### Color Contrast

All text must meet WCAG AA standards:
- Normal text: 4.5:1 ratio
- Large text (18px+): 3:1 ratio
- Interactive elements: 3:1 ratio

### Focus States

```scss
// Visible focus ring
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba($primary-600, 0.3);
}

// Focus within
.form-group:focus-within {
  border-color: $primary-500;
}
```

### Screen Reader Only

```scss
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## 🌍 Internationalization

### RTL Support

```scss
[dir="rtl"] {
  // Flip horizontal spacing
  .ml-4 { margin-right: 1rem; margin-left: 0; }
  .mr-4 { margin-left: 1rem; margin-right: 0; }

  // Flip transforms
  .transform-flip {
    transform: scaleX(-1);
  }

  // Text alignment
  text-align: right;
}
```

### Multi-language Typography

```scss
html[lang="ar"] {
  font-family: $font-arabic-primary;
  letter-spacing: 0;
}

html[lang="en"] {
  font-family: $font-english-primary;
  letter-spacing: -0.02em;
}
```

---

## 📏 Grid System

### Container

```scss
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: $spacing-4;
  padding-right: $spacing-4;

  @include sm {
    max-width: 640px;
  }

  @include md {
    max-width: 768px;
    padding-left: $spacing-6;
    padding-right: $spacing-6;
  }

  @include lg {
    max-width: 1024px;
  }

  @include xl {
    max-width: 1280px;
  }
}
```

### Grid

```scss
.grid {
  display: grid;
  gap: $spacing-4;

  &.grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  &.grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  &.grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  // Responsive
  @include sm {
    &.sm\\:grid-cols-2 {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
```

---

## 🎯 Usage Examples

### Complete Component

```scss
.modifiers-modal {
  // Layout
  max-width: 48rem;
  margin: 0 auto;
  padding: $spacing-6;

  // Appearance
  background: white;
  border-radius: $radius-2xl;
  box-shadow: $shadow-2xl;

  // Typography
  font-family: $font-arabic-primary;
  color: $gray-900;

  // Transitions
  transition: all $duration-normal $ease-out;

  // Header
  .modal-header {
    padding-bottom: $spacing-4;
    border-bottom: $border-2 solid $gray-200;

    h2 {
      font-size: $text-3xl;
      font-weight: $font-bold;
      color: $gray-900;
    }
  }

  // Body
  .modal-body {
    padding: $spacing-6 0;

    .section + .section {
      margin-top: $spacing-6;
    }
  }

  // Footer
  .modal-footer {
    padding-top: $spacing-4;
    border-top: $border-2 solid $gray-200;

    button {
      width: 100%;
      padding: $spacing-4 $spacing-6;
      background: $primary-600;
      color: white;
      border-radius: $radius-xl;
      font-weight: $font-bold;
      font-size: $text-lg;

      &:hover {
        background: $primary-700;
      }
    }
  }
}
```

---

**Version:** 1.0.0
**Last Updated:** 2026-03-12
**Maintained By:** Agent 03 - UI/UX Designer

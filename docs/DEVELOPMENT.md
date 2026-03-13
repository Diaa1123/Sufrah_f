# 🛠️ Sufrah Development Guide | دليل التطوير

**Complete development workflow guide for the Sufrah restaurant theme**

---

## 📋 Table of Contents | جدول المحتويات

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Development Workflow](#development-workflow)
4. [Build System](#build-system)
5. [Code Quality](#code-quality)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

---

## ✅ Prerequisites | المتطلبات الأساسية

Before starting development, ensure you have the following installed:

### Required Software

- **Node.js**: Version 18.x or higher
- **pnpm**: Version 8.x or higher (preferred package manager)
- **Git**: Version 2.x or higher
- **VSCode**: Latest version (recommended)

### Installation

```bash
# Install Node.js (via nvm - recommended)
nvm install 18
nvm use 18

# Install pnpm globally
npm install -g pnpm

# Verify installations
node --version
pnpm --version
git --version
```

### VSCode Extensions

Install recommended extensions when prompted, or manually install:

- Prettier - Code formatter
- ESLint - JavaScript linting
- Stylelint - CSS/SCSS linting
- Twig Language 2 - Twig syntax support
- Tailwind CSS IntelliSense - TailwindCSS autocomplete

---

## 🚀 Environment Setup | إعداد البيئة

### 1. Clone the Repository

```bash
git clone [repository-url]
cd Sufrah#0001
```

### 2. Install Dependencies

```bash
# Install all dependencies
pnpm install

# This will install:
# - Build tools (webpack, babel, postcss)
# - Salla Twilight framework
# - TailwindCSS and plugins
# - Linting and formatting tools
# - All required dependencies
```

### 3. Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` and configure your settings:

```env
# Essential settings
SALLA_STORE_URL=your-store.salla.sa
NODE_ENV=development
DEBUG_MODE=true

# Restaurant settings
RESTAURANT_TIMEZONE=Asia/Riyadh
ENABLE_MODIFIERS=true
ENABLE_DELIVERY_ZONES=true
```

### 4. VSCode Workspace

The workspace is pre-configured with:
- Auto-formatting on save
- ESLint and Stylelint integration
- Tailwind CSS IntelliSense
- Path aliases for easier imports
- Arabic/RTL support

---

## 💻 Development Workflow | سير العمل التطويري

### Development Commands

```bash
# Start development mode with watch
pnpm run dev

# Alternative watch command
pnpm run watch

# Build for production
pnpm run build

# Clean build artifacts
pnpm run clean

# Clean and rebuild
pnpm run rebuild
```

### Development Server

```bash
# Start webpack in watch mode
pnpm run dev

# Output will be in /public directory
# Files will auto-rebuild on changes
```

### File Structure

```
Sufrah#0001/
├── src/
│   ├── assets/
│   │   ├── js/
│   │   │   ├── restaurant/      # Restaurant-specific JS
│   │   │   ├── helpers/         # Utility functions
│   │   │   ├── partials/        # Component scripts
│   │   │   └── app.js           # Main entry
│   │   ├── styles/
│   │   │   ├── restaurant/      # Restaurant styles
│   │   │   └── app.scss         # Main stylesheet
│   │   └── images/              # Theme images
│   ├── views/
│   │   ├── components/          # Twig components
│   │   │   └── restaurant/      # Restaurant components
│   │   └── helpers/             # Twig macros
│   └── locales/                 # Translations (ar/en)
├── public/                      # Build output (auto-generated)
├── docs/                        # Documentation
└── tests/                       # Test files
```

---

## 🔨 Build System | نظام البناء

### Webpack Configuration

The theme uses Webpack 5 with the following features:

- **Entry Points**: Modular JavaScript bundles
- **CSS Extraction**: Separate CSS files
- **Asset Copying**: Images copied to public folder
- **Source Maps**: Enabled in development
- **Minification**: Enabled in production

### Build Process

1. **JavaScript**:
   - Transpiled with Babel (ES6+ → ES5)
   - Bundle splitting for optimal loading
   - Tree shaking in production

2. **SCSS**:
   - Compiled to CSS
   - PostCSS processing (Tailwind, autoprefixer)
   - Minified with cssnano in production

3. **Assets**:
   - Images copied to `public/images/`
   - Fonts and other assets handled automatically

### Custom Entry Points

Add new entry points in `webpack.config.js`:

```javascript
entry: {
  'my-feature': asset('js/my-feature.js'),
}
```

---

## ✨ Code Quality | جودة الكود

### Linting

```bash
# Lint all code
pnpm run lint

# Lint JavaScript only
pnpm run lint:js

# Lint and auto-fix JavaScript
pnpm run lint:js:fix

# Lint CSS/SCSS only
pnpm run lint:css

# Lint and auto-fix CSS/SCSS
pnpm run lint:css:fix
```

### Formatting

```bash
# Format all code
pnpm run format

# Check formatting without changes
pnpm run format:check

# Validate everything (format + lint)
pnpm run validate
```

### Pre-commit Checklist

Before committing code:

```bash
# 1. Format code
pnpm run format

# 2. Run linting
pnpm run lint

# 3. Build to verify no errors
pnpm run build

# 4. Test functionality manually
```

### Code Style Guidelines

#### JavaScript

```javascript
// ✅ Good - ES6+ features
const settings = new SufrahSettings();
const { isOpen, getDeliveryZone } = settings;

// ✅ Good - Arrow functions
const updateStatus = () => {
  console.log('Status updated');
};

// ❌ Bad - var usage
var oldStyle = 'avoid this';

// ❌ Bad - Missing semicolons
const foo = 'bar'
```

#### SCSS

```scss
// ✅ Good - BEM naming
.restaurant-menu {
  &__item {
    &--active {
      color: $primary;
    }
  }
}

// ✅ Good - Tailwind utilities
.btn {
  @apply px-4 py-2 rounded bg-primary text-white;
}

// ❌ Bad - Deep nesting
.foo {
  .bar {
    .baz {
      .qux {
        // Too deep!
      }
    }
  }
}
```

---

## 🧪 Testing | الاختبار

### Manual Testing

1. **Business Hours**:
   - Test open/closed status at different times
   - Verify timezone handling
   - Check break period logic

2. **Delivery Zones**:
   - Validate zone selection
   - Test minimum order amounts
   - Verify free delivery thresholds

3. **Product Modifiers**:
   - Test modifier groups
   - Verify price calculations
   - Check max selections enforcement

4. **Order Scheduling**:
   - Test date/time selection
   - Verify advance time requirements
   - Check blackout dates

### Browser Testing

Test in the following browsers:

- ✅ Chrome (latest)
- ✅ Safari (latest)
- ✅ Firefox (latest)
- ✅ Edge (latest)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

### Responsive Testing

Test at the following breakpoints:

- 📱 Mobile: 375px - 767px
- 📱 Tablet: 768px - 1023px
- 💻 Desktop: 1024px - 1279px
- 🖥️ Large Desktop: 1280px+

---

## 🚢 Deployment | النشر

### Pre-deployment Checklist

```bash
# 1. Update version in package.json
# 2. Update version in twilight.json

# 3. Run full validation
pnpm run validate

# 4. Build for production
pnpm run build

# 5. Test production build
# - Check all pages load
# - Verify no console errors
# - Test restaurant features
```

### Build for Production

```bash
# Clean previous builds
pnpm run clean

# Build optimized assets
pnpm run build

# Output will be in /public directory:
# - app.css (minified)
# - app.js (minified and bundled)
# - images/ (optimized)
```

### Deployment to Salla

1. **Package Theme**:
   ```bash
   # Ensure twilight.json is updated
   # Ensure all files are committed
   ```

2. **Upload via Salla CLI** (if available):
   ```bash
   salla theme push
   ```

3. **Manual Upload**:
   - Zip the theme directory
   - Upload via Salla Partners Dashboard
   - Test in staging environment first

### Post-deployment Testing

- ✅ Verify all pages load correctly
- ✅ Test restaurant-specific features
- ✅ Check mobile responsiveness
- ✅ Verify Arabic/English translations
- ✅ Test checkout flow
- ✅ Verify analytics tracking

---

## 🐛 Troubleshooting | حل المشاكل

### Common Issues

#### 1. Build Errors

**Problem**: Webpack build fails

```bash
# Solution 1: Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Solution 2: Check Node.js version
node --version  # Should be 18+

# Solution 3: Clear webpack cache
rm -rf public/*
pnpm run build
```

#### 2. Linting Errors

**Problem**: ESLint or Stylelint errors

```bash
# Auto-fix most issues
pnpm run lint:js:fix
pnpm run lint:css:fix

# If issues persist, check config files:
# - .eslintrc.js
# - .stylelintrc.json
```

#### 3. Tailwind Classes Not Working

**Problem**: Tailwind utilities not being generated

```bash
# Solution: Check tailwind.config.js content paths
# Ensure your files are in the content array

# Rebuild
pnpm run rebuild
```

#### 4. Settings Not Loading

**Problem**: SufrahSettings not loading correctly

```javascript
// Debug in browser console:
const settings = new SufrahSettings();
await settings.load();
console.log(settings.get('restaurant.business_hours'));

// Check if Salla config is available:
console.log(salla.config.get('restaurant'));
```

#### 5. Arabic Text Issues

**Problem**: Arabic text displaying incorrectly

- Check font loading in `src/assets/styles/app.scss`
- Verify RTL direction is set: `dir="rtl"`
- Check locale file: `src/locales/ar.json`

### Debug Mode

Enable debug mode in `.env`:

```env
DEBUG_MODE=true
LOG_LEVEL=debug
```

This will:
- Show detailed console logs
- Display performance metrics
- Highlight potential issues

---

## 💡 Best Practices | أفضل الممارسات

### 1. Code Organization

```javascript
// ✅ Use helper classes for reusable logic
import SufrahSettings from '@js/helpers/settings.js';

// ✅ Keep components modular
// Each component should have one responsibility

// ✅ Use constants for magic numbers
const MAX_MODIFIERS = 10;
const DELIVERY_FEE = 15;
```

### 2. Performance

```javascript
// ✅ Cache DOM queries
const menuItems = document.querySelectorAll('.menu-item');

// ✅ Debounce expensive operations
import { debounce } from '@js/helpers/utils.js';
const updateSearch = debounce(handleSearch, 300);

// ✅ Lazy load images
<img loading="lazy" src="..." alt="...">
```

### 3. Accessibility

```html
<!-- ✅ Use semantic HTML -->
<nav aria-label="Main navigation">
  <button aria-label="Add to cart">...</button>
</nav>

<!-- ✅ Ensure keyboard navigation -->
<div tabindex="0" role="button">...</div>

<!-- ✅ Provide alt text for images -->
<img src="dish.jpg" alt="Grilled chicken with vegetables">
```

### 4. Translations

```javascript
// ✅ Always use translation keys
{{ trans('restaurant.modifiers.title') }}

// ✅ Provide both Arabic and English
// src/locales/ar.json
{
  "restaurant": {
    "menu": {
      "add_to_cart": "أضف إلى السلة"
    }
  }
}

// src/locales/en.json
{
  "restaurant": {
    "menu": {
      "add_to_cart": "Add to Cart"
    }
  }
}
```

### 5. Version Control

```bash
# ✅ Commit related changes together
git add src/assets/js/restaurant/modifiers.js
git commit -m "feat: Add product modifiers functionality"

# ✅ Use conventional commits
# feat: New feature
# fix: Bug fix
# docs: Documentation
# style: Code style changes
# refactor: Code refactoring
# test: Tests
# chore: Build/config changes

# ❌ Avoid committing build artifacts
# public/ should be in .gitignore
```

### 6. Documentation

```javascript
/**
 * Validates delivery zone and cart total
 * @param {string} zoneId - The delivery zone ID
 * @param {number} cartTotal - Cart total in SAR
 * @returns {Object} Validation result with {valid, error, zone}
 */
validateDeliveryZone(zoneId, cartTotal) {
  // Implementation...
}
```

---

## 📚 Additional Resources | مصادر إضافية

### Documentation

- [Salla Developer Docs](https://docs.salla.dev/)
- [Twilight Theme Docs](https://docs.salla.dev/themes)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Webpack Docs](https://webpack.js.org/)

### Internal Documentation

- [API Guide](./API-GUIDE.md) - Integration examples
- [Components Guide](./COMPONENTS.md) - Component usage
- [Settings Guide](./SETTINGS-GUIDE.md) - Configuration
- [Customization Guide](./CUSTOMIZATION.md) - Theme customization

### Support

- GitHub Issues: [Report bugs or request features]
- Salla Support: [Contact Salla support team]

---

## 📝 Quick Reference | مرجع سريع

### Common Commands

```bash
# Development
pnpm run dev              # Start dev mode
pnpm run build            # Build production
pnpm run clean            # Clean build
pnpm run rebuild          # Clean + build

# Code Quality
pnpm run lint             # Lint all
pnpm run lint:js:fix      # Fix JS issues
pnpm run lint:css:fix     # Fix CSS issues
pnpm run format           # Format code
pnpm run validate         # Full validation

# Testing
pnpm run test             # Run tests (TBD)
```

### File Paths

```javascript
// JavaScript aliases
import settings from '@js/helpers/settings.js';
import utils from '@js/helpers/utils.js';

// SCSS imports
@import '@styles/restaurant/menu.scss';
```

### Environment Variables

```env
NODE_ENV=development|production
DEBUG_MODE=true|false
RESTAURANT_TIMEZONE=Asia/Riyadh
ENABLE_MODIFIERS=true|false
```

---

## 🎯 Next Steps

1. ✅ Complete environment setup
2. ✅ Run `pnpm run dev` and verify build
3. ✅ Install VSCode extensions
4. 🔄 Start developing restaurant features
5. 🔄 Follow the [project roadmap](../README.md)

---

**Happy Coding! 🚀 | برمجة سعيدة**

*For questions or issues, refer to the troubleshooting section or open an issue.*

# Theme-Raed Reference Analysis
## Complete Template Analysis for Sufrah Project

> **Document Purpose:** This is the comprehensive reference guide for building the Sufrah theme. All development must follow these patterns, conventions, and structures extracted from the official `theme-raed` template.

---

## 📁 1. File Structure Rules

### Root Directory Structure
```
/
├── src/
│   ├── assets/
│   │   ├── js/              # JavaScript files
│   │   ├── styles/          # SCSS files (ITCSS architecture)
│   │   └── images/          # Static images
│   ├── views/
│   │   ├── layouts/         # Base Twig templates (master.twig, customer.twig)
│   │   ├── pages/           # Page-specific Twig files
│   │   └── components/      # Reusable Twig components
│   └── locales/             # Translation files
├── public/                  # Build output directory
├── twilight.json            # Theme configuration & settings
├── tailwind.config.js       # Tailwind CSS configuration
├── webpack.config.js        # Build configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Dependencies & scripts
```

### JavaScript Structure (`src/assets/js/`)
```
js/
├── app.js                   # Main app initialization
├── app-helpers.js           # Helper methods
├── base-page.js             # Base page class
├── home.js                  # Home page logic
├── product.js               # Product page logic
├── products.js              # Products listing logic
├── cart.js                  # Cart page logic
├── blog.js                  # Blog logic
├── brands.js                # Brands page logic
├── loyalty.js               # Loyalty program logic
├── order.js                 # Order page logic
├── testimonials.js          # Testimonials logic
├── thankyou.js              # Thank you page logic
├── twilight.js              # Salla Twilight integration
├── wishlist.js              # Wishlist logic
└── partials/
    ├── add-product-toast.js # Enhanced add to cart notification
    ├── anime.js             # Animation library wrapper
    ├── digital-files.js     # Digital products handling
    ├── image-zoom.js        # Product image zoom
    ├── main-menu.js         # Main menu logic
    ├── product-card.js      # Product card component
    ├── tooltip.js           # Tooltip initialization
    ├── validate-product-options.js  # ⭐ Critical - Cart options validation
    └── wishlist-card.js     # Wishlist card component
```

### SCSS Structure (ITCSS Architecture)
```
styles/
├── app.scss                 # Main entry point
├── 01-settings/             # Variables & configuration
│   ├── tailwind.scss        # Tailwind imports
│   ├── fonts.scss           # Font definitions
│   ├── global.scss          # CSS variables
│   └── breakpoints.scss     # Responsive breakpoints
├── 02-generic/              # Resets & common styles
│   ├── reset.scss           # Browser reset
│   ├── common.scss          # Common utilities
│   ├── animations.scss      # Animation definitions
│   ├── lazyload.scss        # Lazy loading styles
│   ├── rtl.scss             # RTL-specific styles
│   ├── ltr.scss             # LTR-specific styles
│   ├── tooltip.scss         # Tooltip styles
│   └── _mixins.scss         # SCSS mixins
├── 03-elements/             # Base HTML elements
│   ├── buttons.scss         # Button styles
│   ├── form.scss            # Form elements
│   ├── radio.scss           # Radio buttons
│   └── radio-images.scss    # Image radio buttons
├── 04-components/           # UI components
│   ├── header.scss          # Header component
│   ├── footer.scss          # Footer component
│   ├── menus.scss           # Menu systems
│   ├── user-menu.scss       # User dropdown menu
│   ├── user-pages.scss      # User account pages
│   ├── home-blocks.scss     # Home page blocks
│   ├── slider.scss          # Slider components
│   ├── product.scss         # Product page
│   ├── brands.scss          # Brands page
│   ├── filters.scss         # Product filters
│   ├── gifting.scss         # Gift features
│   ├── loyalty.scss         # Loyalty program
│   ├── virtooal.scss        # Virtual try-on
│   ├── landing-page.scss    # Landing pages
│   ├── add-product-toast.scss  # Add to cart toast
│   └── no-content-placeholder.scss
└── 05-utilities/            # Helper utilities
    ├── chat-bots.scss       # Chat widget styles
    ├── swal.scss            # SweetAlert customization
    ├── safari-fixes.scss    # Safari-specific fixes
    └── font-customization.scss
```

### Twig Views Structure
```
views/
├── layouts/
│   ├── master.twig          # Main layout (all pages inherit)
│   └── customer.twig        # Customer account layout
├── components/
│   ├── header/
│   │   └── header.twig      # Site header
│   ├── footer/
│   │   └── footer.twig      # Site footer
│   └── home/                # Home page components
│       ├── brands.twig
│       ├── custom-testimonials.twig
│       ├── enhanced-slider.twig
│       ├── enhanced-square-banners.twig
│       ├── featured-products-style1.twig
│       ├── featured-products-style2.twig
│       ├── featured-products-style3.twig
│       ├── fixed-banner.twig
│       ├── fixed-products.twig
│       ├── latest-products.twig
│       ├── main-links.twig
│       ├── parallax-background.twig
│       ├── photos-slider.twig
│       ├── products-slider.twig
│       ├── slider-products-with-header.twig
│       ├── square-photos.twig
│       ├── store-features.twig
│       ├── testimonials.twig
│       └── youtube.twig
└── pages/
    ├── index.twig           # Home page
    ├── cart.twig            # Cart page
    ├── landing-page.twig    # Landing page
    ├── loyalty.twig         # Loyalty page
    ├── page-single.twig     # Static page
    ├── blog/
    │   ├── index.twig       # Blog listing
    │   └── single.twig      # Single post
    ├── brands/
    │   ├── index.twig       # Brands listing
    │   └── single.twig      # Single brand
    ├── customer/            # Customer account pages
    │   ├── notifications.twig
    │   ├── profile.twig
    │   ├── wallet.twig
    │   ├── wishlist.twig
    │   └── orders/
    │       ├── index.twig
    │       └── single.twig
    ├── partials/
    │   └── product/
    │       └── options.twig
    └── product/
        └── (product pages)
```

---

## 🎨 2. Naming Conventions

### Files & Directories
- **Files:** `kebab-case` (e.g., `main-menu.js`, `add-product-toast.scss`)
- **Directories:** `kebab-case` (e.g., `01-settings`, `home-blocks`)
- **Twig components:** `kebab-case.twig` (e.g., `enhanced-slider.twig`)

### CSS Classes
- **Methodology:** BEM (Block Element Modifier)
- **Format:** `.block__element--modifier`
- **Examples:**
  ```scss
  .product-card { }                    // Block
  .product-card__image { }             // Element
  .product-card__image--large { }      // Modifier
  .dropdown__trigger { }
  .dropdown__menu { }
  .btn--rounded-gray { }
  .header-btn__icon { }
  ```

### JavaScript Variables
- **Constants:** `SCREAMING_SNAKE_CASE` (rare, mostly from window globals)
- **Functions/Methods:** `camelCase` (e.g., `loadTheApp`, `initAddToCart`)
- **Class Names:** `PascalCase` (e.g., `App`, `Product`, `BasePage`)
- **Event Handlers:** `on + EventName` (e.g., `onReady`, `onPriceUpdated`)

### Twig Variables
- **Salla Variables:** `snake_case` (e.g., `store.settings.is_multilingual`)
- **Custom Variables:** `snake_case` (e.g., `important_links`, `theme.settings`)
- **Component Paths:** `dot.notation` (e.g., `home.enhanced-slider`, `header.header`)

---

## 🔧 3. Configuration Files Deep Dive

### 3.1 twilight.json Structure

**Purpose:** Theme configuration, settings, and component definitions for Salla platform.

#### Essential Fields:
```json
{
  "name": {
    "ar": "اسم القالب",
    "en": "Theme Name"
  },
  "repository": "https://github.com/username/repo",
  "author_email": "email@example.com",
  "features": [
    "mega-menu",              // Enable mega menu
    "fonts",                  // Font selection
    "color",                  // Color customization
    "breadcrumb",             // Breadcrumb navigation
    "unite-cards-height",     // Equal card heights
    "component-featured-products",
    "menu-images",            // Images in menu
    "filters"                 // Product filters
  ],
  "settings": [...],          // Theme settings array
  "components": [...],        // Home page components
  "support_url": "https://...",
  "description": {
    "ar": "الوصف",
    "en": "Description"
  }
}
```

#### Settings Types:
```json
// 1. Boolean (Switch)
{
  "type": "boolean",
  "id": "header_is_sticky",
  "label": "تثبيت القائمة الرئيسية",
  "format": "switch",
  "value": true,
  "selected": true
}

// 2. Dropdown List (Items)
{
  "type": "items",
  "id": "slider_background_size",
  "format": "dropdown-list",
  "label": "طريقة عرض الصور",
  "options": [
    {"label": "Cover", "value": "cover", "key": "unique-id"},
    {"label": "Contain", "value": "contain", "key": "unique-id"}
  ],
  "selected": [{"label": "Contain", "value": "contain", "key": "..."}],
  "source": "Manual",
  "required": true
}

// 3. Static Content (Title/Divider)
{
  "type": "static",
  "format": "title",        // or "line" for divider
  "id": "static-label",
  "value": "<div>HTML Content</div>",
  "variant": "h6"
}

// 4. Color Picker
{
  "type": "color",
  "id": "primary_color",
  "label": "اللون الأساسي",
  "value": "#5cd5c4"
}

// 5. Image Upload
{
  "type": "string",
  "format": "image",
  "id": "banner_image",
  "label": "صورة البنر",
  "description": "* المقاس المناسب 900×600",
  "required": true
}

// 6. Text Input
{
  "type": "string",
  "format": "text",
  "id": "title",
  "label": "العنوان",
  "multilanguage": true,
  "placeholder": "أدخل النص...",
  "minLength": 0,
  "maxLength": 100
}

// 7. Textarea
{
  "type": "string",
  "format": "textarea",
  "id": "description",
  "label": "الوصف",
  "multilanguage": true
}

// 8. Collection (Repeatable Items)
{
  "type": "collection",
  "format": "collection",
  "id": "slides",
  "label": "الشرائح",
  "item_label": "صورة",
  "minLength": 1,
  "maxLength": 10,
  "value": [...],          // Default items
  "fields": [...]          // Field definitions
}
```

#### Component Structure:
```json
{
  "key": "unique-uuid",
  "title": {
    "en": "Component Name",
    "ar": "اسم العنصر"
  },
  "icon": "sicon-name",
  "path": "home.component-file-name",  // Maps to views/components/home/component-file-name.twig
  "fields": [
    // Field definitions (same types as settings)
  ]
}
```

### 3.2 tailwind.config.js

```javascript
module.exports = {
  important: false,
  content: [
    "src/views/**/*.twig",              // Scan Twig files
    "src/assets/js/**/*.js",            // Scan JS files
    'node_modules/@salla.sa/twilight-tailwind-theme/safe-list-css.txt',
  ],
  darkMode: 'class',                    // Enable dark mode via class
  theme: {
    container: {
      center: true,
      padding: '10px',
      screens: { '2xl': "1280px" }
    },
    fontFamily: {
      sans: ['var(--font-main)', '-apple-system', 'BlinkMacSystemFont'],
      primary: "var(--font-main)"
    },
    extend: {
      // Custom colors
      colors: {
        'dark': '#1D1F1F',
        'darker': '#0E0F0F',
        'danger': '#AE0A0A',
        'primary-dark': 'var(--color-primary-dark)'
      },
      // Custom spacing
      spacing: {
        '3.75': '15px',
        '7.5': '30px',
        '58': '232px',
        '100': '28rem',
        '200': '800px',
      },
      // Border radius
      borderRadius: {
        'large': '22px',
        'big': '40px',
        'tiny': '3px',
        DEFAULT: '.75rem',
      },
      // Font sizes
      fontSize: {
        'icon-lg': '33px',
        'xxs': '10px',
        'xxxs': '8px',
        'title-size': '42px',
      },
      // Box shadows
      boxShadow: {
        'default': '5px 10px 30px #2B2D340D;',
        'top': '0px 0px 10px #0000001A;',
        'dropdown': '0 4px 8px rgba(161, 121, 121, 0.07)',
      },
      // Breakpoints
      screens: {
        'xxs': {'min': '380px', 'max': '479px'},
        'xs': '480px',
      },
      // Animations
      keyframes: {
        slideUpFromBottom: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0%)', opacity: '1' },
        },
      },
      animation: {
        slideUpFromBottom: 'slideUpFromBottom .6s linear',
      },
    },
  },
  plugins: [
    require('@salla.sa/twilight-tailwind-theme'),  // ⭐ Required Salla plugin
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
```

### 3.3 webpack.config.js

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ThemeWatcher = require('@salla.sa/twilight/watcher.js');  // ⭐ Salla theme watcher
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: [
      asset('styles/app.scss'),
      asset('js/wishlist.js'),
      asset('js/app.js'),
      asset('js/blog.js')
    ],
    home: asset('js/home.js'),
    'product-card': asset('js/partials/product-card.js'),
    'main-menu': asset('js/partials/main-menu.js'),
    checkout: [asset('js/cart.js'), asset('js/thankyou.js')],
    product: [asset('js/product.js'), asset('js/products.js')],
    // ... more entries
  },
  output: {
    path: public(),
    clean: true,
    chunkFilename: "[name].[contenthash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/(node_modules)/, asset('js/twilight.js')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [["@babel/plugin-transform-runtime", {"regenerator": true}]]
          }
        }
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: "css-loader", options: {url: false}},
          "postcss-loader",
          "sass-loader",
        ]
      },
    ],
  },
  plugins: [
    new ThemeWatcher(),                    // ⭐ Watch for theme changes
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{from: asset('images'), to: public('images')}]
    }),
  ],
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
}
```

---

## 🔌 4. Salla APIs Best Practices

### 4.1 Core Initialization

```javascript
// Main app initialization
salla.onReady(() => {
  // Initialize your app here
  (new App).loadTheApp();
});
```

### 4.2 Configuration Access

```javascript
// Get theme settings
salla.config.get('theme.is_rtl')          // Check if RTL
salla.config.get('store.name')            // Get store name

// Get theme settings from twilight.json
theme.settings.get('header_is_sticky', 'Default Value')
theme.settings.get('enable_add_product_toast', true)

// Set global variables
{{ theme.settings.set('placeholder', 'images/placeholder.png') }}
```

### 4.3 Language & Translations

```javascript
// Load translations
salla.lang.onLoaded(() => {
  const menuTitle = salla.lang.get('blocks.header.main_menu');
});

// Get current language
{{ user.language.code }}    // en, ar
{{ user.language.dir }}     // ltr, rtl
```

### 4.4 Product APIs

```javascript
// Get product price based on selected options
salla.product.getPrice(formData)

// Listen for price updates
salla.product.event.onPriceUpdated((response) => {
  let data = response.data;
  let is_on_sale = data.has_sale_price && data.regular_price > data.price;

  // Update UI
  totalPrice.innerHTML = salla.money(data.price);
  beforePrice.innerHTML = salla.money(data.regular_price);
});

// Listen for price update failures
salla.event.on('product::price.updated.failed', () => {
  // Handle out of stock or error
});
```

### 4.5 Cart APIs

```javascript
// Listen for cart updates
salla.cart.event.onUpdated(summary => {
  // Update cart totals
  document.querySelectorAll('[data-cart-total]')
    .forEach(el => el.innerHTML = salla.money(summary.total));

  // Update item count
  document.querySelectorAll('[data-cart-count]')
    .forEach(el => el.innerText = salla.helpers.number(summary.count));
});

// Listen for item added
salla.cart.event.onItemAdded((response, productId) => {
  // Animate to cart
  app.element('salla-cart-summary')
    .animateToCart(app.element(`#product-${productId} img`));
});

// Listen for item updated
salla.cart.event.onItemUpdated((data, itemId) => {
  // Handle update
});

// Listen for update failures
salla.cart.event.onItemUpdatedFailed((data, itemId) => {
  // Restore previous state
});

// Add item to cart
salla.cart.addItem(productId, quantity, options);

// Get cart details
salla.cart.details(cartId, ['options']).then(({data}) => {
  // Handle cart data
});
```

### 4.6 Event System

```javascript
// Custom events
salla.event.dispatch('login::open');
salla.event.dispatch('localization::open');
salla.event.dispatch('scopes::open', {mode: 'default'});

// Document click events
salla.event.document.onClick("[data-close-modal]", e => {
  // Handle click
});

// Product events
salla.event.on('product::updated', (data) => {
  // Handle product update
});
```

### 4.7 Notifications

```javascript
// Custom notifier with SweetAlert2
salla.notify.setNotifier(function(message, type, data) {
  // Check if it's add to cart notification
  if (window.enable_add_product_toast &&
      data?.data?.googleTags?.event === "addToCart") {
    return; // Skip, use custom toast
  }

  // Show toast notification
  return Swal.mixin({
    toast: true,
    position: salla.config.get('theme.is_rtl') ? 'top-start' : 'top-end',
    showConfirmButton: false,
    timer: 2000,
  }).fire({
    icon: type,
    title: message,
    timerProgressBar: true
  });
});
```

### 4.8 Comments

```javascript
// Listen for new comments
salla.comment.event.onAdded(() => {
  window.location.reload();
});
```

### 4.9 Helper Functions

```javascript
// Format money
salla.money(price)                    // Returns formatted price with currency

// Format numbers
salla.helpers.number(count)           // Format number with Arabic/English digits

// Log messages
salla.log('Message')                  // Console log with Salla prefix
```

### 4.10 API Calls

```javascript
// Get current cart ID
salla.api.cart.getCurrentCartId(useCache, source)

// Custom API calls
salla.api.get(endpoint).then(response => {
  // Handle response
});
```

---

## 🎭 5. Twig Templating System

### 5.1 Available Global Variables

#### Store Object
```twig
{{ store.id }}                           {# int #}
{{ store.name }}                         {# string #}
{{ store.username }}                     {# string #}
{{ store.description }}                  {# string #}
{{ store.slogan }}                       {# string (if feature enabled) #}
{{ store.logo }}                         {# string (URL) #}
{{ store.url }}                          {# string (full URL) #}
{{ store.api }}                          {# API endpoint URL #}
{{ store.icon }}                         {# favicon URL #}

{# Contacts #}
{{ store.contacts.email }}
{{ store.contacts.mobile }}
{{ store.contacts.phone }}
{{ store.contacts.whatsapp }}
{{ store.contacts.telegram }}

{# Social Media #}
{{ store.social.instagram }}
{{ store.social.snapchat }}
{{ store.social.twitter }}
{{ store.social.youtube }}
{{ store.social.facebook }}
{{ store.social.pinterest }}
{{ store.social.maroof }}

{# Settings #}
{{ store.settings.auth.email_allowed }}          {# bool #}
{{ store.settings.auth.mobile_allowed }}         {# bool #}
{{ store.settings.auth.is_email_required }}      {# bool #}
{{ store.settings.cart.apply_coupon_enabled }}   {# bool #}
{{ store.settings.product.total_sold_enabled }}  {# bool #}
{{ store.settings.product.fit_type }}            {# 'cover' | 'contain' | null #}
{{ store.settings.category.testimonial_enabled }} {# bool #}
{{ store.settings.tax.number }}                  {# string #}
{{ store.settings.tax.certificate }}             {# URL #}
{{ store.settings.tax.taxable_prices_enabled }}  {# bool #}
{{ store.settings.rating_enabled }}              {# bool #}
{{ store.settings.arabic_numbers_enabled }}      {# bool #}
{{ store.settings.is_multilingual }}             {# bool #}
{{ store.settings.currencies_enabled }}          {# bool #}

{# Scope (Branches) #}
{{ store.scope.name }}
{{ store.scope.display_as }}                     {# 'popup' | 'inline' #}
```

#### Theme Object
```twig
{{ theme.id }}                                   {# int #}
{{ theme.name }}                                 {# string #}
{{ theme.mode }}                                 {# 'live' | 'preview' #}
{{ theme.is_rtl }}                               {# bool #}
{{ theme.translations_hash }}                    {# int #}

{# Colors #}
{{ theme.color.primary }}                        {# hex color #}
{{ theme.color.text }}                           {# #000000 or #FFFFFF #}
{{ theme.color.reverse_primary }}
{{ theme.color.reverse_text }}
{{ theme.color.is_dark }}                        {# bool #}
{{ theme.color.darker(0.15) }}                   {# Darken primary color #}
{{ theme.color.lighter(0.15) }}                  {# Lighten primary color #}
{{ theme.color.darker(0.15, '#ff0000') }}        {# Darken custom color #}

{# Font #}
{{ theme.font.name }}                            {# DINNextLTArabic, Amazon-Ember, etc. #}
{{ theme.font.path }}                            {# CSS file URL #}

{# Settings #}
{{ theme.settings.get('setting_name', 'default') }}
{{ theme.settings.set('var_name', 'value') }}
```

#### User Object
```twig
{{ user.type }}                                  {# 'guest' | 'user' #}
{{ user.language.code }}                         {# 'ar' | 'en' #}
{{ user.language.name }}                         {# 'العربية' | 'English' #}
{{ user.language.dir }}                          {# 'rtl' | 'ltr' #}
{{ user.can_access_wallet }}                     {# bool #}
```

#### Cart Object
```twig
{{ cart.items_count }}                           {# int #}
{{ cart.total }}                                 {# formatted string: "100 ر.س" #}
```

#### Currency Object
```twig
{{ currency.symbol }}                            {# ر.س, $, etc. #}
```

### 5.2 Twig Filters

```twig
{# Asset filter - get asset URL #}
{{ 'app.css' | asset }}
{{ 'product-card.js' | asset }}

{# CDN filter - optimize images #}
{{ store.logo | cdn(175) }}                      {# Resize to 175px width #}
{{ theme.font.path | cdn }}

{# JSON encode #}
{{ user.can_access_wallet | json_encode }}

{# Translation #}
{{ trans('common.elements.delete') }}
```

### 5.3 Twig Functions

```twig
{# Check current page #}
{% if is_page('index') %}
  <h1>Home Page</h1>
{% endif %}

{# Include components #}
{% component 'header.header' %}
{% component 'footer.footer' %}
{% component 'home.enhanced-slider' %}

{# Hooks for custom code injection #}
{% hook 'head:start' %}
{% hook 'head:end' %}
{% hook 'body:start' %}
{% hook 'body:end' %}
{% hook head %}
{% hook 'body:classes' %}
```

### 5.4 Control Structures

```twig
{# Variables #}
{% set important_links = theme.settings.get('important_links') %}
{% set is_on_sale = product.sale_price > 0 %}

{# Conditionals #}
{% if user.type == 'user' %}
  {# Logged in user #}
{% else %}
  {# Guest #}
{% endif %}

{# Loops #}
{% for item in items %}
  {{ item.name }}
{% endfor %}

{# Ternary operator #}
{{ theme.settings.get('footer_is_dark') ? 'footer-is-dark' : 'footer-is-light' }}
```

### 5.5 Salla Components (Web Components)

```twig
{# Search #}
<salla-search inline oval height="36"></salla-search>

{# Cart Summary #}
<salla-cart-summary>
  <i slot="icon" class="sicon-shopping-bag"></i>
</salla-cart-summary>

{# User Menu #}
<salla-user-menu avatar-only show-header></salla-user-menu>

{# Login Modal #}
<salla-login-modal></salla-login-modal>

{# Contacts #}
<salla-contacts is-header></salla-contacts>

{# Menu #}
<salla-menu source="footer" topnav></salla-menu>

{# Localization #}
<salla-localization-modal></salla-localization-modal>

{# Scopes (Branches) #}
<salla-scopes selection="mandatory"></salla-scopes>

{# Offer Modal #}
<salla-offer-modal></salla-offer-modal>

{# Product Options #}
<salla-product-options></salla-product-options>

{# Quantity Input #}
<salla-quantity-input></salla-quantity-input>

{# Loading Indicator #}
<salla-loading size="32"></salla-loading>

{# Add to Cart Toast (Custom) #}
<salla-add-product-toast></salla-add-product-toast>

{# Slider #}
<salla-slider class="details-slider"></salla-slider>
```

### 5.6 Common Patterns

#### Master Layout Pattern
```twig
{# layouts/master.twig #}
<!DOCTYPE html>
<html lang="{{ user.language.code }}" dir="{{ user.language.dir }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  {# Load scripts #}
  <script defer src="{{ 'product-card.js'|asset }}"></script>

  {% hook 'head:start' %}

  {# Styles #}
  <link rel="stylesheet" href="{{ 'app.css' | asset }}">

  {# CSS Variables #}
  <style>
    :root {
      --font-main: '{{theme.font.name}}';
      --color-primary: {{ theme.color.primary }};
      --color-primary-dark: {{ theme.color.darker(0.15) }};
    }
  </style>

  {% hook 'head:end' %}
</head>
<body id="app" class="theme-raed {{ theme.settings.get('footer_is_dark') ? 'footer-is-dark' : '' }}">
  {% hook 'body:start' %}

  {% component 'header.header' %}

  <main id="main-content">
    {% block content %}{% endblock %}
  </main>

  {% component 'footer.footer' %}

  {% hook 'body:end' %}

  <script defer src="{{ 'app.js' | asset }}"></script>
</body>
</html>
```

#### Page Template Pattern
```twig
{# pages/product/single.twig #}
{% extends "layouts.master" %}

{% block content %}
  <div class="container">
    {# Page content #}
  </div>
{% endblock %}

{% block scripts %}
  <script defer src="{{ 'product.js' | asset }}"></script>
{% endblock %}
```

---

## 🎯 6. JavaScript Patterns & Architecture

### 6.1 Class-Based Architecture

```javascript
// Base pattern
class App extends AppHelpers {
  constructor() {
    super();
    window.app = this;  // Global access
  }

  loadTheApp() {
    // Initialize everything
    this.commonThings();
    this.initiateNotifier();
    this.initiateMobileMenu();
    this.initAddToCart();

    this.status = 'ready';
    document.dispatchEvent(new CustomEvent('theme::ready'));
    this.log('Theme Loaded 🎉');
  }

  log(message) {
    salla.log(`ThemeApp(Raed)::${message}`);
    return this;
  }
}

// Initialize on Salla ready
salla.onReady(() => (new App).loadTheApp());
```

### 6.2 Page-Specific Classes

```javascript
// base-page.js
class BasePage {
  constructor() {
    this.onReady();
    this.registerEvents();
  }

  onReady() {
    // Override in child classes
  }

  registerEvents() {
    // Override in child classes
  }

  static initiateWhenReady(pages) {
    salla.onReady(() => {
      if (salla.config.isPage(pages)) {
        new this();
      }
    });
  }
}

// product.js
class Product extends BasePage {
  onReady() {
    app.watchElements({
      totalPrice: '.total-price',
      productWeight: '.product-weight',
    });

    this.initProductOptionValidations();
  }

  initProductOptionValidations() {
    document.querySelector('.product-form')?.addEventListener('change', function() {
      this.reportValidity() && salla.product.getPrice(new FormData(this));
    });
  }

  registerEvents() {
    salla.product.event.onPriceUpdated((res) => {
      let data = res.data;
      app.totalPrice.forEach(el => {
        el.innerHTML = salla.money(data.price);
      });
    });
  }
}

// Auto-initialize on specific pages
Product.initiateWhenReady(['product.single']);
```

### 6.3 Helper Methods Pattern

```javascript
class AppHelpers {
  // Element selection
  element(selector) {
    return document.querySelector(selector);
  }

  all(selector, callback) {
    let elements = document.querySelectorAll(selector);
    return callback ? (elements.forEach(callback) || this) : elements;
  }

  // Event handling
  onClick(selector, callback) {
    this.all(selector, element =>
      element.addEventListener('click', callback)
    );
    return this;
  }

  on(event, selector, callback) {
    if (typeof selector === 'object') {
      selector.addEventListener(event, callback);
    } else {
      this.all(selector, element =>
        element.addEventListener(event, callback)
      );
    }
    return this;
  }

  // Class manipulation
  addClass(selector, className) {
    this.all(selector, el => el.classList.add(className));
    return this;
  }

  removeClass(selector, className) {
    this.all(selector, el => el.classList.remove(className));
    return this;
  }

  toggleClass(selector, className) {
    this.all(selector, el => el.classList.toggle(className));
    return this;
  }

  // Conditional class toggling
  toggleElementClassIf(element, addClass, removeClass, condition) {
    let elements = typeof element === 'string'
      ? document.querySelectorAll(element)
      : [element];

    elements.forEach(el => {
      if (condition()) {
        el?.classList.remove(...removeClass.split(' '));
        el?.classList.add(...addClass.split(' '));
      } else {
        el?.classList.remove(...addClass.split(' '));
        el?.classList.add(...removeClass.split(' '));
      }
    });
    return this;
  }

  // Watch elements (make them available as app.elementName)
  watchElements(elements) {
    Object.keys(elements).forEach(elementKey => {
      this[elementKey] = document.querySelectorAll(elements[elementKey]);
    });
  }

  // Wait for element to load
  isElementLoaded(selector) {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (document.querySelector(selector)) {
          clearInterval(interval);
          return resolve(document.querySelector(selector));
        }
      }, 160);
    });
  }
}
```

### 6.4 Module Pattern (Partials)

```javascript
// validate-product-options.js
export function validateProductOptions() {
  const cartItems = document.querySelectorAll('.main-content form');

  cartItems.forEach(item => {
    const itemId = getItemId(item);
    const productOptions = item.querySelector('salla-product-options');

    if (productOptions) {
      productOptions.addEventListener('changed', e => {
        if (!item.reportValidity()) return;
        appendLoadingOverlay(itemId);
      });
    }
  });

  salla.cart.event.onItemUpdated((data, id) => {
    removeLoadingOverlay(id);
  });
}

function getItemId(item) {
  return item.querySelector('input[name="id"]')?.value;
}

function appendLoadingOverlay(itemId) {
  // Implementation
}
```

---

## 📦 7. Required Dependencies

### Production Dependencies
```json
{
  "dependencies": {
    "@babel/runtime": "^7.28.6",
    "animejs": "^3.2.1",                        // Animation library
    "fslightbox": "^3.7.3",                     // Lightbox for images
    "lite-youtube-embed": "^0.2.0",             // Embedded YouTube
    "mmenu-light": "^3.0.9",                    // Mobile menu
    "sweetalert2": "^11.26.17"                  // Notifications
  }
}
```

### Development Dependencies
```json
{
  "devDependencies": {
    "@babel/core": "^7.28.6",
    "@babel/plugin-transform-runtime": "^7.28.0",
    "@babel/preset-env": "^7.28.5",

    // ⭐ Salla Packages (REQUIRED)
    "@salla.sa/twilight": "^2.14.374",
    "@salla.sa/twilight-components": "^2.14.374",
    "@salla.sa/twilight-tailwind-theme": "^2.14.374",

    // Tailwind & PostCSS
    "@tailwindcss/forms": "^0.5.11",
    "@tailwindcss/line-clamp": "^0.4.0",
    "@tailwindcss/nesting": "^0.0.0-insiders.565cd3e",
    "autoprefixer": "^10.4.21",
    "tailwindcss": "^3.4.19",
    "postcss": "^8.5.6",
    "postcss-import": "^16.1.1",
    "postcss-loader": "^8.2.0",
    "postcss-preset-env": "^8.0.1",

    // Webpack
    "webpack": "^5.103.0",
    "webpack-cli": "^5.0.1",
    "copy-webpack-plugin": "^13.0.1",

    // Loaders
    "babel-loader": "^10.0.0",
    "css-loader": "^6.5.0",
    "postcss-loader": "^8.2.0",
    "sass-loader": "^16.0.6",

    // CSS Processing
    "mini-css-extract-plugin": "^2.9.4",
    "css-minimizer-webpack-plugin": "^7.0.2",

    // SASS
    "sass": "^1.97.2"
  }
}
```

### NPM Scripts
```json
{
  "scripts": {
    "preinstall": "npx only-allow pnpm",          // Force pnpm usage
    "production": "webpack --mode production",    // Build for production
    "prod": "webpack --mode production",
    "development": "webpack --mode development",  // Build for development
    "watch": "webpack --mode development --watch" // Watch mode
  }
}
```

---

## 🏗️ 8. Build Process

### Build Commands
```bash
# Install dependencies (MUST use pnpm)
pnpm install

# Development build
pnpm run development

# Watch mode (auto-rebuild on changes)
pnpm run watch

# Production build (minified)
pnpm run production
# or
pnpm run prod
```

### Build Output
```
public/
├── app.css                  # Main CSS bundle
├── app.js                   # Main JS bundle
├── home.js                  # Home page JS
├── product.js               # Product page JS
├── product-card.js          # Product card component
├── main-menu.js             # Main menu component
├── checkout.js              # Checkout pages
├── pages.js                 # Misc pages
├── order.js                 # Order page
├── testimonials.js          # Testimonials
└── images/                  # Copied images
```

### Build Process Flow
1. **Webpack** reads entry points from `webpack.config.js`
2. **Babel** transpiles modern JavaScript to ES5
3. **Sass** compiles SCSS to CSS
4. **PostCSS** processes CSS:
   - **postcss-import** - Resolve `@import`
   - **Tailwind CSS** - Generate utility classes
   - **Autoprefixer** - Add vendor prefixes
5. **MiniCssExtractPlugin** - Extract CSS to separate files
6. **CssMinimizerPlugin** - Minify CSS (production only)
7. **CopyPlugin** - Copy static assets (images)
8. **ThemeWatcher** - Watch for theme changes (Salla specific)

---

## 🎨 9. SCSS Architecture (ITCSS)

### Layer Order (Critical!)
The order of imports in `app.scss` must follow this sequence:

#### 1. Settings Layer
Global variables, config, no actual CSS output
```scss
@import './01-settings/tailwind';      // Tailwind directives
@import './01-settings/fonts';         // Font definitions
@import './01-settings/global';        // CSS variables
@import './01-settings/breakpoints';   // Responsive mixins
```

#### 2. Generic Layer
Reset, normalize, box-sizing
```scss
@import './02-generic/reset';          // Browser reset
@import './02-generic/common';         // Common utilities
@import './02-generic/tooltip';        // Tooltip styles
@import './02-generic/animations';     // Keyframe animations
@import './02-generic/lazyload';       // Lazy load placeholders
@import './02-generic/rtl';            // RTL overrides
@import './02-generic/ltr';            // LTR overrides
@import './02-generic/mixins';         // SCSS mixins
```

#### 3. Elements Layer
Bare HTML elements (no classes)
```scss
@import './03-elements/form';          // Input, select, textarea
@import './03-elements/buttons';       // Button element
@import './03-elements/radio';         // Radio inputs
@import './03-elements/radio-images';  // Image radio buttons
```

#### 4. Components Layer
UI components (most CSS lives here)
```scss
@import './04-components/header';
@import './04-components/footer';
@import './04-components/menus';
@import './04-components/user-menu';
@import './04-components/user-pages';
@import './04-components/home-blocks';
@import './04-components/slider';
@import './04-components/product';
@import './04-components/brands';
@import './04-components/no-content-placeholder';
@import './04-components/gifting';
@import './04-components/loyalty';
@import './04-components/filters';
@import './04-components/add-product-toast';
```

#### 5. Utilities Layer
Helpers, overrides, !important allowed here
```scss
@import './05-utilities/chat-bots';
@import './05-utilities/swal';
@import './05-utilities/safari-fixes';
@import './05-utilities/font-customization';
```

#### 6. Third-Party Styles
```scss
@import 'lite-youtube-embed/src/lite-yt-embed.css';
@import 'mmenu-light/dist/mmenu-light.css';
```

### CSS Variables Usage

```scss
// 01-settings/global.scss
:root {
  // Colors
  --color-primary: #5cd5c4;
  --color-primary-dark: #272628;
  --color-text: #7c8082;
  --bg-gray: #c6c7ce1a;

  // Typography
  --font-main: "DINNextLTArabic";
  --font-sm: 0.8685714286rem;

  // Spacing (from Tailwind extend)
  // Use Tailwind classes instead
}

// Usage in SCSS
.my-component {
  color: var(--color-primary);
  font-family: var(--font-main);
}
```

### Tailwind @apply Directive

```scss
// Theme uses @apply to keep HTML clean
.product-card {
  @apply bg-white rounded-lg shadow-default p-4;
  @apply hover:shadow-md transition-shadow;
  @apply flex flex-col gap-3;
}

// Instead of:
// <div class="bg-white rounded-lg shadow-default p-4 hover:shadow-md transition-shadow flex flex-col gap-3">
// Use:
// <div class="product-card">
```

### Common Mixins

```scss
// 02-generic/_mixins.scss
@mixin flexable($align: center, $justify: center, $direction: row) {
  display: flex;
  align-items: $align;
  justify-content: $justify;
  flex-direction: $direction;
}

// Usage
.centered-content {
  @include flexable(center, center, column);
}
```

---

## 🌐 10. Common Patterns & Best Practices

### 10.1 Responsive Design

```scss
// Use Tailwind responsive prefixes
<div class="block md:flex lg:grid">

// Or use custom breakpoints
@screen md {
  .my-class {
    display: flex;
  }
}

// Available breakpoints (tailwind.config.js):
// xxs: 380px-479px
// xs: 480px
// sm: 640px (Tailwind default)
// md: 768px (Tailwind default)
// lg: 1024px (Tailwind default)
// xl: 1280px (Tailwind default)
// 2xl: 1280px (custom override)
```

### 10.2 RTL/LTR Support

```twig
{# Conditional classes #}
<div class="rtl:mr-4 ltr:ml-4">

{# Direction-aware positioning #}
<div class="{{ theme.is_rtl ? 'right-0' : 'left-0' }}">
```

```scss
// RTL-specific styles in rtl.scss
[dir="rtl"] {
  .custom-element {
    margin-right: 1rem;
  }
}

// LTR-specific styles in ltr.scss
[dir="ltr"] {
  .custom-element {
    margin-left: 1rem;
  }
}
```

### 10.3 Lazy Loading Images

```twig
<img data-src="{{ product.image }}"
     src="{{ theme.settings.get('placeholder') }}"
     class="lazyload"
     alt="{{ product.name }}">
```

### 10.4 Icon Usage

```html
<!-- Salla Icons (sallaicons.css) -->
<i class="sicon-shopping-bag"></i>
<i class="sicon-user-circle"></i>
<i class="sicon-menu"></i>

<!-- Common icons with sizes -->
<i class="sicon-close text-2xl"></i>
<i class="sicon-location text-icon-lg"></i>
```

### 10.5 Animation Patterns

```javascript
// Using anime.js wrapper
app.anime('.my-element', {
  duration: 3000,
  translateY: [100, 0],
  opacity: [0, 1]
});

// Or chained
app.anime('.my-element', false)
  .duration(3000)
  .translateY([100, 0])
  .play();
```

### 10.6 Form Validation

```javascript
// Product form validation
document.querySelector('.product-form')?.addEventListener('change', function() {
  // reportValidity() checks HTML5 validation
  this.reportValidity() && salla.product.getPrice(new FormData(this));
});
```

### 10.7 Modal Pattern

```twig
<!-- Modal Trigger -->
<button data-modal-trigger="my-modal">Open Modal</button>

<!-- Modal Structure -->
<div id="my-modal" class="hidden s-salla-modal">
  <div class="s-salla-modal-overlay opacity-0"></div>
  <div class="s-salla-modal-body opacity-0 translate-y-4">
    <!-- Content -->
    <button data-close-modal="my-modal">Close</button>
  </div>
</div>
```

### 10.8 Dropdown Pattern

```html
<div class="dropdown">
  <button class="dropdown__trigger">Open</button>
  <div class="dropdown__menu">
    <!-- Content -->
    <button class="dropdown__close">Close</button>
  </div>
</div>
```

### 10.9 Loading Overlay Pattern

```javascript
function createLoadingOverlay() {
  const overlay = document.createElement('div');
  overlay.classList.add('loading-overlay', 'absolute', 'inset-0',
                        'z-50', 'flex', 'justify-center', 'items-center');

  const background = document.createElement('div');
  background.classList.add('absolute', 'inset-0', 'bg-white', 'opacity-40');

  const loader = document.createElement('div');
  loader.innerHTML = '<salla-loading size="32"></salla-loading>';
  loader.classList.add('relative', 'z-10');

  overlay.appendChild(background);
  overlay.appendChild(loader);

  return overlay;
}
```

---

## ✅ 11. Validation Checklist

Before considering any component complete, verify:

### Structure
- [ ] Follows file naming convention (`kebab-case`)
- [ ] Placed in correct directory (`components/`, `pages/`, etc.)
- [ ] Component registered in `twilight.json` if needed
- [ ] Webpack entry added if new JS bundle needed

### Twig
- [ ] Extends correct layout (`layouts.master` or `layouts.customer`)
- [ ] Uses `{% component %}` for reusable parts
- [ ] Uses available global variables (`store`, `theme`, `user`)
- [ ] Hooks placed correctly (`{% hook 'head:end' %}`)
- [ ] Assets loaded with filters (`{{ 'app.js' | asset }}`)
- [ ] Images optimized with CDN (`{{ image | cdn(size) }}`)

### JavaScript
- [ ] Uses `salla.onReady()` for initialization
- [ ] Follows class-based pattern if complex
- [ ] Event listeners properly attached
- [ ] Salla events used correctly (e.g., `salla.cart.event.onUpdated`)
- [ ] No memory leaks (remove listeners when needed)
- [ ] ES6+ features transpiled by Babel

### SCSS
- [ ] Follows ITCSS layer order
- [ ] Uses BEM naming for classes
- [ ] Leverages Tailwind with `@apply` directive
- [ ] CSS variables used for theme colors
- [ ] RTL/LTR support included
- [ ] Responsive design implemented

### Functionality
- [ ] Works on mobile, tablet, desktop
- [ ] Supports RTL and LTR
- [ ] Compatible with Safari, Chrome, Firefox, Edge
- [ ] Accessible (ARIA labels, keyboard navigation)
- [ ] Loading states shown
- [ ] Error states handled
- [ ] Success notifications displayed

### Performance
- [ ] Images lazy-loaded
- [ ] Scripts deferred (`defer` attribute)
- [ ] CSS minimized in production
- [ ] No unnecessary re-renders
- [ ] Event delegation used where appropriate

---

## 🚀 12. Quick Reference Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm run watch              # Watch mode with auto-rebuild

# Production
pnpm run prod               # Build optimized production files

# File operations
find src -name "*.twig"     # Find all Twig files
find src -name "*.js"       # Find all JS files
grep -r "salla.product" src # Search for Salla API usage
```

---

## 📚 13. Component Development Workflow

### Creating a New Home Component

1. **Create Twig file**
   ```
   src/views/components/home/my-component.twig
   ```

2. **Add to twilight.json**
   ```json
   {
     "key": "unique-uuid",
     "title": {"ar": "عنصري", "en": "My Component"},
     "icon": "sicon-icon-name",
     "path": "home.my-component",
     "fields": [...]
   }
   ```

3. **Create SCSS (if needed)**
   ```
   src/assets/styles/04-components/my-component.scss
   ```

   Import in `app.scss`:
   ```scss
   @import './04-components/my-component';
   ```

4. **Create JS (if needed)**
   ```
   src/assets/js/partials/my-component.js
   ```

   Add to webpack entry or import in existing bundle.

5. **Test**
   - Run `pnpm run watch`
   - Add component in Salla admin
   - Verify appearance and functionality

---

## 🔍 14. Common Troubleshooting

### Build Issues
- **Error: Cannot find module** → Run `pnpm install`
- **Tailwind classes not working** → Check `tailwind.config.js` content paths
- **CSS not updating** → Clear browser cache, rebuild with `pnpm run prod`

### JavaScript Issues
- **Salla API not working** → Ensure `salla.onReady()` is used
- **Element not found** → Use `app.isElementLoaded()` or wait for DOM ready
- **Events not firing** → Check event names in Salla docs

### Styling Issues
- **RTL not working** → Check `dir` attribute in HTML
- **Responsive not working** → Verify breakpoint usage
- **Override not applying** → Check CSS specificity, use utilities layer

---

## 📖 15. Additional Resources

### Salla Documentation
- **Theme Docs:** https://docs.salla.sa/themes
- **Twilight Components:** https://twilight.salla.dev
- **Salla APIs:** https://docs.salla.sa/api

### Tools & Libraries
- **Tailwind CSS:** https://tailwindcss.com
- **Twig:** https://twig.symfony.com
- **SweetAlert2:** https://sweetalert2.github.io
- **Anime.js:** https://animejs.com

---

## ✨ Summary

This document provides a complete reference for building Salla themes based on the `theme-raed` template. Key takeaways:

1. **Follow the structure** - Don't deviate from established patterns
2. **Use Salla APIs correctly** - Always use `salla.onReady()` and proper event listeners
3. **Maintain ITCSS order** - CSS architecture is critical
4. **Support RTL/LTR** - Every component must work bidirectionally
5. **Optimize performance** - Lazy load, defer scripts, minimize bundles
6. **Test thoroughly** - Multiple devices, browsers, and languages

**Remember:** This template is battle-tested. When in doubt, reference the original `theme-raed` implementation.

---

**Document Version:** 1.0
**Last Updated:** 2026-03-12
**Agent:** Template Guardian (Agent 01)

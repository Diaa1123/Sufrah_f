/**
 * Sufrah Modifiers System
 * Handles product customization (sizes, extras, modifications)
 * @version 1.0.0
 */

import sufrahSettings from '../helpers/settings.js';

export class ModifiersSystem {
  constructor(productElement) {
    if (!productElement) {
      throw new Error('ModifiersSystem: Product element is required');
    }

    this.product = productElement;
    this.basePrice = parseFloat(productElement.dataset.basePrice) || 0;
    this.productId = productElement.dataset.productId;

    // State
    this.modifiers = {
      size: null,
      extras: [],
      modifications: [],
      specialInstructions: ''
    };

    // Config
    this.config = {
      showCalories: sufrahSettings.get('modifiers.show_calories', true),
      showIngredients: sufrahSettings.get('modifiers.show_ingredients', true),
      allowInstructions: sufrahSettings.get('modifiers.allow_special_instructions', true),
      maxInstructionsLength: sufrahSettings.get('modifiers.max_instructions_length', 200)
    };

    // Cache DOM elements
    this.elements = {};

    this.init();
  }

  /**
   * Initialize the modifiers system
   */
  init() {
    this.cacheElements();
    this.bindEvents();
    this.loadSavedState();
    this.updatePrice();

    // Attach to element for external access
    this.product.modifiersSystem = this;

    // Trigger ready event
    this.triggerEvent('modifiers:ready');
  }

  /**
   * Cache frequently accessed DOM elements
   */
  cacheElements() {
    this.elements = {
      sizeRadios: this.product.querySelectorAll('[data-modifier-type="size"]'),
      extraCheckboxes: this.product.querySelectorAll('[data-modifier-type="extra"]'),
      modificationCheckboxes: this.product.querySelectorAll('[data-modifier-type="modification"]'),
      instructionsField: this.product.querySelector('[data-special-instructions]'),
      totalPriceDisplay: this.product.querySelector('[data-total-price]'),
      charCounter: this.product.querySelector('[data-char-counter]'),
      submitButton: this.product.querySelector('[data-add-to-cart]')
    };
  }

  /**
   * Bind all event listeners
   */
  bindEvents() {
    // Size selection
    this.elements.sizeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => this.handleSizeChange(e));
    });

    // Extras checkboxes
    this.elements.extraCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => this.handleExtraChange(e));
    });

    // Modifications checkboxes
    this.elements.modificationCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => this.handleModificationChange(e));
    });

    // Special instructions
    if (this.elements.instructionsField) {
      this.elements.instructionsField.addEventListener('input', (e) => {
        this.handleInstructionsChange(e);
      });

      // Also handle paste events
      this.elements.instructionsField.addEventListener('paste', (e) => {
        setTimeout(() => this.handleInstructionsChange(e), 0);
      });
    }

    // Submit button
    if (this.elements.submitButton) {
      this.elements.submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleAddToCart();
      });
    }
  }

  /**
   * Handle size selection change
   */
  handleSizeChange(event) {
    const sizeOption = event.target;

    this.modifiers.size = {
      id: sizeOption.value,
      name: sizeOption.dataset.name,
      nameEn: sizeOption.dataset.nameEn || sizeOption.dataset.name,
      price: parseFloat(sizeOption.dataset.price) || 0
    };

    this.saveState();
    this.updatePrice();
    this.triggerEvent('modifiers:size-changed', { size: this.modifiers.size });
  }

  /**
   * Handle extra (add-on) selection change
   */
  handleExtraChange(event) {
    const extraOption = event.target;
    const extraData = {
      id: extraOption.value,
      name: extraOption.dataset.name,
      nameEn: extraOption.dataset.nameEn || extraOption.dataset.name,
      price: parseFloat(extraOption.dataset.price) || 0
    };

    if (extraOption.checked) {
      // Add extra
      this.modifiers.extras.push(extraData);
    } else {
      // Remove extra
      this.modifiers.extras = this.modifiers.extras.filter(
        e => e.id !== extraData.id
      );
    }

    this.saveState();
    this.updatePrice();
    this.triggerEvent('modifiers:extra-changed', {
      extra: extraData,
      added: extraOption.checked
    });
  }

  /**
   * Handle modification selection change
   */
  handleModificationChange(event) {
    const modOption = event.target;
    const modData = {
      id: modOption.value,
      name: modOption.dataset.name,
      nameEn: modOption.dataset.nameEn || modOption.dataset.name,
      price: 0  // Modifications are typically free
    };

    if (modOption.checked) {
      this.modifiers.modifications.push(modData);
    } else {
      this.modifiers.modifications = this.modifiers.modifications.filter(
        m => m.id !== modData.id
      );
    }

    this.saveState();
    this.triggerEvent('modifiers:modification-changed', {
      modification: modData,
      added: modOption.checked
    });
  }

  /**
   * Handle special instructions input
   */
  handleInstructionsChange(event) {
    const maxLength = this.config.maxInstructionsLength;
    let value = event.target.value;

    // Enforce max length
    if (value.length > maxLength) {
      value = value.substring(0, maxLength);
      event.target.value = value;
    }

    this.modifiers.specialInstructions = value;

    // Update character counter
    if (this.elements.charCounter) {
      this.elements.charCounter.textContent = `${value.length}/${maxLength}`;

      // Visual feedback when approaching limit
      if (value.length > maxLength * 0.9) {
        this.elements.charCounter.classList.add('text-amber-600', 'font-semibold');
      } else {
        this.elements.charCounter.classList.remove('text-amber-600', 'font-semibold');
      }
    }

    this.saveState();
    this.triggerEvent('modifiers:instructions-changed', { instructions: value });
  }

  /**
   * Calculate total price with all modifiers
   */
  calculateTotal() {
    let total = this.basePrice;

    // Add size price
    if (this.modifiers.size) {
      total += this.modifiers.size.price;
    }

    // Add extras prices
    this.modifiers.extras.forEach(extra => {
      total += extra.price;
    });

    // Modifications don't affect price (usually)
    // But we keep the structure for flexibility

    return total;
  }

  /**
   * Update price display with animation
   */
  updatePrice() {
    if (!this.elements.totalPriceDisplay) return;

    const total = this.calculateTotal();
    const formattedPrice = this.formatPrice(total);

    // Add animation class
    this.elements.totalPriceDisplay.classList.add('price-updating');

    // Update display
    setTimeout(() => {
      this.elements.totalPriceDisplay.textContent = formattedPrice;
      this.elements.totalPriceDisplay.classList.remove('price-updating');
      this.elements.totalPriceDisplay.classList.add('price-changed');

      setTimeout(() => {
        this.elements.totalPriceDisplay.classList.remove('price-changed');
      }, 300);
    }, 100);

    // Trigger event
    this.triggerEvent('modifiers:price-updated', {
      total,
      formatted: formattedPrice
    });
  }

  /**
   * Format price according to locale
   */
  formatPrice(price) {
    const locale = document.documentElement.lang === 'ar' ? 'ar-SA' : 'en-US';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price);
  }

  /**
   * Validate current selection
   */
  validate() {
    const errors = [];

    // Check required size selection
    const sizeRequired = this.product.dataset.sizeRequired === 'true';
    if (sizeRequired && !this.modifiers.size) {
      errors.push({
        field: 'size',
        type: 'required',
        message: salla.lang.get('restaurant.errors.required_modifier', {
          modifier: salla.lang.get('restaurant.modifiers.size')
        })
      });
    }

    // Check required extras (if any)
    const requiredExtras = Array.from(this.elements.extraCheckboxes)
      .filter(checkbox => checkbox.dataset.required === 'true')
      .filter(checkbox => !checkbox.checked);

    requiredExtras.forEach(extra => {
      errors.push({
        field: 'extra',
        type: 'required',
        message: salla.lang.get('restaurant.errors.required_modifier', {
          modifier: extra.dataset.name
        })
      });
    });

    // Check instructions length (redundant check)
    if (this.modifiers.specialInstructions.length > this.config.maxInstructionsLength) {
      errors.push({
        field: 'instructions',
        type: 'max_length',
        message: 'Special instructions too long'
      });
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Get modifiers formatted for Salla cart
   */
  getModifiersForCart() {
    const options = [];
    const locale = document.documentElement.lang;

    // Size
    if (this.modifiers.size) {
      options.push({
        id: this.modifiers.size.id,
        name: salla.lang.get('restaurant.modifiers.size'),
        value: locale === 'ar' ? this.modifiers.size.name : this.modifiers.size.nameEn,
        price: this.modifiers.size.price
      });
    }

    // Extras
    if (this.modifiers.extras.length > 0) {
      this.modifiers.extras.forEach(extra => {
        options.push({
          id: extra.id,
          name: locale === 'ar' ? extra.name : extra.nameEn,
          value: salla.lang.get('restaurant.modifiers.extras'),
          price: extra.price
        });
      });
    }

    // Modifications
    if (this.modifiers.modifications.length > 0) {
      const modsText = this.modifiers.modifications
        .map(m => locale === 'ar' ? m.name : m.nameEn)
        .join(', ');

      options.push({
        name: salla.lang.get('restaurant.modifiers.modifications'),
        value: modsText,
        price: 0
      });
    }

    // Special instructions
    if (this.modifiers.specialInstructions) {
      options.push({
        name: salla.lang.get('restaurant.modifiers.special_requests'),
        value: this.modifiers.specialInstructions,
        price: 0
      });
    }

    return options;
  }

  /**
   * Handle add to cart action
   */
  async handleAddToCart() {
    // Validate
    const validation = this.validate();
    if (!validation.valid) {
      // Show first error
      salla.notify.error(validation.errors[0].message);

      // Focus on problematic field
      this.focusErrorField(validation.errors[0].field);
      return;
    }

    // Disable button
    if (this.elements.submitButton) {
      this.elements.submitButton.disabled = true;
      this.elements.submitButton.classList.add('opacity-50', 'cursor-not-allowed');
    }

    try {
      // Prepare cart item data
      const cartData = {
        id: this.productId,
        quantity: 1,
        options: this.getModifiersForCart()
      };

      // Add to cart via Salla API
      const response = await salla.cart.addItem(cartData);

      // Success
      salla.notify.success(salla.lang.get('product.added_to_cart'));

      // Clear saved state
      this.clearState();

      // Trigger event
      this.triggerEvent('modifiers:added-to-cart', {
        cartData,
        response
      });

      // Optional: Close modal or redirect
      this.handlePostAddAction();

    } catch (error) {
      console.error('Add to cart error:', error);
      salla.notify.error(error.message || salla.lang.get('common.error_occurred'));
    } finally {
      // Re-enable button
      if (this.elements.submitButton) {
        this.elements.submitButton.disabled = false;
        this.elements.submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    }
  }

  /**
   * Focus on field with error
   */
  focusErrorField(field) {
    switch(field) {
      case 'size':
        if (this.elements.sizeRadios.length > 0) {
          this.elements.sizeRadios[0].closest('.size-options')?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
        break;
      case 'extra':
        if (this.elements.extraCheckboxes.length > 0) {
          this.elements.extraCheckboxes[0].closest('.extras-options')?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
        break;
      case 'instructions':
        this.elements.instructionsField?.focus();
        break;
    }
  }

  /**
   * Handle post-add-to-cart action
   */
  handlePostAddAction() {
    // Check if we're in a modal
    const modal = this.product.closest('[data-modal]');
    if (modal) {
      // Close modal (assuming you have a close function)
      if (typeof modal.close === 'function') {
        setTimeout(() => modal.close(), 500);
      }
    }

    // Or redirect to cart (optional)
    // window.location.href = salla.url.get('cart');
  }

  /**
   * Save current state to sessionStorage
   */
  saveState() {
    try {
      sessionStorage.setItem(
        `modifiers_${this.productId}`,
        JSON.stringify(this.modifiers)
      );
    } catch (e) {
      console.warn('Could not save modifiers state:', e);
    }
  }

  /**
   * Load saved state from sessionStorage
   */
  loadSavedState() {
    try {
      const saved = sessionStorage.getItem(`modifiers_${this.productId}`);
      if (saved) {
        const state = JSON.parse(saved);

        // Restore size
        if (state.size) {
          const sizeRadio = Array.from(this.elements.sizeRadios)
            .find(r => r.value === state.size.id);
          if (sizeRadio) {
            sizeRadio.checked = true;
            this.modifiers.size = state.size;
          }
        }

        // Restore extras
        state.extras.forEach(extra => {
          const checkbox = Array.from(this.elements.extraCheckboxes)
            .find(c => c.value === extra.id);
          if (checkbox) {
            checkbox.checked = true;
            this.modifiers.extras.push(extra);
          }
        });

        // Restore modifications
        state.modifications.forEach(mod => {
          const checkbox = Array.from(this.elements.modificationCheckboxes)
            .find(c => c.value === mod.id);
          if (checkbox) {
            checkbox.checked = true;
            this.modifiers.modifications.push(mod);
          }
        });

        // Restore instructions
        if (state.specialInstructions && this.elements.instructionsField) {
          this.elements.instructionsField.value = state.specialInstructions;
          this.modifiers.specialInstructions = state.specialInstructions;

          // Update counter
          if (this.elements.charCounter) {
            this.elements.charCounter.textContent =
              `${state.specialInstructions.length}/${this.config.maxInstructionsLength}`;
          }
        }
      }
    } catch (e) {
      console.warn('Could not load modifiers state:', e);
    }
  }

  /**
   * Clear saved state
   */
  clearState() {
    try {
      sessionStorage.removeItem(`modifiers_${this.productId}`);
    } catch (e) {
      console.warn('Could not clear modifiers state:', e);
    }
  }

  /**
   * Trigger custom event
   */
  triggerEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      detail: {
        ...detail,
        modifiers: this.modifiers,
        total: this.calculateTotal()
      },
      bubbles: true
    });
    this.product.dispatchEvent(event);
  }

  /**
   * Reset all selections
   */
  reset() {
    // Uncheck all radios and checkboxes
    this.elements.sizeRadios.forEach(r => r.checked = false);
    this.elements.extraCheckboxes.forEach(c => c.checked = false);
    this.elements.modificationCheckboxes.forEach(c => c.checked = false);

    // Clear instructions
    if (this.elements.instructionsField) {
      this.elements.instructionsField.value = '';
    }

    // Reset state
    this.modifiers = {
      size: null,
      extras: [],
      modifications: [],
      specialInstructions: ''
    };

    // Clear saved state
    this.clearState();

    // Update UI
    this.updatePrice();

    if (this.elements.charCounter) {
      this.elements.charCounter.textContent = `0/${this.config.maxInstructionsLength}`;
    }

    this.triggerEvent('modifiers:reset');
  }

  /**
   * Destroy instance and cleanup
   */
  destroy() {
    // Remove event listeners
    this.elements.sizeRadios.forEach(radio => {
      radio.removeEventListener('change', this.handleSizeChange);
    });

    this.elements.extraCheckboxes.forEach(checkbox => {
      checkbox.removeEventListener('change', this.handleExtraChange);
    });

    this.elements.modificationCheckboxes.forEach(checkbox => {
      checkbox.removeEventListener('change', this.handleModificationChange);
    });

    if (this.elements.instructionsField) {
      this.elements.instructionsField.removeEventListener('input', this.handleInstructionsChange);
      this.elements.instructionsField.removeEventListener('paste', this.handleInstructionsChange);
    }

    if (this.elements.submitButton) {
      this.elements.submitButton.removeEventListener('click', this.handleAddToCart);
    }

    // Clear reference
    delete this.product.modifiersSystem;

    this.triggerEvent('modifiers:destroyed');
  }
}

// Auto-initialize on product pages
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-product-modifiers]').forEach(product => {
      new ModifiersSystem(product);
    });
  });

  // Also handle dynamically added products (e.g., quick view modals)
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            if (node.matches('[data-product-modifiers]')) {
              new ModifiersSystem(node);
            }
            // Check children
            node.querySelectorAll?.('[data-product-modifiers]').forEach(product => {
              new ModifiersSystem(product);
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

export default ModifiersSystem;

/**
 * Sufrah Delivery Zones System
 * Manages delivery zone selection, validation, and shipping calculation
 * @version 1.0.0
 */

import sufrahSettings from '../helpers/settings.js';

export class DeliveryZonesSystem {
  constructor(containerElement = null) {
    this.container = containerElement || document.querySelector('[data-delivery-zones]');

    if (!this.container) {
      console.warn('DeliveryZonesSystem: Container not found');
      return;
    }

    // State
    this.zones = [];
    this.selectedZone = null;
    this.cartTotal = 0;
    this.cartItems = [];

    // Cache DOM elements
    this.elements = {};

    this.init();
  }

  /**
   * Initialize the delivery zones system
   */
  async init() {
    await this.loadZones();
    this.cacheElements();
    this.bindEvents();
    this.updateCartTotal();
    this.renderZoneOptions();

    // Attach to container for external access
    this.container.deliveryZones = this;

    this.triggerEvent('zones:ready');
  }

  /**
   * Load zones from settings
   */
  async loadZones() {
    try {
      this.zones = sufrahSettings.get('delivery_zones', []);

      // Filter only enabled zones
      this.zones = this.zones.filter(zone => zone.enabled !== false);

      // Sort by price (optional)
      this.zones.sort((a, b) => a.price - b.price);

    } catch (error) {
      console.error('Failed to load delivery zones:', error);
      this.zones = [];
    }
  }

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.elements = {
      selector: this.container.querySelector('[data-zone-selector]'),
      details: this.container.querySelector('[data-zone-details]'),
      deliveryFee: this.container.querySelector('[data-delivery-fee]'),
      minOrder: this.container.querySelector('[data-min-order]'),
      estimatedTime: this.container.querySelector('[data-delivery-time]'),
      warning: this.container.querySelector('[data-zone-warning]'),
      map: this.container.querySelector('[data-zone-map]')
    };
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Zone selector change
    if (this.elements.selector) {
      this.elements.selector.addEventListener('change', (e) => {
        this.selectZone(e.target.value);
      });
    }

    // Listen to Salla cart updates
    if (typeof salla !== 'undefined') {
      salla.event.on('cart::updated', (data) => {
        this.cartTotal = data.total || 0;
        this.cartItems = data.items || [];
        this.validateSelectedZone();
      });

      // Initial cart fetch
      this.fetchCartData();
    }

    // Listen for address changes (if applicable)
    document.addEventListener('checkout:address-changed', (e) => {
      this.suggestZoneFromAddress(e.detail.address);
    });
  }

  /**
   * Fetch current cart data
   */
  async fetchCartData() {
    try {
      const cart = await salla.cart.getItems();
      this.cartTotal = cart.total || 0;
      this.cartItems = cart.items || [];
    } catch (error) {
      console.warn('Could not fetch cart data:', error);
    }
  }

  /**
   * Update cart total from current state
   */
  async updateCartTotal() {
    await this.fetchCartData();
  }

  /**
   * Render zone options in selector
   */
  renderZoneOptions() {
    if (!this.elements.selector) return;

    // Clear existing options except the first (placeholder)
    const placeholder = this.elements.selector.querySelector('option[value=""]');
    this.elements.selector.innerHTML = '';
    if (placeholder) {
      this.elements.selector.appendChild(placeholder);
    } else {
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = salla.lang.get('restaurant.select_zone');
      this.elements.selector.appendChild(defaultOption);
    }

    // Add zone options
    this.zones.forEach(zone => {
      const option = document.createElement('option');
      option.value = zone.id;
      option.dataset.price = zone.price;
      option.dataset.minOrder = zone.min_order;
      option.dataset.estimatedTime = zone.estimated_time;

      const locale = document.documentElement.lang;
      const zoneName = locale === 'ar' ? zone.name : (zone.name_en || zone.name);

      option.textContent = `${zoneName} - ${zone.price} ${salla.lang.get('common.currency')} (${zone.estimated_time})`;

      this.elements.selector.appendChild(option);
    });

    // Try to restore previously selected zone
    this.restoreSelection();
  }

  /**
   * Select a delivery zone
   */
  selectZone(zoneId) {
    if (!zoneId) {
      this.selectedZone = null;
      this.updateUI();
      this.saveSelection();
      return;
    }

    const zone = this.zones.find(z => z.id === zoneId);

    if (!zone) {
      salla.notify.error(
        salla.lang.get('restaurant.errors.zone_not_found')
      );
      return;
    }

    this.selectedZone = zone;
    this.validateSelectedZone();
    this.updateUI();
    this.saveSelection();

    this.triggerEvent('zones:selected', { zone });
  }

  /**
   * Validate selected zone against cart total
   */
  validateSelectedZone() {
    if (!this.selectedZone) return true;

    const validation = this.validateZone(this.selectedZone.id, this.cartTotal);

    if (!validation.valid) {
      this.showValidationError(validation);
      this.updateShipping(0); // Remove shipping if invalid
      return false;
    }

    // Valid - update shipping
    this.updateShipping(this.selectedZone.price);
    this.hideWarning();
    return true;
  }

  /**
   * Validate a specific zone
   */
  validateZone(zoneId, cartTotal) {
    const zone = this.zones.find(z => z.id === zoneId);

    if (!zone) {
      return { valid: false, error: 'zone_not_found' };
    }

    if (!zone.enabled) {
      return { valid: false, error: 'zone_disabled' };
    }

    if (cartTotal < zone.min_order) {
      return {
        valid: false,
        error: 'min_order_not_met',
        required: zone.min_order,
        current: cartTotal,
        difference: zone.min_order - cartTotal
      };
    }

    return { valid: true, zone };
  }

  /**
   * Show validation error to user
   */
  showValidationError(validation) {
    if (!this.elements.warning) return;

    let message = '';

    switch (validation.error) {
      case 'min_order_not_met':
        message = salla.lang.get('restaurant.errors.min_order_not_met', {
          required: this.formatPrice(validation.required),
          difference: this.formatPrice(validation.difference)
        });
        break;

      case 'zone_disabled':
        message = salla.lang.get('restaurant.errors.zone_disabled');
        break;

      case 'zone_not_found':
        message = salla.lang.get('restaurant.errors.zone_not_found');
        break;

      default:
        message = salla.lang.get('restaurant.errors.delivery_unavailable');
    }

    this.elements.warning.innerHTML = `
      <div class="flex items-start gap-3">
        <i class="sicon-alert-triangle text-amber-500 text-xl flex-shrink-0"></i>
        <p class="text-sm text-amber-800">${message}</p>
      </div>
    `;
    this.elements.warning.classList.remove('hidden');

    // Also show as notification
    if (validation.error === 'min_order_not_met') {
      salla.notify.warning(message, {
        duration: 5000,
        action: {
          label: salla.lang.get('common.continue_shopping'),
          onClick: () => window.location.href = salla.url.get('products')
        }
      });
    }
  }

  /**
   * Hide warning message
   */
  hideWarning() {
    if (this.elements.warning) {
      this.elements.warning.classList.add('hidden');
    }
  }

  /**
   * Update shipping cost in Salla cart
   */
  async updateShipping(price) {
    try {
      // Update via Salla API
      await salla.cart.updateShipping({
        cost: price,
        method: this.selectedZone ? this.selectedZone.name : 'Standard'
      });

      this.triggerEvent('zones:shipping-updated', { price });

    } catch (error) {
      console.error('Failed to update shipping:', error);
      salla.notify.error(
        salla.lang.get('common.error_occurred')
      );
    }
  }

  /**
   * Update UI with selected zone details
   */
  updateUI() {
    if (!this.selectedZone) {
      // Hide details
      if (this.elements.details) {
        this.elements.details.classList.add('hidden');
      }
      return;
    }

    // Show details
    if (this.elements.details) {
      this.elements.details.classList.remove('hidden');
    }

    // Update delivery fee
    if (this.elements.deliveryFee) {
      this.elements.deliveryFee.textContent =
        this.formatPrice(this.selectedZone.price);
    }

    // Update min order
    if (this.elements.minOrder) {
      this.elements.minOrder.textContent =
        this.formatPrice(this.selectedZone.min_order);
    }

    // Update estimated time
    if (this.elements.estimatedTime) {
      this.elements.estimatedTime.textContent =
        this.selectedZone.estimated_time;
    }

    // Update map (if exists)
    if (this.elements.map && this.selectedZone.coordinates) {
      this.updateMap(this.selectedZone.coordinates);
    }
  }

  /**
   * Update map with zone coverage (placeholder)
   */
  updateMap(coordinates) {
    // This would integrate with Google Maps or similar
    // For now, just a placeholder
    console.log('Update map with coordinates:', coordinates);
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
   * Save selection to localStorage
   */
  saveSelection() {
    try {
      if (this.selectedZone) {
        localStorage.setItem('sufrah_selected_zone', this.selectedZone.id);
      } else {
        localStorage.removeItem('sufrah_selected_zone');
      }
    } catch (e) {
      console.warn('Could not save zone selection:', e);
    }
  }

  /**
   * Restore previously selected zone
   */
  restoreSelection() {
    try {
      const savedZoneId = localStorage.getItem('sufrah_selected_zone');
      if (savedZoneId && this.zones.find(z => z.id === savedZoneId)) {
        if (this.elements.selector) {
          this.elements.selector.value = savedZoneId;
        }
        this.selectZone(savedZoneId);
      }
    } catch (e) {
      console.warn('Could not restore zone selection:', e);
    }
  }

  /**
   * Suggest zone based on address (smart suggestion)
   */
  suggestZoneFromAddress(address) {
    // This would use address matching logic
    // For now, just a placeholder
    console.log('Suggest zone from address:', address);

    // Example: Match by district name
    const matchedZone = this.zones.find(zone => {
      return zone.coverage_areas?.some(area =>
        address.district?.includes(area) ||
        address.city?.includes(area)
      );
    });

    if (matchedZone) {
      if (this.elements.selector) {
        this.elements.selector.value = matchedZone.id;
      }
      this.selectZone(matchedZone.id);

      salla.notify.info(
        salla.lang.get('restaurant.zone_suggested', {
          zone: matchedZone.name
        })
      );
    }
  }

  /**
   * Get zones for a dropdown/select
   */
  getZonesForSelect() {
    const locale = document.documentElement.lang;

    return this.zones.map(zone => ({
      value: zone.id,
      label: locale === 'ar' ? zone.name : (zone.name_en || zone.name),
      price: zone.price,
      minOrder: zone.min_order,
      estimatedTime: zone.estimated_time
    }));
  }

  /**
   * Check if delivery is available to a specific area
   */
  isDeliveryAvailable(area) {
    return this.zones.some(zone =>
      zone.coverage_areas?.some(coverage =>
        coverage.toLowerCase().includes(area.toLowerCase())
      )
    );
  }

  /**
   * Get cheapest zone
   */
  getCheapestZone() {
    if (this.zones.length === 0) return null;
    return this.zones.reduce((min, zone) =>
      zone.price < min.price ? zone : min
    );
  }

  /**
   * Get fastest zone
   */
  getFastestZone() {
    if (this.zones.length === 0) return null;

    return this.zones.reduce((fastest, zone) => {
      const fastestTime = this.parseEstimatedTime(fastest.estimated_time);
      const zoneTime = this.parseEstimatedTime(zone.estimated_time);
      return zoneTime < fastestTime ? zone : fastest;
    });
  }

  /**
   * Parse estimated time to minutes (for comparison)
   */
  parseEstimatedTime(timeString) {
    // Parse "30-45 دقيقة" or "30-45 minutes" to average
    const match = timeString.match(/(\d+)-(\d+)/);
    if (match) {
      return (parseInt(match[1]) + parseInt(match[2])) / 2;
    }
    return 999; // Default high value
  }

  /**
   * Trigger custom event
   */
  triggerEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      detail: {
        ...detail,
        selectedZone: this.selectedZone,
        cartTotal: this.cartTotal
      },
      bubbles: true
    });
    this.container.dispatchEvent(event);
  }

  /**
   * Reset selection
   */
  reset() {
    this.selectedZone = null;

    if (this.elements.selector) {
      this.elements.selector.value = '';
    }

    this.updateUI();
    this.saveSelection();
    this.updateShipping(0);
    this.hideWarning();

    this.triggerEvent('zones:reset');
  }

  /**
   * Destroy instance
   */
  destroy() {
    if (this.elements.selector) {
      this.elements.selector.removeEventListener('change', this.selectZone);
    }

    delete this.container.deliveryZones;

    this.triggerEvent('zones:destroyed');
  }
}

// Auto-initialize
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-delivery-zones]').forEach(container => {
      new DeliveryZonesSystem(container);
    });
  });
}

export default DeliveryZonesSystem;

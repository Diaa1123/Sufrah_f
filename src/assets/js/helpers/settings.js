/**
 * Sufrah Settings Manager
 * Central settings management for the restaurant theme
 *
 * @version 1.0.0
 * @author Diaa
 */

class SufrahSettings {
  constructor() {
    this.settings = null;
    this.loaded = false;
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Load settings from Salla or fallback to defaults
   * @returns {Promise<Object>} Settings object
   */
  async load() {
    try {
      // Check if Salla config is available
      if (typeof salla !== 'undefined' && salla.config) {
        this.settings = this.parseSallaSettings();
      } else {
        // Load from local settings file (development/fallback)
        this.settings = await this.loadDefaultSettings();
      }

      this.loaded = true;
      this.dispatchEvent('settings:loaded', this.settings);
      return this.settings;
    } catch (error) {
      console.error('[Sufrah Settings] Failed to load settings:', error);
      this.settings = await this.loadDefaultSettings();
      this.loaded = true;
      return this.settings;
    }
  }

  /**
   * Parse settings from Salla configuration
   * @returns {Object} Parsed settings
   */
  parseSallaSettings() {
    const settings = {
      restaurant: this.parseRestaurantInfo(),
      business_hours: this.parseBusinessHours(),
      delivery_zones: this.parseDeliveryZones(),
      scheduling: this.parseScheduling(),
      modifiers: this.parseModifiers(),
      appearance: this.parseAppearance(),
      notifications: this.parseNotifications(),
      features: this.parseFeatures(),
      payment: this.parsePayment(),
      integrations: this.parseIntegrations()
    };

    return settings;
  }

  /**
   * Parse restaurant basic information
   * @returns {Object} Restaurant info
   */
  parseRestaurantInfo() {
    return {
      name: salla.config.get('store.name'),
      name_en: salla.config.get('store.name_en'),
      description: salla.config.get('store.description'),
      phone: salla.config.get('store.phone'),
      email: salla.config.get('store.email'),
      address: salla.config.get('store.address'),
      coordinates: {
        lat: parseFloat(salla.config.get('store.latitude')) || 0,
        lng: parseFloat(salla.config.get('store.longitude')) || 0
      }
    };
  }

  /**
   * Parse business hours from twilight.json settings
   * @returns {Object} Business hours configuration
   */
  parseBusinessHours() {
    const days = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const hoursConfig = {};

    days.forEach(day => {
      const daySettings = salla.config.get(`business_hours.${day}`) || {};
      hoursConfig[day] = {
        enabled: daySettings.enabled !== false,
        open: daySettings.open || '09:00',
        close: daySettings.close || '23:00',
        breaks: daySettings.breaks || []
      };
    });

    return {
      timezone: salla.config.get('business_hours.timezone') || 'Asia/Riyadh',
      days: hoursConfig,
      special_days: salla.config.get('business_hours.special_days') || []
    };
  }

  /**
   * Parse delivery zones configuration
   * @returns {Array} Delivery zones
   */
  parseDeliveryZones() {
    const zones = salla.config.get('delivery_zones') || [];

    return zones.map((zone, index) => ({
      id: zone.id || `zone-${index + 1}`,
      name: zone.name || `منطقة ${index + 1}`,
      name_en: zone.name_en || `Zone ${index + 1}`,
      price: parseFloat(zone.price) || 0,
      min_order: parseFloat(zone.min_order) || 0,
      free_delivery_threshold: parseFloat(zone.free_delivery_threshold) || 0,
      estimated_time: zone.estimated_time || '30-45 دقيقة',
      estimated_time_min: parseInt(zone.estimated_time_min) || 30,
      estimated_time_max: parseInt(zone.estimated_time_max) || 45,
      enabled: zone.enabled !== false
    }));
  }

  /**
   * Parse scheduling settings
   * @returns {Object} Scheduling configuration
   */
  parseScheduling() {
    return {
      enabled: salla.config.get('enable_scheduling') !== false,
      min_advance_hours: parseInt(salla.config.get('min_advance_hours')) || 2,
      max_advance_days: parseInt(salla.config.get('max_advance_days')) || 7,
      slot_interval_minutes: parseInt(salla.config.get('slot_interval_minutes')) || 30,
      buffer_time_minutes: parseInt(salla.config.get('buffer_time_minutes')) || 15,
      blackout_dates: salla.config.get('blackout_dates') || [],
      same_day_cutoff_time: salla.config.get('same_day_cutoff_time') || '21:00'
    };
  }

  /**
   * Parse modifiers settings
   * @returns {Object} Modifiers configuration
   */
  parseModifiers() {
    return {
      show_calories: salla.config.get('show_calories') !== false,
      show_ingredients: salla.config.get('show_ingredients') !== false,
      show_allergens: salla.config.get('show_allergens') !== false,
      show_prep_time: salla.config.get('show_prep_time') !== false,
      allow_special_instructions: salla.config.get('enable_special_instructions') !== false,
      max_instructions_length: parseInt(salla.config.get('special_instructions_max_chars')) || 200,
      spice_levels: salla.config.get('spice_levels') || []
    };
  }

  /**
   * Parse appearance settings
   * @returns {Object} Appearance configuration
   */
  parseAppearance() {
    return {
      primary_color: salla.config.get('restaurant_primary_color') || '#D97706',
      secondary_color: salla.config.get('restaurant_secondary_color') || '#059669',
      logo_url: salla.config.get('logo_url') || '',
      hero_image_url: salla.config.get('hero_image_url') || ''
    };
  }

  /**
   * Parse notification settings
   * @returns {Object} Notifications configuration
   */
  parseNotifications() {
    return {
      order_placed: {
        customer: true,
        admin: true,
        whatsapp: false
      },
      order_confirmed: { customer: true },
      order_ready: { customer: true, whatsapp: true },
      order_out_for_delivery: { customer: true },
      order_delivered: { customer: true }
    };
  }

  /**
   * Parse features settings
   * @returns {Object} Features configuration
   */
  parseFeatures() {
    return {
      loyalty_program: salla.config.get('loyalty_program') === true,
      gift_cards: salla.config.get('gift_cards') === true,
      table_reservations: salla.config.get('table_reservations') === true,
      catering: salla.config.get('catering') === true,
      pickup: salla.config.get('pickup') !== false,
      dine_in: salla.config.get('dine_in') === true
    };
  }

  /**
   * Parse payment settings
   * @returns {Object} Payment configuration
   */
  parsePayment() {
    return {
      currency: salla.config.get('currency') || 'SAR',
      tax_rate: parseFloat(salla.config.get('tax_rate')) || 15,
      min_order_amount: parseFloat(salla.config.get('min_order_amount')) || 0,
      service_fee: parseFloat(salla.config.get('service_fee')) || 0,
      service_fee_percentage: parseFloat(salla.config.get('service_fee_percentage')) || 0
    };
  }

  /**
   * Parse integrations settings
   * @returns {Object} Integrations configuration
   */
  parseIntegrations() {
    return {
      google_analytics: {
        enabled: salla.config.get('google_analytics.enabled') === true,
        tracking_id: salla.config.get('google_analytics.tracking_id') || ''
      },
      facebook_pixel: {
        enabled: salla.config.get('facebook_pixel.enabled') === true,
        pixel_id: salla.config.get('facebook_pixel.pixel_id') || ''
      }
    };
  }

  /**
   * Load default settings as fallback
   * @returns {Promise<Object>} Default settings
   */
  async loadDefaultSettings() {
    // In production, this could load from a JSON file
    // For now, return sensible defaults
    return {
      restaurant: {
        name: 'مطعمي',
        name_en: 'My Restaurant',
        phone: '+966501234567',
        email: 'info@restaurant.sa'
      },
      business_hours: {
        timezone: 'Asia/Riyadh',
        days: {
          saturday: { enabled: true, open: '09:00', close: '23:00', breaks: [] },
          sunday: { enabled: true, open: '09:00', close: '23:00', breaks: [] },
          monday: { enabled: true, open: '09:00', close: '23:00', breaks: [] },
          tuesday: { enabled: true, open: '09:00', close: '23:00', breaks: [] },
          wednesday: { enabled: true, open: '09:00', close: '23:00', breaks: [] },
          thursday: { enabled: true, open: '09:00', close: '23:00', breaks: [] },
          friday: { enabled: true, open: '13:00', close: '23:00', breaks: [] }
        },
        special_days: []
      },
      delivery_zones: [],
      scheduling: {
        enabled: true,
        min_advance_hours: 2,
        max_advance_days: 7,
        slot_interval_minutes: 30,
        buffer_time_minutes: 15
      },
      modifiers: {
        show_calories: true,
        show_ingredients: true,
        allow_special_instructions: true,
        max_instructions_length: 200
      },
      appearance: {
        primary_color: '#D97706',
        secondary_color: '#059669'
      }
    };
  }

  /**
   * Get a specific setting value using dot notation
   * @param {string} path - Setting path (e.g., 'restaurant.name')
   * @param {*} defaultValue - Default value if not found
   * @returns {*} Setting value
   */
  get(path, defaultValue = null) {
    if (!this.loaded) {
      console.warn('[Sufrah Settings] Settings not loaded yet. Call load() first.');
      return defaultValue;
    }

    // Check cache first
    const cacheKey = `get:${path}`;
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.value;
      }
    }

    const keys = path.split('.');
    let value = this.settings;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return defaultValue;
      }
    }

    const result = value !== undefined ? value : defaultValue;

    // Cache the result
    this.cache.set(cacheKey, {
      value: result,
      timestamp: Date.now()
    });

    return result;
  }

  /**
   * Check if restaurant is currently open
   * @returns {boolean} True if open, false if closed
   */
  isOpen() {
    const now = new Date();
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const todayHours = this.get(`business_hours.days.${dayName}`);

    if (!todayHours || !todayHours.enabled) {
      return false;
    }

    // Check if within operating hours
    const isWithinHours = currentTime >= todayHours.open && currentTime < todayHours.close;

    // Check if in break period
    if (isWithinHours && todayHours.breaks && todayHours.breaks.length > 0) {
      for (const breakPeriod of todayHours.breaks) {
        if (currentTime >= breakPeriod.start && currentTime < breakPeriod.end) {
          return false; // Currently in break
        }
      }
    }

    return isWithinHours;
  }

  /**
   * Get time until opening or closing
   * @returns {Object|null} Object with {type: 'opens'|'closes', time: Date, minutes: number}
   */
  getNextTimeChange() {
    const now = new Date();
    const isCurrentlyOpen = this.isOpen();
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const todayHours = this.get(`business_hours.days.${dayName}`);

    if (!todayHours || !todayHours.enabled) {
      return this.getNextOpeningDay();
    }

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    if (isCurrentlyOpen) {
      // Find closing time
      const [closeHour, closeMin] = todayHours.close.split(':').map(Number);
      const closeMinutes = closeHour * 60 + closeMin;
      const minutesUntilClose = closeMinutes - currentMinutes;

      const closeTime = new Date(now);
      closeTime.setHours(closeHour, closeMin, 0, 0);

      return {
        type: 'closes',
        time: closeTime,
        minutes: minutesUntilClose
      };
    } else {
      // Find opening time
      const [openHour, openMin] = todayHours.open.split(':').map(Number);
      const openMinutes = openHour * 60 + openMin;

      if (currentMinutes < openMinutes) {
        // Opens today
        const minutesUntilOpen = openMinutes - currentMinutes;
        const openTime = new Date(now);
        openTime.setHours(openHour, openMin, 0, 0);

        return {
          type: 'opens',
          time: openTime,
          minutes: minutesUntilOpen
        };
      } else {
        // Opens next day
        return this.getNextOpeningDay();
      }
    }
  }

  /**
   * Get next opening day/time
   * @returns {Object|null} Opening info
   */
  getNextOpeningDay() {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const now = new Date();
    const currentDayIndex = now.getDay();

    for (let i = 1; i <= 7; i++) {
      const dayIndex = (currentDayIndex + i) % 7;
      const dayName = days[dayIndex];
      const dayHours = this.get(`business_hours.days.${dayName}`);

      if (dayHours && dayHours.enabled) {
        const [openHour, openMin] = dayHours.open.split(':').map(Number);
        const openTime = new Date(now);
        openTime.setDate(now.getDate() + i);
        openTime.setHours(openHour, openMin, 0, 0);

        const minutesUntilOpen = Math.floor((openTime - now) / 60000);

        return {
          type: 'opens',
          time: openTime,
          minutes: minutesUntilOpen,
          day: dayName
        };
      }
    }

    return null; // Restaurant never opens (all days disabled)
  }

  /**
   * Get delivery zone by ID
   * @param {string} zoneId - Zone identifier
   * @returns {Object|null} Delivery zone object or null
   */
  getDeliveryZone(zoneId) {
    const zones = this.get('delivery_zones', []);
    return zones.find(z => z.id === zoneId) || null;
  }

  /**
   * Validate delivery zone selection against cart total
   * @param {string} zoneId - Zone identifier
   * @param {number} cartTotal - Cart total amount
   * @returns {Object} Validation result
   */
  validateDeliveryZone(zoneId, cartTotal) {
    const zone = this.getDeliveryZone(zoneId);

    if (!zone) {
      return {
        valid: false,
        error: 'zone_not_found',
        message: 'المنطقة غير موجودة'
      };
    }

    if (!zone.enabled) {
      return {
        valid: false,
        error: 'zone_disabled',
        message: 'المنطقة غير متاحة حالياً'
      };
    }

    if (cartTotal < zone.min_order) {
      return {
        valid: false,
        error: 'min_order_not_met',
        message: `الحد الأدنى للطلب ${zone.min_order} ر.س`,
        required: zone.min_order,
        current: cartTotal,
        difference: zone.min_order - cartTotal
      };
    }

    return {
      valid: true,
      zone,
      delivery_fee: cartTotal >= (zone.free_delivery_threshold || Infinity) ? 0 : zone.price
    };
  }

  /**
   * Check if a date/time is available for scheduling
   * @param {Date} datetime - Desired datetime
   * @returns {boolean} True if available
   */
  isSchedulingAvailable(datetime) {
    const scheduling = this.get('scheduling');

    if (!scheduling.enabled) {
      return false;
    }

    const now = new Date();
    const minTime = new Date(now.getTime() + scheduling.min_advance_hours * 60 * 60 * 1000);
    const maxTime = new Date(now.getTime() + scheduling.max_advance_days * 24 * 60 * 60 * 1000);

    if (datetime < minTime || datetime > maxTime) {
      return false;
    }

    // Check blackout dates
    const dateStr = datetime.toISOString().split('T')[0];
    if (scheduling.blackout_dates.includes(dateStr)) {
      return false;
    }

    // Check business hours
    const dayName = datetime.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const dayHours = this.get(`business_hours.days.${dayName}`);

    if (!dayHours || !dayHours.enabled) {
      return false;
    }

    const timeStr = `${String(datetime.getHours()).padStart(2, '0')}:${String(datetime.getMinutes()).padStart(2, '0')}`;
    return timeStr >= dayHours.open && timeStr < dayHours.close;
  }

  /**
   * Dispatch custom event
   * @param {string} eventName - Event name
   * @param {*} detail - Event detail data
   */
  dispatchEvent(eventName, detail) {
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent(eventName, { detail }));
    }
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }
}

// Export singleton instance
const sufrahSettings = new SufrahSettings();

// Auto-load on DOM ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      sufrahSettings.load();
    });
  } else {
    // DOM already loaded
    sufrahSettings.load();
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = sufrahSettings;
}

export default sufrahSettings;

/**
 * Sufrah Business Hours System
 * Manages restaurant operating hours and open/closed status
 * @version 2.0.0
 */

import sufrahSettings from '../helpers/settings.js';

export class BusinessHours {
  constructor() {
    this.hours = this.loadBusinessHours();
    this.timezone = sufrahSettings.get('business_hours.timezone', 'Asia/Riyadh');

    // Cache for performance
    this._isOpenCache = null;
    this._cacheTimestamp = null;
    this._cacheTTL = 60000; // 1 minute cache
  }

  /**
   * Load business hours from settings
   */
  loadBusinessHours() {
    const defaultHours = {
      sunday: { enabled: false, open: '09:00', close: '23:00' },
      monday: { enabled: true, open: '09:00', close: '23:00' },
      tuesday: { enabled: true, open: '09:00', close: '23:00' },
      wednesday: { enabled: true, open: '09:00', close: '23:00' },
      thursday: { enabled: true, open: '09:00', close: '23:00' },
      friday: { enabled: true, open: '09:00', close: '00:00' },
      saturday: { enabled: true, open: '09:00', close: '00:00' }
    };

    return sufrahSettings.get('business_hours.schedule', defaultHours);
  }

  /**
   * Check if restaurant is currently open (with caching)
   */
  isOpen(dateTime = null) {
    // If no specific time provided, use cache for current time
    if (!dateTime) {
      if (this._isOpenCache !== null &&
          this._cacheTimestamp &&
          Date.now() - this._cacheTimestamp < this._cacheTTL) {
        return this._isOpenCache;
      }
    }

    const now = dateTime || new Date();
    const dayName = this.getDayName(now);
    const dayHours = this.hours[dayName];

    if (!dayHours || !dayHours.enabled) {
      const result = false;
      if (!dateTime) {
        this._isOpenCache = result;
        this._cacheTimestamp = Date.now();
      }
      return result;
    }

    const currentTime = this.getTimeString(now);
    const { open, close } = dayHours;

    // Handle overnight hours (e.g., open until 00:00 or later)
    let result;
    if (close < open) {
      result = currentTime >= open || currentTime < close;
    } else {
      result = currentTime >= open && currentTime < close;
    }

    // Update cache if checking current time
    if (!dateTime) {
      this._isOpenCache = result;
      this._cacheTimestamp = Date.now();
    }

    return result;
  }

  /**
   * Get hours for a specific day
   */
  getHoursForDay(dayName) {
    return this.hours[dayName.toLowerCase()] || null;
  }

  /**
   * Get next opening time
   */
  getNextOpening() {
    const now = new Date();
    let checkDate = new Date(now);

    // Check next 7 days
    for (let i = 0; i < 7; i++) {
      const dayName = this.getDayName(checkDate);
      const dayHours = this.hours[dayName];

      if (dayHours && dayHours.enabled) {
        // If checking today and already past opening
        if (i === 0) {
          const currentTime = this.getTimeString(checkDate);
          if (currentTime < dayHours.open) {
            return {
              day: this.formatDayName(dayName),
              time: dayHours.open,
              date: new Date(checkDate)
            };
          }
        } else {
          // Future day
          return {
            day: this.formatDayName(dayName),
            time: dayHours.open,
            date: new Date(checkDate)
          };
        }
      }

      // Move to next day
      checkDate.setDate(checkDate.getDate() + 1);
    }

    return null;
  }

  /**
   * Get day name from date
   */
  getDayName(date) {
    return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  }

  /**
   * Format day name for display
   */
  formatDayName(dayName) {
    const locale = document.documentElement.lang === 'ar' ? 'ar-SA' : 'en-US';
    const date = new Date();

    // Find the next occurrence of this day
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const targetDay = days.indexOf(dayName.toLowerCase());
    const currentDay = date.getDay();

    const daysUntil = (targetDay - currentDay + 7) % 7;
    date.setDate(date.getDate() + daysUntil);

    return date.toLocaleDateString(locale, { weekday: 'long' });
  }

  /**
   * Get time string in HH:MM format
   */
  getTimeString(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  /**
   * Check if a specific date/time is within business hours
   */
  isWithinBusinessHours(dateTime) {
    return this.isOpen(dateTime);
  }

  /**
   * Get all business hours
   */
  getAllHours() {
    return this.hours;
  }

  /**
   * Get formatted hours for display
   */
  getFormattedHours() {
    const formatted = {};
    const locale = document.documentElement.lang === 'ar' ? 'ar-SA' : 'en-US';

    Object.entries(this.hours).forEach(([day, hours]) => {
      formatted[day] = {
        enabled: hours.enabled,
        display: hours.enabled
          ? `${this.formatTime(hours.open, locale)} - ${this.formatTime(hours.close, locale)}`
          : salla.lang.get('restaurant.closed')
      };
    });

    return formatted;
  }

  /**
   * Format time for display
   */
  formatTime(timeString, locale = 'en-US') {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: locale === 'en-US'
    });
  }

  /**
   * Get time until closing (if currently open)
   */
  getTimeUntilClosing() {
    if (!this.isOpen()) {
      return null;
    }

    const now = new Date();
    const dayName = this.getDayName(now);
    const dayHours = this.hours[dayName];

    const [closeHour, closeMinute] = dayHours.close.split(':').map(Number);
    const closeTime = new Date(now);
    closeTime.setHours(closeHour, closeMinute, 0, 0);

    // Handle overnight closing (e.g., 00:00 = next day)
    if (closeHour < now.getHours()) {
      closeTime.setDate(closeTime.getDate() + 1);
    }

    const diffMs = closeTime - now;
    const diffMinutes = Math.floor(diffMs / 60000);

    return {
      minutes: diffMinutes,
      hours: Math.floor(diffMinutes / 60),
      formatted: this.formatDuration(diffMinutes),
      closeTime: closeTime
    };
  }

  /**
   * Format duration in human-readable format
   */
  formatDuration(minutes) {
    if (minutes < 0) return '';

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const parts = [];

    if (hours > 0) {
      parts.push(`${hours} ${salla.lang.get(hours === 1 ? 'common.hour' : 'common.hours')}`);
    }

    if (mins > 0 || hours === 0) {
      parts.push(`${mins} ${salla.lang.get(mins === 1 ? 'common.minute' : 'common.minutes')}`);
    }

    return parts.join(' ' + salla.lang.get('common.and') + ' ');
  }

  /**
   * Get all hours organized by week
   */
  getAllHoursOrganized() {
    const days = [
      'saturday', 'sunday', 'monday', 'tuesday',
      'wednesday', 'thursday', 'friday'
    ];

    const now = new Date();
    const currentDay = this.getDayName(now);

    return days.map(day => ({
      day,
      hours: this.hours[day] || { enabled: false },
      isToday: day === currentDay
    }));
  }

  /**
   * Clear cache manually
   */
  clearCache() {
    this._isOpenCache = null;
    this._cacheTimestamp = null;
  }

  /**
   * Reload hours from settings
   */
  reload() {
    this.hours = this.loadBusinessHours();
    this.clearCache();
  }
}

export default BusinessHours;

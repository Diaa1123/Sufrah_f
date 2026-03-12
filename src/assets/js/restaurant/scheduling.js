/**
 * Sufrah Order Scheduling System
 * Handles ASAP orders and scheduled future orders
 * @version 1.0.0
 */

import sufrahSettings from '../helpers/settings.js';
import BusinessHours from './business-hours.js';

export class OrderSchedulingSystem {
  constructor(containerElement = null) {
    this.container = containerElement || document.querySelector('[data-order-scheduling]');

    if (!this.container) {
      console.warn('OrderSchedulingSystem: Container not found');
      return;
    }

    // Dependencies
    this.businessHours = new BusinessHours();

    // State
    this.schedulingType = 'asap'; // 'asap' or 'scheduled'
    this.selectedDate = null;
    this.selectedTime = null;
    this.availableSlots = [];

    // Config
    this.config = {
      enabled: sufrahSettings.get('scheduling.enabled', true),
      minAdvanceHours: sufrahSettings.get('scheduling.min_advance_hours', 2),
      maxAdvanceDays: sufrahSettings.get('scheduling.max_advance_days', 7),
      slotInterval: sufrahSettings.get('scheduling.slot_interval_minutes', 30),
      bufferTime: sufrahSettings.get('scheduling.buffer_time_minutes', 15),
      timezone: sufrahSettings.get('business_hours.timezone', 'Asia/Riyadh')
    };

    // Cache DOM
    this.elements = {};

    this.init();
  }

  /**
   * Initialize scheduling system
   */
  async init() {
    if (!this.config.enabled) {
      this.container.style.display = 'none';
      return;
    }

    this.cacheElements();
    this.bindEvents();

    // Check if restaurant is open
    if (this.businessHours.isOpen()) {
      this.setSchedulingType('asap');
      this.updateASAPEstimate();
    } else {
      this.setSchedulingType('scheduled');
      this.showClosedMessage();
    }

    this.container.orderScheduling = this;
    this.triggerEvent('scheduling:ready');
  }

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.elements = {
      typeRadios: this.container.querySelectorAll('[name="scheduling_type"]'),
      asapSection: this.container.querySelector('[data-asap-section]'),
      scheduledSection: this.container.querySelector('[data-scheduled-section]'),
      datePicker: this.container.querySelector('[data-date-picker]'),
      timePicker: this.container.querySelector('[data-time-picker]'),
      asapEstimate: this.container.querySelector('[data-asap-estimate]'),
      closedMessage: this.container.querySelector('[data-closed-message]'),
      submitButton: this.container.querySelector('[data-submit-order]')
    };
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Type selection (ASAP vs Scheduled)
    this.elements.typeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.setSchedulingType(e.target.value);
      });
    });

    // Date selection
    if (this.elements.datePicker) {
      this.elements.datePicker.addEventListener('change', (e) => {
        this.selectDate(e.target.value);
      });
    }

    // Time selection
    if (this.elements.timePicker) {
      this.elements.timePicker.addEventListener('change', (e) => {
        this.selectTime(e.target.value);
      });
    }
  }

  /**
   * Set scheduling type
   */
  setSchedulingType(type) {
    this.schedulingType = type;

    if (type === 'asap') {
      // Check if open
      if (!this.businessHours.isOpen()) {
        salla.notify.warning(
          salla.lang.get('restaurant.errors.restaurant_closed')
        );
        // Force scheduled
        this.schedulingType = 'scheduled';
        const scheduledRadio = Array.from(this.elements.typeRadios)
          .find(r => r.value === 'scheduled');
        if (scheduledRadio) scheduledRadio.checked = true;
      }

      this.showASAPSection();
      this.updateASAPEstimate();
    } else {
      this.showScheduledSection();
      this.initializeDatePicker();
    }

    this.triggerEvent('scheduling:type-changed', { type });
  }

  /**
   * Show ASAP section
   */
  showASAPSection() {
    if (this.elements.asapSection) {
      this.elements.asapSection.classList.remove('hidden');
    }
    if (this.elements.scheduledSection) {
      this.elements.scheduledSection.classList.add('hidden');
    }
  }

  /**
   * Show scheduled section
   */
  showScheduledSection() {
    if (this.elements.asapSection) {
      this.elements.asapSection.classList.add('hidden');
    }
    if (this.elements.scheduledSection) {
      this.elements.scheduledSection.classList.remove('hidden');
    }
  }

  /**
   * Update ASAP delivery estimate
   */
  updateASAPEstimate() {
    if (!this.elements.asapEstimate) return;

    const prepTime = this.getAveragePreparationTime();
    const deliveryTime = this.getAverageDeliveryTime();
    const totalMinutes = prepTime + deliveryTime;

    const estimatedTime = new Date(Date.now() + totalMinutes * 60000);

    const formattedTime = this.formatTime(estimatedTime);

    this.elements.asapEstimate.innerHTML = `
      <div class="flex items-center gap-3">
        <i class="sicon-clock text-primary-600 text-2xl"></i>
        <div>
          <div class="text-sm text-gray-600">
            ${salla.lang.get('restaurant.estimated_delivery')}
          </div>
          <div class="text-xl font-bold text-gray-900">
            ${formattedTime}
          </div>
          <div class="text-xs text-gray-500">
            (~${totalMinutes} ${salla.lang.get('common.minutes')})
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Get average preparation time
   */
  getAveragePreparationTime() {
    // This could be dynamic based on cart items
    // For now, return a default value
    return 20; // minutes
  }

  /**
   * Get average delivery time
   */
  getAverageDeliveryTime() {
    // This could come from selected delivery zone
    // For now, return a default value
    return 30; // minutes
  }

  /**
   * Show closed message
   */
  showClosedMessage() {
    if (!this.elements.closedMessage) return;

    const nextOpening = this.businessHours.getNextOpening();

    if (nextOpening) {
      this.elements.closedMessage.innerHTML = `
        <div class="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div class="flex items-start gap-3">
            <i class="sicon-alert-triangle text-amber-600 text-xl"></i>
            <div>
              <div class="font-semibold text-amber-900 mb-1">
                ${salla.lang.get('restaurant.currently_closed')}
              </div>
              <div class="text-sm text-amber-800">
                ${salla.lang.get('restaurant.next_opening')}:
                ${nextOpening.day} ${salla.lang.get('common.at')} ${nextOpening.time}
              </div>
            </div>
          </div>
        </div>
      `;
      this.elements.closedMessage.classList.remove('hidden');
    }
  }

  /**
   * Initialize date picker with available dates
   */
  initializeDatePicker() {
    if (!this.elements.datePicker) return;

    const availableDates = this.getAvailableDates();

    // Clear existing options
    this.elements.datePicker.innerHTML = `
      <option value="">
        ${salla.lang.get('restaurant.select_date')}
      </option>
    `;

    // Add available dates
    availableDates.forEach(dateInfo => {
      const option = document.createElement('option');
      option.value = dateInfo.value;
      option.textContent = dateInfo.label;
      option.disabled = !dateInfo.available;
      this.elements.datePicker.appendChild(option);
    });

    // Auto-select first available date
    const firstAvailable = availableDates.find(d => d.available);
    if (firstAvailable) {
      this.elements.datePicker.value = firstAvailable.value;
      this.selectDate(firstAvailable.value);
    }
  }

  /**
   * Get available dates for scheduling
   */
  getAvailableDates() {
    const dates = [];
    const now = new Date();
    const minDate = new Date(now.getTime() + this.config.minAdvanceHours * 3600000);

    for (let i = 0; i <= this.config.maxAdvanceDays; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      date.setHours(0, 0, 0, 0);

      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      const dayHours = this.businessHours.getHoursForDay(dayName);

      const isToday = i === 0;
      const isTomorrow = i === 1;

      let label;
      if (isToday) {
        label = salla.lang.get('common.today');
      } else if (isTomorrow) {
        label = salla.lang.get('common.tomorrow');
      } else {
        label = date.toLocaleDateString(
          document.documentElement.lang === 'ar' ? 'ar-SA' : 'en-US',
          { weekday: 'long', month: 'long', day: 'numeric' }
        );
      }

      dates.push({
        value: this.formatDateValue(date),
        label,
        date,
        available: dayHours && dayHours.enabled && date >= minDate,
        hours: dayHours
      });
    }

    return dates;
  }

  /**
   * Select a date
   */
  selectDate(dateValue) {
    if (!dateValue) {
      this.selectedDate = null;
      this.selectedTime = null;
      this.clearTimeSlots();
      return;
    }

    this.selectedDate = new Date(dateValue + 'T00:00:00');
    this.selectedTime = null;

    this.generateTimeSlots();
    this.triggerEvent('scheduling:date-selected', { date: this.selectedDate });
  }

  /**
   * Generate available time slots for selected date
   */
  generateTimeSlots() {
    if (!this.selectedDate || !this.elements.timePicker) return;

    const dayName = this.selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const dayHours = this.businessHours.getHoursForDay(dayName);

    if (!dayHours || !dayHours.enabled) {
      this.clearTimeSlots();
      return;
    }

    // Parse opening and closing times
    const [openHour, openMinute] = dayHours.open.split(':').map(Number);
    const [closeHour, closeMinute] = dayHours.close.split(':').map(Number);

    const slots = [];
    const now = new Date();
    const isToday = this.isSameDay(this.selectedDate, now);

    // Start from opening time or min advance time
    let slotTime = new Date(this.selectedDate);
    slotTime.setHours(openHour, openMinute, 0, 0);

    if (isToday) {
      const minTime = new Date(now.getTime() + this.config.minAdvanceHours * 3600000);
      if (slotTime < minTime) {
        slotTime = this.roundToNextSlot(minTime);
      }
    }

    // End time (closing time minus buffer)
    const endTime = new Date(this.selectedDate);
    endTime.setHours(closeHour, closeMinute, 0, 0);
    endTime.setMinutes(endTime.getMinutes() - this.config.bufferTime);

    // Generate slots
    while (slotTime < endTime) {
      slots.push({
        value: this.formatTimeValue(slotTime),
        label: this.formatTime(slotTime),
        time: new Date(slotTime),
        available: true
      });

      slotTime.setMinutes(slotTime.getMinutes() + this.config.slotInterval);
    }

    this.availableSlots = slots;
    this.renderTimeSlots();
  }

  /**
   * Render time slots in picker
   */
  renderTimeSlots() {
    if (!this.elements.timePicker) return;

    this.elements.timePicker.innerHTML = `
      <option value="">
        ${salla.lang.get('restaurant.select_time')}
      </option>
    `;

    this.availableSlots.forEach(slot => {
      const option = document.createElement('option');
      option.value = slot.value;
      option.textContent = slot.label;
      option.disabled = !slot.available;
      this.elements.timePicker.appendChild(option);
    });

    // Enable time picker
    this.elements.timePicker.disabled = false;

    // Auto-select first slot
    if (this.availableSlots.length > 0) {
      this.elements.timePicker.value = this.availableSlots[0].value;
      this.selectTime(this.availableSlots[0].value);
    }
  }

  /**
   * Clear time slots
   */
  clearTimeSlots() {
    if (!this.elements.timePicker) return;

    this.elements.timePicker.innerHTML = `
      <option value="">
        ${salla.lang.get('restaurant.select_date_first')}
      </option>
    `;
    this.elements.timePicker.disabled = true;
    this.availableSlots = [];
  }

  /**
   * Select a time slot
   */
  selectTime(timeValue) {
    if (!timeValue) {
      this.selectedTime = null;
      return;
    }

    const slot = this.availableSlots.find(s => s.value === timeValue);
    if (slot) {
      this.selectedTime = slot.time;
      this.triggerEvent('scheduling:time-selected', { time: this.selectedTime });
    }
  }

  /**
   * Round time to next available slot
   */
  roundToNextSlot(time) {
    const interval = this.config.slotInterval;
    const minutes = time.getMinutes();
    const remainder = minutes % interval;

    if (remainder === 0) {
      return time;
    }

    const nextSlot = new Date(time);
    nextSlot.setMinutes(minutes + (interval - remainder));
    nextSlot.setSeconds(0, 0);

    return nextSlot;
  }

  /**
   * Check if two dates are the same day
   */
  isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  /**
   * Format date for value attribute
   */
  formatDateValue(date) {
    return date.toISOString().split('T')[0];
  }

  /**
   * Format time for value attribute
   */
  formatTimeValue(time) {
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  /**
   * Format time for display
   */
  formatTime(time) {
    const locale = document.documentElement.lang === 'ar' ? 'ar-SA' : 'en-US';

    return time.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: locale === 'en-US'
    });
  }

  /**
   * Validate current selection
   */
  validate() {
    const errors = [];

    if (this.schedulingType === 'asap') {
      if (!this.businessHours.isOpen()) {
        errors.push({
          field: 'type',
          message: salla.lang.get('restaurant.errors.restaurant_closed')
        });
      }
    } else {
      if (!this.selectedDate) {
        errors.push({
          field: 'date',
          message: salla.lang.get('restaurant.errors.select_date')
        });
      }

      if (!this.selectedTime) {
        errors.push({
          field: 'time',
          message: salla.lang.get('restaurant.errors.select_time')
        });
      }

      // Validate time is in the future
      if (this.selectedDate && this.selectedTime) {
        const scheduledDateTime = new Date(this.selectedDate);
        const [hours, minutes] = this.formatTimeValue(this.selectedTime).split(':');
        scheduledDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        const minDateTime = new Date(Date.now() + this.config.minAdvanceHours * 3600000);

        if (scheduledDateTime < minDateTime) {
          errors.push({
            field: 'time',
            message: salla.lang.get('restaurant.errors.invalid_schedule_time')
          });
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Get scheduling data for order
   */
  getSchedulingData() {
    if (this.schedulingType === 'asap') {
      return {
        type: 'asap',
        scheduledFor: null,
        estimatedDelivery: new Date(
          Date.now() +
          (this.getAveragePreparationTime() + this.getAverageDeliveryTime()) * 60000
        )
      };
    } else {
      const scheduledDateTime = new Date(this.selectedDate);
      const [hours, minutes] = this.formatTimeValue(this.selectedTime).split(':');
      scheduledDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      return {
        type: 'scheduled',
        scheduledFor: scheduledDateTime,
        estimatedDelivery: scheduledDateTime
      };
    }
  }

  /**
   * Trigger custom event
   */
  triggerEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      detail: {
        ...detail,
        schedulingType: this.schedulingType,
        selectedDate: this.selectedDate,
        selectedTime: this.selectedTime
      },
      bubbles: true
    });
    this.container.dispatchEvent(event);
  }

  /**
   * Reset to defaults
   */
  reset() {
    this.schedulingType = 'asap';
    this.selectedDate = null;
    this.selectedTime = null;

    const asapRadio = Array.from(this.elements.typeRadios).find(r => r.value === 'asap');
    if (asapRadio) asapRadio.checked = true;

    this.setSchedulingType('asap');
    this.triggerEvent('scheduling:reset');
  }

  /**
   * Destroy instance
   */
  destroy() {
    delete this.container.orderScheduling;
    this.triggerEvent('scheduling:destroyed');
  }
}

// Auto-initialize
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-order-scheduling]').forEach(container => {
      new OrderSchedulingSystem(container);
    });
  });
}

export default OrderSchedulingSystem;

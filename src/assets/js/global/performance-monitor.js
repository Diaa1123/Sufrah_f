/**
 * Performance Monitoring & Web Vitals Tracking
 * Tracks Core Web Vitals (LCP, FID, CLS) and other metrics
 * @version 1.0.0
 * @package Sufrah Restaurant Theme
 */

class PerformanceMonitor {
  constructor(options = {}) {
    this.options = {
      enableLogging: options.enableLogging !== false, // Default: true
      enableAnalytics: options.enableAnalytics || false,
      logToConsole: options.logToConsole !== false,
      ...options,
    };

    this.metrics = {
      // Core Web Vitals
      lcp: null, // Largest Contentful Paint
      fid: null, // First Input Delay
      cls: 0,    // Cumulative Layout Shift

      // Other important metrics
      ttfb: null, // Time to First Byte
      fcp: null,  // First Contentful Paint
      domLoad: null,
      windowLoad: null,
      totalTime: null,
    };

    this.clsValue = 0;
    this.clsEntries = [];

    this.init();
  }

  init() {
    // Only run in browser
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Observe Web Vitals using PerformanceObserver
    if ('PerformanceObserver' in window) {
      this.observeLCP();
      this.observeFID();
      this.observeCLS();
      this.observeFCP();
    }

    // Log metrics after page load
    if (document.readyState === 'complete') {
      this.logNavigationMetrics();
    } else {
      window.addEventListener('load', () => {
        // Small delay to ensure all metrics are captured
        setTimeout(() => this.logNavigationMetrics(), 0);
      });
    }

    // Log metrics before page unload
    window.addEventListener('beforeunload', () => {
      this.finalizeMetrics();
    });

    // Handle visibility change (for SPA navigation)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.finalizeMetrics();
      }
    });
  }

  /**
   * Observe Largest Contentful Paint (LCP)
   * Good: < 2.5s | Needs Improvement: 2.5s - 4s | Poor: > 4s
   */
  observeLCP() {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
      });

      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('LCP observation failed:', e);
    }
  }

  /**
   * Observe First Input Delay (FID)
   * Good: < 100ms | Needs Improvement: 100ms - 300ms | Poor: > 300ms
   */
  observeFID() {
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
        });
      });

      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.warn('FID observation failed:', e);
    }
  }

  /**
   * Observe Cumulative Layout Shift (CLS)
   * Good: < 0.1 | Needs Improvement: 0.1 - 0.25 | Poor: > 0.25
   */
  observeCLS() {
    try {
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Only count layout shifts without recent user input
          if (!entry.hadRecentInput) {
            this.clsValue += entry.value;
            this.clsEntries.push(entry);
            this.metrics.cls = this.clsValue;
          }
        });
      });

      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.warn('CLS observation failed:', e);
    }
  }

  /**
   * Observe First Contentful Paint (FCP)
   * Good: < 1.8s | Needs Improvement: 1.8s - 3s | Poor: > 3s
   */
  observeFCP() {
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
          }
        });
      });

      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch (e) {
      console.warn('FCP observation failed:', e);
    }
  }

  /**
   * Get Navigation Timing metrics
   */
  logNavigationMetrics() {
    if (!window.performance || !window.performance.getEntriesByType) {
      return;
    }

    const navigation = performance.getEntriesByType('navigation')[0];

    if (!navigation) {
      return;
    }

    // Time to First Byte
    this.metrics.ttfb = navigation.responseStart - navigation.requestStart;

    // DOM Content Loaded
    this.metrics.domLoad = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;

    // Window Load
    this.metrics.windowLoad = navigation.loadEventEnd - navigation.loadEventStart;

    // Total page load time
    this.metrics.totalTime = navigation.loadEventEnd - navigation.fetchStart;

    if (this.options.logToConsole) {
      this.logMetricsToConsole();
    }
  }

  /**
   * Finalize metrics and send to analytics
   */
  finalizeMetrics() {
    if (this.options.enableAnalytics) {
      this.sendToAnalytics();
    }
  }

  /**
   * Log metrics to console
   */
  logMetricsToConsole() {
    if (!this.options.enableLogging) {
      return;
    }

    console.group('📊 Performance Metrics');

    // Core Web Vitals
    console.group('🎯 Core Web Vitals');
    console.log('LCP (Largest Contentful Paint):', this.formatTime(this.metrics.lcp), this.getStatus(this.metrics.lcp, 2500, 4000));
    console.log('FID (First Input Delay):', this.formatTime(this.metrics.fid), this.getStatus(this.metrics.fid, 100, 300));
    console.log('CLS (Cumulative Layout Shift):', this.metrics.cls.toFixed(3), this.getStatus(this.metrics.cls, 0.1, 0.25, true));
    console.groupEnd();

    // Other metrics
    console.group('⏱️ Other Metrics');
    console.log('FCP (First Contentful Paint):', this.formatTime(this.metrics.fcp));
    console.log('TTFB (Time to First Byte):', this.formatTime(this.metrics.ttfb));
    console.log('DOM Content Loaded:', this.formatTime(this.metrics.domLoad));
    console.log('Window Load:', this.formatTime(this.metrics.windowLoad));
    console.log('Total Load Time:', this.formatTime(this.metrics.totalTime));
    console.groupEnd();

    // Summary table
    console.table(this.metrics);

    console.groupEnd();
  }

  /**
   * Send metrics to Google Analytics (if available)
   */
  sendToAnalytics() {
    if (typeof gtag === 'undefined') {
      return;
    }

    // Send Core Web Vitals
    if (this.metrics.lcp) {
      gtag('event', 'LCP', {
        event_category: 'Web Vitals',
        value: Math.round(this.metrics.lcp),
        non_interaction: true,
      });
    }

    if (this.metrics.fid) {
      gtag('event', 'FID', {
        event_category: 'Web Vitals',
        value: Math.round(this.metrics.fid),
        non_interaction: true,
      });
    }

    if (this.metrics.cls) {
      gtag('event', 'CLS', {
        event_category: 'Web Vitals',
        value: Math.round(this.metrics.cls * 1000), // Convert to integer
        non_interaction: true,
      });
    }

    // Send other metrics
    Object.entries(this.metrics).forEach(([metric, value]) => {
      if (value && metric !== 'lcp' && metric !== 'fid' && metric !== 'cls') {
        gtag('event', metric.toUpperCase(), {
          event_category: 'Performance',
          value: Math.round(value),
          non_interaction: true,
        });
      }
    });
  }

  /**
   * Format time in milliseconds to readable format
   */
  formatTime(ms) {
    if (ms === null || ms === undefined) {
      return 'N/A';
    }

    if (ms < 1000) {
      return `${Math.round(ms)}ms`;
    }

    return `${(ms / 1000).toFixed(2)}s`;
  }

  /**
   * Get status emoji based on thresholds
   */
  getStatus(value, goodThreshold, needsImprovementThreshold, reverse = false) {
    if (value === null || value === undefined) {
      return '⚪';
    }

    if (reverse) {
      // For CLS (lower is better)
      if (value < goodThreshold) return '✅ Good';
      if (value < needsImprovementThreshold) return '🟡 Needs Improvement';
      return '🔴 Poor';
    } else {
      // For LCP, FID, etc. (lower is better)
      if (value < goodThreshold) return '✅ Good';
      if (value < needsImprovementThreshold) return '🟡 Needs Improvement';
      return '🔴 Poor';
    }
  }

  /**
   * Get all metrics
   */
  getMetrics() {
    return { ...this.metrics };
  }

  /**
   * Get metric score (0-100)
   */
  getScore() {
    let score = 100;

    // LCP scoring (40 points max)
    if (this.metrics.lcp) {
      if (this.metrics.lcp > 4000) score -= 40;
      else if (this.metrics.lcp > 2500) score -= 20;
    }

    // FID scoring (30 points max)
    if (this.metrics.fid) {
      if (this.metrics.fid > 300) score -= 30;
      else if (this.metrics.fid > 100) score -= 15;
    }

    // CLS scoring (30 points max)
    if (this.metrics.cls > 0.25) score -= 30;
    else if (this.metrics.cls > 0.1) score -= 15;

    return Math.max(0, score);
  }
}

// Auto-initialize on DOM ready
if (typeof window !== 'undefined') {
  const initPerformanceMonitor = () => {
    window.performanceMonitor = new PerformanceMonitor({
      enableLogging: true,
      logToConsole: true,
      enableAnalytics: false, // Set to true if using Google Analytics
    });

    console.log('✅ PerformanceMonitor initialized');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPerformanceMonitor);
  } else {
    initPerformanceMonitor();
  }
}

export default PerformanceMonitor;

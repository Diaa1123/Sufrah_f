/**
 * Enhanced Lazy Loading for Images
 * Uses Intersection Observer for optimal performance
 * @version 1.0.0
 * @package Sufrah Restaurant Theme
 */

class LazyLoader {
  constructor(options = {}) {
    this.options = {
      rootMargin: options.rootMargin || '50px', // Start loading 50px before viewport
      threshold: options.threshold || 0.01,
      loadingClass: options.loadingClass || 'lazy-loading',
      loadedClass: options.loadedClass || 'lazy-loaded',
      errorClass: options.errorClass || 'lazy-error',
      fadeInDuration: options.fadeInDuration || 300,
      ...options,
    };

    this.images = [];
    this.observer = null;
    this.init();
  }

  init() {
    // Get all images with data-src or loading="lazy"
    this.images = Array.from(
      document.querySelectorAll('img[data-src], img[loading="lazy"], img[data-lazy]')
    );

    if (!this.images.length) {
      return;
    }

    // Use Intersection Observer if available
    if ('IntersectionObserver' in window) {
      this.setupIntersectionObserver();
    } else {
      // Fallback: Load all images immediately
      this.loadAllImages();
    }
  }

  setupIntersectionObserver() {
    const observerOptions = {
      root: null, // viewport
      rootMargin: this.options.rootMargin,
      threshold: this.options.threshold,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all lazy images
    this.images.forEach((img) => {
      this.observer.observe(img);
    });
  }

  loadImage(img) {
    // Add loading class
    img.classList.add(this.options.loadingClass);

    // Get source URLs
    const src = img.dataset.src || img.src;
    const srcset = img.dataset.srcset;

    // Create a new image to preload
    const tempImage = new Image();

    // Handle successful load
    tempImage.onload = () => {
      this.onImageLoaded(img, src, srcset);
    };

    // Handle load error
    tempImage.onerror = () => {
      this.onImageError(img);
    };

    // Start loading
    if (srcset) {
      tempImage.srcset = srcset;
    }
    tempImage.src = src;
  }

  onImageLoaded(img, src, srcset) {
    // Set the actual image source
    img.src = src;
    if (srcset) {
      img.srcset = srcset;
    }

    // Clean up data attributes
    delete img.dataset.src;
    delete img.dataset.srcset;
    delete img.dataset.lazy;

    // Remove loading class and add loaded class
    img.classList.remove(this.options.loadingClass);
    img.classList.add(this.options.loadedClass);

    // Fade in animation
    this.fadeIn(img);

    // Dispatch custom event
    img.dispatchEvent(new CustomEvent('lazyloaded', { detail: { src } }));
  }

  onImageError(img) {
    // Remove loading class and add error class
    img.classList.remove(this.options.loadingClass);
    img.classList.add(this.options.errorClass);

    // Set fallback image if specified
    if (img.dataset.fallback) {
      img.src = img.dataset.fallback;
    }

    // Dispatch custom event
    img.dispatchEvent(new CustomEvent('lazyerror'));

    console.warn('LazyLoader: Failed to load image', img);
  }

  fadeIn(img) {
    if (!this.options.fadeInDuration) {
      return;
    }

    // Set initial opacity
    img.style.opacity = '0';
    img.style.transition = `opacity ${this.options.fadeInDuration}ms ease-in-out`;

    // Use requestAnimationFrame for smooth animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        img.style.opacity = '1';
      });
    });

    // Clean up transition after animation
    setTimeout(() => {
      img.style.transition = '';
    }, this.options.fadeInDuration);
  }

  loadAllImages() {
    // Fallback: Load all images immediately (no observer)
    this.images.forEach((img) => {
      this.loadImage(img);
    });
  }

  /**
   * Update - Scan for new lazy images and observe them
   * Useful after dynamic content is added
   */
  update() {
    const newImages = Array.from(
      document.querySelectorAll('img[data-src]:not(.lazy-loaded):not(.lazy-loading)')
    );

    if (!newImages.length) {
      return;
    }

    this.images = [...this.images, ...newImages];

    if (this.observer) {
      newImages.forEach((img) => {
        this.observer.observe(img);
      });
    } else {
      newImages.forEach((img) => {
        this.loadImage(img);
      });
    }
  }

  /**
   * Destroy - Clean up observer
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.images = [];
  }
}

// Auto-initialize on DOM ready
if (typeof document !== 'undefined') {
  // Initialize after DOM is ready
  const initLazyLoader = () => {
    window.lazyLoader = new LazyLoader({
      rootMargin: '100px', // Start loading 100px before viewport
      threshold: 0.01,
      fadeInDuration: 300,
    });

    console.log('✅ LazyLoader initialized:', window.lazyLoader.images.length, 'images');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoader);
  } else {
    // DOM already loaded
    initLazyLoader();
  }

  // Update lazy loader when Salla content changes
  if (typeof salla !== 'undefined') {
    salla.event?.cart?.updated?.listen(() => {
      setTimeout(() => {
        window.lazyLoader?.update();
      }, 100);
    });
  }
}

export default LazyLoader;

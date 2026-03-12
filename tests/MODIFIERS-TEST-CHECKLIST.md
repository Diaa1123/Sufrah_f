# ✅ Modifiers System - Testing Checklist

## Test Environment Setup

### Prerequisites
- [ ] Salla platform account configured
- [ ] Test products with modifiers created
- [ ] Browser DevTools open (Console + Network tabs)
- [ ] Test data prepared (see below)

### Test Data Requirements

Create at least one test product with:
- ✅ 3+ sizes (Small, Medium, Large)
- ✅ 4+ extras with varying prices
- ✅ 5+ modification options
- ✅ All optional fields (calories, prep time, allergens)

---

## 1. Initialization Tests

### Auto-Initialization
- [ ] **Test 1.1:** Page loads with `[data-product-modifiers]` element
  - Expected: ModifiersSystem auto-initializes
  - Check: `console.log` shows "modifiers:ready" event
  - Check: `productElement.modifiersSystem` exists

- [ ] **Test 1.2:** Element added dynamically (AJAX modal)
  - Expected: MutationObserver detects and initializes
  - Check: System works in quick-view modals

- [ ] **Test 1.3:** Multiple products on same page
  - Expected: Each gets separate instance
  - Check: No state conflicts between products

### Manual Initialization
- [ ] **Test 1.4:** `new ModifiersSystem(element)` works
  - Expected: Instance created successfully
  - Check: No errors in console

- [ ] **Test 1.5:** Invalid element throws error
  - Expected: Error message: "Product element is required"
  - Check: Error caught and logged

---

## 2. Size Selection Tests

### Single Selection
- [ ] **Test 2.1:** Click first size
  - Expected: Radio button checked
  - Expected: Checkmark badge appears
  - Expected: Border color changes to primary-500
  - Check: Visual feedback immediate

- [ ] **Test 2.2:** Click second size
  - Expected: First unchecked, second checked
  - Expected: Only one selected at a time
  - Check: Radio button behavior correct

- [ ] **Test 2.3:** Size with additional price
  - Expected: Price updates immediately
  - Expected: Animation plays smoothly
  - Check: Math correct (base + size price)

### Required Validation
- [ ] **Test 2.4:** `data-size-required="true"` set
  - Click "Add to Cart" without selecting size
  - Expected: Error message appears
  - Expected: Page scrolls to size section
  - Check: Cannot proceed without size

- [ ] **Test 2.5:** `data-size-required="false"` set
  - Click "Add to Cart" without size
  - Expected: Allowed to proceed
  - Check: No validation error

### State Persistence
- [ ] **Test 2.6:** Select size, refresh page
  - Expected: Size selection restored
  - Check: sessionStorage has correct data

---

## 3. Extras Selection Tests

### Multiple Selection
- [ ] **Test 3.1:** Check "Extra Cheese" (+5 SAR)
  - Expected: Checkbox checked
  - Expected: Border changes to primary-400
  - Expected: Price increases by 5
  - Check: Animation smooth

- [ ] **Test 3.2:** Check "Drink" (+8 SAR)
  - Expected: Both extras selected
  - Expected: Price increases by 13 total (5 + 8)
  - Check: Multiple selections allowed

- [ ] **Test 3.3:** Uncheck "Extra Cheese"
  - Expected: Checkbox unchecked
  - Expected: Price decreases by 5
  - Expected: Only "Drink" remains in state
  - Check: Correct removal from array

### Required Extras
- [ ] **Test 3.4:** Extra with `data-required="true"`
  - Try to submit without selecting
  - Expected: Validation error
  - Expected: Error message names the extra
  - Check: Cannot proceed

### UI Interactions
- [ ] **Test 3.5:** Hover over extra option
  - Expected: Border color lightens
  - Expected: Background changes
  - Expected: Smooth transition (200ms)
  - Check: Visual feedback

- [ ] **Test 3.6:** Calories display (if present)
  - Expected: Shows "+120 cal" below price
  - Check: Text color gray-500

---

## 4. Modifications Tests

### Free Options
- [ ] **Test 4.1:** Select "No Onions"
  - Expected: Pill turns primary-500 border
  - Expected: Background primary-100
  - Expected: NO price change
  - Check: Price remains same

- [ ] **Test 4.2:** Select multiple modifications
  - Expected: Multiple pills selected
  - Expected: Visual states correct
  - Check: All stored in array

- [ ] **Test 4.3:** Deselect modification
  - Expected: Pill returns to gray
  - Expected: Removed from state
  - Check: Correct array manipulation

### Icon Display
- [ ] **Test 4.4:** Modification with icon
  - Expected: Icon renders (e.g., `sicon-hot`)
  - Expected: Positioned correctly
  - Check: Icon visible and styled

---

## 5. Special Instructions Tests

### Character Counter
- [ ] **Test 5.1:** Type "No onions please" (17 chars)
  - Expected: Counter shows "17/200"
  - Expected: Gray color (normal state)
  - Check: Updates on every keystroke

- [ ] **Test 5.2:** Type until 180 chars (90% of limit)
  - Expected: Counter turns amber-600
  - Expected: Font weight semibold
  - Expected: Pulsing animation starts
  - Check: Visual warning

- [ ] **Test 5.3:** Type exactly 200 characters
  - Expected: Counter shows "200/200"
  - Expected: Cannot type more
  - Check: Max length enforced

### Paste Handling
- [ ] **Test 5.4:** Paste 250 characters
  - Expected: Truncated to 200
  - Expected: Counter shows "200/200"
  - Expected: No error thrown
  - Check: Graceful handling

### State Persistence
- [ ] **Test 5.5:** Type instructions, refresh page
  - Expected: Text restored
  - Expected: Counter updated
  - Check: sessionStorage works

---

## 6. Price Calculation Tests

### Base Price
- [ ] **Test 6.1:** No selections made
  - Expected: Shows base price only
  - Check: Matches product.price

### Additive Pricing
- [ ] **Test 6.2:** Select size (+15) + 2 extras (+5, +8)
  - Expected: Total = base + 15 + 5 + 8
  - Expected: Math accurate
  - Check: No rounding errors

### Formatting
- [ ] **Test 6.3:** Arabic locale (`lang="ar"`)
  - Expected: "٤٥٫٠٠ ر.س"
  - Expected: RTL number format
  - Check: Uses `ar-SA` locale

- [ ] **Test 6.4:** English locale (`lang="en"`)
  - Expected: "SAR 45.00" or "45.00 SAR"
  - Expected: Uses `en-US` locale
  - Check: Correct currency symbol

### Animation
- [ ] **Test 6.5:** Make selection that changes price
  - Expected: "price-updating" class added (100ms)
  - Expected: Opacity reduces to 70%
  - Expected: "price-changed" class added
  - Expected: Scale animation (1 → 1.05 → 1)
  - Check: Smooth, not jarring

---

## 7. Validation Tests

### Required Fields
- [ ] **Test 7.1:** Submit with missing required size
  - Expected: Error: "يرجى اختيار الحجم"
  - Expected: Validation fails
  - Check: `validate()` returns `valid: false`

- [ ] **Test 7.2:** Submit with all required fields
  - Expected: Validation passes
  - Expected: `validate()` returns `valid: true`
  - Check: Proceeds to API call

### Error Display
- [ ] **Test 7.3:** Validation error triggers notification
  - Expected: `salla.notify.error()` called
  - Expected: Red toast/notification appears
  - Check: User-friendly message

### Focus Management
- [ ] **Test 7.4:** Size validation fails
  - Expected: Scrolls to `.size-options`
  - Expected: Smooth scroll behavior
  - Check: User sees error location

- [ ] **Test 7.5:** Instructions validation fails
  - Expected: Focus moves to textarea
  - Check: Keyboard cursor in field

---

## 8. Add to Cart Tests

### API Integration
- [ ] **Test 8.1:** Successful add to cart
  - Expected: `salla.cart.addItem()` called
  - Expected: Network request in DevTools
  - Expected: Status 200 response
  - Check: Cart API works

- [ ] **Test 8.2:** API returns error
  - Expected: Error caught
  - Expected: `salla.notify.error()` called
  - Expected: User-friendly message
  - Check: Graceful error handling

### Cart Data Format
- [ ] **Test 8.3:** Verify cart payload
  - Expected structure:
    ```json
    {
      "id": "12345",
      "quantity": 1,
      "options": [
        { "name": "الحجم", "value": "كبير", "price": 15 },
        { "name": "جبنة", "value": "الإضافات", "price": 5 }
      ]
    }
    ```
  - Check: Correct format for Salla API

### UI States
- [ ] **Test 8.4:** Button disabled during request
  - Expected: `disabled` attribute added
  - Expected: Opacity 50%, cursor not-allowed
  - Expected: Cannot click again
  - Check: Prevents double submission

- [ ] **Test 8.5:** Button re-enabled after success
  - Expected: `disabled` removed
  - Expected: Opacity 100%
  - Check: Can add again if needed

### Post-Add Actions
- [ ] **Test 8.6:** Success notification
  - Expected: `salla.notify.success()` called
  - Expected: Green toast appears
  - Expected: Message: "أضيف للسلة" or similar
  - Check: User feedback

- [ ] **Test 8.7:** State cleared
  - Expected: sessionStorage key removed
  - Expected: Fresh state on next load
  - Check: `clearState()` called

- [ ] **Test 8.8:** Modal closes (if in modal)
  - Expected: Modal closes after 500ms delay
  - Check: Smooth transition

---

## 9. State Persistence Tests

### Save on Change
- [ ] **Test 9.1:** Select size
  - Check sessionStorage: key `modifiers_12345` exists
  - Check: Contains `size` object

- [ ] **Test 9.2:** Add extras
  - Check: `extras` array updated
  - Check: Both size and extras persisted

### Restore on Load
- [ ] **Test 9.3:** With saved state, refresh page
  - Expected: All selections restored
  - Expected: UI matches state
  - Expected: Price recalculated
  - Check: Perfect restoration

### Clear on Success
- [ ] **Test 9.4:** Add to cart successfully
  - Expected: sessionStorage key deleted
  - Refresh page
  - Expected: Clean slate, no selections
  - Check: State cleared

---

## 10. Event System Tests

### Event Dispatching
- [ ] **Test 10.1:** Listen for `modifiers:ready`
  ```javascript
  document.addEventListener('modifiers:ready', (e) => {
    console.log('Ready!', e.detail);
  });
  ```
  - Expected: Fires on init
  - Check: `detail` contains modifiers and total

- [ ] **Test 10.2:** Listen for `modifiers:price-updated`
  - Make selection
  - Expected: Event fires
  - Expected: `e.detail.total` is number
  - Expected: `e.detail.formatted` is string
  - Check: Data accurate

### Event Bubbling
- [ ] **Test 10.3:** Events bubble to document
  - Add listener on `document`
  - Make selection on nested element
  - Expected: Event caught
  - Check: `bubbles: true` works

---

## 11. Responsive Design Tests

### Mobile (<640px)
- [ ] **Test 11.1:** Open on mobile viewport
  - Expected: Single column layout
  - Expected: Full-width buttons
  - Expected: Sticky footer works
  - Expected: Touch targets ≥44px
  - Check: Usable on phone

- [ ] **Test 11.2:** Size grid adapts
  - Expected: Stacked sizes (1 column)
  - Expected: Padding reduced (p-3)
  - Check: No horizontal scroll

### Tablet (640-1024px)
- [ ] **Test 11.3:** Open on tablet viewport
  - Expected: 2-3 column grid
  - Expected: Optimized spacing
  - Check: Balanced layout

### Desktop (>1024px)
- [ ] **Test 11.4:** Open on desktop viewport
  - Expected: 3-4 column grid
  - Expected: Hover effects visible
  - Expected: Max density
  - Check: Efficient use of space

---

## 12. RTL (Arabic) Tests

### Layout Direction
- [ ] **Test 12.1:** Set `<html dir="rtl">`
  - Expected: Text aligns right
  - Expected: Checkmark badges on left
  - Expected: Icons mirrored
  - Check: Proper RTL layout

### Number Formatting
- [ ] **Test 12.2:** Arabic locale price
  - Expected: "٤٥٫٠٠ ر.س"
  - Expected: Arabic-Indic numerals (optional)
  - Check: Uses `ar-SA` locale

### Animations
- [ ] **Test 12.3:** Hover on extra (RTL)
  - Expected: Translates +2px (right)
  - Check: Direction reversed

---

## 13. Accessibility Tests

### Keyboard Navigation
- [ ] **Test 13.1:** Tab through all fields
  - Expected: Logical tab order
  - Expected: Skip links work
  - Expected: No keyboard traps
  - Check: Fully keyboard accessible

- [ ] **Test 13.2:** Arrow keys for radios
  - Focus on size radio group
  - Press arrow keys
  - Expected: Cycles through options
  - Check: Native radio behavior

### Focus Visible
- [ ] **Test 13.3:** Tab to checkbox
  - Expected: Focus ring appears (ring-2)
  - Expected: Primary color ring
  - Expected: 2px offset
  - Check: Clear focus indicator

### Screen Reader
- [ ] **Test 13.4:** Use NVDA/JAWS
  - Expected: Field labels announced
  - Expected: Current values read
  - Expected: Error messages read
  - Check: Accessible to blind users

### ARIA Labels
- [ ] **Test 13.5:** Inspect ARIA attributes
  - Expected: `aria-required` on required fields
  - Expected: `aria-describedby` on textarea
  - Expected: `aria-live` on price
  - Check: Proper ARIA usage

### Color Contrast
- [ ] **Test 13.6:** Run axe DevTools
  - Expected: No contrast errors
  - Expected: Passes WCAG AA
  - Check: Readable for low vision

---

## 14. Performance Tests

### Load Time
- [ ] **Test 14.1:** Measure initialization time
  - Use Performance API
  - Expected: <50ms to init
  - Check: No blocking

### Memory Usage
- [ ] **Test 14.2:** Create/destroy 100 instances
  - Use Memory Profiler
  - Expected: No memory leaks
  - Check: Cleanup works

### Animation Performance
- [ ] **Test 14.3:** Monitor FPS during animation
  - Use Chrome DevTools Performance tab
  - Expected: 60 FPS
  - Expected: No jank
  - Check: Smooth animations

---

## 15. Error Handling Tests

### Network Errors
- [ ] **Test 15.1:** Simulate offline
  - Disconnect internet
  - Try to add to cart
  - Expected: Error caught
  - Expected: User-friendly message
  - Check: Graceful failure

### Storage Errors
- [ ] **Test 15.2:** Disable sessionStorage
  - Use incognito/privacy mode
  - Expected: Warning logged
  - Expected: System still works
  - Check: Degrades gracefully

### Invalid Data
- [ ] **Test 15.3:** Corrupt sessionStorage data
  - Manually edit storage: `{invalid json`
  - Refresh page
  - Expected: Error caught
  - Expected: Fresh state used
  - Check: No crash

---

## 16. Integration Tests

### With Cart System
- [ ] **Test 16.1:** Add product with modifiers
  - Go to cart page
  - Expected: Modifiers listed
  - Expected: Price correct
  - Check: Cart displays options

### With Checkout
- [ ] **Test 16.2:** Complete purchase
  - Add to cart → Checkout → Pay
  - Expected: Order includes modifiers
  - Check: End-to-end flow

### With Other Modifiers
- [ ] **Test 16.3:** Product with non-restaurant modifiers
  - Expected: No conflict
  - Expected: Both systems work
  - Check: Compatibility

---

## 17. Browser Compatibility Tests

### Chrome
- [ ] **Test 17.1:** Chrome 120+ (latest)
  - All features work
  - No console errors

### Firefox
- [ ] **Test 17.2:** Firefox 120+ (latest)
  - All features work
  - Animation smooth

### Safari
- [ ] **Test 17.3:** Safari 17+ (macOS/iOS)
  - All features work
  - Touch events work (iOS)

### Edge
- [ ] **Test 17.4:** Edge 120+ (latest)
  - All features work
  - No Edge-specific bugs

---

## 18. Security Tests

### XSS Prevention
- [ ] **Test 18.1:** Enter script in instructions
  - Input: `<script>alert('XSS')</script>`
  - Expected: Escaped/sanitized
  - Check: No script execution

### SQL Injection (Backend)
- [ ] **Test 18.2:** Enter SQL in instructions
  - Input: `'; DROP TABLE products; --`
  - Expected: Treated as text
  - Check: No database impact

---

## 19. Regression Tests

After any code changes, re-run:
- [ ] All validation tests (Section 7)
- [ ] Price calculation tests (Section 6)
- [ ] Add to cart flow (Section 8)
- [ ] State persistence (Section 9)

---

## Test Results Summary

**Date:** _____________
**Tester:** _____________
**Browser:** _____________
**Device:** _____________

| Category | Passed | Failed | Notes |
|----------|--------|--------|-------|
| Initialization | ___ / 5 | ___ | |
| Size Selection | ___ / 6 | ___ | |
| Extras | ___ / 6 | ___ | |
| Modifications | ___ / 4 | ___ | |
| Instructions | ___ / 5 | ___ | |
| Price Calc | ___ / 6 | ___ | |
| Validation | ___ / 5 | ___ | |
| Add to Cart | ___ / 8 | ___ | |
| State | ___ / 4 | ___ | |
| Events | ___ / 3 | ___ | |
| Responsive | ___ / 4 | ___ | |
| RTL | ___ / 3 | ___ | |
| Accessibility | ___ / 6 | ___ | |
| Performance | ___ / 3 | ___ | |
| Error Handling | ___ / 3 | ___ | |
| Integration | ___ / 3 | ___ | |
| Browsers | ___ / 4 | ___ | |
| Security | ___ / 2 | ___ | |

**Total:** ___ / 82 tests passed

**Overall Status:**
- [ ] ✅ Ready for production
- [ ] ⚠️ Minor issues (document below)
- [ ] ❌ Major issues (requires fixes)

**Issues Found:**
1. _________________________________________________
2. _________________________________________________
3. _________________________________________________

**Sign-off:** _______________ (QA Lead)
**Date:** _______________

# Integration Testing Checklist
## Restaurant Systems - Manual Testing Guide

**Project:** Sufrah Restaurant Theme
**Version:** 1.0.0
**Test Phase:** Integration Testing
**Agent:** Agent 04 (Features Engineer)

---

## 📋 Test Environment Setup

### Prerequisites
- [ ] Development server running (`npm run dev` or similar)
- [ ] Salla Store configured with API credentials
- [ ] Test products created in Salla dashboard
- [ ] Delivery zones configured in settings
- [ ] Business hours configured in theme settings
- [ ] Test user account with sufficient permissions
- [ ] Browser DevTools open for debugging
- [ ] Network tab monitoring for API calls
- [ ] Console clear of critical errors

### Test Data Required
- [ ] At least 3 test products with different prices
- [ ] At least 3 delivery zones with different minimums
- [ ] Business hours covering current time (for ASAP testing)
- [ ] Business hours with closed day (for scheduling testing)
- [ ] Sample modifiers (sizes, extras, modifications)

---

## 🔧 System 1: Modifiers System

### Basic Functionality
- [ ] **Size Selection**
  - [ ] Can select size from available options
  - [ ] Size radio buttons work correctly
  - [ ] Selected size is highlighted visually
  - [ ] Price updates when size is selected
  - [ ] Required size shows validation error when not selected
  - [ ] Optional size allows proceeding without selection

- [ ] **Extras Selection**
  - [ ] Can select multiple extras via checkboxes
  - [ ] Extras can be deselected
  - [ ] Price updates correctly with each extra
  - [ ] Extras list scrolls properly on mobile
  - [ ] "Select All" button works (if implemented)

- [ ] **Modifications Selection**
  - [ ] Can select multiple modifications
  - [ ] Modifications are mutually compatible
  - [ ] Free modifications don't affect price
  - [ ] Paid modifications add to total correctly

- [ ] **Special Instructions**
  - [ ] Text area accepts input
  - [ ] Character count displays (if implemented)
  - [ ] Long text doesn't break layout
  - [ ] Special characters handled correctly
  - [ ] Instructions persist in cart

### Price Calculation
- [ ] Base price displays correctly
- [ ] Size price adds to total
- [ ] Each extra adds to total individually
- [ ] Total updates in real-time
- [ ] Total displays with correct currency (SAR)
- [ ] Price formatting correct (2 decimal places)
- [ ] No calculation errors with multiple modifiers

### Validation
- [ ] Required size validation works
- [ ] Error messages display clearly
- [ ] Error messages in correct language (AR/EN)
- [ ] Cannot add to cart without required fields
- [ ] Validation clears when requirement met

### Cart Integration
- [ ] "Add to Cart" button works
- [ ] Product added with all modifiers
- [ ] Modifiers display in cart correctly
- [ ] Price in cart matches calculated total
- [ ] Multiple products with different modifiers work
- [ ] Cart updates without page reload
- [ ] Success notification shown

### Persistence
- [ ] Modifiers saved in sessionStorage
- [ ] Modifiers restored when returning to product
- [ ] SessionStorage cleared after successful cart add
- [ ] No memory leaks with repeated use

---

## 🚚 System 2: Delivery Zones

### Zone Selection
- [ ] **Zone Dropdown**
  - [ ] All zones load from settings
  - [ ] Zones display in dropdown correctly
  - [ ] Can select zone from list
  - [ ] Selected zone is highlighted
  - [ ] Zone details appear after selection

- [ ] **Zone Details Display**
  - [ ] Delivery fee shows correctly
  - [ ] Minimum order displays
  - [ ] Estimated delivery time shows
  - [ ] Zone description (if any) displays
  - [ ] All information formatted correctly

### Validation
- [ ] **Minimum Order Validation**
  - [ ] Warning shows when cart below minimum
  - [ ] Warning displays required amount
  - [ ] Warning displays amount needed to add
  - [ ] Warning clears when minimum met
  - [ ] Cannot proceed to checkout below minimum

- [ ] **Zone Availability**
  - [ ] Disabled zones are not selectable
  - [ ] Disabled zones grayed out in list
  - [ ] Message explains why zone unavailable

### Cart Integration
- [ ] Shipping cost updates in cart
- [ ] Shipping displays separately from subtotal
- [ ] Total includes shipping correctly
- [ ] Changing zone updates shipping
- [ ] Cart total validates against new zone minimum

### Persistence
- [ ] Selected zone saved in localStorage
- [ ] Zone persists across page reloads
- [ ] Zone persists across sessions
- [ ] Zone clears after checkout (if intended)

### Helper Functions
- [ ] **getCheapestZone()**
  - [ ] Returns zone with lowest delivery fee
  - [ ] Considers cart total for availability
  - [ ] Handles ties correctly

- [ ] **getFastestZone()**
  - [ ] Returns zone with shortest delivery time
  - [ ] Considers cart total for availability
  - [ ] Handles ties correctly

---

## 📅 System 3: Order Scheduling

### ASAP Delivery
- [ ] **When Restaurant Open**
  - [ ] "ASAP" option is selectable
  - [ ] Estimated delivery time calculates
  - [ ] Estimate displays clearly (e.g., "45-60 min")
  - [ ] Estimate includes prep + delivery time
  - [ ] Estimate realistic based on settings

- [ ] **When Restaurant Closed**
  - [ ] "ASAP" option disabled or grayed out
  - [ ] Message explains restaurant is closed
  - [ ] Automatically switches to "Scheduled"
  - [ ] Shows next opening time

### Scheduled Delivery
- [ ] **Date Selection**
  - [ ] Date picker appears
  - [ ] Today's date included (if open)
  - [ ] Only future dates selectable
  - [ ] Past dates disabled
  - [ ] Dates beyond max advance disabled
  - [ ] Closed days are disabled or marked
  - [ ] Selected date highlighted

- [ ] **Time Selection**
  - [ ] Time slots generate after date selection
  - [ ] Slots respect business hours for selected day
  - [ ] Slots in 30-minute intervals (or as configured)
  - [ ] Minimum advance time enforced (e.g., 60 min)
  - [ ] Past time slots disabled for today
  - [ ] All slots within operating hours

### Business Hours Integration
- [ ] System checks if restaurant is open
- [ ] ASAP disabled when closed
- [ ] Scheduled dates respect weekly schedule
- [ ] Closed days properly excluded
- [ ] Time slots match day-specific hours

### Validation
- [ ] Cannot submit without scheduling type
- [ ] Cannot submit scheduled without date
- [ ] Cannot submit scheduled without time
- [ ] Date/time in past rejected
- [ ] Date beyond max advance rejected
- [ ] Validation messages clear and helpful

### Data Handling
- [ ] **getSchedulingData()**
  - [ ] Returns correct type ('asap' or 'scheduled')
  - [ ] Returns formatted date/time for scheduled
  - [ ] Returns estimated delivery for ASAP
  - [ ] Data format compatible with Salla

---

## 🕒 System 4: Business Hours

### Open/Closed Status
- [ ] **Real-Time Status**
  - [ ] Shows "Open" when currently open
  - [ ] Shows "Closed" when currently closed
  - [ ] Status updates every minute automatically
  - [ ] Status accurate to current time
  - [ ] Status indicator color correct (green/red)

- [ ] **Status Display**
  - [ ] Status badge visible and clear
  - [ ] Badge has appropriate styling
  - [ ] Pulse animation on "Open" (if implemented)
  - [ ] Icon matches status

### Time Until Closing
- [ ] Shows when currently open
- [ ] Updates countdown every minute
- [ ] Format clear (e.g., "Closes in 2 hours 15 minutes")
- [ ] Displays correctly in both languages
- [ ] Warning shown when closing soon (< 1 hour)

### Next Opening Time
- [ ] Shows when currently closed
- [ ] Calculates correctly (next day if needed)
- [ ] Displays day and time clearly
- [ ] Handles overnight closures correctly
- [ ] Handles multi-day closures (e.g., closed Friday & Saturday)

### Weekly Schedule Display
- [ ] **Compact Mode**
  - [ ] Shows today only (if enabled)
  - [ ] Today highlighted
  - [ ] Day, hours, and status visible
  - [ ] Collapsed view efficient on mobile

- [ ] **Full Mode**
  - [ ] Shows all 7 days of week
  - [ ] Each day shows hours
  - [ ] Closed days marked clearly
  - [ ] Today highlighted differently
  - [ ] Scrollable on small screens

### Performance
- [ ] **Caching**
  - [ ] isOpen() result cached for 1 minute
  - [ ] Subsequent calls within 1 min use cache
  - [ ] Cache invalidates after TTL
  - [ ] No performance issues with repeated checks

### Widget Functionality
- [ ] Widget initializes on page load
- [ ] Updates automatically every 60 seconds
- [ ] No console errors during updates
- [ ] Memory doesn't leak with long-running page

---

## 🔗 Cross-System Integration

### Modifiers + Delivery Zones
- [ ] Product total with modifiers used for zone validation
- [ ] Adding extras updates zone minimum check
- [ ] Changing size updates zone minimum check
- [ ] Multiple products with modifiers total correctly
- [ ] Zone validation reflects accurate cart total

### Modifiers + Scheduling
- [ ] Can add product with modifiers and schedule order
- [ ] Modifiers persist through scheduling flow
- [ ] Scheduled order includes all modifiers in confirmation

### Delivery Zones + Scheduling
- [ ] Selected zone persists through scheduling
- [ ] Delivery estimate considers selected zone
- [ ] Zone delivery time reflected in ASAP estimate

### All Systems + Cart
- [ ] Product with modifiers adds to cart
- [ ] Zone shipping cost added to cart
- [ ] Scheduled delivery info attached to cart
- [ ] Business hours checked before ASAP allowed
- [ ] Cart displays all information correctly

### Complete Checkout Flow
- [ ] **Step 1: Product Selection**
  - [ ] Select product with modifiers
  - [ ] Add to cart successfully
  - [ ] Cart shows modifiers

- [ ] **Step 2: Zone Selection**
  - [ ] Select delivery zone
  - [ ] Validate cart minimum
  - [ ] Shipping cost added

- [ ] **Step 3: Scheduling**
  - [ ] Choose ASAP or Scheduled
  - [ ] Select date/time if scheduled
  - [ ] Validation passes

- [ ] **Step 4: Checkout**
  - [ ] All data present in order
  - [ ] Order submits successfully
  - [ ] Confirmation shows all details

---

## ⚠️ Edge Cases & Error Handling

### Empty/Invalid States
- [ ] Empty cart handled gracefully
- [ ] Missing product data doesn't crash
- [ ] Missing zones array handled
- [ ] Missing business hours handled
- [ ] Invalid dates rejected
- [ ] Invalid times rejected

### Boundary Conditions
- [ ] Cart total exactly at zone minimum allows checkout
- [ ] Cart total 1 unit below minimum blocks checkout
- [ ] Scheduling at exact minimum advance time works
- [ ] Scheduling 1 minute before minimum blocked
- [ ] Business hours crossing midnight handled

### Network Issues
- [ ] Failed cart add shows error message
- [ ] Failed zone update handled
- [ ] Retry mechanism for transient failures (if implemented)
- [ ] User informed of network errors
- [ ] No data corruption on network failure

### Race Conditions
- [ ] Rapid zone changes handled correctly
- [ ] Concurrent modifier selections work
- [ ] Multiple cart adds queued properly
- [ ] Business hours cache doesn't cause inconsistencies

### User Errors
- [ ] Invalid input sanitized
- [ ] Helpful error messages shown
- [ ] Errors in correct language
- [ ] User can recover from errors
- [ ] No app crash from user error

### Data Persistence Issues
- [ ] LocalStorage quota exceeded handled
- [ ] SessionStorage quota exceeded handled
- [ ] Corrupt localStorage data handled
- [ ] Missing data restored with defaults

---

## 📱 Responsive & Cross-Browser

### Mobile (< 640px)
- [ ] All modals/pickers fill screen appropriately
- [ ] Touch targets ≥ 44px
- [ ] Text readable without zoom
- [ ] Scrolling works smoothly
- [ ] No horizontal overflow
- [ ] Forms usable with on-screen keyboard
- [ ] Dropdowns accessible

### Tablet (640px - 1024px)
- [ ] 2-column layouts display correctly
- [ ] Modals sized appropriately
- [ ] Touch and mouse both work
- [ ] Navigation easy

### Desktop (> 1024px)
- [ ] Hover effects work
- [ ] Click targets appropriate
- [ ] Modals centered and sized well
- [ ] No wasted space

### Browser Compatibility
- [ ] **Chrome (latest)**
  - [ ] All features work
  - [ ] No console errors
  - [ ] Animations smooth

- [ ] **Safari (latest)**
  - [ ] All features work
  - [ ] Date/time pickers work
  - [ ] No console errors

- [ ] **Firefox (latest)**
  - [ ] All features work
  - [ ] No console errors

- [ ] **Mobile Safari (iOS)**
  - [ ] Touch interactions work
  - [ ] Native pickers work
  - [ ] No layout issues

- [ ] **Mobile Chrome (Android)**
  - [ ] Touch interactions work
  - [ ] Native pickers work
  - [ ] No layout issues

---

## ♿ Accessibility

### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Tab order logical
- [ ] Focus visible (outline/ring)
- [ ] Can complete all tasks with keyboard only
- [ ] Escape closes modals
- [ ] Enter submits forms

### Screen Readers
- [ ] All buttons have labels
- [ ] Form fields have labels
- [ ] Error messages announced
- [ ] Status changes announced
- [ ] ARIA labels present where needed
- [ ] Content structure semantic

### Visual Accessibility
- [ ] Color contrast ≥ 4.5:1 (WCAG AA)
- [ ] Text scalable to 200%
- [ ] No loss of functionality when zoomed
- [ ] High contrast mode works

### Motion & Animations
- [ ] Reduced motion preference respected
- [ ] Animations can be disabled
- [ ] No auto-playing videos/carousels
- [ ] Motion necessary for understanding

---

## ⚡ Performance

### Load Time
- [ ] Page loads in < 3 seconds (3G)
- [ ] JavaScript bundles optimized
- [ ] CSS minified
- [ ] Images optimized

### Runtime Performance
- [ ] No janky animations (60fps)
- [ ] Smooth scrolling
- [ ] Quick interactions (< 100ms)
- [ ] No memory leaks on long sessions

### API Performance
- [ ] Cart updates fast (< 500ms)
- [ ] Zone selection fast
- [ ] Business hours check cached
- [ ] Minimal redundant API calls

### Bundle Size
- [ ] JavaScript bundle reasonable (< 100KB per module)
- [ ] CSS bundle reasonable
- [ ] No unused code shipped
- [ ] Tree-shaking working

---

## 🌐 Internationalization (RTL)

### Arabic (RTL) Layout
- [ ] All layouts mirror correctly
- [ ] Text aligned right
- [ ] Icons flipped where appropriate
- [ ] Animations reverse direction
- [ ] Date/time formats localized

### English (LTR) Layout
- [ ] Text aligned left
- [ ] Layouts standard LTR
- [ ] All elements positioned correctly

### Multi-Language
- [ ] Language switching works
- [ ] All text translates
- [ ] No hardcoded English strings
- [ ] Salla translations integrated

---

## 🧪 Test Results

### Test Session Information
**Date:** ___________________
**Tester:** Agent 04 (Features Engineer)
**Environment:** Development / Staging / Production
**Browser:** ___________________
**OS:** ___________________
**Screen Size:** ___________________

### Summary Statistics
- **Total Tests:** ___ / ___
- **Passed:** ___ / ___
- **Failed:** ___ / ___
- **Skipped:** ___ / ___
- **Blocked:** ___ / ___

### Pass/Fail Criteria
- ✅ **PASS** if ≥ 95% of tests pass
- ⚠️ **PASS WITH WARNINGS** if 90-94% pass (minor issues)
- ❌ **FAIL** if < 90% pass (requires fixes)

### Overall Status
**Result:** ☐ PASS | ☐ PASS WITH WARNINGS | ☐ FAIL

---

## 🐛 Issues Found

### Critical Issues (Blockers)
| # | System | Description | Steps to Reproduce | Expected | Actual |
|---|--------|-------------|-------------------|----------|--------|
| 1 |        |             |                   |          |        |
| 2 |        |             |                   |          |        |

### Major Issues (Must Fix)
| # | System | Description | Steps to Reproduce | Expected | Actual |
|---|--------|-------------|-------------------|----------|--------|
| 1 |        |             |                   |          |        |
| 2 |        |             |                   |          |        |

### Minor Issues (Should Fix)
| # | System | Description | Steps to Reproduce | Expected | Actual |
|---|--------|-------------|-------------------|----------|--------|
| 1 |        |             |                   |          |        |
| 2 |        |             |                   |          |        |

### Enhancements (Nice to Have)
| # | System | Description | Benefit |
|---|--------|-------------|---------|
| 1 |        |             |         |
| 2 |        |             |         |

---

## 📝 Notes

### Observations
_Document any interesting findings, patterns, or insights during testing._

---

### Recommendations
_Suggest improvements or follow-up actions based on test results._

---

### Next Steps
1. [ ] Fix critical issues
2. [ ] Fix major issues
3. [ ] Re-test failed scenarios
4. [ ] Document workarounds for known issues
5. [ ] Update user documentation
6. [ ] Plan minor issue fixes for next sprint
7. [ ] Submit completion report to Agent 01

---

## ✅ Sign-Off

**Tested By:** _____________________
**Date:** _____________________
**Signature:** _____________________

**Reviewed By:** Agent 01 (System Architect)
**Date:** _____________________
**Approval:** ☐ Approved | ☐ Approved with Conditions | ☐ Rejected

---

**Document Version:** 1.0
**Last Updated:** 2026-03-12
**Related Documents:**
- [Integration Test Suite](../tests/integration/restaurant-systems.test.js)
- [Component Guide](../docs/COMPONENTS-GUIDE.md)
- [Design System](../docs/DESIGN-SYSTEM.md)

---
name: hairgrow-code-review
description: >-
  Inspect and review HairGrow storefront code for functionality, potential bugs,
  form validation, error handling, security, accessibility, and code quality.
  Use when conducting reviews of React components, cart/checkout logic, or customer-facing flows.
---

# HairGrow Code Review Skill

This skill provides a standardized, rigorous code review process for the **HairGrow Storefront** project. Follow this checklist to deliver actionable, evidence-based code reviews without inventing issues or proposing unnecessary architectural rewrites.

---

## 1. Pre-Review Inspection Phase

Before producing review comments:
1. **Locate Target Files**: Identify the exact source files, styles, and configurations involved in the feature or flow under review.
2. **Inspect Existing Code**: Read the entire component or function context (including imports, props, local state, hooks, and event handlers).
3. **Trace Data & State Flow**: Follow inputs from user interactions down through component state, persistence mechanisms (`localStorage`), and UI rendering.
4. **Identify Dependencies**: Check external libraries (e.g., `lucide-react`, React hooks) and CSS styling rules (`styles.css`, `theme.css`).

---

## 2. Review Dimensions & Verification Checklist

### A. Functional Correctness & Edge Cases
- **State Integrity**: Verify state updates handle previous values properly (functional state updates `setCart(prev => ...)` when dependent on previous state).
- **Boundary Handling**: Check min/max boundaries (e.g., product quantity between 1 and 99, 0 items in cart, empty strings in inputs).
- **Lifecycle & Listeners**: Ensure event listeners (keyboard shortcuts like `Escape`, window clicks) clean up properly in `useEffect` return functions.
- **Calculations**: Validate pricing, subtotal, and discount calculations against potential floating-point errors (PKR currency is integer-based).

### B. Validation, Error Handling & Security
- **Form Inputs**: Verify all required fields (customer name, WhatsApp phone number, shipping address) have clear regex/length validation and trim whitespace.
- **Sanitization & Escaping**: Confirm user inputs cannot execute arbitrary scripts or break layout formatting.
- **Storage Resilience**: Check that `localStorage` or `sessionStorage` reads and writes are wrapped in safe `try/catch` blocks to prevent crashes in private/incognito browsing or disabled cookies mode.
- **Graceful Failure**: Verify that missing images, empty arrays, or failed actions fail gracefully without breaking the user view.

### C. Accessibility (a11y) & UX Integrity
- **Interactive Semantics**: Ensure buttons have accessible labels (`aria-label`), modal/dialog overlays implement `aria-modal="true"`, and escape keys close overlays.
- **Live Regions**: Ensure dynamic counters (such as cart badge and item tallies) use `aria-live="polite"`.
- **Keyboard Navigation**: Ensure inputs and buttons are focusable and manage focus logically upon opening/closing drawers and modals.

### D. Code Quality, Cleanliness & Maintainability
- **Simplicity**: Ensure code is clean, readable, and avoids unnecessary abstractions or complex external dependencies.
- **Separation of Concerns**: Check whether giant monolithic components should be subdivided into focused subcomponents.
- **Dead Code**: Ensure no unused imports, lingering `console.log` statements, or commented-out code remain.

---

## 3. Reporting Protocol & Output Structure

Always structure findings using the following strict format:

1. **Review Scope**: File path(s) and specific feature/flow reviewed.
2. **Summary Rating**: Overall health (e.g., `Production Ready`, `Ready with Minor Improvements`, or `Action Required`).
3. **Specific Findings**:
   - **Severity**: `[Critical]`, `[Warning]`, or `[Suggestion]`
   - **Location**: `File:Line` (e.g., `src/App.jsx:683-698`)
   - **Evidence**: Quote the exact lines of code.
   - **Impact**: Explain clearly what happens in runtime or UX.
   - **Recommended Fix**: Provide a clear, minimal code snippet or solution.
4. **Positive Highlights**: Note what is done well (e.g., clean accessibility, responsive design, robust state handling).

### Guardrails:
- **Do not invent issues**: Only flag bugs or improvements that exist in the inspected code.
- **No subjective churn**: Do not suggest purely cosmetic changes or personal style preferences if existing code follows project standards.


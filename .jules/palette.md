## 2025-05-15 - [Accessibility Baseline]
**Learning:** Icon-only buttons without ARIA labels are invisible to screen readers, and default focus outlines are often removed for "cleaner" UI but break keyboard navigation.
**Action:** Always include `aria-label` for icon-only buttons and implement high-contrast `focus-visible` rings. Use `focus-within` on containers to provide visual feedback for nested inputs.

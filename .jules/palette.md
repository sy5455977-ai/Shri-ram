## 2025-05-15 - [Themed Modals for Destructive Actions]
**Learning:** Using themed `Modal` components instead of native `window.confirm` provides a more consistent user experience and allows for better alignment with the app's visual language and accessibility standards.
**Action:** Always prefer state-driven themed modals for critical user confirmations to ensure they are accessible (ARIA labels, focus management) and aesthetically integrated.

## 2025-05-15 - [Accessibility for Icon-Only Buttons]
**Learning:** Icon-only buttons often lack accessible names for screen readers and visible focus indicators for keyboard users, making them inaccessible.
**Action:** Ensure all icon-only buttons have descriptive `aria-label` attributes and use `focus-visible:ring-2` to provide clear visual feedback during navigation.

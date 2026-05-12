## 2025-05-15 - [Themed Confirmation Modals & ARIA Labels]
**Learning:** Replacing browser-native `window.confirm` with themed `Modal` components significantly improves visual consistency and allows for better branding of destructive actions. Additionally, icon-only buttons are invisible to screen readers without explicit `aria-label` attributes.
**Action:** Always prefer the project's `Modal` component over `window.confirm` for critical actions and ensure every icon-only button has a descriptive `aria-label`.

## 2025-05-14 - Replace Browser Confirm with Custom Modals
**Learning:** Browser-native `window.confirm` breaks the immersive experience of a custom-themed AI app and lacks styling consistency.
**Action:** Always replace native confirmation dialogs with the project's themed `Modal` component to maintain visual unity and UX flow.

## 2025-05-14 - Accessibility for Icon-only Buttons
**Learning:** Icon-only buttons are invisible to screen readers without explicit `aria-label` or `title` attributes.
**Action:** Ensure all icon-only buttons (Sidebar toggles, Copy, Regenerate, Send) have descriptive `aria-label` attributes for WCAG compliance.

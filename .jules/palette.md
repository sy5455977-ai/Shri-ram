## 2026-05-10 - [Enhanced Deletion UX and Accessibility]
**Learning:** Browser-native `window.confirm` breaks the visual immersion of themed applications. Replacing it with a state-driven custom `Modal` improves brand consistency and user delight. Adding `aria-label` and `focus-visible` rings ensures that these interactions are accessible to all users.
**Action:** Always prioritize custom themed modals over native dialogs for destructive actions, and ensure every interactive icon-only button has a descriptive `aria-label`.

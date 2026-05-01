## 2025-05-15 - Accessible Modals and Icon Buttons
**Learning:** Screen readers require explicit roles and labels to interpret non-semantic UI elements correctly. A modal without `role="dialog"` or an icon-button without `aria-label` is invisible or confusing to assistive technologies.
**Action:** Always use `useId` to link modal titles to `aria-labelledby` and provide descriptive `aria-label` attributes to all icon-only interactive elements.

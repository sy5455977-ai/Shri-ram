## 2026-06-08 - [VisionMode Copy Feature & Accessibility]
**Learning:** Icon-only buttons (like 'Capture' or 'Reset') often lack descriptive ARIA labels, making them unusable for screen reader users. Adding `focus-visible` rings is essential for keyboard navigation in custom-styled UIs where default outlines are often suppressed.
**Action:** Always pair icon-only buttons with `aria-label` and ensure interactive elements have clear `focus-visible` states.

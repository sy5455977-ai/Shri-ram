## 2025-05-14 - [Accessibility: Hidden Action Buttons]
**Learning:** Using `opacity-0` on action containers without `group-focus-within:opacity-100` or equivalent makes interactive elements (Copy, Regenerate, Delete) invisible and inaccessible to keyboard users, even though they remain in the tab order.
**Action:** Always pair hover-based visibility (`group-hover:opacity-100`) with focus-based visibility (`group-focus-within:opacity-100`) and ensure icon-only buttons have descriptive `aria-label` attributes and visible focus rings.

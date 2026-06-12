## 2025-05-15 - [VisionMode Copy Feature & Accessibility]
**Learning:** Icon-only buttons in complex AI modes (like Vision) require explicit ARIA labels and focus states to be usable by screen reader and keyboard users; adding a transient "Copied" state provides essential visual feedback for async clipboard actions.
**Action:** Always pair `aria-label` with `title` for icon-only buttons and implement `aria-pressed` for mode/task selectors to communicate active state programmatically.

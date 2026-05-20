## 2025-05-15 - [Vision Mode A11y & Utility]
**Learning:** Icon-only buttons in complex AI interfaces (like Vision mode) require explicit `aria-label` and `focus-visible` states to be discoverable by keyboard and screen reader users. Adding a "Copy to Clipboard" with immediate visual feedback (`Check` icon toggle) significantly reduces user friction when working with long AI analysis results.
**Action:** Always wrap task-switching button groups in `role="group"` with a descriptive `aria-label` and use `aria-pressed` to communicate the active state of toggles.

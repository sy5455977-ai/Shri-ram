## 2025-05-14 - Standardized Accessibility for Interactive Elements
**Learning:** Icon-only buttons (like those for Copy, Regenerate, Attach Image) are common in this app but lacked descriptive ARIA labels and clear visual focus indicators, making them inaccessible to keyboard and screen-reader users.
**Action:** Always apply `aria-label` and `focus-visible:ring-2 focus-visible:ring-nexus-primary outline-none` to interactive elements to ensure a consistent, accessible experience across the app.

## 2025-05-14 - Container-Level Focus Feedback
**Learning:** For complex inputs (like the chat text area with attachment/mode buttons), adding focus feedback to the parent container using `focus-within:ring-2` provides a better visual experience than individual component focus states.
**Action:** Use `focus-within` on input groups to highlight the entire active interaction area while keeping individual element outlines suppressed with `outline-none`.

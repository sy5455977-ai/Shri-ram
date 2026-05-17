## 2025-05-22 - Keyboard Discoverability for Hover-Only Actions
**Learning:** Actions hidden behind hover (e.g., `opacity-0 group-hover:opacity-100`) are inaccessible to keyboard users unless they also implement focus-based visibility.
**Action:** Always include `focus-visible:opacity-100` alongside hover-based visibility classes and ensure the interactive element has a proper focus indicator (e.g., `focus-visible:ring-2`).

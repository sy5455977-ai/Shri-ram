## 2025-05-22 - Keyboard Visibility for Hover-Only Actions
**Learning:** Actions hidden by `opacity-0` and only shown on `group-hover` are inaccessible to keyboard users unless they are also shown on `focus-within` or `focus-visible`. Pairing `group-hover:opacity-100` with `focus-within:opacity-100` ensures that tabbing through messages reveals the available interactions (Copy, Regenerate).
**Action:** Always pair hover-based visibility transitions with focus-based ones for interactive elements.

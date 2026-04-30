## 2025-05-15 - Improving keyboard visibility for hover-only actions
**Learning:** Actions hidden by `opacity-0` until parent hover (like delete buttons in lists) are inaccessible to keyboard users unless explicitly shown on focus.
**Action:** Always add `focus:opacity-100` (for the button itself) or `focus-within:opacity-100` (for containers) to elements that rely on `group-hover:opacity-100` for visibility. Combine with `focus-visible:ring-2` for a clear focus indicator.

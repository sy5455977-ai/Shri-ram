## 2025-05-21 - [Keyboard Discoverability for Hover-Only Actions]
**Learning:** Interactive elements that are hidden by default (e.g., via `opacity-0`) and only revealed on hover (e.g., via `group-hover:opacity-100`) are inaccessible to keyboard-only users unless they also implement a focus-triggered visibility state.
**Action:** Always include `focus-visible:opacity-100` alongside `group-hover:opacity-100` to ensure action icons (like delete buttons) are revealed and usable when focused via keyboard.

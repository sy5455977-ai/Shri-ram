## 2025-05-14 - Accessible Hover Actions
**Learning:** The application frequently uses `opacity-0 group-hover:opacity-100` to hide action buttons (like delete or copy) until hover. This makes them inaccessible to keyboard-only users who cannot trigger the hover state.
**Action:** Always complement `group-hover:opacity-100` with `focus-within:opacity-100` (on the container) or `focus-visible:opacity-100` (on the button) to ensure these actions are visible when navigating via keyboard.

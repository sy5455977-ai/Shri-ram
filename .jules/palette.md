## 2025-05-13 - Replace window.confirm with Modal for Deletion
**Learning:** Using browser-native 'window.confirm' creates a jarring UX break and is not easily accessible via keyboard-only navigation when the trigger button is hidden on hover.
**Action:** Always prefer themed, state-driven Modals for destructive actions. Ensure the trigger button (e.g., Delete) is visible on focus (using focus-within or focus-visible) to support keyboard users.

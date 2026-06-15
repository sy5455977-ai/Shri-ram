## 2025-05-15 - Accessible Hover Actions
**Learning:** Icon-only buttons that are hidden by default (e.g., using `opacity-0` on a parent hover) must be paired with `focus-visible:opacity-100` or `group-focus-within:opacity-100` to ensure keyboard users can identify and interact with the action when it receives focus.
**Action:** Always include focus-visible visibility states for any elements that are hidden until hover in the Nexus AI design system.

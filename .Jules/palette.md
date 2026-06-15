## 2026-06-15 - [Accessible Interactive List Items]
**Learning:** Icon-only buttons that are conditionally visible (e.g., only on hover) are inaccessible to keyboard and screen reader users unless they are explicitly forced into visibility on focus. Using `group-focus-within:opacity-100` and `focus-visible:opacity-100` ensures these actions are discoverable and usable without a mouse.
**Action:** Always pair hover-based visibility for actions with focus-based visibility and clear ARIA labels for icon-only buttons.

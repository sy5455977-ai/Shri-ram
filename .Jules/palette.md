## 2026-06-16 - [Keyboard Accessibility for Hidden Buttons]
**Learning:** Icon-only buttons that are hidden by default (e.g., using `opacity-0`) must be paired with `focus-visible:opacity-100` to ensure keyboard users can see and interact with the action.
**Action:** Always include `focus-visible:opacity-100` and a focus ring when using hover-only actions.

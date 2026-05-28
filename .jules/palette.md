## 2025-05-14 - Accessible Sidebar Actions
**Learning:** Found a recurring pattern where destructive actions (delete buttons) in the sidebar were only visible on hover (`opacity-0 group-hover:opacity-100`). This makes them completely inaccessible to keyboard-only users as they remain invisible even when focused.
**Action:** Always pair `group-hover:opacity-100` with `focus-visible:opacity-100` for actions that are visually hidden by default, and ensure they have descriptive `aria-label` attributes and clear focus indicators.

## 2025-05-15 - Discoverability of Hover-Only Actions
**Learning:** Icon-only buttons that are hidden by default (e.g., via `opacity-0` on a list item group hover) are inaccessible to keyboard users unless they also implement `focus-visible:opacity-100`. This pattern was identified in conversation and reminder lists.
**Action:** Always ensure that any action revealed on hover is also revealed on focus for keyboard-only users.

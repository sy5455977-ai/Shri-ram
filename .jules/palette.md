## 2026-05-31 - [Vision Mode Accessibility & Utility]
**Learning:** Icon-only buttons that provide temporary feedback (like 'Copy') must have their `aria-label` updated dynamically to reflect the state change (e.g., "Copied to clipboard") so screen reader users receive immediate confirmation of the action's success.
**Action:** Implement conditional `aria-label` alongside icon transitions for all temporary state feedback buttons.

**Learning:** Grouping related mode-selection buttons under `role="group"` with a descriptive `aria-label` provides essential context for screen reader users, helping them understand the relationship between the buttons.
**Action:** Always wrap segmented controls or task switchers in a labeled group.

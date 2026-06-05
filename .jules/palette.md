## 2026-06-05 - [Accessible Hidden Actions]
**Learning:** Icon-only buttons with 'opacity-0' (visible only on hover) are inaccessible to keyboard users unless 'focus-visible:opacity-100' is also applied.
**Action:** Always pair 'group-hover:opacity-100' with 'focus-visible:opacity-100' for hidden-by-default action buttons.

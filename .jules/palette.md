## 2026-06-02 - Accessible Feedback Loops
**Learning:** Providing immediate visual and audible (via ARIA) feedback for clipboard actions (icon swap + aria-label update) significantly improves the perceived responsiveness of "invisible" background tasks.
**Action:** Always pair icon-only button state changes with corresponding `aria-label` or `aria-live` updates to ensure screen reader users are notified of successful actions.

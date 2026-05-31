## 2025-05-14 - Inclusive Feedback Patterns
**Learning:** When providing temporary UI feedback (e.g., changing 'Copy' icon to 'Check'), updating the `aria-label` simultaneously is critical to ensure screen reader users receive state updates reflecting the action's success.
**Action:** Always pair visual state transitions (like icon swaps) with dynamic ARIA attribute updates to maintain accessibility during transient UI states.

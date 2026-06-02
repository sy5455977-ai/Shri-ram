## 2025-05-15 - [VisionMode Copy Feedback]
**Learning:** When providing temporary UI feedback (e.g., changing 'Copy' icon to 'Check'), updating the `aria-label` simultaneously ensures screen reader users receive immediate state updates reflecting the action's success.
**Action:** Always synchronize `aria-label` with visual state changes in feedback-driven interactive elements.

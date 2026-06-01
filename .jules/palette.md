## 2025-05-15 - [VisionMode] State Synchronization for UI Feedback
**Learning:** When providing temporary UI feedback (like a "Copied" checkmark), it is crucial to reset this feedback state when the underlying data is cleared (e.g., via a "Reset" or "Clear" action). This prevents a stale "Success" state from persisting when the context has changed, which could confuse the user if they perform the action again.
**Action:** Always include state resets for UI feedback flags in the primary 'reset' or 'clear' handlers of a component.

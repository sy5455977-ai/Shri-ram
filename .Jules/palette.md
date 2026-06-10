## 2025-05-15 - State Synchronization in Transient UI Feedback
**Learning:** Transient UI feedback states (like "Copied!" or "Success") must be explicitly reset when the underlying content or mode changes (e.g., resetting the camera or switching tasks) to prevent displaying stale success indicators for new or missing content.
**Action:** Always include reset logic for feedback states in component-level 'reset' or 'cleanup' functions to maintain UI state integrity.

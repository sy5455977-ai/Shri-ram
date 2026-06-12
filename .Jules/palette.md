## 2025-05-15 - [Vision Result Copy & Accessibility]
**Learning:** Transient visual feedback (Copy -> Check icon) for 2 seconds is highly effective for confirmating asynchronous clipboard actions without intrusive toasts. Using `aria-pressed` on mode-switching buttons correctly communicates the active state to screen readers in a tab-like interface.
**Action:** Always implement a 2s icon-toggle feedback loop for copy buttons. Use `aria-pressed` for non-standard tab/mode switchers to maintain semantic clarity.

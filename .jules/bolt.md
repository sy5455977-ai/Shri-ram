
## 2026-06-16 - [Polling Reduction & Lazy Init]
**Learning:** Background polling intervals (setInterval) are often used for things that can be handled by event listeners or reactive dependencies. Replacing them significantly reduces idle CPU usage, especially on mobile devices where wake-ups are expensive. Lazy state initialization for values derived from DOM/window properties avoids redundant calculations during re-renders.
**Action:** Always check if a 'setInterval' can be replaced with 'window.addEventListener' (online/offline, storage, resize) or by adding dependencies to a 'useEffect' hook.

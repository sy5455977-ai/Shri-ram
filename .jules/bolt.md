## 2025-06-11 - Redundant Polling Intervals
**Learning:** Using `setInterval` to poll for state changes that can be tracked via event listeners (e.g., `window.online/offline`, `storage` events) or React dependency arrays leads to unnecessary CPU cycles, battery drain, and redundant re-renders. This is especially impactful in "always-on" dashboards or AI assistants.
**Action:** Always prefer event-driven updates (listeners) or stable React dependencies (e.g., `.length` for arrays) over fixed-interval polling.

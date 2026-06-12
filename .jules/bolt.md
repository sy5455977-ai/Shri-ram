
## 2025-03-24 - Replacing Polling with Event-Driven Updates
**Learning:** Background polling intervals (e.g., 5s, 10s) for state synchronization or health monitoring create unnecessary CPU wake-ups and re-renders, especially when the app is idle. Event listeners like 'online', 'offline', and 'storage' provide a more efficient, responsive way to handle these updates without the overhead of periodic timers.
**Action:** Always check if a periodic polling interval can be replaced by a native browser event or a more reactive approach in React to improve efficiency and reduce battery/CPU consumption.

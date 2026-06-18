## 2025-05-14 - [Event-Driven Optimization over Polling]
**Learning:** Replacing background polling intervals (`setInterval`) with event-driven updates (e.g., `online`/`offline` window events, `storage` listener) and reactive React effects provides immediate UI responses and significantly reduces background CPU activity. It avoids "timer starvation" and unnecessary wake-ups, particularly on mobile devices.
**Action:** Always check if a periodic check can be replaced by a native browser event or a reactive dependency in a `useEffect` hook before resorting to `setInterval`.

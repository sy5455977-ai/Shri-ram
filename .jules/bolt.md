## 2026-06-13 - Redundant Polling vs. Event-Driven Logic
**Learning:** Polling intervals (e.g., `setInterval`) for state that can be derived from events (like `online`/`offline` or `storage` events) or component props/state changes create unnecessary CPU wake-ups and redundant operations (like `JSON.parse` from `localStorage`).
**Action:** Replace intervals with event listeners and reactive `useEffect` hooks. Use lazy state initialization (`useState(() => ... )`) for values derived from the environment (e.g., `window.innerWidth`) to avoid re-evaluating them on every render.

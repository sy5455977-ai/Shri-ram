# BOLT'S JOURNAL - NEXUS AI PERFORMANCE

## 2025-05-13 - Redundant Intervals and Referential Instability

**Learning:** The application was running multiple background intervals (5s, 10s, 30s) that triggered re-renders or wasted CPU cycles. Specifically, polling `localStorage` with `JSON.parse` every 5 seconds created a new array reference on every tick, causing the entire `App` component and its children to re-render unnecessarily. Additionally, passing un-memoized handlers to memoized list items (`ConversationItem`) negated the benefits of `React.memo`.

**Action:** Replace polling intervals with event-driven updates (e.g., `online`/`offline` events for health checks) and reactive `useEffect` hooks. Always memoize handlers passed to memoized components using `useCallback`.

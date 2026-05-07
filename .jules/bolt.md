## 2026-05-07 - Prop Flattening & Callback Stabilization in ChatInterface
**Learning:** Passing top-level state (like 'messages' or 'activeId') or callbacks that depend on them to list items causes O(N) re-renders. Functional update patterns and 'prop flattening' (passing derived booleans) reduce this to O(1) or O(2) re-renders.
**Action:** Always prefer passing 'isActive' or 'isLast' booleans to list items instead of raw IDs or indexes. Use 'useRef' to stabilize callbacks that must access frequently changing state.

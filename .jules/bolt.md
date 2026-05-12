## 2025-05-14 - Optimized List Rendering and Message Lookup
**Learning:** O(N) re-renders in long lists (Chat, History) can be avoided by "prop flattening" - passing derived booleans (e.g., `isActive`, `isLast`) instead of raw IDs to memoized components. This ensures only affected items re-render when the active selection changes.
**Action:** Always flatten ID-based props into booleans when mapping over large arrays in React. Stabilize callbacks using `useCallback` with functional state updates to maintain O(1) re-render performance.

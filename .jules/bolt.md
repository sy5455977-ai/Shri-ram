## 2025-05-14 - [Optimize conversation list re-renders and filtering]
**Learning:** O(N) re-renders in long lists occur when components depend on a shared state (like an active ID) directly. Passing derived booleans (isActive) and stabilizing callbacks (useCallback) allows React.memo to work effectively.
**Action:** Use prop flattening (isActive instead of activeId) for list items and functional state updates in useCallback to decouple from local state.

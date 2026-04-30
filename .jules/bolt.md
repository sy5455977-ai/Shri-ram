## 2025-05-23 - React O(n) Re-render Optimization
**Learning:** Passing global state IDs (like `activeId` or `copiedId`) to all items in a list causes O(n) re-renders when those IDs change. Failing to memoize the context value in a Provider causes all consumers to re-render whenever any state in the provider changes.
**Action:** Use derived boolean flags (e.g., `isActive`, `isCopied`) for memoized list items. Wrap event handlers in `useCallback`. Memoize context value objects with `useMemo`.

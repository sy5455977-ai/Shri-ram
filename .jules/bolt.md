## 2025-05-15 - Sidebar Conversation List Optimization
**Learning:** Passing top-level state IDs (e.g., `activeConversationId`) to memoized list items causes all items to re-render whenever the active ID changes, even if only two items (the old and new active ones) actually need updating. Additionally, the `useLongPress` hook was causing effect churn by including the callback in its dependency array.

**Action:** Implement 'prop flattening' by passing derived booleans (e.g., `isActive`) instead of raw IDs to achieve O(1) re-renders for non-affected list items. Use `useRef` for callbacks in custom hooks like `useLongPress` to prevent unnecessary timer resets and effect churn when the parent component re-renders.

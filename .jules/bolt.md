## 2026-05-02 - O(n) List Re-render Bottleneck
**Learning:** Passing global state IDs (like `activeConversationId`) or indices to every item in a long list (like `MessageItem`) causes O(n) re-renders for O(1) state changes. Memoization with `React.memo` is bypassed because the ID/index prop comparison changes for all items when the active ID or list size changes.
**Action:** Always pass derived boolean flags (e.g., `isActive`, `isLast`) to list items. This ensures only the items whose status actually changed will re-render, achieving O(1) performance for most list operations.

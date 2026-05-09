## 2025-05-15 - [Chat Performance Optimization]
**Learning:** Passing derived booleans (e.g., `isLast`, `isCopied`) instead of raw IDs or indexes to memoized list items (like `MessageItem`) prevents O(N) re-renders. Additionally, using the `useRef` pattern to capture the latest messages state and the `handleSend` function allows `handleRegenerate` to remain a stable callback, further reducing unnecessary re-renders in child components.
**Action:** Always favor prop flattening and ref-based callback stabilization for high-frequency update components like chat messages.

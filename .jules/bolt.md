## 2025-05-15 - Stable Callbacks and Prop Flattening
**Learning:** In long-list components like chat interfaces, passing dynamic IDs or indices to memoized children (e.g., `MessageItem`) causes unnecessary $O(N)$ re-renders. Additionally, callbacks like `handleRegenerate` that depend on the entire list state can trigger mass re-renders if not stabilized.
**Action:** Use "Ref-syncing" to create stable callbacks and flatten props into boolean flags (e.g., `isLast`, `isCopied`) to ensure $O(1)$ re-renders when state changes.

## 2025-05-15 - Space-Efficient Search
**Learning:** Using `[...messages].reverse().find()` for backward search in React state creates an unnecessary array clone, leading to $O(N)$ space complexity.
**Action:** Use a manual backward `for` loop to achieve $O(1)$ space complexity for searching recently added items in a list.

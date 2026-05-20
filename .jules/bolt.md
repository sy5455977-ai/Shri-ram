## 2025-05-15 - Prop Flattening for List Memoization
**Learning:** Passing unstable props (like IDs or indices) to memoized list items causes $O(N)$ re-renders when the list grows or a single item's state changes. Refactoring to stable boolean flags (`isLast`, `isCopied`) isolates re-renders to only the affected items, moving performance from $O(N)$ to $O(1)$.
**Action:** Always prefer boolean flags derived in the parent's mapping function over passing dynamic IDs or indices to `React.memo` components.

## 2025-05-15 - Callback Stabilization via Ref-syncing
**Learning:** Memoizing callbacks with `useCallback` is often ineffective if they depend on frequently changing state (like chat input). This causes the callback to change identity on every keystroke, defeating memoization in children.
**Action:** Use a "Ref-syncing" pattern to mirror volatile state into refs, allowing callbacks to maintain stable references while still accessing the current state.

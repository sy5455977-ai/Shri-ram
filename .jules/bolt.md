## 2026-05-01 - Optimizing O(n) Re-renders in Message Lists
**Learning:** In React chat applications, passing global state (like `copiedId` or `messages.length`) directly to memoized list items causes the entire list to re-render whenever that state changes. Stabilizing callbacks with `useRef` (the "latest ref" pattern) and passing derived boolean flags (`isCopied`, `isLast`) ensures only the affected items re-render.
**Action:** Always prefer passing boolean flags derived from state to memoized list items rather than the state itself to maintain O(1) or O(k) re-render performance.

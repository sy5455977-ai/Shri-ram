## 2026-05-08 - O(N^2) Re-render Prevention
**Learning:** Passing unstable callbacks or non-flattened list-derived props (like `totalMessages` or `activeId`) to memoized list items causes all items to re-render whenever the list changes, leading to O(N^2) total work.
**Action:** Use `useRef` for stable callback access and flatten props into item-specific booleans (e.g., `isLast`, `isActive`).

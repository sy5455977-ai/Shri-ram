## 2025-05-15 - React List Rendering Anti-Pattern
**Learning:** In list-heavy React applications, passing volatile props like `activeId` or `totalCount` to memoized list items causes O(N) re-renders whenever any selection or count changes. This negates the benefit of `React.memo`.
**Action:** Use prop flattening to pass stable boolean flags (e.g., `isActive`, `isLast`) and stabilize callbacks using the Ref-syncing pattern to maintain O(1) re-render efficiency for list operations.

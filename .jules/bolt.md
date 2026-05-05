## 2025-05-14 - Prop Flattening for O(1) List Re-renders
**Learning:** Passing raw ID strings or list lengths to memoized components in a list causes all items to re-render when the selection or list size changes. By passing derived booleans (e.g., `isActive`, `isLast`), only the items transitioning those states re-render.
**Action:** Always prefer primitive booleans over complex IDs or indexes for memoized list items to achieve O(1) re-render performance.

## 2025-05-14 - Selective Callback Injection
**Learning:** Callbacks that depend on the entire list (like `handleRegenerate` which needs all messages) cause all list items to re-render whenever the list updates.
**Action:** Conditionally pass such callbacks only to the specific items that need them (e.g., `isLast ? handleRegenerate : undefined`) to prevent unnecessary re-renders of stable items.

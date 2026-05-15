## 2025-05-15 - Chat Interface Rendering Optimization
**Learning:** React performance bottlenecks in chat apps are often caused by unstable callbacks (handleSend, handleRegenerate) being recreated on every message update, forcing the entire message list to re-render. Prop flattening (using booleans like `isLast` instead of raw indices) and callback stabilization via `useRef` for the `messages` array are highly effective for maintaining O(1) re-renders for older messages.
**Action:** Always use stable boolean flags for list item components and stabilize heavy callbacks with `useRef` to prevent prop-drilling-induced re-render cascades.

## 2025-05-15 - Algorithmic Space Efficiency in Regenerate Logic
**Learning:** `[...messages].reverse().find()` creates a shallow copy and a new array, leading to O(n) space complexity. A manual backward `for` loop achieves O(1) space and is more efficient for large conversation histories.
**Action:** Use manual backward loops for searching the most recent items in history arrays.

## 2025-05-15 - Long Press Hook Stabilization
**Learning:** Custom hooks like `useLongPress` that use `setTimeout` with a `callback` dependency will reset their timer whenever the parent re-renders with a new inline function. Using a `callbackRef` pattern inside the hook prevents these unnecessary timer resets.
**Action:** Implement the `callbackRef` pattern in interaction hooks to ensure timer stability during parent re-renders.

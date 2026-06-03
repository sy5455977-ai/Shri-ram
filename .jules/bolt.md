## 2025-06-03 - Re-render Prevention via String Comparison
**Learning:** `JSON.parse` always returns a new object/array reference even if the underlying content is identical. When used inside polling mechanisms (like `setInterval` for `localStorage`), this triggers redundant React state updates and re-renders.
**Action:** Use a `useRef` to store and compare the raw stringified value before parsing and updating state.

## 2025-06-03 - Interval Persistence in Effects
**Learning:** Using an entire array/object as a dependency for a `useEffect` that sets up a `setInterval` causes the interval to be cleared and restarted on every state update (e.g., when message content changes). If updates happen faster than the interval duration, the interval never fires.
**Action:** Use stable primitives like `.length` as dependencies for polling effects if the logic only requires tracking collection size.

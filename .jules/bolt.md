# Bolt's Performance Journal

## 2025-06-01 - Optimizing App.tsx Re-renders
**Learning:** `JSON.parse` of `localStorage` data inside a polling `setInterval` triggers state updates and re-renders even if the data hasn't changed, because `JSON.parse` always returns a new object/array reference. Additionally, `React.memo` is bypassed if callbacks passed to the memoized component are not wrapped in `useCallback`.
**Action:** Use `useRef` to store the raw string from `localStorage` and compare before updating state. Wrap shared callbacks in `useCallback` to ensure `React.memo` effectively prevents re-renders. Use lazy state initialization for values derived from the environment (e.g., `window.innerWidth`).

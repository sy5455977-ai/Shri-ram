## 2025-05-15 - Redundant Polling vs. Event-Driven Reactivity
**Learning:** Background polling intervals (e.g., 5s, 10s) for system status and external state (localStorage) introduce unnecessary CPU wake-ups. React's useEffect combined with native window events (online/offline, storage) provides a zero-idle-cost alternative that is also more responsive.
**Action:** Always prefer native event listeners (online, visibilitychange, storage) or reactive state dependencies over setInterval for monitoring system or application state.

## 2025-05-15 - Prop Narrowing for Memoized Lists
**Learning:** Passing a global 'activeId' or a full state object to components wrapped in React.memo causes every item in a list to re-render when the selection changes. Narrowing the prop to a primitive boolean (e.g., 'isActive') ensures that only the two affected items (the previously active and newly active) undergo the reconciliation process.
**Action:** When mapping over lists of memoized components, derive the active/selected state in the parent and pass it as a boolean to the child.

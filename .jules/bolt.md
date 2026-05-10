## 2025-05-15 - [React List Rendering Optimization]
**Learning:** Passing volatile props (like `copiedId` or `totalMessages`) to memoized list items causes O(N) re-renders when any item changes or a new item is added.
**Action:** Flatten props to derived booleans (e.g., `isCopied`, `isLast`) to achieve O(1) re-renders for list updates.

## 2025-05-15 - [Callback Stability with messagesRef]
**Learning:** Including a large state array (like `messages`) in `useCallback` dependencies causes the callback to be recreated on every update, which can trigger downstream re-renders.
**Action:** Use a `useRef` (e.g., `messagesRef`) to keep a stable reference to the latest data, allowing callbacks to remain stable while still accessing current state.

## 2025-05-15 - [O(1) Space Search]
**Learning:** Using `[...array].reverse().find()` for searching the most recent item creates a full copy and reverses it (O(N) time and space).
**Action:** Use a manual backward for-loop to find the item in O(N) time but O(1) space.

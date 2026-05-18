## 2025-05-14 - Initial Performance Audit
**Learning:** Component re-renders in `App.tsx` and `ChatInterface.tsx` are currently O(N) because `React.memo` components (`ConversationItem`, `MessageItem`) receive non-primitive or unstable props (like global IDs or state-dependent callbacks).
**Action:** Transition to "Prop Flattening" (passing booleans like `isActive`, `isLast` instead of IDs) and "Ref-syncing" for callbacks to ensure O(1) re-renders when state updates.

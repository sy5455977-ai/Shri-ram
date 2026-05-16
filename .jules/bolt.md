# Bolt's Journal - Critical Performance Learnings

## 2025-05-14 - Initializing Bolt Journal
**Learning:** React performance can be significantly improved by stabilizing callbacks and flattening props passed to memoized components.
**Action:** Always look for opportunities to use `useRef` for stabilizing dependencies in `useCallback` and prefer primitive props over complex objects for better `React.memo` efficiency.

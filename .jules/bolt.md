## 2025-05-31 - Route-based Code Splitting for Multi-Mode UI
**Learning:** High-level feature modules (Chat, Voice, Vision) were bundled into a single entry point, causing a ~1.3MB initial payload. Code-splitting these components via React.lazy reduced the main chunk to ~117kB.
**Action:** Always evaluate if distinct UI "modes" or "tabs" can be lazy-loaded to optimize Time to Interactive (TTI) without sacrificing transitions when using AnimatePresence.

## 2025-05-15 - [Component Code-Splitting]
**Learning:** While code-splitting reduces bundle size, lazy-loading the primary feature can increase Time-to-Interactive (TTI) for that specific feature; prioritizing static imports for the landing view and dynamic imports for secondary views optimizes the overall user experience.
**Action:** Use `React.lazy` and `Suspense` for large secondary features while keeping the initial viewport/primary feature statically imported to minimize perceived latency.

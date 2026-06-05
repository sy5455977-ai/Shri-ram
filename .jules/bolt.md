# Bolt Performance Journal

## 2025-05-22 - Performance Baseline
**Learning:** Initial bundle size is ~1.3MB. The application loads all feature modules (Chat, Voice, Vision) upfront, which delays Time to Interactive (TTI).
**Action:** Implement code-splitting for main feature components to reduce initial bundle size.

## 2025-05-22 - Bundle Size Reduction via Code-Splitting
**Learning:** Code-splitting heavy feature components (Chat, Voice, Vision) reduced the main bundle size from 1.3MB to ~1.15MB. This improves initial load performance and TTI by deferring the loading of non-critical modules until they are needed.
**Action:** Use `React.lazy` and `React.Suspense` for modular feature components in `App.tsx`.

## 2025-05-25 - Bundle Size Optimization via Code-Splitting
**Learning:** The initial bundle size was ~1.3MB, largely due to heavy components like `ChatInterface`, `VoiceMode`, and `VisionMode` being imported statically in `App.tsx`. In a Vite-based project, this significantly impacts the initial "Time to Interactive" (TTI).
**Action:** Implement `React.lazy` and `React.Suspense` for large mode-specific components in the main entry point to decouple them from the initial bundle. This reduced the main entry point size to ~117kB, an order of magnitude improvement.

## 2025-05-14 - Accessible Task Switchers and Focus Indicators
**Learning:** In high-tech AI interfaces, interactive elements often lack clear focus states and semantic grouping for task-specific modes. Using `aria-pressed` on toggle buttons and wrapping mode switchers in `role="group"` with a descriptive `aria-label` significantly improves screen reader navigation and context.
**Action:** Always apply `focus-visible:ring-2 focus-visible:ring-nexus-primary` for theme-consistent keyboard visibility and use `aria-pressed` for mode/task toggles.

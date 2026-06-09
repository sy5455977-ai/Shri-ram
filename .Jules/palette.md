# Palette UX Journal - Critical Learnings

## 2025-05-15 - Initial Audit
**Learning:** Found several icon-only buttons without ARIA labels in `VisionMode.tsx` and `App.tsx`. Accessibility for keyboard users can be improved by adding focus-visible states.
**Action:** Always pair icon-only buttons with `aria-label` and `focus-visible` ring styles.

## 2026-05-16 - Themed Deletion Modal & Accessibility Baseline
**Learning:** Replacing native `window.confirm` with a themed `Modal` significantly improves the visual consistency of the application. Icon-only buttons were missing `aria-label` and `focus-visible` indicators, which are critical for keyboard and screen reader accessibility.
**Action:** Always check icon-only buttons for ARIA labels and ensure destructive actions use themed confirmation dialogs.

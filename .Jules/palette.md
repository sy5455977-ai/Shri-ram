## 2025-05-22 - [Themed Modals & Accessibility Baseline]
**Learning:** Replacing native `window.confirm` with themed `Modal` components significantly improves perceived application quality and brand consistency. Accessibility is not just about screen readers; `focus-visible` styles are essential for keyboard users to navigate complex UIs like sidebars.
**Action:** Always prioritize `aria-label` for icon-only buttons and implement `focus-within` patterns for complex input containers (like chat bars) to ensure a consistent focus state.

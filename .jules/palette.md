## 2025-05-14 - [Modal Accessibility and UX Consistency]
**Learning:** Reusable components like Modals should use `React.useId()` to robustly link titles and descriptions for screen readers, avoiding ID collisions. Additionally, replacing browser-native `window.confirm` with custom themed Modals significantly improves visual consistency and the "premium" feel of the app.
**Action:** Always prefer `React.useId()` for ARIA attributes in new UI components and audit legacy `window.confirm` usage.

## 2025-05-14 - [Error Boundary Implementation]
**Learning:** React Error Boundaries must be implemented as Class Components. Functional components with `window` error listeners are not a valid replacement as they cannot catch rendering errors within the React lifecycle.
**Action:** Maintain Error Boundaries as Class Components even when refactoring other parts of the app to functional components.

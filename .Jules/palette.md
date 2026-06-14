## 2025-05-14 - Modal Accessibility Standards
**Learning:** Modern web modals require explicit ARIA attributes (`role="dialog"`, `aria-modal="true"`) and semantic ID links (`aria-labelledby`, `aria-describedby`) to be properly announced by screen readers. Custom-themed applications often lack default browser focus indicators, making `focus-visible` rings essential for keyboard accessibility.
**Action:** Always implement the WAI-ARIA Dialog pattern for modal components and verify that all interactive elements have distinct `focus-visible` styles.

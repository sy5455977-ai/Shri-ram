## 2025-05-15 - Enhancing Keyboard Visibility for Hover-only Elements
**Learning:** Elements using `opacity-0` for hover-only visibility (like delete or action buttons) are completely invisible to keyboard-only users who rely on focus.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100`, `focus:opacity-100`, or `group-focus-within:opacity-100` to ensure interactive elements are discoverable and usable via keyboard navigation.

## 2025-05-15 - Semantic Modal Accessibility
**Learning:** Custom modals without proper ARIA roles (`dialog`, `aria-modal`) and labeled relationships (`aria-labelledby`) are perceived as flat content by screen readers, leading to poor navigation context.
**Action:** Use `React.useId()` to associate the modal title with the dialog container and explicitly define `role="dialog"` and `aria-modal="true"`.

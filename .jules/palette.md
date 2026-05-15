## 2026-05-15 - [Themed Modal Deletion]
**Learning:** Replacing native `window.confirm` with a themed `Modal` component significantly improves visual consistency and allows for better branding and UX control, though it requires managing additional state for the item being deleted.
**Action:** Always prefer design-system-aligned modals over native browser dialogs for a professional feel.

## 2026-05-15 - [Accessible Hidden Actions]
**Learning:** Icon-only buttons that are hidden by default (e.g., `opacity-0` on a list item hover) must explicitly handle `focus-visible` by becoming visible when tabbed to, ensuring keyboard users can discover and use them.
**Action:** Use `focus-visible:opacity-100` alongside `group-hover:opacity-100` for hidden action buttons.

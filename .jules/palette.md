## 2025-05-14 - Accessible Modal Component
**Learning:** Screen readers require explicit roles and associations to announce modal dialogs correctly. Using `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` linked to the title provides the necessary context.
**Action:** Always use `useId` to generate stable, unique IDs for `aria-labelledby` in reusable modal components.

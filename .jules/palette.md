## 2025-05-15 - [Themed Confirmation Modals]
**Learning:** Replacing native `window.confirm` with a themed `Modal` significantly improves visual consistency and allows for integrated success/error feedback (toasts) within the same interaction flow. It also avoids blocking the main thread unlike native dialogs.
**Action:** Prefer the application's `Modal` component for all destructive actions to maintain design system integrity and provide a smoother user experience.

## 2025-05-15 - [Contextual ARIA Labels in Lists]
**Learning:** For destructive actions in a list (like deleting a conversation), generic labels like "Delete" are insufficient for screen readers. Including the item's title in the label (e.g., `aria-label={`Delete ${conv.title}`}`) provides essential context for non-visual users.
**Action:** Always include item identifiers in ARIA labels for repetitive list actions.

## 2025-05-15 - Modal-based Deletion Confirmation
**Learning:** Replacing native browser `window.confirm` with a themed `Modal` significantly improves design consistency and user trust, especially in a dark-themed high-tech UI like NEXUS AI.
**Action:** Always prefer state-driven themed modals for destructive actions and accompany them with success/error toast notifications for clear feedback.

## 2025-05-15 - Focused Accessibility
**Learning:** Adding `aria-label` and `focus-visible:ring-2` to icon-only buttons is a high-impact, low-effort way to meet accessibility standards without altering the visual design for mouse users.
**Action:** Audit all icon-only buttons (Sidebar toggles, New Chat, Logout) and ensure they have descriptive labels and clear focus states.

## 2025-05-15 - [Enhanced Accessibility with ARIA Labels and Modal Roles]
**Learning:** Icon-only buttons (like those for sidebar toggling, copying, and regenerating) are invisible to screen readers without explicit `aria-label` attributes. Additionally, modals need proper ARIA roles (`dialog`) and labels (`aria-labelledby`) to be correctly identified as interactive containers.
**Action:** Always provide `aria-label` for buttons that contain only icons and use `useId` to link modal titles to their dialog containers.

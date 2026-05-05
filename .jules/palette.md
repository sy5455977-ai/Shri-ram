## 2025-03-24 - [Accessible Destructive Actions]
**Learning:** Replacing native `window.confirm` with a themed `Modal` allows for better branding consistency and accessibility (ARIA roles, keyboard trap, and readable titles) compared to browser-native dialogs which are often ignored or provide a poor UX on mobile.
**Action:** Always prefer the application's `Modal` component for destructive actions like 'Delete' or 'Clear', ensuring they are accompanied by success/error toast notifications.

## 2025-05-22 - Improved Conversation Deletion Safety
**Learning:** Browser-native `window.confirm` is jarring and lacks visual consistency with the app's design language. Replacing it with a themed Modal and adding a success toast provides immediate, clear feedback and prevents accidental deletions.
**Action:** Use the custom `Modal` component for all destructive actions to maintain design consistency and improve accessibility.

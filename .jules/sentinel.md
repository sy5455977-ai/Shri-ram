## 2025-05-15 - PII Leakage in Database Error Handler
**Vulnerability:** The global `handleFirestoreError` in `src/firebase.ts` was explicitly bundling and logging user UID and email addresses in every Firestore error. These PII details were also thrown as part of the error message, potentially exposing them to the UI, client-side loggers, or downstream error handlers.

**Learning:** Error handlers are often overlooked as potential PII sinks. Developers may include "helpful" context like the current user's identity to aid debugging without realizing that this context follows the error across trust boundaries (e.g., from a service layer to a generic UI toast).

**Prevention:** Always sanitize error objects before logging or re-throwing. Use generic user-facing messages for UI display and redact sensitive identifiers (like document IDs and UIDs) from technical logs. Audit global catch-alls and error utility functions for manual attachment of `auth.currentUser` state.

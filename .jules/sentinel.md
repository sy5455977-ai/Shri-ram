## 2025-05-15 - Information Leakage in Firestore Error Handler
**Vulnerability:** The `handleFirestoreError` function was stringifying and throwing the entire error object, which included sensitive `auth.currentUser` details (uid, email, verification status) and internal database paths. This data was then directly rendered in the UI by the `ErrorBoundary`.
**Learning:** Generic error handlers that wrap library errors must explicitly redact PII and internal system metadata before passing them to UI components.
**Prevention:** Always log detailed error information to internal logs (console/telemetry) while throwing sanitized, generic strings for UI consumption.

## 2025-05-15 - PII Leakage in Firestore Error Handler
**Vulnerability:** The global Firestore error handler was explicitly logging and throwing the current user's UID and email address, and exposing full Firestore document paths in error messages.
**Learning:** Error handlers often become a sink for sensitive context during debugging, which can lead to PII leakage if not carefully sanitized before being logged or surfaced to the UI.
**Prevention:** Always sanitize error objects by removing auth state and redacting internal IDs (e.g., odd-indexed path segments in Firestore) before they reach logs or the client-side error boundary.

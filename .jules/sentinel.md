## 2025-05-14 - [PII Leakage in Centralized Error Handler]
**Vulnerability:** The centralized `handleFirestoreError` function explicitly captured and logged the current user's UID and email addresses into the browser console and thrown error objects.
**Learning:** Error handlers often attempt to provide "full context" for debugging, which can accidentally include sensitive authentication data (PII) if not carefully audited.
**Prevention:** Always separate technical logs (intended for developers/internal systems) from error messages intended for the UI. Sanitize all error objects to remove PII before they leave the secure logic layer.

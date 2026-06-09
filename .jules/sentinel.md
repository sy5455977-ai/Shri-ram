## 2025-05-14 - PII Leakage in Error Metadata
**Vulnerability:** User emails and Firestore UIDs/Document IDs were being surfaced in stringified JSON error objects in the console and Error Boundary UI.
**Learning:** Centralized error handlers that bundle auth state (like `auth.currentUser.email`) into error objects for debugging can accidentally leak PII to end-users if those objects are caught by global error boundaries.
**Prevention:** Implement a centralized PII redaction utility to scrub sensitive patterns (emails, 20+ char IDs) from error metadata before it leaves the internal logic layer.

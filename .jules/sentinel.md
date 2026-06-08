## 2025-05-15 - PII Leakage in Error Boundary
**Vulnerability:** React Error Boundary and Firestore error handlers were displaying raw error objects/messages to the user and logs, potentially exposing sensitive data like emails and UIDs.
**Learning:** Centralized error handling components often become a single point of failure for data leakage if they blindly trust and display error metadata.
**Prevention:** Implement a mandatory PII redaction layer in all centralized error handlers and UI reporting components.

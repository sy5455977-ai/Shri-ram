## 2025-05-14 - Information Disclosure in Firestore Error Handling
**Vulnerability:** Raw Firestore error objects containing PII (UIDs, emails) and internal document paths were being logged to the console and thrown to the UI via Error Boundaries.
**Learning:** Error handling logic that stringifies entire error objects can inadvertently leak sensitive metadata captured by Firebase SDKs or application context.
**Prevention:** Always implement a sanitization layer for error metadata before logging and throw generic, user-friendly error messages to the UI to maintain a secure boundary between internal state and the presentation layer.

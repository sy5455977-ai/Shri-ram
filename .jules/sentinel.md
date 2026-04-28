## 2025-04-28 - Information Leakage in Firestore Error Handling
**Vulnerability:** The `handleFirestoreError` function was logging and throwing raw JSON containing sensitive user PII (UID, email) and raw Firestore document paths.
**Learning:** Error boundaries in React can accidentally expose these detailed error objects to the end-user if not sanitized at the source.
**Prevention:** Always scrub PII from error objects and throw generic messages to the UI while keeping sanitized logs for internal debugging.

## 2025-04-28 - Reverse Tabnabbing via window.open
**Vulnerability:** Multiple `window.open(url, '_blank')` calls were missing `noopener,noreferrer` attributes.
**Learning:** Even internal app redirects (like opening a social media link) can be vulnerable to tab-nabbing if the destination is untrusted or compromised.
**Prevention:** Always include `noopener,noreferrer` for all `_blank` targets to sever the link between the new tab and the original window.

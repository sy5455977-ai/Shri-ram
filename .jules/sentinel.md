## 2025-05-14 - Information Disclosure prevention in Firestore error handling
**Vulnerability:** Detailed database error information, including document paths and user PII (emails/UIDs), was being stringified and thrown directly to the UI, where an Error Boundary could expose it.
**Learning:** Masking PII in logs while genericizing errors thrown to the UI provides defense-in-depth against accidental information disclosure. Broad regex for ID redaction can cause over-redaction; using word boundaries (\b) helps target only full alphanumeric identifiers.
**Prevention:** Always use a sanitization utility for logging objects that may contain user-specific data. Throw user-friendly, generic error messages from core service layers to the UI layer.

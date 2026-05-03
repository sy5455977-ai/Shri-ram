## 2025-05-14 - Information Disclosure and Reverse Tabnabbing Mitigation
**Vulnerability:** Information Disclosure (via raw Firestore error details) and Reverse Tabnabbing (via insecure `window.open`).
**Learning:** Raw Firestore error objects often contain PII (emails, UIDs) and internal database paths. Throwing these to the UI or logging them unsanitized leads to data leakage. Additionally, `window.open` with `_blank` allows the new page to access `window.opener`.
**Prevention:** Mask PII in logs using a sanitization utility, throw generic error messages to the UI, and always use `noopener,noreferrer` for external links.

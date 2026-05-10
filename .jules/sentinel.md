## 2025-05-14 - Information Disclosure and Reverse Tabnabbing Mitigation
**Vulnerability:** Raw Firestore error objects containing PII (UIDs, emails) and internal metadata were being thrown to the UI, potentially exposing sensitive system details in the ErrorBoundary. Additionally, `window.open` calls lacked `noopener,noreferrer`, risking reverse tabnabbing.
**Learning:** Standard ErrorBoundaries can inadvertently display highly sensitive data if errors are not caught and sanitized at the source. Automated AI tools often generate external links that need strict target attributes.
**Prevention:** Implement a central `sanitize` utility for all logging and always throw generic error messages to the UI. Enforce `noopener,noreferrer` on all target="_blank" links.

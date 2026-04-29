# Sentinel Security Journal

This journal tracks critical security learnings and vulnerability patterns discovered in the NEXUS AI codebase.

## 2025-04-29 - PII Leak in Firestore Error Handler
**Vulnerability:** The `handleFirestoreError` function was logging and throwing raw error objects containing user UIDs, emails, and full Firestore document paths.
**Learning:** Overly verbose error handling designed for debugging can inadvertently leak PII and internal database structure to the frontend via Error Boundaries and console logs.
**Prevention:** Always scrub PII from error logs and throw generic, sanitized error messages to the UI. Use regex to mask sensitive identifiers in database paths.

## 2025-05-15 - [Vision Mode Accessibility & Copy Delight]
**Learning:** Icon-only interactive elements in specialized modes (Vision, Voice) are high-risk areas for accessibility gaps. Standardizing on `focus-visible:ring-2` and mandatory `aria-label` ensures these technical features remain usable for all.
**Action:** Always audit specialized UI modes for missing labels on control-heavy panels. Implement transient state feedback (e.g., Copy -> Check) for all clipboard operations to provide immediate "delight" and confirmation.

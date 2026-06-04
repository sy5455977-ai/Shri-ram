## 2025-05-14 - [Vision Mode Accessibility and Utility]
**Learning:** Adding ARIA labels to icon-only buttons and providing clear visual/screen-reader feedback for clipboard actions significantly improves the usability of AI analysis tools. Grouping related controls with `role="group"` helps screen reader users navigate complex task switchers.
**Action:** Always include `aria-label` and `focus-visible` styles for all icon-only buttons. Use status-changing icons (e.g., Copy -> Check) with corresponding label updates for feedback.

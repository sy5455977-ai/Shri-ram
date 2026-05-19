## 2025-05-15 - [AI Vision Mode Accessibility and UX]
**Learning:** Icon-only buttons in the Vision Mode (camera capture, reset, task switchers) lack ARIA labels, making them unusable for screen reader users. Additionally, long analysis results are tedious to select and copy manually.
**Action:** Always include descriptive `aria-label` attributes on icon-only interactive elements and provide a dedicated "Copy to Clipboard" utility with visual feedback for long-form AI-generated content.

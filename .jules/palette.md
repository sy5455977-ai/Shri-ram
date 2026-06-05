## 2026-06-05 - [Vision Mode Accessibility & Utility]
**Learning:** The `VisionMode` analysis result header correctly nests accessibility controls (like the 'Copy' button) inside its layout to ensure the result content remains within the main container scroll area, preventing structural breakage during conditional rendering.
**Action:** Always nest utility controls within the specific content container they act upon to maintain layout integrity during state transitions.

## 2025-05-14 - [Vision Mode Accessibility & Utility]
**Learning:** High-tech, dark-mode UIs often neglect standard focus indicators. Interactive elements like custom capture buttons and mode switches need explicit `focus-visible` styles to remain usable for keyboard-only users without compromising the "clean" aesthetic for mouse users.
**Action:** Always pair `outline-none` with `focus-visible:ring-2` (or similar) on custom-styled buttons to ensure accessibility compliance in modern design systems.

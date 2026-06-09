## 2025-05-15 - [VisionMode Accessibility and Utility]
**Learning:** Icon-only buttons in interactive camera interfaces (Capture, Reset) require explicit `aria-label` attributes and `focus-visible` styles to be accessible to screen readers and keyboard users. Additionally, providing immediate copy feedback (icon transition) for generated content improves user confidence and utility.
**Action:** Always pair `lucide-react` icons with `aria-label` when used as the sole button content. Implement `focus-visible:ring-2` for all interactive elements to support keyboard navigation.

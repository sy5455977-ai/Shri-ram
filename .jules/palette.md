## 2025-05-15 - Improving Keyboard Visibility for Interactive Elements
**Learning:** Interactive actions that are hidden by default (e.g., using `opacity-0`) and only revealed on hover (using `group-hover:opacity-100`) are completely inaccessible to keyboard users. These elements must also be revealed when they or their container receives focus.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` (for containers) or `focus-visible:opacity-100` (for direct elements) to ensure they are visible and usable for keyboard navigation.

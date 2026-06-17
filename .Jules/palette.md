## 2025-05-14 - Accessible Icon-Only Buttons
**Learning:** Icon-only buttons that are visually hidden by default (e.g., using Tailwind's `opacity-0` on hover states) are inaccessible to keyboard users unless they are also revealed on focus. Using `group-focus-within:opacity-100` and `focus-visible:opacity-100` ensures these actions are discoverable during tab navigation.
**Action:** Always pair hover-based visibility (`group-hover:opacity-100`) with focus-based visibility (`group-focus-within:opacity-100`) for interactive elements.

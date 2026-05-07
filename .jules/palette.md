## 2025-05-14 - Keyboard Accessibility for Hidden Actions
**Learning:** Icon-only buttons or actions hidden behind hover states (e.g., `opacity-0 group-hover:opacity-100`) are inaccessible to keyboard users unless explicitly handled with focus states.
**Action:** Always accompany hover-based visibility with focus-based visibility (e.g., `group-focus-within:opacity-100` or `focus-within:opacity-100`) and provide distinct `focus-visible:ring-2` indicators for interactive elements.

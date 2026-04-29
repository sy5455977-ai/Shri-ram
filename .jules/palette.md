## 2026-04-29 - Accessible Icon-only Buttons and Keyboard Visibility
**Learning:** Icon-only buttons often lack accessible names for screen readers and are frequently hidden until hover, making them inaccessible to keyboard users. Using 'opacity-0' without focus states prevents keyboard users from interacting with important features.
**Action:** Always add 'aria-label' to icon-only buttons. For elements hidden on hover, add 'focus:opacity-100' or 'group-focus-within:opacity-100' and 'focus-visible:ring-2' to ensure they are visible and clearly indicated when focused.

## 2026-04-29 - Standardized Modal Accessibility
**Learning:** Modals require specific ARIA roles and attributes (role="dialog", aria-modal="true", aria-labelledby) to be correctly announced by assistive technologies.
**Action:** Implement 'role="dialog"' and 'aria-modal="true"' on the modal container. Use 'useId' to generate stable IDs for 'aria-labelledby' to link the dialog to its title heading.

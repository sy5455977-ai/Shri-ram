## 2026-04-28 - Consistent Accessible Dialogs and Labels
**Learning:** Browser-native 'window.confirm' interrupts the immersive UX and offers limited accessibility. Using a custom 'Modal' with 'role="dialog"' and 'aria-labelledby' ensures theme consistency and robust screen reader support. Additionally, icon-only buttons require explicit 'aria-label' attributes even when a 'title' is present, as 'title' is inconsistently announced.
**Action:** Replace all 'window.confirm' calls with the 'Modal' component and ensure all icon-only buttons have descriptive 'aria-label' attributes.

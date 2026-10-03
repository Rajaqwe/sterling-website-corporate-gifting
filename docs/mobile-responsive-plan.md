# Sterling Mobile Responsive Plan

## Goal
Make the public website feel proportionate and comfortable on mobile phones without changing the desktop/tablet visual design.

## Scope
- Primary breakpoint: screens below 640px.
- Review the homepage first, then shared components that affect mobile site-wide.
- Reduce oversized typography, vertical spacing, card padding, and hero/media footprint where needed.
- Preserve desktop/tablet sizing and the existing visual identity.
- Prevent horizontal overflow.
- Preserve accessibility: readable text, comfortable touch targets, visible focus states.

## Homepage targets
- Hero: reduce mobile heading from `text-4xl` to approximately `text-3xl`; tighten top/bottom padding and gaps.
- Hero paragraph: use compact line-height and spacing while retaining readable body size.
- Hero buttons: retain touch-friendly height but reduce horizontal padding and excessive vertical gaps.
- Hero media/card: reduce corner radius/padding and keep a sensible aspect ratio on narrow screens.
- Sections: reduce `py-20` mobile spacing toward roughly `py-14`/`py-16`; keep larger spacing at `sm` and above.
- Section headings: reduce mobile size and surrounding margins modestly.
- Cards: reduce mobile padding from large desktop-oriented values where appropriate.
- Product grids: keep one column on very narrow phones unless the existing product card remains genuinely usable at two columns.

## Validation
- Check 320px, 375px, 390px, 430px widths.
- Confirm no horizontal scrollbar/overflow.
- Confirm headings do not wrap awkwardly.
- Confirm buttons and interactive controls remain easy to tap.
- Confirm desktop classes at `sm`/`lg` remain unchanged unless a specific responsive issue requires otherwise.

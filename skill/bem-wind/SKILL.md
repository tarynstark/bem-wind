---
name: bem-wind
description: Write, refactor, and review UI CSS using the BEM-Wind methodology — semantic BEM component classes built entirely from Tailwind utilities inside `@apply` directives, with a project prefix and design tokens. Use whenever styling a component, converting utility-heavy / inline-Tailwind HTML into named classes, setting up a design-token system, or reviewing CSS for design-system consistency. Triggers include "style this component", "convert these Tailwind classes", "clean up this CSS", "BEM-Wind", "@apply", "design tokens", "make this consistent".
---

# BEM-Wind

BEM-Wind is a CSS methodology that keeps Tailwind's design system while removing utility soup from your markup. You write **semantic, prefixed BEM class names** in HTML and define them in CSS using **only `@apply` directives** built from standard Tailwind utilities. Markup reads like the design; styling stays in the stylesheet; the whole system stays consistent because every value comes from Tailwind's scale (or named design tokens).

It is design-system-agnostic: one structural methodology, any visual identity, swapped via a theme layer.

## The five rules

1. **Everything inside `@apply`.** Never write a raw CSS property (`padding: 12px`) in a component. Compose from Tailwind utilities inside `@apply`. The only exceptions are `content:` for pseudo-elements and binding a CSS custom property (`border-radius: var(--ds-radius-button)`) in a theme.
2. **Prefix every class** with a 2–4 character project prefix so components are instantly identifiable and searchable. Pick one per project (e.g. `ds-`, `app-`, `acme-`). This skill uses `ds-` in examples — **replace it with the project's actual prefix**, inferring it from existing classes in the codebase before introducing a new one.
3. **BEM naming:** `[prefix]-block__element--modifier`. Block = component (`ds-card`), element = part of it (`ds-card__title`), modifier = variant/state (`ds-card--featured`). Nest elements/modifiers under the block with SCSS `&`.
4. **Prefer standard Tailwind values.** Use the scale (`p-4`, `rounded-lg`, `bg-blue-500`, `text-lg`). Reach for an arbitrary bracket value (`max-w-[1200px]`, `bg-[#f7f0e9]`) **only when the design genuinely requires a value off the scale** — a brand color, an exact asset dimension, a specific container width. When you do, it still lives inside `@apply`, never as a standalone property and never as an inline `style=`.
5. **No utilities in markup.** HTML/JSX carries semantic classes only — never `class="flex items-center p-4 hover:bg-gray-200"`. All of that moves into the `@apply` block.

### Hard prohibitions
- ❌ Standalone CSS properties inside a component (`display: flex`, `box-shadow: …`) — use `@apply flex`, `@apply shadow-md`.
- ❌ Decimal off-scale utilities: `p-2.5`, `mb-1.5`, `-translate-y-0.5`. Snap to the nearest scale step (`p-2`/`p-3`, `-translate-y-1`).
- ❌ Inline `style="…"` as an escape hatch — use an arbitrary value inside `@apply` instead.
- ❌ Utility classes in HTML/JSX.
- ❌ Inconsistent or missing prefix.

## Authoring a component

Structure every component block, then its elements, then its modifiers. Always include interactive states (`hover:`, `active:`, `focus:`) and a transition for anything interactive — accessibility and polish are part of the methodology, not an afterthought.

```scss
.ds-button {
  @apply inline-flex items-center justify-center gap-2 cursor-pointer;
  @apply px-4 py-2 text-base font-medium rounded-lg border border-transparent;
  @apply transition-colors duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;

  &__icon {
    @apply h-4 w-4 shrink-0;
  }

  &--primary {
    @apply bg-blue-500 text-white;
    @apply hover:bg-blue-600 active:bg-blue-700;
  }

  &--secondary {
    @apply bg-gray-200 text-gray-900 border-gray-300;
    @apply hover:bg-gray-300 active:bg-gray-400;
  }

  &--large {
    @apply px-6 py-3 text-lg;
  }
}
```

```html
<button class="ds-button ds-button--primary ds-button--large">
  <svg class="ds-button__icon">…</svg>
  Get started
</button>
```

See `reference/examples.md` for card, input, dropdown, modal, tooltip, responsive-grid, animation, and pseudo-element patterns.

## Converting utility-heavy HTML

When refactoring inline Tailwind into BEM-Wind:

1. **Name the component** semantically by purpose, not appearance (`ds-vehicle-card`, not `ds-rounded-box`). Name elements by role (`__title`, `__media`, `__actions`).
2. **Move every utility** from the markup into the component's `@apply` block, grouped logically (layout → box → color → states). Preserve exact visual output — this is a lift-and-rename, not a redesign.
3. **Replace the markup** with semantic classes only.
4. **Lift repeated arbitrary values** (a brand hex used 5×) into a design token / CSS variable and reference it via the theme.
5. **Migrate gradually** on existing codebases — convert component-by-component, keep visual parity, don't rewrite the design.

## Design tokens & theming

Values map directly between Figma and code: Figma `spacing/large` → token `--ds-space-large` → used via the Tailwind scale or a utility. Keep **structure** (the component's `@apply` rules) separate from **identity** (colors, fonts, radii) so one component library can wear many brands.

- **Core layer** — unstyled structural primitives (`@apply` for layout/spacing/states), no brand colors.
- **Theme layer** — overrides CSS custom properties (`--ds-color-primary`, `--ds-radius-button`, `--ds-font-display`) and binds them where a token is genuinely dynamic.

`reference/tokens.css` is a complete, ready-to-drop-in token scaffold (spacing, type scale, containers, radius, shadow, z-index, motion, breakpoints, color placeholders, fonts). Copy it, reprefix it, and override the color/font placeholders per project theme.

## Review checklist

When reviewing CSS for BEM-Wind compliance, verify:

- [ ] Every property is inside `@apply` (only `content:` / CSS-var binding excepted)
- [ ] Consistent project prefix on every class
- [ ] Correct BEM: `[prefix]-block__element--modifier`, nested with `&`
- [ ] Standard Tailwind values; arbitrary brackets only where the design truly needs them, and only inside `@apply`
- [ ] No decimal off-scale utilities (`p-2.5`, `translate-y-0.5`)
- [ ] Interactive elements have hover/active/focus states + a transition
- [ ] No utility classes or inline `style=` in the markup
- [ ] Semantic names describe purpose, not appearance
- [ ] Primitives are structural; brand color/font/radius live in the theme layer

## Decision flow for any value

1. Is there a standard Tailwind utility? → use it.
2. Is it near a scale step? → snap to the nearest step.
3. Does the design genuinely demand an off-scale value? → arbitrary bracket value, inside `@apply`.
4. Is this value reused or brand-defining? → promote it to a design token in the theme.
5. Interactive? → add hover/active/focus + transition.

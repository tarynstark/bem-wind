# BEM-Wind

**A [Claude Code](https://claude.com/claude-code) skill for writing UI CSS the BEM-Wind way** — semantic, prefixed BEM component classes composed entirely from Tailwind utilities inside `@apply` directives, backed by design tokens. Keep Tailwind's design system; get the utility soup out of your markup.

```bash
npx bem-wind add-skill --global
```

That installs the skill into `~/.claude/skills`. Then ask Claude to style or convert a component — it loads automatically when the work matches — or invoke it explicitly with `/bem-wind`.

## What it does

It teaches Claude to write CSS like this — semantic class names in your markup, `@apply` in your stylesheet:

```html
<button class="ds-button ds-button--primary">Get started</button>
```

```scss
.ds-button {
  @apply inline-flex items-center justify-center px-4 py-2 rounded-lg;
  @apply transition-colors duration-200;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;

  &--primary {
    @apply bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700;
  }
}
```

…instead of the same utilities scattered inline across every component.

## The method in five rules

1. **Everything inside `@apply`** — compose from Tailwind utilities; no raw CSS properties.
2. **Prefix every class** with a 2–4 character project prefix (`ds-`, `app-` — your choice).
3. **BEM naming** — `[prefix]-block__element--modifier`.
4. **Prefer standard Tailwind values** — reach for arbitrary bracket values only when the design truly needs one.
5. **No utilities in markup** — components carry semantic class names only.

It's design-system-agnostic: one structural method, any visual identity, swapped via a theme layer.

## Install options

```bash
npx bem-wind add-skill            # ./.claude/skills (this project — commit it to share with your team)
npx bem-wind add-skill --global   # ~/.claude/skills (all your projects)
npx bem-wind add-skill --force    # overwrite an existing install
```

Or copy [`skill/bem-wind/`](skill/bem-wind) into a `.claude/skills` directory manually.

## Install as a Claude Code plugin

This repo is also a Claude Code **plugin marketplace**, so you can install the skill without leaving Claude Code:

```text
/plugin marketplace add tarynstark/bem-wind
/plugin install bem-wind@bem-wind
```

The skill then loads as part of the plugin (invoke it via `/bem-wind`). Both paths ship the same skill — use npx for a plain file install, or the plugin for in-app management (enable/disable/update).

## What's in the skill

- [`SKILL.md`](skill/bem-wind/SKILL.md) — the methodology: the five rules, authoring components, converting utility-heavy HTML, tokens & theming, and a review checklist.
- [`reference/examples.md`](skill/bem-wind/reference/examples.md) — card, input, dropdown, modal, tooltip, grid, animation, and theme patterns.
- [`reference/tokens.css`](skill/bem-wind/reference/tokens.css) — a drop-in design-token scaffold (reprefix and theme it per project).

## License

MIT © Taryn Stark

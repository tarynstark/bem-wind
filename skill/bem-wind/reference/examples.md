# BEM-Wind component patterns

Reference implementations. Every example uses the `ds-` prefix as a placeholder — **swap in the project's real 2–4 char prefix**. All styling lives inside `@apply`; markup carries semantic classes only.

## Card

```scss
.ds-card {
  @apply flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm;
  @apply transition-shadow duration-200 hover:shadow-md;

  &__media {
    @apply aspect-video w-full object-cover rounded-t-xl;
  }

  &__body {
    @apply flex flex-col gap-2 p-6;
  }

  &__title {
    @apply text-lg font-semibold text-gray-900;
  }

  &__text {
    @apply text-sm text-gray-600 leading-relaxed;
  }

  &__footer {
    @apply mt-auto flex items-center justify-between p-6 border-t border-gray-200;
  }

  &--featured {
    @apply border-blue-500 ring-1 ring-blue-500;
  }
}
```

```html
<article class="ds-card ds-card--featured">
  <img class="ds-card__media" src="…" alt="…" />
  <div class="ds-card__body">
    <h3 class="ds-card__title">Title</h3>
    <p class="ds-card__text">Supporting copy.</p>
  </div>
  <div class="ds-card__footer">…</div>
</article>
```

## Form input

```scss
.ds-input {
  @apply w-full px-3 py-2 bg-white text-gray-900 placeholder-gray-400;
  @apply border border-gray-300 rounded-lg;
  @apply transition-colors duration-200;
  @apply hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none;

  &--error {
    @apply border-red-500 focus:border-red-500 focus:ring-red-500/20;
  }

  &:disabled {
    @apply bg-gray-100 text-gray-400 cursor-not-allowed;
  }
}
```

## Dropdown

```scss
.ds-dropdown {
  @apply relative inline-block;

  &__trigger {
    @apply inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white;
    @apply hover:border-gray-400 transition-colors duration-200;
  }

  &__menu {
    @apply absolute top-full left-0 mt-1 min-w-[12rem] py-1;
    @apply bg-white rounded-lg border border-gray-200 shadow-lg;
    @apply invisible opacity-0 transition-opacity duration-150;
  }

  &__item {
    @apply flex items-center gap-2 px-3 py-2 text-sm text-gray-700;
    @apply hover:bg-gray-100 active:bg-gray-200 cursor-pointer;
  }

  &--open &__menu {
    @apply visible opacity-100;
  }
}
```

## Modal

```scss
.ds-modal {
  @apply fixed inset-0 z-50 flex items-center justify-center p-4;

  &__overlay {
    @apply absolute inset-0 bg-black/50;
  }

  &__panel {
    @apply relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto;
    @apply bg-white rounded-2xl shadow-2xl;
  }

  &__header {
    @apply flex items-center justify-between p-6 border-b border-gray-200;
  }

  &__body {
    @apply p-6;
  }

  &__footer {
    @apply flex justify-end gap-3 p-6 border-t border-gray-200;
  }
}
```

## Responsive grid (mobile-first)

```scss
.ds-grid {
  @apply grid grid-cols-1 gap-4;
  @apply sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
}
```

## Animation / loader

```scss
.ds-loader {
  @apply h-6 w-6 rounded-full border-2 border-gray-200 border-t-blue-500;
  @apply animate-spin;
}
```

## Pseudo-element (tooltip) — the `content:` exception

`content:` is one of the few raw properties allowed, since Tailwind has no `@apply` for it.

```scss
.ds-tooltip {
  @apply relative;

  &::before {
    @apply absolute bottom-full left-1/2 mb-2 -translate-x-1/2;
    @apply px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap;
    @apply invisible opacity-0 transition-opacity duration-150;
    content: attr(data-tooltip);
  }

  &:hover::before {
    @apply visible opacity-100;
  }
}
```

## Gradients & shadows — keep them in Tailwind

```scss
/* ❌ Don't drop to raw CSS */
.ds-banner {
  background: linear-gradient(45deg, #ff0000, #00ff00);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* ✅ Compose from Tailwind utilities */
.ds-banner {
  @apply bg-gradient-to-r from-red-500 to-green-500 shadow-lg;
}
```

## Theme override — structure vs. identity

Core primitive (structural, brand-agnostic):

```scss
.ds-button {
  @apply inline-flex items-center justify-center px-4 py-2 rounded-lg;
  @apply transition-colors duration-200;
}
```

Theme layer (brand identity via tokens — binding a CSS var is an allowed raw property):

```scss
:root {
  --ds-color-primary: #371a1e;   /* burgundy */
  --ds-radius-button: 5rem;      /* pill */
}

.ds-button {
  border-radius: var(--ds-radius-button);

  &--primary {
    @apply text-white;
    background-color: var(--ds-color-primary);
  }
}
```

# Creating Components

This guide walks through building your own Vue components for a VitePress
Carbon site — from a one-off component used on a single page to globally
registered components available in every Markdown file.

## Project structure

Custom theme code lives in the `.vitepress/theme` directory:

```
docs/
├─ .vitepress/
│  ├─ config.mts
│  └─ theme/
│     ├─ index.ts            ← theme entry
│     └─ components/
│        ├─ MyCard.vue
│        └─ RepoStars.vue
└─ index.md
```

If you don't have a `.vitepress/theme/index.ts` yet, create one that re-exports
the Carbon theme:

```ts
// .vitepress/theme/index.ts
import { VPCarbon } from 'vitepress-carbon'

export default {
  ...VPCarbon
}
```

## Your first component

A component is a regular Vue single-file component. Style it with the theme's
CSS variables so it automatically adapts to light and dark mode:

```vue
<!-- .vitepress/theme/components/MyCard.vue -->
<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="my-card">
    <h3>{{ title }}</h3>
    <div class="my-card-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.my-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px 20px;
  background-color: var(--vp-c-bg-soft);
}

.my-card h3 {
  margin: 0 0 8px;
  color: var(--vp-c-text-1);
}

.my-card-body {
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>
```

::: tip Use the theme's CSS variables
Hard-coded colors break in one of the two color modes. Prefer the theme
variables — the most useful ones:

| Variable                                              | Purpose                         |
| ----------------------------------------------------- | ------------------------------- |
| `--vp-c-bg` / `--vp-c-bg-alt` / `--vp-c-bg-soft`      | Background surfaces             |
| `--vp-c-text-1` / `--vp-c-text-2` / `--vp-c-text-3`   | Text, from strongest to softest |
| `--vp-c-divider` / `--vp-c-border`                    | Borders and separators          |
| `--vp-c-brand-1` … `--vp-c-brand-3`                   | Brand / accent colors           |
| `--vp-c-tip-1`, `--vp-c-warning-1`, `--vp-c-danger-1` | Status colors                   |

The full list is in the theme's
[`vars.css`](https://github.com/brenoepics/vitepress-carbon/blob/main/packages/theme/src/theme/styles/vars.css).
:::

## Using a component

### On a single page

Import it directly in the Markdown file:

```md
<script setup>
import MyCard from '../.vitepress/theme/components/MyCard.vue'
</script>

# A Page

<MyCard title="Hello">
  Any **Markdown** or HTML works inside the slot.
</MyCard>
```

### Globally, on every page

Register it once in `enhanceApp`:

```ts
// .vitepress/theme/index.ts
import { VPCarbon } from 'vitepress-carbon'
import MyCard from './components/MyCard.vue'

export default {
  ...VPCarbon,
  enhanceApp({ app }) {
    app.component('MyCard', MyCard)
  }
}
```

Now `<MyCard>` works in any Markdown file with no import.

### Inside the theme's layout slots

Components can also be injected into fixed positions of the layout (navbar,
sidebar, before/after content, …) using layout slots — see
[Extending Theme](./extending-theme) and the
[full slot reference](./custom-layouts#layout-slot-reference).

## Accessing site and page data

Use VitePress's `useData` inside components to read the site config,
frontmatter, and current page:

```vue
<script setup lang="ts">
import { useData } from 'vitepress'

const { site, page, frontmatter, isDark } = useData()
</script>

<template>
  <p>
    Reading <code>{{ page.relativePath }}</code> from {{ site.title }}
  </p>
  <p v-if="frontmatter.author">Written by {{ frontmatter.author }}</p>
</template>
```

Carbon additionally exports `useSidebar` and `useLocalNav`:

```ts
import { useSidebar, useLocalNav } from 'vitepress-carbon'
```

## Building on the theme's components

Your components can compose the [built-in components](./components):

```vue
<!-- .vitepress/theme/components/ProjectLinks.vue -->
<script setup lang="ts">
import { VPButton, VPSocialLinks } from 'vitepress-carbon/components'

const links = [
  { icon: 'github', link: 'https://github.com/brenoepics/vitepress-carbon' }
]
</script>

<template>
  <div class="project-links">
    <VPButton text="Get Started" href="/guide/getting-started" />
    <VPSocialLinks :links="links" />
  </div>
</template>
```

## SSR: browser-only code

VitePress pre-renders every page in Node, where `window` and `document` don't
exist. If a component (or a library it imports) touches browser APIs on load,
guard it:

- **`onMounted`** — runs only in the browser:

  ```vue
  <script setup>
  import { onMounted, ref } from 'vue'

  const width = ref(0)
  onMounted(() => {
    width.value = window.innerWidth
  })
  </script>
  ```

- **`<ClientOnly>`** — skips SSR entirely for non-SSR-friendly components:

  ```md
  <ClientOnly>
    <MyBrowserOnlyChart />
  </ClientOnly>
  ```

- **Dynamic import** — for libraries that break just by being imported:

  ```ts
  onMounted(async () => {
    const { default: lib } = await import('some-browser-lib')
    lib.init()
  })
  ```

## Fetching data at build time

For data that should be baked into the site (instead of fetched in the
browser), use VitePress
[build-time data loaders](https://vitepress.dev/guide/data-loading). Create a
`*.data.ts` file and import it from any component:

```ts
// .vitepress/theme/data/stars.data.ts
export default {
  async load() {
    const res = await fetch(
      'https://api.github.com/repos/brenoepics/vitepress-carbon'
    )
    const { stargazers_count } = await res.json()
    return { stars: stargazers_count }
  }
}
```

```vue
<script setup lang="ts">
import { data } from '../data/stars.data.ts'
</script>

<template>
  <span>⭐ {{ data.stars }}</span>
</template>
```

The loader runs once at build time; the browser never calls the GitHub API.

## Checklist

- Component lives in `.vitepress/theme/components/`
- Colors use `--vp-*` CSS variables (works in light **and** dark mode)
- Browser APIs only inside `onMounted` (or wrapped in `<ClientOnly>`)
- Registered in `enhanceApp` if used on more than one page

## Next steps

- [Built-in Components](./components) — everything you can import from the theme.
- [Custom Layouts](./custom-layouts) — turn components into full page layouts (e.g. a blog).

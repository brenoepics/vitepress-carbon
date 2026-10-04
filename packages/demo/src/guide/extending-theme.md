# Extending Theme

::: tip Looking for more?

- [Custom Layouts](./custom-layouts) — build entirely new page layouts (blog, changelog, landing pages) and see the full layout-slot reference.
- [Built-in Components](./components) — every component you can import from `vitepress-carbon/components`.
- [Creating Components](./custom-components) — author your own components on top of the theme.
  :::

## Layout Slots

The theme's `<Layout/>` component has a few slots that can be used to inject content at certain locations of the page (see the [full slot reference](./custom-layouts#layout-slot-reference)). Here's an example of injecting a component before the site title in the nav bar:

```js
// .vitepress/theme/index.js
import { h } from 'vue'
import { VPCarbon } from 'vitepress-carbon'
import Icon from './components/Icon.vue'

export default {
  ...VPCarbon,
  Layout: () => {
    return h(VPCarbon.Layout, null, {
      'nav-bar-title-before': () => h(Icon)
      // slots for theme layout
    })
  }
}
```

### Per-page slot content

Slots are filled once, in the theme entry, so a Markdown page can't fill one directly. To show something in a slot on specific pages only, have the slot component read the page's frontmatter:

```vue
<!-- .vitepress/theme/components/AsideNotice.vue -->
<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div v-if="frontmatter.asideNotice" class="aside-notice">
    {{ frontmatter.asideNotice }}
  </div>
</template>
```

```js
// .vitepress/theme/index.js
Layout: () =>
  h(VPCarbon.Layout, null, {
    'aside-top': () => h(AsideNotice)
  })
```

```md
---
asideNotice: This page is a draft.
---
```

To render arbitrary markup from the page itself, give the slot an empty target (`'aside-top': () => h('div', { id: 'aside-top' })`) and move the page's content into it with `<ClientOnly><Teleport to="#aside-top" defer>...</Teleport></ClientOnly>` (Vue 3.5+).

## Registering Global Components

When registering your own components，you need to remount the entry function of the theme.

```js{8}
// .vitepress/theme/index.js
import { VPCarbon } from 'vitepress-carbon'
import Icon from './components/Icon.vue'

export default {
  ...VPCarbon,
  enhanceApp(ctx) {
    VPCarbon.enhanceApp?.(ctx)
    // register global components
    const { app } = ctx
    app.component('Icon', Icon)
    // ...
  }
}
```

# Extending Theme

::: tip Looking for more?

- [Custom Layouts](./custom-layouts) — build entirely new page layouts (blog, changelog, landing pages) and see the full layout-slot reference.
- [Built-in Components](./components) — every component you can import from `vitepress-carbon/components`.
- [Creating Components](./custom-components) — author your own components on top of the theme.
  :::

## Layout Slots

The theme's `<Layout/>` component has a few slots that can be used to inject content at certain locations of the page. Here's an example of injecting a component to replace the nav bar icon:

```js
// .vitepress/theme/index.js
import { h } from 'vue'
import { VPCarbon } from 'vitepress-carbon'
import Icon from './components/Icon.vue'

export default {
  ...VPCarbon,
  Layout: () => {
    return h(VPCarbon.Layout, null, {
      'navbar-icon': () => h(Icon)
      // slots for theme layout
    })
  }
}
```

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

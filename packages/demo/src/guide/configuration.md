# Configuration

## Overview

To customize your site, you need first create a `.vitepress` directory inside your documentation directory.
This is where all VitePress-specific files will be placed. Your project structure is probably like this:

::: code-group

``` [Javascript]
.vitepress
├─ theme
│  └─ index.js
└─ config.js
```

``` [TypeScript]
.vitepress
├─ theme
│  └─ index.ts
└─ config.ts
```

``` [JS ES module]
.vitepress
├─ theme
│  └─ index.js
└─ config.mjs
```

``` [TS ES module]
.vitepress
├─ theme
│  └─ index.ts
└─ config.mts
```
:::

## Using Theme

You can enable this custom theme by adding the `.vitepress/theme/index.js` file (the "theme entry file"). And you need to import and re-export it from the theme entry:

```js
// .vitepress/theme/index.js
import { VPCarbon } from 'vitepress-carbon'
export default VPCarbon
```

## Config Theme

Configure the theme config in the `.vitepress/config.mjs` file.

```js{3,6}
// .vitepress/config.mjs
import { defineConfig } from 'vitepress'
import baseConfig from 'vitepress-carbon/config'

export default defineConfig({
  extends: baseConfig,
  themeConfig: {
    // ...
  }
})

```

Check out the [Config Options](https://vitepress.dev/reference/default-theme-config#default-theme-config) for a full list of the `themeConfig` options.

For typescript project, you'll need to use `defineConfigWithTheme` instead of `defineConfig`, and pass the config type for your custom theme via a generic argument:

```ts{3,4,6,7}
// .vitepress/config.mts
import { defineConfigWithTheme } from 'vitepress'
import baseConfig from 'vitepress-carbon/config'
import type { ThemeConfig } from 'vitepress-carbon/config'

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  themeConfig: {
    // ...
  }
})

```

And, you need to add a `*.d.ts` declaration file to define the `vitepress-carbon/config` module.

```ts
declare module 'vitepress-carbon/config' {
  import { UserConfig } from 'vitepress'
  const config: () => Promise<UserConfig>
  export default config
}
```

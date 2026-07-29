# Built-in Components

VitePress Carbon ships every component it uses internally, and all of them can
be imported into your own pages, layouts, and components from a single entry
point:

```ts
import { VPButton, VPBadge, VPTeamMembers } from 'vitepress-carbon/components'
```

::: info No global registration
Unlike the VitePress default theme, Carbon does **not** register any component
globally. To use a component you either import it locally in a `<script setup>`
block, or register it yourself in `enhanceApp` (see
[Registering components globally](#registering-components-globally)).
:::

## Using components in Markdown

Every Markdown page is compiled to a Vue component, so you can add a
`<script setup>` block and use any component directly:

```md
---
title: My Page
---

<script setup>
import { VPButton, VPBadge } from 'vitepress-carbon/components'
</script>

# My Page <VPBadge type="tip" text="new" />

<VPButton text="Get Started" href="/guide/getting-started" theme="brand" />
```

## Registering components globally

If you use a component on many pages, register it once in your theme entry and
use it anywhere without importing:

```js
// .vitepress/theme/index.js
import { VPCarbon } from 'vitepress-carbon'
import { VPButton, VPBadge } from 'vitepress-carbon/components'

export default {
  ...VPCarbon,
  enhanceApp({ app }) {
    app.component('VPButton', VPButton)
    app.component('Badge', VPBadge)
  }
}
```

```md
<!-- now works in any .md file, no import needed -->
<VPButton text="Download" href="/download" />
```

## Component reference

The components below are the ones intended for direct use in pages and custom
layouts. Everything else exported from `vitepress-carbon/components` (navbar,
sidebar, search, etc.) is an internal building block — you _can_ import those
too, but their props may change between minor versions.

### VPButton

A link-styled button. Renders an `<a>` when `href` is set, otherwise a
`<button>`. External links automatically get `target="_blank"` and
`rel="noreferrer"`.

```vue
<VPButton text="Get Started" href="/guide/getting-started" />
<VPButton
  text="View on GitHub"
  href="https://github.com/brenoepics/vitepress-carbon"
  theme="alt"
  size="big"
/>
```

| Prop     | Type                            | Default      | Description                                 |
| -------- | ------------------------------- | ------------ | ------------------------------------------- |
| `text`   | `string`                        | — (required) | The button label.                           |
| `href`   | `string`                        | `undefined`  | Destination URL. Renders an `<a>` when set. |
| `theme`  | `'brand' \| 'alt' \| 'sponsor'` | `'brand'`    | Visual style.                               |
| `size`   | `'medium' \| 'big'`             | `'medium'`   | Button size.                                |
| `tag`    | `string`                        | `undefined`  | Force a specific HTML tag.                  |
| `target` | `string`                        | auto         | Link target. Auto-set for external links.   |
| `rel`    | `string`                        | auto         | Link rel. Auto-set for external links.      |

### VPBadge

A small inline badge, useful next to headings to mark new or deprecated
features.

```vue
### My Feature
<VPBadge type="warning" text="beta" />
<VPBadge type="danger">deprecated</VPBadge>
```

| Prop   | Type                                       | Default     | Description                                 |
| ------ | ------------------------------------------ | ----------- | ------------------------------------------- |
| `text` | `string`                                   | `undefined` | Badge label. The default slot overrides it. |
| `type` | `'info' \| 'tip' \| 'warning' \| 'danger'` | `'tip'`     | Color variant.                              |

### VPImage

A theme-aware image. Accepts a plain `src` string, an object with extra
attributes, or a `{ light, dark }` pair that swaps automatically with the
color scheme. Paths are resolved against your site `base`.

```vue
<VPImage image="/logo.svg" alt="Logo" />
<VPImage
  :image="{ light: '/logo-light.svg', dark: '/logo-dark.svg', alt: 'Logo' }"
/>
```

| Prop    | Type                                               | Default      | Description                       |
| ------- | -------------------------------------------------- | ------------ | --------------------------------- |
| `image` | `string \| { src, alt? } \| { light, dark, alt? }` | — (required) | Image source(s).                  |
| `alt`   | `string`                                           | `undefined`  | Alt text (overrides `image.alt`). |

### VPLink

A smart link that renders an `<a>` when `href` is set (with automatic external
link handling and icon) and a `<span>` otherwise.

```vue
<VPLink href="https://vitepress.dev">VitePress</VPLink>
<VPLink href="https://vitepress.dev" no-icon>VitePress (no icon)</VPLink>
```

| Prop     | Type      | Default     | Description                               |
| -------- | --------- | ----------- | ----------------------------------------- |
| `href`   | `string`  | `undefined` | Destination URL.                          |
| `noIcon` | `boolean` | `false`     | Hide the external-link icon.              |
| `tag`    | `string`  | auto        | Force a specific HTML tag.                |
| `target` | `string`  | auto        | Link target. Auto-set for external links. |
| `rel`    | `string`  | auto        | Link rel. Auto-set for external links.    |

### VPHighlight

The glowing gradient highlight used by the home hero (see
[Home Page](./home-component#glowing-icon-customization)).

| Prop                    | Type               | Default                                                         | Description                          |
| ----------------------- | ------------------ | --------------------------------------------------------------- | ------------------------------------ |
| `glowingActive`         | `boolean`          | `false`                                                         | Enables the glow animation.          |
| `glowingIcon`           | `string`           | `var(--vp-c-brand-3)`                                           | Glow background color.               |
| `stringHighlightColors` | `string[]`         | `['transparent', 'var(--vp-c-brand-1)', 'var(--vp-c-brand-3)']` | Gradient stops of the vertical line. |
| `icon`                  | `string \| object` | code icon                                                       | Icon shown inside the highlight.     |

### VPFeatures

The feature-card grid used on the home page. The grid automatically picks 2, 3,
4, or 6 columns based on the number of items.

```vue
<script setup>
import { VPFeatures } from 'vitepress-carbon/components'

const features = [
  { icon: '⚡', title: 'Fast', details: 'Instant server start.' },
  {
    icon: '🎨',
    title: 'Themeable',
    details: 'CSS variables everywhere.',
    link: '/guide/configuration',
    linkText: 'Configure'
  }
]
</script>

<VPFeatures :features="features" />
```

Each feature item supports:

| Field            | Type                                         | Description                                   |
| ---------------- | -------------------------------------------- | --------------------------------------------- |
| `title`          | `string`                                     | Card title (required).                        |
| `details`        | `string`                                     | Card body text (required). Supports raw HTML. |
| `icon`           | `string \| { src, alt? } \| { light, dark }` | Emoji, raw SVG string, or image source(s).    |
| `link`           | `string`                                     | Makes the whole card a link.                  |
| `linkText`       | `string`                                     | Call-to-action text shown at the card bottom. |
| `rel` / `target` | `string`                                     | Link attributes.                              |

### VPHero

The hero banner. Normally driven by [home page frontmatter](./home-component),
but usable standalone in custom layouts:

```vue
<VPHero
  name="My Project"
  text="A tagline headline"
  tagline="Longer supporting text"
  :actions="[
    { theme: 'brand', text: 'Get Started', link: '/guide/' },
    { theme: 'alt', text: 'GitHub', link: 'https://github.com/...' }
  ]"
/>
```

| Prop      | Type                                      | Description                         |
| --------- | ----------------------------------------- | ----------------------------------- |
| `name`    | `string`                                  | Brand-colored first line.           |
| `text`    | `string`                                  | Main headline.                      |
| `tagline` | `string`                                  | Supporting text below the headline. |
| `image`   | `ThemeableImage`                          | Image shown beside the hero text.   |
| `actions` | `{ theme?, text, link, target?, rel? }[]` | Action buttons.                     |
| `icon`    | `string \| object`                        | Icon for the glowing highlight.     |

### VPTeamPage, VPTeamPageTitle, VPTeamPageSection, VPTeamMembers

Components for building a team page, typically combined on a page with
`layout: page`:

```md
---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress-carbon/components'

const members = [
  {
    avatar: 'https://github.com/brenoepics.png',
    name: 'Breno A.',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/brenoepics' }
    ]
  }
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Our Team</template>
    <template #lead>The people behind the project.</template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="members" />
</VPTeamPage>
```

`VPTeamMembers` props:

| Prop      | Type                  | Default      | Description         |
| --------- | --------------------- | ------------ | ------------------- |
| `members` | `TeamMember[]`        | — (required) | Members to display. |
| `size`    | `'small' \| 'medium'` | `'medium'`   | Card size.          |

Each `TeamMember`:

| Field        | Type           | Description                           |
| ------------ | -------------- | ------------------------------------- |
| `avatar`     | `string`       | Avatar image URL (required).          |
| `name`       | `string`       | Member name (required).               |
| `title`      | `string`       | Role or title.                        |
| `org`        | `string`       | Organization name.                    |
| `orgLink`    | `string`       | Organization URL.                     |
| `desc`       | `string`       | Short description.                    |
| `links`      | `SocialLink[]` | Social links (`{ icon, link }`).      |
| `sponsor`    | `string`       | Sponsor URL — shows a sponsor button. |
| `actionText` | `string`       | Sponsor button text.                  |

### VPSponsors

Renders sponsor logos in a grid, either as a flat list or grouped by tier.

```vue
<script setup>
import { VPSponsors } from 'vitepress-carbon/components'

const sponsors = [
  {
    tier: 'Gold Sponsors',
    size: 'big',
    items: [
      { name: 'Company', url: 'https://example.com', img: '/sponsor.svg' }
    ]
  }
]
</script>

<VPSponsors :data="sponsors" />
```

| Prop   | Type                      | Default     | Description                           |
| ------ | ------------------------- | ----------- | ------------------------------------- |
| `data` | `Sponsors[] \| Sponsor[]` | `undefined` | Tiered groups or a flat sponsor list. |
| `mode` | `'normal' \| 'aside'`     | `'normal'`  | Layout mode.                          |
| `tier` | `string`                  | `undefined` | Tier label (flat list only).          |
| `size` | `GridSize`                | `undefined` | Logo size (flat list only).           |

### VPSocialLinks

The social-icon row used in the navbar, reusable anywhere:

```vue
<script setup>
import { VPSocialLinks } from 'vitepress-carbon/components'

const links = [
  { icon: 'github', link: 'https://github.com/brenoepics/vitepress-carbon' },
  { icon: 'x', link: 'https://x.com/example' },
  {
    icon: { svg: '<svg>...</svg>' },
    link: 'https://example.com',
    ariaLabel: 'Custom'
  }
]
</script>

<VPSocialLinks :links="links" />
```

| Prop    | Type           | Description                                                           |
| ------- | -------------- | --------------------------------------------------------------------- |
| `links` | `SocialLink[]` | `icon` is a built-in name (`github`, `discord`, `x`, …) or `{ svg }`. |

### VPFooter

The site footer: an optional call to action, a message and a copyright line,
with contribution-graph tiles bleeding off either edge. It renders only on
pages without a sidebar, and is driven entirely by `themeConfig.footer` — you
normally configure it rather than importing it.

```ts
// .vitepress/config.mts
themeConfig: {
  footer: {
    action: {
      text: 'Create Repository',
      link: 'https://github.com/new',
      theme: 'brand' // 'brand' | 'alt' | 'sponsor', defaults to 'brand'
    },
    message: 'Released under the <a href="/LICENSE">MIT License</a>.',
    copyright: `Copyright © 2024–${new Date().getFullYear()} You`
  }
}
```

| Key         | Type     | Description                                      |
| ----------- | -------- | ------------------------------------------------ |
| `action`    | `object` | Optional CTA above the message. Omit to hide it. |
| `message`   | `string` | Supports inline HTML.                            |
| `copyright` | `string` | Supports inline HTML.                            |

Set `footer: false` in a page's frontmatter to hide it on that page.

### VPContributionTiles

The decorative grid behind the footer — a GitHub contribution graph rendered
from a deterministic hash, so the server and client always produce the same
pattern. Useful on its own for any band that wants the same texture.

`mask="frame"` punches an ellipse out of the middle, leaving the grid
continuous around all four edges — this is what the footer uses, so the
tiles close around the content instead of stopping at a hard edge. The hollow
is sized with `--vp-tiles-hollow-w` / `--vp-tiles-hollow-h` (defaults `40%`
and `62%`), which is how the footer widens it on narrow screens.

```vue
<script setup>
import { VPContributionTiles } from 'vitepress-carbon/components'
</script>

<VPContributionTiles mask="frame" :columns="120" :rows="18" />
<VPContributionTiles mask="fade" side="left" :columns="20" :rows="7" />
```

| Prop      | Type                          | Default  | Description                                               |
| --------- | ----------------------------- | -------- | --------------------------------------------------------- |
| `mask`    | `'fade' \| 'frame' \| 'none'` | `'fade'` | `frame` hollows out the centre; `fade` thins to one edge. |
| `side`    | `'left' \| 'right'`           | `'left'` | Edge to fade towards. Only used when `mask` is `fade`.    |
| `columns` | `number`                      | `16`     | Grid width in cells.                                      |
| `rows`    | `number`                      | `7`      | Grid height. Seven matches a real weekday graph.          |

The five activity levels are themable via `--vp-c-tile-0` … `--vp-c-tile-4`.
Level 0 is transparent by default so the grid tints nothing behind it.

## Composables

The theme entry also exports two composables:

```ts
import { useSidebar, useLocalNav } from 'vitepress-carbon'

const { hasSidebar, isOpen, open, close } = useSidebar()
const { hasLocalNav, headers } = useLocalNav()
```

They are handy inside custom layouts to react to the current page structure —
for example hiding an element when the sidebar is visible.

## Next steps

- [Creating Components](./custom-components) — build your own components on top of the theme.
- [Custom Layouts](./custom-layouts) — build full-page layouts like a blog.

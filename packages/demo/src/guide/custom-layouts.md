# Custom Layouts

Every page in a VitePress Carbon site is rendered by a **layout**. The layout
is selected per page with the `layout` frontmatter key, and you can add your
own layouts — a blog, a changelog, a landing page — as plain Vue components.

## Built-in layouts

| Frontmatter               | Component      | What you get                                                                                                                |
| ------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `layout: doc` _(default)_ | `VPDoc`        | The documentation layout: sidebar, outline aside, prev/next footer, doc styling.                                            |
| `layout: home`            | `VPHome`       | Hero + features driven by frontmatter (see [Home Page](./home-component)).                                                  |
| `layout: page`            | `VPPage`       | Navbar, sidebar and footer, but a **blank** unstyled content area — ideal for fully custom pages built from Vue components. |
| `layout: false`           | —              | No theme at all. Only your page content is rendered — useful for standalone pages like interactive demos.                   |
| `layout: MyLayout`        | your component | A **custom layout**: any globally registered component name.                                                                |

```md
---
layout: page
---
```

::: tip `page` vs `false` vs custom

- `layout: page` keeps the site chrome (navbar, sidebar, footer) and gives you an empty canvas inside it.
- `layout: false` removes _everything_, including the navbar.
- `layout: MyLayout` swaps the content area for your own component while keeping the chrome — this is the one you want for a blog.
  :::

## Creating a custom layout

A custom layout is just a Vue component that is **registered globally** and
referenced by name in frontmatter. Inside it, the special `<Content />`
component renders the page's Markdown body.

### 1. Write the layout component

```vue
<!-- .vitepress/theme/layouts/ChangelogLayout.vue -->
<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div class="changelog-layout">
    <header class="changelog-header">
      <h1>{{ frontmatter.title }}</h1>
      <p v-if="frontmatter.subtitle">{{ frontmatter.subtitle }}</p>
    </header>

    <!-- renders the Markdown body of the current page -->
    <Content class="vp-doc" />
  </div>
</template>

<style scoped>
.changelog-layout {
  max-width: 780px;
  margin: 0 auto;
  padding: 48px 24px 96px;
}

.changelog-header {
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 32px;
  padding-bottom: 16px;
}
</style>
```

::: tip
Adding `class="vp-doc"` to `<Content />` opts the Markdown body into the
theme's typography (headings, links, code blocks, custom containers). Leave it
off for a completely unstyled canvas.
:::

### 2. Register it globally

The layout is resolved **by name**, so it must be registered as a global
component in your theme entry:

```ts
// .vitepress/theme/index.ts
import { VPCarbon } from 'vitepress-carbon'
import ChangelogLayout from './layouts/ChangelogLayout.vue'

export default {
  ...VPCarbon,
  enhanceApp({ app }) {
    app.component('ChangelogLayout', ChangelogLayout)
  }
}
```

### 3. Use it from frontmatter

```md
---
layout: ChangelogLayout
title: Changelog
subtitle: What changed and when
---

## v2.0.0

- Breaking: ...
```

That's it — any page with that frontmatter now renders through your component,
while still getting the Carbon navbar, sidebar and footer around it.

## Full example: a blog

Let's build a complete blog: a post layout, an index page listing all posts,
and build-time data loading so the list updates automatically.

### File structure

```
docs/
├─ .vitepress/
│  └─ theme/
│     ├─ index.ts
│     ├─ layouts/
│     │  └─ BlogPostLayout.vue
│     └─ posts.data.ts
├─ blog/
│  ├─ index.md
│  ├─ my-first-post.md
│  └─ another-post.md
```

### Load posts at build time

VitePress ships
[`createContentLoader`](https://vitepress.dev/guide/data-loading#createcontentloader)
for exactly this: it globs Markdown files and exposes their frontmatter as
data.

```ts
// .vitepress/theme/posts.data.ts
import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: string
  excerpt: string | undefined
}

declare const data: Post[]
export { data }

export default createContentLoader('blog/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .filter((page) => !page.url.endsWith('/blog/')) // skip the index page
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        date: frontmatter.date,
        excerpt
      }))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  }
})
```

### The post layout

```vue
<!-- .vitepress/theme/layouts/BlogPostLayout.vue -->
<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter } = useData()

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
</script>

<template>
  <article class="blog-post">
    <header>
      <h1>{{ frontmatter.title }}</h1>
      <p class="meta">
        <span v-if="frontmatter.author">{{ frontmatter.author }} · </span>
        <time v-if="frontmatter.date">{{ formatDate(frontmatter.date) }}</time>
      </p>
    </header>

    <Content class="vp-doc" />

    <footer>
      <a href="/blog/">← Back to all posts</a>
    </footer>
  </article>
</template>

<style scoped>
.blog-post {
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 24px 96px;
}

.blog-post header h1 {
  font-size: 32px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.blog-post .meta {
  margin-top: 8px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.blog-post footer {
  margin-top: 48px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 16px;
}
</style>
```

### Register the layout

```ts
// .vitepress/theme/index.ts
import { VPCarbon } from 'vitepress-carbon'
import BlogPostLayout from './layouts/BlogPostLayout.vue'

export default {
  ...VPCarbon,
  enhanceApp({ app }) {
    app.component('BlogPostLayout', BlogPostLayout)
  }
}
```

### Write a post

```md
---
layout: BlogPostLayout
title: My First Post
author: Jane Doe
date: 2026-07-01
---

Hello world! This is a **Markdown** post rendered through a custom layout.
```

### The blog index

The index uses `layout: page` (blank canvas, site chrome kept) and the data
loader:

```md
---
layout: page
title: Blog
---

<script setup>
import { data as posts } from '../.vitepress/theme/posts.data.ts'
</script>

<div class="blog-index">
  <h1>Blog</h1>
  <ul>
    <li v-for="post of posts" :key="post.url">
      <a :href="post.url">{{ post.title }}</a>
      <time>{{ post.date }}</time>
      <div v-if="post.excerpt" v-html="post.excerpt"></div>
    </li>
  </ul>
</div>

<style scoped>
.blog-index {
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 24px 96px;
}

.blog-index li {
  list-style: none;
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 16px 0;
}

.blog-index time {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
</style>
```

Add a nav entry in `.vitepress/config.mts` and the blog is live:

```ts
nav: [{ text: 'Blog', link: '/blog/', activeMatch: '^/blog/' }]
```

## Extending the default layout instead

If you don't need a _different_ layout — just extra content injected into the
existing one — use layout slots instead of a custom layout. Wrap
`VPCarbon.Layout` and pass slot functions:

```ts
// .vitepress/theme/index.ts
import { h } from 'vue'
import { VPCarbon } from 'vitepress-carbon'
import Announcement from './components/Announcement.vue'

export default {
  ...VPCarbon,
  Layout: () => {
    return h(VPCarbon.Layout!, null, {
      'layout-top': () => h(Announcement),
      'doc-after': () => h('div', 'Shown after every doc page')
    })
  }
}
```

You can also make slots conditional on the current page:

```ts
import { h } from 'vue'
import { useData } from 'vitepress'
import { VPCarbon } from 'vitepress-carbon'
import Comments from './components/Comments.vue'

export default {
  ...VPCarbon,
  Layout: () => {
    const { frontmatter } = useData()
    return h(VPCarbon.Layout!, null, {
      'doc-after': () =>
        frontmatter.value.comments !== false ? h(Comments) : null
    })
  }
}
```

## Layout slot reference

Slot availability depends on the active layout:

### Always available

| Slot                                                     | Position                               |
| -------------------------------------------------------- | -------------------------------------- |
| `layout-top`                                             | Very top of the page, above the navbar |
| `layout-bottom`                                          | Very bottom, below the footer          |
| `nav-bar-title-before` / `nav-bar-title-after`           | Around the site title in the navbar    |
| `nav-bar-content-before` / `nav-bar-content-after`       | Start / end of the navbar content      |
| `nav-bar-content-menu-after`                             | After the navbar menu items            |
| `nav-screen-content-before` / `nav-screen-content-after` | Mobile nav screen                      |
| `sidebar-nav-before` / `sidebar-nav-after`               | Around the sidebar navigation          |
| `not-found`                                              | Replaces the 404 page                  |

### `layout: doc` (default)

| Slot                                           | Position                                |
| ---------------------------------------------- | --------------------------------------- |
| `doc-top` / `doc-bottom`                       | Very top / bottom of the content column |
| `doc-before` / `doc-after`                     | Immediately around the Markdown body    |
| `doc-footer-before`                            | Before the prev/next footer             |
| `aside-top` / `aside-bottom`                   | Top / bottom of the right aside         |
| `aside-outline-before` / `aside-outline-after` | Around the outline                      |
| `aside-ads-before` / `aside-ads-after`         | Around the ads slot                     |

### `layout: home`

| Slot                                                                | Position                                                |
| ------------------------------------------------------------------- | ------------------------------------------------------- |
| `home-hero-before` / `home-hero-after`                              | Around the hero                                         |
| `home-hero-info-before` / `home-hero-info` / `home-hero-info-after` | Hero text block (the `home-hero-info` slot replaces it) |
| `home-hero-actions-after`                                           | After the hero action buttons                           |
| `home-hero-image`                                                   | Replaces the hero image                                 |
| `home-features-before` / `home-features-after`                      | Around the features grid                                |

### `layout: page`

| Slot                       | Position                |
| -------------------------- | ----------------------- |
| `page-top` / `page-bottom` | Around the page content |

## Related reading

- [Extending Theme](./extending-theme) — slots and global components in brief.
- [Built-in Components](./components) — the building blocks for your layouts.
- [Creating Components](./custom-components) — component authoring guide.
- [VitePress: Data Loading](https://vitepress.dev/guide/data-loading) — `createContentLoader` and `*.data.ts` in depth.

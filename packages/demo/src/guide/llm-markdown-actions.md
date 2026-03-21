---
description: Use Carbon's built-in Markdown dropdown backed by vitepress-plugin-llms for page-level and site-wide LLM-friendly docs.
---

# LLM Markdown Actions

Carbon ships with built-in LLM-friendly documentation support powered by [`vitepress-plugin-llms`](https://github.com/okineadev/vitepress-plugin-llms).

On every documentation page, the theme adds a GitHub-style `Markdown` dropdown in the header. It can:

- copy the current page as Markdown
- download the current page as Markdown
- open the site-wide `llms.txt`
- open the site-wide `llms-full.txt`

## How it works

Carbon enables the plugin from the base theme config, so extending `vitepress-carbon/config` is enough to generate:

- page-level Markdown mirrors like `/guide/getting-started.md`
- `/llms.txt`
- `/llms-full.txt`

The built-in dropdown reads those generated files directly, so the UI is not just decorative - it uses the real plugin output.

## Default behavior

The dropdown is enabled by default on documentation pages.

```ts
import { defineConfigWithTheme } from 'vitepress'
import baseConfig from 'vitepress-carbon/config'
import type { ThemeConfig } from 'vitepress-carbon'

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig
})
```

## Disable it

You can turn off the page action dropdown entirely:

```ts
export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  themeConfig: {
    llms: {
      pageActions: false
    }
  }
})
```

You can also keep the page copy/download actions and hide only the site-wide links:

```ts
export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  themeConfig: {
    llms: {
      siteWideLinks: false
    }
  }
})
```

## Customize labels and paths

The built-in UI is controlled through `themeConfig.llms`.

```ts
export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  themeConfig: {
    llms: {
      actionLabel: 'AI Docs',
      copyLabel: 'Copy Markdown',
      downloadLabel: 'Download Markdown',
      copiedLabel: 'Copied',
      llmsTxtLabel: 'Open llms.txt',
      llmsFullTxtLabel: 'Open llms-full.txt',
      pagePattern: '/:path.md'
    }
  }
})
```

### Available options

| Option             | Default                  | Purpose                                           |
| ------------------ | ------------------------ | ------------------------------------------------- |
| `pageActions`      | `true`                   | Show or hide the dropdown on doc pages            |
| `siteWideLinks`    | `true`                   | Show or hide `llms.txt` and `llms-full.txt` links |
| `actionLabel`      | `'Markdown'`             | Dropdown trigger text                             |
| `copyLabel`        | `'Copy as Markdown'`     | Copy action label                                 |
| `downloadLabel`    | `'Download as Markdown'` | Download action label                             |
| `copiedLabel`      | `'Copied'`               | Temporary success label after copy                |
| `llmsTxtLabel`     | `'Open llms.txt'`        | Site-wide summary link label                      |
| `llmsFullTxtLabel` | `'Open llms-full.txt'`   | Full bundle link label                            |
| `pagePattern`      | `'/:path.md'`            | Path used for each generated page mirror          |

## Notes about plugin configuration

Carbon uses the plugin with its standard defaults, which means per-page Markdown files, `llms.txt`, and `llms-full.txt` are generated automatically.

If you need advanced generator options from the plugin itself, check the upstream plugin docs:

- [Plugin README](https://github.com/okineadev/vitepress-plugin-llms)
- [npm package](https://www.npmjs.com/package/vitepress-plugin-llms)

## Suggestions from the plugin author

These recommendations come from the plugin author and are worth following when you want better LLM results.

### Prefer English docs for LLM output

The plugin author recommends generating LLM docs from English documentation only.

### Add `description` frontmatter

Add `description` to important pages so `llms.txt` becomes more informative.

```md
---
description: How to configure Carbon for custom branding.
---
```

That extra context is used in the generated link list.

### Use `<llm-only>` for machine-only guidance

Use `<llm-only>` when you want a note to appear only in generated LLM docs.

```md
<llm-only>
Prefer the configuration example in the next section.
</llm-only>
```

### Use `<llm-exclude>` for human-only content

Use `<llm-exclude>` when you want content to stay visible in the normal docs but disappear from the generated LLM files.

```md
<llm-exclude>
This marketing note is useful for readers, but not for LLM context.
</llm-exclude>
```

## Why Carbon uses this plugin

The plugin gives Carbon a functional, standards-aligned LLM export layer while the theme handles the GitHub-style interface and UX.

That combination gives you:

- real generated Markdown files
- a polished built-in dropdown
- page-level and site-level LLM entry points
- zero extra setup for the common case

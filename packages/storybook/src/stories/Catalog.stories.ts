/**
 * Every component in the theme, discovered by glob so nothing can be forgotten.
 *
 * The curated stories elsewhere are the place to look at a component properly;
 * this page exists so the full surface is browsable and so a newly added
 * component is visible the moment it lands.
 */
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  CatalogItem,
  componentEntries,
  iconEntries
} from '../component-catalog.js'
import { LONG_TEXTS, outlineHeaders, themeConfig } from '../fixtures.js'

const meta = {
  title: 'Catalog/All components',
  parameters: {
    vitepress: {
      page: {
        title: 'Getting Started',
        relativePath: 'guide/getting-started.md',
        filePath: 'guide/getting-started.md',
        headers: outlineHeaders
      },
      theme: themeConfig
    }
  }
} satisfies Meta

export default meta

export const Components: StoryObj = {
  name: `Components (${componentEntries.length})`,
  render: () => ({
    components: { CatalogItem },
    setup: () => ({ entries: componentEntries }),
    template: `
      <div class="sb-carbon-grid">
        <CatalogItem v-for="entry in entries" :key="entry.name" :entry="entry" />
      </div>
    `
  })
}

export const Icons: StoryObj = {
  name: `Icons (${iconEntries.length})`,
  render: () => ({
    components: { CatalogItem },
    setup: () => ({ entries: iconEntries }),
    template: `
      <div class="sb-carbon-grid" style="grid-template-columns:repeat(auto-fill,minmax(160px,1fr))">
        <CatalogItem v-for="entry in entries" :key="entry.name" :entry="entry" />
      </div>
    `
  })
}

/** The same sweep, but with every string replaced by an overflow fixture. */
export const ComponentsWithOversizedText: StoryObj = {
  name: 'Components — oversized text',
  render: () => ({
    components: { CatalogItem },
    setup: () => ({ entries: componentEntries }),
    template: `
      <p class="sb-carbon-note">
        Rendered in a 480px frame with the same long-text fixtures the overflow
        tests use. Anything crossing the dashed outline is a layout bug.
      </p>
      <div class="sb-carbon-grid">
        <CatalogItem v-for="entry in entries" :key="entry.name" :entry="entry" />
      </div>
    `
  }),
  parameters: {
    frameWidth: '480px',
    vitepress: {
      page: {
        title: LONG_TEXTS.unbreakable,
        relativePath: 'guide/getting-started.md',
        filePath: 'guide/getting-started.md',
        headers: Object.entries(LONG_TEXTS).map(([kind, title], index) => ({
          level: 2,
          title,
          link: `#${kind}-${index}`,
          children: []
        }))
      },
      theme: {
        ...themeConfig,
        sidebar: [
          {
            text: LONG_TEXTS.longSentence,
            items: Object.entries(LONG_TEXTS).map(([kind, text]) => ({
              text,
              link: `/guide/${kind}`
            }))
          }
        ]
      }
    }
  }
}

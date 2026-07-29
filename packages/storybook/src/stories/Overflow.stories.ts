/**
 * The showcase for issue #28 — "post titles exceed the container size limit".
 *
 * Every story renders a component inside a deliberately narrow frame using the
 * same oversized strings the overflow tests use. The dashed outline around the
 * frame is the container boundary: nothing should cross it.
 */
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VPDoc from '../../../theme/src/theme/components/VPDoc.vue'
import VPDocFooter from '../../../theme/src/theme/components/VPDocFooter.vue'
import VPDocOutlineItem from '../../../theme/src/theme/components/VPDocOutlineItem.vue'
import VPFeatures from '../../../theme/src/theme/components/VPFeatures.vue'
import VPSidebarItem from '../../../theme/src/theme/components/VPSidebarItem.vue'
import {
  CJK_TITLE,
  EMOJI_TITLE,
  LONG_PARAGRAPH,
  LONG_SENTENCE_TITLE,
  LONG_TEXTS,
  RTL_TITLE,
  themeConfig,
  UNBREAKABLE_TITLE,
  URL_TITLE
} from '../fixtures.js'

const meta = {
  title: 'Overflow/Long titles',
  parameters: {
    frameWidth: '900px',
    docs: {
      description: {
        component:
          'Regression showcase for issue #28. The title row must truncate ' +
          'inside `.content-container` instead of pushing past it. Switch the ' +
          'viewport or resize the canvas — the row should follow the frame.'
      }
    }
  }
} satisfies Meta

export default meta

/**
 * VPDoc reads its title from the VitePress page data, so each text shape gets
 * its own story rather than being looped inside one canvas.
 */
function docTitleStory(title: string, label: string): StoryObj {
  return {
    name: `Doc title — ${label} (${title.length} chars)`,
    render: () => ({ components: { VPDoc }, template: '<VPDoc />' }),
    parameters: {
      vitepress: { page: { title }, theme: themeConfig }
    }
  }
}

export const UnbreakableToken = docTitleStory(UNBREAKABLE_TITLE, 'unbreakable')
export const LongSentence = docTitleStory(LONG_SENTENCE_TITLE, 'long sentence')
export const UrlShaped = docTitleStory(URL_TITLE, 'URL shaped')
export const Cjk = docTitleStory(CJK_TITLE, 'CJK')
export const RightToLeft = docTitleStory(RTL_TITLE, 'right-to-left')
export const Emoji = docTitleStory(EMOJI_TITLE, 'emoji clusters')

/**
 * The degradation case: too narrow for the title *and* the actions. The row
 * must clip on the right rather than spilling off the unreachable left edge.
 */
export const NarrowColumn: StoryObj = {
  name: 'Doc title — squeezed to 420px',
  render: () => ({ components: { VPDoc }, template: '<VPDoc />' }),
  parameters: {
    frameWidth: '420px',
    vitepress: { page: { title: UNBREAKABLE_TITLE }, theme: themeConfig }
  }
}

export const PrevNextPager: StoryObj = {
  name: 'Prev/next pager — long neighbour titles',
  render: () => ({
    components: { VPDocFooter },
    template: '<VPDocFooter />'
  }),
  parameters: {
    vitepress: {
      page: { relativePath: 'guide/getting-started.md' },
      theme: {
        ...themeConfig,
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: UNBREAKABLE_TITLE, link: '/guide/introduction' },
              { text: 'Getting Started', link: '/guide/getting-started' },
              { text: URL_TITLE, link: '/guide/configuration' }
            ]
          }
        ]
      }
    }
  }
}

export const Outline: StoryObj = {
  name: 'Outline — long headings',
  render: () => ({
    components: { VPDocOutlineItem },
    setup: () => ({
      headers: Object.entries(LONG_TEXTS).map(([kind, title], index) => ({
        level: 2,
        title,
        link: `#${kind}-${index}`,
        children: []
      }))
    }),
    template: '<VPDocOutlineItem :headers="headers" :root="true" />'
  }),
  parameters: { frameWidth: '240px' }
}

export const SidebarEntries: StoryObj = {
  name: 'Sidebar — long entries',
  render: () => ({
    components: { VPSidebarItem },
    setup: () => ({
      item: {
        text: LONG_SENTENCE_TITLE,
        items: Object.entries(LONG_TEXTS).map(([kind, text]) => ({
          text,
          link: `/guide/${kind}`
        }))
      }
    }),
    template: '<VPSidebarItem :item="item" :depth="0" />'
  }),
  parameters: { frameWidth: '272px' }
}

export const FeatureCards: StoryObj = {
  name: 'Feature cards — long titles and body copy',
  render: () => ({
    components: { VPFeatures },
    setup: () => ({
      features: [
        { title: UNBREAKABLE_TITLE, details: LONG_PARAGRAPH, icon: '🚀' },
        { title: URL_TITLE, details: LONG_PARAGRAPH, icon: '🧪' },
        { title: CJK_TITLE, details: LONG_PARAGRAPH, icon: '🈶' }
      ]
    }),
    template: '<VPFeatures :features="features" />'
  }),
  parameters: { frameWidth: '900px' }
}

import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VPDoc from '../../../theme/src/theme/components/VPDoc.vue'
import VPDocAside from '../../../theme/src/theme/components/VPDocAside.vue'
import VPDocAsideOutline from '../../../theme/src/theme/components/VPDocAsideOutline.vue'
import VPDocFooter from '../../../theme/src/theme/components/VPDocFooter.vue'
import VPDocFooterLastUpdated from '../../../theme/src/theme/components/VPDocFooterLastUpdated.vue'
import VPDocOutlineItem from '../../../theme/src/theme/components/VPDocOutlineItem.vue'
import VPLlmsPageActions from '../../../theme/src/theme/components/VPLlmsPageActions.vue'
import { outlineHeaders, themeConfig } from '../fixtures.js'

const page = {
  title: 'Getting Started',
  relativePath: 'guide/getting-started.md',
  filePath: 'guide/getting-started.md',
  headers: outlineHeaders
}

const meta = {
  title: 'Doc/Page chrome',
  parameters: { vitepress: { page, theme: themeConfig } }
} satisfies Meta

export default meta

export const FullPage: StoryObj = {
  name: 'VPDoc',
  render: () => ({
    components: { VPDoc },
    template: '<VPDoc />'
  })
}

export const Aside: StoryObj = {
  name: 'VPDocAside',
  render: () => ({
    components: { VPDocAside },
    template: '<VPDocAside />'
  }),
  parameters: { frameWidth: '280px' }
}

export const AsideOutline: StoryObj = {
  name: 'VPDocAsideOutline',
  render: () => ({
    components: { VPDocAsideOutline },
    template: '<VPDocAsideOutline />'
  }),
  parameters: { frameWidth: '280px' }
}

export const OutlineItems: StoryObj = {
  name: 'VPDocOutlineItem',
  render: () => ({
    components: { VPDocOutlineItem },
    setup: () => ({ headers: outlineHeaders }),
    template: '<VPDocOutlineItem :headers="headers" :root="true" />'
  }),
  parameters: { frameWidth: '280px' }
}

export const Footer: StoryObj = {
  name: 'VPDocFooter',
  render: () => ({
    components: { VPDocFooter },
    template: '<VPDocFooter />'
  })
}

export const LastUpdated: StoryObj = {
  name: 'VPDocFooterLastUpdated',
  render: () => ({
    components: { VPDocFooterLastUpdated },
    template: '<VPDocFooterLastUpdated />'
  })
}

export const LlmsPageActions: StoryObj = {
  name: 'VPLlmsPageActions',
  render: () => ({
    components: { VPLlmsPageActions },
    template: '<VPLlmsPageActions />'
  })
}

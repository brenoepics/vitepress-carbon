import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import VPFeature from '../../../theme/src/theme/components/VPFeature.vue'
import VPFeatures from '../../../theme/src/theme/components/VPFeatures.vue'
import VPHero from '../../../theme/src/theme/components/VPHero.vue'
import VPHighlight from '../../../theme/src/theme/components/VPHighlight.vue'
import VPHome from '../../../theme/src/theme/components/VPHome.vue'
import VPHomeFeatures from '../../../theme/src/theme/components/VPHomeFeatures.vue'
import VPHomeHero from '../../../theme/src/theme/components/VPHomeHero.vue'
import { features, themeConfig } from '../fixtures.js'

const homeFrontmatter = {
  layout: 'home',
  hero: {
    name: 'VitePress Carbon',
    text: 'GitHub monochromatic ethos, for your docs',
    tagline: 'Sleek, modern, and effortlessly stylish.',
    actions: [
      { theme: 'brand', text: 'Get Started', link: '/guide/introduction' },
      { theme: 'alt', text: 'View on GitHub', link: 'https://github.com' }
    ]
  },
  features
}

const meta = {
  title: 'Home/Landing',
  parameters: {
    vitepress: {
      page: {
        title: 'Home',
        relativePath: 'index.md',
        filePath: 'index.md',
        frontmatter: homeFrontmatter
      },
      frontmatter: homeFrontmatter,
      theme: themeConfig
    }
  }
} satisfies Meta

export default meta

/** VPHero reads an injected flag that normally comes from VPHome. */
const heroImageSlotExists = { 'hero-image-slot-exists': ref(false) }

export const Home: StoryObj = {
  name: 'VPHome',
  render: () => ({ components: { VPHome }, template: '<VPHome />' })
}

export const HomeHero: StoryObj = {
  name: 'VPHomeHero',
  render: () => ({ components: { VPHomeHero }, template: '<VPHomeHero />' })
}

export const Hero: StoryObj = {
  name: 'VPHero',
  render: () => ({
    components: { VPHero },
    provide: heroImageSlotExists,
    setup: () => homeFrontmatter.hero,
    template: `
      <VPHero :name="name" :text="text" :tagline="tagline" :actions="actions" />
    `
  })
}

export const HomeFeatures: StoryObj = {
  name: 'VPHomeFeatures',
  render: () => ({
    components: { VPHomeFeatures },
    template: '<VPHomeFeatures />'
  })
}

export const Features: StoryObj = {
  name: 'VPFeatures',
  render: () => ({
    components: { VPFeatures },
    setup: () => ({ features }),
    template: '<VPFeatures :features="features" />'
  })
}

export const Feature: StoryObj = {
  name: 'VPFeature',
  render: () => ({
    components: { VPFeature },
    setup: () => features[0],
    template: `
      <VPFeature
        :icon="icon"
        :title="title"
        :details="details"
        link="/guide/introduction"
        link-text="Read the guide"
      />
    `
  }),
  parameters: { frameWidth: '360px' }
}

export const Highlight: StoryObj = {
  name: 'VPHighlight',
  render: () => ({
    components: { VPHighlight },
    template: '<VPHighlight :glowing-active="true" />'
  })
}
